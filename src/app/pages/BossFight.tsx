import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { getLectureById } from '../data/lectures';
import { storage } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Heart, Shield, Skull, Timer, Trophy, Zap } from 'lucide-react';

const GAME_SAVE_KEY = 'stemEscapeRoomSave';
const GAME_CONTEXT_KEY = 'stem-boss-fight-context';

interface BossFightContext {
  attemptId: string;
  courseId: string;
  lectureId: string;
  userId?: string;
  startedAt: number;
  callbackPath: string;
}

export function BossFight() {
  const navigate = useNavigate();
  const { lectureId } = useParams<{ lectureId: string }>();
  const { userId } = useAuth();
  const [gameUrl, setGameUrl] = useState('');

  const lecture = lectureId ? getLectureById(lectureId) : null;

  const canLaunch = useMemo(() => {
    if (!lecture) return false;
    const progress = storage.getProgress(lecture.course.id, userId || undefined);
    return progress?.completedChapters.length === lecture.course.chapters.length;
  }, [lecture, userId]);

  useEffect(() => {
    if (!lectureId || !lecture || !canLaunch) return;

    const savedContext = sessionStorage.getItem(GAME_CONTEXT_KEY);
    const parsedContext = savedContext ? (JSON.parse(savedContext) as BossFightContext) : null;
    const hasActiveAttempt = parsedContext?.lectureId === lectureId && parsedContext?.userId === (userId || undefined);

    // Integration point: React creates the assessment attempt and passes course/user
    // context to the vanilla game without coupling it to React internals.
    if (!hasActiveAttempt) {
      localStorage.removeItem(GAME_SAVE_KEY);
      const nextContext: BossFightContext = {
        attemptId: `${lectureId}-${Date.now()}`,
        courseId: lecture.course.id,
        lectureId,
        userId: userId || undefined,
        startedAt: Date.now(),
        callbackPath: `/boss-fight/${lectureId}/result`
      };
      sessionStorage.setItem(GAME_CONTEXT_KEY, JSON.stringify(nextContext));
    }

    const progress = storage.getProgress(lecture.course.id, userId || undefined);
    if (progress && progress.bossFightStatus !== 'in-progress') {
      storage.saveProgress({
        ...progress,
        bossFightStatus: 'in-progress'
      }, userId || undefined);
    }

    setGameUrl(`/boss-fight-game/index.html?lectureId=${encodeURIComponent(lectureId)}`);
  }, [canLaunch, lecture, lectureId, userId]);

  if (!lecture) {
    return (
      <div className="gsl-platform min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold">Lecture not found.</p>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (!canLaunch) {
    return (
      <div className="gsl-platform relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 p-4 text-white">
        <div className="absolute inset-0 gsl-circuit opacity-40" />
        <div className="relative max-w-md rounded-lg border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <Shield className="mx-auto mb-4 h-12 w-12 text-violet-200" />
          <p className="gsl-display mb-2 text-3xl font-black">Boss Fight Locked</p>
          <p className="mb-6 text-slate-300">Complete every chapter before entering the final assessment against Professor Dryroot.</p>
          <Button className="rounded-md bg-blue-600 hover:bg-blue-500" onClick={() => navigate(`/learning/${lecture.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lecture
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="gsl-platform relative h-screen w-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 border-b border-white/10 bg-slate-950/75 px-4 py-3 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="gsl-subhead truncate text-sm font-extrabold uppercase tracking-[0.18em] text-violet-200">Boss Fight Arena</div>
            <div className="gsl-display truncate text-xl font-black">{lecture.shortTitle}: Professor Dryroot</div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-1 rounded-md bg-red-500/20 px-3 py-2 text-sm font-bold text-red-100">
              <Heart className="h-4 w-4" /> Player Hearts
            </span>
            <span className="flex items-center gap-1 rounded-md bg-violet-500/20 px-3 py-2 text-sm font-bold text-violet-100">
              <Skull className="h-4 w-4" /> Boss HP
            </span>
            <span className="flex items-center gap-1 rounded-md bg-amber-500/20 px-3 py-2 text-sm font-bold text-amber-100">
              <Timer className="h-4 w-4" /> Timer
            </span>
            <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-3 py-2 text-sm font-bold text-emerald-100">
              <Zap className="h-4 w-4" /> Combo
            </span>
          </div>
        </div>
      </div>
      {gameUrl ? (
        <iframe
          title={`${lecture.shortTitle} Boss Fight`}
          src={gameUrl}
          className="h-full w-full border-0"
          allow="autoplay; fullscreen"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-white">
          <div className="text-center">
            <Trophy className="mx-auto mb-4 h-12 w-12 text-amber-300" />
            <p className="gsl-subhead text-xl font-extrabold">Loading Boss Fight...</p>
          </div>
        </div>
      )}
    </main>
  );
}
