import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="text-9xl font-extrabold text-indigo-600">404</div>
      <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">Không tìm thấy trang</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Quay về Trang chủ
      </Link>
    </div>
  );
}

export default NotFoundPage;