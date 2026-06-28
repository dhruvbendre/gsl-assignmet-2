import { motion } from 'motion/react';
import { Hotspot } from './Hotspot';
import { Door } from './Door';

type HotspotType = 'bookshelf' | 'workbench' | 'computer' | 'plant' | 'door';

interface PuzzleState {
  bookshelf: { completed: boolean; solved: boolean };
  workbench: { completed: boolean; solved: boolean };
  computer: { completed: boolean; solved: boolean };
  plant: { completed: boolean; solved: boolean };
}

interface LabRoomProps {
  puzzles: PuzzleState;
  doorUnlocked: boolean;
  doorOpened: boolean;
  onHotspotClick: (type: HotspotType) => void;
}

export function LabRoom({ puzzles, doorUnlocked, doorOpened, onHotspotClick }: LabRoomProps) {
  const completedCount = Object.values(puzzles).filter(p => p.solved).length;
  const sparkles = [
    'left-[9%] top-[15%] lab-delay-1',
    'left-[18%] top-[64%] lab-delay-4',
    'left-[27%] top-[28%] lab-delay-7',
    'left-[35%] top-[72%] lab-delay-2',
    'left-[44%] top-[18%] lab-delay-9',
    'left-[51%] top-[66%] lab-delay-5',
    'left-[61%] top-[25%] lab-delay-11',
    'left-[70%] top-[58%] lab-delay-3',
    'left-[82%] top-[18%] lab-delay-8',
    'left-[88%] top-[72%] lab-delay-12',
    'left-[14%] top-[42%] lab-delay-6',
    'left-[77%] top-[40%] lab-delay-10'
  ];

  return (
    <div className="relative min-h-[540px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#07111f] shadow-2xl shadow-cyan-950/40 md:aspect-[16/10] md:min-h-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(168,85,247,0.28),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(245,158,11,0.2),transparent_34%),linear-gradient(180deg,#101a35_0%,#07111f_55%,#050912_100%)]" />
      <div className="lab-grid-overlay absolute inset-0 opacity-60" />
      <div className="lab-circuit-overlay absolute inset-0 opacity-50" />

      <div className="absolute left-1/2 top-[18%] h-40 w-[72%] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-[34%] bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(148,163,184,0.14)_0_1px,transparent_1px_68px),linear-gradient(25deg,rgba(148,163,184,0.1)_0_1px,transparent_1px_68px)]" />
      </div>

      <div className="absolute left-[8%] top-[8%] hidden h-24 w-40 rounded-2xl border border-cyan-100/20 bg-cyan-200/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:block">
        <div className="absolute inset-3 rounded-xl border border-cyan-100/20" />
        <div className="lab-scanline absolute inset-x-0 h-12" />
        <div className="font-lab-control absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.24em] text-cyan-100/80">Blueprint feed</div>
      </div>

      <div className="absolute right-[9%] top-[10%] hidden w-44 rounded-2xl border border-violet-100/15 bg-slate-950/35 p-3 shadow-2xl shadow-violet-500/10 backdrop-blur-sm sm:block">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-lime-300" />
        </div>
        <div className="space-y-1 font-mono text-[10px] text-cyan-100/80">
          <div>&gt; lab_status: lockdown</div>
          <div>&gt; stations: {completedCount}/4</div>
          <div className={doorUnlocked ? 'text-lime-300' : 'text-amber-200'}>&gt; vault: {doorUnlocked ? 'ready' : 'sealed'}</div>
        </div>
      </div>

      {sparkles.map((position) => (
        <span
          key={position}
          className={`lab-sparkle absolute h-1 w-1 rounded-full bg-cyan-100/80 shadow-lg shadow-cyan-200/70 ${position}`}
        />
      ))}

      <div className="absolute left-1/2 top-[50%] z-20 -translate-x-1/2 -translate-y-1/2">
        <Door
          unlocked={doorUnlocked}
          opened={doorOpened}
          completedCount={completedCount}
          onClick={() => onHotspotClick('door')}
        />
      </div>

      <motion.div
        className="lab-float lab-delay-1 absolute left-[7%] top-[24%] z-30"
      >
        <Hotspot
          type="bookshelf"
          completed={puzzles.bookshelf.solved}
          onClick={() => onHotspotClick('bookshelf')}
        />
      </motion.div>

      <motion.div
        className="lab-float lab-delay-4 absolute bottom-[16%] left-[12%] z-30"
      >
        <Hotspot
          type="workbench"
          completed={puzzles.workbench.solved}
          onClick={() => onHotspotClick('workbench')}
        />
      </motion.div>

      <motion.div
        className="lab-float lab-delay-2 absolute right-[10%] top-[25%] z-30"
      >
        <Hotspot
          type="computer"
          completed={puzzles.computer.solved}
          onClick={() => onHotspotClick('computer')}
        />
      </motion.div>

      <motion.div
        className="lab-float lab-delay-5 absolute bottom-[15%] right-[10%] z-30"
      >
        <Hotspot
          type="plant"
          completed={puzzles.plant.solved}
          onClick={() => onHotspotClick('plant')}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-40 flex justify-center px-4">
        <div className="font-lab-control rounded-full border border-white/15 bg-slate-950/60 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-100 shadow-2xl shadow-cyan-950/40 backdrop-blur-md">
          Arduino Laboratory - Station Alpha
        </div>
      </div>
    </div>
  );
}
