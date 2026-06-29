import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import {
  Award,
  Beaker,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Droplets,
  HelpCircle,
  Lightbulb,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wrench,
  Zap
} from 'lucide-react';

const programs = [
  {
    icon: Droplets,
    title: 'Smart Irrigation Lab',
    text: 'Build an Arduino soil sensor, decode moisture values, and defend your plant from Professor Dryroot.',
    reward: '120 XP'
  },
  {
    icon: Lightbulb,
    title: 'Smart City Circuits',
    text: 'Prototype street lights, sensors, and automation logic for safer, energy-aware cities.',
    reward: 'Coming next'
  },
  {
    icon: BrainCircuit,
    title: 'Mission Control Basics',
    text: 'Learn loops, logic, debugging, and data through hands-on experiments that feel like play.',
    reward: 'Skill path'
  }
];

const journey = [
  'Choose a STEM mission',
  'Learn through story chapters',
  'Solve quick checkpoints',
  'Win the boss fight',
  'Unlock badges and XP'
];

const faqs = [
  ['Is GetsetLearn for beginners?', 'Yes. Missions start with simple ideas and grow into real project thinking.'],
  ['Does it include quizzes?', 'Every chapter includes checkpoints, XP rewards, and a final boss fight assessment.'],
  ['What makes it practical?', 'Students build around sensors, circuits, code, testing, and real-world use cases.']
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="gsl-platform min-h-screen bg-[#F8FAFC] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-900/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="gsl-display block text-lg font-black leading-none text-white">GetsetLearn</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Learn by Doing</span>
            </span>
          </button>

          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-200 md:flex">
            <a href="#programs" className="hover:text-white">Programs</a>
            <a href="#journey" className="hover:text-white">Journey</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>

          <Button onClick={() => navigate('/login')} className="gsl-ripple rounded-md bg-white text-slate-950 hover:bg-blue-50">
            Sign In
          </Button>
        </nav>
      </header>

      <main>
        <section className="gsl-aurora relative min-h-screen overflow-hidden px-4 pb-20 pt-28 text-white">
          <div className="absolute inset-0 gsl-circuit opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.92))]" />

          {[
            { Icon: Cpu, className: 'left-[8%] top-[22%]' },
            { Icon: Beaker, className: 'right-[12%] top-[20%]' },
            { Icon: Zap, className: 'bottom-[20%] left-[14%]' },
            { Icon: Wrench, className: 'bottom-[25%] right-[18%]' }
          ].map(({ Icon, className }, index) => (
            <motion.div
              key={className}
              className={`absolute hidden h-14 w-14 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-blue-100 backdrop-blur-md md:flex ${className}`}
              animate={{ y: [0, -14, 0], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className="h-7 w-7" />
            </motion.div>
          ))}

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_0.97fr]">
            <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-100">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Premium STEM missions for K-12 builders
              </div>
              <h1 className="gsl-display max-w-5xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
                GetsetLearn
                <span className="block bg-gradient-to-r from-blue-200 via-white to-violet-200 bg-clip-text text-transparent">
                  Learn by Building. Learn by Doing.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Mission-based Arduino, robotics, and practical STEM learning with XP, badges, checkpoints, and cinematic boss fights.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => navigate('/intro')} size="lg" className="gsl-ripple rounded-md bg-blue-600 px-7 py-6 text-base font800 hover:bg-blue-500">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Mission
                </Button>
                <Button onClick={() => navigate('/dashboard')} size="lg" variant="outline" className="rounded-md border-white/25 bg-white/10 px-7 py-6 text-base text-white hover:bg-white/15 hover:text-white">
                  View Programs
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ['10+', 'Mission chapters'],
                  ['275', 'Course XP'],
                  ['1', 'Boss arena']
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <div className="gsl-display text-2xl font-black">{value}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="gsl-float relative"
            >
              <div className="relative rounded-lg border border-white/15 bg-slate-900/70 p-5 shadow-2xl shadow-blue-950/60 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Mission 3</p>
                    <h2 className="gsl-subhead text-2xl font-extrabold">Soil Sensor Lab</h2>
                  </div>
                  <span className="rounded-md bg-amber-400 px-3 py-1 text-sm font-black text-slate-950">+120 XP</span>
                </div>
                <div className="aspect-[4/3] rounded-lg border border-blue-300/20 bg-gradient-to-br from-slate-800 via-blue-950 to-violet-950 p-5">
                  <div className="relative h-full rounded-md gsl-circuit bg-slate-950/40">
                    <div className="absolute left-6 top-6 rounded-md bg-emerald-400/20 p-4 text-emerald-200">
                      <Droplets className="h-10 w-10" />
                    </div>
                    <div className="absolute bottom-6 right-6 rounded-md bg-violet-400/20 p-4 text-violet-100">
                      <Cpu className="h-14 w-14" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-blue-300/30 bg-blue-400/20 gsl-pulse" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  {['Sensor input', 'If-else logic', 'Boss ready'].map((item) => (
                    <div key={item} className="rounded-md bg-white/10 p-3 text-center font-semibold text-slate-200">{item}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="gsl-subhead text-sm font-extrabold uppercase tracking-[0.22em] text-blue-600">Our Mission</p>
              <h2 className="gsl-display mt-3 text-4xl font-black text-slate-950">Making practical learning accessible to every K-12 student.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Why practical learning matters', 'Students remember concepts when they can wire, test, debug, and explain what they built.'],
                ['Modern STEM museum energy', 'Every screen is designed around curiosity, movement, feedback, and a clear next action.']
              ].map(([title, text]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="gsl-subhead text-xl font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="bg-slate-950 px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="gsl-subhead text-sm font-extrabold uppercase tracking-[0.22em] text-emerald-300">Featured STEM Programs</p>
                <h2 className="gsl-display mt-3 text-4xl font-black">Project missions with real rewards</h2>
              </div>
              <Button onClick={() => navigate('/dashboard')} className="rounded-md bg-white text-slate-950 hover:bg-blue-50">
                Open Learning Dashboard
              </Button>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {programs.map((program) => (
                <div key={program.title} className="gsl-card-shine gsl-tilt rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                  <program.icon className="h-10 w-10 text-blue-200" />
                  <h3 className="gsl-subhead mt-5 text-2xl font-extrabold">{program.title}</h3>
                  <p className="mt-3 min-h-24 leading-7 text-slate-300">{program.text}</p>
                  <div className="mt-5 inline-flex rounded-md bg-blue-500/15 px-3 py-2 text-sm font-bold text-blue-100">{program.reward}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="gsl-subhead text-sm font-extrabold uppercase tracking-[0.22em] text-violet-600">Learning Journey</p>
              <h2 className="gsl-display mt-3 text-4xl font-black">A clear path from curiosity to confidence.</h2>
            </div>
            <div className="grid gap-3">
              {journey.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-violet-600 font-black text-white">{index + 1}</span>
                  <span className="gsl-subhead text-lg font-extrabold text-slate-800">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {[
              [Trophy, 'Student Achievements', 'XP streaks, badges, boss wins, and project completion make progress visible.'],
              [Award, 'Certificate Preview', 'Learners can see the practical skills they are building toward.'],
              [HelpCircle, 'Parent Testimonials', 'Designed to feel rigorous, joyful, and useful beyond the classroom.']
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6">
                <Icon className="h-9 w-9 text-blue-600" />
                <h3 className="gsl-subhead mt-4 text-xl font-extrabold">{title as string}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text as string}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-20">
          <h2 className="gsl-display text-center text-4xl font-black">FAQ</h2>
          <div className="mt-8 space-y-3">
            {faqs.map(([question, answer]) => (
              <div key={question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="gsl-subhead font-extrabold text-slate-950">{question}</h3>
                <p className="mt-2 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-7xl rounded-lg bg-gradient-to-r from-blue-600 via-violet-600 to-slate-950 p-8 text-white shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="gsl-display text-3xl font-black">Ready for your next practical STEM mission?</h2>
                <p className="mt-2 text-blue-100">Build, test, quiz, win the boss fight, and collect your badge.</p>
              </div>
              <Button onClick={() => navigate('/intro')} className="rounded-md bg-white text-slate-950 hover:bg-blue-50">
                Launch GetsetLearn
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
