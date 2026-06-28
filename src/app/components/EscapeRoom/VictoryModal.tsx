import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, ArrowRight, Zap, Star, CheckCircle2, Sparkles } from 'lucide-react';

interface VictoryModalProps {
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
  course: {
    id: string;
    title: string;
  };
  onComplete: () => void;
}

export function VictoryModal({ lecture, course, onComplete }: VictoryModalProps) {
  const [showBadge, setShowBadge] = useState(false);
  const [showXP, setShowXP] = useState(false);

  useEffect(() => {
    const badgeTimer = setTimeout(() => setShowBadge(true), 500);
    const xpTimer = setTimeout(() => setShowXP(true), 1150);
    return () => {
      clearTimeout(badgeTimer);
      clearTimeout(xpTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/80 p-4 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(250,204,21,0.24),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(236,72,153,0.18),transparent_28%)]" />
      {[...Array(18)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], y: [-20, -180], scale: [0.6, 1.1, 0.8] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.13, repeatDelay: 1.2 }}
          className={`absolute h-2 w-2 rounded-full ${
            index % 3 === 0 ? 'left-1/4 bg-cyan-200' : index % 3 === 1 ? 'left-1/2 bg-amber-200' : 'left-3/4 bg-fuchsia-200'
          } shadow-lg`}
        />
      ))}

      <motion.div
        initial={{ scale: 0.72, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.24 }}
        className="relative w-full max-w-xl overflow-hidden rounded-[30px] border border-white/15 bg-slate-950/80 text-white shadow-2xl shadow-amber-950/30 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.28),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="lab-grid-overlay absolute inset-0 opacity-25" />

        <div className="relative px-6 pb-7 pt-8 text-center sm:px-8">
          <motion.div
            initial={{ scale: 0, rotate: -120 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1, delay: 0.1 }}
            className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border border-amber-100/40 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-400 text-slate-950 shadow-2xl shadow-amber-300/30"
          >
            <Trophy className="h-12 w-12" />
          </motion.div>

          <p className="font-lab-control text-xs font-bold uppercase tracking-[0.28em] text-amber-100">Mission Complete</p>
          <h1 className="font-lab-display mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Lab Escaped
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-300 sm:text-base">
            Professor Arduino is safe, the irrigation prototype is online, and {course.title} is complete.
          </p>

          <div className="mt-7 space-y-4">
            {showBadge && (
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="rounded-2xl border border-amber-200/30 bg-amber-200/10 p-4 text-left shadow-xl shadow-amber-950/20"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-4xl"
                  >
                    {lecture.badge.icon}
                  </motion.div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-amber-200 text-amber-200" />
                      <span className="font-lab-control text-xs font-bold uppercase tracking-[0.16em] text-amber-100">Badge Earned</span>
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">{lecture.badge.name}</div>
                    <div className="text-sm text-slate-300">{lecture.badge.description}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {showXP && (
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="rounded-2xl border border-cyan-200/25 bg-cyan-200/10 p-4">
                  <Zap className="mx-auto h-7 w-7 fill-amber-200 text-amber-200" />
                  <div className="font-lab-display mt-2 text-2xl font-bold">+{lecture.bossFight.xpReward}</div>
                  <div className="text-xs text-cyan-100">XP Earned</div>
                </div>
                <div className="rounded-2xl border border-lime-200/25 bg-lime-200/10 p-4">
                  <CheckCircle2 className="mx-auto h-7 w-7 text-lime-200" />
                  <div className="font-lab-display mt-2 text-2xl font-bold">4/4</div>
                  <div className="text-xs text-lime-100">Stations Repaired</div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 text-left">
            <h3 className="font-lab-control mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Escape Report
            </h3>
            <div className="grid grid-cols-1 gap-2 text-sm text-slate-300 sm:grid-cols-2">
              <span>Knowledge Station secured</span>
              <span>Circuit Assembly online</span>
              <span>Code Debugging uploaded</span>
              <span>Moisture Control calibrated</span>
            </div>
          </div>

          <Button
            onClick={onComplete}
            className="font-lab-control mt-6 w-full rounded-xl bg-gradient-to-r from-amber-300 via-yellow-300 to-lime-300 py-6 text-base font-bold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-200 hover:to-lime-200"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
