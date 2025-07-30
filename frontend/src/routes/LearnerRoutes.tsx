import { Routes, Route, Navigate } from 'react-router-dom';
import RequireRole from './guards/RequireRole';
import RoleLayout from '../layouts/RoleLayout';

import LearnerDashboard from '../pages/learner/Dashboard';
import ProfilePage from '../pages/learner/Profile';
import AssessmentPage from '../pages/learner/Assessment';

export default function LearnerRoutes() {
  return (
    <RequireRole role="learner">
      <RoleLayout>
        <Routes>
          <Route path="/learner" element={<LearnerDashboard />} />
          <Route path="/learner/profile" element={<ProfilePage />} />
          <Route path="/learner/assessment" element={<AssessmentPage />} />
          <Route path="*" element={<Navigate to="/learner" replace />} />
        </Routes>
      </RoleLayout>
    </RequireRole>
  );
}
