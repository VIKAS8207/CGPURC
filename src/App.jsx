import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/auth/login";
import ForgotPassword from "./pages/auth/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMaster from './pages/admin/AdminMaster';
import AddUniversity from "./pages/admin/AddUniversity";

// The new Academic Year page!
import AcademicYearMaster from "./pages/admin/master/AcademicYearMaster";
import AdminCourseMaster from './pages/admin/master/AdminCourseMaster';
import BranchCourseMaster from "./pages/admin/master/BranchCourseMaster";
import CertificateVerification from "./pages/admin/master/CertificateVerification";
import UserUploads from "./pages/user/UserUploads";
import DegreeUpload from "./pages/user/uploadpages/DegreeUpload";
import StudentDataUpload from "./pages/user/uploadpages/StudentUpload";
import CourseFeeUpload from "./pages/user/uploadpages/CourseFeeUpload";
import UserCourseMapping from "./pages/user/UserCourseMapping";
import UniversityBranchSetup from './pages/user/UniversityBranchSetup';
import AcademicCalendarUpload from "./pages/user/uploadpages/AcademicCalendarUpload";
import AdminOfficeBearer from './pages/admin/AdminOfficeBearer';
import UserOfficeBearer from "./pages/user/UserOfficeBearer";
import UserPayFees from "./pages/user/UserPayFees";
import UserPaymentHistory from "./pages/user/UserPaymentHistory";
import UserProfile from "./pages/user/UserProfile";


import FinancialConfig from "./pages/admin/master/FinancialConfig";
import PenaltyMaster from "./pages/admin/master/PenaltyMaster";
import DueDateConfig from "./pages/admin/master/DueDateConfig";

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
            <Route path="/admin/add-university" element={<AddUniversity />} />
            <Route path="/admin/master/academic-year" element={<AcademicYearMaster />} />
            <Route path="/admin/master/course-master" element={<AdminCourseMaster />} />
            <Route path="/admin/master/branch-course" element={<BranchCourseMaster />} />
            <Route path="/admin/master/financial-config" element={<FinancialConfig />} />
            <Route path="/admin/penalty-master" element={<PenaltyMaster />} />
            <Route path="/admin/master/due-date-config" element={<DueDateConfig />} />
            <Route path="/admin/office-bearers" element={<AdminOfficeBearer />} />
            <Route path="/admin/verify-certificates" element={<CertificateVerification />} />
            {/* Add more admin pages here like /admin-settings, /payroll, etc. */}
          </Route>

          {/* User Routes (Wrapped in Orange Layout) */}
          <Route element={<UserLayout />}>
            
            <Route path="/user/uploads" element={<UserUploads />} />
            <Route path="/user/uploads/degree" element={<DegreeUpload />} />
            <Route path="/user/course-setup" element={<UserCourseMapping />} />
            <Route path="/university/branch-setup" element={<UniversityBranchSetup />} />
            <Route path="/user/uploads/student-data" element={<StudentDataUpload />} />
            <Route path="/user/uploads/course-fee" element={<CourseFeeUpload />} />
            <Route path="/user/uploads/academic-calendar" element={<AcademicCalendarUpload />} />
            <Route path="/user/office-bearers" element={<UserOfficeBearer />} />
            <Route path="/user/pay-fees" element={<UserPayFees />} />
            <Route path="/user/payment-history" element={<UserPaymentHistory />} />
            <Route path="/user-profile" element={<UserProfile />} />
            
            {/* You can add more user pages here later like /my-courses, /grades */}
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;