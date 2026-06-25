import { UserProgress, Statistics, Badge } from '../types';

const STORAGE_KEYS = {
  PROGRESS: 'learning-adventure-progress',
  STATS: 'learning-adventure-stats',
  BADGES: 'learning-adventure-badges',
  USERNAME: 'learning-adventure-username',
  AVATAR: 'learning-adventure-avatar'
};

/**
 * Gets the user-specific storage key by appending the userId
 * This ensures each user has their own isolated progress data
 */
const getUserKey = (key: string, userId?: string): string => {
  if (!userId) return key;
  return `${key}-${userId}`;
};

export const storage = {
  getProgress: (courseId: string, userId?: string): UserProgress | null => {
    const key = getUserKey(STORAGE_KEYS.PROGRESS, userId);
    const data = localStorage.getItem(key);
    if (!data) return null;
    const allProgress = JSON.parse(data);
    return allProgress[courseId] || null;
  },

  saveProgress: (progress: UserProgress, userId?: string): void => {
    const key = getUserKey(STORAGE_KEYS.PROGRESS, userId);
    const data = localStorage.getItem(key);
    const allProgress = data ? JSON.parse(data) : {};
    allProgress[progress.courseId] = progress;
    localStorage.setItem(key, JSON.stringify(allProgress));
  },

  getStatistics: (userId?: string): Statistics => {
    const key = getUserKey(STORAGE_KEYS.STATS, userId);
    const data = localStorage.getItem(key);
    if (!data) {
      return {
        coursesCompleted: 0,
        totalXP: 0,
        quizAccuracy: 0,
        bossFightsPassed: 0,
        bossFightsFailed: 0,
        averageScore: 0,
        strongestTopics: [],
        weakestTopics: [],
        totalQuestionsAnswered: 0,
        correctAnswers: 0
      };
    }
    return JSON.parse(data);
  },

  saveStatistics: (stats: Statistics, userId?: string): void => {
    const key = getUserKey(STORAGE_KEYS.STATS, userId);
    localStorage.setItem(key, JSON.stringify(stats));
  },

  getBadges: (userId?: string): Badge[] => {
    const key = getUserKey(STORAGE_KEYS.BADGES, userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  saveBadges: (badges: Badge[], userId?: string): void => {
    const key = getUserKey(STORAGE_KEYS.BADGES, userId);
    localStorage.setItem(key, JSON.stringify(badges));
  },

  getUsername: (userId?: string): string => {
    const key = getUserKey(STORAGE_KEYS.USERNAME, userId);
    return localStorage.getItem(key) || 'Student';
  },

  saveUsername: (username: string, userId?: string): void => {
    const key = getUserKey(STORAGE_KEYS.USERNAME, userId);
    localStorage.setItem(key, username);
  },

  getAvatar: (userId?: string): string => {
    const key = getUserKey(STORAGE_KEYS.AVATAR, userId);
    return localStorage.getItem(key) || '🎓';
  },

  saveAvatar: (avatar: string, userId?: string): void => {
    const key = getUserKey(STORAGE_KEYS.AVATAR, userId);
    localStorage.setItem(key, avatar);
  },

  /**
   * Clears all storage for a specific user (identified by userId)
   * If no userId is provided, clears the default (non-user-specific) storage
   */
  clear: (userId?: string): void => {
    if (userId) {
      // Clear only this user's data
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(getUserKey(key, userId));
      });
    } else {
      // Clear default storage (backward compatibility)
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    }
  },

  /**
   * Clears all storage for all users (use with caution)
   */
  clearAll: (): void => {
    Object.keys(localStorage).forEach(key => {
      if (
        key.startsWith(STORAGE_KEYS.PROGRESS) ||
        key.startsWith(STORAGE_KEYS.STATS) ||
        key.startsWith(STORAGE_KEYS.BADGES) ||
        key.startsWith(STORAGE_KEYS.USERNAME) ||
        key.startsWith(STORAGE_KEYS.AVATAR)
      ) {
        localStorage.removeItem(key);
      }
    });
  }
};