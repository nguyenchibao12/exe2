import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';
import { allJobs } from '../data/data.js'; // Đường dẫn đúng

function JobsPage({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Đọc state từ location khi component mount lần đầu hoặc state thay đổi
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [locationFilter, setLocationFilter] = useState(location.state?.locationFilter || '');
  const [typeFilter, setTypeFilter] = useState(location.state?.typeFilter || 'all');

  const [jobs] = useState(allJobs);
  // const [showFilters, setShowFilters] = useState(false); // Chưa dùng tới

  // Hook useEffect để xử lý state từ location và xóa nó đi
  useEffect(() => {
    // Chỉ cập nhật state nếu có giá trị mới từ location.state
    if (location.state?.searchTerm !== undefined) {
      setSearchTerm(location.state.searchTerm);
    }
    if (location.state?.locationFilter !== undefined) {
      setLocationFilter(location.state.locationFilter);
    }
    if (location.state?.typeFilter !== undefined) {
      setTypeFilter(location.state.typeFilter);
    }

    // Xóa state trong location sau khi đã sử dụng
    // Dùng replace: true để không tạo thêm entry trong history
    if (location.state && Object.keys(location.state).length > 0) {
       navigate(location.pathname, { replace: true, state: {} });
    }
    // Dependency array: chạy lại khi location.state thay đổi
    // Tuy nhiên, vì ta xóa state ngay sau đó, nó chỉ chạy hiệu quả 1 lần khi navigate từ HomePage
  }, [location.state, navigate, location.pathname]);


  const filteredJobs = jobs.filter(job => {
    // Logic filter giữ nguyên như trước, nhưng giờ các state đã được cập nhật đúng
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const companyMatch = job.company.toLowerCase().includes(searchTerm.toLowerCase());
    // Kiểm tra searchTerm rỗng hoặc có match title/company
    const searchMatch = !searchTerm || titleMatch || companyMatch;

    // Kiểm tra locationFilter rỗng hoặc job location chứa filter hoặc cả hai là remote
    const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase()) || (job.location.toLowerCase() === 'remote' && locationFilter.toLowerCase().includes('remote'));

    // Kiểm tra type filter
    const typeMatch = typeFilter === 'all' || job.type === typeFilter;

    return searchMatch && locationMatch && typeMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Tìm công việc phù hợp</h1>

          {/* Search Bar & Filter Tags */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            {/* Input fields */}
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
                  placeholder="Địa điểm (VD: Quận 1, Remote)"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              {/* Nút Bộ lọc có thể ẩn/hiện thêm filter chi tiết sau */}
               {/* <button
                onClick={() => {}} // Tạm thời chưa làm gì
                className="bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
              >
                <Filter className="w-5 h-5" />
                Bộ lọc
              </button> */}
            </div>

            {/* Filter Tags Buttons */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả loại hình
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
              {/* Nút Remote giờ hoạt động song song với ô Địa điểm */}
              <button
                onClick={() => {
                  setLocationFilter('Remote'); // Chỉ set location, không đổi type
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  locationFilter.toLowerCase().includes('remote')
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Remote
              </button>
              {/* Nút xóa filter location nếu đang có filter */}
              {locationFilter && (
                <button
                    onClick={() => setLocationFilter('')}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                    Xóa địa điểm: "{locationFilter}"
                </button>
              )}
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
          {/* Select sắp xếp có thể làm sau */}
           {/* <select className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
            <option>Mới nhất</option>
            <option>Lương cao nhất</option>
            <option>Đánh giá cao nhất</option>
          </select> */}
        </div>

        {/* Job List */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onToggleSave={toggleSaveJob}
                onClick={() => navigate(`/job/${job.id}`)} // Click JobCard -> Job Detail
              />
            ))}
          </div>
        ) : (
          // No results message
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
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