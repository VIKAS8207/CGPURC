import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, Calendar, BookOpen, GitBranch,
  Search, Eye, Edit2, Trash2, FileText, ChevronLeft, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, PieChart,
  ArrowLeft, Layers, ChevronDown, X, ShieldCheck, MoreVertical,
  User, Clock,
  Landmark, Hash // <--- ADD THESE TWO
} from 'lucide-react';

const StudentDataUpload = () => {
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
          <span className="text-slate-900 font-semibold tracking-tight">Student Data Upload</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Student Data Upload</span>
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
  const [uploadMode, setUploadMode] = useState('manual'); // Default to manual
  const [isProcessed, setIsProcessed] = useState(false); // Controls bulk overview
  const [showNotification, setShowNotification] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // --- MODAL STATES ---
  const [viewModalData, setViewModalData] = useState(null);
  const [bulkErrorModalData, setBulkErrorModalData] = useState(null); // For detailed error logs

  // --- FORM STATES ---
  const [bulkData, setBulkData] = useState({ academicYear: '', course: '', branch: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [manualData, setManualData] = useState({
    academicYear: '', course: '', branch: '', 
    studentId: '', studentName: '', fatherName: '', 
    gender: '', dateOfBirth: '', aadharNumber: '', 
    enrollmentNumber: '', dateOfAdmission: '', 
    mobileNumberStu: '', mobileNumberFather: '', emailId: '', address: '',
    universityId: '', univCourseId: '', univSubCourseId: '',
    sessionId: '', courseModeId: '', semesterYear: ''
  });

  // Pagination & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA ---
  const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
  const courses = ["B.Tech", "MBA", "B.Sc", "BCA"];
  const branches = ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Finance"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Dummy Data for Table (Mixed Manual and Bulk)
  const [uploadHistory, setUploadHistory] = useState([
    { 
      id: 1, 
      type: 'Bulk', 
      academicYear: '2024-2025', 
      target: 'B.Tech - Computer Science', 
      fileName: 'batch_2024_CS.xlsx', 
      uploadDate: '12 Oct 2024',
      totalRecords: 145,
      accepted: 142,
      rejected: 3,
      errors: [
        { row: 14, name: 'Vikas Sharma', error: 'Missing Aadhar Number' },
        { row: 89, name: 'Priya Singh', error: 'Invalid Enrollment Format' },
        { row: 112, name: 'Amit Kumar', error: 'Duplicate Email ID' }
      ]
    },
    { 
      id: 2, 
      type: 'Manual', 
      academicYear: '2024-2025', 
      target: 'MBA - Finance', 
      studentName: 'Rahul Verma',
      regNumber: 'ENR-24-001',
      uploadDate: '14 Oct 2024',
      totalRecords: 1,
      accepted: 1,
      rejected: 0,
      errors: []
    },
    { 
      id: 3, 
      type: 'Bulk', 
      academicYear: '2025-2026', 
      target: 'BCA - General', 
      fileName: 'new_admissions.xlsx', 
      uploadDate: '01 Nov 2024',
      totalRecords: 60,
      accepted: 60,
      rejected: 0,
      errors: []
    },
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

  // Filter and Pagination Logic
  const filteredHistory = uploadHistory.filter(record => 
    record.academicYear.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (record.fileName && record.fileName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (record.studentName && record.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    record.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRecords = filteredHistory.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleBulkCustomSelect = (name, value) => {
    setBulkData({ ...bulkData, [name]: value });
    setOpenDropdown(null);
  };

  const handleManualCustomSelect = (name, value) => {
    setManualData({ ...manualData, [name]: value });
    setOpenDropdown(null);
  };

  const handleManualChange = (e) => {
    setManualData({ ...manualData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (!bulkData.academicYear || !bulkData.course || !bulkData.branch || !selectedFile) {
        alert("Please complete all fields and upload a file.");
        return;
    }

    setIsProcessed(true); // Reveal the overview panel in the UI

    // Mock processing result
    const newRecord = {
        id: Date.now(),
        type: 'Bulk',
        academicYear: bulkData.academicYear,
        target: `${bulkData.course} - ${bulkData.branch}`,
        fileName: selectedFile.name,
        uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        totalRecords: 150,
        accepted: 148,
        rejected: 2,
        errors: [
            { row: 45, name: 'Unknown', error: 'Missing Mobile Number' },
            { row: 102, name: 'Unknown', error: 'Invalid Gender Value' }
        ]
    };

    setUploadHistory([newRecord, ...uploadHistory]);
    // Note: Not resetting form immediately here so user can see the processed results
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualData.academicYear || !manualData.course || !manualData.branch) {
      alert("Please select Year, Course, and Branch.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      type: 'Manual',
      academicYear: manualData.academicYear,
      target: `${manualData.course} - ${manualData.branch}`,
      studentName: manualData.studentName,
      regNumber: manualData.enrollmentNumber,
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      totalRecords: 1,
      accepted: 1,
      rejected: 0,
      errors: []
    };

    setUploadHistory([newRecord, ...uploadHistory]);
    
    // Reset manual form
    setManualData({
      academicYear: '', course: '', branch: '', 
      studentId: '', studentName: '', fatherName: '', 
      gender: '', dateOfBirth: '', aadharNumber: '', 
      enrollmentNumber: '', dateOfAdmission: '', 
      mobileNumberStu: '', mobileNumberFather: '', emailId: '', address: '',
      universityId: '', univCourseId: '', univSubCourseId: '',
      sessionId: '', courseModeId: '', semesterYear: ''
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
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
              <h3 className="text-sm font-bold text-slate-900">Upload Successful</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                The student data has been processed and saved to the institutional registry.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODAL (For Both Manual and Bulk) */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Upload Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{viewModalData.academicYear}</h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-[#FF6900]/10 text-[#FF6900] text-xs font-bold uppercase tracking-wider rounded-[10px] border border-[#FF6900]/20">
                    {viewModalData.target}
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-3">Uploaded on: {viewModalData.uploadDate}</p>
                </div>
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm text-[#FF6900]">
                      {viewModalData.type === 'Bulk' ? <FileSpreadsheet size={32} /> : <User size={32} />}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Upload Type</p>
                  <p className="font-bold text-slate-800">{viewModalData.type}</p>
                </div>
                {viewModalData.type === 'Bulk' ? (
                   <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source File</p>
                     <p className="font-bold text-slate-800 truncate" title={viewModalData.fileName}>{viewModalData.fileName}</p>
                   </div>
                ) : (
                   <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Student</p>
                     <p className="font-bold text-slate-800">{viewModalData.studentName}</p>
                     <p className="text-xs text-slate-500 font-medium">{viewModalData.regNumber}</p>
                   </div>
                )}
                <div className="p-4 bg-emerald-50 rounded-[10px] border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Accepted Records</p>
                  <p className="text-xl font-black text-emerald-700">{viewModalData.accepted}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-[10px] border border-red-100">
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Rejected Records</p>
                  <p className="text-xl font-black text-red-700">{viewModalData.rejected}</p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              {viewModalData.type === 'Bulk' && (
                 <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-[#FF6900] bg-white border border-orange-200 hover:bg-orange-50 rounded-[10px] transition-all shadow-sm outline-none">
                    <Download size={16} /> Download File
                 </button>
              )}
              <button onClick={() => setViewModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[10px] transition-all shadow-sm outline-none">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK ERROR MODAL */}
      {bulkErrorModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-red-100 bg-red-50/50">
              <h2 className="text-xl font-bold text-red-700 tracking-tight flex items-center gap-2">
                 <AlertTriangle size={24} /> Processing Errors
              </h2>
              <button onClick={() => setBulkErrorModalData(null)} className="p-2 text-red-400 hover:bg-red-200 hover:text-red-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="mb-6 flex justify-between items-center">
                 <div>
                    <h3 className="font-bold text-slate-800">{bulkErrorModalData.fileName}</h3>
                    <p className="text-sm text-slate-500">Academic Year: {bulkErrorModalData.academicYear}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-2xl font-black text-red-600">{bulkErrorModalData.rejected}</p>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Failed Records</p>
                 </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-[10px] overflow-hidden">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-16">Row</th>
                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entity Info</th>
                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Error Description</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {bulkErrorModalData.errors.map((err, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                             <td className="py-3 px-4 text-sm font-bold text-slate-600">{err.row}</td>
                             <td className="py-3 px-4 text-sm font-medium text-slate-800">{err.name}</td>
                             <td className="py-3 px-4 text-sm font-bold text-red-600">{err.error}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setBulkErrorModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[10px] transition-all shadow-sm outline-none">
                Close
              </button>
            </div>
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
              <Users size={24} />
            </div>
            Student Data Upload
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Upload student records and enrollment data via manual entry or bulk Excel.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-[#FF6900] hover:bg-orange-50 px-5 py-2.5 rounded-[10px] transition-all shadow-sm font-bold text-sm outline-none">
          <Download size={18} />
          Format Template
        </button>
      </div>

      {/* Main Content Card (Edunut UI) */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm mb-10 overflow-visible relative z-20">
        
        {/* Edunut Folder-Style Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-3 relative z-10">
          <button 
            onClick={() => { setUploadMode('manual'); setIsProcessed(false); setOpenDropdown(null); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${
              uploadMode === 'manual' 
              ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-[10px]' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-[10px]'
            }`}
          >
            <UserPlus size={18} />
            Manual Student Entry
          </button>
          <button 
            onClick={() => { setUploadMode('bulk'); setOpenDropdown(null); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${
              uploadMode === 'bulk' 
              ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-[10px]' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-[10px]'
            }`}
          >
            <FileSpreadsheet size={18} />
            Bulk Excel Upload
          </button>
        </div>

        <div className="p-6 md:p-8 relative z-20">
          
          {/* ================= MANUAL ENTRY ================= */}
          {uploadMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-left-4 duration-300">
               
               {/* 1. Academic Placement */}
               <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <BookOpen size={18} className="text-[#FF6900]"/> Academic Placement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* Academic Year Dropdown */}
                  <div className="relative dropdown-container">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year</label>
                    <button 
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'manualYear' ? null : 'manualYear')}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
                    >
                      <span className={manualData.academicYear ? "text-slate-800" : "text-slate-400"}>
                        {manualData.academicYear || "Select Year..."}
                      </span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'manualYear' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'manualYear' && (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                        {academicYears.map((year, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleManualCustomSelect('academicYear', year)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.academicYear === year ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Course Dropdown */}
                  <div className="relative dropdown-container">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                    <button 
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'manualCourse' ? null : 'manualCourse')}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
                    >
                      <span className={manualData.course ? "text-slate-800" : "text-slate-400"}>
                        {manualData.course || "Select Course..."}
                      </span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'manualCourse' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'manualCourse' && (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                        {courses.map((course, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleManualCustomSelect('course', course)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.course === course ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                          >
                            {course}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Branch Dropdown */}
                  <div className="relative dropdown-container">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Branch</label>
                    <button 
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'manualBranch' ? null : 'manualBranch')}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
                    >
                      <span className={manualData.branch ? "text-slate-800" : "text-slate-400"}>
                        {manualData.branch || "Select Branch..."}
                      </span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'manualBranch' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'manualBranch' && (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                        {branches.map((branch, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleManualCustomSelect('branch', branch)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.branch === branch ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                          >
                            {branch}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Semester/Year Dropdown */}
                  <div className="relative dropdown-container">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Semester / Year</label>
                    <button 
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'manualSem' ? null : 'manualSem')}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
                    >
                      <span className={manualData.semesterYear ? "text-slate-800" : "text-slate-400"}>
                        {manualData.semesterYear || "Select Sem/Year..."}
                      </span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'manualSem' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'manualSem' && (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                        {semesters.map((sem, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleManualCustomSelect('semesterYear', sem)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.semesterYear === sem ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                          >
                            Semester {sem}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Institutional IDs */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <Landmark size={18} className="text-[#FF6900]"/> Institutional IDs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">University ID</label>
                    <input type="text" name="universityId" value={manualData.universityId} onChange={handleManualChange} className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="e.g. U-101" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Univ Course ID</label>
                    <input type="text" name="univCourseId" value={manualData.univCourseId} onChange={handleManualChange} className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="e.g. C-202" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Univ SubCourse ID</label>
                    <input type="text" name="univSubCourseId" value={manualData.univSubCourseId} onChange={handleManualChange} className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="e.g. SC-303" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Session ID / Course Mode ID</label>
                    <input type="text" name="sessionId" value={manualData.sessionId} onChange={handleManualChange} className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="e.g. S-404" />
                  </div>
                </div>
              </div>

              {/* 3. Student Details */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <Users size={18} className="text-[#FF6900]"/> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Student ID</label>
                    <input type="text" name="studentId" value={manualData.studentId} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="e.g. STU-9988" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Student Name</label>
                    <input type="text" name="studentName" value={manualData.studentName} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name</label>
                    <input type="text" name="fatherName" value={manualData.fatherName} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="Richard Doe" />
                  </div>
                  
                  {/* Gender Dropdown */}
                  <div className="relative dropdown-container">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                    <button 
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'manualGender' ? null : 'manualGender')}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
                    >
                      <span className={manualData.gender ? "text-slate-800" : "text-slate-400"}>
                        {manualData.gender || "Select Gender..."}
                      </span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'manualGender' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'manualGender' && (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                        {["Male", "Female", "Other"].map((gen, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleManualCustomSelect('gender', gen)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.gender === gen ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                          >
                            {gen}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={manualData.dateOfBirth} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Aadhar Number</label>
                    <input type="text" name="aadharNumber" value={manualData.aadharNumber} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="XXXX XXXX XXXX" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Enrollment Number</label>
                    <input type="text" name="enrollmentNumber" value={manualData.enrollmentNumber} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="ENR-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Admission</label>
                    <input type="date" name="dateOfAdmission" value={manualData.dateOfAdmission} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800" />
                  </div>
                </div>
              </div>

              {/* 4. Contact Details */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <Hash size={18} className="text-[#FF6900]"/> Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Student Mobile</label>
                    <input type="tel" name="mobileNumberStu" value={manualData.mobileNumberStu} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Mobile</label>
                    <input type="tel" name="mobileNumberFather" value={manualData.mobileNumberFather} onChange={handleManualChange} className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID</label>
                    <input type="email" name="emailId" value={manualData.emailId} onChange={handleManualChange} required className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="student@university.edu" />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address</label>
                    <textarea name="address" value={manualData.address} onChange={handleManualChange} required rows="2" className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400 resize-none" placeholder="Physical address with pin code..."></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-100">
                <button type="submit" className="bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-10 py-3.5 rounded-[10px] font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm outline-none">
                  <UserPlus size={18} />
                  Add Student Record
                </button>
              </div>
            </form>
          )}

          {/* ================= BULK UPLOAD ================= */}
          {uploadMode === 'bulk' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-300">
              
              {/* Left Side: Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleBulkSubmit}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Academic Year Dropdown */}
                      <div className="relative dropdown-container">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Target Academic Session</label>
                        <button 
                          type="button"
                          onClick={() => setOpenDropdown(openDropdown === 'bulkYear' ? null : 'bulkYear')}
                          className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
                        >
                          <span className={bulkData.academicYear ? "text-slate-800" : "text-slate-400"}>
                            {bulkData.academicYear || "Select Session..."}
                          </span>
                          <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'bulkYear' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === 'bulkYear' && (
                          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                            {academicYears.map((year, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleBulkCustomSelect('academicYear', year)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${bulkData.academicYear === year ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Course Dropdown */}
                      <div className="relative dropdown-container">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                        <button 
                          type="button"
                          onClick={() => setOpenDropdown(openDropdown === 'bulkCourse' ? null : 'bulkCourse')}
                          className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
                        >
                          <span className={bulkData.course ? "text-slate-800" : "text-slate-400"}>
                            {bulkData.course || "Select Course..."}
                          </span>
                          <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'bulkCourse' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === 'bulkCourse' && (
                          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                            {courses.map((course, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleBulkCustomSelect('course', course)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${bulkData.course === course ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                              >
                                {course}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Branch Dropdown */}
                      <div className="relative dropdown-container">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Branch</label>
                        <button 
                          type="button"
                          onClick={() => setOpenDropdown(openDropdown === 'bulkBranch' ? null : 'bulkBranch')}
                          className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
                        >
                          <span className={bulkData.branch ? "text-slate-800" : "text-slate-400"}>
                            {bulkData.branch || "Select Branch..."}
                          </span>
                          <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'bulkBranch' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === 'bulkBranch' && (
                          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                            {branches.map((branch, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleBulkCustomSelect('branch', branch)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${bulkData.branch === branch ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                              >
                                {branch}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Data File (.xlsx)</label>
                    {selectedFile ? (
                        <div className="flex items-center justify-between px-4 py-3.5 bg-emerald-50 border border-emerald-200 shadow-sm rounded-[10px]">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="p-3 bg-white border border-emerald-100 rounded-[10px] shrink-0">
                                <FileSpreadsheet className="text-emerald-600" size={24} />
                            </div>
                            <div className="truncate">
                            <p className="text-base font-bold text-slate-800 truncate" title={selectedFile.name}>{selectedFile.name}</p>
                            <p className="text-sm font-medium text-slate-500">Ready to process</p>
                            </div>
                        </div>
                        <button type="button" onClick={() => setSelectedFile(null)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-[10px] transition-colors outline-none shrink-0 border border-transparent hover:border-red-100">
                            <X size={20} />
                        </button>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-slate-300 rounded-[10px] bg-slate-50 hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group shadow-sm">
                        <div className="p-4 bg-white border border-slate-200 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm">
                            <UploadCloud size={32} className="text-slate-400 group-hover:text-[#FF6900] transition-colors" />
                        </div>
                        <p className="text-slate-800 font-bold mb-1">Click to upload or drag and drop</p>
                        <p className="text-slate-500 text-sm mb-4">Strictly .xlsx or .xls formats</p>
                        <input type="file" accept=".xlsx, .xls" className="hidden" id="bulk-upload" onChange={handleFileChange} />
                        <label htmlFor="bulk-upload" className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-[10px] font-bold text-sm cursor-pointer shadow-sm hover:text-[#FF6900] hover:border-[#FF6900]/40 transition-all">
                            Browse Files
                        </label>
                        </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-start">
                    <button type="submit" className="w-full sm:w-auto bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-8 py-3.5 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 outline-none">
                        <UploadCloud size={18} />
                        Process & Upload Batch
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side: Conditional Overview */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 border border-slate-200 rounded-[10px] p-6 h-full flex flex-col shadow-sm">
                  {!isProcessed ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 shadow-sm">
                        <PieChart size={32} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-500 tracking-tight">Analysis Pending</h4>
                        <p className="text-xs font-medium text-slate-400 mt-1">Upload a file to see validation details.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                        <PieChart className="text-[#FF6900]" size={20} />
                        <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Batch Results</h3>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Rows</p>
                          <p className="font-black text-slate-800 text-lg">150</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-[10px] border border-emerald-100 shadow-sm flex items-center justify-between">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Success</p>
                          <p className="font-black text-emerald-700 text-lg">148</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-[10px] border border-red-100 shadow-sm flex items-center justify-between">
                          <p className="text-xs font-bold text-red-600 uppercase tracking-widest">Errors</p>
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
                            <p className="font-bold text-slate-700">Row 45: Missing Value</p>
                            <p className="text-red-600 font-medium italic mt-0.5">Missing Mobile Number</p>
                          </div>
                          <div className="text-xs border border-slate-100 p-2 rounded-lg bg-slate-50">
                            <p className="font-bold text-slate-700">Row 102: Data Format</p>
                            <p className="text-red-600 font-medium italic mt-0.5">Invalid Gender Value</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABLE TOOLBAR FOR RECENT UPLOADS (Edunut UI - Orange) */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Upload History</h3>
        </div>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by student, file, or target..." 
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
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Target details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Entity Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Records</th>
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
                  <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border uppercase tracking-wider ${
                    record.type === 'Bulk' ? 'bg-[#FF6900]/10 text-[#FF6900] border-[#FF6900]/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800 text-sm">{record.target}</div>
                  <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mt-1">
                     <Calendar size={12}/> {record.academicYear}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {record.type === 'Bulk' ? (
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <FileSpreadsheet size={16} className="text-emerald-600 shrink-0" />
                      <p className="text-sm font-bold text-slate-700 truncate" title={record.fileName}>{record.fileName}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <User size={16} className="text-blue-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-700 truncate" title={record.studentName}>{record.studentName}</p>
                        <p className="text-xs font-medium text-slate-500 truncate" title={record.regNumber}>{record.regNumber}</p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {record.type === 'Bulk' ? (
                     <div className="flex flex-col gap-1 items-center">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[10px] border border-slate-200 w-full text-center">Tot: {record.totalRecords}</span>
                        <div className="flex gap-1 w-full">
                           <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 flex-1 text-center">✓ {record.accepted}</span>
                           <button 
                             onClick={() => { if(record.rejected > 0) setBulkErrorModalData(record) }}
                             className={`text-[10px] font-bold flex-1 text-center px-1 py-0.5 rounded border ${record.rejected > 0 ? 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100 cursor-pointer transition-colors' : 'text-slate-400 bg-slate-50 border-slate-100 cursor-default'}`}
                           >
                             ✗ {record.rejected}
                           </button>
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
                <td colSpan="7" className="py-8 text-center text-slate-500 font-medium">
                  No recent uploads found matching your criteria.
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

export default StudentDataUpload;