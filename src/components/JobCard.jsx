import React from 'react';
import { MapPin, DollarSign, Calendar, Users, Star, Heart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../data/locations'; 

function JobCard({ job, isSaved, onToggleSave, onClick }) {
    // Đảm bảo job tồn tại trước tiên
    if (!job) return null; 

    // Lấy ID job an toàn
    const jobId = job._id; 

    // **** SỬA LỖI: TRUY CẬP AN TOÀN BẰNG OPTIONAL CHAINING ****
    // Lấy tên công ty: Ưu tiên tên công ty từ Recruiter Profile, nếu không có dùng tên job
    const companyName = job.recruiter?.companyName || job.recruiter?.name || job.company;
    
    // Lấy label địa điểm từ LOCATIONS
    const getLocationLabel = (locationValue) => {
      if (!locationValue) return locationValue;
      const location = LOCATIONS.find(loc => loc.value === locationValue);
      return location ? location.label : locationValue;
    };
    const locationLabel = getLocationLabel(job.location);
    
    // Tính số ngày còn lại của gói
    const getDaysRemaining = (expiryDate) => {
      if (!expiryDate) return null;
      const now = new Date();
      const expiry = new Date(expiryDate);
      const diffTime = expiry - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    };
    const daysRemaining = getDaysRemaining(job.expiryDate);
    
    const handleSaveClick = (e) => {
        e.stopPropagation();
        onToggleSave(jobId); // Dùng jobId đã xác định
    };

    const CardContent = (
        <div 
            className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group"
            onClick={onClick} 
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {job.logo || '💼'}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {job.title || 'Tiêu đề trống'}
                        </h3>
                        <p className="text-gray-600 text-sm">{companyName}</p> {/* Dùng tên công ty đã xử lý */}
                    </div>
                </div>
                {/* Save Button */}
                <button onClick={handleSaveClick} className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                    <Heart
                        className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                </button>
            </div>

            <div className="space-y-2 mb-4">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{locationLabel}</span>
                </div>
                {/* Salary */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-green-600">{job.salary || 'Thỏa thuận'}</span>
                </div>
                {/* Slots/Posted Date */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    {/* Dùng postedDate từ API */}
                    <span>Đăng {new Date(job.postedDate || job.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
                {/* Type */}
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">
                    {job.type}
                </span>
                {/* Status (Hiển thị nếu có) */}
                 <span className={`px-3 py-1 rounded-lg text-xs font-medium ${job.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {job.status || 'Mới'}
                </span>
                {/* Số ngày còn lại */}
                {daysRemaining !== null && daysRemaining > 0 && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Còn {daysRemaining} ngày
                  </span>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{job.applicantsCount || 0} ứng viên</span>
                    </div>
                </div>
                <span className="text-indigo-600 font-medium text-sm group-hover:underline">
                    Xem chi tiết &rarr;
                </span>
            </div>
        </div>
    );
    
    // Logic hiển thị: Nếu có onClick (dùng cho HomePage), dùng div. Nếu không, dùng Link để navigate.
    return onClick ? (
        CardContent
    ) : (
        // Dùng Link với jobId thật (job._id)
        <Link to={`/job/${jobId}`}>
            {CardContent}
        </Link>
    );
}

export default JobCard;