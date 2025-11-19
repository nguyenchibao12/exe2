import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, User, Menu, X, LogOut, Bookmark, FileText, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- Component phụ ---
const DropdownLink = ({ to, icon: Icon, children, onClick }) => (
  <Link to={to} className="dropdown-link mx-1" onClick={onClick}>
    {Icon && <Icon className="w-4 h-4 text-gray-400" />}
    {children}
  </Link>
);
const MobileLink = ({ to, icon: Icon, children, onClick }) => (
   <Link to={to} className="mobile-nav-link" onClick={onClick}>
       {Icon && <Icon className="w-5 h-5 text-gray-500" />}
       {children}
   </Link>
);
// --- Hết Component phụ ---

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const userMenuRef = useRef(null);

  // Log user để debug
  console.log("Navigation rendering with user:", user);

  // Active link logic
  const isActive = (path) => {
    if (path === '/') return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  }

  const handleLogout = () => { logout(); navigate('/'); setShowUserMenu(false); setIsMenuOpen(false); };

  // Click outside to close user menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setShowUserMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef]);

  // Close mobile menu on navigation
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  // **** SỬA BIẾN KIỂM TRA ROLE ****
  const isRecruiter = isAuthenticated && user?.role === 'recruiter'; // <-- Sửa 'employer' thành 'recruiter'
  const isStudent = isAuthenticated && user?.role === 'student';
  const isAdmin = isAuthenticated && user?.role === 'admin';
  // **** HẾT PHẦN SỬA ****

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 mr-4">
            <Briefcase className="w-8 h-8 text-indigo-600" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              StudentWork
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-grow justify-center">
            <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}> Tìm việc </Link>
            {/* KIỂM TRA LẠI: Dùng isRecruiter */}
            {isRecruiter && ( <Link to="/post-job" className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}> Đăng tuyển </Link> )}
            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}> Blog </Link>
            {/* Admin và Recruiter có thể tạo blog */}
            {(isAdmin || isRecruiter) && (
              <Link to="/blog/create" className={`nav-link ${isActive('/blog/create') ? 'active' : ''}`}>
                Tạo Blog
              </Link>
            )}
            {/* KIỂM TRA LẠI: Dùng isRecruiter */}
            {isRecruiter && ( <Link to="/employer/dashboard" className={`nav-link flex items-center gap-1 ${isActive('/employer/dashboard') ? 'active-purple' : ''}`}> <LayoutDashboard size={16}/> Dashboard </Link> )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 p-1 md:p-2 hover:bg-gray-100 rounded-full md:rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm"> {user?.name?.charAt(0).toUpperCase() || '?'} </div>
                    <span className="hidden md:block font-medium text-gray-700 text-sm"> {user?.name || 'Tài khoản'} </span>
                  </button>
                  {/* Dropdown */}
                  {showUserMenu && (
                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                       <div className="px-4 py-3 border-b border-gray-100 mb-1">
                          <p className="font-semibold text-sm text-gray-800 truncate">{user?.name || 'Người dùng'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || 'email@example.com'}</p>
                       </div>
                       {/* KIỂM TRA LẠI: Dùng isRecruiter */}
                       {isRecruiter && ( <DropdownLink to="/employer/dashboard" icon={LayoutDashboard} onClick={() => setShowUserMenu(false)}> Quản lý tin đăng </DropdownLink> )}
                       {isAdmin && ( <DropdownLink to="/admin/dashboard" icon={LayoutDashboard} onClick={() => setShowUserMenu(false)}> Admin Dashboard </DropdownLink> )}
                       {isAdmin && ( <DropdownLink to="/admin/blogs" icon={FileText} onClick={() => setShowUserMenu(false)}> Duyệt Blog </DropdownLink> )}
                       <DropdownLink to="/profile" icon={User} onClick={() => setShowUserMenu(false)}> Hồ sơ </DropdownLink>
                       {/* KIỂM TRA LẠI: Dùng isStudent */}
                       {isStudent && (
                         <>
                           <DropdownLink to="/my-jobs" icon={Bookmark} onClick={() => setShowUserMenu(false)}> Đã lưu </DropdownLink>
                           <DropdownLink to="/applications" icon={FileText} onClick={() => setShowUserMenu(false)}> Ứng tuyển </DropdownLink>
                         </>
                       )}
                       <div className="border-t border-gray-100 my-1"></div>
                       <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-3 text-sm transition-colors rounded-b-lg">
                         <LogOut className="w-4 h-4" /> Đăng xuất
                       </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <> {/* Login/Register Buttons */}
                <Link to="/login" className="hidden md:block px-4 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors text-sm"> Đăng nhập </Link>
                <Link to="/register" className="hidden md:block px-4 py-1.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"> Đăng ký </Link>
              </>
            )}
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -mr-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Mở menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
             <nav className="flex flex-col gap-1">
               <MobileLink to="/jobs" onClick={() => setIsMenuOpen(false)}> Tìm việc </MobileLink>
               {/* KIỂM TRA LẠI: Dùng isRecruiter */}
               {isRecruiter && (<MobileLink to="/post-job" onClick={() => setIsMenuOpen(false)}> Đăng tuyển </MobileLink>)}
               <MobileLink to="/blog" onClick={() => setIsMenuOpen(false)}> Blog </MobileLink>
               {(isAdmin || isRecruiter) && (
                 <MobileLink to="/blog/create" onClick={() => setIsMenuOpen(false)}> Tạo Blog </MobileLink>
               )}
               {/* KIỂM TRA LẠI: Dùng isRecruiter */}
               {isRecruiter && (<MobileLink to="/employer/dashboard" icon={LayoutDashboard} onClick={() => setIsMenuOpen(false)}> Quản lý tin đăng </MobileLink>)}
               {isAdmin && (<MobileLink to="/admin/dashboard" icon={LayoutDashboard} onClick={() => setIsMenuOpen(false)}> Admin Dashboard </MobileLink>)}
               {isAdmin && (<MobileLink to="/admin/blogs" icon={FileText} onClick={() => setIsMenuOpen(false)}> Duyệt Blog </MobileLink>)}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                   <MobileLink to="/profile" icon={User} onClick={() => setIsMenuOpen(false)}> Hồ sơ </MobileLink>
                   {/* KIỂM TRA LẠI: Dùng isStudent */}
                   {isStudent && (
                     <>
                        <MobileLink to="/my-jobs" icon={Bookmark} onClick={() => setIsMenuOpen(false)}> Đã lưu </MobileLink>
                        <MobileLink to="/applications" icon={FileText} onClick={() => setIsMenuOpen(false)}> Ứng tuyển </MobileLink>
                     </>
                   )}
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors" >
                    <LogOut className="w-5 h-5" /> Đăng xuất
                  </button>
                </>
              ) : (
                <> {/* Login/Register links */}
                  <div className="border-t border-gray-200 my-2"></div>
                  <MobileLink to="/login" onClick={() => setIsMenuOpen(false)}> Đăng nhập </MobileLink>
                  <Link to="/register" className="block mt-2 px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-center font-medium text-sm" onClick={() => setIsMenuOpen(false)} > Đăng ký </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      {/* CSS cho NavLink */}
      <style jsx global>{`
        /* ... (CSS classes giữ nguyên) ... */
        .nav-link { padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-weight: 500; transition: all 150ms ease-in-out; font-size: 0.875rem; line-height: 1.25rem; white-space: nowrap; color: #4B5563; }
        .nav-link:hover { background-color: #F9FAFB; color: #111827; }
        .nav-link.active { background-color: #EEF2FF; color: #4F46E5; }
        .nav-link.active-purple { background-color: #F5F3FF; color: #7C3AED; }
        @media (min-width: 1024px) { .nav-link { padding-left: 1rem; padding-right: 1rem; font-size: 1rem; line-height: 1.5rem; } }
        .dropdown-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; font-size: 0.875rem; color: #374151; transition: background-color 150ms ease-in-out, color 150ms ease-in-out; border-radius: 0.375rem; }
        .dropdown-link:hover { background-color: #F9FAFB; color: #4F46E5; }
        .mobile-nav-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 500; color: #374151; border-radius: 0.5rem; transition: background-color 150ms ease-in-out; }
        .mobile-nav-link:hover { background-color: #F9FAFB; }
      `}</style>
    </header>
  );
}

export default Navigation;