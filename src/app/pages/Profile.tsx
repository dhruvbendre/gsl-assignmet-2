import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge as UIBadge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { storage } from '../lib/storage';
import { arduinoCourse } from '../data/arduino-course';
import { smartStreetLightCourse } from '../data/smart-street-light';
import { lectures } from '../data/lectures';
import { Badge, Statistics, UserProgress } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  TrendingUp, 
  Target, 
  Zap, 
  Trophy, 
  Home,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Calendar,
  LogOut,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const { signOut, userId } = useAuth();
  const [username] = useState(storage.getUsername(userId || undefined));
  const [avatar] = useState(storage.getAvatar(userId || undefined));
  const [badges, setBadges] = useState<Badge[]>([]);
  const [stats, setStats] = useState<Statistics>(storage.getStatistics(userId || undefined));
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setBadges(storage.getBadges(userId || undefined));
    setStats(storage.getStatistics(userId || undefined));
    setProgress(storage.getProgress(arduinoCourse.id, userId || undefined));
  }, [userId]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const progressPercentage = progress ? (progress.completedChapters.length / arduinoCourse.chapters.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] border-b border-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-white hover:bg-white/20"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-7xl">{avatar}</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">{username}</h2>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-teal-700" />
                  <span className="font-bold text-teal-700">{stats.totalXP} XP</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                  <Trophy className="w-5 h-5 text-purple-700" />
                  <span className="font-bold text-purple-700">{badges.length} Badges</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <BookOpen className="w-5 h-5 text-blue-700" />
                  <span className="font-bold text-blue-700">{stats.coursesCompleted} Courses</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-600" />
                Your Badges
              </h3>

              {/* Earned Badges */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Earned ({badges.length})
                </h4>
                {badges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
                          <div className="text-center">
                            <div className="text-6xl mb-3">{badge.icon}</div>
                            <h4 className="font-bold text-slate-800 mb-2">{badge.name}</h4>
                            <p className="text-sm text-slate-600 mb-3">{badge.description}</p>
                            {badge.earnedDate && (
                              <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(badge.earnedDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-lg">
                    <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No badges earned yet. Complete courses to earn badges!</p>
                  </div>
                )}
              </div>

              {/* Locked Badges */}
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-slate-400" />
                  Locked ({lectures.length - badges.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lectures.map((lecture) => {
                    const isEarned = badges.some(b => b.id === `badge-${lecture.id}` || b.courseId === lecture.course.id);
                    if (isEarned) return null;
                    
                    return (
                      <motion.div
                        key={lecture.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                      >
                        <Card className="p-6 bg-slate-100 border-2 border-slate-200 opacity-75">
                          <div className="text-center">
                            <div className="text-4xl mb-3 grayscale">🔒</div>
                            <h4 className="font-bold text-slate-600 mb-2">{lecture.badge.name}</h4>
                            <p className="text-sm text-slate-500 mb-3">{lecture.badge.description}</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                              <Lock className="w-3 h-3" />
                              <span>Complete {lecture.shortTitle} to unlock</span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Course Progress */}
            <Card className="p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-teal-600" />
                Course Progress
              </h3>

              <div className="space-y-4">
                {lectures.map((lecture) => {
                  const lectureProgress = storage.getProgress(lecture.course.id, userId || undefined);
                  const lectureProgressPercentage = lectureProgress
                    ? (lectureProgress.completedChapters.length / lecture.course.chapters.length) * 100 
                    : 0;
                  
                  return (
                    <div key={lecture.id} className="pb-4 border-b border-slate-200 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">{lecture.shortTitle}</h4>
                          <p className="text-sm text-slate-600">
                            {lectureProgress?.completedChapters.length || 0} / {lecture.course.chapters.length} chapters completed
                          </p>
                        </div>
                        <div className="text-2xl font-bold text-teal-600">
                          {Math.round(lectureProgressPercentage)}%
                        </div>
                      </div>
                      <Progress value={lectureProgressPercentage} className="h-3" />

                      {lectureProgress?.bossFightPassed && (
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg border-2 border-purple-300 mt-3">
                          <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-purple-600" />
                            <div>
                              <div className="font-bold text-purple-900 text-sm">Boss Fight Completed!</div>
                              <div className="text-xs text-purple-700">Score: {lectureProgress.bossFightScore}%</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.totalXP}</div>
                <div className="text-sm text-slate-600">Total XP</div>
              </Card>

              <Card className="p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.quizAccuracy}%</div>
                <div className="text-sm text-slate-600">Quiz Accuracy</div>
              </Card>

              <Card className="p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.bossFightsPassed}</div>
                <div className="text-sm text-slate-600">Boss Fights Won</div>
              </Card>

              <Card className="p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.averageScore}%</div>
                <div className="text-sm text-slate-600">Average Score</div>
              </Card>
            </div>

            <Card className="p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                Detailed Statistics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Questions Answered:</span>
                      <span className="font-bold text-slate-800">{stats.totalQuestionsAnswered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Correct Answers:</span>
                      <span className="font-bold text-green-600">{stats.correctAnswers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Boss Fights Passed:</span>
                      <span className="font-bold text-purple-600">{stats.bossFightsPassed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Boss Fights Failed:</span>
                      <span className="font-bold text-red-600">{stats.bossFightsFailed}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Achievements</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Courses Completed:</span>
                      <span className="font-bold text-slate-800">{stats.coursesCompleted}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total XP Earned:</span>
                      <span className="font-bold text-yellow-600">{stats.totalXP}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Badges Earned:</span>
                      <span className="font-bold text-amber-600">{badges.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
                <Button
                  onClick={() => navigate('/leaderboard')}
                  variant="outline"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
