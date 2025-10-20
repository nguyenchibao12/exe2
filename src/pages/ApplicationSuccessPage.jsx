import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { CheckCircle, Briefcase, ArrowLeft } from 'lucide-react';

function ApplicationSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy tên job từ state truyền qua (nếu có)
  const jobTitle = location.state?.jobTitle || 'công việc';

  return (
    // Đổi flex thành grid để căn giữa tốt hơn trên mọi màn hình
    <div className="min-h-screen bg-gray-50 grid place-items-center py-12 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
        <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-500 mx-auto mb-6 animate-pulse" /> {/* Thêm animation */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Ứng tuyển thành công!</h1>
        <p className="text-gray-600 mb-8 text-sm leading-relaxed"> {/* Text nhỏ hơn */}
          Hồ sơ của bạn cho vị trí <span className="font-semibold text-indigo-700">{jobTitle}</span> đã được gửi đến nhà tuyển dụng.
          Chúc bạn may mắn!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center"> {/* Giảm gap */}
          <button // Dùng button thay Link để có thể dùng navigate(-1)
            onClick={() => navigate('/jobs')} // Quay lại trang Jobs
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-sm"
          >
            <Briefcase className="w-4 h-4" />
            Tìm việc khác
          </button>
          <button // Dùng button thay Link
            onClick={() => navigate(-1)} // Quay lại trang trước đó (trang job detail)
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
        </div>
         <p className="text-xs text-gray-400 mt-6">
           Bạn có thể theo dõi trạng thái trong mục "Đơn ứng tuyển" (sắp có).
         </p>
      </div>
    </div>
  );
}

export default ApplicationSuccessPage;