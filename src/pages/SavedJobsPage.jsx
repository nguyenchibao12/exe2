import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { Heart, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

function SavedJobsPage({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();
  const { token, isAuthenticated, user } = useAuth();
  const [jobsToShow, setJobsToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'student') {
      navigate('/login', { replace: true, state: { from: '/my-jobs' } });
      return;
    }

    const fetchSavedJobs = async () => {
      if (savedJobs.length === 0) {
        setJobsToShow([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Fetch tất cả jobs đã approved
        const response = await axios.get(`${API_BASE_URL}/api/jobs`);
        const allJobs = response.data || [];
        
        // Lọc ra các job đã lưu
        const saved = allJobs.filter(job => savedJobs.includes(job._id));
        setJobsToShow(saved);
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
        setError('Không thể tải danh sách công việc đã lưu.');
        setJobsToShow([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [savedJobs, isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen py-12"> {/* Container chính */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Công việc đã lưu</h1>
        </div>


        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
            <p className="mt-2 text-gray-600">Đang tải công việc đã lưu...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-200">
            <p className="text-red-600">{error}</p>
          </div>
        ) : jobsToShow.length > 0 ? (
          // Hiển thị danh sách job đã lưu
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsToShow.map(job => (
              <JobCard
                key={job._id}
                job={job}
                // Luôn là true vì đây là trang saved jobs
                isSaved={true}
                onToggleSave={toggleSaveJob} // Vẫn truyền hàm để có thể bỏ lưu
                onClick={() => navigate(`/job/${job._id}`)} // Click để xem chi tiết
              />
            ))}
          </div>
        ) : (
          // Thông báo khi chưa lưu job nào
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-6">
              <Heart className="w-16 h-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có công việc nào được lưu</h3>
            <p className="text-gray-600 mb-6">Hãy nhấn <Heart className="w-4 h-4 inline-block text-red-400 fill-red-400 mx-1" /> để lưu lại công việc bạn quan tâm nhé!</p>
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Tìm việc ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobsPage;