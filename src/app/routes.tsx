import { createBrowserRouter } from 'react-router';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Intro } from './pages/Intro';
import { Dashboard } from './pages/Dashboard';
import { BossFight } from './pages/BossFight';
import { BossFightResult } from './pages/BossFightResult';
import { EscapeRoom } from './pages/EscapeRoom';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { CourseSelection } from './pages/CourseSelection';
import { LectureDashboard } from './pages/LectureDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/course-selection',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <CourseSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <LectureDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/intro',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <Intro />
      </ProtectedRoute>
    ),
  },
  {
    path: '/learning/:lectureId',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/boss-fight/:lectureId',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <BossFight />
      </ProtectedRoute>
    ),
  },
  {
    path: '/boss-fight/:lectureId/result',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <BossFightResult />
      </ProtectedRoute>
    ),
  },
  {
    path: '/escape-room/:lectureId',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <EscapeRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/leaderboard',
    Component: () => (
      <ProtectedRoute requireAuth={true}>
        <Leaderboard />
      </ProtectedRoute>
    ),
  },
]);
