import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Wallet, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, BookOpen, Search, Eye, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ChevronDown, AlertTriangle,
  CheckCircle2, X, Plus, PieChart, Layers, Check, Calculator,
  ShieldCheck, MoreVertical, IndianRupee, FileCheck, RefreshCcw,
  User, Calendar
} from 'lucide-react';

const CourseFeeUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- UI STATES ---
  const [uploadMode, setUploadMode] = useState('manual');
  const [isProcessed, setIsProcessed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // --- FORM STATES ---
  const [manualForm, setManualForm] = useState({
    course: '',
    branch: '',
    examFee: '',
    otherFee: '',
    totalCourseFee: '',
    semesterFee: '' 
  });

  // Dynamic Semesters State (Up to 8)
  const [semesters, setSemesters] = useState([{ id: 1, amount: '' }]);

  // Mock Data
  const courseList = ["B.Tech", "M.Tech", "MBA", "BCA", "B.Sc"];
  const branchList = ["Computer Science", "Mechanical", "Civil", "Electrical", "Finance", "Marketing", "General", "Data Science"];

  const [history, setHistory] = useState([
    { 
      id: 1, 
      type: 'Bulk',
      course: 'B.Tech', 
      branch: 'Computer Science', 
      totalFee: 450000, 
      date: '15 Apr 2026',
      academicYear: '2025-2026',
      fileName: 'btech_fees_v1.xlsx',
      totalRecords: 150,
      accepted: 142,
      rejected: 8,
      semesters: []
    },
    { 
      id: 2, 
      type: 'Manual',
      course: 'MBA', 
      branch: 'Finance', 
      totalFee: 320000, 
      date: '14 Apr 2026',
      academicYear: '2025-2026',
      studentName: 'Vikas Vishwakarma',
      regNumber: 'ADM-2026-04',
      totalRecords: 1,
      accepted: 1,
      rejected: 0,
      semesters: [
        { id: 1, amount: 160000 },
        { id: 2, amount: 160000 }
      ]
    },
    { 
      id: 3, 
      type: 'Manual',
      course: 'BCA', 
      branch: 'General', 
      totalFee: 150000, 
      date: '12 Apr 2026',
      academicYear: '2025-2026',
      studentName: 'Anjali Sharma',
      regNumber: 'ADM-2026-11',
      totalRecords: 1,
      accepted: 1,
      rejected: 0,
      semesters: [
        { id: 1, amount: 25000 }, { id: 2, amount: 25000 }, { id: 3, amount: 25000 }, 
        { id: 4, amount: 25000 }, { id: 5, amount: 25000 }, { id: 6, amount: 25000 }
      ]
    },
    { 
      id: 4, 
      type: 'Bulk',
      course: 'M.Tech', 
      branch: 'Mechanical', 
      totalFee: 200000, 
      date: '10 Apr 2026',
      academicYear: '2025-2026',
      fileName: 'mtech_mech_fees.xlsx',
      totalRecords: 45,
      accepted: 45,
      rejected: 0,
      semesters: []
    },
    { 
      id: 5, 
      type: 'Bulk',
      course: 'B.Sc', 
      branch: 'Physics', 
      totalFee: 90000, 
      date: '08 Apr 2026',
      academicYear: '2025-2026',
      fileName: 'bsc_physics_batch.xlsx',
      totalRecords: 120,
      accepted: 115,
      rejected: 5,
      semesters: []
    },
    { 
      id: 6, 
      type: 'Manual',
      course: 'B.Tech', 
      branch: 'Civil', 
      totalFee: 400000, 
      date: '05 Apr 2026',
      academicYear: '2025-2026',
      studentName: 'Rohan Gupta',
      regNumber: 'ADM-2026-88',
      totalRecords: 1,
      accepted: 1,
      rejected: 0,
      semesters: [
        { id: 1, amount: 50000 }, { id: 2, amount: 50000 }, { id: 3, amount: 50000 }, { id: 4, amount: 50000 },
        { id: 5, amount: 50000 }, { id: 6, amount: 50000 }, { id: 7, amount: 50000 }, { id: 8, amount: 50000 }
      ]
    },
    { 
      id: 7, 
      type: 'Manual',
      course: 'MBA', 
      branch: 'Marketing', 
      totalFee: 310000, 
      date: '02 Apr 2026',
      academicYear: '2025-2026',
      studentName: 'Priya Singh',
      regNumber: 'ADM-2026-102',
      totalRecords: 1,
      accepted: 1,
      rejected: 0,
      semesters: [
        { id: 1, amount: 155000 },
        { id: 2, amount: 155000 }
      ]
    },
    { 
      id: 8, 
      type: 'Bulk',
      course: 'BCA', 
      branch: 'Data Science', 
      totalFee: 180000, 
      date: '28 Mar 2026',
      academicYear: '2025-2026',
      fileName: 'bca_ds_fees.xlsx',
      totalRecords: 60,
      accepted: 60,
      rejected: 0,
      semesters: []
    },
  ]);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 to demonstrate pagination

  const totalPages = Math.ceil(history.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsProcessed(false);
    }
  };

  const handleEditSave = () => {
    if (editModalData) {
      setHistory(history.map(r => r.id === editModalData.id ? editModalData : r));
      setEditModalData(null);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative font-sans">
      
      {/* NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Structure Finalized</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">The fee configuration has been saved successfully.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 outline-none"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* VIEW MODAL POPUP */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Fee Config Overview</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 text-left max-h-[70vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-black text-[#FF6900] tracking-tight">₹ {viewModalData.totalFee.toLocaleString('en-IN')}</h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-[10px] border border-slate-200">
                    {viewModalData.course} • {viewModalData.branch}
                  </div>
                </div>
                <div className="shrink-0 text-[#FF6900]">
                  <div className="w-16 h-16 rounded-[10px] bg-[#FF6900]/10 flex items-center justify-center border border-[#FF6900]/20 shadow-sm">
                    <Wallet size={32} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source Type</p>
                  <p className="font-bold text-slate-800">{viewModalData.type} Entry</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Upload Date</p>
                  <p className="font-bold text-slate-800">{viewModalData.date}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-[10px] border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Mapped Records</p>
                  <p className="text-xl font-black text-emerald-700">{viewModalData.accepted}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-[10px] border border-red-100">
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Errors Found</p>
                  <p className="text-xl font-black text-red-700">{viewModalData.rejected}</p>
                </div>
              </div>

              {/* Added Semester Breakdown in View */}
              {viewModalData.type === 'Manual' && viewModalData.semesters && viewModalData.semesters.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Semester Breakdown</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {viewModalData.semesters.map(sem => (
                      <div key={sem.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2.5 rounded-[8px]">
                        <span className="text-xs font-bold text-slate-500">Semester {sem.id}</span>
                        <span className="text-sm font-bold text-slate-800">₹{Number(sem.amount).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] rounded-[10px] transition-all shadow-md hover:shadow-orange-200 outline-none">
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL POPUP */}
      {editModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Fee Configuration</h2>
              <button onClick={() => setEditModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 text-left max-h-[60vh] overflow-y-auto">
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-[10px] border border-slate-200 mb-2">
                  {editModalData.course} • {editModalData.branch}
                </div>
                <p className="text-xs text-slate-500">Update the amounts below. Total will calculate automatically.</p>
              </div>

              {editModalData.type === 'Manual' ? (
                <div className="space-y-4">
                  {editModalData.semesters.map((sem) => (
                    <div key={sem.id} className="relative">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Semester {sem.id} Amount</label>
                      <div className="relative">
                        <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          value={sem.amount}
                          onChange={(e) => {
                            const updatedData = { ...editModalData };
                            const semIndex = updatedData.semesters.findIndex(s => s.id === sem.id);
                            updatedData.semesters[semIndex].amount = e.target.value;
                            // Auto recalculate total
                            updatedData.totalFee = updatedData.semesters.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
                            setEditModalData(updatedData);
                          }}
                          className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[8px] text-sm font-bold text-slate-800 outline-none focus:border-[#FF6900] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-[#FF6900]/5 border border-[#FF6900]/20 rounded-[10px] flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">Updated Total Fee</span>
                    <span className="text-lg font-black text-[#FF6900]">₹ {editModalData.totalFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-[10px] bg-slate-50">
                  <AlertTriangle size={32} className="mx-auto text-amber-500 mb-3" />
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Bulk Records Cannot Be Edited Here</h3>
                  <p className="text-xs text-slate-500">Please re-upload the corrected excel sheet to modify bulk data entries.</p>
                </div>
              )}
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setEditModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-[10px] hover:bg-slate-100 transition-all outline-none">
                Cancel
              </button>
              {editModalData.type === 'Manual' && (
                <button onClick={handleEditSave} className="px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] rounded-[10px] transition-all shadow-md hover:shadow-orange-200 outline-none">
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm mb-10 overflow-visible relative">
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-3">
          <button onClick={() => setUploadMode('manual')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${uploadMode === 'manual' ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-[10px]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <UserPlus size={18} /> Manual Structure
          </button>
          <button onClick={() => setUploadMode('bulk')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${uploadMode === 'bulk' ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-[10px]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            <FileSpreadsheet size={18} /> Bulk Excel Upload
          </button>
        </div>

        <div className="p-8">
          {uploadMode === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-left-4 duration-300 text-left">
              
              {/* Top Row: Course & Branch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative dropdown-container">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'course' ? null : 'course')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-transparent focus:border-slate-200 focus:bg-white rounded-[10px] font-medium text-slate-800 outline-none h-[50px] transition-all">
                    <span>{manualForm.course || "Choose Degree..."}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'course' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Course Dropdown Menu */}
                  {openDropdown === 'course' && (
                    <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white border border-slate-100 rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 py-1">
                      {courseList.map((course) => (
                        <button
                          key={course}
                          type="button"
                          onClick={() => {
                            setManualForm({ ...manualForm, course });
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors outline-none"
                        >
                          {course}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative dropdown-container">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Branch</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'branch' ? null : 'branch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-transparent focus:border-slate-200 focus:bg-white rounded-[10px] font-medium text-slate-800 outline-none h-[50px] transition-all">
                    <span>{manualForm.branch || "Choose Branch..."}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'branch' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Branch Dropdown Menu */}
                  {openDropdown === 'branch' && (
                    <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white border border-slate-100 rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 py-1">
                      {branchList.map((branch) => (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => {
                            setManualForm({ ...manualForm, branch });
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors outline-none"
                        >
                          {branch}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Semesters Input Grid */}
              <div className="mb-8 pb-8 border-b border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {semesters.map((sem) => (
                    <div key={sem.id} className="relative">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Semester {sem.id} Amount</label>
                      <div className="relative">
                        <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={sem.amount}
                          onChange={(e) => {
                            const newSems = [...semesters];
                            newSems[sem.id - 1].amount = e.target.value;
                            setSemesters(newSems);
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent focus:border-slate-200 rounded-[10px] font-medium text-slate-800 outline-none h-[50px] transition-all focus:bg-white focus:shadow-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Add Semester Button (Hidden after 8 semesters) */}
                {semesters.length < 8 && (
                  <button
                    type="button"
                    onClick={() => setSemesters([...semesters, { id: semesters.length + 1, amount: '' }])}
                    className="mt-6 flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#FF6900] bg-[#FF6900]/10 hover:bg-[#FF6900]/20 rounded-[10px] transition-colors outline-none"
                  >
                    <Plus size={16} /> Add Semester {semesters.length + 1}
                  </button>
                )}
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-10 py-3.5 rounded-[10px] font-bold shadow-md hover:shadow-lg transition-all">Submit Fee Structure</button>
              </div>
            </form>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300 text-left">
               <label className="border-2 border-dashed border-slate-300 rounded-[10px] bg-slate-50 hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group shadow-sm min-h-[250px]">
                <UploadCloud size={32} className="text-slate-400 group-hover:text-[#FF6900] mb-4" />
                <p className="text-slate-800 font-bold mb-1">Browse student spreadsheet</p>
                <input type="file" className="hidden" accept=".xlsx" onChange={handleFileChange} />
                <div className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-[8px] font-bold text-sm group-hover:bg-[#FF6900] group-hover:text-white transition-colors">Browse Files</div>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* History Table Toolbar */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 text-left">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Existing Fee Configurations</h3>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search structures..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] outline-none text-sm font-medium" />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px] text-left">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Target details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Entity Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Semester/Year Amount</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Records</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Config Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((record, index) => (
              <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border uppercase tracking-wider ${
                    record.type === 'Bulk' ? 'bg-[#FF6900]/10 text-[#FF6900] border-[#FF6900]/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800 text-sm">{record.course} - {record.branch}</div>
                  <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mt-1 text-[#FF6900]">
                      ₹ {record.totalFee.toLocaleString('en-IN')} Package
                  </div>
                </td>
                <td className="py-4 px-6">
                  {record.type === 'Bulk' ? (
                    <div className="flex items-center gap-2 max-w-[150px]">
                      <FileSpreadsheet size={16} className="text-emerald-600 shrink-0" />
                      <p className="text-sm font-bold text-slate-700 truncate">{record.fileName}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 max-w-[150px]">
                      <User size={16} className="text-blue-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-700 truncate">{record.studentName}</p>
                        <p className="text-xs font-medium text-slate-500 truncate">{record.regNumber}</p>
                      </div>
                    </div>
                  )}
                </td>
                
                {/* NEW SEMESTER / YEAR WISE AMOUNT COLUMN */}
                <td className="py-4 px-6">
                  {record.type === 'Bulk' ? (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-[8px] border border-slate-100 italic">
                      Bulk upload (Data too large to display)
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                      {record.semesters?.map(sem => (
                        <span key={sem.id} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-[8px] border border-slate-200">
                          Sem {sem.id}: ₹{Number(sem.amount).toLocaleString('en-IN')}
                        </span>
                      ))}
                    </div>
                  )}
                </td>

                <td className="py-4 px-6">
                  {record.type === 'Bulk' ? (
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[10px] border border-slate-200 w-full text-center">Tot: {record.totalRecords}</span>
                        <div className="flex gap-1 w-full">
                           <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 flex-1 text-center">✓ {record.accepted}</span>
                           <span className={`text-[10px] font-bold flex-1 text-center px-1 py-0.5 rounded border ${record.rejected > 0 ? 'text-red-700 bg-red-50 border-red-200' : 'text-slate-400 bg-slate-50 border-slate-100'}`}>
                             ✗ {record.rejected}
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
                <td className="py-4 px-6 text-slate-600 text-sm font-medium">{record.date}</td>
                <td className="py-4 px-6 text-right relative dropdown-container text-right">
                  <button onClick={() => setOpenDropdown(openDropdown === `action-${record.id}` ? null : `action-${record.id}`)} className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-all outline-none opacity-0 group-hover:opacity-100">
                    <MoreVertical size={18} />
                  </button>
                  {openDropdown === `action-${record.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                      <button 
                        onClick={() => { setViewModalData(record); setOpenDropdown(null); }} 
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button 
                        onClick={() => { setEditModalData(JSON.parse(JSON.stringify(record))); setOpenDropdown(null); }} 
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Edit2 size={16} /> Edit
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

      {/* NEW EDUNUT UI PAGINATION FOOTER */}
      <div className="px-6 py-4 border-t border-slate-100 bg-white rounded-b-[10px] flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Rows per page:</span>
          <select 
            value={itemsPerPage} 
            onChange={handleRowsChange}
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-1.5 outline-none shadow-sm transition-all font-medium cursor-pointer hover:border-slate-300"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="text-sm text-slate-500 font-medium text-center">
          Showing <span className="font-semibold text-slate-700">{history.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, history.length)}</span> of <span className="font-semibold text-slate-700">{history.length}</span> entries
        </div>
        
        <div className="flex items-center justify-between lg:justify-end gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
            
            <div className="relative flex items-center group">
              <select 
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                disabled={history.length === 0}
                className="w-[4.5rem] bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block py-1.5 pl-3 pr-7 outline-none shadow-sm transition-all font-semibold cursor-pointer hover:border-orange-300 hover:bg-orange-50/50 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {totalPages > 0 ? (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <option key={page} value={page}>
                      {page}
                    </option>
                  ))
                ) : (
                  <option value={1}>1</option>
                )}
              </select>
              <div className="absolute right-2.5 pointer-events-none text-slate-400 group-hover:text-orange-500 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1 || history.length === 0}
              className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                currentPage === 1 || history.length === 0 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center whitespace-nowrap">
              <span className="font-bold text-slate-800">{history.length === 0 ? 0 : currentPage}</span> / {totalPages}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || history.length === 0}
              className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                currentPage === totalPages || history.length === 0 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFeeUpload;