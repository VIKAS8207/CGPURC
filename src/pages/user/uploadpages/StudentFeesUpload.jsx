import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Wallet, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, BookOpen, Search, Eye, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ChevronDown, AlertTriangle,
  CheckCircle2, X, Plus, PieChart, Layers, Check, Calculator,
  ShieldCheck, MoreVertical, IndianRupee, Users, Calendar, 
  FileCheck, RefreshCcw, Hash, User, CalendarDays
} from 'lucide-react';

const StudentFeesUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- UI STATES ---
  const [uploadMode, setUploadMode] = useState('manual');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('idle');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);

  // --- FORM STATES ---
  const [manualData, setManualData] = useState({ 
    course: '', 
    branch: '', 
    enrollmentNo: '', 
    semester: '',
    paymentDate: '',
    amountPaid: ''
  });

  const [bulkConfig, setBulkConfig] = useState({ course: '', branch: '' });

  // Mock Data for Dropdowns
  const courseList = ["B.Tech", "M.Tech", "MBA", "BCA"];
  const branchList = ["Computer Science", "Mechanical", "Civil", "Electronics"];
  const semesterList = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Table Data updated with Entity & Record breakdown
  const [history, setHistory] = useState([
    { 
      id: 1, 
      type: 'Bulk',
      course: 'B.Tech',
      branch: 'Computer Science',
      studentCount: 10, 
      totalFeesAmount: '133975', 
      monthName: 'January', 
      entryDate: '5/30/2025 4:22:12 PM',
      fileName: 'jan_fees_collection.xlsx',
      accepted: 10,
      rejected: 0
    },
    { 
      id: 2, 
      type: 'Bulk',
      course: 'MBA',
      branch: 'Finance',
      studentCount: 15, 
      totalFeesAmount: '297950', 
      monthName: 'February', 
      entryDate: '5/30/2025 4:22:12 PM',
      fileName: 'feb_mba_batch.xlsx',
      accepted: 11,
      rejected: 4
    },
    { 
      id: 3, 
      type: 'Manual',
      course: 'B.Sc',
      branch: 'Physics',
      studentCount: 1, 
      totalFeesAmount: '602600', 
      monthName: 'March', 
      entryDate: '5/30/2025 4:22:12 PM',
      studentName: 'Vikas Vishwakarma',
      regNumber: 'ADM-2026-001',
      accepted: 1,
      rejected: 0
    },
  ]);

  // Pagination & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    return (
      <>
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Student Fee Upload</span>
      </>
    );
  };

  // --- HANDLERS ---
  const handleManualCustomSelect = (name, value) => {
    setManualData({ ...manualData, [name]: value });
    setOpenDropdown(null);
  };

  const handleBulkCustomSelect = (name, value) => {
    setBulkConfig({ ...bulkConfig, [name]: value });
    setOpenDropdown(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsProcessed(false);
      setBulkStatus('idle');
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleBulkAction = () => {
    if (bulkStatus === 'idle') {
      setBulkStatus('reviewed');
      setIsProcessed(true);
    } else {
      setShowNotification(true);
      setBulkStatus('submitted');
      setTimeout(() => {
        setShowNotification(false);
        setSelectedFile(null);
        setIsProcessed(false);
        setBulkStatus('idle');
      }, 3000);
    }
  };

  const filteredHistory = history.filter(item => 
    item.monthName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalRecords = filteredHistory.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative font-sans">
      
      {/* SUCCESS NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Success</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">The fee records have been successfully saved.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 outline-none"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* VIEW MODAL OVERVIEW */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 text-left">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Fee Collection Overview</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-black text-[#FF6900]">₹ {Number(viewModalData.totalFeesAmount).toLocaleString('en-IN')}</h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-[#FF6900]/10 text-[#FF6900] text-xs font-bold uppercase tracking-wider rounded-[10px] border border-[#FF6900]/20">
                    Month: {viewModalData.monthName}
                  </div>
                </div>
                <div className="shrink-0 text-[#FF6900]">
                  <div className="w-16 h-16 rounded-[10px] bg-[#FF6900]/10 flex items-center justify-center border border-[#FF6900]/20 shadow-sm">
                    <IndianRupee size={32} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entry Type</p>
                  <p className="font-bold text-slate-800">{viewModalData.type}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entry Date</p>
                  <p className="font-bold text-slate-800">{viewModalData.entryDate}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-[10px] border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Accepted Payments</p>
                  <p className="text-xl font-black text-emerald-700">{viewModalData.accepted}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-[10px] border border-red-100">
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Rejections</p>
                  <p className="text-xl font-black text-red-700">{viewModalData.rejected}</p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] rounded-[10px] shadow-md outline-none transition-all hover:shadow-orange-100">
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <IndianRupee size={24} />
            </div>
            Student Fee Upload
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage individual student payments or batch fee uploads.</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm mb-10 overflow-visible relative">
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-3">
          <button onClick={() => setUploadMode('manual')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${uploadMode === 'manual' ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-[10px]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <UserPlus size={18} /> Manual Entry
          </button>
          <button onClick={() => setUploadMode('bulk')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${uploadMode === 'bulk' ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-[10px]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <FileSpreadsheet size={18} /> Bulk Upload
          </button>
        </div>

        <div className="p-8">
          {uploadMode === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-left-4 duration-300 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-left">
                
                {/* Course Dropdown */}
                <div className="relative dropdown-container z-[40]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'mCourse' ? null : 'mCourse')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px] focus:ring-2 focus:ring-[#FF6900]/20 border border-transparent focus:border-[#FF6900]/50 transition-all">
                    <span>{manualData.course || "Select Course"}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'mCourse' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'mCourse' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                      {courseList.map(c => <button key={c} type="button" onClick={() => handleManualCustomSelect('course', c)} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-orange-50 hover:text-[#FF6900] transition-colors">{c}</button>)}
                    </div>
                  )}
                </div>

                {/* Branch Dropdown */}
                <div className="relative dropdown-container z-[30]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Branch</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'mBranch' ? null : 'mBranch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px] focus:ring-2 focus:ring-[#FF6900]/20 border border-transparent focus:border-[#FF6900]/50 transition-all">
                    <span>{manualData.branch || "Select Branch"}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'mBranch' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'mBranch' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                      {branchList.map(b => <button key={b} type="button" onClick={() => handleManualCustomSelect('branch', b)} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-orange-50 hover:text-[#FF6900] transition-colors">{b}</button>)}
                    </div>
                  )}
                </div>

                {/* Enrollment Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Enrollment / Registration No.</label>
                  <div className="relative h-[50px]">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. ENR12345" 
                      value={manualData.enrollmentNo}
                      onChange={(e) => setManualData({...manualData, enrollmentNo: e.target.value})}
                      className="w-full pl-11 pr-4 h-full bg-slate-50 border border-transparent rounded-[10px] font-medium text-slate-800 outline-none focus:bg-white focus:border-[#FF6900]/50 focus:ring-2 focus:ring-[#FF6900]/20 transition-all placeholder:text-slate-400" 
                    />
                  </div>
                </div>

                {/* Semester Dropdown */}
                <div className="relative dropdown-container z-[20]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Semester</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'mSemester' ? null : 'mSemester')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px] focus:ring-2 focus:ring-[#FF6900]/20 border border-transparent focus:border-[#FF6900]/50 transition-all">
                    <span>{manualData.semester || "Select Semester"}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'mSemester' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'mSemester' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden max-h-60 overflow-y-auto">
                      {semesterList.map(s => <button key={s} type="button" onClick={() => handleManualCustomSelect('semester', s)} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-orange-50 hover:text-[#FF6900] transition-colors">{s}</button>)}
                    </div>
                  )}
                </div>

                {/* Payment Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Submission Date</label>
                  <div className="relative h-[50px]">
                    <CalendarDays size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input 
                      type="date" 
                      value={manualData.paymentDate}
                      onChange={(e) => setManualData({...manualData, paymentDate: e.target.value})}
                      className="w-full pl-11 pr-4 h-full bg-slate-50 border border-transparent rounded-[10px] font-medium text-slate-800 outline-none focus:bg-white focus:border-[#FF6900]/50 focus:ring-2 focus:ring-[#FF6900]/20 transition-all" 
                    />
                  </div>
                </div>

                {/* Amount Paid */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Amount Paid</label>
                  <div className="relative h-[50px]">
                    <IndianRupee size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={manualData.amountPaid}
                      onChange={(e) => setManualData({...manualData, amountPaid: e.target.value})}
                      className="w-full pl-11 pr-4 h-full bg-slate-50 border border-transparent rounded-[10px] font-medium text-slate-800 outline-none focus:bg-white focus:border-[#FF6900]/50 focus:ring-2 focus:ring-[#FF6900]/20 transition-all placeholder:text-slate-400" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-100">
                <button type="submit" className="bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-10 py-3.5 rounded-[10px] font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 outline-none h-[50px]">
                  <CheckCircle2 size={18} /> Record Payment
                </button>
              </div>
            </form>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300">
               {/* Bulk UI Logic */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                <div className="lg:col-span-2">
                  <label className="border-2 border-dashed border-slate-300 rounded-[10px] bg-slate-50 hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group shadow-sm min-h-[250px]">
                    <UploadCloud size={32} className="text-slate-400 group-hover:text-[#FF6900] mb-4" />
                    <p className="text-slate-800 font-bold mb-1">Upload Fees Spreadsheet</p>
                    <input type="file" className="hidden" accept=".xlsx" onChange={handleFileChange} />
                    <div className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-[8px] font-bold text-sm group-hover:bg-[#FF6900] group-hover:text-white transition-colors">Browse Files</div>
                  </label>
                </div>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* History Table Toolbar */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 text-left">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Fee Collection History</h3>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by month..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium" />
        </div>
      </div>

      {/* DATA TABLE (Entity Details & Records Columns Added) */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px] text-left">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
              <th className="py-4 px-6 w-16 text-center">SNo</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Target Details</th>
              <th className="py-4 px-6">Entity Details</th>
              <th className="py-4 px-6 text-center">Records</th>
              <th className="py-4 px-6">Entry Date</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-500 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-[10px] text-[10px] font-bold border uppercase tracking-wider ${
                    item.type === 'Bulk' ? 'bg-[#FF6900]/10 text-[#FF6900] border-[#FF6900]/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800 text-sm">{item.course} - {item.branch}</div>
                  <div className="text-[11px] font-black text-[#FF6900] flex items-center gap-1.5 mt-1">
                      ₹ {Number(item.totalFeesAmount).toLocaleString('en-IN')} collected
                  </div>
                </td>
                <td className="py-4 px-6">
                  {item.type === 'Bulk' ? (
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <FileSpreadsheet size={16} className="text-emerald-600 shrink-0" />
                      <p className="text-sm font-bold text-slate-700 truncate" title={item.fileName}>{item.fileName}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <User size={16} className="text-blue-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-700 truncate">{item.studentName}</p>
                        <p className="text-xs font-medium text-slate-500 truncate">{item.regNumber}</p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {item.type === 'Bulk' ? (
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[10px] border border-slate-200 w-full text-center">Tot: {item.studentCount}</span>
                        <div className="flex gap-1 w-full">
                           <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 flex-1 text-center">✓ {item.accepted}</span>
                           <span className={`text-[10px] font-bold flex-1 text-center px-1 py-0.5 rounded border ${item.rejected > 0 ? 'text-red-700 bg-red-50 border-red-200' : 'text-slate-400 bg-slate-50 border-slate-100'}`}>
                             ✗ {item.rejected}
                           </span>
                        </div>
                      </div>
                  ) : (
                      <div className="flex justify-center">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-[10px] border border-emerald-200">
                          1 Mapped
                        </span>
                      </div>
                  )}
                </td>
                <td className="py-4 px-6 text-xs font-bold text-slate-400 font-mono">{item.entryDate}</td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button onClick={() => setOpenDropdown(openDropdown === `action-${item.id}` ? null : `action-${item.id}`)} className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-all outline-none opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <MoreVertical size={18} />
                  </button>
                  {openDropdown === `action-${item.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                      <button 
                        onClick={() => { setViewModalData(item); setOpenDropdown(null); }} 
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Eye size={16} /> View Details
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left outline-none">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-bold mr-3 text-slate-400 uppercase text-[10px] tracking-widest">Total: {totalRecords} Records</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 border border-slate-200 bg-white rounded-[10px] text-slate-300 hover:text-[#FF6900] disabled:opacity-30 transition-all outline-none shadow-sm"><ChevronLeft size={16} /></button>
          <button className="w-8 h-8 bg-[#FF6900] text-white rounded-[10px] font-bold text-xs shadow-md shadow-orange-100">{currentPage}</button>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 border border-slate-200 bg-white rounded-[10px] text-slate-300 hover:text-[#FF6900] disabled:opacity-30 transition-all outline-none shadow-sm"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default StudentFeesUpload;