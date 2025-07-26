import React, { useState, useContext, createContext, useReducer } from 'react';
import { ChevronLeft, Plus, Edit, Trash2, Download, Upload, Building, Calendar, User, FileText, MapPin, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Context for global state management
const JobTrackerContext = createContext();

// Initial state
const initialState = {
  jobs: [
    {
      id: 1,
      company: 'Google',
      title: 'Senior Software Engineer',
      status: 'Applied',
      appliedDate: '2024-01-15',
      location: 'Mountain View, CA',
      salary: '$150,000 - $200,000',
      notes: 'Applied through company website. Excited about the AI/ML opportunities.',
      interviewDate: '',
      lastUpdate: '2024-01-15'
    },
    {
      id: 2,
      company: 'Microsoft',
      title: 'Full Stack Developer',
      status: 'Interviewing',
      appliedDate: '2024-01-10',
      location: 'Seattle, WA',
      salary: '$130,000 - $170,000',
      notes: 'Had initial phone screening. Technical interview scheduled.',
      interviewDate: '2024-01-25',
      lastUpdate: '2024-01-20'
    },
    {
      id: 3,
      company: 'Netflix',
      title: 'Frontend Engineer',
      status: 'Rejected',
      appliedDate: '2024-01-05',
      location: 'Los Gatos, CA',
      salary: '$140,000 - $180,000',
      notes: 'Rejected after final round. Good learning experience.',
      interviewDate: '2024-01-18',
      lastUpdate: '2024-01-22'
    }
  ],
  currentPage: 'dashboard',
  selectedJob: null,
  filter: 'All'
};

// Reducer for state management
function jobTrackerReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'ADD_JOB': {
      const newJob = {
        ...action.payload,
        id: Date.now(),
        lastUpdate: new Date().toISOString().split('T')[0]
      };
      return { ...state, jobs: [...state.jobs, newJob] };
    }
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id === action.payload.id
            ? { ...action.payload, lastUpdate: new Date().toISOString().split('T')[0] }
            : job
        )
      };
    case 'DELETE_JOB':
      return { ...state, jobs: state.jobs.filter(job => job.id !== action.payload) };
    case 'SELECT_JOB':
      return { ...state, selectedJob: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'IMPORT_JOBS':
      return { ...state, jobs: [...state.jobs, ...action.payload] };
    default:
      return state;
  }
}

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Applied': { color: 'bg-sky-50 text-sky-700 border border-sky-200', icon: Clock },
    'Interviewing': { color: 'bg-amber-50 text-amber-700 border border-amber-200', icon: AlertCircle },
    'Offered': { color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', icon: CheckCircle },
    'Rejected': { color: 'bg-rose-50 text-rose-700 border border-rose-200', icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig['Applied'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${config.color}`}>
      <Icon className="w-3 h-3 mr-1.5" />
      {status}
    </span>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { state, dispatch } = useContext(JobTrackerContext);
  const { jobs, filter } = state;

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.status === filter);

  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === 'Applied').length,
    interviewing: jobs.filter(job => job.status === 'Interviewing').length,
    offered: jobs.filter(job => job.status === 'Offered').length,
    rejected: jobs.filter(job => job.status === 'Rejected').length
  };

  const exportJobs = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'job-applications.json';
    link.click();
  };

  const importJobs = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedJobs = JSON.parse(e.target.result);
          const jobsWithNewIds = importedJobs.map(job => ({
            ...job,
            id: Date.now() + Math.random()
          }));
          dispatch({ type: 'IMPORT_JOBS', payload: jobsWithNewIds });
        } catch {
          alert('Error importing file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <div className="p-6 max-w-none w-full mx-auto">
        {/* Header */}
        <div className="mb-8 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 w-full">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Job Application Tracker
              </h1>
              <p className="text-slate-600 mt-2">Manage and track your career opportunities</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportJobs}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25 font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <label className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-lg shadow-blue-500/25 font-medium">
                <Upload className="w-4 h-4 mr-2" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importJobs}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'add' })}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all shadow-lg shadow-slate-500/25 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Job
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 w-full">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-white/50">
              <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total}</div>
              <div className="text-sm font-medium text-slate-600">Total Applications</div>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-2xl shadow-lg shadow-sky-200/50 border border-sky-100/50">
              <div className="text-3xl font-bold text-sky-700 mb-1">{stats.applied}</div>
              <div className="text-sm font-medium text-sky-600">Applied</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl shadow-lg shadow-amber-200/50 border border-amber-100/50">
              <div className="text-3xl font-bold text-amber-700 mb-1">{stats.interviewing}</div>
              <div className="text-sm font-medium text-amber-600">Interviewing</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-lg shadow-emerald-200/50 border border-emerald-100/50">
              <div className="text-3xl font-bold text-emerald-700 mb-1">{stats.offered}</div>
              <div className="text-sm font-medium text-emerald-600">Offered</div>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl shadow-lg shadow-rose-200/50 border border-rose-100/50">
              <div className="text-3xl font-bold text-rose-700 mb-1">{stats.rejected}</div>
              <div className="text-sm font-medium text-rose-600">Rejected</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6 w-full">
            {['All', 'Applied', 'Interviewing', 'Offered', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => dispatch({ type: 'SET_FILTER', payload: status })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg shadow-slate-500/25'
                    : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-slate-200/50 shadow-sm'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        <div className="space-y-4 w-full">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-white/50 w-full">
              <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No applications found</h3>
              <p className="text-slate-600 mb-6">Start tracking your job applications to see them here</p>
              <button
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'add' })}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 font-medium shadow-lg shadow-slate-500/25 transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Job
              </button>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div
                key={job.id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-white/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all cursor-pointer hover:bg-white/90 group w-full"
                onClick={() => {
                  dispatch({ type: 'SELECT_JOB', payload: job });
                  dispatch({ type: 'SET_PAGE', payload: 'details' });
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 w-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-slate-600 mb-3">
                      <Building className="w-4 h-4 mr-2 text-slate-400" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                  <StatusBadge status={job.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600 mb-4 w-full">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <span>Applied: {job.appliedDate}</span>
                  </div>
                  {job.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                {job.notes && (
                  <div className="mt-4 p-4 bg-slate-50/50 backdrop-blur-sm rounded-xl border border-slate-100/50 w-full">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {job.notes.length > 150 ? `${job.notes.substring(0, 150)}...` : job.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Add/Edit Job Form Component
const JobForm = ({ editMode = false }) => {
  const { state, dispatch } = useContext(JobTrackerContext);
  const { selectedJob } = state;

  const [formData, setFormData] = useState(
    editMode && selectedJob
      ? selectedJob
      : {
          company: '',
          title: '',
          status: 'Applied',
          appliedDate: new Date().toISOString().split('T')[0],
          location: '',
          salary: '',
          notes: '',
          interviewDate: ''
        }
  );

  const handleSubmit = () => {
    if (!formData.company || !formData.title) {
      alert('Please fill in required fields');
      return;
    }
    
    if (editMode) {
      dispatch({ type: 'UPDATE_JOB', payload: formData });
    } else {
      dispatch({ type: 'ADD_JOB', payload: formData });
    }
    dispatch({ type: 'SET_PAGE', payload: 'dashboard' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <div className="p-4 sm:p-6 lg:p-8 max-w-none w-full mx-auto">
        <div className="max-w-none w-full mx-auto">
  <div className="flex items-center mb-8 w-full">
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
              className="mr-4 p-2.5 hover:bg-slate-100/80 rounded-xl transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                {editMode ? 'Edit Job Application' : 'Add New Job Application'}
              </h1>
              <p className="text-slate-600 mt-1">
                {editMode ? 'Update your application details' : 'Track a new opportunity'}
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg shadow-slate-200/50 border border-white/50 w-full">
            <div className="space-y-6 w-full">
              {/* Row 1: Company and Job Title */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                    placeholder="Enter job title"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Status and Application Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Application Date *
                  </label>
                  <input
                    type="date"
                    name="appliedDate"
                    value={formData.appliedDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Location and Salary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., $80,000 - $120,000"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Interview Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 transition-all"
                  />
                </div>
                <div></div> {/* Empty div for grid spacing */}
              </div>

              {/* Row 5: Notes - Full Width */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Add any additional notes about this application..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 bg-white/90 text-slate-900 resize-none transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10 pt-8 border-t border-slate-200/50 w-full">
              <button
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
                className="px-8 py-4 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50/80 font-medium transition-all backdrop-blur-sm text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 font-medium transition-all shadow-lg shadow-slate-500/25 text-base"
              >
                {editMode ? 'Update Application' : 'Add Application'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Job Details Component
const JobDetails = () => {
  const { state, dispatch } = useContext(JobTrackerContext);
  const { selectedJob } = state;

  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  const handleEdit = () => {
    dispatch({ type: 'SET_PAGE', payload: 'edit' });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      dispatch({ type: 'DELETE_JOB', payload: selectedJob.id });
      dispatch({ type: 'SET_PAGE', payload: 'dashboard' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <div className="p-4 sm:p-6 max-w-none w-full mx-auto">
        <div className="max-w-none w-full mx-auto">
          <div className="flex items-center justify-between mb-6 w-full">
            <div className="flex items-center">
              <button
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
                className="mr-4 p-2.5 hover:bg-slate-100/80 rounded-xl transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                  Job Application Details
                </h1>
                <p className="text-slate-600 mt-1">View and manage application information</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl hover:from-rose-700 hover:to-red-700 transition-all shadow-lg shadow-rose-500/25"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-white/50 w-full">
            {/* Header */}
            <div className="p-6 border-b border-slate-200/50 w-full">
              <div className="flex justify-between items-start mb-4 w-full">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center text-xl text-slate-600 mb-3">
                    <Building className="w-5 h-5 mr-2" />
                    {selectedJob.company}
                  </div>
                </div>
                <StatusBadge status={selectedJob.status} />
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-slate-50/50 backdrop-blur-sm rounded-xl border border-slate-100/50">
                    <Calendar className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500 font-medium">Application Date</div>
                      <div className="font-semibold text-slate-800">{selectedJob.appliedDate}</div>
                    </div>
                  </div>

                  {selectedJob.interviewDate && (
                    <div className="flex items-center p-4 bg-amber-50/50 backdrop-blur-sm rounded-xl border border-amber-100/50">
                      <User className="w-5 h-5 text-amber-500 mr-3" />
                      <div>
                        <div className="text-sm text-amber-600 font-medium">Interview Date</div>
                        <div className="font-semibold text-amber-800">{selectedJob.interviewDate}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center p-4 bg-teal-50/50 backdrop-blur-sm rounded-xl border border-teal-100/50">
                    <Clock className="w-5 h-5 text-teal-500 mr-3" />
                    <div>
                      <div className="text-sm text-teal-600 font-medium">Last Updated</div>
                      <div className="font-semibold text-teal-800">{selectedJob.lastUpdate}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedJob.location && (
                    <div className="flex items-center p-4 bg-blue-50/50 backdrop-blur-sm rounded-xl border border-blue-100/50">
                      <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <div className="text-sm text-blue-600 font-medium">Location</div>
                        <div className="font-semibold text-blue-800">{selectedJob.location}</div>
                      </div>
                    </div>
                  )}

                  {selectedJob.salary && (
                    <div className="flex items-center p-4 bg-emerald-50/50 backdrop-blur-sm rounded-xl border border-emerald-100/50">
                      <DollarSign className="w-5 h-5 text-emerald-500 mr-3" />
                      <div>
                        <div className="text-sm text-emerald-600 font-medium">Salary Range</div>
                        <div className="font-semibold text-emerald-800">{selectedJob.salary}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              {selectedJob.notes && (
                <div className="border-t border-slate-200/50 pt-6 w-full">
                  <div className="flex items-center mb-3">
                    <FileText className="w-5 h-5 text-slate-400 mr-2" />
                    <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
                  </div>
                  <div className="bg-slate-50/50 backdrop-blur-sm p-4 rounded-xl border border-slate-100/50 w-full">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedJob.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function JobTrackerApp() {
  const [state, dispatch] = useReducer(jobTrackerReducer, initialState);

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'add':
        return <JobForm />;
      case 'edit':
        return <JobForm editMode={true} />;
      case 'details':
        return <JobDetails />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <JobTrackerContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30 w-screen">
        {renderPage()}
      </div>
    </JobTrackerContext.Provider>
  );
}