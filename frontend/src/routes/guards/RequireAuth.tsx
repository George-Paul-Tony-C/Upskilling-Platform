/*-------------------------------------------------------------*
  src/routes/guards/RequireAuth.tsx – redirects if unauth
*-------------------------------------------------------------*/
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../api/hooks/useAuth';
import type { JSX } from 'react';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}