 import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { ContainerScrollAnimation } from '../components/ui/container-scroll-animation';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Sparkles, Rocket, Trophy, Target } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F766E] via-[#115E59] to-[#134E4A] overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">LearnQuest</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
            className="text-white hover:bg-white/10 border border-white/20 rounded-full px-6"
          >
            Sign In
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white/90">Welcome to the Future of Learning</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Start your
            <br />
            <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Learning Adventure
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto mb-8">
            Explore, Build, Experiment, and Learn through immersive STEM experiences.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/intro')}
              className="rounded-full px-8 py-6 text-lg bg-white text-teal-700 hover:bg-teal-50 shadow-2xl hover:shadow-teal-500/50 transition-all duration-300"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-16"
        >
          {[
            { icon: Target, title: 'Interactive Lessons', desc: 'Hands-on learning that sticks' },
            { icon: Trophy, title: 'Earn Rewards', desc: 'Badges, XP, and achievements' },
            { icon: Sparkles, title: 'Boss Battles', desc: 'Test your skills in epic challenges' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-400/20 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-teal-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-teal-100">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Section with Image */}
      <ContainerScrollAnimation
        titleComponent={
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Build Real Projects
            </h2>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Learn Arduino, robotics, and electronics through hands-on projects that make a difference
            </p>
          </div>
        }
      >
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 z-10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwcm9ib3RpY3MlMjBlbGVjdHJvbmljcyUyMFNURU18ZW58MXx8fHwxNzgyMjc4MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Arduino electronics and robotics"
            className="w-full h-[500px] object-cover"
          />
        </div>
      </ContainerScrollAnimation>

      {/* Bottom CTA */}
      <div className="relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/intro')}
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-teal-400 to-cyan-400 text-teal-900 hover:from-teal-300 hover:to-cyan-300 shadow-2xl"
            >
              Start Learning Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
