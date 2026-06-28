import { Badge } from '../ui/badge';
import {
  BookOpen,
  Wrench,
  Monitor,
  Sprout,
  DoorOpen,
  Lock,
  CheckCircle2,
  Trophy,
  RadioTower,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

type HotspotType = 'bookshelf' | 'workbench' | 'computer' | 'plant';

interface PuzzleState {
  bookshelf: { completed: boolean; solved: boolean };
  workbench: { completed: boolean; solved: boolean };
  computer: { completed: boolean; solved: boolean };
  plant: { completed: boolean; solved: boolean };
}

interface ProgressPanelProps {
  puzzles: PuzzleState;
  doorUnlocked: boolean;
  completedCount: number;
  totalCount: number;
  lecture: {
    id: string;
    badge: {
      name: string;
      description: string;
      icon: string;
    };
    bossFight: {
      xpReward: number;
    };
  };
}

const STATIONS: {
  key: HotspotType;
  label: string;
  icon: React.ReactNode;
  accent: string;
}[] = [
  { key: 'bookshelf', label: 'Bookshelf', icon: <BookOpen className="h-4 w-4" />, accent: 'from-fuchsia-400 to-violet-400' },
  { key: 'workbench', label: 'Workbench', icon: <Wrench className="h-4 w-4" />, accent: 'from-orange-400 to-amber-300' },
  { key: 'computer', label: 'Computer', icon: <Monitor className="h-4 w-4" />, accent: 'from-cyan-400 to-blue-400' },
  { key: 'plant', label: 'Plant', icon: <Sprout className="h-4 w-4" />, accent: 'from-emerald-400 to-lime-300' }
];

export function ProgressPanel({
  puzzles,
  doorUnlocked,
  completedCount,
  totalCount,
  lecture
}: ProgressPanelProps) {
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <aside className="sticky top-24 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/60 p-4 text-white shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_10%_85%,rgba(250,204,21,0.12),transparent_32%)]" />
      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-lab-control text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">Mission Control</p>
            <h2 className="font-lab-display mt-1 text-xl font-bold text-white">Lockdown Map</h2>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
            <RadioTower className="h-5 w-5" />
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-white/10 bg-white/8 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">Stations repaired</span>
            <span className="font-lab-control font-bold text-cyan-100">{completedCount}/{totalCount}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-800 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-lime-300 to-amber-300 shadow-lg shadow-cyan-300/30"
            />
          </div>
        </div>

        <div className="space-y-3">
          {STATIONS.map((station, index) => {
            const isCompleted = puzzles[station.key].solved;
            return (
              <motion.div
                key={station.key}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  isCompleted
                    ? 'border-lime-200/35 bg-lime-300/10 shadow-lg shadow-lime-950/20'
                    : 'border-white/10 bg-white/7'
                }`}
              >
                <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${isCompleted ? 'from-lime-300 to-emerald-400 text-slate-950' : `${station.accent} text-slate-950 opacity-75`}`}>
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : station.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-lab-control truncate text-sm font-bold text-white">{station.label}</p>
                  <p className="text-xs text-slate-400">{isCompleted ? 'Repaired' : 'Awaiting input'}</p>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full ${isCompleted ? 'bg-lime-300 shadow-lg shadow-lime-300/70' : 'bg-orange-300/80 shadow-lg shadow-orange-300/30'}`} />
              </motion.div>
            );
          })}

          <div className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
            doorUnlocked
              ? 'border-amber-200/50 bg-amber-300/15 shadow-lg shadow-amber-950/20'
              : 'border-white/10 bg-white/7'
          }`}>
            <div className={`grid h-9 w-9 place-items-center rounded-xl ${
              doorUnlocked
                ? 'bg-gradient-to-br from-amber-200 to-orange-400 text-slate-950'
                : 'bg-slate-700 text-slate-300'
            }`}>
              {doorUnlocked ? <DoorOpen className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-lab-control truncate text-sm font-bold text-white">Exit Door</p>
              <p className="text-xs text-slate-400">{doorUnlocked ? 'Golden corridor online' : 'Security seal active'}</p>
            </div>
            <Badge className={doorUnlocked ? 'border-amber-200/50 bg-amber-200 text-slate-950' : 'border-white/10 bg-white/10 text-slate-300'}>
              {doorUnlocked ? 'Ready' : 'Locked'}
            </Badge>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-amber-200/20 bg-gradient-to-br from-amber-300/15 to-fuchsia-400/10 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-200" />
            <span className="font-lab-control text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Rewards</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-2xl shadow-inner">
              {lecture.badge.icon}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{lecture.badge.name}</p>
              <p className="flex items-center gap-1 text-xs text-amber-100">
                <Zap className="h-3.5 w-3.5 fill-amber-200 text-amber-200" />
                +{lecture.bossFight.xpReward} XP
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
