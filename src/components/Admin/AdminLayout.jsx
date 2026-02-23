import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown,
  FileText
} from 'lucide-react';

// REMOVE the import line for logo here

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const storedUser = localStorage.getItem('admin_user');
    const token = localStorage.getItem('admin_token');
    
    if (!storedUser || !token) {
      navigate('/admin/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

const menuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: <FileText className="w-5 h-5" />, label: 'Blog', path: '/admin/blog' }, // NEW
  { icon: <FolderKanban className="w-5 h-5" />, label: 'Projects', path: '/admin/projects' },
  { icon: <Users className="w-5 h-5" />, label: 'Clients', path: '/admin/clients' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', path: '/admin/analytics' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800/90 backdrop-blur-xl border-b border-gray-700/50 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-3">
              {/* Updated logo section - using public folder path */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-gray-700/50">
                <img 
                  src="/horizontal-logo.png" 
                  alt="Sadevz Logo" 
                  className="h-6 w-auto"
                  onError={(e) => {
                    console.error('Failed to load logo:', e);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="hidden md:block">
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Right: User & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

{/* User Profile */}
<div className="flex items-center space-x-3">
  <div className="text-right hidden md:block">
    <p className="text-sm font-medium text-white">{user.username}</p>
    <p className="text-xs text-gray-400 capitalize">{user.role}</p>
  </div>
  <div className="relative">
    <div className="w-10 h-10 bg-gradient-to-r from-[#00bcd4] to-cyan-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
      {user.picture ? (
        <img 
          src={user.picture} 
          alt={user.username}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{user.username?.charAt(0).toUpperCase()}</span>
      )}
    </div>
    <button className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 border-2 border-gray-900 rounded-full flex items-center justify-center">
      <ChevronDown className="w-3 h-3 text-gray-400" />
    </button>
  </div>
</div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-gray-800/95 backdrop-blur-xl border-r border-gray-700/50
        transform transition-transform duration-300 z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all group"
              >
                <div className="text-gray-400 group-hover:text-[#00bcd4] transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 pt-6 border-t border-gray-700/50">
            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Projects Today</span>
                <span className="text-sm font-bold text-[#00bcd4]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Pending Review</span>
                <span className="text-sm font-bold text-amber-400">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Active Clients</span>
                <span className="text-sm font-bold text-emerald-400">0</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`
        pt-16 transition-all duration-300 h-screen overflow-hidden
        ${sidebarOpen ? 'pl-64' : 'pl-0'}
      `}>
        <div className="h-full overflow-y-auto bg-gray-900">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;