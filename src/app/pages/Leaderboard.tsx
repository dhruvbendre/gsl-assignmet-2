import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { storage } from '../lib/storage';
import { mockLeaderboardUsers } from '../data/leaderboard';
import { LeaderboardUser } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, 
  Medal, 
  Zap, 
  Award, 
  Home,
  Crown,
  User,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';

export function Leaderboard() {
  const navigate = useNavigate();
  const { signOut, userId } = useAuth();
  const [currentUserStats, setCurrentUserStats] = useState({
    username: storage.getUsername(userId || undefined),
    avatar: storage.getAvatar(userId || undefined),
    totalXP: storage.getStatistics(userId || undefined).totalXP,
    coursesCompleted: storage.getStatistics(userId || undefined).coursesCompleted,
    badges: storage.getBadges(userId || undefined).length
  });
  
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);
  const [allUsers, setAllUsers] = useState<LeaderboardUser[]>([]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  useEffect(() => {
    // Add current user to leaderboard
    const currentUser: LeaderboardUser = {
      id: 'current-user',
      username: currentUserStats.username,
      avatar: currentUserStats.avatar,
      totalXP: currentUserStats.totalXP,
      coursesCompleted: currentUserStats.coursesCompleted,
      badges: currentUserStats.badges,
      rank: 0 // Will be calculated
    };

    // Combine with mock users and sort by XP
    const combined = [...mockLeaderboardUsers, currentUser].sort((a, b) => b.totalXP - a.totalXP);
    
    // Assign ranks
    const ranked = combined.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    setAllUsers(ranked);
  }, [currentUserStats]);

  const currentUserRank = allUsers.find(u => u.id === 'current-user')?.rank || 0;

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-amber-500';
    if (rank === 2) return 'from-slate-300 to-slate-400';
    if (rank === 3) return 'from-orange-400 to-amber-600';
    return 'from-teal-500 to-cyan-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <Trophy className="w-5 h-5 text-teal-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] border-b border-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
              <p className="text-teal-100 mt-1">See how you rank against other learners!</p>
            </div>
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
        {/* Current User Stats */}
        <Card className="p-6 mb-8 shadow-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{currentUserStats.avatar}</div>
              <div>
                <h2 className="text-2xl font-bold">{currentUserStats.username}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Trophy className="w-5 h-5" />
                  <span className="text-lg">Rank #{currentUserRank}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{currentUserStats.totalXP}</div>
                <div className="text-sm text-teal-100">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{currentUserStats.coursesCompleted}</div>
                <div className="text-sm text-teal-100">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{currentUserStats.badges}</div>
                <div className="text-sm text-teal-100">Badges</div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
          </TabsList>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="shadow-xl overflow-hidden">
              {/* Top 3 Podium */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8">
                <div className="flex items-end justify-center gap-4 max-w-4xl mx-auto">
                  {/* 2nd Place */}
                  {allUsers[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1 max-w-xs"
                    >
                      <Card className="bg-gradient-to-br from-slate-300 to-slate-400 p-6 text-center h-48 flex flex-col justify-end">
                        <div className="text-5xl mb-2">{allUsers[1].avatar}</div>
                        <div className="text-lg font-bold text-slate-900">{allUsers[1].username}</div>
                        <div className="text-2xl font-bold text-slate-800 mt-2">{allUsers[1].totalXP} XP</div>
                        <Badge className="mx-auto mt-2 bg-slate-600 text-white">2nd</Badge>
                      </Card>
                    </motion.div>
                  )}

                  {/* 1st Place */}
                  {allUsers[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 max-w-xs"
                    >
                      <Card className="bg-gradient-to-br from-yellow-400 to-amber-500 p-6 text-center h-56 flex flex-col justify-end">
                        <Crown className="w-12 h-12 mx-auto mb-2 text-yellow-800" />
                        <div className="text-6xl mb-2">{allUsers[0].avatar}</div>
                        <div className="text-xl font-bold text-yellow-900">{allUsers[0].username}</div>
                        <div className="text-3xl font-bold text-yellow-800 mt-2">{allUsers[0].totalXP} XP</div>
                        <Badge className="mx-auto mt-2 bg-yellow-700 text-white">1st</Badge>
                      </Card>
                    </motion.div>
                  )}

                  {/* 3rd Place */}
                  {allUsers[2] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex-1 max-w-xs"
                    >
                      <Card className="bg-gradient-to-br from-orange-400 to-amber-600 p-6 text-center h-40 flex flex-col justify-end">
                        <div className="text-4xl mb-2">{allUsers[2].avatar}</div>
                        <div className="font-bold text-orange-900">{allUsers[2].username}</div>
                        <div className="text-xl font-bold text-orange-800 mt-2">{allUsers[2].totalXP} XP</div>
                        <Badge className="mx-auto mt-2 bg-orange-700 text-white">3rd</Badge>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Rest of Leaderboard */}
              <div className="p-6">
                <div className="space-y-2">
                  {allUsers.slice(3).map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl transition-all ${
                        user.id === 'current-user'
                          ? 'bg-gradient-to-r from-teal-100 to-cyan-100 border-2 border-teal-500'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 text-center">
                            <span className="text-2xl font-bold text-slate-700">#{user.rank}</span>
                          </div>
                          <div className="text-4xl">{user.avatar}</div>
                          <div>
                            <div className="font-bold text-slate-800 flex items-center gap-2">
                              {user.username}
                              {user.id === 'current-user' && (
                                <Badge className="bg-teal-600 text-white text-xs">You</Badge>
                              )}
                            </div>
                            <div className="text-sm text-slate-600">
                              {user.coursesCompleted} courses • {user.badges} badges
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-yellow-600">
                            <Zap className="w-5 h-5" />
                            <span className="text-xl font-bold">{user.totalXP}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select User to Compare */}
              <Card className="p-6 shadow-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  Select User to Compare
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {allUsers.filter(u => u.id !== 'current-user').map(user => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedUser?.id === user.id
                          ? 'bg-teal-500 text-white'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div className="flex-1">
                          <div className="font-semibold">{user.username}</div>
                          <div className="text-sm opacity-80">{user.totalXP} XP</div>
                        </div>
                        <Badge variant="outline">Rank #{user.rank}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Comparison Results */}
              <Card className="p-6 shadow-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Comparison
                </h3>

                {selectedUser ? (
                  <div className="space-y-6">
                    {/* XP Comparison */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">Total XP</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-20 text-right font-bold text-teal-600">{currentUserStats.totalXP}</div>
                          <div className="flex-1 bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full"
                              style={{ width: `${Math.min((currentUserStats.totalXP / Math.max(currentUserStats.totalXP, selectedUser.totalXP)) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">You</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-20 text-right font-bold text-purple-600">{selectedUser.totalXP}</div>
                          <div className="flex-1 bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                              style={{ width: `${Math.min((selectedUser.totalXP / Math.max(currentUserStats.totalXP, selectedUser.totalXP)) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">{selectedUser.username}</span>
                        </div>
                      </div>
                    </div>

                    {/* Courses Comparison */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">Courses Completed</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-teal-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-teal-600">{currentUserStats.coursesCompleted}</div>
                          <div className="text-sm text-teal-700">You</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-purple-600">{selectedUser.coursesCompleted}</div>
                          <div className="text-sm text-purple-700">{selectedUser.username}</div>
                        </div>
                      </div>
                    </div>

                    {/* Badges Comparison */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">Badges Earned</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-teal-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-teal-600">{currentUserStats.badges}</div>
                          <div className="text-sm text-teal-700">You</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-purple-600">{selectedUser.badges}</div>
                          <div className="text-sm text-purple-700">{selectedUser.username}</div>
                        </div>
                      </div>
                    </div>

                    {/* Rank Comparison */}
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-slate-600 mb-2">Rank Difference</div>
                        <div className="text-4xl font-bold text-slate-800">
                          {Math.abs(currentUserRank - selectedUser.rank)}
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          {currentUserRank < selectedUser.rank 
                            ? `You're ${selectedUser.rank - currentUserRank} ranks ahead!` 
                            : `${currentUserRank - selectedUser.rank} ranks behind`}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Select a user to compare stats</p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
