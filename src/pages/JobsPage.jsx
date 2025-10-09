import React, { useState } from 'react';
import { Search, MapPin, Filter, ChevronDown } from 'lucide-react';
import JobCard from '../components/JobCard';

const allJobs = [
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
  },
  {
    id: 5,
    title: 'Nhân viên bán hàng Part-time',
    company: 'Fashion Boutique',
    logo: '👔',
    location: 'Quận 10, HCM',
    salary: '30-40k/giờ + Hoa hồng',
    type: 'Part-time',
    slots: ['Chiều & Tối', '14:00-21:00'],
    posted: '1 tuần trước',
    applicants: 31,
    rating: 4.5
  },
  {
    id: 6,
    title: 'Phụ bếp nhà hàng',
    company: 'Nhà Hàng Sài Gòn',
    logo: '🍜',
    location: 'Quận 5, HCM',
    salary: '35-50k/giờ',
    type: 'Part-time',
    slots: ['Trưa & Tối', '10:00-14:00, 17:00-21:00'],
    posted: '2 giờ trước',
    applicants: 5,
    rating: 4.4
  },
  {
    id: 7,
    title: 'Designer Freelance',
    company: 'Creative Studio',
    logo: '🎨',
    location: 'Remote',
    salary: '100-200k/design',
    type: 'Flexible',
    slots: ['Linh động', 'Deadline theo dự án'],
    posted: '4 giờ trước',
    applicants: 15,
    rating: 4.8
  },
  {
    id: 8,
    title: 'MC Sự kiện Part-time',
    company: 'Event Management',
    logo: '🎤',
    location: 'HCM & các tỉnh',
    salary: '500k-1tr/sự kiện',
    type: 'Flexible',
    slots: ['Cuối tuần', 'Theo lịch sự kiện'],
    posted: '1 ngày trước',
    applicants: 9,
    rating: 4.7
  },
  {
    id: 9,
    title: 'Gia sư Tiếng Anh',
    company: 'Language Center',
    logo: '🌍',
    location: 'Quận 2, HCM',
    salary: '120-180k/giờ',
    type: 'Flexible',
    slots: ['Linh động', '18:00-21:00'],
    posted: '3 giờ trước',
    applicants: 14,
    rating: 4.9
  },
  {
    id: 10,
    title: 'Nhân viên kho Part-time',
    company: 'Logistics Pro',
    logo: '📦',
    location: 'Quận 12, HCM',
    salary: '30-35k/giờ',
    type: 'Part-time',
    slots: ['Sáng & Chiều', '07:00-12:00, 13:00-17:00'],
    posted: '6 giờ trước',
    applicants: 28,
    rating: 4.3
  },
  {
    id: 11,
    title: 'Video Editor Freelance',
    company: 'Media House',
    logo: '🎬',
    location: 'Remote',
    salary: '200-500k/video',
    type: 'Flexible',
    slots: ['Linh động', 'Online'],
    posted: '1 ngày trước',
    applicants: 22,
    rating: 4.6
  },
  {
    id: 12,
    title: 'Lễ tân khách sạn',
    company: 'Hotel Luxury',
    logo: '🏨',
    location: 'Quận 1, HCM',
    salary: '40-55k/giờ',
    type: 'Part-time',
    slots: ['Ca tối', '18:00-00:00'],
    posted: '12 giờ trước',
    applicants: 17,
    rating: 4.7
  }
];

function JobsPage({ savedJobs, toggleSaveJob }) {
  const [jobs] = useState(allJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Tìm công việc phù hợp</h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm công việc, công ty..."
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                />
              </div>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
              >
                <Filter className="w-5 h-5" />
                Bộ lọc
              </button>
            </div>

            {/* Filter Tags */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setTypeFilter('Part-time')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === 'Part-time'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Part-time
              </button>
              <button
                onClick={() => setTypeFilter('Flexible')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === 'Flexible'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Linh động
              </button>
              <button
                onClick={() => setTypeFilter('Full-time')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === 'Full-time'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Full-time
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-bold text-gray-900">{filteredJobs.length}</span> công việc
          </p>
          <select className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
            <option>Mới nhất</option>
            <option>Lương cao nhất</option>
            <option>Đánh giá cao nhất</option>
          </select>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onToggleSave={toggleSaveJob}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy công việc phù hợp</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;