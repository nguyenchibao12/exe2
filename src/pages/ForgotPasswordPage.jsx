import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Briefcase, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

// Đảm bảo URL đúng
import { API_BASE_URL } from '../config/api';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State cho thông báo thành công

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Reset thông báo thành công
    setIsLoading(true);

    if (!email) {
        setError('Vui lòng nhập địa chỉ email.');
        setIsLoading(false);
        return;
    }

    try {
      const payload = { email };
      console.log('Sending forgot password request:', payload);

      // Gọi API forgot-password
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, payload);

      console.log('Forgot password request successful:', response.data);
      setSuccessMessage(response.data.message || "Yêu cầu đã được gửi. Vui lòng kiểm tra email."); // Hiển thị thông báo thành công

    } catch (err) {
      console.error('Forgot password failed:', err);
      if (err.response && err.response.data && err.response.data.message) {
        // Mặc dù backend luôn trả về 200, nhưng có thể có lỗi khác
        setError(err.response.data.message);
      } else if (err.request) {
        setError('Không thể kết nối đến máy chủ.');
      } else {
        setError('Đã xảy ra lỗi không mong muốn.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
           <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Briefcase className="w-10 h-10 text-indigo-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> StudentWork </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Quên mật khẩu</h2>
          <p className="text-gray-600 mt-2">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Chỉ hiển thị form nếu chưa có success message */}
          {!successMessage ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-700 mb-1.5"> Email đăng ký </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email" id="email-forgot" name="email" required placeholder="your.email@example.com"
                    className="input-field pl-10"
                    value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}
                  />
                </div>
              </div>

               {/* Hiển thị lỗi */}
              {error && ( <div className="error-message"> {error} </div> )}

              <button type="submit" className="w-full button-primary flex items-center justify-center gap-2 pt-1 disabled:opacity-70" disabled={isLoading} >
                 {isLoading ? ( <><Loader2 className="w-5 h-5 animate-spin" /> Đang gửi...</> ) : ( 'Gửi liên kết đặt lại' )}
              </button>
            </form>
           ) : (
            // Hiển thị thông báo thành công
            <div className="text-center">
                 <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4"/>
                 <h3 className="text-lg font-semibold text-gray-800">Kiểm tra Email của bạn</h3>
                 <p className="text-sm text-gray-600 mt-2 mb-6">{successMessage}</p>
                 <p className="text-xs text-gray-500">Nếu không thấy email trong hộp thư đến, vui lòng kiểm tra thư mục Spam.</p>
            </div>
           )}

          {/* Back to Login Link */}
          <div className="text-center mt-6 border-t pt-4">
            <Link to="/login" className="text-sm text-indigo-600 hover:underline flex items-center justify-center gap-1">
              <ArrowLeft size={16}/> Quay lại Đăng nhập
            </Link>
          </div>
        </div>
      </div>
       {/* CSS dùng chung */}
       <style jsx global>{`
            .input-field { /* ... */ } .input-field:focus { /* ... */ }
            .button-primary { /* ... */ } .button-primary:hover:not(:disabled) { /* ... */ } .button-primary:disabled { /* ... */ }
            .error-message { /* ... */ }
       `}</style>
    </div>
  );
}

export default ForgotPasswordPage;