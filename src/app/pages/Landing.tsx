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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-5xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white/90">Welcome to the Future of Learning</span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Start your
            <br />
            <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Learning Adventure
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-100 max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8 px-2">
            Explore, Build, Experiment, and Learn through immersive STEM experiences.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/intro')}
              className="rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg bg-white text-teal-700 hover:bg-teal-50 shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 w-full sm:w-auto"
            >
              <Rocket className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full mt-12 md:mt-16"
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
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-teal-400/20 rounded-full mb-3 md:mb-4">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-200" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-teal-100">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Section with Image */}
      <ContainerScrollAnimation
        titleComponent={
          <div className="px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4">
              Build Real Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-xl md:max-w-2xl mx-auto px-2">
              Learn Arduino, robotics, and electronics through hands-on projects that make a difference
            </p>
          </div>
        }
      >
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 z-10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Arduino electronics and robotics"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>
      </ContainerScrollAnimation>

      {/* Bottom CTA */}
      <div className="relative z-10 py-12 md:py-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Begin Your Journey?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/intro')}
              className="rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg bg-gradient-to-r from-teal-400 to-cyan-400 text-teal-900 hover:from-teal-300 hover:to-cyan-300 shadow-2xl w-full sm:w-auto"
            >
              Start Learning Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
