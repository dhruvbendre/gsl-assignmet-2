import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';
import { storage } from '../lib/storage';
import { UserProgress } from '../types';
import { lectures, getLectureById } from '../data/lectures';
import { 
  Clock, 
  Trophy, 
  Zap, 
  ArrowRight, 
  Play,
  CheckCircle2,
  Star,
  BookOpen,
  User,
  BarChart3,
  LogOut,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

export function LectureDashboard() {
  const navigate = useNavigate();
  const { signOut, user, userId } = useAuth();
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress | null>>({});
  const [totalXP, setTotalXP] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load progress for each lecture (user-specific)
    const progress: Record<string, UserProgress | null> = {};
    lectures.forEach(lecture => {
      progress[lecture.id] = storage.getProgress(lecture.course.id, userId || undefined);
    });
    setUserProgress(progress);

    // Load total XP (user-specific)
    const stats = storage.getStatistics(userId || undefined);
    setTotalXP(stats.totalXP || 0);
  }, [userId]);

  const startLecture = (lectureId: string) => {
    // Save the selected lecture
    localStorage.setItem('selected-lecture', lectureId);
    localStorage.setItem('selected-course', lectureId); // For backward compatibility

    const lecture = getLectureById(lectureId);
    if (!lecture) return;

    // Initialize progress if not exists (user-specific)
    const existingProgress = storage.getProgress(lecture.course.id, userId || undefined);
    if (!existingProgress) {
      const newProgress: UserProgress = {
        courseId: lecture.course.id,
        currentChapter: 1,
        completedChapters: [],
        totalXP: 0,
        quizScores: {},
        bossFightAttempts: 0,
        bossFightPassed: false,
        badges: []
      };
      storage.saveProgress(newProgress, userId || undefined);
    }

    toast.success('Lecture Selected!', {
      description: `Starting ${lecture.shortTitle}...`
    });

    setTimeout(() => {
      navigate(`/learning/${lectureId}`);
    }, 500);
  };

  const continueLecture = (lectureId: string) => {
    localStorage.setItem('selected-lecture', lectureId);
    localStorage.setItem('selected-course', lectureId);
    // Navigate to the learning route with the lecture ID
    navigate(`/learning/${lectureId}`);
  };

  const getProgress = (lectureId: string) => {
    const lecture = getLectureById(lectureId);
    if (!lecture) return null;
    
    const progress = storage.getProgress(lecture.course.id, userId || undefined);
    if (!progress) return null;
    
    return {
      currentChapter: progress.currentChapter,
      completedChapters: progress.completedChapters.length,
      totalChapters: lecture.course.chapters.length,
      totalXP: progress.totalXP,
      bossFightPassed: progress.bossFightPassed,
      percentage: Math.round((progress.completedChapters.length / lecture.course.chapters.length) * 100)
    };
  };

  const getUnlockedBadges = () => {
    const badges = storage.getBadges(userId || undefined);
    return badges.filter((badge) =>
      lectures.some((lecture) => badge.id === `badge-${lecture.id}` || badge.courseId === lecture.course.id)
    );
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const completedLectures = Object.values(userProgress).filter(p => p?.completedChapters?.length).length;
  const bossFightsWon = Object.values(userProgress).filter(p => p?.bossFightPassed).length;

  return (
    <div className="gsl-platform min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="pointer-events-none fixed inset-0 gsl-circuit opacity-60" />
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <div>
                <h1 className="gsl-display text-2xl font-black text-slate-950">
                  GetsetLearn Mission Control
                </h1>
                <p className="text-slate-600 text-sm mt-1 font-medium">
                  Choose a practical STEM mission and keep your streak alive
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 rounded-md bg-amber-100 px-4 py-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-slate-700">{totalXP} XP</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/leaderboard')}
                className="hidden md:flex"
                aria-label="View leaderboard"
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/profile')}
                aria-label="View profile"
              >
                <User className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 overflow-hidden rounded-lg bg-slate-950 p-7 text-white shadow-2xl shadow-blue-950/20 md:p-10"
        >
          <div className="absolute inset-0 gsl-circuit opacity-40" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Badge className="mb-4 rounded-md bg-blue-500/20 text-blue-100 hover:bg-blue-500/20">
                Daily streak: 3 missions warmed up
              </Badge>
              <h2 className="gsl-display text-4xl font-black tracking-tight md:text-5xl">
                Select your next STEM mission
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Every mission blends story chapters, quick quizzes, earnable badges, and a final boss fight that proves the concept stuck.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Roadmap', '10 chapters'],
                ['Reward', 'Water Guardian'],
                ['Arena', 'Professor Dryroot'],
                ['Mode', 'Hands-on lab']
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/10 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{label}</div>
                  <div className="gsl-subhead mt-1 text-lg font-extrabold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="rounded-lg border-slate-200 p-6 shadow-xl shadow-slate-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="gsl-display text-3xl font-black text-blue-600">{completedLectures}</div>
                <div className="text-sm text-slate-600">Lectures Completed</div>
              </div>
              <div className="text-center">
                <div className="gsl-display text-3xl font-black text-amber-600">{totalXP}</div>
                <div className="text-sm text-slate-600">Total XP</div>
              </div>
              <div className="text-center">
                <div className="gsl-display text-3xl font-black text-violet-600">{getUnlockedBadges().length}</div>
                <div className="text-sm text-slate-600">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="gsl-display text-3xl font-black text-emerald-600">{bossFightsWon}</div>
                <div className="text-sm text-slate-600">Boss Fights Won</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Lecture Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {lectures.map((lecture, index) => {
            const progress = getProgress(lecture.id);
            const hasProgress = progress !== null;
            const isCompleted = progress?.bossFightPassed;

            return (
              <motion.div
                key={lecture.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`gsl-card-shine gsl-tilt overflow-hidden rounded-lg border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition-all duration-300 ${
                  isCompleted ? 'ring-2 ring-green-500' : hasProgress ? 'ring-2 ring-blue-500' : ''
                }`}>
                  {/* Card Header with Gradient */}
                  <div className="relative bg-slate-950 p-6 text-white">
                    <div className={`absolute inset-0 bg-gradient-to-r ${lecture.color} opacity-90`} />
                    <div className="absolute inset-0 gsl-circuit opacity-30" />
                    <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/15 text-5xl backdrop-blur-sm">{lecture.icon}</div>
                        <div>
                          <h3 className="gsl-subhead text-xl font-extrabold">{lecture.shortTitle}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="rounded-md bg-white/20 text-white border-white/30">
                              <Star className="w-3 h-3 mr-1" />
                              {lecture.difficulty}
                            </Badge>
                            <Badge className="rounded-md bg-white/20 text-white border-white/30">
                              <Clock className="w-3 h-3 mr-1" />
                              {lecture.estimatedTime}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="flex items-center gap-1 bg-green-500/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Complete</span>
                        </div>
                      )}
                      {hasProgress && !isCompleted && (
                        <div className="flex items-center gap-1 bg-blue-500/30 px-3 py-1 rounded-full">
                          <Play className="w-4 h-4" />
                          <span className="text-sm font-medium">In Progress</span>
                        </div>
                      )}
                    </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {lecture.description}
                    </p>

                    {/* Badge Preview */}
                    <div className={`${lecture.bgColor} rounded-lg border border-slate-200 p-4 mb-4`}>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{lecture.badge.icon}</div>
                        <div>
                          <div className={`font-semibold ${lecture.textColor}`}>
                            {lecture.badge.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {lecture.badge.description}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Topics Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2">
                        What you'll learn
                      </h4>
                      <div className="space-y-1">
                        {lecture.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${lecture.color}`} />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress (if exists) */}
                    {hasProgress && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Your Progress</span>
                          <span className="text-sm font-bold text-slate-700">
                            {progress.percentage}%
                          </span>
                        </div>
                        <Progress value={progress.percentage} className="h-2" />
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                          <span>
                            Chapter {progress.currentChapter} of {progress.totalChapters}
                          </span>
                          <span>{progress.totalXP} XP earned</span>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
                      <div className="rounded-md bg-slate-100 p-2">Quiz</div>
                      <div className="rounded-md bg-slate-100 p-2">Badge</div>
                      <div className="rounded-md bg-slate-100 p-2">Boss</div>
                    </div>

                    <Button
                      onClick={() => hasProgress ? continueLecture(lecture.id) : startLecture(lecture.id)}
                      className={`gsl-ripple w-full rounded-md bg-gradient-to-r ${lecture.color} hover:opacity-90 py-6 text-lg font-extrabold`}
                    >
                      {hasProgress ? (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          {isCompleted ? 'Review Lecture' : 'Continue Learning'}
                        </>
                      ) : (
                        <>
                          Start Learning
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-8">
            Every Lecture Includes
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, title: '10 Chapters', desc: 'Interactive lessons' },
              { icon: Trophy, title: 'Quizzes', desc: 'Test your knowledge' },
              { icon: Star, title: 'Boss Fight', desc: 'Final challenge' },
              { icon: Trophy, title: 'Badge', desc: 'Earn rewards' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                <div className="font-semibold text-slate-800">{item.title}</div>
                <div className="text-sm text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
