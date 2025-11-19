import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Clock,
  Eye,
  X,
  Calendar,
  AlertTriangle,
  Trash2,
  History
} from 'lucide-react';

import { API_BASE_URL } from '../config/api';

function AdminBlogManagementPage() {
  const { user, token, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' hoặc 'approved'
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchPendingBlogs = async () => {
    setDataLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs/admin/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingBlogs(response.data || []);
    } catch (err) {
      console.error('Error fetching pending blogs:', err.response || err);
      setError('Không thể tải danh sách blog chờ duyệt.');
    } finally {
      setDataLoading(false);
    }
  };

  const fetchApprovedBlogs = async () => {
    setDataLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs`, {
        params: { status: 'Approved' },
      });
      setApprovedBlogs(response.data || []);
    } catch (err) {
      console.error('Error fetching approved blogs:', err.response || err);
      setError('Không thể tải danh sách blog đã duyệt.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Bạn có chắc chắn muốn XÓA blog này? Hành động này không thể hoàn tác!')) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/api/blogs/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPendingBlogs((prev) => prev.filter((b) => b._id !== blogId));
      setApprovedBlogs((prev) => prev.filter((b) => b._id !== blogId));
      alert('✅ Đã xóa blog thành công!');
    } catch (err) {
      console.error('Error deleting blog:', err.response || err);
      setError(err.response?.data?.message || 'Không thể xóa blog.');
    }
  };

  const handleUpdateStatus = async (blogId, status) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn ${status === 'Approved' ? 'DUYỆT' : 'TỪ CHỐI'} blog này?`
      )
    ) {
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/blogs/${blogId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPendingBlogs((prev) => prev.filter((b) => b._id !== blogId));
      alert(`✅ Đã cập nhật trạng thái: ${status === 'Approved' ? 'Đã duyệt' : 'Đã từ chối'}`);
    } catch (err) {
      console.error('Error updating blog status:', err.response || err);
      setError(err.response?.data?.message || 'Không thể cập nhật trạng thái.');
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        navigate('/login', { replace: true });
      } else {
        fetchPendingBlogs();
        fetchApprovedBlogs();
      }
    }
  }, [loading, isAuthenticated, user, token, navigate]);

  useEffect(() => {
    if (activeTab === 'approved' && approvedBlogs.length === 0 && !dataLoading) {
      fetchApprovedBlogs();
    }
  }, [activeTab]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-6 h-6 text-yellow-600" />
            Quản Lý Blog
          </h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'pending'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="inline w-4 h-4 mr-2" />
            Chờ Duyệt ({pendingBlogs.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'approved'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History className="inline w-4 h-4 mr-2" />
            Đã Duyệt ({approvedBlogs.length})
          </button>
        </div>

        {error && <div className="error-message mb-6">{error}</div>}

        {/* Pending Blogs Tab */}
        {activeTab === 'pending' && (
          <>
            {pendingBlogs.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {pendingBlogs.map((blog) => (
                <li
                  key={blog._id}
                  className="p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    {/* Blog Info */}
                    <div className="flex-grow min-w-0 flex gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {blog.image?.startsWith('http') ? (
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-4xl">{blog.image || '📝'}</span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {blog.title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>
                              {blog.author?.name || blog.author?.companyName || blog.author?.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{blog.readTime}</span>
                          </div>
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="action-button-view"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(blog._id, 'Approved')}
                        className="action-button-approve"
                      >
                        <CheckCircle size={18} /> Duyệt
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(blog._id, 'Rejected')}
                        className="action-button-reject"
                      >
                        <XCircle size={18} /> Từ chối
                      </button>
                    </div>
                  </div>
                </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow border border-gray-100">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Tuyệt vời! Không có blog nào chờ duyệt.
                </h3>
                <p className="text-gray-500 text-sm">
                  Tất cả blog đều đã được xử lý.
                </p>
              </div>
            )}
          </>
        )}

        {/* Approved Blogs Tab */}
        {activeTab === 'approved' && (
          <>
            {approvedBlogs.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blog
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tác giả
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Danh mục
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày đăng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lượt xem
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvedBlogs.map((blog) => (
                        <tr key={blog._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                {blog.image?.startsWith('http') ? (
                                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-2xl">{blog.image || '📝'}</span>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {blog.author?.name || blog.author?.companyName || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">{blog.author?.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                              {blog.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.publishedAt
                              ? new Date(blog.publishedAt).toLocaleDateString('vi-VN')
                              : new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.views || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedBlog(blog)}
                                className="action-button-view"
                                title="Xem chi tiết"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="action-button-delete"
                                title="Xóa blog"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow border border-gray-100">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Chưa có blog nào được duyệt
                </h3>
                <p className="text-gray-500 text-sm">
                  Các blog đã duyệt sẽ hiển thị ở đây.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl z-10">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                    {selectedBlog.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedBlog.readTime}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedBlog.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {selectedBlog.author?.name || selectedBlog.author?.companyName || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedBlog.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Featured Image */}
              <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
                {selectedBlog.image?.startsWith('http') ? (
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl">{selectedBlog.image || '📝'}</span>
                )}
              </div>

              {/* Excerpt */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded">
                <p className="text-gray-700 font-medium">{selectedBlog.excerpt}</p>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedBlog.content}
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedBlog._id, 'Approved');
                    setSelectedBlog(null);
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Duyệt Blog
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedBlog._id, 'Rejected');
                    setSelectedBlog(null);
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Từ Chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .action-button-approve {
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          color: white;
          background-color: #10b981;
          transition: background-color 0.15s;
        }
        .action-button-approve:hover {
          background-color: #059669;
        }
        .action-button-reject {
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          color: #ef4444;
          border: 1px solid #fca5a5;
          background-color: #fef2f2;
          transition: background-color 0.15s;
        }
        .action-button-reject:hover {
          background-color: #fee2e2;
        }
        .action-button-view {
          padding: 0.5rem;
          color: #4f46e5;
          background-color: #eef2ff;
          border-radius: 0.5rem;
          border: 1px solid #c7d2fe;
          transition: background-color 0.15s;
        }
        .action-button-view:hover {
          background-color: #e0e7ff;
        }
        .action-button-delete {
          padding: 0.5rem;
          color: #ef4444;
          background-color: #fef2f2;
          border-radius: 0.5rem;
          border: 1px solid #fca5a5;
          transition: background-color 0.15s;
        }
        .action-button-delete:hover {
          background-color: #fee2e2;
        }
        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

export default AdminBlogManagementPage;

