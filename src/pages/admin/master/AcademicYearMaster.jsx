import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CalendarDays, Plus, Search, Filter, 
  Trash2, CheckCircle2, X, BellRing, ChevronDown, 
  ChevronLeft, ChevronRight, Eye, MoreVertical
} from 'lucide-react';

const AcademicYearMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  
  // UI States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ name: "", deadline: "" }); 
  const [viewModalData, setViewModalData] = useState(null); 
  const [openDropdown, setOpenDropdown] = useState(null); 
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Form state
  const initialFormState = {
    yearName: "",
    startDate: "",
    endDate: "",
    deadline: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  // Extended Mock data
  const [academicYears, setAcademicYears] = useState([
    { id: 1, name: "2025 - 2026", start: "Apr 01, 2025", end: "Mar 31, 2026", status: "Upcoming", deadline: "Mar 15, 2025" },
    { id: 2, name: "2024 - 2025", start: "Apr 01, 2024", end: "Mar 31, 2025", status: "Active", deadline: "Oct 31, 2024" },
    { id: 3, name: "2023 - 2024", start: "Apr 01, 2023", end: "Mar 31, 2024", status: "Completed", deadline: "Oct 31, 2023" },
    { id: 4, name: "2022 - 2023", start: "Apr 01, 2022", end: "Mar 31, 2023", status: "Completed", deadline: "Oct 31, 2022" },
    { id: 5, name: "2021 - 2022", start: "Apr 01, 2021", end: "Mar 31, 2022", status: "Completed", deadline: "Oct 31, 2021" },
    { id: 6, name: "2020 - 2021", start: "Apr 01, 2020", end: "Mar 31, 2021", status: "Completed", deadline: "Oct 31, 2020" },
    { id: 7, name: "2019 - 2020", start: "Apr 01, 2019", end: "Mar 31, 2020", status: "Completed", deadline: "Oct 31, 2019" },
    { id: 8, name: "2018 - 2019", start: "Apr 01, 2018", end: "Mar 31, 2019", status: "Completed", deadline: "Oct 31, 2018" },
    { id: 9, name: "2017 - 2018", start: "Apr 01, 2017", end: "Mar 31, 2018", status: "Completed", deadline: "Oct 31, 2017" },
    { id: 10, name: "2016 - 2017", start: "Apr 01, 2016", end: "Mar 31, 2017", status: "Completed", deadline: "Oct 31, 2016" },
    { id: 11, name: "2015 - 2016", start: "Apr 01, 2015", end: "Mar 31, 2016", status: "Completed", deadline: "Oct 31, 2015" },
    { id: 12, name: "2014 - 2015", start: "Apr 01, 2014", end: "Mar 31, 2015", status: "Completed", deadline: "Oct 31, 2014" },
    { id: 13, name: "2013 - 2014", start: "Apr 01, 2013", end: "Mar 31, 2014", status: "Completed", deadline: "Oct 31, 2013" },
    { id: 14, name: "2012 - 2013", start: "Apr 01, 2012", end: "Mar 31, 2013", status: "Completed", deadline: "Oct 31, 2012" },
    { id: 15, name: "2011 - 2012", start: "Apr 01, 2011", end: "Mar 31, 2012", status: "Completed", deadline: "Oct 31, 2011" },
  ]);

  // Handle clicking outside to close any open dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtering Logic
  const filteredData = academicYears.filter(year => {
    const matchesSearch = year.name.toLowerCase().includes(searchQuery.toLowerCase()) || year.status.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' || year.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Deleting a row
  const handleDelete = (id) => {
    setAcademicYears(prevYears => prevYears.filter(year => year.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Form Submission
  const handleActivate = (e) => {
    e.preventDefault();
    
    setNotificationData({
      name: formData.yearName,
      deadline: formData.deadline
    });

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newEntry = {
      id: Date.now(),
      name: formData.yearName,
      start: formatDate(formData.startDate),
      end: formatDate(formData.endDate),
      status: "Upcoming",
      deadline: formatDate(formData.deadline),
    };

    setAcademicYears([newEntry, ...academicYears]);
    setIsFormOpen(false); 
    setShowNotification(true); 

    setFormData(initialFormState);
    setCurrentPage(1);
    setStatusFilter("All");
    
    setTimeout(() => setShowNotification(false), 6000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide"><CheckCircle2 size={14} /> Active</span>;
      case 'Upcoming':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold bg-[#155DFC]/10 text-[#155DFC] border border-[#155DFC]/20 uppercase tracking-wide">Upcoming</span>;
      case 'Completed':
        return <span className="flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] shrink-0">
              <BellRing className="text-[#155DFC]" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Academic Year Updated</h3>
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

      {/* VIEW DETAILS MODAL */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{viewModalData.name}</h2>
                <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                  <CalendarDays size={16} className="text-slate-400" />
                  Session Configuration Details
                </p>
              </div>
              <div className="flex items-center gap-4">
                {getStatusBadge(viewModalData.status)}
                <div className="w-px h-8 bg-slate-200"></div>
                <button 
                  onClick={() => setViewModalData(null)}
                  className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Start Date</p>
                  <p className="text-lg font-bold text-slate-800">{viewModalData.start}</p>
                </div>
                <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">End Date</p>
                  <p className="text-lg font-bold text-slate-800">{viewModalData.end}</p>
                </div>
                <div className="bg-[#155DFC]/5 p-4 rounded-[10px] border border-[#155DFC]/20 shadow-sm">
                  <p className="text-xs font-bold text-[#155DFC] uppercase tracking-wider mb-1.5">Submission Due Date</p>
                  <p className="text-lg font-bold text-slate-900">{viewModalData.deadline}</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setViewModalData(null)}
                className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[10px] transition-all shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-3 rounded-[10px]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumb Path */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Academic Year</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px]">
              <CalendarDays className="text-[#155DFC]" size={24} />
            </div>
            Academic Year Master
          </h1>
          <p className="text-slate-500 mt-2">Manage institution sessions, terms, and working days.</p>
        </div>
        
        {/* TOGGLE FORM BUTTON */}
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] transition-all shadow-sm font-medium ${isFormOpen ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' : 'bg-slate-900 hover:bg-black text-white shadow-md active:scale-95'}`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel' : 'Add Academic Year'}
        </button>
      </div>

      {/* EXPANDABLE INLINE FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Create New Academic Session</h2>
          </div>
          
          <form onSubmit={handleActivate} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Session Name</label>
                <input 
                  type="text" 
                  value={formData.yearName}
                  onChange={(e) => setFormData({...formData, yearName: e.target.value})}
                  placeholder="e.g. Spring Session 2026-27"
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Submission Deadline</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-2.5 text-sm font-medium text-white bg-[#155DFC] hover:bg-[#155DFC]/90 shadow-md hover:shadow-lg rounded-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <BellRing size={16} />
                Activate & Notify
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search academic years..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all text-sm font-medium"
          />
        </div>
        
        {/* EDUNUT DESIGNED FILTER DROPDOWN */}
        <div className="relative dropdown-container">
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'filter' ? null : 'filter')}
            className="flex items-center gap-2 text-slate-600 bg-white shadow-sm border-none px-4 py-2 rounded-[10px] hover:bg-[#155DFC]/10 hover:text-[#155DFC] transition-all text-sm font-medium w-full sm:w-auto justify-center"
          >
            <Filter size={18} />
            {statusFilter === 'All' ? 'Filter' : statusFilter}
            <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'filter' ? 'rotate-180 text-[#155DFC]' : ''}`} />
          </button>

          {openDropdown === 'filter' && (
            <div className="absolute right-0 top-12 w-40 bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border-none">
              {['All', 'Active', 'Upcoming', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => { setStatusFilter(status); setOpenDropdown(null); setCurrentPage(1); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${statusFilter === status ? 'bg-[#155DFC]/10 text-[#155DFC]' : 'text-slate-700 hover:bg-[#155DFC]/10 hover:text-[#155DFC]'}`}
                >
                  {status === 'All' ? 'All Status' : status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Session Name</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((year, index) => (
              <tr key={year.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800">{year.name}</div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.start}</td>
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.end}</td>
                <td className="py-4 px-6">
                  {getStatusBadge(year.status)}
                </td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === `action-${year.id}` ? null : `action-${year.id}`)}
                    className="p-2 text-slate-400 hover:bg-[#155DFC]/10 hover:text-[#155DFC] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Edunut Action Dropdown */}
                  {openDropdown === `action-${year.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={() => { setViewModalData(year); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#155DFC]/10 hover:text-[#155DFC] transition-colors border-b border-slate-50 text-left"
                      >
                        <Eye size={16} /> View Details
                      </button>
                      <button
                        onClick={() => { handleDelete(year.id); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                  No academic years found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination Footer (Matches Edunut Target Design) */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-medium mr-3">Total: {filteredData.length}</span>
          
          {/* Custom Styled Dropdown for Items Per Page */}
          <div className="relative inline-flex items-center dropdown-container">
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-medium cursor-pointer text-slate-700"
            >
              {[1, 2, 3, 4, 5, 6, 7, 10, 15, 20, 50].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
          </div>
          
          <span className="ml-3">items per page</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600">
          
          {/* Custom Styled Dropdown for Page Select */}
          <div className="flex items-center">
            <div className="relative inline-flex items-center mr-2 dropdown-container">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-medium cursor-pointer text-slate-700"
              >
                {Array.from({ length: totalPages || 1 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
            </div>
            <span>of {totalPages || 1} pages</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AcademicYearMaster;