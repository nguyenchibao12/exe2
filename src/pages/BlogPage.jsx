import React, { useState, useEffect } from 'react';
import { Clock, User, ArrowRight, X, Calendar, Loader2, Filter } from 'lucide-react';
import axios from 'axios';

import { API_BASE_URL } from '../config/api';

function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Hướng dẫn', 'Kinh nghiệm', 'Tin tức', 'Tips', 'Khác'];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, searchQuery]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await axios.get(`${API_BASE_URL}/api/blogs?${params.toString()}`);
      setBlogPosts(response.data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err.response || err);
      setError('Không thể tải danh sách blog.');
    } finally {
      setLoading(false);
    }
  };

  // Phần JSX giữ nguyên như trước, chỉ sửa đường dẫn import ở trên

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Tin tức</h1>
          <p className="text-xl text-gray-600">
            Chia sẻ kinh nghiệm, hướng dẫn và thông tin hữu ích về việc làm part-time
          </p>
        </div>

        {/* Filter & Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
          <div className="flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Tìm kiếm blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <span className="ml-3 text-gray-600">Đang tải blog...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && (
          <>
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
            <article
              key={post._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              {/* Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform overflow-hidden">
                {post.image?.startsWith('http') ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{post.image || '📝'}</span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{post.author?.name || post.author?.companyName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('vi-VN')
                        : new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                <button className="mt-4 text-indigo-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Đọc thêm <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow border border-gray-100">
                <p className="text-gray-500 text-lg">Không tìm thấy blog nào.</p>
              </div>
            )}
          </>
        )}

        {/* Blog Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl z-10">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                      {selectedPost.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedPost.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author?.name || selectedPost.author?.companyName || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {selectedPost.publishedAt
                          ? new Date(selectedPost.publishedAt).toLocaleDateString('vi-VN')
                          : new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                {/* Featured Image */}
                <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
                  {selectedPost.image?.startsWith('http') ? (
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-8xl">{selectedPost.image || '📝'}</span>
                  )}
                </div>

                {/* Article Content */}
                {/* Sử dụng dangerouslySetInnerHTML để render các thẻ HTML nếu có, hoặc dùng thư viện markdown */}
                {/* Tạm thời dùng div với whitespace-pre-line */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>


                {/* Share & Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
                        Thích bài viết
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        Chia sẻ
                      </button>
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin mới nhất</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Nhận các bài viết, tips tìm việc và cơ hội việc làm mới nhất qua email
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-900"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;