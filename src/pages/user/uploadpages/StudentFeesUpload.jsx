import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Download, FileSpreadsheet, 
  UploadCloud, Calendar, BookOpen, GitBranch,
  Search, Eye, Edit2, Trash2, FileText, ChevronLeft, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, PieChart,
  ArrowLeft, ChevronDown, Check, X, ShieldCheck
} from 'lucide-react';

const StudentFeesUpload = () => {
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
          <Link to="/payable-on-fees" className="hover:text-[#FF6900] transition-colors">Payable on Fees</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Upload Fees Data</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Upload Fees Data</span>
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
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false); // Controls table/overview visibility
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Pagination & Search States for the results table
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // MOCK DATA for Dropdown & History
  const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
  
  // The exact table data from the user screenshot
  const initialUploadHistory = [
    { sno: 1, studentCount: 10, totalFeesAmount: '133975', monthName: 'January', entryDate: '5/30/2025 4:22:12 PM', status: 'Verified' },
    { sno: 2, studentCount: 11, totalFeesAmount: '297950', monthName: 'February', entryDate: '5/30/2025 4:22:12 PM', status: 'Verified' },
    { sno: 3, studentCount: 12, totalFeesAmount: '602600', monthName: 'March', entryDate: '5/30/2025 4:22:12 PM', status: 'Verified' },
    { sno: 4, studentCount: 12, totalFeesAmount: '392825', monthName: 'April', entryDate: '5/30/2025 4:22:12 PM', status: 'Under Review' },
    { sno: 5, studentCount: 14, totalFeesAmount: '632725', monthName: 'May', entryDate: '5/30/2025 4:22:12 PM', status: 'Under Review' },
  ];

  const [uploadHistory, setUploadHistory] = useState(initialUploadHistory);

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

  // Filter and Pagination Logic for the history table
  const filteredHistory = uploadHistory.filter(record => 
    record.monthName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    record.totalFeesAmount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRecords = filteredHistory.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleCustomSelect = (value) => {
    setSelectedAcademicYear(value);
    setOpenDropdown(null);
    // Reset process flow when year changes
    setIsProcessed(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setIsProcessed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAcademicYear || !selectedFile) {
        alert("Please select an academic year and upload a file.");
        return;
    }

    // "CHECK DATA" logic - simulation
    // In real app, this would hit API, validate, and return the data below
    setIsProcessed(true); // Reveal the overview panel and recent uploads table
    
    // Reset form after processing for next upload
    setSelectedAcademicYear('');
    setSelectedFile(null);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
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
              <h3 className="text-sm font-bold text-slate-900">Data Processed</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                The uploaded fee data has been validated against institutional records and is ready for review.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
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
              <FileSpreadsheet size={24} />
            </div>
            Upload Fees Data
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Bulk upload and process payable fee records from institutions.</p>
        </div>
        
        {/* Professional Download Template button, styled per screenshot */}
        <button className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-[#FF6900] hover:bg-orange-50 px-5 py-2.5 rounded-[10px] transition-all shadow-sm font-bold text-sm outline-none">
          <Download size={18} />
          Download Format Template
        </button>
      </div>

      {/* MAIN CONTENT CARD (Folder Style) */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden mb-10 relative">
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 py-4 rounded-t-[10px]">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
            <FileSpreadsheet className="text-slate-400" size={18} />
            Upload payable Fee Data via Excel
          </h2>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Initial Form - Academic Year Selection */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-8 relative dropdown-container max-w-sm">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Academic Session</label>
                  <button 
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'academicYear' ? null : 'academicYear')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
                  >
                    <span className={selectedAcademicYear ? "text-slate-800" : "text-slate-400"}>
                      {selectedAcademicYear || "Select Session..."}
                    </span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'academicYear' ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === 'academicYear' && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                      {academicYears.map((year, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleCustomSelect(year)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${selectedAcademicYear === year ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Left Side: Upload Zone - styled professional and Edunut-orange */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Upload payable Fee Data (.xlsx)</label>
                  
                  {selectedFile ? (
                    <div className="flex items-center justify-between p-4 bg-white border border-emerald-200 shadow-sm rounded-[10px] max-w-xl">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="p-3 bg-emerald-50 rounded-[10px] shrink-0">
                           <FileSpreadsheet className="text-emerald-600" size={24} />
                        </div>
                        <div className="truncate">
                          <p className="text-base font-bold text-slate-800 truncate" title={selectedFile.name}>{selectedFile.name}</p>
                          <p className="text-sm font-medium text-slate-500">File attached - Click 'Check Data' to process</p>
                        </div>
                      </div>
                      <button type="button" onClick={removeFile} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] transition-colors outline-none shrink-0">
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-3 px-4 py-12 bg-slate-50 shadow-sm border-2 border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all group max-w-xl">
                      <div className="p-4 bg-white border border-slate-200 rounded-full group-hover:scale-110 transition-transform shadow-sm">
                          <UploadCloud size={32} className="text-slate-400 group-hover:text-[#FF6900]" />
                      </div>
                      <div className="text-center">
                          <span className="text-base font-bold text-[#FF6900] group-hover:underline">Click to browse</span>
                          <span className="text-base font-medium text-slate-500 ml-1">or drag and drop</span>
                          <p className="text-sm font-medium text-slate-400 mt-2">Strictly .xlsx format up to 10MB</p>
                      </div>
                      <input type="file" className="hidden" accept=".xlsx" onChange={handleFileChange} />
                    </label>
                  )}
                </div>

                {/* CHECK DATA button,styled professionally like Edunut UI action buttons */}
                <div className="pt-6 border-t border-slate-100 flex justify-start">
                  <button 
                    type="submit" 
                    disabled={!selectedAcademicYear || !selectedFile}
                    className="w-full sm:w-auto bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-10 py-3.5 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FF6900]"
                  >
                    <CheckCircle2 size={18} />
                    Check & Process Data
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side: Conditional Batch Overview - styled professionally */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 border border-slate-200 rounded-[10px] p-6 h-full flex flex-col shadow-sm">
                {!isProcessed ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 shadow-sm">
                      <PieChart size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-500 tracking-tight">Analysis Pending</h4>
                      <p className="text-xs font-medium text-slate-400 mt-1">Select Year and upload file to see validation details.</p>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                      <PieChart className="text-[#FF6900]" size={20} />
                      <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Processing Results</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processed Rows</p>
                        <p className="font-black text-slate-800 text-lg">150</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-[10px] border border-emerald-100 shadow-sm flex items-center justify-between">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Validated</p>
                        <p className="font-black text-emerald-700 text-lg">148</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-[10px] border border-red-100 shadow-sm flex items-center justify-between">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest">Denied</p>
                        <p className="font-black text-red-700 text-lg">2</p>
                      </div>
                    </div>

                    <div className="flex-1 bg-white border border-slate-200 rounded-[10px] overflow-hidden flex flex-col shadow-sm">
                      <div className="bg-red-50/50 p-3.5 border-b border-slate-100 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-500" />
                        <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Incomplete Records</span>
                      </div>
                      <div className="p-3 space-y-3 overflow-y-auto max-h-48">
                        <div className="text-xs border border-slate-100 p-2 rounded-lg bg-slate-50">
                          <p className="font-bold text-slate-700">Row 14: Month of January</p>
                          <p className="text-red-600 font-medium italic mt-0.5">Missing Month Name Value</p>
                        </div>
                        <div className="text-xs border border-slate-100 p-2 rounded-lg bg-slate-50">
                          <p className="font-bold text-slate-700">Row 102: Month of May</p>
                          <p className="text-red-600 font-medium italic mt-0.5">Invalid Fees Amount Format</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE TOOLBAR FOR RESULTS (Edunut UI - Orange Search, Toolbar styled) */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Processed Fee Records</h3>
        </div>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by month, student count, or amount..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* DATA TABLE (Edunut UI - with original columns from user screenshot) */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Student Count</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Fees Amount</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Month Name</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Entry Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((record, index) => (
              <tr key={record.sno} className="hover:bg-slate-50 transition-colors group font-medium">
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6 text-sm text-center">
                    <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[10px] border border-slate-200">
                        {record.studentCount}
                    </span>
                </td>
                <td className="py-4 px-6 text-sm font-black text-[#FF6900]">
                    ₹ {Number(record.totalFeesAmount).toLocaleString('en-IN')}
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-800">
                    {record.monthName}
                </td>
                <td className="py-4 px-6 text-xs text-slate-500">
                    {record.entryDate}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border uppercase tracking-wider ${
                    record.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                  No fee records found matching your search.
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
          <div className="relative inline-flex items-center dropdown-container z-10">
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
            >
              {[5, 10, 15, 20].map(num => (
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
            <div className="relative inline-flex items-center mr-2 dropdown-container z-10">
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

export default StudentFeesUpload;