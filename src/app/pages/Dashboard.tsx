import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { storage } from '../lib/storage';
import { celebrateCompletion } from '../lib/confetti';
import { getLectureById } from '../data/lectures';
import { UserProgress, Chapter, Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Trophy, 
  Zap, 
  BookOpen, 
  Target,
  Lightbulb,
  Flame,
  Award,
  User,
  BarChart3,
  Menu,
  X,
  LogOut,
  Wrench,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const BOSS_FIGHT_FEEDBACK_KEY = 'stem-boss-fight-feedback';

export function Dashboard() {
  const navigate = useNavigate();
  const { lectureId } = useParams<{ lectureId: string }>();
  const { signOut, user, userId } = useAuth();
  
  // Get the lecture and course from the route parameter
  const lecture = lectureId ? getLectureById(lectureId) : null;
  const course: Course | null = lecture ? lecture.course : null;
  
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!course) return;
    
    const savedProgress = storage.getProgress(course.id, userId || undefined);
    if (savedProgress) {
      setProgress(savedProgress);
      const chapter = course.chapters.find((ch: Chapter) => ch.number === savedProgress.currentChapter);
      if (chapter) {
        setCurrentChapter(chapter);
      }
    } else {
      const newProgress: UserProgress = {
        courseId: course.id,
        currentChapter: 1,
        completedChapters: [],
        totalXP: 0,
        quizScores: {},
        bossFightAttempts: 0,
        bossFightPassed: false,
        badges: []
      };
      setProgress(newProgress);
      storage.saveProgress(newProgress, userId || undefined);
      setCurrentChapter(course.chapters[0]);
    }
  }, [course, userId]);

  useEffect(() => {
    const rawFeedback = sessionStorage.getItem(BOSS_FIGHT_FEEDBACK_KEY);
    if (!rawFeedback) return;

    sessionStorage.removeItem(BOSS_FIGHT_FEEDBACK_KEY);
    const feedback = JSON.parse(rawFeedback) as { type: 'success' | 'error'; title: string; description: string };
    const notify = feedback.type === 'success' ? toast.success : toast.error;
    notify(feedback.title, { description: feedback.description, duration: 5000 });
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isChapterUnlocked = (chapterNumber: number) => {
    if (chapterNumber === 1) return true;
    if (!progress) return false;
    return progress.completedChapters.includes(chapterNumber - 1);
  };

  const isChapterCompleted = (chapterNumber: number) => {
    return progress?.completedChapters.includes(chapterNumber) || false;
  };

  const selectChapter = (chapter: Chapter) => {
    if (isChapterUnlocked(chapter.number)) {
      setCurrentChapter(chapter);
      setSelectedAnswers({});
      setQuizCompleted(false);
      setShowResults(false);
      if (progress) {
        const updatedProgress = { ...progress, currentChapter: chapter.number };
        setProgress(updatedProgress);
        storage.saveProgress(updatedProgress, userId || undefined);
      }
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    if (!progress || !currentChapter) return;

    const questions = currentChapter.quiz.questions;
    let correct = 0;

    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    const xpEarned = currentChapter.quiz.xpReward;

    // Update progress
    const newCompletedChapters = progress.completedChapters.includes(currentChapter.number)
      ? progress.completedChapters
      : [...progress.completedChapters, currentChapter.number];

    const newProgress: UserProgress = {
      ...progress,
      completedChapters: newCompletedChapters,
      totalXP: progress.totalXP + xpEarned,
      quizScores: {
        ...progress.quizScores,
        [`ch${currentChapter.number}`]: score
      }
    };

    setProgress(newProgress);
    storage.saveProgress(newProgress, userId || undefined);
    setQuizCompleted(true);
    setShowResults(true);

    // Show toast
    toast.success(`🎉 +${xpEarned} XP earned!`, {
      description: `You scored ${score}% on this quiz!`
    });

    // Celebrate if perfect score
    if (score === 100) {
      celebrateCompletion();
    }

    // Update statistics (user-specific)
    const stats = storage.getStatistics(userId || undefined);
    const newStats = {
      ...stats,
      totalXP: stats.totalXP + xpEarned,
      totalQuestionsAnswered: stats.totalQuestionsAnswered + questions.length,
      correctAnswers: stats.correctAnswers + correct,
      quizAccuracy: Math.round(((stats.correctAnswers + correct) / (stats.totalQuestionsAnswered + questions.length)) * 100)
    };
    storage.saveStatistics(newStats, userId || undefined);

    // Check if course completed
    if (course && newCompletedChapters.length === course.chapters.length && !newProgress.bossFightPassed) {
      setTimeout(() => {
        toast.success('🏆 Course Complete!', {
          description: 'The Boss Fight is now unlocked!',
          duration: 5000
        });
      }, 1500);
    }
  };

  const goToBossFight = () => {
    if (lectureId) {
      navigate(`/boss-fight/${lectureId}`);
    }
  };

  // Show loading state if course or chapter is not available
  if (!course || !currentChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = progress ? (progress.completedChapters.length / course.chapters.length) * 100 : 0;
  const allChaptersComplete = progress?.completedChapters.length === course.chapters.length;

  // Components Required data based on course
  const componentsRequired: Record<string, string[]> = {
    'arduino-soil-moisture': [
      'Arduino Uno',
      'Soil Moisture Sensor',
      'Breadboard',
      'Jumper Wires',
      'USB Cable'
    ],
    'arduino-obstacle-alarm': [
      'Arduino Uno',
      'Ultrasonic Sensor (HC-SR04)',
      'Buzzer',
      'Breadboard',
      'Jumper Wires',
      'USB Cable'
    ]
  };

  const currentComponents = course.id ? (componentsRequired[course.id] || []) : [];
  const missionStory = `Sprouty the plant is counting on your engineering team. Mission ${currentChapter.number} teaches the sensor, circuit, or code decision needed to keep the smart garden alive.`;

  return (
    <div className="gsl-platform min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="pointer-events-none fixed inset-0 gsl-circuit opacity-50" />
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 shadow-lg backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-white/20"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <div>
                <h1 className="gsl-display text-2xl font-black text-white">{course.title}</h1>
                <p className="text-blue-100 text-sm font-medium">Mission {currentChapter.number}: {currentChapter.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 rounded-md bg-white/10 backdrop-blur-sm px-4 py-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">{progress?.totalXP || 0} XP</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/leaderboard')}
                className="text-white hover:bg-white/20"
                aria-label="View leaderboard"
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/profile')}
                className="text-white hover:bg-white/20"
                aria-label="View profile"
              >
                <User className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  await signOut();
                  toast.success('Signed out successfully');
                  navigate('/');
                }}
                className="text-white hover:bg-white/20"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-teal-100">Course Progress</span>
              <span className="text-sm font-bold text-white">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-teal-900/30" />
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        {/* Back to Dashboard Button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="rounded-md text-slate-600 hover:text-blue-700 hover:bg-blue-50"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Chapters */}
          <AnimatePresence>
            {(sidebarOpen || !isMobile) && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-full lg:w-80 flex-shrink-0 fixed lg:static inset-y-0 left-0 z-30 lg:z-0 bg-white lg:bg-transparent"
              >
                <ScrollArea className="h-[calc(100vh-200px)] lg:h-auto">
                  <Card className="rounded-lg border-slate-200 p-4 shadow-xl shadow-slate-200/70">
                    <h2 className="gsl-subhead text-lg font-extrabold text-slate-950 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Mission Roadmap
                    </h2>
                    <div className="space-y-2">
                      {course.chapters.map((chapter) => {
                        const unlocked = isChapterUnlocked(chapter.number);
                        const completed = isChapterCompleted(chapter.number);
                        const isCurrent = currentChapter.number === chapter.number;

                        return (
                          <motion.button
                            key={chapter.id}
                            whileHover={unlocked ? { scale: 1.02 } : {}}
                            whileTap={unlocked ? { scale: 0.98 } : {}}
                            onClick={() => selectChapter(chapter)}
                            disabled={!unlocked}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              isCurrent
                                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg'
                                : unlocked
                                ? 'bg-slate-50 hover:bg-blue-50 text-slate-700'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                {completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : unlocked ? (
                                  <Circle className="w-5 h-5" />
                                ) : (
                                  <Lock className="w-5 h-5" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">
                                  Ch {chapter.number}
                                </div>
                                <div className="text-xs opacity-90">
                                  {chapter.title}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                      
                      {/* Boss Fight Button */}
                      <motion.button
                        whileHover={allChaptersComplete ? { scale: 1.02 } : {}}
                        whileTap={allChaptersComplete ? { scale: 0.98 } : {}}
                        onClick={goToBossFight}
                        disabled={!allChaptersComplete}
                        className={`w-full text-left p-4 rounded-lg transition-all mt-4 ${
                          allChaptersComplete
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Trophy className="w-6 h-6" />
                          <div>
                            <div className="font-bold">Boss Fight</div>
                            <div className="text-xs opacity-90">
                              {allChaptersComplete ? 'Ready!' : 'Complete all chapters'}
                            </div>
                          </div>
                        </div>
                      </motion.button>

                      {/* Components Required Card */}
                      {currentComponents.length > 0 && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Wrench className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-slate-800 text-sm">Components Required</h3>
                          </div>
                          <ul className="space-y-1.5">
                            {currentComponents.map((component, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="text-teal-500 mt-0.5">•</span>
                                <span>{component}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Card>
                </ScrollArea>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content - Lesson */}
          <div className="flex-1 min-w-0">
            <Card className="overflow-hidden rounded-lg border-slate-200 p-0 shadow-xl shadow-slate-200/80">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-slate-950 p-6 text-white lg:p-8">
                  <div className="absolute inset-0 gsl-circuit opacity-30" />
                  <div className="relative grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <Badge className="mb-3 rounded-md bg-blue-500/20 text-blue-100 hover:bg-blue-500/20">
                        Mission {currentChapter.number} • {currentChapter.quiz.xpReward} XP checkpoint
                      </Badge>
                      <h2 className="gsl-display text-3xl font-black leading-tight md:text-4xl">
                        {currentChapter.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-slate-300">{missionStory}</p>
                    </div>
                    <div className="gsl-float flex h-28 w-28 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-6xl">
                      {lecture?.icon || 'STEM'}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6 lg:p-8">
                  {/* Learning Objective */}
                  <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-violet-50 p-5">
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="gsl-subhead font-extrabold text-blue-950 mb-1">What you'll learn</h3>
                        <p className="text-blue-900">{currentChapter.learningObjective}</p>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <h3 className="gsl-subhead font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Story Brief
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {currentChapter.explanation}
                    </p>
                  </div>

                  {/* STEM Concept */}
                  <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="gsl-subhead font-extrabold text-blue-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-600" />
                      STEM Concept
                    </h3>
                    <p className="text-blue-800">{currentChapter.stemConcept}</p>
                  </div>

                  {/* Fun Fact */}
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <h3 className="gsl-subhead font-extrabold text-amber-900 mb-2 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-600" />
                      Fun Fact • +20 XP mindset
                    </h3>
                    <p className="text-amber-800">{currentChapter.funFact}</p>
                  </div>
                  </div>

                  {/* Mini Activity */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h3 className="gsl-subhead font-extrabold text-purple-900 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Mini Interaction
                    </h3>
                    <p className="text-purple-800">{currentChapter.miniActivity}</p>
                  </div>

                  {/* Real World Example */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="gsl-subhead font-extrabold text-green-900 mb-2 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-green-600" />
                      Real-World Application
                    </h3>
                    <p className="text-green-800">{currentChapter.realWorldExample}</p>
                  </div>

                  <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="gsl-subhead font-extrabold text-slate-950">Checkpoint ready</h3>
                      <p className="text-sm text-slate-600">Answer the knowledge check to bank XP and unlock the next mission.</p>
                    </div>
                    <Badge className="w-fit rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      Take Quick Quiz
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </Card>

            {/* Mobile Quiz Section */}
            <Card className="p-6 shadow-xl mt-6 xl:hidden">
              <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Chapter Quiz
              </h2>

              {!quizCompleted ? (
                <div className="space-y-4">
                  {currentChapter.quiz.questions.map((question, qIndex) => (
                    <div key={question.id} className="space-y-2">
                      <p className="font-medium text-sm text-slate-800">
                        {qIndex + 1}. {question.question}
                      </p>
                      <div className="space-y-1">
                        {question.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswerSelect(question.id, oIndex)}
                            className={`w-full text-left p-2 rounded text-sm transition-all ${
                              selectedAnswers[question.id] === oIndex
                                ? 'bg-teal-500 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={submitQuiz}
                    disabled={Object.keys(selectedAnswers).length !== currentChapter.quiz.questions.length}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    Submit Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-800">Quiz Completed!</p>
                    <p className="text-sm text-green-700">+{currentChapter.quiz.xpReward} XP</p>
                  </div>

                  {showResults && (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {currentChapter.quiz.questions.map((question, qIndex) => {
                        const userAnswer = selectedAnswers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;

                        return (
                          <div
                            key={question.id}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrect
                                ? 'border-green-300 bg-green-50'
                                : 'border-red-300 bg-red-50'
                            }`}
                          >
                            <p className="text-sm font-medium mb-1">
                              {qIndex + 1}. {question.question}
                            </p>
                            <p className="text-xs text-slate-600 mb-1">
                              Your answer: {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <>
                                <p className="text-xs text-green-700 font-medium">
                                  Correct: {question.options[question.correctAnswer]}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                  {question.explanation}
                                </p>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setQuizCompleted(false);
                      setShowResults(false);
                      setSelectedAnswers({});
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Quiz Panel */}
          <div className="hidden xl:block w-96 flex-shrink-0">
            <Card className="p-6 shadow-xl sticky top-24">
              <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Chapter Quiz
              </h2>

              {!quizCompleted ? (
                <div className="space-y-4">
                  {currentChapter.quiz.questions.map((question, qIndex) => (
                    <div key={question.id} className="space-y-2">
                      <p className="font-medium text-sm text-slate-800">
                        {qIndex + 1}. {question.question}
                      </p>
                      <div className="space-y-1">
                        {question.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswerSelect(question.id, oIndex)}
                            className={`w-full text-left p-2 rounded text-sm transition-all ${
                              selectedAnswers[question.id] === oIndex
                                ? 'bg-teal-500 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={submitQuiz}
                    disabled={Object.keys(selectedAnswers).length !== currentChapter.quiz.questions.length}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    Submit Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-800">Quiz Completed!</p>
                    <p className="text-sm text-green-700">+{currentChapter.quiz.xpReward} XP</p>
                  </div>

                  {showResults && (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {currentChapter.quiz.questions.map((question, qIndex) => {
                        const userAnswer = selectedAnswers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;

                        return (
                          <div
                            key={question.id}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrect
                                ? 'border-green-300 bg-green-50'
                                : 'border-red-300 bg-red-50'
                            }`}
                          >
                            <p className="text-sm font-medium mb-1">
                              {qIndex + 1}. {question.question}
                            </p>
                            <p className="text-xs text-slate-600 mb-1">
                              Your answer: {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <>
                                <p className="text-xs text-green-700 font-medium">
                                  Correct: {question.options[question.correctAnswer]}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                  {question.explanation}
                                </p>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setQuizCompleted(false);
                      setShowResults(false);
                      setSelectedAnswers({});
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
