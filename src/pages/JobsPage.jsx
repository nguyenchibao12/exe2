import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Filter, X as ClearIcon, Loader2, ChevronDown } from 'lucide-react';
import JobCard from '../components/JobCard';
import axios from 'axios';
import { LOCATIONS } from '../data/locations';
import { API_BASE_URL } from '../config/api';

function JobsPage({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Khởi tạo state filter từ location.state (nếu có)
  const [searchTerm, setSearchTerm] = useState(location.state?.search || '');
  const [locationFilter, setLocationFilter] = useState(location.state?.location || '');
  const [typeFilter, setTypeFilter] = useState(location.state?.type || ''); // Type filter riêng

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bỏ allJobs mock data
  // const [jobs] = useState(allJobs);


  // Hàm Fetch Jobs từ API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      // Chỉ thêm param nếu có giá trị
      if (searchTerm) params.search = searchTerm;
      if (locationFilter) params.location = locationFilter;
      if (typeFilter) params.type = typeFilter;

      // API call (dùng tham số params để Axios tự tạo query string)
      const response = await axios.get(`${API_BASE_URL}/api/jobs`, { params });

      setJobs(response.data || []);
      
      // Xóa state trong location sau khi đã sử dụng (để tránh lỗi khi refresh)
      if (location.state && Object.keys(location.state).length > 0) {
         navigate(location.pathname, { replace: true, state: {} });
      }
      
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Không thể tải danh sách công việc. Vui lòng thử lại.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect để gọi API mỗi khi filter state thay đổi
  useEffect(() => {
    fetchJobs();
  }, [searchTerm, locationFilter, typeFilter]); // Re-fetch khi filter thay đổi


  // Hàm xóa tất cả filter
  const clearFilters = () => {
      setSearchTerm('');
      setLocationFilter('');
      setTypeFilter('');
  };

  // Kiểm tra xem có filter nào đang áp dụng không
  const isFiltered = searchTerm || locationFilter || typeFilter;


  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Tìm công việc phù hợp</h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Term Input */}
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <Search className="w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Tìm công việc, công ty..." className="flex-1 bg-transparent outline-none text-gray-700 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              
              {/* Location Filter Dropdown */}
              <div className="relative md:w-72">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm appearance-none cursor-pointer"
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
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-4 items-center pt-3 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-700 mr-2">Loại hình:</span>
              <button onClick={() => setTypeFilter('')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${ typeFilter === '' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} > Tất cả </button>
              <button onClick={() => setTypeFilter('Part-time')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${ typeFilter === 'Part-time' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} > Part-time </button>
              <button onClick={() => setTypeFilter('Flexible')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${ typeFilter === 'Flexible' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} > Linh động </button>
              <button onClick={() => setTypeFilter('Internship')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${ typeFilter === 'Internship' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} > Internship </button>
             
              {/* Nút Xóa Filter */}
              {isFiltered && (
                 <button onClick={clearFilters} className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors" > <ClearIcon size={14}/> Xóa bộ lọc </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
             <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 mb-6">{error}</div>
        )}

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Tìm thấy <span className="font-bold text-gray-900">{loading ? '...' : jobs.length}</span> công việc
          </p>
           {/* Select sắp xếp có thể làm sau */}
        </div>
        
        {/* Loading State */}
        {loading && (
             <div className="text-center py-20"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto"/> <p className="mt-2 text-gray-600">Đang tải công việc...</p></div>
        )}

        {/* Job List */}
        {!loading && !error && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard
                key={job._id} // Dùng _id từ API
                job={job}
                isSaved={savedJobs.includes(job._id)} // Dùng _id
                onToggleSave={toggleSaveJob}
                onClick={() => navigate(`/job/${job._id}`)} // Dùng _id
              />
            ))}
          </div>
        ) : (!loading && !error && jobs.length === 0 ? (
          // No results message
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">😢</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy công việc phù hợp</h3>
            <p className="text-gray-500 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : null)}
      </div>
    </div>
  );
}

export default JobsPage;