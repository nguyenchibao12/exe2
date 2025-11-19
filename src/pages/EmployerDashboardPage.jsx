import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Edit, Trash2, Users, Eye, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import { API_BASE_URL } from '../config/api';

const STATUS_BADGE = {
  Pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  Approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  Rejected: { label: 'Bị từ chối', color: 'bg-red-100 text-red-800', icon: XCircle }
};

function EmployerDashboardPage() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, jobId: null, jobTitle: '' });

  // Fetch jobs của recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Không thể tải danh sách công việc.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchJobs();
    }
  }, [token]);

  // Delete job
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setJobs(prev => prev.filter(job => job._id !== jobId));
      setDeleteModal({ isOpen: false, jobId: null, jobTitle: '' });
      alert('✅ Xóa tin tuyển dụng thành công!');
    } catch (err) {
      console.error("Error deleting job:", err);
      alert(err.response?.data?.message || 'Lỗi khi xóa tin tuyển dụng.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải danh sách tin tuyển dụng...</p>
        </div>
      </div>
    );
  }

  // Stats
  const stats = {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'Pending').length,
    approved: jobs.filter(j => j.status === 'Approved').length,
    rejected: jobs.filter(j => j.status === 'Rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Nhà Tuyển Dụng</h1>
          <p className="text-gray-600">Xin chào, <span className="font-semibold text-indigo-600">{user?.name}</span>! Quản lý tin tuyển dụng của bạn.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng tin</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Briefcase className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã duyệt</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bị từ chối</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tin tuyển dụng của tôi</h2>
          <button
            onClick={() => navigate('/post-job')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
          >
            <Plus size={20} />
            Đăng tin mới
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Chưa có tin tuyển dụng nào</h3>
            <p className="text-gray-500 mb-6">Bắt đầu đăng tin để tìm kiếm ứng viên phù hợp!</p>
            <button
              onClick={() => navigate('/post-job')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md"
            >
              Đăng tin đầu tiên
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => {
              const StatusIcon = STATUS_BADGE[job.status]?.icon || Clock;
              
              return (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
                          {job.logo || '💼'}
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 truncate">
                              {job.title}
                            </h3>
                            {/* Status Badge */}
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${STATUS_BADGE[job.status]?.color} flex-shrink-0`}>
                              <StatusIcon size={12} />
                              {STATUS_BADGE[job.status]?.label}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{job.company}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Briefcase size={14} />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={14} />
                              {job.applicantsCount || 0} ứng viên
                            </span>
                            <span>
                              Đăng: {job.postedDate ? new Date(job.postedDate).toLocaleDateString('vi-VN') : new Date(job.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap lg:flex-col gap-2 lg:w-48 flex-shrink-0">
                      
                      {/* ⭐ NÚT XEM ỨNG VIÊN - QUAN TRỌNG */}
                      <button
                        onClick={() => navigate(`/employer/job/${job._id}/applicants`)}
                        className="flex-1 lg:w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                      >
                        <Users size={16} />
                        Xem ứng viên ({job.applicantsCount || 0})
                      </button>

                      {/* Xem chi tiết */}
                      <button
                        onClick={() => navigate(`/job/${job._id}`)}
                        className="flex-1 lg:w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        Xem tin
                      </button>

                      {/* Chỉnh sửa (nếu cần) */}
                      {/* <button
                        onClick={() => navigate(`/edit-job/${job._id}`)}
                        className="flex-1 lg:w-full px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit size={16} />
                        Sửa
                      </button> */}

                      {/* Xóa */}
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, jobId: job._id, jobTitle: job.title })}
                        className="flex-1 lg:w-full px-4 py-2.5 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Xóa
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Xác nhận xóa tin tuyển dụng
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Bạn có chắc chắn muốn xóa tin <span className="font-semibold">"{deleteModal.jobTitle}"</span>? 
                Hành động này không thể hoàn tác và tất cả đơn ứng tuyển liên quan cũng sẽ bị xóa.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, jobId: null, jobTitle: '' })}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.jobId)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Xóa tin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboardPage;