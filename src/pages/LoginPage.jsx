import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Briefcase, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Đảm bảo URL này đúng với backend Node.js
import { API_BASE_URL } from '../config/api';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [isLoading, setIsLoading] = useState(false); // Khởi tạo là false
  const [error, setError] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Chỉ true khi submit
    console.log("Login submit started, isLoading:", true); // Log khi bắt đầu submit

    try {
      const payload = { email: formData.email, password: formData.password };
      console.log('Sending login data:', payload);
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, payload);
      console.log('Login successful:', response.data);
      const { user, token } = response.data;
      console.log("Data passed to AuthContext login:", user, token);
      if (user && token) {
        login(user, token);
        console.log(`Redirecting to: ${from}`);
        navigate(from, { replace: true });
      } else {
         console.error("Login response missing user or token:", response.data);
         setError("Đăng nhập thành công nhưng thiếu dữ liệu.");
      }
    } catch (err) {
      console.error('Login failed:', err);
      if (err.response?.data?.message) { setError(err.response.data.message); }
      else if (err.request) { setError('Không thể kết nối đến máy chủ.'); }
      else { setError('Đã xảy ra lỗi không mong muốn.'); }
    } finally {
      setIsLoading(false); // Luôn set false sau khi submit xong (kể cả lỗi)
      console.log("Login submit finished, isLoading:", false); // Log khi kết thúc submit
    }
  };

  // **** HÀM CẬP NHẬT INPUT - THÊM LOG ****
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Log giá trị trước khi cập nhật state
    console.log(`Input change -> Name: ${name}, New Value: ${newValue}`);

    setFormData(prev => {
        const newState = { ...prev, [name]: newValue };
        // Log state *sau khi* cập nhật (bên trong callback của setFormData)
        console.log("FormData updated:", newState);
        return newState;
    });
  };
  // **** HẾT PHẦN THÊM LOG ****

  // Log trạng thái isLoading mỗi khi component render lại
  console.log("Rendering LoginPage, isLoading:", isLoading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo và Tiêu đề */}
        <div className="text-center mb-8">
           <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Briefcase className="w-10 h-10 text-indigo-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> StudentWork </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
          <p className="text-gray-600 mt-2">Chào mừng bạn quay trở lại!</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1.5"> Email </label> {/* Thêm htmlFor */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email-login" // Thêm id
                  name="email" // Đảm bảo có name="email"
                  required
                  placeholder="your.email@example.com"
                  className="input-field pl-10"
                  value={formData.email} // Lấy value từ state
                  onChange={handleInputChange} // Gọi hàm cập nhật state
                  disabled={isLoading} // Kiểm tra lại prop disabled
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1.5"> Mật khẩu </label> {/* Thêm htmlFor */}
              <div className="relative">
                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input
                   type={showPassword ? 'text' : 'password'}
                   id="password-login" // Thêm id
                   name="password" // Đảm bảo có name="password"
                   required
                   placeholder="••••••••"
                   className="input-field pl-10 pr-10"
                   value={formData.password} // Lấy value từ state
                   onChange={handleInputChange} // Gọi hàm cập nhật state
                   disabled={isLoading} // Kiểm tra lại prop disabled
                 />
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={isLoading}>
                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
            </div>
            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center cursor-pointer"> {/* Thêm cursor-pointer */}
                <input type="checkbox" name="remember" className="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" checked={formData.remember} onChange={handleInputChange} disabled={isLoading} />
                <span className="ml-2 text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-indigo-600 hover:underline"> Quên mật khẩu? </Link>
            </div>
             {/* Hiển thị lỗi */}
            {error && ( <div className="error-message"> {error} </div> )}
            {/* Submit Button */}
            <button type="submit" className="w-full button-primary flex items-center justify-center gap-2 pt-1 disabled:opacity-70" disabled={isLoading} >
               {isLoading ? ( <><Loader2 className="w-5 h-5 animate-spin" /> Đang đăng nhập...</> ) : ( 'Đăng nhập' )}
            </button>
          </form>
          {/* Divider và Social Login */}
           <div className="relative my-6"> <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div><div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Hoặc đăng nhập với</span></div></div>
           
          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-gray-600"> Chưa có tài khoản?{' '} <Link to="/register" className="text-indigo-600 font-medium hover:underline"> Đăng ký ngay </Link> </p>
        </div>
      </div>
       {/* CSS dùng chung */}
       <style jsx global>{`
            .input-field { display: block; width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; outline: none; transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out; font-size: 0.875rem; line-height: 1.25rem; }
            .input-field:focus { border-color: #6366F1; box-shadow: 0 0 0 1px #6366F1; }
            .input-field:disabled { background-color: #F3F4F6; cursor: not-allowed; } /* Thêm style disabled */
            .button-primary { padding: 0.75rem 1.25rem; background-color: #4F46E5; color: white; border-radius: 0.5rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.875rem; line-height: 1.25rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); border: none; cursor: pointer; transition: background-color 150ms ease-in-out, opacity 150ms ease-in-out; }
            .button-primary:hover:not(:disabled) { background-color: #4338CA; }
            .button-primary:disabled { cursor: not-allowed; opacity: 0.7; } /* Sửa style disabled */
            .error-message { background-color: #FEF2F2; border: 1px solid #FECACA; color: #B91C1C; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; line-height: 1.25rem; }
       `}</style>
    </div>
  );
}

export default LoginPage;