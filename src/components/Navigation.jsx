import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, User, Menu, X, LogOut, Bookmark, FileText, LayoutDashboard } from 'lucide-react'; // Bỏ Bell, MessageSquare nếu không dùng
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const userMenuRef = useRef(null);

  // Active link logic
  const isActive = (path) => {
    // Exact match for most paths
    if (path === '/') return location.pathname === path;
    // Prefix match for dashboard or potentially others
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
            {isAuthenticated && user?.role === 'employer' && ( <Link to="/post-job" className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}> Đăng tuyển </Link> )}
            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}> Blog </Link>
            {isAuthenticated && user?.role === 'employer' && ( <Link to="/employer/dashboard" className={`nav-link flex items-center gap-1 ${isActive('/employer/dashboard') ? 'active-purple' : ''}`}> <LayoutDashboard size={16}/> Dashboard </Link> )}
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
                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"> {/* py-1 */}
                       <div className="px-4 py-3 border-b border-gray-100 mb-1"> {/* px-4 py-3 mb-1 */}
                          <p className="font-semibold text-sm text-gray-800 truncate">{user?.name || 'Người dùng'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || 'email@example.com'}</p> {/* text-xs */}
                       </div>
                       {/* Employer Links */}
                       {user?.role === 'employer' && (
                          <DropdownLink to="/employer/dashboard" icon={LayoutDashboard} onClick={() => setShowUserMenu(false)}> Quản lý tin đăng </DropdownLink>
                       )}
                       {/* Common Links */}
                       <DropdownLink to="/profile" icon={User} onClick={() => setShowUserMenu(false)}> Hồ sơ của tôi </DropdownLink>
                       {/* Student Links */}
                       {user?.role !== 'employer' && (
                         <>
                           <DropdownLink to="/my-jobs" icon={Bookmark} onClick={() => setShowUserMenu(false)}> Công việc đã lưu </DropdownLink>
                           <DropdownLink to="/applications" icon={FileText} onClick={() => setShowUserMenu(false)}> Đơn ứng tuyển </DropdownLink>
                         </>
                       )}
                       <div className="border-t border-gray-100 my-1"></div> {/* my-1 */}
                       <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-3 text-sm transition-colors rounded-b-lg"> {/* text-sm */}
                         <LogOut className="w-4 h-4" /> Đăng xuất
                       </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <> {/* Login/Register Buttons */}
                <Link to="/login" className="hidden md:block px-4 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors text-sm"> Đăng nhập </Link> {/* py-1.5, rounded-md */}
                <Link to="/register" className="hidden md:block px-4 py-1.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"> Đăng ký </Link> {/* py-1.5, rounded-md */}
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
          <div className="md:hidden py-3 border-t border-gray-200"> {/* py-3 */}
             <nav className="flex flex-col gap-1">
               <MobileLink to="/jobs" onClick={() => setIsMenuOpen(false)}> Tìm việc </MobileLink>
               {isAuthenticated && user?.role === 'employer' && (<MobileLink to="/post-job" onClick={() => setIsMenuOpen(false)}> Đăng tuyển </MobileLink>)}
               <MobileLink to="/blog" onClick={() => setIsMenuOpen(false)}> Blog </MobileLink>
               {isAuthenticated && user?.role === 'employer' && (<MobileLink to="/employer/dashboard" icon={LayoutDashboard} onClick={() => setIsMenuOpen(false)}> Quản lý tin đăng </MobileLink>)}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                   <MobileLink to="/profile" icon={User} onClick={() => setIsMenuOpen(false)}> Hồ sơ của tôi </MobileLink>
                   {user?.role !== 'employer' && (
                     <>
                        <MobileLink to="/my-jobs" icon={Bookmark} onClick={() => setIsMenuOpen(false)}> Công việc đã lưu </MobileLink>
                        <MobileLink to="/applications" icon={FileText} onClick={() => setIsMenuOpen(false)}> Đơn ứng tuyển </MobileLink>
                     </>
                   )}
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors" >
                    <LogOut className="w-5 h-5" /> Đăng xuất
                  </button>
                </>
              ) : (
                <>
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
        .nav-link {
          padding: 0.5rem 0.75rem; /* py-2 px-3 */
          border-radius: 0.5rem; /* rounded-lg */
          font-weight: 500; /* font-medium */
          transition: all 150ms ease-in-out;
          font-size: 0.875rem; /* text-sm */
          line-height: 1.25rem;
          white-space: nowrap;
          color: #4B5563; /* text-gray-600 */
        }
        .nav-link:hover {
          background-color: #F9FAFB; /* hover:bg-gray-50 */
          color: #111827; /* hover:text-gray-900 */
        }
        .nav-link.active {
          background-color: #EEF2FF; /* bg-indigo-50 */
          color: #4F46E5; /* text-indigo-600 */
        }
         .nav-link.active-purple { /* Style riêng cho dashboard active */
          background-color: #F5F3FF; /* bg-purple-50 */
          color: #7C3AED; /* text-purple-700 */
        }
        @media (min-width: 1024px) { /* lg */
          .nav-link {
            padding-left: 1rem; /* px-4 */
            padding-right: 1rem;
            font-size: 1rem; /* text-base */
            line-height: 1.5rem;
          }
        }
        .dropdown-link {
            display: flex;
            align-items: center;
            gap: 0.75rem; /* gap-3 */
            padding: 0.5rem 1rem; /* px-4 py-2 */
            font-size: 0.875rem; /* text-sm */
            color: #374151; /* text-gray-700 */
            transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
            border-radius: 0.375rem; /* rounded-md in dropdown */
        }
        .dropdown-link:hover {
            background-color: #F9FAFB; /* hover:bg-gray-50 */
            color: #4F46E5; /* hover:text-indigo-600 */
        }
        .mobile-nav-link {
            display: flex;
            align-items: center;
            gap: 0.75rem; /* gap-3 */
            padding: 0.75rem 1rem; /* px-4 py-3 */
            font-size: 0.875rem; /* text-sm */
            font-weight: 500; /* font-medium */
            color: #374151; /* text-gray-700 */
            border-radius: 0.5rem; /* rounded-lg */
            transition: background-color 150ms ease-in-out;
        }
         .mobile-nav-link:hover {
             background-color: #F9FAFB; /* hover:bg-gray-100 */
         }
      `}</style>
    </header>
  );
}

// Component phụ cho Dropdown Link
const DropdownLink = ({ to, icon: Icon, children, onClick }) => (
  <Link to={to} className="dropdown-link mx-1" onClick={onClick}> {/* Thêm mx-1 */}
    {Icon && <Icon className="w-4 h-4 text-gray-400" />} {/* Icon color */}
    {children}
  </Link>
);

// Component phụ cho Mobile Link
const MobileLink = ({ to, icon: Icon, children, onClick }) => (
   <Link to={to} className="mobile-nav-link" onClick={onClick}>
       {Icon && <Icon className="w-5 h-5 text-gray-500" />}
       {children}
   </Link>
);


export default Navigation;