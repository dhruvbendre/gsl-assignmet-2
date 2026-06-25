 import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { storage } from '../lib/storage';
import { UserProgress } from '../types';
import { 
  Droplets, 
  Radar,
  BookOpen,
  Trophy,
  Zap,
  ArrowRight,
  CheckCircle2,
  Play,
  Target,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

const courses = [
  {
    id: 'arduino-soil-moisture',
    title: 'Arduino Soil Moisture Detector',
    description: 'Build a smart irrigation system that measures soil moisture and automatically waters plants at the perfect time!',
    icon: Droplets,
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    chapters: 10,
    totalXP: 275,
    badge: 'Arduino Soil Guardian',
    badgeIcon: '🌱',
    topics: [
      'Introduction to Arduino',
      'Soil Moisture Sensors',
      'Smart Irrigation',
      'Automation & Control'
    ]
  },
  {
    id: 'arduino-obstacle-alarm',
    title: 'Obstacle Detection Alarm using Arduino',
    description: 'Create a security system using ultrasonic sensors that detects obstacles and triggers visual and audible alarms!',
    icon: Radar,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    chapters: 10,
    totalXP: 275,
    badge: 'Arduino Safety Sentinel',
    badgeIcon: '🛡️',
    topics: [
      'Ultrasonic Sensors',
      'Distance Measurement',
      'Alarm Systems',
      'Security Applications'
    ]
  }
];

export function CourseSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const stats = storage.getStatistics();
    setTotalXP(stats.totalXP || 0);
  }, []);

  const selectCourse = (courseId: string) => {
    // Save the selected course to localStorage
    localStorage.setItem('selected-course', courseId);
    
    // Initialize progress for this course if not exists
    const existingProgress = storage.getProgress(courseId);
    if (!existingProgress) {
      const newProgress: UserProgress = {
        courseId,
        currentChapter: 1,
        completedChapters: [],
        totalXP: 0,
        quizScores: {},
        bossFightAttempts: 0,
        bossFightPassed: false,
        badges: []
      };
      storage.saveProgress(newProgress);
    }

    toast.success('Course Selected!', {
      description: 'Starting your learning adventure...'
    });

    // Navigate directly to dashboard (learning page)
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const continueCourse = (courseId: string) => {
    localStorage.setItem('selected-course', courseId);
    navigate('/dashboard');
  };

  const getProgress = (courseId: string) => {
    const progress = storage.getProgress(courseId);
    if (!progress) return null;
    return {
      currentChapter: progress.currentChapter,
      completedChapters: progress.completedChapters.length,
      totalXP: progress.totalXP,
      bossFightPassed: progress.bossFightPassed
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  STEM Learning Dashboard
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Choose your next learning adventure
                </p>
              </div>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-slate-700">
                {totalXP} XP
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Select Your Course
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Each course includes 10 interactive chapters, quizzes, a boss fight challenge, 
            and a completion badge. Choose one to get started!
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course, index) => {
            const progress = getProgress(course.id);
            const Icon = course.icon;
            const hasProgress = progress !== null;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  hasProgress ? 'ring-2 ring-green-500' : ''
                }`}>
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{course.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-white/20 text-white border-white/30">
                              {course.badgeIcon} {course.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {hasProgress && (
                        <div className="flex items-center gap-1 bg-green-500/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-medium">In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-slate-600 mb-6">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className={`${course.bgColor} p-3 rounded-xl text-center`}>
                        <div className={`text-2xl font-bold ${course.textColor}`}>
                          {course.chapters}
                        </div>
                        <div className="text-xs text-slate-500">Chapters</div>
                      </div>
                      <div className={`${course.bgColor} p-3 rounded-xl text-center`}>
                        <div className={`text-2xl font-bold ${course.textColor}`}>
                          {course.totalXP}
                        </div>
                        <div className="text-xs text-slate-500">Total XP</div>
                      </div>
                      <div className={`${course.bgColor} p-3 rounded-xl text-center`}>
                        <div className={`text-2xl font-bold ${course.textColor}`}>
                          <Trophy className="w-6 h-6 mx-auto" />
                        </div>
                        <div className="text-xs text-slate-500">Boss Fight</div>
                      </div>
                    </div>

                    {/* Topics Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        What you'll learn:
                      </h4>
                      <div className="space-y-2">
                        {course.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color}`} />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress (if exists) */}
                    {hasProgress && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Your Progress</span>
                          <span className="text-sm font-bold text-slate-700">
                            {Math.round((progress.completedChapters / course.chapters) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${course.color} h-2 rounded-full transition-all`}
                            style={{ width: `${(progress.completedChapters / course.chapters) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                          <span>Chapter {progress.currentChapter} of {course.chapters}</span>
                          <span>{progress.totalXP} XP earned</span>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() => hasProgress ? continueCourse(course.id) : selectCourse(course.id)}
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 py-6 text-lg`}
                    >
                      {hasProgress ? (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          Start Course
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
            Every Course Includes
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, title: '10 Chapters', desc: 'Interactive lessons' },
              { icon: Target, title: 'Quizzes', desc: 'Test your knowledge' },
              { icon: Trophy, title: 'Boss Fight', desc: 'Final challenge' },
              { icon: Award, title: 'Badge', desc: 'Earn rewards' }
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