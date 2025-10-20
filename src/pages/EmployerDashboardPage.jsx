import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, Clock, Edit, Trash2, PlusCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Đường dẫn đúng
import { allJobs } from '../data/data.js'; // Đường dẫn đúng

// Lọc ra các job giả định là do nhà tuyển dụng này đăng (ví dụ: lấy các job có ID lẻ)
// Trong thực tế, bạn sẽ fetch jobs của employer_id từ API
const getEmployerJobs = (userId) => {
    // Tạm thời lọc theo ID lẻ để demo
    console.log("Filtering jobs for employer ID (demo):", userId);
    return allJobs.filter(job => job.id % 2 !== 0);
};


function EmployerDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // State để lưu jobs, khởi tạo bằng cách gọi hàm lọc
  const [jobs, setJobs] = useState([]);

  // useEffect để lọc jobs và kiểm tra quyền truy cập *sau khi* component mount và user context sẵn sàng
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'employer') {
      console.log("Redirecting: Not authenticated or not an employer.");
      navigate('/login', { replace: true, state: { from: '/employer/dashboard' } }); // Chuyển về login nếu chưa đúng
    } else {
      // Nếu đúng là employer, lọc jobs
      setJobs(getEmployerJobs(user.id)); // Truyền user.id vào hàm lọc (dù hàm demo chưa dùng)
    }
  }, [isAuthenticated, user, navigate]); // Chạy lại khi user thay đổi


  // Hàm xóa job (mô phỏng)
  const handleDeleteJob = (jobId) => {
    if (window.confirm(`Bạn có chắc muốn xóa tin tuyển dụng #${jobId}?`)) {
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
      // TODO: Gọi API xóa job trên backend với jobId
      console.log('Deleted job ID:', jobId);
      alert(`Đã xóa tin tuyển dụng #${jobId} (demo).`);
    }
  };

  // Hiển thị loading hoặc thông báo nếu chưa xác thực xong hoặc không đúng role
   if (!user || user.role !== 'employer') {
    // Vẫn render UI cơ bản trong khi chờ useEffect redirect hoặc khi user không đúng
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h1 className="text-2xl font-semibold text-gray-700">Truy cập bị từ chối</h1>
                 <p className="text-gray-500 mt-2">Bạn cần đăng nhập với tài khoản Nhà tuyển dụng để xem trang này.</p>
                 <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Đăng nhập</Link>
            </div>
        </div>
    );
  }


  // --- Giao diện Dashboard khi đã xác thực là Employer ---
  return (
    <div className="min-h-screen py-12"> {/* Bỏ bg-gray-50 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý tin tuyển dụng</h1>
          <Link
            to="/post-job"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-sm"
          >
            <PlusCircle className="w-5 h-5" />
            Đăng tin mới
          </Link>
        </div>

        {/* Danh sách Job đã đăng */}
        {jobs.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <li key={job.id} className="p-4 hover:bg-gray-50/50 transition-colors"> {/* Nền hover nhẹ hơn */}
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    {/* Thông tin Job */}
                    <div className="flex-grow min-w-0"> {/* Thêm min-w-0 để truncate hoạt động */}
                      <Link to={`/job/${job.id}`} className="block mb-1 group" title={`Xem chi tiết: ${job.title}`}>
                        <h2 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors truncate">{job.title}</h2> {/* truncate */}
                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 truncate"> {/* truncate */}
                          <Briefcase size={14}/> {job.company} - {job.location}
                        </p>
                      </Link>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                         <span className="flex items-center gap-1"><Users size={12}/> {job.applicants} ứng viên</span>
                         <span className="flex items-center gap-1"><Clock size={12}/> Đăng {job.posted}</span>
                         {/* TODO: Thêm trạng thái (Ví dụ: Đang hiển thị, Hết hạn) từ API */}
                         <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Đang hiển thị</span>
                      </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0">
                       <button
                         onClick={() => navigate(`/job/${job.id}`)}
                         className="p-1.5 md:p-2 text-gray-400 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 rounded-md transition-colors" title="Xem chi tiết"
                       > <ExternalLink size={14}/> </button> {/* Size nhỏ hơn */}
                       <button className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-md transition-colors cursor-not-allowed" title="Chỉnh sửa (chưa hoạt động)" disabled> <Edit size={14}/> </button> {/* Disable nút sửa */}
                       <button onClick={() => handleDeleteJob(job.id)} className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-md transition-colors" title="Xóa"> <Trash2 size={14}/> </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
             {/* Có thể thêm phân trang ở đây */}
          </div>
        ) : (
          // Khi chưa đăng job nào
          <div className="text-center py-16 bg-white rounded-lg shadow border border-gray-200">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Bạn chưa đăng tin tuyển dụng nào</h3>
            <p className="text-gray-500 mb-6 text-sm max-w-xs mx-auto">Hãy bắt đầu đăng tin để tìm kiếm ứng viên tài năng cho công ty của bạn.</p>
            <Link
              to="/post-job"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              Đăng tin ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployerDashboardPage;