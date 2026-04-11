import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/auth/login";
import ForgotPassword from "./pages/auth/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMaster from './pages/admin/AdminMaster';

// The new Academic Year page!
import AcademicYearMaster from "./pages/admin/master/AcademicYearMaster";

import UserProfile from "./pages/user/UserProfile";

// Layouts
import DashboardLayout from "./components/DashboardLayout"; // Admin Blue Theme
import UserLayout from "./components/UserLayout";           // User Orange Theme



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Standalone Pages */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Admin Routes (Wrapped in Blue Layout) */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/master" element={<AdminMaster />} />
            <Route path="/admin/master/academic-year" element={<AcademicYearMaster />} />
            {/* Add more admin pages here like /admin-settings, /payroll, etc. */}
          </Route>

          {/* User Routes (Wrapped in Orange Layout) */}
          <Route element={<UserLayout />}>
            <Route path="/user-profile" element={<UserProfile />} />
            {/* You can add more user pages here later like /my-courses, /grades */}
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;