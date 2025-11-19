import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, DollarSign, CheckCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LOCATIONS } from '../data/locations';
import { API_BASE_URL } from '../config/api'; // ✅ THÊM DÒNG NÀY

function PostJobPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    logo: '💼',
    location: '',
    salary: '',
    type: 'Part-time',
    workDays: '',
    workHours: '',
    description: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    contactPhone: ''
  });

  // 🧠 Gửi form để tạo job
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      try {
        setLoading(true);

        // ✅ SỬA DỤNG API_BASE_URL thay vì hardcode localhost
        const response = await axios.post(
          `${API_BASE_URL}/api/jobs`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newJob = response.data.job;
        alert('✅ Tạo công việc thành công! Chuyển đến bước thanh toán...');
        navigate(`/payment/${newJob._id}`);

      } catch (error) {
        console.error('❌ Error creating job:', error);

        if (error.response?.status === 401) {
          alert('⚠️ Phiên đăng nhập hết hạn hoặc chưa đăng nhập. Vui lòng đăng nhập lại!');
          navigate('/login');
        } else {
          // ✅ Hiển thị chi tiết lỗi để debug
          const errorMsg = error.response?.data?.message || error.message || 'Lỗi không xác định';
          alert(`❌ Lỗi khi tạo công việc: ${errorMsg}`);
          console.error('Full error:', error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  // 🧱 Step 1: Form nhập thông tin công việc
  const renderJobForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin công việc</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tiêu đề */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề công việc *</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              placeholder="VD: Content Writer Part-time"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
        </div>

        {/* Công ty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên công ty *</label>
          <input
            type="text"
            required
            placeholder="Tên công ty của bạn"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        {/* Loại hình */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình *</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Part-time">Part-time</option>
            <option value="Flexible">Linh động</option>
            <option value="Full-time">Full-time</option>
          </select>
        </div>

        {/* Địa điểm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <select
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 appearance-none bg-white cursor-pointer"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              {LOCATIONS.filter(loc => loc.value !== '').map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Lương */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mức lương *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              placeholder="VD: 80-120k/giờ"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>
        </div>

        {/* Ngày & Giờ làm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ngày làm việc *</label>
          <input
            type="text"
            required
            placeholder="VD: Thứ 2, 4, 6"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.workDays}
            onChange={(e) => setFormData({ ...formData, workDays: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Giờ làm việc *</label>
          <input
            type="text"
            required
            placeholder="VD: 14:00-18:00"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.workHours}
            onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
          />
        </div>
      </div>

      {/* Mô tả & Yêu cầu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả *</label>
        <textarea
          required
          rows={5}
          placeholder="Mô tả chi tiết công việc..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Yêu cầu *</label>
        <textarea
          required
          rows={4}
          placeholder="Mỗi yêu cầu một dòng"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />
      </div>

      {/* Quyền lợi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quyền lợi</label>
        <textarea
          rows={3}
          placeholder="Các quyền lợi (mỗi dòng một quyền lợi)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
        />
      </div>

      {/* Liên hệ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email liên hệ *</label>
          <input
            type="email"
            required
            placeholder="hr@company.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SĐT liên hệ *</label>
          <input
            type="tel"
            required
            placeholder="0123456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white shadow-lg rounded-2xl p-8 border border-gray-200"
      >
        {step === 1 && renderJobForm()}

        {step === 2 && (
          <div className="text-center py-10">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Xác nhận đăng tin</h2>
            <p className="text-gray-600 mb-6">
              Bấm "Thanh toán" để hoàn tất đăng tin công việc.
            </p>
          </div>
        )}

        <div className="flex justify-between items-center pt-6 border-t">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-300"
            >
              Quay lại
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : step === 2 ? 'Thanh toán' : 'Tiếp tục'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostJobPage;