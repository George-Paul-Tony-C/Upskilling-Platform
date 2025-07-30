import { Navigate } from 'react-router-dom';
import { useAuth } from '../../api/hooks/useAuth';
import type { JSX } from 'react/jsx-runtime';

export default function RequireRole({
  role: allowed,
  children
}: {
  role: 'learner' | 'admin';
  children: JSX.Element;
}) {
  const { token, role } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (role !== allowed)
    return <Navigate to={role === 'admin' ? '/admin' : '/learner'} replace />;
  return children;
}
