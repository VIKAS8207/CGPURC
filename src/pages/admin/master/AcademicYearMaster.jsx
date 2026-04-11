import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, CalendarDays, Plus, Search, Filter, 
  MoreVertical, Edit2, Trash2, CheckCircle2, X, 
  Globe, Building, BellRing, ChevronDown, ChevronLeft, ChevronRight, Check, Eye
} from 'lucide-react';

const AcademicYearMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ name: "", deadline: "" }); 
  const [viewModalData, setViewModalData] = useState(null); 
  
  // University Search & Dropdown State
  const [uniSearch, setUniSearch] = useState("");
  const [isUniSelectorOpen, setIsUniSelectorOpen] = useState(true);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Form state
  const initialFormState = {
    yearName: "",
    startDate: "",
    endDate: "",
    scope: "global",
    deadline: "",
    selectedUniversities: []
  };
  const [formData, setFormData] = useState(initialFormState);

  // Mock list of universities
  const universityList = [
    { id: 'u1', name: 'CGPURC Main Campus' },
    { id: 'u2', name: 'North City Tech Institute' },
    { id: 'u3', name: 'Global Arts University' },
    { id: 'u4', name: 'State Medical College' },
    { id: 'u5', name: 'National Law School' },
    { id: 'u6', name: 'Institute of Space Tech' },
    { id: 'u7', name: 'Western Business Academy' },
    { id: 'u8', name: 'Eastern Engineering College' },
  ];

  const filteredUniversities = universityList.filter(uni => 
    uni.name.toLowerCase().includes(uniSearch.toLowerCase())
  );

  // Extended Mock data (Now includes deadline, scope, and universities for the View Modal)
  const [academicYears, setAcademicYears] = useState([
    { id: 1, name: "2025 - 2026", start: "Apr 01, 2025", end: "Mar 31, 2026", status: "Upcoming", deadline: "Mar 15, 2025", scope: "global", universities: [] },
    { id: 2, name: "2024 - 2025", start: "Apr 01, 2024", end: "Mar 31, 2025", status: "Active", deadline: "Oct 31, 2024", scope: "specific", universities: ['u1', 'u4', 'u5'] },
    { id: 3, name: "2023 - 2024", start: "Apr 01, 2023", end: "Mar 31, 2024", status: "Completed", deadline: "Oct 31, 2023", scope: "global", universities: [] },
    { id: 4, name: "2022 - 2023", start: "Apr 01, 2022", end: "Mar 31, 2023", status: "Completed", deadline: "Oct 31, 2022", scope: "specific", universities: ['u2', 'u3'] },
    { id: 5, name: "2021 - 2022", start: "Apr 01, 2021", end: "Mar 31, 2022", status: "Completed", deadline: "Oct 31, 2021", scope: "global", universities: [] },
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(academicYears.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = academicYears.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Deleting a row
  const handleDelete = (id) => {
    // Filter out the row with the matching ID
    setAcademicYears(prevYears => prevYears.filter(year => year.id !== id));
  };

  // Handle Form Submission
  const handleActivate = (e) => {
    e.preventDefault();
    
    setNotificationData({
      name: formData.yearName,
      deadline: formData.deadline
    });

    // Helper to format dates nicely for the table
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    // Add the new entry to our table!
    const newEntry = {
      id: Date.now(), // random unique ID
      name: formData.yearName,
      start: formatDate(formData.startDate),
      end: formatDate(formData.endDate),
      status: "Upcoming",
      deadline: formatDate(formData.deadline),
      scope: formData.scope,
      universities: formData.selectedUniversities
    };

    setAcademicYears([newEntry, ...academicYears]);
    setIsFormOpen(false); 
    setShowNotification(true); 

    // Reset the form
    setFormData(initialFormState);
    setUniSearch("");
    setIsUniSelectorOpen(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  // Toggle university selection
  const toggleUniversity = (id) => {
    if (formData.selectedUniversities.includes(id)) {
      setFormData({ ...formData, selectedUniversities: formData.selectedUniversities.filter(uId => uId !== id) });
    } else {
      setFormData({ ...formData, selectedUniversities: [...formData.selectedUniversities, id] });
    }
  };

  // Helper function for badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide"><CheckCircle2 size={14} /> Active</span>;
      case 'Upcoming':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">Upcoming</span>;
      case 'Completed':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Completed</span>;
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
                Data Submission for <strong>{notificationData.name}</strong> is now Open. 
                <br/>Deadline: <strong>{new Date(notificationData.deadline).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-')}</strong>.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL (LARGER, EDUNAUT UI) */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{viewModalData.name}</h2>
                <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                  <CalendarDays size={16} className="text-slate-400" />
                  Session Configuration Details
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Status Badge in Top Right */}
                {getStatusBadge(viewModalData.status)}
                <div className="w-px h-8 bg-slate-200"></div>
                <button 
                  onClick={() => setViewModalData(null)}
                  className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 space-y-8">
              
              {/* 3-Column Dates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Start Date</p>
                  <p className="text-lg font-bold text-slate-800">{viewModalData.start}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">End Date</p>
                  <p className="text-lg font-bold text-slate-800">{viewModalData.end}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1.5">Submission Due Date</p>
                  <p className="text-lg font-bold text-blue-900">{viewModalData.deadline}</p>
                </div>
              </div>

              {/* Target Universities Section */}
              <div>
                <p className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Target Scope & Universities</p>
                
                {viewModalData.scope === 'global' ? (
                  <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
                      <Globe size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-lg">All Universities</p>
                      <p className="text-sm text-slate-500 mt-0.5">This session is active globally for all mapped institutions.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
                       <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                         <Building size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700">{viewModalData.universities.length} Specific Institutes Configured</span>
                    </div>
                    {/* List of Colleges */}
                    <div className="max-h-60 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/50">
                       {viewModalData.universities.map(uId => {
                         const uni = universityList.find(u => u.id === uId);
                         return uni ? (
                           <div key={uId} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 transition-colors">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <span className="text-sm font-semibold text-slate-700">{uni.name}</span>
                           </div>
                         ) : null;
                       })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setViewModalData(null)}
                className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-all shadow-sm"
              >
                Close Details
              </button>
            </div>
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
        
        {/* TOGGLE FORM BUTTON */}
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm font-medium ${isFormOpen ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' : 'bg-slate-900 hover:bg-black text-white shadow-md active:scale-95'}`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel' : 'Add Academic Year'}
        </button>
      </div>

      {/* EXPANDABLE INLINE FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Create New Academic Session</h2>
          </div>
          
          <form onSubmit={handleActivate} className="p-6">
            {/* Top Row: Name and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                  required
                />
              </div>
            </div>

            {/* Scope Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Activation Scope</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setFormData({...formData, scope: 'global'})}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${formData.scope === 'global' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                >
                  <div className={`p-2 rounded-lg ${formData.scope === 'global' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${formData.scope === 'global' ? 'text-blue-900' : 'text-slate-700'}`}>All Universities</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Activate globally for all institutes</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setFormData({...formData, scope: 'specific'});
                    setIsUniSelectorOpen(true); 
                  }}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${formData.scope === 'specific' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                >
                  <div className={`p-2 rounded-lg ${formData.scope === 'specific' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Building size={24} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${formData.scope === 'specific' ? 'text-blue-900' : 'text-slate-700'}`}>Specific Universities</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Select institutes manually from list</p>
                  </div>
                </div>
              </div>
            </div>

            {/* University Selection Dropdown & Tags */}
            {formData.scope === 'specific' && (
              <div className="mb-6 animate-in slide-in-from-top-2 fade-in duration-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Target Universities</label>
                
                {/* Selected Tags Display */}
                {formData.selectedUniversities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.selectedUniversities.map(id => {
                      const uni = universityList.find(u => u.id === id);
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {uni?.name}
                          <button 
                            type="button" 
                            onClick={() => toggleUniversity(id)} 
                            className="hover:text-blue-900 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      );
                    })}
                    {!isUniSelectorOpen && (
                      <button 
                        type="button" 
                        onClick={() => setIsUniSelectorOpen(true)} 
                        className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline px-2 transition-colors"
                      >
                        + Edit Selection
                      </button>
                    )}
                  </div>
                )}

                {/* Searchable Dropdown Box */}
                {(isUniSelectorOpen || formData.selectedUniversities.length === 0) && (
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm mt-2">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="text" 
                          placeholder="Search universities by name..." 
                          value={uniSearch}
                          onChange={(e) => setUniSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto p-2">
                      {filteredUniversities.length > 0 ? (
                        filteredUniversities.map(uni => (
                          <div 
                            key={uni.id} 
                            onClick={() => toggleUniversity(uni.id)}
                            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${formData.selectedUniversities.includes(uni.id) ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.selectedUniversities.includes(uni.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                              {formData.selectedUniversities.includes(uni.id) && <Check size={14} />}
                            </div>
                            <span className={`text-sm font-medium ${formData.selectedUniversities.includes(uni.id) ? 'text-blue-900' : 'text-slate-700'}`}>
                              {uni.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-sm text-slate-500">
                          No universities found matching "{uniSearch}"
                        </div>
                      )}
                    </div>
                    <div className="bg-slate-50 border-t border-slate-200 p-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 px-2">
                        {formData.selectedUniversities.length} Universities Selected
                      </span>
                      <button 
                        type="button"
                        onClick={() => {
                          setIsUniSelectorOpen(false);
                          setUniSearch(""); 
                        }}
                        className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm active:scale-95"
                      >
                        Confirm Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Deadline & Submit Row */}
            <div className="flex flex-col sm:flex-row items-end justify-between gap-6 pt-4 border-t border-slate-100">
              <div className="w-full sm:w-64">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Data Submission Deadline</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <BellRing size={16} />
                Activate & Notify
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-t-2xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search academic years..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Session Name</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((year) => (
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
                    
                    {/* View Button triggers View Modal */}
                    <button 
                      onClick={() => setViewModalData(year)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    
                    {/* Delete Button triggers handleDelete */}
                    <button 
                      onClick={() => handleDelete(year.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-white border border-slate-200 rounded-b-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">{academicYears.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-medium text-slate-700">{Math.min(indexOfLastItem, academicYears.length)}</span> of <span className="font-medium text-slate-700">{academicYears.length}</span> entries
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default AcademicYearMaster;