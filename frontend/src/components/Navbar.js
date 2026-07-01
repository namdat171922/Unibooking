import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Building2, Calendar, ChevronDown, MessageSquare, Heart, FileText, Settings, HelpCircle, Globe, Download, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-text-primary dark:text-white"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid="navbar-logo"
          >
            Style<span className="text-primary">Match</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/businesses"
              className="text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors font-medium"
              data-testid="navbar-businesses"
            >
              Explore
            </Link>

            {user ? (
              <>
                {/* Role-based Dashboard Link */}
                {user.role === 'business_owner' ? (
                  <Link
                    to="/business/dashboard"
                    className="flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors font-medium"
                    data-testid="navbar-dashboard"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors font-medium"
                    data-testid="navbar-dashboard"
                  >
                    <Calendar className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}

                {user.role === 'business_owner' && (
                  <Link
                    to="/my-business"
                    className="flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors font-medium"
                    data-testid="navbar-my-business"
                  >
                    <Building2 className="w-4 h-4" />
                    Business
                  </Link>
                )}

                {/* User Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 bg-accent dark:bg-gray-700 rounded-full hover:bg-accent/80 dark:hover:bg-gray-600 transition-colors"
                    data-testid="navbar-user-menu"
                  >
                    <User className="w-4 h-4 text-secondary dark:text-secondary" />
                    <span className="text-sm font-medium text-text-primary dark:text-white max-w-[100px] truncate">
                      {user.full_name}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform text-text-secondary dark:text-gray-400 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                      {/* User Header */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <p className="font-bold text-text-primary dark:text-white">{user.full_name}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">{user.email}</p>
                      </div>

                      {/* Main Menu */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4 text-primary" />
                          <span>Hộ sơ (Profile)</span>
                        </Link>

                        <Link
                          to="/activity"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>Hoạt động (Activity)</span>
                        </Link>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FileText className="w-4 h-4 text-primary" />
                          <span>Vị (Location)</span>
                        </Link>

                        <Link
                          to="/messages"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <MessageSquare className="w-4 h-4 text-primary" />
                          <span>Tin nhân (Messages)</span>
                        </Link>

                        {user.role === 'customer' && (
                          <Link
                            to="/favorites"
                            className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Heart className="w-4 h-4 text-primary" />
                            <span>Mục yêu thích (Favorites)</span>
                          </Link>
                        )}

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FileText className="w-4 h-4 text-primary" />
                          <span>Mẫu đơn (Forms)</span>
                        </Link>

                        <Link
                          to="/settings"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-primary dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4 text-primary" />
                          <span>Cài đặt (Settings)</span>
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 dark:border-gray-700"></div>

                      {/* Additional Options */}
                      <div className="py-2">
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary dark:text-gray-400">
                          <Download className="w-4 h-4" />
                          <span>Tải xuống ứng dụng (Download App)</span>
                        </button>

                        <Link
                          to="/help"
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary dark:text-gray-400"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <HelpCircle className="w-4 h-4" />
                          <span>Trợ giúp & hỗ trợ (Help)</span>
                        </Link>

                        <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary dark:text-gray-400">
                          <Globe className="w-4 h-4" />
                          <span>Tiếng Việt (VN)</span>
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 dark:border-gray-700"></div>

                      {/* Business & Logout */}
                      <div className="py-2">
                        {user.role === 'business_owner' && (
                          <Link
                            to="/my-business"
                            className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary dark:text-gray-400"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Building2 className="w-4 h-4" />
                            <span>Dành cho doanh nghiệp (For Business)</span>
                          </Link>
                        )}

                        <button
                          onClick={async () => {
                            await logout();
                            setShowUserMenu(false);
                            navigate('/auth');
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 font-medium"
                          data-testid="navbar-dropdown-logout"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất (Logout)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/auth/consumer/login"
                  className="text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors font-medium"
                  data-testid="navbar-login"
                >
                  Login
                </Link>
                <Link
                  to="/auth/consumer/register"
                  className="btn-primary"
                  data-testid="navbar-register"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
