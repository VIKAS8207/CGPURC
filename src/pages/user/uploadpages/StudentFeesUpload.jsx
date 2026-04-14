import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Wallet, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, BookOpen, Search, Eye, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ChevronDown, AlertTriangle,
  CheckCircle2, X, Plus, PieChart, Layers, Check, Calculator,
  ShieldCheck, MoreVertical, IndianRupee, Users, Calendar, 
  FileCheck, RefreshCcw, Hash // <--- MAKE SURE IndianRupee IS HERE
} from 'lucide-react';

const StudentFeesUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- UI STATES ---
  const [uploadMode, setUploadMode] = useState('manual'); // 'manual' or 'bulk'
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('idle'); // 'idle', 'reviewed', 'submitted'
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false);

  // --- FORM STATES ---
  const [manualData, setManualData] = useState({ 
    course: '', 
    branch: '', 
    enrollmentNo: '', 
    amount: '', 
    month: '', 
    date: '' 
  });

  const [bulkConfig, setBulkConfig] = useState({ course: '', branch: '' });

  // Mock Data for Dropdowns
  const courseList = ["B.Tech", "M.Tech", "MBA", "BCA"];
  const branchList = ["Computer Science", "Mechanical", "Civil", "Electronics"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Table Data (Based on user screenshot)
  const [history, setHistory] = useState([
    { id: 1, sno: 1, studentCount: 10, totalFeesAmount: '133975', monthName: 'January', entryDate: '5/30/2025 4:22:12 PM' },
    { id: 2, sno: 2, studentCount: 11, totalFeesAmount: '297950', monthName: 'February', entryDate: '5/30/2025 4:22:12 PM' },
    { id: 3, sno: 3, studentCount: 12, totalFeesAmount: '602600', monthName: 'March', entryDate: '5/30/2025 4:22:12 PM' },
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

      {/* Header & Nav */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
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
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="relative dropdown-container z-[40]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'mCourse' ? null : 'mCourse')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{manualData.course || "Select Course"}</span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  {openDropdown === 'mCourse' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                      {courseList.map(c => <button key={c} type="button" onClick={() => handleManualCustomSelect('course', c)} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{c}</button>)}
                    </div>
                  )}
                </div>

                <div className="relative dropdown-container z-[30]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Branch</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'mBranch' ? null : 'mBranch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{manualData.branch || "Select Branch"}</span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  {openDropdown === 'mBranch' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                      {branchList.map(b => <button key={b} type="button" onClick={() => handleManualCustomSelect('branch', b)} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{b}</button>)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Enrollment / Registration No.</label>
                  <div className="relative h-[50px]">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="e.g. ENR12345" className="w-full pl-11 pr-4 h-full bg-slate-50 rounded-[10px] font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Paid Amount</label>
                  <div className="relative h-[50px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input type="number" placeholder="0.00" className="w-full pl-11 pr-4 h-full bg-slate-50 rounded-[10px] font-black text-slate-900 outline-none focus:ring-2 focus:ring-[#FF6900]/20" />
                  </div>
                </div>

                <div className="relative dropdown-container z-[20]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fee Month</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'mMonth' ? null : 'mMonth')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{manualData.month || "Select Month"}</span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  {openDropdown === 'mMonth' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 max-h-48 overflow-y-auto">
                      {months.map(m => <button key={m} type="button" onClick={() => handleManualCustomSelect('month', m)} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{m}</button>)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Date</label>
                  <div className="relative h-[50px]">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" className="w-full pl-11 pr-4 h-full bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative dropdown-container z-[40]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Course</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'bCourse' ? null : 'bCourse')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{bulkConfig.course || "Select Course"}</span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  {openDropdown === 'bCourse' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                      {courseList.map(c => <button key={c} type="button" onClick={() => handleBulkCustomSelect('course', c)} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{c}</button>)}
                    </div>
                  )}
                </div>
                <div className="relative dropdown-container z-[30]">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Branch</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'bBranch' ? null : 'bBranch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{bulkConfig.branch || "Select Branch"}</span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  {openDropdown === 'bBranch' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                      {branchList.map(b => <button key={b} type="button" onClick={() => handleBulkCustomSelect('branch', b)} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{b}</button>)}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {!selectedFile ? (
                    <label className="border-2 border-dashed border-slate-300 rounded-[10px] bg-slate-50 hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group shadow-sm">
                      <div className="p-4 bg-white border border-slate-200 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm text-slate-400 group-hover:text-[#FF6900]">
                        <UploadCloud size={32} />
                      </div>
                      <p className="text-slate-800 font-bold mb-1">Upload Fee Structure Spreadsheet</p>
                      <p className="text-slate-500 text-xs mb-4">Supports .xlsx or .xls format</p>
                      <input type="file" className="hidden" accept=".xlsx" onChange={handleFileChange} />
                      <div className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-[8px] font-bold text-sm shadow-sm group-hover:bg-[#FF6900] group-hover:text-white transition-colors">Browse Files</div>
                    </label>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-[10px] p-8 flex flex-col items-center justify-center relative">
                      <button onClick={() => setSelectedFile(null)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-white rounded-full transition-all"><X size={20}/></button>
                      <FileCheck size={48} className="text-emerald-500 mb-4" />
                      <p className="text-emerald-900 font-black text-lg">{selectedFile.name}</p>
                      <div className="mt-4 flex gap-4">
                        <button onClick={() => setIsProcessed(true)} className="bg-emerald-600 text-white px-6 py-2 rounded-[8px] font-bold shadow-md flex items-center gap-2 hover:bg-emerald-700 transition-all"><Eye size={16}/> Review Data</button>
                        <button onClick={() => setSelectedFile(null)} className="bg-white text-slate-600 border border-slate-200 px-6 py-2 rounded-[8px] font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"><RefreshCcw size={16}/> Re-upload</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1 bg-slate-50 border border-slate-200 rounded-[10px] p-6 h-full flex flex-col min-h-[300px]">
                  {!isProcessed ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                      <PieChart size={32} className="text-slate-400 mb-2" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Analysis Pending</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-[#FF6900]" /> Status Overview
                      </h4>
                      <div className="space-y-4 flex-1">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-500">TOTAL DATA</span>
                          <span className="text-slate-800 bg-white px-2 py-1 rounded border">150</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-emerald-600">ACCEPTED</span>
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded border border-emerald-200">142</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-red-600">REJECTED</span>
                          <span className="text-red-700 bg-red-100 px-2 py-1 rounded border border-red-200">08</span>
                        </div>
                        <div className="p-3 bg-red-50 rounded-[8px] border border-red-100">
                          <p className="text-[10px] font-black text-red-700 uppercase mb-2">Error Logs:</p>
                          <p className="text-[10px] text-red-500 italic mb-1">• Row 14: Month field empty</p>
                          <p className="text-[10px] text-red-500 italic">• Row 102: Amount invalid format</p>
                        </div>
                      </div>
                      <button onClick={handleBulkAction} className={`w-full mt-6 text-white py-3 rounded-[10px] font-black uppercase text-xs tracking-widest shadow-lg shadow-orange-100 transition-all ${bulkStatus === 'idle' ? 'bg-slate-900' : 'bg-[#FF6900] animate-pulse'}`}>
                        {bulkStatus === 'idle' ? 'Finalize & Review' : 'Confirm & Submit'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Fee Collection History</h3>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by month..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium" />
        </div>
      </div>

      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
              <th className="py-4 px-6 w-16 text-center">SNo</th>
              <th className="py-4 px-6">Student Count</th>
              <th className="py-4 px-6">Total Fees Amount</th>
              <th className="py-4 px-6">Month Name</th>
              <th className="py-4 px-6">Entry Date</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-500 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1 rounded-[10px] border border-slate-200">{item.studentCount}</span>
                </td>
                <td className="py-4 px-6 text-sm font-black text-[#FF6900]">₹ {Number(item.totalFeesAmount).toLocaleString('en-IN')}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-800">{item.monthName}</td>
                <td className="py-4 px-6 text-xs font-bold text-slate-400 font-mono">{item.entryDate}</td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-all outline-none opacity-0 group-hover:opacity-100">
                    <MoreVertical size={18} />
                  </button>
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
          <div className="relative inline-flex items-center dropdown-container">
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none">
              {[5, 10, 15, 20].map(num => (<option key={num} value={num}>{num}</option>))}
            </select>
            <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
          <div className="flex items-center">
            <div className="relative inline-flex items-center mr-2">
              <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 bg-white font-bold cursor-pointer text-[#FF6900]">
                {Array.from({ length: totalPages || 1 }).map((_, i) => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}
              </select>
              <ChevronDown className="absolute right-2 text-[#FF6900] pointer-events-none" size={14} />
            </div>
            <span>of {totalPages} pages</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#FF6900] disabled:opacity-30 transition-all"><ChevronLeft size={16} /></button>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#FF6900] disabled:opacity-30 transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentFeesUpload;