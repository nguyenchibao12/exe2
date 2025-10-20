import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { FileText, Briefcase, MapPin, Building, Clock, Check } from 'lucide-react'; // Thêm icons
import { allJobs } from '../data/data.js'; // Import data job
import { useAuth } from '../context/AuthContext'; // Import để check login

// **** NHẬN PROP appliedJobs ****
function ApplicationsPage({ appliedJobs }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Kiểm tra đăng nhập

  // Lọc ra thông tin đầy đủ của các job đã ứng tuyển
  const applications = allJobs.filter(job => appliedJobs.includes(job.id));

  // Thêm trạng thái giả định cho từng application
  const applicationsWithStatus = applications.map((app, index) => ({
      ...app,
      // Tạo status giả: cái đầu 'Đang xem xét', còn lại 'Đã nộp'
      status: index === 0 ? 'Đang xem xét' : 'Đã nộp',
      appliedDate: `Ngày ${15 + index}/10/2024` // Ngày giả định
  }));

   // Nếu chưa đăng nhập, hiển thị thông báo
   if (!isAuthenticated) {
     return (
        <div className="min-h-screen py-12 flex items-center justify-center px-4">
             <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-3">Xem đơn ứng tuyển</h1>
                <p className="text-gray-500 mb-6 text-sm">Vui lòng đăng nhập để xem danh sách các công việc bạn đã ứng tuyển.</p>
                <Link to="/login" state={{ from: '/applications' }} className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 text-sm">Đăng nhập</Link>
             </div>
        </div>
     );
   }

  // --- Giao diện khi đã đăng nhập ---
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Thu nhỏ max-width */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
            <FileText className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Đơn ứng tuyển của tôi</h1>
        </div>

        {applicationsWithStatus.length > 0 ? (
          // Hiển thị danh sách đơn ứng tuyển
          <div className="space-y-4">
            {applicationsWithStatus.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                  {/* Thông tin Job */}
                  <div className="flex-grow min-w-0">
                    <Link to={`/job/${app.id}`} className="group">
                      <h2 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors truncate">{app.title}</h2>
                    </Link>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 truncate">
                      <Building size={14}/> {app.company}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 truncate">
                      <MapPin size={14}/> {app.location}
                    </p>
                  </div>
                  {/* Trạng thái và Ngày nộp */}
                  <div className="flex-shrink-0 text-xs text-right space-y-1 sm:mt-1">
                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                         app.status === 'Đang xem xét' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                     }`}>
                         {app.status === 'Đang xem xét' ? <Clock size={12}/> : <Check size={12}/>}
                         {app.status}
                     </span>
                     <p className="text-gray-400">Đã nộp: {app.appliedDate}</p>
                  </div>
                </div>
                 {/* Có thể thêm nút "Rút đơn" ở đây */}
                 {/* <div className="mt-3 text-right">
                    <button className="text-xs text-red-500 hover:text-red-700 hover:underline">Rút đơn ứng tuyển</button>
                 </div> */}
              </div>
            ))}
          </div>
        ) : (
          // Khi chưa ứng tuyển job nào
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Bạn chưa ứng tuyển công việc nào</h3>
            <p className="text-gray-500 mb-6 text-sm">Hãy tìm kiếm và ứng tuyển những công việc phù hợp nhé!</p>
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-sm"
            >
              <Briefcase className="w-4 h-4" />
              Tìm việc ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsPage;