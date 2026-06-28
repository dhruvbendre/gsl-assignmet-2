import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Wrench,
  Monitor,
  Sprout,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

type HotspotType = 'bookshelf' | 'workbench' | 'computer' | 'plant';

interface HotspotProps {
  type: HotspotType;
  completed: boolean;
  onClick: () => void;
}

const HOTSPOT_CONFIG: Record<HotspotType, {
  icon: React.ReactNode;
  label: string;
  accent: string;
  glow: string;
  panel: string;
  tooltip: string;
  detail: string;
}> = {
  bookshelf: {
    icon: <BookOpen className="h-8 w-8" />,
    label: 'Bookshelf',
    accent: 'text-fuchsia-100',
    glow: 'shadow-fuchsia-500/40',
    panel: 'from-fuchsia-500/30 via-violet-500/20 to-indigo-500/20 border-fuchsia-300/45',
    tooltip: 'Arduino Knowledge Station',
    detail: 'Component archive'
  },
  workbench: {
    icon: <Wrench className="h-8 w-8" />,
    label: 'Workbench',
    accent: 'text-orange-100',
    glow: 'shadow-orange-500/40',
    panel: 'from-orange-500/35 via-amber-400/20 to-rose-500/15 border-orange-300/50',
    tooltip: 'Circuit Assembly Station',
    detail: 'Prototype bay'
  },
  computer: {
    icon: <Monitor className="h-8 w-8" />,
    label: 'Computer',
    accent: 'text-cyan-100',
    glow: 'shadow-cyan-500/40',
    panel: 'from-cyan-500/35 via-blue-500/20 to-sky-400/15 border-cyan-300/50',
    tooltip: 'Code Debugging Station',
    detail: 'Terminal core'
  },
  plant: {
    icon: <Sprout className="h-8 w-8" />,
    label: 'Plant',
    accent: 'text-emerald-100',
    glow: 'shadow-emerald-500/40',
    panel: 'from-emerald-500/35 via-lime-400/20 to-teal-400/15 border-emerald-300/50',
    tooltip: 'Moisture Control Station',
    detail: 'Bio sensor'
  }
};

export function Hotspot({ type, completed, onClick }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = HOTSPOT_CONFIG[type];

  return (
    <div className="relative group">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, scale: isHovered ? 1 : 0.96 }}
        className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/20 bg-slate-950/85 px-3 py-2 text-center text-xs text-white shadow-2xl shadow-cyan-950/40 backdrop-blur-md pointer-events-none"
      >
        <div className="font-lab-control uppercase tracking-[0.18em] text-cyan-200">{config.tooltip}</div>
        <div className="text-[11px] text-slate-300">{completed ? 'Station repaired' : config.detail}</div>
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-950/85" />
      </motion.div>

      <motion.button
        whileHover={{ y: -8, scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        className={`relative flex h-24 w-24 cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br text-white shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:h-28 md:w-28 ${
          completed
            ? 'from-emerald-400/35 via-lime-300/20 to-cyan-400/20 border-emerald-200/70 shadow-emerald-400/40'
            : `${config.panel} ${config.glow}`
        }`}
        aria-label={`${config.tooltip}${completed ? ' completed' : ''}`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute -inset-5 rounded-full bg-white/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70" />
        <div className="lab-scanline absolute inset-x-0 h-1/2 opacity-60" />

        <div className={`relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-slate-950/30 backdrop-blur-sm ${completed ? 'text-emerald-100' : config.accent}`}>
          {completed ? <CheckCircle2 className="h-9 w-9" /> : config.icon}
        </div>

        <div className="absolute right-2 top-2">
          {completed ? (
            <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-300/60">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          ) : (
            <Sparkles className="lab-pulse h-5 w-5 text-yellow-200" />
          )}
        </div>

        <span className="font-lab-control absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-white/85">
          {config.label}
        </span>
      </motion.button>
    </div>
  );
}
