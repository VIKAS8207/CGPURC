import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, Search, ChevronRight, ArrowLeft, ChevronDown,
  Wallet, IndianRupee, FileSpreadsheet, Trash2,
  CheckCircle2, AlertCircle, Clock, FileText, User, Eye,
  MoreVertical, ShieldCheck, X, ChevronLeft
} from 'lucide-react';

const UserUploads = () => {
  const navigate = useNavigate();

  // --- UI CONTROLS ---
  const [selectedModule, setSelectedModule] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);

  // --- PAGINATION STATES (MATCHING SCREENSHOT MECHANICS) ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isItemsPerPgOpen, setIsItemsPerPgOpen] = useState(false);
  const [isPageSelectOpen, setIsPageSelectOpen] = useState(false);

  const uploadModules = [
    { id: 'course-fee', title: "Course & Fee Structure", icon: Wallet, desc: "Upload annual course lists and approved fee breakdown" },
    { id: 'fee-data', title: "Upload Fee Data", icon: IndianRupee, desc: "Upload periodic student collection datasets" }
  ];

  const [queueHistory, setQueueHistory] = useState([
    {
      id: 1,
      user: "Amit Sharma",
      module: "Course & Fee Structure",
      course: "B.Tech",
      branch: "Computer Science",
      fileName: "annual_fees_v1.xlsx",
      timestamp: "11:14:02 AM",
      entryDate: "5/20/2026 11:14:02 AM",
      status: "Completed"
    },
    {
      id: 2,
      user: "Rahul Verma",
      module: "Upload Fee Data",
      course: "MBA",
      branch: "Finance",
      fileName: "feb_mba_batch.xlsx",
      timestamp: "11:15:45 AM",
      entryDate: "5/20/2026 11:15:45 AM",
      status: "Processing"
    },
    {
      id: 3,
      user: "Priya Patel",
      module: "Upload Fee Data",
      course: "BCA",
      branch: "Cloud Computing",
      fileName: "bca_lateral_entry.xlsx",
      timestamp: "11:18:10 AM",
      entryDate: "5/20/2026 11:18:10 AM",
      status: "In Queue"
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInjectToQueue = (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedModule) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fullDateString = now.toLocaleString('en-US');

    const newTransaction = {
      id: queueHistory.length + 1,
      user: "Vikas Vishwakarma", 
      module: selectedModule.title,
      course: "B.Tech",
      branch: "Computer Science",
      fileName: selectedFile.name,
      timestamp: timeString,
      entryDate: fullDateString,
      status: "In Queue"
    };

    setQueueHistory([newTransaction, ...queueHistory]);
    setSelectedFile(null);
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
              <h3 className="text-sm font-bold text-slate-900">Queue Registration Complete</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">The file has been safely indexed and inserted into the FIFO execution cycle.</p>
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
                  <p className="text-xs font-semibold text-slate-400 mt-1">Staged: {viewModalData.entryDate}</p>
                </div>
                <div className="shrink-0 text-[#FF6900]">
                  <div className="w-14 h-14 rounded-[10px] bg-[#FF6900]/10 flex items-center justify-center border border-[#FF6900]/20 shadow-sm">
                    <FileSpreadsheet size={28} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Triggered By</p>
                  <p className="font-bold text-slate-800 text-sm">{viewModalData.user}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Action</p>
                  <p className="font-bold text-slate-800 text-sm">{viewModalData.module}</p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] rounded-[10px] shadow-md outline-none transition-all hover:shadow-orange-100">
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
          
          {/* PROTOCOL MENU SELECTOR SECTION */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 1: Select Operation</label>
              <div className="relative dropdown-container z-[60]">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-bold text-slate-800 outline-none h-[50px] focus:ring-2 focus:ring-[#FF6900]/20 border border-slate-200 focus:border-[#FF6900]/50 transition-all text-sm"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {selectedModule ? (
                      <>
                        <selectedModule.icon size={18} className="text-[#FF6900]" />
                        <span className="truncate">{selectedModule.title}</span>
                      </>
                    ) : (
                      <span className="text-slate-400 font-medium">Choose Upload Type...</span>
                    )}
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {uploadModules.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            setSelectedModule(mod);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-orange-50/50 group transition-colors border-b border-slate-50 flex items-start gap-3"
                        >
                          <div className="p-2 bg-slate-50 group-hover:bg-white rounded-lg text-slate-400 group-hover:text-[#FF6900] transition-colors mt-0.5">
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-800 group-hover:text-[#FF6900] transition-colors">{mod.title}</p>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5 line-clamp-1">{mod.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {selectedModule && (
              <div className="p-4 bg-orange-50/40 border border-orange-100 rounded-[10px] animate-in fade-in duration-300">
                <p className="text-xs text-orange-800 font-medium leading-relaxed">
                  <span className="font-bold">Execution Context:</span> {selectedModule.desc}
                </p>
              </div>
            )}
          </div>

          {/* DYNAMIC DRAG AND DROP ZONE */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step 2: Resource Spreadsheet Staging</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-[10px] transition-all flex flex-col items-center justify-center p-8 text-center min-h-[190px] ${
                !selectedModule 
                  ? 'bg-slate-50/50 border-slate-200 cursor-not-allowed opacity-60' 
                  : isDragging
                  ? 'bg-[#FF6900]/5 border-[#FF6900] scale-[0.99]'
                  : selectedFile
                  ? 'bg-emerald-50/20 border-emerald-500/30'
                  : 'bg-slate-50 border-slate-200 hover:bg-[#FF6900]/5 hover:border-[#FF6900]/30 cursor-pointer'
              }`}
            >
              <input 
                type="file" 
                className="hidden" 
                id="dashboard-file-stream"
                accept=".xlsx, .xls" 
                disabled={!selectedModule}
                onChange={handleFileChange}
              />
              
              {!selectedFile ? (
                <div className="flex flex-col items-center pointer-events-none">
                  <UploadCloud size={36} className={`mb-3 ${isDragging ? 'text-[#FF6900] animate-bounce' : 'text-slate-400'}`} />
                  <p className="text-slate-800 font-bold text-sm mb-1">Drag & drop spreadsheet schema stack</p>
                  <p className="text-xs text-slate-400 font-medium mb-4">Accepts native .xlsx data structures up to 25MB</p>
                  <label 
                    htmlFor={selectedModule ? "dashboard-file-stream" : undefined}
                    className={`px-5 py-2 rounded-[8px] text-xs font-bold shadow-sm transition-colors border ${
                      selectedModule 
                        ? 'bg-white border-slate-200 text-slate-700 cursor-pointer hover:bg-[#FF6900] hover:text-white hover:border-[#FF6900]' 
                        : 'bg-slate-100 border-transparent text-slate-400'
                    }`}
                  >
                    Browse Local File Matrix
                  </label>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-150">
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 mb-2">
                    <FileSpreadsheet size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-800 max-w-sm truncate px-4" title={selectedFile.name}>
                    {selectedFile.name}
                  </p>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB Ready for Pipeline Parsing
                  </p>
                  
                  <div className="flex gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[8px] text-xs font-bold transition-all outline-none"
                    >
                      Clear Target
                    </button>
                    <button
                      type="button"
                      onClick={handleInjectToQueue}
                      className="px-5 py-2 bg-[#FF6900] hover:bg-[#FF6900]/90 text-white rounded-[8px] text-xs font-bold shadow-md shadow-orange-100 transition-all flex items-center gap-1.5 outline-none"
                    >
                      <CheckCircle2 size={14} /> Commit to Pipeline Queue
                    </button>
                  </div>
                </div>
              )}
            </div>
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

      {/* RENDER SYSTEM CONCURRENCY FIXED GRID LAYOUT */}
      <div className="bg-white border-x border-slate-200 overflow-hidden overflow-x-auto min-h-[250px]">
        <table className="w-full text-left border-collapse min-w-[950px] table-fixed">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
              <th className="py-4 px-6 w-[8%] text-center">SNo</th>
              <th className="py-4 px-6 w-[20%]">Triggered By</th>
              <th className="py-4 px-6 w-[22%]">Operational Type</th>
              <th className="py-4 px-6 w-[24%]">File Template Layout</th>
              <th className="py-4 px-6 w-[13%]">Entry Timestamp</th>
              <th className="py-4 px-6 w-[13%]">Pipeline Status</th>
              <th className="py-4 px-6 w-[6%] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentQueueItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-400 font-medium text-sm">
                  <FileText className="mx-auto text-slate-300 mb-2" size={32} />
                  No processing instances registered inside the queue index.
                </td>
              </tr>
            ) : (
              currentQueueItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                  {/* Serial Number */}
                  <td className="py-4 px-6 text-sm font-bold text-slate-400 text-center truncate">
                    {indexOfFirstItem + index + 1}
                  </td>
                  
                  {/* Multi-user Trigger Block */}
                  <td className="py-4 px-6 truncate">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <User size={13} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 truncate">{item.user}</span>
                    </div>
                  </td>
                  
                  {/* Processing Module Reference */}
                  <td className="py-4 px-6 truncate">
                    <span className="text-xs font-bold text-slate-800 tracking-tight">
                      {item.module}
                    </span>
                  </td>
                  
                  {/* Spreadsheet Resource Mapping Descriptor */}
                  <td className="py-4 px-6 truncate">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet size={15} className="text-[#FF6900] shrink-0" />
                      <p className="text-xs font-bold text-slate-600 truncate" title={item.fileName}>
                        {item.fileName}
                      </p>
                    </div>
                  </td>
                  
                  {/* Pipeline Registry Timestamp */}
                  <td className="py-4 px-6 text-xs font-bold text-slate-400 font-mono truncate">
                    {item.timestamp}
                  </td>
                  
                  {/* Operational Status Tag Block */}
                  <td className="py-4 px-6 truncate">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] text-[10px] font-bold border uppercase tracking-wider ${
                      item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' :
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {item.status === 'Processing' && <AlertCircle size={12} className="animate-spin text-amber-600" />}
                      {item.status === 'In Queue' && <Clock size={12} className="text-slate-400" />}
                      {item.status === 'Completed' && <CheckCircle2 size={12} className="text-emerald-600" />}
                      {item.status}
                    </span>
                  </td>
                  
                  {/* Contextual Options Row Trigger */}
                  <td className="py-4 px-6 text-right relative dropdown-container overflow-visible">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === `act-${item.id}` ? null : `act-${item.id}`)} 
                      className="p-1.5 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[6px] transition-all outline-none opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openDropdown === `act-${item.id}` && (
                      <div className="absolute right-8 top-2 w-36 bg-white rounded-[10px] shadow-xl z-50 overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-100">
                        <button 
                          onClick={() => { setViewModalData(item); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                        >
                          <Eye size={14} /> View Details
                        </button>
                        <button 
                          onClick={() => handleDeleteQueueRecord(item.id)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 text-left outline-none"
                        >
                          <Trash2 size={14} /> Evict Record
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MATCHED PAGINATION CONTROL BAR LAYER --- */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex items-center justify-between font-sans text-sm text-slate-700 select-none">
        
        {/* Left Section: Total Metrics & Custom Per Page Rows Selector */}
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

        {/* Right Section: Active Page Toggle Select Box Dropdown & Control Nav Arrows */}
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

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="p-2 border border-slate-200/80 bg-white rounded-lg text-slate-400 hover:text-[#FF6900] hover:border-slate-300 disabled:opacity-40 disabled:hover:text-slate-400 disabled:hover:border-slate-200/80 transition-all outline-none"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="p-2 border border-slate-200/80 bg-white rounded-lg text-slate-400 hover:text-[#FF6900] hover:border-slate-300 disabled:opacity-40 disabled:hover:text-slate-400 disabled:hover:border-slate-200/80 transition-all outline-none"
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