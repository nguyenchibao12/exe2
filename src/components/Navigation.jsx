import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Search, Bell, MessageSquare, User, Menu, X } from 'lucide-react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              StudentWork
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/jobs"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/jobs')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Tìm việc
            </Link>
            <Link
              to="/post-job"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/post-job')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Đăng tuyển
            </Link>
            <Link
              to="/blog"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/blog')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </button>
            <Link 
              to="/login" 
              className="hidden md:block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Đăng nhập
            </Link>
            <Link 
              to="/register" 
              className="hidden md:block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Đăng ký
            </Link>
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/jobs" 
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Tìm việc
              </Link>
              <Link 
                to="/post-job" 
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng tuyển
              </Link>
              <Link 
                to="/blog" 
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng ký
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;