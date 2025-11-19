import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Loader2,
  CheckCircle,
  XCircle,
  Briefcase,
  User,
  Clock,
  ExternalLink,
  Image as ImageIcon,
  ZoomIn,
  X,
  DollarSign,
  History,
  TrendingUp,
  FileText
} from 'lucide-react';

import { API_BASE_URL } from '../config/api';

function AdminDashboardPage() {
  const { user, token, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [pendingJobs, setPendingJobs] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' hoặc 'transactions'
  const [transactionData, setTransactionData] = useState(null);
  const [transactionLoading, setTransactionLoading] = useState(false);

  // Fetch Jobs
  const fetchPendingJobs = async () => {
    setDataLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching pending jobs:', err.response || err);
      setError('Không thể tải danh sách tin chờ duyệt.');
    } finally {
      setDataLoading(false);
    }
  };

  // Fetch Transaction History
  const fetchTransactionHistory = async () => {
    setTransactionLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactionData(response.data);
    } catch (err) {
      console.error('Error fetching transaction history:', err.response || err);
      setError('Không thể tải lịch sử giao dịch.');
    } finally {
      setTransactionLoading(false);
    }
  };

  // Update Job Status
  const handleUpdateStatus = async (jobId, status) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn ${status === 'Approved' ? 'DUYỆT' : 'TỪ CHỐI'} tin này?`
      )
    ) {
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/jobs/${jobId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPendingJobs((prev) => prev.filter((j) => j._id !== jobId));
      alert(`✅ Đã cập nhật trạng thái: ${status}`);
      
      // Refresh transaction history nếu duyệt thành công
      if (status === 'Approved') {
        fetchTransactionHistory();
      }
    } catch (err) {
      console.error('Error updating job status:', err.response || err);
      setError(err.response?.data?.message || 'Không thể cập nhật trạng thái.');
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        navigate('/login', { replace: true });
      } else {
        fetchPendingJobs();
        fetchTransactionHistory();
      }
    }
  }, [loading, isAuthenticated, user, token, navigate]);

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
            <Loader2 className="w-6 h-6 text-yellow-600" />
            Admin Dashboard
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
            Tin Chờ Duyệt ({pendingJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'transactions'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History className="inline w-4 h-4 mr-2" />
            Lịch Sử Giao Dịch
          </button>
          <button
            onClick={() => navigate('/admin/blogs')}
            className="px-6 py-3 font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FileText className="inline w-4 h-4 mr-2" />
            Duyệt Blog
          </button>
        </div>

        {error && <div className="error-message mb-6">{error}</div>}

        {/* Revenue Summary - Hiển thị ở cả 2 tab */}
        {transactionData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Tổng Doanh Thu</h3>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">
                {transactionData.totalRevenue?.toLocaleString('vi-VN') || '0'} VND
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {transactionData.totalTransactions || 0} giao dịch
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Gói 1 tháng</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {transactionData.revenueByPackage?.['1month']?.revenue?.toLocaleString('vi-VN') || '0'} VND
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {transactionData.revenueByPackage?.['1month']?.count || 0} giao dịch
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Gói 3 tháng</h3>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {transactionData.revenueByPackage?.['3months']?.revenue?.toLocaleString('vi-VN') || '0'} VND
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {transactionData.revenueByPackage?.['3months']?.count || 0} giao dịch
              </p>
            </div>
          </div>
        )}

        {/* Transaction History Tab */}
        {activeTab === 'transactions' && (
          <div>
            {transactionLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <span className="ml-3 text-gray-600">Đang tải lịch sử giao dịch...</span>
              </div>
            ) : transactionData?.transactions?.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tin tuyển dụng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhà tuyển dụng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gói
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số tiền
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày thanh toán
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactionData.transactions.map((transaction) => (
                        <tr key={transaction._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{transaction.title}</div>
                            <div className="text-sm text-gray-500">{transaction.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => navigate(`/admin/recruiter/${transaction.recruiter?._id || transaction.recruiter}`)}
                              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline text-left"
                            >
                              <div className="font-medium">
                                {transaction.recruiter?.companyName || transaction.recruiter?.name || 'N/A'}
                              </div>
                              <div className="text-gray-500">{transaction.recruiter?.email}</div>
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                              {transaction.packageType === '1month' ? '1 tháng' : '3 tháng'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-green-600">
                              {transaction.paymentAmount?.toLocaleString('vi-VN') || '0'} VND
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.paymentDate
                              ? new Date(transaction.paymentDate).toLocaleDateString('vi-VN', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow border border-gray-100">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Chưa có giao dịch nào
                </h3>
                <p className="text-gray-500 text-sm">
                  Lịch sử giao dịch sẽ hiển thị ở đây khi có tin tuyển dụng được duyệt.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pending Jobs Tab */}
        {activeTab === 'pending' && (
          <>
            {/* Job List */}
            {pendingJobs.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {pendingJobs.map((job) => (
                <li
                  key={job._id}
                  className="p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-grow min-w-0">
                      <h2 className="text-lg font-semibold text-gray-800 truncate mb-1">
                        {job.title}
                      </h2>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Briefcase size={14} /> {job.company}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <User size={12} /> Đăng bởi:{' '}
                        <button
                          onClick={() => navigate(`/admin/recruiter/${job.recruiter?._id || job.recruiter}`)}
                          className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          {job.recruiter?.companyName ||
                            job.recruiter?.name ||
                            job.recruiter?.email}
                        </button>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <Clock size={12} /> Ngày tạo:{' '}
                        {new Date(job.createdAt).toLocaleDateString('vi-VN')}
                      </p>

                      {/* Ảnh thanh toán */}
                      {job.paymentProof ? (
                        <div className="mt-3">
                          <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                            <ImageIcon size={14} /> Ảnh thanh toán:
                          </p>
                          <div
                            className="relative w-44 h-44 overflow-hidden rounded-lg border group cursor-pointer"
                            onClick={() => setSelectedImage(job.paymentProof)}  // ✅ Chuyển onClick lên div cha
                          >
                            <img
                              src={job.paymentProof}
                              alt="Payment proof"
                              className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                              <ZoomIn className="text-white w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic mt-2">
                          (Chưa có ảnh thanh toán)
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 mt-3 sm:mt-0">
                      <button
                        onClick={() => navigate(`/job/${job._id}`)}
                        className="action-button-view"
                        title="Xem chi tiết"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(job._id, 'Approved')}
                        className="action-button-approve"
                      >
                        <CheckCircle size={18} /> Duyệt
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(job._id, 'Rejected')}
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
              Tuyệt vời! Không có tin nào chờ duyệt.
            </h3>
            <p className="text-gray-500 text-sm">
              Tất cả tin đăng đều đã được xử lý.
            </p>
          </div>
        )}
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white/80 rounded-full p-2 hover:bg-white"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
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

export default AdminDashboardPage;
