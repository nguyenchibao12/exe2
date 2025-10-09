import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Users, TrendingUp, X, Star, DollarSign, Calendar, CheckCircle, Send } from 'lucide-react';
import JobCard from '../components/JobCard';

const jobListings = [
  {
    id: 1,
    title: 'Content Writer Part-time',
    company: 'TechStart Vietnam',
    logo: '🚀',
    location: 'Quận 1, HCM',
    salary: '80-120k/giờ',
    type: 'Part-time',
    slots: ['Thứ 2, 4, 6', '14:00-18:00'],
    posted: '2 ngày trước',
    applicants: 12,
    rating: 4.8,
    description: 'Tìm sinh viên năng động, yêu thích viết lách và sáng tạo nội dung cho các dự án marketing.',
    requirements: ['Kỹ năng viết tốt tiếng Việt', 'Sử dụng thành thạo Office', 'Có laptop riêng', 'Sáng tạo, chủ động'],
    benefits: ['Lương theo giờ', 'Môi trường trẻ', 'Thưởng hiệu suất']
  },
  {
    id: 2,
    title: 'Barista Cuối tuần',
    company: 'The Coffee House',
    logo: '☕',
    location: 'Quận 3, HCM',
    salary: '35-45k/giờ',
    type: 'Part-time',
    slots: ['T7, CN', '08:00-14:00'],
    posted: '1 ngày trước',
    applicants: 23,
    rating: 4.6,
    description: 'Cần barista làm ca cuối tuần tại quán trung tâm Q3. Làm việc trong môi trường năng động.',
    requirements: ['Nhiệt tình, thân thiện', 'Có thể làm việc nhóm', 'Ưu tiên có kinh nghiệm', 'Chịu được áp lực cao điểm'],
    benefits: ['Đồ uống miễn phí', 'Tips từ khách', 'Đào tạo kỹ năng']
  },
  {
    id: 3,
    title: 'Gia sư Toán - Lý',
    company: 'EduConnect',
    logo: '📚',
    location: 'Quận 7, HCM',
    salary: '100-150k/giờ',
    type: 'Flexible',
    slots: ['Linh động', '18:00-21:00'],
    posted: '5 giờ trước',
    applicants: 8,
    rating: 4.9,
    description: 'Tìm gia sư dạy Toán, Lý cho học sinh THPT. Lịch linh động theo lịch của bạn.',
    requirements: ['Đang học hoặc tốt nghiệp ĐH', 'Thành tích học tập tốt', 'Biết truyền đạt', 'Kiên nhẫn'],
    benefits: ['Lương cao', 'Lịch linh động', 'Thưởng theo kết quả học sinh']
  },
  {
    id: 4,
    title: 'Social Media Intern',
    company: 'Digital Marketing Co.',
    logo: '📱',
    location: 'Remote',
    salary: '50-80k/giờ',
    type: 'Flexible',
    slots: ['Linh động', 'Online'],
    posted: '3 ngày trước',
    applicants: 18,
    rating: 4.7,
    description: 'Tìm intern làm việc với social media, tạo nội dung và quản lý fanpage.',
    requirements: ['Am hiểu mạng xã hội', 'Sử dụng Canva, Photoshop cơ bản', 'Có ý tưởng sáng tạo'],
    benefits: ['Làm việc remote', 'Học hỏi thực tế', 'Chứng nhận hoàn thành']
  }
];

function HomePage({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();
  const [showJobDetail, setShowJobDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleJobClick = (job) => {
    setShowJobDetail(job);
  };

  const closeJobDetail = () => {
    setShowJobDetail(null);
  };

  const handleSearch = () => {
    navigate('/jobs', { state: { searchTerm, locationFilter } });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Tìm việc Part-time <br />
              Dành cho Sinh viên
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Kết nối với hàng ngàn cơ hội việc làm linh động, phù hợp với lịch học của bạn
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm công việc, vị trí..."
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 md:w-64">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Địa điểm"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              <button 
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100">
                Part-time
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Linh động
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Cuối tuần
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Remote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Briefcase className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Việc làm đang tuyển</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Sinh viên tin dùng</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <TrendingUp className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Tỷ lệ hài lòng</p>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Việc làm nổi bật</h2>
            <p className="text-gray-600 mt-2">Các cơ hội tốt nhất dành cho bạn</p>
          </div>
          <button 
            onClick={() => navigate('/jobs')}
            className="text-indigo-600 font-medium hover:underline"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {jobListings.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={toggleSaveJob}
              onClick={() => handleJobClick(job)}
            />
          ))}
        </div>
      </div>

      {/* Job Detail Modal */}
      {showJobDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl">
                  {showJobDetail.logo}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{showJobDetail.title}</h2>
                  <p className="text-gray-600 mt-1">{showJobDetail.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{showJobDetail.rating}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{showJobDetail.applicants} ứng viên</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeJobDetail}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm">Mức lương</span>
                  </div>
                  <p className="font-bold text-green-600">{showJobDetail.salary}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-sm">Loại hình</span>
                  </div>
                  <p className="font-bold text-gray-900">{showJobDetail.type}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">Địa điểm</span>
                  </div>
                  <p className="font-bold text-gray-900">{showJobDetail.location}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">Thời gian</span>
                  </div>
                  <p className="font-bold text-gray-900">{showJobDetail.slots.join(' • ')}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-lg mb-3">Mô tả công việc</h3>
                <p className="text-gray-700 leading-relaxed">
                  {showJobDetail.description || 'Công việc này đang chờ cập nhật mô tả chi tiết. Vui lòng liên hệ nhà tuyển dụng để biết thêm thông tin.'}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-bold text-lg mb-3">Yêu cầu ứng viên</h3>
                <ul className="space-y-2">
                  {showJobDetail.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  )) || (
                    <li className="text-gray-600">Yêu cầu sẽ được cập nhật chi tiết</li>
                  )}
                </ul>
              </div>

              {/* Benefits */}
              {showJobDetail.benefits && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Quyền lợi</h3>
                  <div className="flex flex-wrap gap-2">
                    {showJobDetail.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply Button */}
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Ứng tuyển ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Bạn là nhà tuyển dụng?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Đăng tin tuyển dụng miễn phí và tiếp cận hàng ngàn sinh viên tài năng
          </p>
          <button 
            onClick={() => navigate('/post-job')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Đăng tin ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;