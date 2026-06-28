import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { storage } from '../lib/storage';
import { celebrateBossFight } from '../lib/confetti';
import { getLectureById } from '../data/lectures';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import {
  BookOpen,
  Wrench,
  Monitor,
  Sprout,
  ArrowLeft,
  Lightbulb,
  RadioTower,
  ShieldAlert,
  Sparkles,
  Trophy,
  Zap
} from 'lucide-react';
import { LabRoom } from '../components/EscapeRoom/LabRoom';
import { ProgressPanel } from '../components/EscapeRoom/ProgressPanel';
import { PuzzleModal } from '../components/EscapeRoom/PuzzleModal';
import { VictoryModal } from '../components/EscapeRoom/VictoryModal';

type HotspotType = 'bookshelf' | 'workbench' | 'computer' | 'plant' | 'door';

interface PuzzleState {
  bookshelf: { completed: boolean; solved: boolean };
  workbench: { completed: boolean; solved: boolean };
  computer: { completed: boolean; solved: boolean };
  plant: { completed: boolean; solved: boolean };
}

const MISSION_OBJECTIVES = [
  { label: 'Bookshelf', detail: 'Identify Arduino components', icon: <BookOpen className="h-4 w-4" />, accent: 'from-fuchsia-400 to-violet-400' },
  { label: 'Workbench', detail: 'Assemble the circuit', icon: <Wrench className="h-4 w-4" />, accent: 'from-orange-400 to-amber-300' },
  { label: 'Computer', detail: 'Debug the sketch', icon: <Monitor className="h-4 w-4" />, accent: 'from-cyan-400 to-blue-400' },
  { label: 'Plant', detail: 'Calibrate moisture', icon: <Sprout className="h-4 w-4" />, accent: 'from-emerald-400 to-lime-300' }
];

export function EscapeRoom() {
  const navigate = useNavigate();
  const { lectureId } = useParams<{ lectureId: string }>();
  const { userId } = useAuth();

  const lecture = lectureId ? getLectureById(lectureId) : null;
  const course = lecture ? lecture.course : null;

  const [puzzles, setPuzzles] = useState<PuzzleState>({
    bookshelf: { completed: false, solved: false },
    workbench: { completed: false, solved: false },
    computer: { completed: false, solved: false },
    plant: { completed: false, solved: false }
  });

  const [activePuzzle, setActivePuzzle] = useState<HotspotType | null>(null);
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [doorOpened, setDoorOpened] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [started, setStarted] = useState(false);

  const completedCount = Object.values(puzzles).filter(p => p.solved).length;
  const totalCount = 4;
  const allPuzzlesSolved = completedCount === totalCount;

  useEffect(() => {
    if (allPuzzlesSolved && !doorUnlocked) {
      setDoorUnlocked(true);
      toast.success('Exit door unlocked!', {
        description: 'All stations repaired. The laboratory lockdown is disengaged.'
      });
    }
  }, [allPuzzlesSolved, doorUnlocked]);

  const handleHotspotClick = useCallback((type: HotspotType) => {
    if (type === 'door') {
      if (doorUnlocked && !doorOpened) {
        setDoorOpened(true);
        setTimeout(() => setShowVictory(true), 1500);
      } else if (!doorUnlocked) {
        toast.error('Door is locked', {
          description: `Complete ${totalCount - completedCount} more station(s) to unlock the exit.`
        });
      }
      return;
    }

    if (puzzles[type].solved) {
      toast.info('Already completed!', {
        description: 'This station has been repaired.'
      });
      return;
    }

    setActivePuzzle(type);
  }, [puzzles, doorUnlocked, doorOpened, completedCount]);

  const handlePuzzleComplete = useCallback((type: Exclude<HotspotType, 'door'>) => {
    setPuzzles(prev => ({
      ...prev,
      [type]: { completed: true, solved: true }
    }));
    setActivePuzzle(null);

    const puzzleNames = {
      bookshelf: 'Knowledge Station',
      workbench: 'Circuit Assembly',
      computer: 'Code Debugging',
      plant: 'Moisture Control'
    };

    toast.success(`${puzzleNames[type]} Complete!`, {
      description: `${completedCount + 1}/${totalCount} stations repaired.`
    });
  }, [completedCount]);

  const handlePuzzleClose = useCallback(() => {
    setActivePuzzle(null);
  }, []);

  const handleVictoryComplete = useCallback(() => {
    if (!course || !lecture || !userId) {
      navigate('/dashboard');
      return;
    }

    celebrateBossFight();

    const progress = storage.getProgress(course.id, userId);
    if (progress) {
      const xpEarned = lecture.bossFight.xpReward;

      const newProgress = {
        ...progress,
        bossFightPassed: true,
        bossFightScore: 100,
        totalXP: progress.totalXP + xpEarned,
        bossFightAttempts: progress.bossFightAttempts + 1
      };

      storage.saveProgress(newProgress, userId);

      const badges = storage.getBadges(userId);
      const badgeId = `badge-${lecture.id}`;
      const badgeExists = badges.find(b => b.id === badgeId);

      if (!badgeExists) {
        const newBadge = {
          id: badgeId,
          name: lecture.badge.name,
          description: lecture.badge.description,
          icon: lecture.badge.icon,
          earnedDate: new Date().toISOString(),
          courseId: course.id
        };
        storage.saveBadges([...badges, newBadge], userId);

        setTimeout(() => {
          toast.success('New Badge Earned!', {
            description: lecture.badge.name,
            duration: 5000
          });
        }, 1000);
      }

      const stats = storage.getStatistics(userId);
      const newStats = {
        ...stats,
        totalXP: stats.totalXP + xpEarned,
        bossFightsPassed: stats.bossFightsPassed + 1,
        coursesCompleted: stats.coursesCompleted + 1
      };
      storage.saveStatistics(newStats, userId);
    }

    setTimeout(() => {
      navigate(`/learning/${lectureId}`);
    }, 3000);
  }, [course, lecture, userId, navigate, lectureId]);

  const goToDashboard = () => {
    if (lectureId) {
      navigate(`/learning/${lectureId}`);
    } else {
      navigate('/dashboard');
    }
  };

  if (!lecture || !course) {
    return (
      <div className="escape-room-shell flex min-h-screen items-center justify-center bg-[#07111f]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-cyan-300 border-t-transparent" />
          <p className="font-lab-control text-cyan-100">Loading Laboratory...</p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="escape-room-shell relative min-h-screen overflow-hidden bg-[#07111f] p-4 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(168,85,247,0.28),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_52%_84%,rgba(245,158,11,0.2),transparent_34%),linear-gradient(180deg,#111a35_0%,#07111f_60%,#050912_100%)]" />
        <div className="lab-grid-overlay absolute inset-0 opacity-50" />
        <div className="lab-circuit-overlay absolute inset-0 opacity-50" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <section className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-cyan-100">
                <ShieldAlert className="mr-2 h-3.5 w-3.5" />
                Laboratory Lockdown
              </Badge>
              <h1 className="font-lab-display max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Repair the lab before the vault seals.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Professor Arduino triggered a security lockdown inside the irrigation lab. Explore each station, restore the prototype, and open the exit door.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {MISSION_OBJECTIVES.map((objective) => (
                  <div key={objective.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-md">
                    <div className={`mb-3 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${objective.accent} text-slate-950`}>
                      {objective.icon}
                    </div>
                    <h2 className="font-lab-control text-sm font-bold uppercase tracking-[0.14em] text-white">{objective.label}</h2>
                    <p className="mt-1 text-sm text-slate-400">{objective.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={goToDashboard}
                  variant="outline"
                  className="rounded-xl border-white/15 bg-white/8 text-white hover:bg-white/15"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Course
                </Button>
                <Button
                  onClick={() => setStarted(true)}
                  className="font-lab-control rounded-xl bg-gradient-to-r from-cyan-300 via-lime-300 to-amber-300 px-6 font-bold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-200 hover:to-amber-200"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Start Escape Room
                </Button>
              </div>
            </section>

            <section className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-white/15 bg-slate-950/55 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.2),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-lab-control text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">Station Alpha</p>
                  <h2 className="font-lab-display mt-1 text-2xl font-bold">Mission Brief</h2>
                </div>
                <RadioTower className="h-8 w-8 text-cyan-200" />
              </div>

              <div className="relative mt-8 flex justify-center">
                <div className="absolute top-8 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />
                <div className="relative h-72 w-56 rounded-t-[6rem] border-[10px] border-slate-500/70 bg-gradient-to-b from-slate-800 to-slate-950 shadow-2xl shadow-cyan-950/40">
                  <div className="absolute left-1/2 top-5 flex -translate-x-1/2 gap-2">
                    {[0, 1, 2, 3].map((light) => (
                      <span key={light} className="h-3 w-3 rounded-full bg-red-400/80 shadow-lg shadow-red-400/30" />
                    ))}
                  </div>
                  <div className="absolute inset-10 rounded-full border-4 border-cyan-200/20" />
                  <LockPreview />
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4">
                  <Trophy className="mb-2 h-5 w-5 text-amber-200" />
                  <p className="text-sm font-bold text-white">{lecture.badge.name}</p>
                  <p className="text-xs text-slate-400">Badge reward</p>
                </div>
                <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4">
                  <Zap className="mb-2 h-5 w-5 fill-amber-200 text-amber-200" />
                  <p className="text-sm font-bold text-white">+{lecture.bossFight.xpReward} XP</p>
                  <p className="text-xs text-slate-400">Mission payout</p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="escape-room-shell min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(168,85,247,0.22),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.2),transparent_28%),linear-gradient(180deg,#101a35_0%,#07111f_58%,#050912_100%)]" />
      <div className="lab-grid-overlay fixed inset-0 opacity-35" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToDashboard}
              className="shrink-0 rounded-xl text-cyan-100 hover:bg-white/10 hover:text-white"
              aria-label="Back to course"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="font-lab-display truncate text-lg font-bold text-white sm:text-xl">
                Laboratory Lockdown
              </h1>
              <p className="text-xs text-slate-400 sm:text-sm">
                {completedCount}/{totalCount} stations repaired
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="hidden border-cyan-200/25 bg-cyan-200/10 text-cyan-100 sm:inline-flex">
              {course.title}
            </Badge>
            <Badge className={doorUnlocked ? 'border-amber-200/40 bg-amber-200 text-slate-950' : 'border-white/10 bg-white/10 text-slate-300'}>
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {doorUnlocked ? 'Door Ready' : 'Lockdown Active'}
            </Badge>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <LabRoom
            puzzles={puzzles}
            doorUnlocked={doorUnlocked}
            doorOpened={doorOpened}
            onHotspotClick={handleHotspotClick}
          />

          <ProgressPanel
            puzzles={puzzles}
            doorUnlocked={doorUnlocked}
            completedCount={completedCount}
            totalCount={totalCount}
            lecture={lecture}
          />
        </div>
      </main>

      <AnimatePresence>
        {activePuzzle && activePuzzle !== 'door' && (
          <PuzzleModal
            type={activePuzzle}
            lectureId={lectureId || ''}
            onComplete={() => handlePuzzleComplete(activePuzzle as Exclude<HotspotType, 'door'>)}
            onClose={handlePuzzleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVictory && (
          <VictoryModal
            lecture={lecture}
            course={course}
            onComplete={handleVictoryComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LockPreview() {
  return (
    <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/20 bg-slate-950/70 text-cyan-100">
      <ShieldAlert className="h-8 w-8" />
    </div>
  );
}
