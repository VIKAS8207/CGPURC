import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, Search, ChevronRight, ArrowLeft, ChevronDown,
  Wallet, IndianRupee, FileSpreadsheet, Trash2,
  CheckCircle2, AlertCircle, Clock, FileText, User, Eye,
  MoreVertical, ShieldCheck, X, ChevronLeft, Download, PieChart, 
  FileCheck, AlertTriangle 
} from 'lucide-react';

const UserUploads = () => {
  const navigate = useNavigate();
  
  // --- ROBUST FILE TRIGGER REF ---
  const fileInputRef = useRef(null);

  // --- UI CONTROLS ---
  const [selectedModule, setSelectedModule] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('idle');

  // --- FORM STRUCTURAL STATES ---
  const [configFields, setConfigFields] = useState({ course: '', branch: '' });

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isItemsPerPgOpen, setIsItemsPerPgOpen] = useState(false);
  const [isPageSelectOpen, setIsPageSelectOpen] = useState(false);

  const uploadModules = [
    { id: 'course-fee', title: "Course & Fee Structure", icon: Wallet, desc: "Upload annual course lists and approved fee breakdown", templateFile: "Course_Fee_Template.xlsx" },
    { id: 'fee-data', title: "Upload Fee Data", icon: IndianRupee, desc: "Upload periodic student collection datasets", templateFile: "Student_Fees_Collection_Template.xlsx" }
  ];

  const courses = ["B.Tech", "MBA", "B.Sc", "BCA"];
  const branches = ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Finance"];

  const [queueHistory, setQueueHistory] = useState([
    {
      id: 1,
      user: "Amit Sharma",
      module: "Course & Fee Structure",
      course: "B.Tech",
      branch: "Computer Science",
      fileName: "annual_fees_v1.xlsx",
      entryDate: "12 Oct 2024",
      totalLines: 145,
      correctLines: 142,
      errorLines: 3,
      status: "Completed",
      errorReportFile: "rejected_rows_annual_fees.xlsx"
    },
    {
      id: 2,
      user: "Rahul Verma",
      module: "Upload Fee Data",
      course: "MBA",
      branch: "Finance",
      fileName: "feb_mba_batch.xlsx",
      entryDate: "14 Oct 2024",
      totalLines: 60,
      correctLines: 60,
      errorLines: 0,
      status: "Processing",
      errorReportFile: null
    },
    {
      id: 3,
      user: "Priya Patel",
      module: "Upload Fee Data",
      course: "BCA",
      branch: "Cloud Computing",
      fileName: "bca_lateral_entry.xlsx",
      entryDate: "01 Nov 2024",
      totalLines: 88,
      correctLines: 82,
      errorLines: 6,
      status: "In Queue",
      errorReportFile: "rejected_rows_bca_lateral.xlsx"
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
        setOpenDropdown(null);
        setIsItemsPerPgOpen(false);
        setIsPageSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- PROGRAMMATIC FILE UPLOAD TRIGGER ---
  const handleBrowseClick = (e) => {
    if (e) e.stopPropagation(); // Prevent duplicate events
    if (!selectedModule || !configFields.course || !configFields.branch) {
      alert("Action Blocked: Please complete Step 1 (Operation), Step 2 (Course), and Step 3 (Branch) before uploading a file.");
      return;
    }
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!selectedModule || !configFields.course || !configFields.branch) {
      alert("Action Blocked: Please complete Step 1 (Operation), Step 2 (Course), and Step 3 (Branch) before dropping a file.");
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setIsProcessed(false);
      setReviewStatus('idle');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsProcessed(false);
      setReviewStatus('idle');
    }
  };

  const handleConfigSelect = (name, value) => {
    setConfigFields({ ...configFields, [name]: value });
    setOpenDropdown(null);
  };

  const handleInjectToQueue = (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedModule || !configFields.course || !configFields.branch) return;

    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newTransaction = {
      id: queueHistory.length + 1,
      user: "Vikas Vishwakarma", 
      module: selectedModule.title,
      course: configFields.course,
      branch: configFields.branch,
      fileName: selectedFile.name,
      entryDate: formattedDate,
      totalLines: 150,
      correctLines: 146,
      errorLines: 4,
      status: "In Queue",
      errorReportFile: "error_report_" + selectedFile.name
    };

    setQueueHistory([newTransaction, ...queueHistory]);
    setSelectedFile(null);
    setIsProcessed(false);
    setReviewStatus('idle');
    setConfigFields({ course: '', branch: '' });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleDeleteQueueRecord = (id) => {
    setQueueHistory(queueHistory.filter(item => item.id !== id));
    setOpenDropdown(null);
  };

  const filteredHistory = queueHistory.filter(item => 
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRecords = filteredHistory.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQueueItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative font-sans text-left">
      
      {/* NOTIFICATION TOAST OVERLAY */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Upload Process Transmitted</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">The file has been safely validated and dispatched to the processing queue.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* METADATA VIEW MODAL OVERLAY */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Queue Instance Analysis</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 truncate max-w-[320px]" title={viewModalData.fileName}>
                    {viewModalData.fileName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">Staged Date: {viewModalData.entryDate}</p>
                </div>
                <div className="shrink-0 text-[#FF6900]">
                  <div className="w-14 h-14 rounded-[10px] bg-[#FF6900]/10 flex items-center justify-center border border-[#FF6900]/20 shadow-sm">
                    <FileSpreadsheet size={28} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Triggered</p>
                  <p className="font-bold text-slate-800 text-sm">{viewModalData.user}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Action Configuration</p>
                  <p className="font-bold text-slate-800 text-xs truncate">{viewModalData.course} - {viewModalData.branch}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-[10px] border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Correct Lines</p>
                  <p className="text-lg font-black text-emerald-700">{viewModalData.correctLines}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-[10px] border border-red-100">
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Error Lines</p>
                  <p className="text-lg font-black text-red-700">{viewModalData.errorLines}</p>
                </div>
              </div>

              {viewModalData.errorLines > 0 && viewModalData.errorReportFile && (
                <div className="mt-4 p-4 bg-red-50/50 border border-dashed border-red-200 rounded-[10px] flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <AlertTriangle size={16} className="text-red-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-700 truncate">{viewModalData.errorReportFile}</p>
                  </div>
                  <button className="flex items-center gap-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm transition-all outline-none">
                    <Download size={13} /> Download Report
                  </button>
                </div>
              )}
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-8 py-2.5 text-sm font-bold text-slate-700 bg-white border rounded-[10px] shadow-sm outline-none transition-all hover:bg-slate-50">
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP BREADCRUMB ACTIONS */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Document Uploads</span>
      </div>

      {/* PAGE HEADER SECTION */}
      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <UploadCloud size={24} />
            </div>
            Document Processing Terminal
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Select operational target configuration profiles, ingest data streams, and monitor the queue line pipeline execution layers.</p>
        </div>
      </div>

      {/* MAIN DATA INGESTION CARD */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-8 mb-10 overflow-visible relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDE CONFIG: STEP 1 SCHEMATIC & STEP 2 CRITERIA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              
              {/* OPERATION PROTOCOL SELECTION dropdown */}
              <div className="relative dropdown-container z-50">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 1: Select Operation</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-bold text-slate-800 outline-none h-[48px] focus:ring-2 focus:ring-[#FF6900]/20 border border-slate-200 focus:border-[#FF6900]/50 transition-all text-sm"
                >
                  <div className="flex items-center gap-2 truncate">
                    {selectedModule ? (
                      <>
                        <selectedModule.icon size={16} className="text-[#FF6900]" />
                        <span className="truncate text-xs">{selectedModule.title}</span>
                      </>
                    ) : (
                      <span className="text-slate-400 font-medium text-xs">Choose Operation...</span>
                    )}
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {uploadModules.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            setSelectedModule(mod);
                            setIsDropdownOpen(false);
                            setIsProcessed(false);
                            setReviewStatus('idle');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-orange-50/50 group transition-colors border-b border-slate-50 flex items-start gap-3"
                        >
                          <div className="p-2 bg-slate-50 group-hover:bg-white rounded-lg text-slate-400 group-hover:text-[#FF6900] transition-colors mt-0.5">
                            <Icon size={14} />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-800 group-hover:text-[#FF6900] transition-colors">{mod.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">{mod.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* TARGET COURSE DROPDOWN */}
              <div className="relative dropdown-container z-40">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 2: Target Course</label>
                <button type="button" onClick={() => setOpenDropdown(openDropdown === 'bCourse' ? null : 'bCourse')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] font-bold text-slate-800 outline-none h-[48px] text-xs">
                  <span className={configFields.course ? "text-slate-800" : "text-slate-400 font-medium"}>{configFields.course || "Select Course"}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                {openDropdown === 'bCourse' && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                    {courses.map(c => <button key={c} type="button" onClick={() => handleConfigSelect('course', c)} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-orange-50 text-slate-700">{c}</button>)}
                  </div>
                )}
              </div>

              {/* TARGET BRANCH DROPDOWN */}
              <div className="relative dropdown-container z-30">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 3: Target Branch</label>
                <button type="button" onClick={() => setOpenDropdown(openDropdown === 'bBranch' ? null : 'bBranch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] font-bold text-slate-800 outline-none h-[48px] text-xs">
                  <span className={configFields.branch ? "text-slate-800" : "text-slate-400 font-medium"}>{configFields.branch || "Select Branch"}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                {openDropdown === 'bBranch' && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden">
                    {branches.map(b => <button key={b} type="button" onClick={() => handleConfigSelect('branch', b)} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-orange-50 text-slate-700">{b}</button>)}
                  </div>
                )}
              </div>

            </div>

            {/* DRAG AND DROP CONTAINER WORKSPACE */}
            <div className="space-y-2">
              <div className="flex justify-between items-center h-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Step 4: Transmit Excel Data Layer</label>
                {selectedModule && (
                  <button className="text-xs font-bold text-[#FF6900] hover:text-[#FF6900]/80 transition-colors flex items-center gap-1.5 outline-none bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100 animate-in fade-in duration-200">
                    <Download size={13} /> {selectedModule.templateFile}
                  </button>
                )}
              </div>

              {/* --- CLICKABLE & DRAGGABLE DROPZONE --- */}
              <div
                onClick={() => {
                  if (!selectedFile) handleBrowseClick();
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[10px] transition-all flex flex-col items-center justify-center p-6 text-center min-h-[180px] ${
                  !selectedModule || !configFields.course || !configFields.branch
                    ? 'bg-slate-50/50 border-slate-200 cursor-not-allowed opacity-60' 
                    : isDragging
                    ? 'bg-[#FF6900]/5 border-[#FF6900]'
                    : selectedFile
                    ? 'bg-emerald-50/20 border-emerald-500/30'
                    : 'bg-slate-50 border-slate-200 hover:bg-[#FF6900]/5 hover:border-[#FF6900]/30 cursor-pointer'
                }`}
              >
                {/* HIDDEN PROGRAMMATIC INPUT REF */}
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  accept=".xlsx, .xls" 
                  onChange={handleFileChange} 
                />
                
                {!selectedFile ? (
                  <div className="flex flex-col items-center pointer-events-none">
                    <UploadCloud size={32} className="text-slate-400 mb-2" />
                    <p className="text-slate-800 font-bold text-xs mb-0.5">Drag and drop compilation spreadsheet layouts</p>
                    <p className="text-[11px] text-slate-400 font-medium mb-3">Accepts unified multi-entity layouts up to 20MB</p>
                    
                    <button 
                      type="button" 
                      onClick={handleBrowseClick}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm ${
                        selectedModule && configFields.course && configFields.branch
                          ? 'bg-white border border-slate-200 text-slate-600 hover:bg-[#FF6900] hover:text-white cursor-pointer'
                          : 'bg-slate-100 border-transparent text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Browse Explorer
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-150">
                    <FileCheck size={36} className="text-emerald-500 mb-2" />
                    <p className="text-xs font-bold text-slate-800 truncate max-w-md px-4">{selectedFile.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{(selectedFile.size / 1024).toFixed(1)} KB Ready to Map</p>
                    <div className="flex gap-3 mt-4">
                      <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-bold transition-all outline-none">
                        Clear Target
                      </button>
                      {!isProcessed && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); setIsProcessed(true); setReviewStatus('idle'); }} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold shadow-sm transition-all flex items-center gap-1 outline-none">
                          <Eye size={12}/> Review Data
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE SUMMARY ACTION WIDGET LAYER */}
          <div className="lg:col-span-1 bg-slate-50 border border-slate-200 rounded-[10px] p-5 h-full flex flex-col min-h-[260px]">
            {!isProcessed ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <PieChart size={24} className="text-slate-400 mb-1" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Analysis Staging Pending</p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500 flex flex-col h-full justify-between flex-1">
                <div>
                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1.5 flex items-center gap-1.5"><AlertTriangle size={12} className="text-[#FF6900]" /> Schema Validation Box</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold"><span className="text-slate-400 text-[11px]">TOTAL PARSED</span><span className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">150 Lines</span></div>
                    <div className="flex justify-between items-center text-xs font-bold"><span className="text-emerald-600 text-[11px]">CORRECT LINES</span><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">146 Lines</span></div>
                    <div className="flex justify-between items-center text-xs font-bold"><span className="text-red-600 text-[11px]">ERROR LINES</span><span className="text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-200">04 Lines</span></div>
                  </div>
                  <div className="mt-3 p-2 bg-red-50 rounded border border-red-100 text-[10px] text-red-500 font-medium italic space-y-0.5">
                    <p>• Missing dynamic identifiers on Row 12</p>
                    <p>• Value bounds violation type on Row 74</p>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={(e) => {
                    if (reviewStatus === 'idle') { setReviewStatus('reviewed'); } 
                    else { handleInjectToQueue(e); }
                  }} 
                  className={`w-full mt-4 text-white py-2.5 rounded-[8px] font-bold text-xs tracking-wider uppercase shadow-md transition-all outline-none ${
                    reviewStatus === 'idle' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-[#FF6900] animate-pulse hover:bg-[#FF6900]/90'
                  }`}
                >
                  {reviewStatus === 'idle' ? 'Finalize & Review' : 'Confirm & Upload'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- PIPELINE CONCURRENCY STREAM INTERFACE --- */}
      <div className="bg-white p-5 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center text-left">
        <div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Clock size={18} className="text-slate-400" />
            Live Processing Pipeline Queue
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">Sequential Multi-User File Processing (FIFO Engine execution)</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search operational stream..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 shadow-sm rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all text-xs font-medium text-slate-700" 
          />
        </div>
      </div>

      {/* RENDER SYSTEM CONCURRENCY FIXED GRID LAYOUT WITH BALANCED SPACE GAPS */}
      <div className="bg-white border-x border-slate-200 overflow-hidden overflow-x-auto min-h-[250px]">
       <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
              <th className="py-4 px-6 text-center w-16">SNo</th>
              <th className="py-4 px-6">Operational Type</th>
              <th className="py-4 px-6">File Blueprint</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-center">Error File</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentQueueItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 text-xs font-bold text-slate-500 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-800">{item.module}</td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600">{item.fileName}</td>
                <td className="py-4 px-6 text-xs font-bold text-slate-400">{item.entryDate}</td>
                <td className="py-4 px-6 text-center">
                  {item.errorReportFile ? (
                    <button className="text-[#FF6900] font-bold text-xs flex items-center justify-center gap-1 mx-auto hover:underline">
                      <Download size={14} /> Download
                    </button>
                  ) : <span className="text-slate-300">-</span>}
                </td>
                <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{item.status}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button onClick={() => setViewModalData(item)} className="p-2 text-slate-400 hover:text-[#FF6900]"><Eye size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MATCHED PAGINATION CONTROL BAR --- */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex items-center justify-between font-sans text-sm text-slate-700 select-none">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">Total: {totalRecords}</span>
          <div className="relative dropdown-container ml-2">
            <button
              onClick={() => setIsItemsPerPgOpen(!isItemsPerPgOpen)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-xs font-semibold outline-none min-w-[64px]"
            >
              <span>{itemsPerPage}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {isItemsPerPgOpen && (
              <div className="absolute bottom-[calc(100%+4px)] left-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden w-16">
                {[5, 10, 20, 50].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setItemsPerPage(num);
                      setCurrentPage(1);
                      setIsItemsPerPgOpen(false);
                    }}
                    className={`w-full text-center py-1.5 text-xs font-semibold hover:bg-orange-50 hover:text-[#FF6900] transition-colors ${itemsPerPage === num ? 'bg-orange-50/60 text-[#FF6900]' : ''}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-slate-500 text-xs font-medium ml-1">items per page</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsPageSelectOpen(!isPageSelectOpen)}
                className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-xs font-semibold outline-none min-w-[56px]"
              >
                <span>{currentPage}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {isPageSelectOpen && (
                <div className="absolute bottom-[calc(100%+4px)] right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden max-h-32 overflow-y-auto w-16">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        setIsPageSelectOpen(false);
                      }}
                      className={`w-full text-center py-1.5 text-xs font-semibold hover:bg-orange-50 hover:text-[#FF6900] transition-colors ${currentPage === page ? 'bg-orange-50/60 text-[#FF6900]' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-slate-500 text-xs font-medium">of {totalPages} pages</span>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="p-2 border border-slate-200/80 bg-white rounded-lg text-slate-400 hover:text-[#FF6900] hover:border-slate-300 disabled:opacity-40 outline-none"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="p-2 border border-slate-200/80 bg-white rounded-lg text-slate-400 hover:text-[#FF6900] hover:border-slate-300 disabled:opacity-40 outline-none"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserUploads;