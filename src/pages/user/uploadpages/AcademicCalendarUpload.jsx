import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Download, FileSpreadsheet, UploadCloud, CalendarDays,
  Search, Eye, Edit2, Trash2, FileText, ChevronLeft, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, PieChart,
  ArrowLeft, Calendar, ChevronDown, X, ShieldCheck, MoreVertical
} from 'lucide-react';

const AcademicCalendarUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link to="/user/uploads" className="hover:text-[#FF6900] transition-colors">Document Uploads</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Academic Calendar Upload</span>
        </>
      );
    }
    return paths.map((path, index) => {
      const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
      const isLast = index === paths.length - 1;
      const displayName = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return (
        <React.Fragment key={routeTo}>
          {isLast ? (
             <span className="text-slate-900 font-semibold tracking-tight">Academic Calendar Upload</span>
          ) : (
             <>
               <Link to={routeTo} className="hover:text-[#FF6900] transition-colors">{displayName}</Link>
               <ChevronRight size={14} className="text-slate-400" />
             </>
          )}
        </React.Fragment>
      );
    });
  };

  // --- UI STATES ---
  const [showNotification, setShowNotification] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Modals
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Form State
  const initialFormState = { academicYear: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Edit Form State
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  // Pagination & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dummy Data for Table
  const [uploadHistory, setUploadHistory] = useState([
    { id: 1, academicYear: '2024-2025', eventCount: 142, fileName: 'calendar_2024_master.xlsx', fileSize: '1.2 MB', uploadDate: '10 Jan 2024', status: 'Active' },
    { id: 2, academicYear: '2025-2026', eventCount: 156, fileName: 'academic_schedule_25_26.xlsx', fileSize: '1.5 MB', uploadDate: '05 Nov 2024', status: 'Active' },
    { id: 3, academicYear: '2023-2024', eventCount: 138, fileName: 'past_calendar_23_24.xlsx', fileSize: '1.1 MB', uploadDate: '15 Dec 2023', status: 'Archived' },
  ]);

  const academicSessions = [
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027"
  ];

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

  // Filter and Pagination Logic
  const filteredHistory = uploadHistory.filter(record => 
    record.academicYear.toLowerCase().includes(searchQuery.toLowerCase()) || 
    record.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRecords = filteredHistory.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handleCustomSelect = (value) => {
    setFormData({ ...formData, academicYear: value });
    setOpenDropdown(null);
  };

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditSelectedFile(file);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (!formData.academicYear || !selectedFile) {
        alert("Please select an academic year and upload a file.");
        return;
    }

    const newRecord = {
        id: Date.now(),
        academicYear: formData.academicYear,
        eventCount: Math.floor(Math.random() * 50) + 120, // Mock parsed events
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size),
        uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Active'
    };

    setUploadHistory([newRecord, ...uploadHistory]);
    setFormData(initialFormState);
    setSelectedFile(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editSelectedFile) {
        const updatedRecord = {
            ...editModalData,
            fileName: editSelectedFile.name,
            fileSize: formatFileSize(editSelectedFile.size),
            eventCount: Math.floor(Math.random() * 50) + 120, // Mock newly parsed events
            uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) // Update date on re-upload
        };
        setUploadHistory(uploadHistory.map(r => r.id === updatedRecord.id ? updatedRecord : r));
    }
    setEditModalData(null);
    setEditSelectedFile(null);
  };

  const openEditModal = (record) => {
    setEditModalData(record);
    setEditSelectedFile(null);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setUploadHistory(prev => prev.filter(r => r.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setOpenDropdown(null);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Calendar Uploaded</h3>
              <p className="text-xs text-slate-500 mt-1">
                The academic calendar has been successfully processed and mapped to the registry.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Calendar Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{viewModalData.academicYear}</h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-[#FF6900]/10 text-[#FF6900] text-xs font-bold uppercase tracking-wider rounded-[10px] border border-[#FF6900]/20">
                    {viewModalData.status}
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-3">Uploaded on: {viewModalData.uploadDate}</p>
                </div>
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm text-[#FF6900]">
                      <CalendarDays size={32} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Mapped Events</p>
                  <p className="text-xl font-black text-slate-800">{viewModalData.eventCount}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source File</p>
                  <p className="text-sm font-bold text-slate-800 truncate" title={viewModalData.fileName}>{viewModalData.fileName}</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{viewModalData.fileSize}</p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-[#FF6900] bg-white border border-orange-200 hover:bg-orange-50 rounded-[10px] transition-all shadow-sm outline-none">
                 <Download size={16} /> Download File
              </button>
              <button onClick={() => setViewModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[10px] transition-all shadow-sm outline-none">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Update Calendar File</h2>
              <button onClick={() => setEditModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year</label>
                <input type="text" value={editModalData.academicYear} readOnly disabled
                  className="w-full px-4 py-2.5 bg-slate-100 border-none shadow-sm rounded-[10px] font-bold text-slate-500 cursor-not-allowed" title="Academic year cannot be changed" />
              </div>
                
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload New Calendar File (.xlsx)</label>
                {editSelectedFile ? (
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-200 shadow-sm rounded-[10px]">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-emerald-50 rounded-[10px]">
                         <FileSpreadsheet className="text-emerald-600" size={20} />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-800 truncate">{editSelectedFile.name}</p>
                        <p className="text-xs font-medium text-slate-500">{formatFileSize(editSelectedFile.size)}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setEditSelectedFile(null)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] transition-colors outline-none shrink-0">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-3 px-4 py-8 bg-slate-50 shadow-sm border-2 border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all group">
                    <div className="p-3 bg-white border border-slate-200 rounded-full group-hover:scale-110 transition-transform shadow-sm">
                        <UploadCloud size={24} className="text-slate-400 group-hover:text-[#FF6900]" />
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-[#FF6900] group-hover:underline">Click to browse</span>
                        <span className="text-sm font-medium text-slate-500 ml-1">or drag and drop</span>
                        <p className="text-xs font-medium text-slate-400 mt-1">Excel formats only (.xlsx, .xls)</p>
                    </div>
                    <input type="file" className="hidden" accept=".xlsx, .xls" onChange={(e) => handleFileChange(e, true)} />
                  </label>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setEditModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-[10px] transition-all shadow-sm outline-none">
                  Cancel
                </button>
                <button type="submit" disabled={!editSelectedFile} className="px-6 py-2.5 text-sm font-bold text-white bg-[#FF6900] hover:bg-[#FF6900]/90 rounded-[10px] shadow-md hover:shadow-lg transition-all active:scale-95 outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                  Upload & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 rounded-[10px] outline-none"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Dynamic Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <CalendarDays size={24} />
            </div>
            Academic Calendar Upload
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Upload holidays, term dates, and exam schedules for the entire academic year.</p>
        </div>
      </div>

      {/* Main Content Card (Edunut UI - Removed overflow-hidden to fix dropdown) */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm mb-10">
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 py-4 rounded-t-[10px]">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
            <FileSpreadsheet className="text-slate-400" size={18} />
            Academic File Upload Form
          </h2>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleBulkSubmit} className="flex flex-col lg:flex-row items-start lg:items-end gap-6 w-full">
            
            {/* 1. Academic Session Dropdown */}
            <div className="w-full lg:w-1/3 relative dropdown-container z-20">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Academic Session</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'academicYear' ? null : 'academicYear')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
              >
                <span className={formData.academicYear ? "text-slate-800" : "text-slate-400"}>
                  {formData.academicYear || "Select Session..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'academicYear' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'academicYear' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                  {academicSessions.map((session, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect(session)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${formData.academicYear === session ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {session}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. File Upload (Compact Inline) */}
            <div className="w-full lg:w-1/3 z-10">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Calendar File (.xlsx)</label>
              
              {selectedFile ? (
                <div className="flex items-center justify-between px-4 py-3.5 bg-emerald-50 border border-emerald-200 shadow-sm rounded-[10px] h-[50px]">
                  <div className="flex items-center gap-2 overflow-hidden">
                     <FileSpreadsheet className="text-emerald-600 shrink-0" size={18} />
                     <p className="text-sm font-bold text-emerald-800 truncate" title={selectedFile.name}>{selectedFile.name}</p>
                  </div>
                  <button type="button" onClick={() => setSelectedFile(null)} className="text-emerald-600 hover:text-red-500 transition-colors ml-2 outline-none shrink-0">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-between px-4 py-3.5 bg-slate-50 shadow-sm border border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all group h-[50px]">
                  <div className="flex items-center gap-2">
                    <UploadCloud size={18} className="text-slate-400 group-hover:text-[#FF6900] transition-colors" />
                    <span className="text-sm font-medium text-slate-500 group-hover:text-[#FF6900] transition-colors">Browse Excel File...</span>
                  </div>
                  <input type="file" className="hidden" accept=".xlsx, .xls" onChange={(e) => handleFileChange(e, false)} />
                </label>
              )}
            </div>

            {/* 3. Submit Button */}
            <div className="w-full lg:w-1/3 z-10">
              <button 
                type="submit" 
                disabled={!formData.academicYear || !selectedFile}
                className="w-full h-[50px] bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-6 py-3.5 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FF6900]"
              >
                <UploadCloud size={18} />
                Process & Upload
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* TABLE TOOLBAR (Edunut UI - Orange) */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Uploads</h3>
        </div>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by academic year or filename..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* DATA TABLE (Edunut UI) */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Session</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Source File</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Events Mapped</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((record, index) => (
              <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500 shrink-0">
                        <Calendar size={14} />
                    </div>
                    <div>
                        <div className="font-bold text-slate-800 text-sm">{record.academicYear}</div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${record.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {record.status}
                        </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 max-w-[200px]">
                      <FileText size={16} className="text-[#FF6900] shrink-0" />
                      <div className="truncate">
                          <p className="text-sm font-bold text-slate-700 truncate" title={record.fileName}>{record.fileName}</p>
                          <p className="text-xs font-medium text-slate-500">{record.fileSize || '1.2 MB'}</p>
                      </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-[10px] text-xs font-bold border border-slate-200">
                      {record.eventCount} Events
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-slate-600 text-sm font-medium">
                      {record.uploadDate}
                  </span>
                </td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === `action-${record.id}` ? null : `action-${record.id}`)}
                    className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Edunut Action Dropdown */}
                  {openDropdown === `action-${record.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={() => { setViewModalData(record); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={() => openEditModal(record)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Edit2 size={16} /> Re-Upload
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left outline-none"
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
                  No records found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination Footer (Edunut Target Design - Orange) */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-bold mr-3">Total: {totalRecords}</span>
          
          {/* Custom Styled Dropdown for Items Per Page */}
          <div className="relative inline-flex items-center dropdown-container">
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
            >
              {[5, 10, 15, 20, 50].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
          </div>
          
          <span className="ml-3 font-medium">items per page</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600">
          
          {/* Custom Styled Dropdown for Page Select */}
          <div className="flex items-center">
            <div className="relative inline-flex items-center mr-2 dropdown-container">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
              >
                {Array.from({ length: totalPages || 1 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
            </div>
            <span className="font-medium">of {totalPages || 1} pages</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#FF6900] hover:bg-[#FF6900]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#FF6900] hover:bg-[#FF6900]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AcademicCalendarUpload;