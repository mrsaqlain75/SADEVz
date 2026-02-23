import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  Search,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Bell,
  X,
  Check,
  Loader2
} from 'lucide-react';

// No import needed when image is in public folder

const AdminDashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    revenue: 0,
    newProjects: 0
  });

  useEffect(() => {
    fetchProjects();
    fetchNotifications();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchTerm, statusFilter, projects]);

  useEffect(() => {
    updateStats();
  }, [projects]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data || []);
        setFilteredProjects(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/projects?status=new', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        // Create notifications for new projects
        const newNotifications = (data.data || []).map(project => ({
          id: project._id,
          type: 'new_project',
          title: 'New Project Request',
          message: `${project.clientName} submitted a new project: ${project.title}`,
          projectId: project._id,
          timestamp: project.createdAt,
          read: false
        }));
        setNotifications(newNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const updateStats = () => {
    const total = projects.length;
    const pending = projects.filter(p => p.status === 'new').length;
    const inProgress = projects.filter(p => 
      ['contacted', 'meeting-scheduled', 'quote-sent', 'negotiation'].includes(p.status)
    ).length;
    const completed = projects.filter(p => 
      ['confirmed', 'archived'].includes(p.status)
    ).length;
    const newProjects = projects.filter(p => p.status === 'new').length;
    
    // Calculate estimated revenue from confirmed projects only
    const revenue = projects
      .filter(p => p.status === 'confirmed')
      .reduce((sum, project) => {
        if (project.budgetRange === 'custom' && project.customBudget) {
          return sum + parseFloat(project.customBudget);
        } else if (project.budgetRange.includes('-')) {
          const range = project.budgetRange.split('-');
          const avg = (parseInt(range[0]) + parseInt(range[1])) / 2;
          return sum + avg;
        }
        return sum + 2500; // Default estimated value
      }, 0);

    setStats({
      totalProjects: total,
      pending,
      inProgress,
      completed,
      revenue,
      newProjects
    });
  };

  const filterProjects = () => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.clientName.toLowerCase().includes(term) ||
        project.email.toLowerCase().includes(term) ||
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = async (id) => {
  if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, { // REMOVE /status from here
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        // Remove from local state
        setProjects(prev => prev.filter(p => p._id !== id));
        
        // Remove related notifications
        setNotifications(prev => prev.filter(n => n.projectId !== id));
        
        alert('Project deleted successfully');
      } else {
        alert('Failed to delete project: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
    }
  }
};

const handleUpdateStatus = async (id, newStatus) => {
  try {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`http://localhost:5000/api/projects/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const data = await response.json();
    if (data.success) {
      // Update local state
      setProjects(prev => prev.map(p => 
        p._id === id ? { ...p, status: newStatus } : p
      ));
      
      // Mark notification as read if status changed from 'new'
      setNotifications(prev => prev.map(n => 
        n.projectId === id && n.type === 'new_project' 
          ? { ...n, read: true }
          : n
      ));
    } else {
      alert('Failed to update status: ' + (data.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error updating status:', error);
    alert('Error updating status. Please try again.');
  }
};
const handleExportProjects = () => {
  // Create CSV content
  const headers = ['Client Name', 'Email', 'Project Title', 'Type', 'Status', 'Budget', 'Timeline', 'Created At'];
  const csvContent = [
    headers.join(','),
    ...filteredProjects.map(project => [
      `"${project.clientName}"`,
      `"${project.email}"`,
      `"${project.title}"`,
      `"${project.projectType}"`,
      `"${project.status}"`,
      project.budgetRange === 'custom' && project.customBudget 
        ? `$${project.customBudget}`
        : project.budgetRange && project.budgetRange.includes('-')
          ? `"${project.budgetRange.replace('-', ' - $')}"`
          : `"${project.budgetRange || 'Not specified'}"`,
      `"${project.timeline || 'Not specified'}"`,
      `"${new Date(project.createdAt).toLocaleDateString()}"`
    ].join(','))
  ].join('\n');

  // Rest of the function remains the same...
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `projects_export_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  alert('Projects exported successfully!');
};

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification) => {
    // Find the project
    const project = projects.find(p => p._id === notification.projectId);
    if (project) {
      handleViewProject(project);
    }
    // Mark as read
    setNotifications(prev => prev.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));
  };

  const getStatusBadge = (status) => {
    const badges = {
      'new': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'contacted': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'meeting-scheduled': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'quote-sent': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      'negotiation': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'confirmed': 'bg-green-500/20 text-green-300 border-green-500/30',
      'archived': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'rejected': 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    
    return badges[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-[#00bcd4] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50">
            {/* Updated to use public folder path */}
            <img 
              src="/horizontal-logo.png" 
              alt="Sadevz Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                console.error('Failed to load logo:', e);
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-gray-400">Welcome back! Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#00bcd4]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-gray-400">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.totalProjects}</h3>
          <p className="text-sm text-gray-400">Projects</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#00bcd4]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm text-gray-400">New</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.newProjects}</h3>
          <p className="text-sm text-gray-400">Require Review</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#00bcd4]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">In Progress</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.inProgress}</h3>
          <p className="text-sm text-gray-400">Active Projects</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#00bcd4]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-sm text-gray-400">Completed</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.completed}</h3>
          <p className="text-sm text-gray-400">Delivered</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#00bcd4]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-sm text-gray-400">Revenue</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${stats.revenue.toLocaleString()}</h3>
          <p className="text-sm text-gray-400">Estimated</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Project Management</h2>
              <p className="text-gray-400">All submitted project requests</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="meeting-scheduled">Meeting Scheduled</option>
                <option value="quote-sent">Quote Sent</option>
                <option value="negotiation">Negotiation</option>
                <option value="confirmed">Confirmed</option>
                <option value="archived">Archived</option>
                <option value="rejected">Rejected</option>
              </select>
              
              {/* Export Button */}
              <button 
                onClick={handleExportProjects}
                className="px-4 py-2 bg-gradient-to-r from-[#00bcd4] to-cyan-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all hover:from-cyan-600 hover:to-[#00bcd4] whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Client</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Project</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Type</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Budget</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-700/50">
              {filteredProjects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-white">{project.clientName}</p>
                      <p className="text-sm text-gray-400">{project.email}</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <p className="font-medium text-white">{project.title}</p>
                    <p className="text-sm text-gray-400 line-clamp-1">{project.description?.substring(0, 50)}...</p>
                  </td>
                  
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {project.projectType}
                    </span>
                  </td>
                  
{/* In the table row - around line 481 */}
<td className="py-4 px-6">
  <div className="flex items-center gap-1">
    <DollarSign className="w-4 h-4 text-gray-400" />
    <span className="text-white">
      {project.budgetRange === 'custom' && project.customBudget 
        ? `$${project.customBudget.toLocaleString()}`
        : project.budgetRange === 'not-sure' 
          ? 'TBD'
          : project.budgetRange && project.budgetRange.includes('-')  // ADD CHECK HERE
            ? project.budgetRange.replace('-', ' - $')  // ONLY CALL .replace() IF IT EXISTS
            : (project.budgetRange || 'Not specified')}  // ADD FALLBACK
    </span>
  </div>
</td>
                  
                  <td className="py-4 px-6">
                    <select
                      value={project.status || 'new'}
                      onChange={(e) => handleUpdateStatus(project._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-[#00bcd4] cursor-pointer ${getStatusBadge(project.status || 'new')}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="meeting-scheduled">Meeting Scheduled</option>
                      <option value="quote-sent">Quote Sent</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="archived">Archived</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewProject(project)}
                        className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          // For edit, we'll show the modal with edit mode
                          setSelectedProject(project);
                          setShowModal(true);
                        }}
                        className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 px-6 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Package className="w-12 h-12 mb-4 opacity-50" />
                      <p className="text-lg">No projects found</p>
                      <p className="text-sm">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'Try changing your search or filter criteria' 
                          : 'Submitted projects will appear here'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              Showing {filteredProjects.length} of {stats.totalProjects} projects
              {searchTerm && ` for "${searchTerm}"`}
              {statusFilter !== 'all' && ` (${statusFilter})`}
            </p>
            <div className="flex items-center gap-3">
              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown Menu */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <div className="flex items-center gap-2">
                        {unreadNotificationsCount > 0 && (
                          <button
                            onClick={handleMarkAllNotificationsRead}
                            className="text-xs text-[#00bcd4] hover:text-cyan-400"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-4 border-b border-gray-700/50 hover:bg-gray-700/30 cursor-pointer transition-colors ${
                              !notification.read ? 'bg-blue-500/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                notification.read ? 'bg-gray-700' : 'bg-blue-500/20'
                              }`}>
                                <Bell className={`w-4 h-4 ${
                                  notification.read ? 'text-gray-400' : 'text-blue-400'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-white text-sm">
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-400">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={fetchProjects}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg flex items-center gap-2 transition-colors"
              >
                <span>Refresh</span>
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Package className="w-6 h-6 text-[#00bcd4]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <p className="text-gray-400">
                    Submitted on {new Date(selectedProject.createdAt).toLocaleDateString()} • 
                    Status: <span className="ml-1 capitalize">{selectedProject.status}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Client Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#00bcd4] to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {selectedProject.clientName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{selectedProject.clientName}</p>
                          <p className="text-sm text-gray-400">{selectedProject.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900/30 rounded-lg p-3">
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="text-white font-medium">{selectedProject.phone || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-900/30 rounded-lg p-3">
                          <p className="text-sm text-gray-400">Company</p>
                          <p className="text-white font-medium">{selectedProject.company || 'Individual'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Project Details</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-900/30 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-2">Project Type</p>
                        <p className="text-white font-medium capitalize">{selectedProject.projectType}</p>
                      </div>
                      
                      <div className="bg-gray-900/30 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-2">Budget Range</p>
                        <p className="text-white font-medium">
                          {selectedProject.budgetRange === 'custom' && selectedProject.customBudget 
                            ? `$${selectedProject.customBudget.toLocaleString()}`
                            : selectedProject.budgetRange === 'not-sure' 
                              ? 'To be determined'
                              : selectedProject.budgetRange.replace('-', ' - $')}
                        </p>
                      </div>
                      
                        <div className="bg-gray-900/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-2">Timeline</p>
                          <p className="text-white font-medium capitalize">
                            {selectedProject.timeline || 'Not specified'}
                          </p>
                        </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Project Description</h4>
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <p className="text-white whitespace-pre-line">{selectedProject.description}</p>
                    </div>
                  </div>
                  
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Requested Features</h4>
                      <div className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 bg-gray-900/30 rounded-lg p-3">
                            <Check className="w-4 h-4 text-[#00bcd4] mt-1" />
                            <p className="text-white flex-1">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700/50 flex flex-col sm:flex-row justify-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Update Status
                </label>
                <select
                  value={selectedProject.status || 'new'}
                  onChange={(e) => {
                    handleUpdateStatus(selectedProject._id, e.target.value);
                    setSelectedProject({...selectedProject, status: e.target.value});
                  }}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#00bcd4] cursor-pointer ${getStatusBadge(selectedProject.status || 'new')}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="meeting-scheduled">Meeting Scheduled</option>
                  <option value="quote-sent">Quote Sent</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="archived">Archived</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedProject.email}?subject=Regarding your project: ${selectedProject.title}`}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00bcd4] to-cyan-600 text-white hover:from-cyan-600 hover:to-[#00bcd4] transition-all text-center"
                >
                  Contact Client
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;