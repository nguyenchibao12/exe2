import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Users, Calendar, Loader2, Send, X, AlertTriangle, Heart, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { LOCATIONS } from '../data/locations';

import { API_BASE_URL } from '../config/api';

function JobDetailPage({ savedJobs, toggleSaveJob }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState(null);

  const [hasApplied, setHasApplied] = useState(false);

  // Fetch Job Detail
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs/${jobId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
         const fetchedJob = response.data;

        if (!fetchedJob || Object.keys(fetchedJob).length === 0) {
          throw new Error("API trả về dữ liệu rỗng.");
        }

        setJob(fetchedJob);
        console.log("Job data loaded:", fetchedJob);

        if (isAuthenticated && user?.role === 'student' && token) {
          await checkApplicationStatus(fetchedJob._id, token);
        }

      } catch (err) {
        console.error("Error fetching job detail:", err.response || err);
        if (err.response?.status === 404 || err.message.includes("rỗng")) {
          setError("Không tìm thấy công việc này hoặc Job ID không hợp lệ.");
        } else {
          setError("Lỗi kết nối hoặc lỗi server khi tải công việc.");
        }
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId, isAuthenticated, user, token]);

  // Check Application Status
  const checkApplicationStatus = async (id, currentToken) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/applications/my`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const appliedJobs = (response.data || []).map(app => app.job._id || app.job);
      setHasApplied(appliedJobs.includes(id));
    } catch (err) {
      setHasApplied(false);
    }
  }

  // Handle Apply
  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || user?.role !== 'student') {
      navigate('/login');
      return;
    }
    if (!jobId) {
      setApplyError("Lỗi: Không tìm thấy ID công việc.");
      return;
    }

    setIsApplying(true);
    setApplyError(null);

    try {
      const payload = { jobId: jobId, coverLetter: coverLetter };

      await axios.post(`${API_BASE_URL}/api/applications`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Ứng tuyển thành công! Đơn của bạn đã được nộp.');
      setHasApplied(true);
      setIsModalOpen(false);
      setCoverLetter('');
      navigate('/apply-success', { state: { jobTitle: job.title } });

    } catch (err) {
      console.error("Error applying for job:", err.response || err);
      if (err.response?.status === 400 && err.response?.data?.message.includes("đã ứng tuyển")) {
        setApplyError("Bạn đã nộp đơn cho công việc này rồi.");
      } else {
        setApplyError(err.response?.data?.message || 'Có lỗi xảy ra trong quá trình ứng tuyển.');
      }
    } finally {
      setIsApplying(false);
    }
  };

  // ============= RENDER LOGIC =============

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thông tin công việc...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-red-200">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy công việc</h2>
          <p className="text-gray-600 mb-6">{error || "Công việc này không tồn tại hoặc đã bị xóa."}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Quay lại danh sách việc làm
          </button>
        </div>
      </div>
    );
  }

  // Job exists - safe to destructure
  const { _id, title, company, location, salary, type, description, requirements, benefits, postedDate, expiryDate } = job;
  const isSaved = savedJobs.includes(_id);
  
  // Lấy label địa điểm từ LOCATIONS
  const getLocationLabel = (locationValue) => {
    if (!locationValue) return locationValue;
    const loc = LOCATIONS.find(l => l.value === locationValue);
    return loc ? loc.label : locationValue;
  };
  const locationLabel = getLocationLabel(location);
  
  // Tính số ngày còn lại của gói
  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  const daysRemaining = getDaysRemaining(expiryDate);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Job Header */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{title}</h1>
              <p className="text-xl text-indigo-600 font-semibold">{company}</p>
              <p className="text-sm text-gray-500 mt-2">
                Ngày đăng: {postedDate ? new Date(postedDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'}
              </p>
            </div>

            {/* Apply Button */}
            <div className="flex-shrink-0 flex gap-2 w-full md:w-auto">
              {/* Save Button */}
              <button
                onClick={() => toggleSaveJob(_id)}
                className={`py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0 text-sm md:py-3 md:px-5 shadow-sm ${isSaved ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500' : ''}`} />
                {isSaved ? 'Đã lưu' : 'Lưu tin'}
              </button>

              {/* Apply Button */}
              {hasApplied ? (
                <button
                  disabled
                  className="w-full md:w-auto px-6 py-3 bg-gray-400 text-white rounded-lg font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Đã Ứng Tuyển
                </button>
              ) : (isAuthenticated && user?.role === 'student' ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Ứng Tuyển Ngay
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login', { state: { from: `/job/${jobId}` } })}
                  className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Đăng nhập để ứng tuyển
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Tóm Tắt Công Việc</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-500" />
                  Địa điểm: <span className="font-semibold">{locationLabel}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase size={16} className="text-indigo-500" />
                  Loại hình: <span className="font-semibold">{type}</span>
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign size={16} className="text-indigo-500" />
                  Mức lương: <span className="font-semibold">{salary || 'Thỏa thuận'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  Ngày đăng: <span className="font-semibold">
                    {postedDate ? new Date(postedDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'}
                  </span>
                </p>
                {daysRemaining !== null && daysRemaining > 0 && (
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    Còn lại: <span className="font-semibold text-blue-600">
                      {daysRemaining} ngày
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Mô Tả Công Việc</h3>
              <div
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: description?.replace(/\n/g, '<br/>') || 'Đang cập nhật mô tả.' }}
              />
            </div>

            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Yêu Cầu Ứng Viên</h3>
              <div className="text-gray-700 prose max-w-none">
                {Array.isArray(requirements) ? (
                  <ul>{requirements.map((req, i) => <li key={i}>{req}</li>)}</ul>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: requirements?.replace(/\n/g, '<br/>') || 'Đang cập nhật yêu cầu.' }} />
                )}
              </div>
            </div>

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Quyền Lợi</h3>
                <div className="text-gray-700 prose max-w-none">
                  {Array.isArray(benefits) ? (
                    <ul>{benefits.map((ben, i) => <li key={i}>{ben}</li>)}</ul>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: benefits?.replace(/\n/g, '<br/>') || 'Đang cập nhật quyền lợi.' }} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Về {company}</h3>
              <p className="text-gray-700 text-sm">
                {job.recruiter?.companyDescription || 'Công ty cam kết tạo ra môi trường làm việc chuyên nghiệp, giúp bạn phát triển kỹ năng và cân bằng giữa học tập và công việc.'}
              </p>
              <button
                className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200"
                onClick={() => navigate(`/jobs?company=${company}`)}
              >
                Xem thêm việc làm của {company}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-bold text-gray-900">Ứng tuyển vào {title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-5 space-y-4">

              {applyError && (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm">
                  {applyError}
                </div>
              )}

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                  Thư giới thiệu (Cover Letter) <span className="text-gray-400">(Tùy chọn)</span>
                </label>
                <textarea
                  id="coverLetter"
                  rows="4"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Chia sẻ lý do bạn phù hợp với công việc này..."
                ></textarea>
              </div>

              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <span className="font-semibold text-indigo-600">Lưu ý:</span> Hệ thống sẽ dùng CV được tạo từ Hồ sơ cá nhân của bạn để nộp đơn.
              </p>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isApplying}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2 disabled:bg-indigo-400"
                >
                  {isApplying ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {isApplying ? 'Đang gửi...' : 'Gửi Ứng Tuyển'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailPage;