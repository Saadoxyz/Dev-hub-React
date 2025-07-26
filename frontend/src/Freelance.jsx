import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bell, User, Briefcase, Home, Settings, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const FreelanceDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Saad Khan',
    email: 'saado652004@gmail.com',
    password: '••••••••'
  });

  // Mock data
  const earningsData = [
    { month: 'Jan', earnings: 3200 },
    { month: 'Feb', earnings: 4100 },
    { month: 'Mar', earnings: 3800 },
    { month: 'Apr', earnings: 4500 },
    { month: 'May', earnings: 5200 },
    { month: 'Jun', earnings: 4800 }
  ];

  const taskData = [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 12, color: '#f59e0b' },
    { name: 'Overdue', value: 3, color: '#ef4444' }
  ];

  const projects = [
    { id: 1, name: 'E-commerce Website Redesign', status: 'In Progress', deadline: '2025-08-15', client: 'TechCorp' },
    { id: 2, name: 'Mobile App UI/UX', status: 'Completed', deadline: '2025-07-20', client: 'StartupXYZ' },
    { id: 3, name: 'Brand Identity Package', status: 'In Progress', deadline: '2025-08-30', client: 'Creative Studio' },
    { id: 4, name: 'WordPress Blog Setup', status: 'Pending', deadline: '2025-09-10', client: 'BloggerPro' },
    { id: 5, name: 'Social Media Graphics', status: 'Completed', deadline: '2025-07-25', client: 'MarketingHub' }
  ];

  const recentActivities = [
    'Completed task: Homepage wireframe for TechCorp',
    'Invoice sent to StartupXYZ - $4,500',
    'New project inquiry from Creative Studio'
  ];

  const stats = {
    totalProjects: 24,
    totalEarnings: 28600,
    tasksDue: 7,
    completedTasks: 45
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: IconComponent, title, value, color }) => {
    const Icon = IconComponent;
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
          </div>
          <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-8 w-8" style={{ color }} />
          </div>
        </div>
      </div>
    );
  };

  const OverviewPage = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Briefcase} title="Total Projects" value={stats.totalProjects} color="#3b82f6" />
        <StatCard icon={DollarSign} title="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`} color="#10b981" />
        <StatCard icon={Clock} title="Tasks Due" value={stats.tasksDue} color="#f59e0b" />
        <StatCard icon={CheckCircle} title="Completed Tasks" value={stats.completedTasks} color="#8b5cf6" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Earnings']}
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <p className="text-slate-700 font-medium">{activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Projects</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Deadline</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 font-medium">{project.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Profile Settings</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl border border-slate-200">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
            />
          </div>
          
          <button
            type="button"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview': return <OverviewPage />;
      case 'projects': return <ProjectsPage />;
      case 'profile': return <ProfilePage />;
      default: return <OverviewPage />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg border-b z-40 flex-shrink-0">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FreelanceHub</h1>
          
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110 bg-white"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border z-50">
                <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
                  <h3 className="font-bold text-gray-900">Recent Activities</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="p-4 border-b hover:bg-gray-50 transition-colors duration-200">
                      <p className="text-sm text-gray-700 font-medium">{activity}</p>
                      <p className="text-xs text-gray-500 mt-1">{index + 1} hours ago</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-56 sm:w-64 bg-gradient-to-b from-white to-slate-50 shadow-xl border-r border-slate-200 flex-shrink-0 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              <button
                onClick={() => setCurrentPage('overview')}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  currentPage === 'overview' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-102 border border-slate-200'
                }`}
              >
                <Home className="h-5 w-5 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Overview</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('projects')}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  currentPage === 'projects' 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-600 hover:scale-102 border border-slate-200'
                }`}
              >
                <Briefcase className="h-5 w-5 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Projects</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('profile')}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  currentPage === 'profile' 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-102 border border-slate-200'
                }`}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Profile Settings</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="h-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto h-full">
              {renderCurrentPage()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelanceDashboard;