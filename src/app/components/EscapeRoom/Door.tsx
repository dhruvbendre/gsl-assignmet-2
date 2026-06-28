import { useState } from 'react';
import { motion } from 'motion/react';
import { DoorOpen, Lock, CheckCircle2, KeyRound } from 'lucide-react';

interface DoorProps {
  unlocked: boolean;
  opened: boolean;
  completedCount: number;
  onClick: () => void;
}

export function Door({ unlocked, opened, completedCount, onClick }: DoorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const indicatorLights = [1, 2, 3, 4];

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, scale: isHovered ? 1 : 0.96 }}
        className="absolute bottom-full left-1/2 z-20 mb-4 -translate-x-1/2 whitespace-nowrap rounded-lg border border-amber-200/30 bg-slate-950/90 px-4 py-2 text-center text-xs text-white shadow-2xl shadow-amber-950/40 backdrop-blur-md pointer-events-none"
      >
        <div className="font-lab-control uppercase tracking-[0.18em] text-amber-200">
          {unlocked ? 'Exit ready' : 'Vault locked'}
        </div>
        <div className="text-[11px] text-slate-300">
          {unlocked ? 'Click to open the lab door' : `${4 - completedCount} station${4 - completedCount === 1 ? '' : 's'} remaining`}
        </div>
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-950/90" />
      </motion.div>

      <div className={`relative h-52 w-36 md:h-64 md:w-44 ${unlocked && !opened ? 'lab-door-rumble' : ''}`}>
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1.12 }}
            className="absolute inset-1 rounded-t-[4rem] bg-gradient-to-b from-yellow-200 via-amber-300 to-orange-500 blur-xl"
          />
        )}

        <div className="absolute -inset-3 rounded-t-[4.5rem] border border-cyan-200/25 bg-slate-950/55 shadow-2xl shadow-cyan-950/60 backdrop-blur-sm" />
        <div className="absolute inset-0 rounded-t-[4rem] border-[6px] border-slate-500/80 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-inner overflow-hidden">
          <div className="absolute inset-3 rounded-t-[3rem] border border-cyan-200/10" />
          <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-2">
            {indicatorLights.map((light) => (
              <motion.div
                key={light}
                animate={{
                  opacity: light <= completedCount ? [0.8, 1, 0.8] : 0.45,
                  scale: light <= completedCount ? [1, 1.22, 1] : 1
                }}
                transition={{ duration: 1.1, repeat: light <= completedCount ? Infinity : 0, repeatDelay: 0.4 }}
                className={`h-3 w-3 rounded-full border ${
                  light <= completedCount
                    ? 'border-lime-100 bg-lime-300 shadow-lg shadow-lime-300/70'
                    : 'border-red-200/40 bg-red-500/60'
                }`}
              />
            ))}
          </div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: opened ? -140 : 0 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 origin-left rounded-t-[3.5rem] border-r border-white/10 bg-gradient-to-br ${
              unlocked
                ? 'from-amber-300/30 via-slate-700 to-cyan-900'
                : 'from-slate-600 via-slate-800 to-slate-950'
            }`}
          >
            <div className="absolute inset-6 rounded-full border border-cyan-200/20 bg-slate-950/25" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-400/70 bg-slate-950/40 shadow-inner">
              <div className="absolute inset-4 rounded-full border border-cyan-200/25" />
              <div className="absolute left-1/2 top-1/2 h-2 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/25" />
              <div className="absolute left-1/2 top-1/2 h-20 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/25" />
            </div>
            <div className={`absolute right-5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full ${
              unlocked ? 'bg-amber-300 text-slate-950 shadow-lg shadow-amber-300/60' : 'bg-slate-500 text-slate-200'
            }`}>
              {unlocked ? <KeyRound className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </div>
          </motion.div>

          {!opened && (
            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
              {unlocked ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-12 w-12 place-items-center rounded-full bg-lime-300 text-slate-950 shadow-lg shadow-lime-300/60">
                  <CheckCircle2 className="h-7 w-7" />
                </motion.div>
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-slate-950/65 text-slate-300">
                  <Lock className="h-7 w-7" />
                </div>
              )}
            </div>
          )}
        </div>

        {unlocked && (
          <div className="absolute -inset-5 rounded-t-[5rem] bg-amber-300/20 blur-2xl" />
        )}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={onClick}
          className="absolute inset-0 z-10 cursor-zoom-in rounded-t-[4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label={unlocked ? 'Open door and escape' : `Locked door, ${4 - completedCount} stations remaining`}
        />

        <div className="font-lab-control absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-slate-950/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-100 backdrop-blur-md">
          {unlocked ? <DoorOpen className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
          {unlocked ? 'Exit Door' : `Exit ${completedCount}/4`}
        </div>
      </div>
    </div>
  );
}
