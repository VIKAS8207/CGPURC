import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, CalendarDays, Plus, Search, Filter, 
  MoreVertical, Edit2, Trash2, CheckCircle2, X, 
  Globe, Building, BellRing 
} from 'lucide-react';

const AcademicYearMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // States for our new Modal and Notification flows
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Form state inside the modal
  const [formData, setFormData] = useState({
    yearName: "Academic Year 2024-25",
    scope: "global",
    deadline: "2024-10-31"
  });

  // Mock data for the table
  const [academicYears, setAcademicYears] = useState([
    { id: 1, name: "2024 - 2025", start: "Apr 01, 2024", end: "Mar 31, 2025", status: "Active" },
    { id: 2, name: "2023 - 2024", start: "Apr 01, 2023", end: "Mar 31, 2024", status: "Completed" },
    { id: 3, name: "2022 - 2023", start: "Apr 01, 2022", end: "Mar 31, 2023", status: "Completed" },
  ]);

  // Handle Modal Submission
  const handleActivate = (e) => {
    e.preventDefault();
    setIsModalOpen(false); // Close Modal
    setShowNotification(true); // Trigger Dashboard Notification Alert
    
    // Auto-hide notification after 6 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  // Helper function to render the correct badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 size={14} /> Active</span>;
      case 'Upcoming':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Upcoming</span>;
      case 'Completed':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-blue-600 shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-blue-50 rounded-lg shrink-0">
              <BellRing className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">University Dashboard Updated</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Data Submission for <strong>{formData.yearName}</strong> is now Open. 
                <br/>Deadline: <strong>{new Date(formData.deadline).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-')}</strong>.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6">
        <Link to="/admin/master" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> Back to Master Settings
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <CalendarDays className="text-indigo-600" size={24} />
            </div>
            Academic Year Master
          </h1>
          <p className="text-slate-500 mt-2">Manage institution sessions, terms, and working days.</p>
        </div>
        
        {/* ADD ACADEMIC YEAR BUTTON */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 font-medium"
        >
          <Plus size={20} />
          Add Academic Year
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-t-2xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search academic years..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-b-2xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Session Name</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {academicYears.map((year) => (
              <tr key={year.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800">{year.name}</div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.start}</td>
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.end}</td>
                <td className="py-4 px-6">
                  {getStatusBadge(year.status)}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OVERLAY & MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add Academic Year</h2>
                <p className="text-sm text-slate-500 mt-1">Configure and activate a new session.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleActivate} className="p-6 space-y-6">
              
              {/* Year Name Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Session Name</label>
                <input 
                  type="text" 
                  value={formData.yearName}
                  onChange={(e) => setFormData({...formData, yearName: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  required
                />
              </div>

              {/* Scope Selection (Global vs Specific) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Activation Scope</label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Global Option */}
                  <div 
                    onClick={() => setFormData({...formData, scope: 'global'})}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 ${formData.scope === 'global' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                  >
                    <Globe className={formData.scope === 'global' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                    <div>
                      <h4 className={`text-sm font-bold ${formData.scope === 'global' ? 'text-blue-900' : 'text-slate-700'}`}>All Universities</h4>
                      <p className="text-xs text-slate-500 mt-1">Activate globally</p>
                    </div>
                  </div>

                  {/* Specific Option */}
                  <div 
                    onClick={() => setFormData({...formData, scope: 'specific'})}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 ${formData.scope === 'specific' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                  >
                    <Building className={formData.scope === 'specific' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                    <div>
                      <h4 className={`text-sm font-bold ${formData.scope === 'specific' ? 'text-blue-900' : 'text-slate-700'}`}>Specific Only</h4>
                      <p className="text-xs text-slate-500 mt-1">Select manually</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deadline Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Data Submission Deadline</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium"
                  required
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg rounded-xl transition-all active:scale-95 flex items-center gap-2"
                >
                  <BellRing size={16} />
                  Activate & Notify
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AcademicYearMaster;