export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  topic?: string;
}

export interface Quiz {
  id: string;
  chapterId: string;
  questions: Question[];
  xpReward: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  learningObjective: string;
  explanation: string;
  stemConcept: string;
  funFact: string;
  miniActivity: string;
  realWorldExample: string;
  quiz: Quiz;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  totalXP: number;
  badge: string;
}

export interface BossFight {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  totalQuestions: number;
  xpReward: number;
  bonusXP: number;
  timeLimit?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: string;
  courseId?: string;
}

export interface UserProgress {
  courseId: string;
  currentChapter: number;
  completedChapters: number[];
  totalXP: number;
  quizScores: Record<string, number>;
  bossFightAttempts: number;
  bossFightPassed: boolean;
  bossFightScore?: number;
  bossFightStatus?: 'not-started' | 'in-progress' | 'completed' | 'failed';
  bossFightHighScore?: number;
  remainingHearts?: number;
  completionTime?: number;
  completedAt?: string;
  badges: string[];
}

export interface UserProfile {
  username: string;
  avatar: string;
  totalXP: number;
  rank: number;
  badges: Badge[];
  coursesCompleted: number;
  joinDate: string;
}

export interface Statistics {
  coursesCompleted: number;
  totalXP: number;
  quizAccuracy: number;
  bossFightsPassed: number;
  bossFightsFailed: number;
  averageScore: number;
  strongestTopics: string[];
  weakestTopics: string[];
  totalQuestionsAnswered: number;
  correctAnswers: number;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  totalXP: number;
  coursesCompleted: number;
  badges: number;
  rank: number;
}
