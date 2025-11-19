import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, Briefcase, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

// Đảm bảo URL đúng
import { API_BASE_URL } from '../config/api';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams(); // <-- Lấy token từ URL parameter
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false); // Khởi tạo false
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

   // Kiểm tra token khi component mount
   useEffect(() => {
     // **** THÊM CONSOLE LOG KIỂM TRA TOKEN ****
     console.log("ResetPasswordPage mounted. Token from URL:", token);
     if (!token) {
       setError("Token đặt lại mật khẩu không hợp lệ hoặc bị thiếu trong đường dẫn.");
       // Có thể thêm navigate('/forgot-password') sau vài giây
     }
   }, [token]); // Chạy lại nếu token thay đổi (dù ít khi)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    console.log("Submit Reset Password. isLoading:", true); // Log submit

    // Kiểm tra lại token trước khi gửi
    if (!token) {
        setError("Token đặt lại mật khẩu không hợp lệ.");
        return;
    }
    if (formData.password !== formData.confirmPassword) { setError('Mật khẩu xác nhận không khớp!'); return; }
    if (formData.password.length < 6) { setError('Mật khẩu mới phải có ít nhất 6 ký tự.'); return; }

    setIsLoading(true);

    try {
      const payload = { password: formData.password };
      console.log('Sending reset password data for token:', token);

      // Gọi API reset-password
      const response = await axios.put(`${API_BASE_URL}/api/auth/reset-password/${token}`, payload);

      console.log('Reset password successful:', response.data);
      setSuccessMessage(response.data.message || "Đặt lại mật khẩu thành công!");

    } catch (err) {
      console.error('Reset password failed:', err);
      if (err.response?.data?.message) { setError(err.response.data.message); }
      else if (err.request) { setError('Không thể kết nối đến máy chủ.'); }
      else { setError('Đã xảy ra lỗi không mong muốn.'); }
    } finally {
      setIsLoading(false);
      console.log("Submit Reset Password finished. isLoading:", false); // Log submit end
    }
  };

  // **** HÀM CẬP NHẬT INPUT - THÊM LOG ****
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Chỉ cần name, value
    console.log(`Input change -> Name: ${name}, New Value: ${value}`); // Log input
    setFormData(prev => {
        const newState = { ...prev, [name]: value };
        console.log("Reset FormData updated:", newState); // Log state mới
        return newState;
    });
  };
  // **** HẾT PHẦN THÊM LOG ****

  // Log trạng thái isLoading mỗi khi render
  console.log("Rendering ResetPasswordPage, isLoading:", isLoading, "Has Token:", !!token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
           <Link to="/" className="inline-flex items-center gap-2 mb-4">
             <Briefcase className="w-10 h-10 text-indigo-600" />
             <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> StudentWork </span>
           </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Đặt lại mật khẩu</h2>

          {/* Hiển thị form hoặc thông báo thành công */}
          {!successMessage ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label htmlFor="reset-password" className="block text-sm font-medium text-gray-700 mb-1.5"> Mật khẩu mới * </label> {/* Thêm htmlFor */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="reset-password" // Thêm id
                    name="password" // Đảm bảo có name="password"
                    required placeholder="Ít nhất 6 ký tự"
                    className="input-field pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange} // Gọi hàm cập nhật
                    disabled={isLoading || !token} // Disable nếu loading HOẶC không có token
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={isLoading || !token}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                 <label htmlFor="reset-confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5"> Xác nhận mật khẩu mới * </label> {/* Thêm htmlFor */}
                 <div className="relative">
                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                   <input
                     type={showConfirmPassword ? 'text' : 'password'}
                     id="reset-confirmPassword" // Thêm id
                     name="confirmPassword" // Đảm bảo có name="confirmPassword"
                     required placeholder="Nhập lại mật khẩu mới"
                     className="input-field pl-10 pr-10"
                     value={formData.confirmPassword}
                     onChange={handleInputChange} // Gọi hàm cập nhật
                     disabled={isLoading || !token} // Disable nếu loading HOẶC không có token
                   />
                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={isLoading || !token}>
                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                   </button>
                 </div>
              </div>

               {/* Hiển thị lỗi */}
              {error && ( <div className="error-message"> {error} </div> )}

              {/* Chỉ hiển thị nút submit nếu có token */}
              {token && (
                  <button type="submit" className="w-full button-primary flex items-center justify-center gap-2 pt-1 disabled:opacity-70" disabled={isLoading} >
                     {isLoading ? ( <><Loader2 className="w-5 h-5 animate-spin" /> Đang cập nhật...</> ) : ( 'Đặt lại mật khẩu' )}
                  </button>
              )}
              {/* Hiển thị thông báo nếu không có token */}
              {!token && !error && (
                   <p className="text-sm text-center text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                       Đường dẫn đặt lại mật khẩu không hợp lệ hoặc bị thiếu. Vui lòng thử lại yêu cầu "Quên mật khẩu".
                   </p>
              )}
            </form>
           ) : (
            // Hiển thị thông báo thành công
            <div className="text-center">
                 <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4"/>
                 <h3 className="text-lg font-semibold text-gray-800">Thành công!</h3>
                 <p className="text-sm text-gray-600 mt-2 mb-6">{successMessage}</p>
                 <Link to="/login" className="button-primary w-full sm:w-auto"> Đi đến trang Đăng nhập </Link>
            </div>
           )}

        </div>
      </div>
       {/* CSS dùng chung */}
       <style jsx global>{`
           .input-field { /* ... */ } .input-field:focus { /* ... */ } .input-field:disabled { /* ... */ }
           .button-primary { /* ... */ } .button-primary:hover:not(:disabled) { /* ... */ } .button-primary:disabled { /* ... */ }
           .error-message { /* ... */ }
       `}</style>
    </div>
  );
}

export default ResetPasswordPage;