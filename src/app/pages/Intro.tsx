import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { ArrowRight, BadgeCheck, Clock3, Gauge, Play, Shield, SkipForward, Sparkles, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Intro() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [canSkip, setCanSkip] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [launching, setLaunching] = useState(false);
  const [launchCount, setLaunchCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  const startLaunchSequence = () => {
    if (launching) return;
    setLaunching(true);
    setLaunchCount(3);
  };

  useEffect(() => {
    if (!launching) return;

    if (launchCount === 0) {
      const timer = window.setTimeout(goNext, 420);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => setLaunchCount(prev => prev - 1), 850);
    return () => window.clearTimeout(timer);
  }, [launchCount, launching]);

  const handleSkip = () => {
    if (canSkip) startLaunchSequence();
  };

  return (
    <div className="gsl-platform relative min-h-screen overflow-hidden bg-[#050816] p-4 text-white">
      <div className="absolute inset-0 gsl-aurora" />
      <div className="absolute inset-0 gsl-circuit opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.24),rgba(2,6,23,0.92)),radial-gradient(circle_at_50%_8%,rgba(34,211,238,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-200/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {launching && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            key={launchCount}
            className="text-center"
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="gsl-subhead mb-5 text-sm font-black uppercase tracking-[0.28em] text-cyan-200">
              Mission Starting...
            </p>
            <p className="font-lab-display text-8xl font-black text-white">
              {launchCount === 0 ? 'GO' : launchCount}
            </p>
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="grid w-full items-center gap-6 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <aside className="rounded-lg border border-white/12 bg-white/9 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl lg:p-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber-100">
              <Shield className="h-4 w-4" />
              Mission Briefing
            </div>
            <h1 className="gsl-display text-4xl font-black leading-none text-white lg:text-5xl">
              Soil Sensor Rescue
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-blue-100/78">
              Watch the lab briefing, then launch into your lecture path with the mission context loaded.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { icon: Gauge, label: 'Difficulty', value: 'Rookie' },
                { icon: Trophy, label: 'Reward', value: '+500 XP' },
                { icon: Clock3, label: 'Duration', value: '5 min' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg border border-white/12 bg-slate-950/42 p-4">
                    <Icon className="mb-3 h-5 w-5 text-cyan-200" />
                    <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
                    <div className="mt-1 font-lab-display text-lg text-white">{item.value}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3">
              {[
                'Decode the garden problem',
                'Identify the sensor mission',
                'Prepare for interactive challenges',
              ].map((objective, index) => (
                <motion.div
                  key={objective}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.12 }}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/7 px-3 py-3"
                >
                  <BadgeCheck className="h-5 w-5 text-emerald-200" />
                  <span className="text-sm font-bold text-slate-100">{objective}</span>
                </motion.div>
              ))}
            </div>
          </aside>

          <section className="relative">
            <div className="absolute right-4 top-4 z-20">
              <Button
                onClick={handleSkip}
                disabled={!canSkip || launching}
                variant={canSkip ? 'default' : 'secondary'}
                className={`rounded-full border border-white/14 backdrop-blur-xl ${canSkip ? 'bg-white text-slate-950 hover:bg-cyan-100' : 'bg-white/12 text-white/54 cursor-not-allowed'}`}
              >
                {canSkip ? (
                  <>
                    Skip <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Skip in {countdown}s <SkipForward className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/14 bg-black/48 shadow-[0_30px_100px_rgba(0,0,0,0.62),0_0_44px_rgba(37,99,235,0.16)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/8 px-5 py-4">
                <div>
                  <div className="gsl-subhead text-xs font-black uppercase tracking-[0.2em] text-cyan-100">Mission Feed</div>
                  <div className="gsl-display text-xl font-black text-white">Innovation Lab Orientation</div>
                </div>
                <Sparkles className="h-6 w-6 text-amber-200" />
              </div>
              <div className="relative aspect-video bg-black">
                <video
                  id="myvid"
                  src="https://firebasestorage.googleapis.com/v0/b/codedex-io.appspot.com/o/videos%2Fvideo%204.mp4?alt=media&token=97302256-baf5-4c1b-a3e1-759fee838c9c"
                  controls
                  autoPlay
                  muted
                  onEnded={startLaunchSequence}
                  className="h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <div className="flex flex-col gap-3 border-t border-white/10 bg-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-blue-100/78">
                  Briefing auto-launches when the video ends.
                </p>
                <Button
                  onClick={startLaunchSequence}
                  disabled={launching}
                  className="gsl-ripple rounded-lg bg-gradient-to-r from-cyan-300 to-emerald-300 px-5 font-black text-slate-950 hover:from-cyan-200 hover:to-emerald-200"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Begin Mission
                </Button>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
