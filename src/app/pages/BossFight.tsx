import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { getLectureById } from '../data/lectures';
import { storage } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Heart, Shield, Skull, Timer, Trophy, Zap } from 'lucide-react';

const GAME_SAVE_KEY = 'stemEscapeRoomSave';
const GAME_CONTEXT_KEY = 'stem-boss-fight-context';
const BOSS_FIGHT_THEME_SRC = '/assets/audio/boss-fight-theme.mp3';
const BOSS_FIGHT_THEME_VOLUME = 0.25;
const BOSS_FIGHT_THEME_FADE_MS = 1000;

let bossFightTheme: HTMLAudioElement | null = null;
let bossFightThemeFade: number | undefined;
let bossFightThemeSession = 0;

interface BossFightContext {
  attemptId: string;
  courseId: string;
  lectureId: string;
  userId?: string;
  startedAt: number;
  callbackPath: string;
}

function getBossFightTheme() {
  if (!bossFightTheme) {
    bossFightTheme = new Audio(BOSS_FIGHT_THEME_SRC);
    bossFightTheme.loop = true;
    bossFightTheme.preload = 'auto';
    bossFightTheme.volume = 0;
    bossFightTheme.load();
  }

  return bossFightTheme;
}

function fadeBossFightTheme(targetVolume: number, onComplete?: () => void) {
  const audio = getBossFightTheme();
  const startVolume = audio.volume;
  const startedAt = performance.now();

  window.clearInterval(bossFightThemeFade);
  bossFightThemeFade = window.setInterval(() => {
    const progress = Math.min((performance.now() - startedAt) / BOSS_FIGHT_THEME_FADE_MS, 1);
    audio.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress >= 1) {
      window.clearInterval(bossFightThemeFade);
      bossFightThemeFade = undefined;
      onComplete?.();
    }
  }, 50);
}

function startBossFightTheme() {
  const session = ++bossFightThemeSession;
  const audio = getBossFightTheme();
  audio.pause();
  audio.currentTime = 0;
  audio.volume = 0;
  audio.play().then(() => {
    if (session !== bossFightThemeSession) return;
    fadeBossFightTheme(BOSS_FIGHT_THEME_VOLUME);
  }).catch(() => {});
}

function stopBossFightTheme() {
  if (!bossFightTheme) return;

  bossFightThemeSession += 1;
  fadeBossFightTheme(0, () => {
    bossFightTheme?.pause();
    if (bossFightTheme) bossFightTheme.currentTime = 0;
  });
}

export function BossFight() {
  const navigate = useNavigate();
  const { lectureId } = useParams<{ lectureId: string }>();
  const { userId } = useAuth();
  const [gameUrl, setGameUrl] = useState('');
  const [gameMode, setGameMode] = useState(false);

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

  useEffect(() => {
    if (!gameUrl) return;
    setGameMode(false);
    const timer = window.setTimeout(() => setGameMode(true), 7600);
    return () => window.clearTimeout(timer);
  }, [gameUrl]);

  useEffect(() => {
    if (!gameUrl) return;

    startBossFightTheme();
    return () => stopBossFightTheme();
  }, [gameUrl]);

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
    <main className={`gsl-platform relative h-screen w-screen overflow-hidden bg-black transition-colors duration-1000 ${gameMode ? 'is-game-mode' : ''}`}>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_25%_15%,rgba(37,99,235,0.22),transparent_28%),radial-gradient(circle_at_76%_12%,rgba(124,58,237,0.2),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.28),transparent_28%)]" />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/76 px-4 py-3 text-white shadow-2xl shadow-blue-950/30 backdrop-blur-xl transition-all duration-1000 ease-out ${
          gameMode ? '-translate-y-full opacity-0 blur-sm' : 'translate-y-0 opacity-100 blur-0'
        }`}
        aria-hidden={gameMode}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="gsl-subhead truncate text-sm font-extrabold uppercase tracking-[0.18em] text-violet-200">Boss Fight Arena</div>
            <div className="gsl-display truncate text-xl font-black">{lecture.shortTitle}: Professor Dryroot</div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {[
              { icon: Heart, label: 'Hearts', value: '3', tone: 'text-red-100', bar: 'from-red-400 to-rose-500' },
              { icon: Skull, label: 'Boss HP', value: '100%', tone: 'text-violet-100', bar: 'from-violet-400 to-fuchsia-500' },
              { icon: Timer, label: 'Timer', value: '30s', tone: 'text-amber-100', bar: 'from-amber-300 to-orange-500' },
              { icon: Zap, label: 'Combo', value: '0x', tone: 'text-emerald-100', bar: 'from-emerald-300 to-cyan-400' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="group min-w-[118px] rounded-lg border border-white/14 bg-white/10 px-3 py-2 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className={`flex items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.14em] ${item.tone}`}>
                    <Icon className="h-4 w-4" />
                    {item.value}
                  </span>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/10">
                    <span className={`block h-full rounded-full bg-gradient-to-r ${item.bar} transition-all duration-700 group-hover:w-full w-2/3`} />
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">{item.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="group absolute inset-x-0 top-0 z-30 h-9">
        <div className="mx-auto mt-2 w-fit translate-y-[-120%] rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-blue-100 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {lecture.shortTitle} Arena
        </div>
      </div>
      {gameUrl ? (
        <iframe
          title={`${lecture.shortTitle} Boss Fight`}
          src={gameUrl}
          className={`relative z-10 h-full w-full border-0 transition-transform duration-1000 ease-out ${gameMode ? 'scale-[1.012]' : 'scale-100'}`}
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
