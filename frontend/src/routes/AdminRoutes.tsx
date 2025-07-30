import { Routes, Route, Navigate } from 'react-router-dom';
import RequireRole from './guards/RequireRole';
import RoleLayout from '../layouts/RoleLayout';

import AdminDashboard from '../pages/admin/Dashboard';
import UsersPage from '../pages/admin/Users';

export default function AdminRoutes() {
  return (
    <RequireRole role="admin">
      <RoleLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </RoleLayout>
    </RequireRole>
  );
}
