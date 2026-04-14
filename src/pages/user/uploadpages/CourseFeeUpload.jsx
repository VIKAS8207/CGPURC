import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Wallet, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, BookOpen, Search, Eye, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ChevronDown, AlertTriangle,
  CheckCircle2, X, Plus, PieChart, Layers, Check, Calculator,
  ShieldCheck, MoreVertical, IndianRupee, FileCheck, RefreshCcw
} from 'lucide-react';

const CourseFeeUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- UI STATES ---
  const [uploadMode, setUploadMode] = useState('manual'); // Manual as default
  const [isProcessed, setIsProcessed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // --- FORM STATES ---
  const [manualForm, setManualForm] = useState({
    course: '',
    branch: '',
    examFee: '',
    otherFee: '',
    totalCourseFee: '',
    semesterFee: '' // Single field for all semesters
  });

  // Mock Data
  const courseList = ["B.Tech", "M.Tech", "MBA", "BCA", "B.Sc"];
  const branchList = ["Computer Science", "Mechanical", "Civil", "Electrical"];

  // Mock History
  const [history, setHistory] = useState([
    { id: 1, course: 'B.Tech', branch: 'Computer Science', totalFee: 450000, date: '15 Apr 2026' },
    { id: 2, course: 'MBA', branch: 'Finance', totalFee: 320000, date: '14 Apr 2026' },
  ]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- HANDLERS ---
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

      {/* Nav */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <Wallet size={24} />
            </div>
            Course Fee Structure
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Define breakdown and total package for academic programs.</p>
        </div>
      </div>

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
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-left-4 duration-300">
              {/* Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-100">
                <div className="relative dropdown-container">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'course' ? null : 'course')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{manualForm.course || "Choose Degree..."}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'course' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'course' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100">
                      {courseList.map(c => <button key={c} type="button" onClick={() => {setManualForm({...manualForm, course: c}); setOpenDropdown(null);}} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{c}</button>)}
                    </div>
                  )}
                </div>

                <div className="relative dropdown-container">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Branch</label>
                  <button type="button" onClick={() => setOpenDropdown(openDropdown === 'branch' ? null : 'branch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                    <span>{manualForm.branch || "Choose Branch..."}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'branch' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'branch' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100">
                      {branchList.map(b => <button key={b} type="button" onClick={() => {setManualForm({...manualForm, branch: b}); setOpenDropdown(null);}} className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-[#FF6900]">{b}</button>)}
                    </div>
                  )}
                </div>
              </div>

              {/* Single Semester Fee Field */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers size={18} className="text-[#FF6900]"/> Fee Details
                </h3>
                <div className="max-w-md">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Semester Fee (Applied to all semesters)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={manualForm.semesterFee}
                      onChange={(e) => setManualForm({...manualForm, semesterFee: e.target.value})}
                      className="w-full pl-9 pr-4 py-3 bg-slate-50 border-none rounded-[10px] font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all h-[50px]" 
                    />
                  </div>
                </div>
              </div>

              {/* Other Fees */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-8 border-t border-slate-100">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Examination Fee (Annual)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input type="number" placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-[10px] font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20 h-[50px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Other Fees (Library/Admin)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input type="number" placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-[10px] font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20 h-[50px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Yearly Package</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input type="number" placeholder="Calculated Total" className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-[10px] font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20 h-[50px]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-10 py-3.5 rounded-[10px] font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 outline-none">
                  <Check size={18} /> Submit Fee Structure
                </button>
              </div>
            </form>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative dropdown-container">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Course Target</label>
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === 'bCourse' ? null : 'bCourse')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
                        <span>{manualForm.course || "Select Course"}</span>
                        <ChevronDown size={16} className="text-slate-400" />
                      </button>
                    </div>
                  </div>

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
                          <p className="text-[10px] text-red-500 italic mb-1">• Row 14: Semester amount empty</p>
                          <p className="text-[10px] text-red-500 italic">• Row 89: Invalid branch mapping</p>
                        </div>
                      </div>
                      <button onClick={() => {setShowNotification(true); setTimeout(()=>setShowNotification(false), 3000)}} className="w-full mt-6 bg-[#FF6900] text-white py-3 rounded-[10px] font-black uppercase text-xs tracking-widest shadow-lg shadow-orange-100 animate-pulse">Finalize & Submit</button>
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
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Existing Fee Configurations</h3>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search structures..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400" />
        </div>
      </div>

      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Package</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Branch Mapping</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Config Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-400 text-center">{idx + 1}</td>
                <td className="py-4 px-6 font-black text-[#FF6900] text-sm italic">₹ {item.totalFee.toLocaleString('en-IN')}</td>
                <td className="py-4 px-6 font-bold text-slate-800 text-sm">{item.course}</td>
                <td className="py-4 px-6 font-medium text-slate-500 text-xs">{item.branch}</td>
                <td className="py-4 px-6 text-xs font-bold text-slate-400">{item.date}</td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button onClick={() => setOpenDropdown(openDropdown === `action-${item.id}` ? null : `action-${item.id}`)} className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-all outline-none opacity-0 group-hover:opacity-100">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination Footer (Edunut) */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-bold mr-3">Total: {history.length}</span>
          <div className="relative inline-flex items-center dropdown-container">
            <select className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none">
              <option>10</option><option>20</option><option>50</option>
            </select>
            <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
          </div>
          <span className="ml-3 font-medium text-[10px] uppercase tracking-widest text-slate-400 font-black">per page</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600 font-black uppercase text-[10px] tracking-widest">
          <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center">
              <select className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-white font-bold cursor-pointer text-[#FF6900] outline-none">
                <option>1</option>
              </select>
              <ChevronDown className="absolute right-2 text-[#FF6900] pointer-events-none" size={14} />
            </div>
            <span>of 1 pages</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button disabled className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 opacity-30 transition-all outline-none"><ChevronLeft size={16} /></button>
            <button disabled className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 opacity-30 transition-all outline-none"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CourseFeeUpload;