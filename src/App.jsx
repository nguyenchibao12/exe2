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

function App() {
  const [savedJobs, setSavedJobs] = useState([]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
          <Route path="/jobs" element={<JobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
          <Route path="/job/:id" element={<JobDetailPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;