import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from './api/hooks/useAuth';

import AdminRoutes from './routes/AdminRoutes';
import LearnerRoutes from './routes/LearnerRoutes';
import PublicRoutes from './routes/PublicRoutes';

/** Top-level switcher */
export default function App() {
  const { token, role } = useAuth();

  // not signed in → public (login / 404)
  if (!token) return <PublicRoutes />;

  // signed in → send them to their base path (helps on hard refresh)
  if (role === 'admin') return <AdminRoutes />;
  if (role === 'learner') return <LearnerRoutes />;

  // edge case: token but no role
  return <Routes><Route path="*" element={<Navigate to="/login" replace />} /></Routes>;
}
