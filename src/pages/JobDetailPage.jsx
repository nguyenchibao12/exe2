import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Star, Send, CheckCircle, Briefcase, Heart, Calendar } from 'lucide-react';
import { allJobs } from '../data/data.js'; // Đường dẫn đúng: src/pages -> src/data/data.js
import JobCard from '../components/JobCard'; // Đường dẫn đúng: src/pages -> src/components/JobCard.jsx
import { useAuth } from '../context/AuthContext'; // Đường dẫn đúng: src/pages -> src/context/AuthContext.jsx

// --- Component phụ ---
const InfoItem = ({ icon: Icon, label, value, valueClass = 'text-gray-900' }) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
    <div className="flex items-center gap-1.5 text-gray-500 mb-1">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
    <p className={`font-semibold text-sm ${valueClass} line-clamp-2`}>{value || '-'}</p> {/* line-clamp-2 */}
  </div>
);

const Section = ({ title, children }) => (
  <section>
    <h3 className="font-semibold text-lg mb-3 text-gray-800">{title}</h3>
    {children}
  </section>
);
// --- HẾT Component phụ ---


function JobDetailPage({ savedJobs, toggleSaveJob, addApplication }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const jobId = parseInt(id);
  const job = allJobs.find(j => j.id === jobId);
  const isSaved = job ? savedJobs.includes(job.id) : false;
  const relatedJobs = job ? allJobs.filter(j => j.type === job.type && j.id !== job.id).slice(0, 3) : [];

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      alert('Bạn cần đăng nhập để ứng tuyển!');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (job) {
       addApplication(job.id); // Gọi hàm cập nhật state ứng tuyển
       console.log(`Applying for job: ${job.title} (User ID: ${user?.id || 'demo'})`);
       navigate('/apply-success', { state: { jobTitle: job.title } });
    } else {
       console.error("Job data is missing, cannot apply.");
       alert("Đã xảy ra lỗi, không thể ứng tuyển lúc này.");
    }
  };

  // --- Code xử lý 404 ---
  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-16 text-center">
        <Briefcase className="w-20 h-20 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">404 - Không tìm thấy công việc</h1>
        <p className="text-gray-500 mb-8 max-w-md">
           Rất tiếc, công việc bạn đang tìm kiếm không tồn tại, đã hết hạn hoặc đã bị xóa.
        </p>
        <Link
          to="/jobs"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-md"
        >
          Trở về trang tìm việc
        </Link>
      </div>
    );
  }
  // --- Hết Code xử lý 404 ---


  // --- JSX Hiển thị chi tiết ---
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- CỘT CHÍNH --- */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4">
                {/* Job Info */}
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl flex-shrink-0">
                    {job.logo}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-lg text-gray-600 mt-1">{job.company}</p>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-700">{job.rating}</span>
                      </span>
                      <span className="text-gray-400 hidden sm:inline">•</span>
                      <span>{job.applicants} ứng viên</span>
                      <span className="text-gray-400 hidden sm:inline">•</span>
                      <span>Đăng {job.posted}</span>
                    </div>
                  </div>
                </div>
                {/* Save Button */}
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0 text-sm md:py-3 md:px-5 shadow-sm ${
                    isSaved
                      ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500' : ''}`} />
                  {isSaved ? 'Đã lưu' : 'Lưu tin'}
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={DollarSign} label="Mức lương" value={job.salary} valueClass="text-green-600" />
                <InfoItem icon={Briefcase} label="Loại hình" value={job.type} />
                <InfoItem icon={MapPin} label="Địa điểm" value={job.location} />
                <InfoItem icon={Calendar} label="Thời gian" value={job.slots.join(' • ')} />
              </div>

              {/* Description */}
              <Section title="Mô tả công việc">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                  {job.description || 'Chưa có mô tả chi tiết.'}
                </p>
              </Section>

              {/* Requirements */}
              <Section title="Yêu cầu ứng viên">
                <ul className="space-y-2 pl-1"> {/* Thêm pl-1 */}
                  {job.requirements && job.requirements.length > 0 ? (
                    job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2.5"> {/* Tăng gap */}
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" /> {/* Size nhỏ hơn */}
                        <span className="text-gray-700 text-sm">{req}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm italic">Chưa cập nhật yêu cầu.</li>
                  )}
                </ul>
              </Section>

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <Section title="Quyền lợi">
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>
          {/* --- HẾT CỘT CHÍNH --- */}

          {/* --- CỘT PHỤ --- */}
          <div className="space-y-6">
            {/* Apply Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center sticky top-20 border border-gray-100">
              <button
                onClick={handleApplyClick}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isAuthenticated ? 'Ứng tuyển ngay' : 'Đăng nhập để ứng tuyển'}
              </button>
              {isAuthenticated && (
                 <p className="text-sm text-gray-500 mt-3">
                  Nhấn để gửi hồ sơ đến nhà tuyển dụng.
                </p>
              )}
              {!isAuthenticated && (
                 <p className="text-sm text-gray-500 mt-3">
                   Vui lòng <Link to="/login" state={{ from: location.pathname }} className="text-indigo-600 font-medium hover:underline">đăng nhập</Link> hoặc <Link to="/register" className="text-indigo-600 font-medium hover:underline">đăng ký</Link> để ứng tuyển.
                 </p>
              )}
            </div>

            {/* Related Jobs Box */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Việc làm liên quan</h3>
                <div className="space-y-3">
                  {relatedJobs.map(relatedJob => (
                    <Link
                      key={relatedJob.id}
                      to={`/job/${relatedJob.id}`}
                      className="block border border-gray-200 rounded-lg p-3 hover:bg-gray-50/70 transition-colors group" // Giảm opacity hover
                    >
                      <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                          {relatedJob.logo}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-semibold text-gray-800 group-hover:text-indigo-600 text-sm line-clamp-1">{relatedJob.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{relatedJob.company}</p>
                          <p className="text-xs text-green-600 font-medium mt-1">{relatedJob.salary}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
           {/* --- HẾT CỘT PHỤ --- */}

        </div>
      </div>
    </div>
  );
  // --- HẾT JSX ---
}

export default JobDetailPage;