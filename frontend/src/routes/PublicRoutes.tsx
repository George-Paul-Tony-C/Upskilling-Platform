import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
