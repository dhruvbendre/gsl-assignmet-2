import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { storage } from '../lib/storage';
import { celebrateBossFight } from '../lib/confetti';
import { getLectureById, getBossFightByLectureId } from '../data/lectures';
import { UserProgress, Question, BossFight as BossFightType, Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, 
  Trophy, 
  X, 
  CheckCircle2, 
  XCircle,
  Award,
  Home,
  RotateCcw,
  Skull
} from 'lucide-react';
import { toast } from 'sonner';

export function BossFight() {
  const navigate = useNavigate();
  const { lectureId } = useParams<{ lectureId: string }>();
  const { userId } = useAuth();
  
  // Get the lecture and boss fight from the route parameter
  const lecture = lectureId ? getLectureById(lectureId) : null;
  const bossFight: BossFightType | null = lecture ? lecture.bossFight : null;
  const course: Course | null = lecture ? lecture.course : null;
  
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!bossFight) return;
    // Shuffle questions on mount
    const shuffled = [...bossFight.questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, [bossFight]);

  // Show loading state if data is not available
  if (!bossFight || !course || !lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-medium">Loading Boss Fight...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / bossFight.totalQuestions) * 100;

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedAnswer }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishBossFight();
    }
  };

  const finishBossFight = () => {
    let correctCount = 0;
    
    shuffledQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / shuffledQuestions.length) * 100);
    const didPass = finalScore >= bossFight.passingScore;

    setScore(finalScore);
    setPassed(didPass);
    setCompleted(true);

    // Update progress (user-specific)
    const progress = storage.getProgress(course.id, userId || undefined);
    if (progress) {
      let xpEarned = 0;
      
      if (didPass) {
        xpEarned = bossFight.xpReward;
        if (finalScore === 100) {
          xpEarned += bossFight.bonusXP;
        }

        const newProgress: UserProgress = {
          ...progress,
          bossFightPassed: true,
          bossFightScore: finalScore,
          totalXP: progress.totalXP + xpEarned,
          bossFightAttempts: progress.bossFightAttempts + 1
        };

        storage.saveProgress(newProgress, userId || undefined);

        // Add badge (user-specific)
        const badges = storage.getBadges(userId || undefined);
        const badgeId = `badge-${lecture.id}`;
        const badgeIcon = lecture.badge.icon;
        const badgeName = lecture.badge.name;
        const badgeDescription = lecture.badge.description;
        
        const badgeExists = badges.find(b => b.id === badgeId);
        
        if (!badgeExists) {
          const newBadge = {
            id: badgeId,
            name: badgeName,
            description: badgeDescription,
            icon: badgeIcon,
            earnedDate: new Date().toISOString(),
            courseId: course.id
          };
          storage.saveBadges([...badges, newBadge], userId || undefined);
          
          setTimeout(() => {
            toast.success('🏆 New Badge Earned!', {
              description: badgeName,
              duration: 5000
            });
          }, 2000);
        }

        // Update stats (user-specific)
        const stats = storage.getStatistics(userId || undefined);
        const newStats = {
          ...stats,
          totalXP: stats.totalXP + xpEarned,
          bossFightsPassed: stats.bossFightsPassed + 1,
          coursesCompleted: stats.coursesCompleted + 1,
          totalQuestionsAnswered: stats.totalQuestionsAnswered + shuffledQuestions.length,
          correctAnswers: stats.correctAnswers + correctCount,
          averageScore: Math.round((stats.averageScore * stats.bossFightsPassed + finalScore) / (stats.bossFightsPassed + 1))
        };
        storage.saveStatistics(newStats, userId || undefined);

        celebrateBossFight();
      } else {
        const newProgress: UserProgress = {
          ...progress,
          bossFightAttempts: progress.bossFightAttempts + 1
        };
        storage.saveProgress(newProgress, userId || undefined);

        // Update stats for failure (user-specific)
        const stats = storage.getStatistics(userId || undefined);
        const newStats = {
          ...stats,
          bossFightsFailed: stats.bossFightsFailed + 1,
          totalQuestionsAnswered: stats.totalQuestionsAnswered + shuffledQuestions.length,
          correctAnswers: stats.correctAnswers + correctCount
        };
        storage.saveStatistics(newStats, userId || undefined);
      }
    }
  };

  const handleRetry = () => {
    setStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setShowExplanation(false);
    setCompleted(false);
    setScore(0);
    setPassed(false);
    
    // Reshuffle
    const shuffled = [...bossFight.questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  const goToDashboard = () => {
    if (lectureId) {
      navigate(`/learning/${lectureId}`);
    } else {
      navigate('/dashboard');
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 bg-black/30 backdrop-blur-xl border-2 border-white/20">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Skull className="w-24 h-24 text-red-400" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {bossFight.title}
              </h1>
              <p className="text-purple-200 text-lg">
                {bossFight.description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-2">⚔️ Challenge Rules</h3>
                <ul className="text-purple-100 space-y-1 text-sm">
                  <li>• {bossFight.totalQuestions} questions to conquer</li>
                  <li>• No notes, no guides - just your knowledge</li>
                  <li>• {bossFight.passingScore}% required to pass</li>
                  <li>• Earn {bossFight.xpReward} XP + {bossFight.bonusXP} bonus XP for perfect score</li>
                </ul>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-2">🏆 Rewards</h3>
                <ul className="text-purple-100 space-y-1 text-sm">
                  <li>• Pass: +{bossFight.xpReward} XP</li>
                  <li>• Perfect Score: +{bossFight.bonusXP} Bonus XP</li>
                  <li>• Badge: {lecture.badge.name}</li>
                  <li>• Course Completion Certificate</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={goToDashboard}
                variant="outline"
                className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
              <Button
                onClick={handleStart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Zap className="mr-2 h-4 w-4" />
                Start Boss Fight
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className={`p-8 ${passed ? 'bg-green-900/30' : 'bg-red-900/30'} backdrop-blur-xl border-2 border-white/20`}>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="inline-block mb-4"
              >
                {passed ? (
                  <Trophy className="w-24 h-24 text-yellow-400" />
                ) : (
                  <XCircle className="w-24 h-24 text-red-400" />
                )}
              </motion.div>
              
              <h1 className="text-4xl font-bold text-white mb-2">
                {passed ? 'Mission Complete! 🎉' : 'Mission Failed'}
              </h1>
              
              <div className="text-6xl font-bold text-white my-4">
                {score}%
              </div>

              <p className="text-purple-100 text-lg">
                {passed 
                  ? `Congratulations! You've mastered the ${course.title}!` 
                  : 'Don\'t give up! Review the course and try again.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{Object.values(answers).filter((ans, idx) => ans === shuffledQuestions[idx].correctAnswer).length}/{shuffledQuestions.length}</div>
                <div className="text-sm text-purple-200">Correct Answers</div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  +{passed ? (score === 100 ? bossFight.xpReward + bossFight.bonusXP : bossFight.xpReward) : 0} XP
                </div>
                <div className="text-sm text-purple-200">XP Earned</div>
              </div>
            </div>

            {passed && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg mb-8 border border-yellow-500/30">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="font-bold text-white">Badge Earned!</div>
                    <div className="text-sm text-yellow-200">{lecture.badge.name}</div>
                  </div>
                </div>
              </div>
            )}

            {!passed && (
              <div className="bg-white/10 p-4 rounded-lg mb-8">
                <h3 className="font-bold text-white mb-2">Need to Review:</h3>
                <ul className="text-purple-100 space-y-1 text-sm">
                  {Array.from(new Set(
                    shuffledQuestions
                      .filter((q, idx) => answers[idx] !== q.correctAnswer)
                      .map(q => q.topic)
                      .filter(Boolean)
                  )).map(topic => (
                    <li key={topic}>• {topic}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={goToDashboard}
                variant="outline"
                className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
              
              {!passed && (
                <Button
                  onClick={handleRetry}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retry Boss Fight
                </Button>
              )}
              
              {passed && (
                <Button
                  onClick={() => navigate('/profile')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Skull className="w-8 h-8" />
            Boss Fight
          </h1>
          <Badge className="bg-white/20 text-white border-white/30">
            Question {currentQuestionIndex + 1} / {bossFight.totalQuestions}
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-2 bg-purple-900/30" />
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-black/30 backdrop-blur-xl border-2 border-white/20">
              {currentQuestion && (
                <>
                  <div className="mb-6">
                    {currentQuestion.difficulty && (
                      <Badge 
                        className={`mb-4 ${
                          currentQuestion.difficulty === 'easy' 
                            ? 'bg-green-500/20 text-green-200 border-green-500/30' 
                            : currentQuestion.difficulty === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30'
                            : 'bg-red-500/20 text-red-200 border-red-500/30'
                        }`}
                      >
                        {currentQuestion.difficulty.toUpperCase()}
                      </Badge>
                    )}
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentQuestion.correctAnswer;
                      const showCorrect = showExplanation && isCorrect;
                      const showWrong = showExplanation && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          whileHover={!showExplanation ? { scale: 1.02 } : {}}
                          whileTap={!showExplanation ? { scale: 0.98 } : {}}
                          onClick={() => !showExplanation && handleAnswerSelect(index)}
                          disabled={showExplanation}
                          className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                            showCorrect
                              ? 'bg-green-500/20 border-green-500 text-white'
                              : showWrong
                              ? 'bg-red-500/20 border-red-500 text-white'
                              : isSelected
                              ? 'bg-purple-500/30 border-purple-400 text-white'
                              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                            {showWrong && <X className="w-5 h-5 text-red-400" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-500/20 border-2 border-blue-500/30 p-4 rounded-xl mb-6"
                    >
                      <p className="text-blue-100">{currentQuestion.explanation}</p>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    {!showExplanation ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Boss Fight'}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}