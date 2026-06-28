import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getLectureById } from '../data/lectures';
import { celebrateBossFight } from '../lib/confetti';
import { storage } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { UserProgress } from '../types';

const GAME_SAVE_KEY = 'stemEscapeRoomSave';
const GAME_CONTEXT_KEY = 'stem-boss-fight-context';
const GAME_RESULT_KEY = 'stem-boss-fight-result';
const FEEDBACK_KEY = 'stem-boss-fight-feedback';

interface BossFightResultPayload {
  completed: boolean;
  score: number;
  badgeEarned: boolean;
  timeTaken: number;
  remainingHearts: number;
}

export function BossFightResult() {
  const navigate = useNavigate();
  const { lectureId } = useParams<{ lectureId: string }>();
  const { userId } = useAuth();

  useEffect(() => {
    if (!lectureId) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const lecture = getLectureById(lectureId);
    if (!lecture) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const rawResult = sessionStorage.getItem(GAME_RESULT_KEY);
    const result = rawResult ? (JSON.parse(rawResult) as BossFightResultPayload) : null;
    const progress = storage.getProgress(lecture.course.id, userId || undefined);

    // Integration point: only this React callback mutates platform progress.
    // The vanilla game reports outcomes, but never awards badges directly.
    if (result?.completed && progress) {
      const previousHighScore = progress.bossFightHighScore ?? progress.bossFightScore ?? 0;
      const xpEarned = progress.bossFightPassed ? 0 : lecture.bossFight.xpReward;
      const completedChapters = progress.completedChapters.includes(lecture.course.chapters.length)
        ? progress.completedChapters
        : [...progress.completedChapters, lecture.course.chapters.length];

      const updatedProgress: UserProgress = {
        ...progress,
        completedChapters,
        bossFightAttempts: progress.bossFightAttempts + 1,
        bossFightPassed: true,
        bossFightScore: result.score,
        bossFightStatus: 'completed',
        bossFightHighScore: Math.max(previousHighScore, result.score),
        remainingHearts: result.remainingHearts,
        completionTime: result.timeTaken,
        completedAt: new Date().toISOString(),
        totalXP: progress.totalXP + xpEarned
      };
      storage.saveProgress(updatedProgress, userId || undefined);

      const badges = storage.getBadges(userId || undefined);
      const badgeId = `badge-${lecture.id}`;
      if (!badges.some((badge) => badge.id === badgeId)) {
        storage.saveBadges([
          ...badges,
          {
            id: badgeId,
            name: lecture.badge.name,
            description: lecture.badge.description,
            icon: lecture.badge.icon,
            earnedDate: new Date().toISOString(),
            courseId: lecture.course.id
          }
        ], userId || undefined);
      }

      const stats = storage.getStatistics(userId || undefined);
      storage.saveStatistics({
        ...stats,
        totalXP: stats.totalXP + xpEarned,
        bossFightsPassed: progress.bossFightPassed ? stats.bossFightsPassed : stats.bossFightsPassed + 1,
        coursesCompleted: progress.bossFightPassed ? stats.coursesCompleted : stats.coursesCompleted + 1,
        averageScore: Math.round(
          ((stats.averageScore || 0) * Math.max(stats.bossFightsPassed, 0) + result.score) /
            Math.max(stats.bossFightsPassed + 1, 1)
        )
      }, userId || undefined);

      sessionStorage.setItem(FEEDBACK_KEY, JSON.stringify({
        type: 'success',
        title: 'MISSION COMPLETE',
        description: `${lecture.badge.name} earned.`
      }));
      celebrateBossFight();
      navigate('/dashboard', { replace: true });
    } else {
      if (progress) {
        storage.saveProgress({
          ...progress,
          bossFightAttempts: progress.bossFightAttempts + 1,
          bossFightStatus: 'failed',
          remainingHearts: result?.remainingHearts ?? 0,
          completionTime: result?.timeTaken,
          bossFightHighScore: Math.max(progress.bossFightHighScore ?? 0, result?.score ?? 0)
        }, userId || undefined);

        const stats = storage.getStatistics(userId || undefined);
        storage.saveStatistics({
          ...stats,
          bossFightsFailed: stats.bossFightsFailed + 1
        }, userId || undefined);
      }

      sessionStorage.setItem(FEEDBACK_KEY, JSON.stringify({
        type: 'error',
        title: 'You were defeated.',
        description: 'Try the Boss Fight again.'
      }));
      navigate(`/learning/${lecture.id}`, { replace: true });
    }

    sessionStorage.removeItem(GAME_CONTEXT_KEY);
    sessionStorage.removeItem(GAME_RESULT_KEY);
    localStorage.removeItem(GAME_SAVE_KEY);
  }, [lectureId, navigate, userId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      Saving Boss Fight result...
    </div>
  );
}
