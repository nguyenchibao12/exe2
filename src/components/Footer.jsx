import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-bold text-white">StudentWork</span>
            </div>
            <p className="text-sm text-gray-400">
              Nền tảng kết nối sinh viên với các cơ hội việc làm part-time uy tín.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Trang chủ</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Dành cho sinh viên</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Tìm việc làm</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">Tạo hồ sơ</Link></li>
              <li><Link to="/my-jobs" className="hover:text-indigo-400 transition-colors">Công việc đã lưu</Link></li>
              <li><Link to="/applications" className="hover:text-indigo-400 transition-colors">Đơn ứng tuyển</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Nhà tuyển dụng</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job" className="hover:text-indigo-400 transition-colors">Đăng tin tuyển dụng</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Đăng ký tài khoản</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 StudentWork. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-indigo-400"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-indigo-400"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-indigo-400"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;