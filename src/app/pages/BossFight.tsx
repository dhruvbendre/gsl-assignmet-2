import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { getLectureById } from '../data/lectures';
import { storage } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold">Lecture not found.</p>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (!canLaunch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 text-white">
        <div className="max-w-md text-center">
          <p className="mb-2 text-2xl font-bold">Boss Fight Locked</p>
          <p className="mb-6 text-slate-300">Complete every chapter before entering the final assessment.</p>
          <Button onClick={() => navigate(`/learning/${lecture.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lecture
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      {gameUrl ? (
        <iframe
          title={`${lecture.shortTitle} Boss Fight`}
          src={gameUrl}
          className="h-full w-full border-0"
          allow="autoplay; fullscreen"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-white">Loading Boss Fight...</div>
      )}
    </main>
  );
}
