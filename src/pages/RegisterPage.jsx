import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Briefcase, Phone, Loader2 } from 'lucide-react';
import axios from 'axios'; // Import axios

// *** ĐỔI LẠI URL NẾU BACKEND NODE.JS CHẠY Ở PORT KHÁC ***
import { API_BASE_URL } from '../config/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('student'); // student or recruiter
  const [formData, setFormData] = useState({
    name: '', // Sẽ dùng cho cả student (họ tên) và recruiter (tên cty)
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Validation cơ bản ---
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự.');
        return;
    }
    if (!formData.agreeTerms) {
        setError('Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.');
        return;
    }
    // --- Hết Validation ---

    setIsLoading(true);

    try {
      // **** SỬA DÒNG GÁN ROLE Ở ĐÂY ****
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        // Thay 'employer' thành 'recruiter' cho khớp với backend schema
        role: userType === 'student' ? 'student' : 'recruiter',
      };
      // **** HẾT PHẦN SỬA ****

      console.log('Sending registration data (role fixed):', payload);

      // Gọi API đăng ký của backend Node.js
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, payload);

      console.log('Registration successful:', response.data);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login'); // Chuyển về trang đăng nhập

    } catch (err) {
      // Xử lý lỗi
      console.error('Registration failed:', err);
      if (err.response?.data?.message) { setError(err.response.data.message); }
      else if (err.request) { setError('Không thể kết nối đến máy chủ.'); }
      else { setError('Đã xảy ra lỗi không mong muốn.'); }
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm cập nhật form data
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Briefcase className="w-10 h-10 text-indigo-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              StudentWork
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h2>
          <p className="text-gray-600 mt-2">Bắt đầu hành trình của bạn ngay hôm nay!</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                userType === 'student'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isLoading}
            >
              Tôi là Sinh viên
            </button>
            <button
              type="button"
              onClick={() => setUserType('recruiter')} // Đổi value thành recruiter khi click
              className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                userType === 'recruiter' // Kiểm tra với recruiter
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isLoading}
            >
              Tôi là Nhà tuyển dụng
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name / Company Name */}
            <div>
              <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                {userType === 'student' ? 'Họ và tên' : 'Tên công ty'} *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="register-name" type="text" name="name" required
                  placeholder={userType === 'student' ? 'Nguyễn Văn A' : 'Công ty TNHH ABC'}
                  className="input-field pl-10"
                  value={formData.name} onChange={handleInputChange} disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1"> Email * </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="register-email" type="email" name="email" required placeholder="your.email@example.com"
                  className="input-field pl-10"
                  value={formData.email} onChange={handleInputChange} disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="register-phone" className="block text-sm font-medium text-gray-700 mb-1"> Số điện thoại * </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="register-phone" type="tel" name="phone" required placeholder="0123456789"
                  className="input-field pl-10"
                  value={formData.phone} onChange={handleInputChange} disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1"> Mật khẩu * </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="register-password" type={showPassword ? 'text' : 'password'} name="password" required placeholder="Ít nhất 6 ký tự"
                  className="input-field pl-10 pr-10"
                  value={formData.password} onChange={handleInputChange} disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={isLoading}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
               <label htmlFor="register-confirmPassword" className="block text-sm font-medium text-gray-700 mb-1"> Xác nhận mật khẩu * </label>
               <div className="relative">
                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input
                   id="register-confirmPassword" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" required placeholder="Nhập lại mật khẩu"
                   className="input-field pl-10 pr-10"
                   value={formData.confirmPassword} onChange={handleInputChange} disabled={isLoading}
                 />
                 <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={isLoading}>
                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
               </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox" id="agreeTerms" name="agreeTerms" required
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5 cursor-pointer" // Thêm cursor
                checked={formData.agreeTerms} onChange={handleInputChange} disabled={isLoading}
              />
              <label htmlFor="agreeTerms" className="ml-2 text-xs text-gray-600 cursor-pointer"> {/* Thêm cursor */}
                Tôi đồng ý với{' '}
                <Link to="/terms" target="_blank" className="text-indigo-600 hover:underline"> Điều khoản </Link> và{' '}
                <Link to="/privacy" target="_blank" className="text-indigo-600 hover:underline"> Chính sách bảo mật </Link> *
              </label>
            </div>

            {/* Hiển thị lỗi */}
            {error && ( <div className="error-message"> {error} </div> )}

            {/* Submit Button */}
            <button type="submit" className="w-full button-primary flex items-center justify-center gap-2 mt-4 disabled:opacity-70" disabled={isLoading} >
              {isLoading ? ( <><Loader2 className="w-5 h-5 animate-spin" /> Đang xử lý...</> ) : ( 'Đăng ký' )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
       {/* CSS dùng chung */}
       <style jsx global>{`
            .input-field { display: block; width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; outline: none; transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out; font-size: 0.875rem; line-height: 1.25rem; }
            .input-field:focus { border-color: #6366F1; box-shadow: 0 0 0 1px #6366F1; }
            .input-field:disabled { background-color: #F3F4F6; cursor: not-allowed; }
            .button-primary { padding: 0.75rem 1.25rem; background-color: #4F46E5; color: white; border-radius: 0.5rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.875rem; line-height: 1.25rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); border: none; cursor: pointer; transition: background-color 150ms ease-in-out, opacity 150ms ease-in-out; }
            .button-primary:hover:not(:disabled) { background-color: #4338CA; }
            .button-primary:disabled { cursor: not-allowed; opacity: 0.7; }
            .error-message { background-color: #FEF2F2; border: 1px solid #FECACA; color: #B91C1C; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; line-height: 1.25rem; }
       `}</style>
    </div>
  );
}

export default RegisterPage;