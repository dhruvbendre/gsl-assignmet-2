import { motion } from 'motion/react';
import { X, BookOpen, Wrench, Monitor, Sprout } from 'lucide-react';
import { BookshelfPuzzle } from './puzzles/BookshelfPuzzle';
import { WorkbenchPuzzle } from './puzzles/WorkbenchPuzzle';
import { ComputerPuzzle } from './puzzles/ComputerPuzzle';
import { PlantPuzzle } from './puzzles/PlantPuzzle';

type HotspotType = 'bookshelf' | 'workbench' | 'computer' | 'plant';

interface PuzzleModalProps {
  type: HotspotType;
  lectureId: string;
  onComplete: () => void;
  onClose: () => void;
}

const PUZZLE_CONFIG: Record<HotspotType, {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  ring: string;
}> = {
  bookshelf: {
    title: 'Arduino Knowledge Station',
    subtitle: 'Component archive',
    icon: <BookOpen className="h-5 w-5" />,
    accent: 'from-fuchsia-500 via-violet-500 to-indigo-500',
    ring: 'shadow-fuchsia-500/25'
  },
  workbench: {
    title: 'Circuit Assembly Station',
    subtitle: 'Prototype bay',
    icon: <Wrench className="h-5 w-5" />,
    accent: 'from-orange-500 via-amber-400 to-rose-500',
    ring: 'shadow-orange-500/25'
  },
  computer: {
    title: 'Code Debugging Station',
    subtitle: 'Terminal core',
    icon: <Monitor className="h-5 w-5" />,
    accent: 'from-cyan-500 via-blue-500 to-sky-400',
    ring: 'shadow-cyan-500/25'
  },
  plant: {
    title: 'Moisture Control Station',
    subtitle: 'Bio sensor array',
    icon: <Sprout className="h-5 w-5" />,
    accent: 'from-emerald-500 via-lime-400 to-teal-400',
    ring: 'shadow-emerald-500/25'
  }
};

export function PuzzleModal({ type, onComplete, onClose }: PuzzleModalProps) {
  const config = PUZZLE_CONFIG[type];

  const renderPuzzle = () => {
    switch (type) {
      case 'bookshelf':
        return <BookshelfPuzzle onComplete={onComplete} />;
      case 'workbench':
        return <WorkbenchPuzzle onComplete={onComplete} />;
      case 'computer':
        return <ComputerPuzzle onComplete={onComplete} />;
      case 'plant':
        return <PlantPuzzle onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.78, opacity: 0, y: 42, filter: 'blur(12px)' }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ scale: 0.86, opacity: 0, y: 24, filter: 'blur(10px)' }}
        transition={{ type: 'spring', duration: 0.65, bounce: 0.22 }}
        className={`relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/80 text-slate-900 shadow-2xl ${config.ring} max-h-[92vh]`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={config.title}
      >
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${config.accent}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.14),transparent_30%)]" />
        <div className="lab-grid-overlay absolute inset-0 opacity-25" />

        <div className="relative flex max-h-[92vh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${config.accent} text-white shadow-lg ${config.ring}`}>
                {config.icon}
              </div>
              <div className="min-w-0">
                <p className="font-lab-control text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100">{config.subtitle}</p>
                <h2 className="font-lab-display truncate text-xl font-bold text-white sm:text-2xl">
                  {config.title}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
              aria-label="Close puzzle"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative overflow-y-auto p-4 sm:p-6">
            <div className="rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl shadow-slate-950/25 sm:p-6">
              {renderPuzzle()}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
