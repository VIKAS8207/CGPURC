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
import StudentFeesUpload from "./pages/user/uploadpages/StudentFeesUpload";
import StudentPromotion from "./pages/user/StudentPromotion";
import UserDashboard from "./pages/user/UserDashboard";


import FinancialConfig from "./pages/admin/master/FinancialConfig";
import PenaltyMaster from "./pages/admin/master/PenaltyMaster";
import DueDateConfig from "./pages/admin/master/DueDateConfig";

// Layouts
import DashboardLayout from "./components/DashboardLayout"; // Admin Blue Theme
import UserLayout from "./components/UserLayout";           // User Orange Theme

import StudentReport from './pages/report/StudentReport';
import StudentEnrolledReport from './pages/report/StudentEnrolledReport';
import UniversityFeesReport from './pages/report/UniversityFeesReport';
import PendingFeesReport from './pages/report/PendingFeesReport';
import UniversityCourseReport from './pages/report/UniversityCourseReport';
import CourseDetailsReport from './pages/report/CourseDetailsReport';
import StudentListReport from './pages/report/StudentListReport';
import OfficeBearerReport from './pages/report/OfficeBearerReport';
import StudentFeesDetailsReport from './pages/report/StudentFeesDetailsReport';

// 👇 1. IMPORT ADDED HERE 👇
import MonthlyCourseFeesDetails from './pages/report/MonthlyCourseFeesDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Standalone Pages */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reports/student-report" element={<StudentReport />} />
          <Route path="/reports/students-enrolled" element={<StudentEnrolledReport />} />
          <Route path="/reports/university-fees" element={<UniversityFeesReport />} />
          <Route path="/reports/pending-fees" element={<PendingFeesReport />} />
          <Route path="/reports/university-courses" element={<UniversityCourseReport />} />
          <Route path="/reports/course-details" element={<CourseDetailsReport />} />
          <Route path="/reports/student-list" element={<StudentListReport />} />
          <Route path="/reports/office-bearers-list" element={<OfficeBearerReport />} />
          <Route path="/reports/student-fees-details" element={<StudentFeesDetailsReport />} />
          
          {/* 👇 2. ROUTE ADDED HERE 👇 */}
          <Route path="/fees-details/:year/:month" element={<MonthlyCourseFeesDetails />} />
          
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
            <Route path="/upload-fees" element={<StudentFeesUpload />} />
            <Route path="/user/student-promotion" element={<StudentPromotion />} />
            <Route path="user-dashboard" element={<UserDashboard />} />
            {/* You can add more user pages here later like /my-courses, /grades */} 
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;