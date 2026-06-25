import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { ArrowRight, SkipForward } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Intro() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [canSkip, setCanSkip] = useState(false);
  const [countdown, setCountdown] = useState(3);

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

  const handleVideoEnd = () => {
    // After video, check authentication
    if (isAuthenticated) {
      // If already logged in, go to dashboard (course selection)
      navigate('/dashboard');
    } else {
      // If not logged in, go to login page
      // Store intended destination so login can redirect back
      navigate('/login');
    }
  };

  const handleSkip = () => {
    if (canSkip) {
      // After video, check authentication
      if (isAuthenticated) {
        // If already logged in, go to dashboard (course selection)
        navigate('/dashboard');
      } else {
        // If not logged in, go to login page
        navigate('/login');
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0F766E] to-[#134E4A] flex items-center justify-center p-4">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Skip Button */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={handleSkip}
            disabled={!canSkip}
            variant={canSkip ? "default" : "secondary"}
            className={`rounded-full ${canSkip ? 'bg-white text-teal-700 hover:bg-teal-50' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
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

        {/* Video Container */}
        <div className="bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
          <div className="p-6 bg-gradient-to-r from-teal-600 to-cyan-600">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Welcome to Your Learning Adventure! 🚀
            </h1>
          </div>
          
          <div className="relative aspect-video bg-black">
            <video
              id="myvid"
              src="https://firebasestorage.googleapis.com/v0/b/codedex-io.appspot.com/o/videos%2Fvideo%204.mp4?alt=media&token=97302256-baf5-4c1b-a3e1-759fee838c9c"
              controls
              autoPlay
              muted
              onEnded={handleVideoEnd}
              className="w-full h-full"
            />
          </div>

          <div className="p-6 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 text-center">
            <p className="text-white text-lg">
              Watch this intro to get started, or skip to begin your journey!
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { emoji: '📚', text: '10 Interactive Chapters' },
            { emoji: '🎯', text: 'Quizzes & Challenges' },
            { emoji: '🏆', text: 'Epic Boss Battle' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            >
              <div className="text-4xl mb-2">{item.emoji}</div>
              <p className="text-white font-medium">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
