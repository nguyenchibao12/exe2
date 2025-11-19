import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Users, TrendingUp, Loader2, ChevronDown } from 'lucide-react';
import JobCard from '../components/JobCard';
import axios from 'axios';
import { LOCATIONS } from '../data/locations';
import { API_BASE_URL } from '../config/api';

// Các nút filter nhanh cố định
const QUICK_FILTERS = [
  { label: 'Part-time', query: { type: 'Part-time' } },
  { label: 'Remote', query: { location: 'Remote' } },
  { label: 'Content', query: { search: 'Content' } }, // Ví dụ tìm kiếm theo từ khóa
  { label: 'Bưng bê', query: { search: 'Bưng bê' } }, // Ví dụ tìm kiếm theo từ khóa
  { label: 'Hà Nội', query: { location: 'Hà Nội' } }, // Ví dụ tìm kiếm theo địa điểm
];


function HomePage({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect để fetch 4 job nổi bật (đã duyệt)
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Gọi API public, chỉ lấy các job đã được Approved
        const response = await axios.get(`${API_BASE_URL}/api/jobs`, {
            params: { limit: 4 }
        });
        setJobs(response.data.slice(0, 4) || []); // Lấy tối đa 4 job từ response
      } catch (err) {
        console.error("Error fetching homepage jobs:", err);
        setError("Không thể tải danh sách công việc.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    // Chuyển toàn bộ search term và location qua JobsPage
    navigate('/jobs', { state: { search: searchTerm, location: locationFilter } });
  };

  const handleQuickFilterClick = (query) => {
    // Chuyển hướng với query params (type hoặc search hoặc location)
    navigate('/jobs', { state: query });
  };


  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4"> Tìm việc Part-time <br /> Dành cho Sinh viên </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto"> Kết nối với hàng ngàn cơ hội việc làm linh động, phù hợp với lịch học của bạn </p>
          </div>
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Input Search */}
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <Search className="w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Tìm công việc, vị trí..." className="flex-1 bg-transparent outline-none text-gray-700" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
              </div>
              {/* Location Dropdown */}
              <div className="relative md:w-64">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-700 appearance-none cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.value} value={loc.value}>
                        {loc.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 pointer-events-none" />
                </div>
              </div>
              <button onClick={handleSearch} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">Tìm kiếm</button>
            </div>

            {/* Nút Filter Nhanh */}
            <div className="flex gap-2 mt-4 flex-wrap pt-3 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-500 mr-2 hidden sm:block">Tìm nhanh:</span>
                {QUICK_FILTERS.map((filter, index) => (
                    <button
                        key={index}
                        onClick={() => handleQuickFilterClick(filter.query)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <Briefcase className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{loading ? '...' : `${jobs.length > 0 ? jobs.length * 10 : 500}+`}</h3>
            <p className="text-gray-600">Việc làm đang tuyển</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Sinh viên tin dùng</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
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
          <button onClick={() => navigate('/jobs')} className="text-indigo-600 font-medium hover:underline">Xem tất cả →</button>
        </div>

        {loading && ( <div className="text-center py-10"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto"/> <p className="mt-2 text-gray-600">Đang tải công việc...</p></div> )}
        {error && ( <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">{error}</div> )}

        {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {jobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  isSaved={savedJobs.includes(job._id)}
                  onToggleSave={toggleSaveJob}
                  onClick={() => navigate(`/job/${job._id}`)}
                />
              ))}
            </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Bạn là nhà tuyển dụng?</h2>
          <p className="text-xl text-indigo-100 mb-8"> Đăng tin tuyển dụng và tiếp cận hàng ngàn sinh viên tài năng </p>
          <button onClick={() => navigate('/post-job')} className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow">Đăng tin ngay</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;