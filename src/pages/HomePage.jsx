import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Users, TrendingUp, Clock } from 'lucide-react';
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
    rating: 4.8
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
    rating: 4.6
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
    rating: 4.9
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
    rating: 4.7
  }
];

function HomePage({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();

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
                />
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 md:w-64">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Địa điểm"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>

              <button 
                onClick={() => navigate('/jobs')}
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
            />
          ))}
        </div>
      </div>

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