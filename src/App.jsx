import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import PostJobPage from './pages/PostJobPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SavedJobsPage from './pages/SavedJobsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import CVPreviewPage from './pages/CVPreviewPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import ApplicationSuccessPage from './pages/ApplicationSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ApplicantListPage from './pages/ApplicantListPage';
import AdminPendingJobsPage from './pages/AdminPendingJobsPage';
import AdminRecruiterProfilePage from './pages/AdminRecruiterProfilePage';
import AdminBlogManagementPage from './pages/AdminBlogManagementPage';
import CreateBlogPage from './pages/CreateBlogPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const addApplication = (jobId) => {
    setAppliedJobs(prev => {
      if (!prev.includes(jobId)) {
        return [...prev, jobId];
      }
      return prev;
    });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* ========================================
                PUBLIC ROUTES - Không cần đăng nhập
            ======================================== */}
            <Route
              path="/"
              element={<HomePage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />}
            />
            <Route
              path="/jobs"
              element={<JobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />}
            />
            <Route
              path="/job/:jobId"
              element={
                <JobDetailPage
                  savedJobs={savedJobs}
                  toggleSaveJob={toggleSaveJob}
                  addApplication={addApplication}
                />
              }
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* ========================================
                STUDENT ROUTES
            ======================================== */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/my-jobs"
              element={<SavedJobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />}
            />
            <Route
              path="/applications"
              element={<ApplicationsPage appliedJobs={appliedJobs} />}
            />
            <Route path="/cv-preview" element={<CVPreviewPage />} />
            <Route path="/apply-success" element={<ApplicationSuccessPage />} />

            {/* ========================================
                RECRUITER ROUTES - ✅ ĐÃ FIX
            ======================================== */}
            <Route
              path="/post-job"
              element={
                <ProtectedRoute allowedRoles={["recruiter"]}>
                  <PostJobPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["recruiter"]}>
                  <EmployerDashboardPage />
                </ProtectedRoute>
              }
            />
            
            {/* ✅ SỬA: Thêm ProtectedRoute cho Payment */}
            <Route
              path="/payment/:jobId"
              element={
                <ProtectedRoute allowedRoles={["recruiter"]}>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

            {/* ✅ SỬA: Thêm ProtectedRoute cho Applicant List */}
            <Route
              path="/employer/job/:jobId/applicants"
              element={
                <ProtectedRoute allowedRoles={["recruiter"]}>
                  <ApplicantListPage />
                </ProtectedRoute>
              }
            />

            {/* ========================================
                ADMIN ROUTES
            ======================================== */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pending-jobs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPendingJobsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recruiter/:recruiterId"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminRecruiterProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blogs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminBlogManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/create"
              element={
                <ProtectedRoute allowedRoles={["admin", "recruiter"]}>
                  <CreateBlogPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;