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
import ApplicationsPage from './pages/ApplicationsPage'; // Import đã có
import CVPreviewPage from './pages/CVPreviewPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import ApplicationSuccessPage from './pages/ApplicationSuccessPage';

function App() {
  const [savedJobs, setSavedJobs] = useState([]);
  // **** THÊM STATE MỚI CHO CÁC JOB ĐÃ ỨNG TUYỂN ****
  const [appliedJobs, setAppliedJobs] = useState([]); // Lưu mảng các job ID

  const toggleSaveJob = (jobId) => {
     setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // **** HÀM MỚI ĐỂ THÊM JOB VÀO DANH SÁCH ĐÃ ỨNG TUYỂN ****
  const addApplication = (jobId) => {
    // Chỉ thêm nếu chưa có trong danh sách
    setAppliedJobs(prev => {
      if (!prev.includes(jobId)) {
        return [...prev, jobId];
      }
      return prev; // Không thay đổi nếu đã tồn tại
    });
     console.log("Applied Jobs State:", appliedJobs); // Log để kiểm tra
  };


  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
            <Route path="/jobs" element={<JobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
            <Route
              path="/job/:id"
              // Truyền hàm addApplication xuống JobDetailPage
              element={<JobDetailPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} addApplication={addApplication} />}
            />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/my-jobs"
              element={<SavedJobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />}
            />
            <Route
              path="/applications"
              // Truyền state appliedJobs xuống ApplicationsPage
              element={<ApplicationsPage appliedJobs={appliedJobs} />}
            />
            <Route path="/cv-preview" element={<CVPreviewPage />} />
            <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
            <Route path="/apply-success" element={<ApplicationSuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;