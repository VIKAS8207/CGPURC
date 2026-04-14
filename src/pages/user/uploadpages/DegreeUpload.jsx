import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, Download, UserPlus, UploadCloud, 
  Search, Eye, FileText, ChevronLeft, ChevronRight, 
  ArrowLeft, Layers, ChevronDown, CheckCircle2, 
  X, ShieldCheck, Hash, FileCheck, Check,
  User, Clock // <-- Added these two right here
} from 'lucide-react';

const DegreeDataUpload = () => {
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
          <span className="text-slate-900 font-semibold tracking-tight">Degree & Marksheet Upload</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Degree & Marksheet Upload</span>
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
  const [studentSearch, setStudentSearch] = useState("");

  // --- FORM STATES ---
  const [manualData, setManualData] = useState({
    course: '', 
    branch: ''
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [semesterFiles, setSemesterFiles] = useState({});

  // --- MOCK DATA ---
  const courses = ["B.Tech", "M.Tech", "MBA", "BCA"];
  const branches = ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Information Technology"];

  const DUMMY_STUDENTS = [
    { id: 1, name: "Rahul Sharma", regNumber: "REG-2024-001", 
      semesters: [
        { sem: 1, status: "Verified", fileName: "sem1_marksheet.pdf", fileUrl: "#" },
        { sem: 2, status: "Verified", fileName: "sem2_marksheet.pdf", fileUrl: "#" },
        { sem: 3, status: "Pending", fileName: null, fileUrl: null },
        { sem: 4, status: "Pending", fileName: null, fileUrl: null },
        { sem: 5, status: "Pending", fileName: null, fileUrl: null },
        { sem: 6, status: "Pending", fileName: null, fileUrl: null },
        { sem: 7, status: "Pending", fileName: null, fileUrl: null },
        { sem: 8, status: "Pending", fileName: null, fileUrl: null }
      ]
    },
    { id: 2, name: "Priya Singh", regNumber: "REG-2024-002",
      semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", fileName: null, fileUrl: null }))
    },
    { id: 3, name: "Amit Kumar", regNumber: "REG-2024-003",
      semesters: [
        { sem: 1, status: "Verified", fileName: "s1.pdf", fileUrl: "#" },
        { sem: 2, status: "Verified", fileName: "s2.pdf", fileUrl: "#" },
        { sem: 3, status: "Verified", fileName: "s3.pdf", fileUrl: "#" },
        { sem: 4, status: "Verified", fileName: "s4.pdf", fileUrl: "#" },
        { sem: 5, status: "Verified", fileName: "s5.pdf", fileUrl: "#" },
        { sem: 6, status: "Verified", fileName: "s6.pdf", fileUrl: "#" },
        { sem: 7, status: "Verified", fileName: "s7.pdf", fileUrl: "#" },
        { sem: 8, status: "Verified", fileName: "s8.pdf", fileUrl: "#" },
        { sem: "Degree", status: "Pending", fileName: null, fileUrl: null } // Extra row for final degree
      ]
    },
    { id: 4, name: "Neha Verma", regNumber: "REG-2024-045",
      semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", fileName: null, fileUrl: null }))
    },
    { id: 5, name: "Vikas Patel", regNumber: "REG-2024-112",
      semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", fileName: null, fileUrl: null }))
    },
  ];

  // Dummy Data for Recent Uploads Table
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, studentName: 'Sneha Patel', regNumber: 'REG-2023-089', documentsUpdated: 2, uploadDate: '12 Oct 2024', status: 'Under Review' },
    { id: 2, studentName: 'Vikram Singh', regNumber: 'REG-2022-104', documentsUpdated: 1, uploadDate: '14 Oct 2024', status: 'Verified' },
    { id: 3, studentName: 'Anjali Gupta', regNumber: 'REG-2024-011', documentsUpdated: 8, uploadDate: '15 Oct 2024', status: 'Under Review' },
    { id: 4, studentName: 'Karan Johar', regNumber: 'REG-2021-332', documentsUpdated: 1, uploadDate: '16 Oct 2024', status: 'Verified' },
  ]);

  // --- PAGINATION STATES FOR RECENT TABLE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tableSearch, setTableSearch] = useState("");

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

  // --- HANDLERS ---
  const handleCustomSelect = (name, value) => {
    setManualData({ ...manualData, [name]: value });
    setOpenDropdown(null);
    // Reset student selection if course/branch changes
    setSelectedStudent(null);
    setSemesterFiles({});
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setOpenDropdown(null);
    setStudentSearch("");
    setSemesterFiles({});
  };

  const handleFileChange = (semIndex, file) => {
    if (file) {
      setSemesterFiles(prev => ({ ...prev, [semIndex]: file }));
    }
  };

  const removeFile = (semIndex) => {
    const updated = { ...semesterFiles };
    delete updated[semIndex];
    setSemesterFiles(updated);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(semesterFiles).length === 0) {
      alert("Please upload at least one document before submitting.");
      return;
    }

    // Mock adding to recent uploads
    const newUpload = {
      id: Date.now(),
      studentName: selectedStudent.name,
      regNumber: selectedStudent.regNumber,
      documentsUpdated: Object.keys(semesterFiles).length,
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Under Review'
    };

    setRecentUploads([newUpload, ...recentUploads]);
    setSemesterFiles({});
    setSelectedStudent(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  // --- FILTER & PAGINATION FOR RECENT UPLOADS ---
  const filteredUploads = recentUploads.filter(record => 
    record.studentName.toLowerCase().includes(tableSearch.toLowerCase()) || 
    record.regNumber.toLowerCase().includes(tableSearch.toLowerCase())
  );

  const totalRecords = filteredUploads.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUploads.slice(indexOfFirstItem, indexOfLastItem);

  // Filter students for the search dropdown
  const filteredStudents = DUMMY_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
    s.regNumber.toLowerCase().includes(studentSearch.toLowerCase())
  );

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
              <h3 className="text-sm font-bold text-slate-900">Documents Submitted</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                The student's academic documents have been successfully uploaded and sent for review.
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
              <GraduationCap size={24} />
            </div>
            Degree & Marksheet Upload
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Securely upload and manage individual student academic documents.</p>
        </div>
      </div>

      {/* MAIN FORM CARD (Edunut UI) - Removed overflow-hidden to allow dropdowns to overflow */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm mb-10">
        
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 py-4 rounded-t-[10px]">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
            <UserPlus className="text-slate-400" size={18} />
            Individual Student Mapping
          </h2>
        </div>

        <form onSubmit={handleManualSubmit} className="p-6 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* 1. Course Dropdown - Added z-30 */}
            <div className="relative dropdown-container z-30">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Program / Course</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'course' ? null : 'course')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
              >
                <span className={manualData.course ? "text-slate-800" : "text-slate-400"}>
                  {manualData.course || "Select Course..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'course' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'course' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                  {courses.map((course, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect('course', course)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.course === course ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Branch Dropdown - Added z-20 */}
            <div className="relative dropdown-container z-20">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Branch / Specialization</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'branch' ? null : 'branch')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px]"
              >
                <span className={manualData.branch ? "text-slate-800" : "text-slate-400"}>
                  {manualData.branch || "Select Branch..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'branch' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'branch' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                  {branches.map((branch, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect('branch', branch)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${manualData.branch === branch ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Student Search & Select - Added z-10 */}
            <div className="relative dropdown-container z-10">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Find Student</label>
              <button 
                type="button"
                disabled={!manualData.course || !manualData.branch}
                onClick={() => setOpenDropdown(openDropdown === 'student' ? null : 'student')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none h-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className={selectedStudent ? "text-slate-800 font-bold" : "text-slate-400"}>
                  {selectedStudent ? `${selectedStudent.name} (${selectedStudent.regNumber})` : "Search by Name or Reg No..."}
                </span>
                <Search size={16} className="text-slate-400 pointer-events-none" />
              </button>

              {openDropdown === 'student' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                  <div className="p-2 border-b border-slate-100">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                       <input 
                         type="text" 
                         autoFocus
                         placeholder="Type to search..." 
                         value={studentSearch}
                         onChange={(e) => setStudentSearch(e.target.value)}
                         className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none shadow-sm rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20"
                       />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => handleStudentSelect(student)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors outline-none hover:bg-[#FF6900]/5 flex flex-col ${selectedStudent?.id === student.id ? 'bg-[#FF6900]/10' : ''}`}
                      >
                        <span className="font-bold text-slate-800">{student.name}</span>
                        <span className="text-xs font-bold text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 rounded-[10px] w-fit mt-1">
                           {student.regNumber}
                        </span>
                      </button>
                    )) : (
                      <div className="px-4 py-6 text-center text-sm text-slate-500 font-medium">No students found.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* DYNAMIC SEMESTER TABLE (Appears only when student is selected) */}
          {selectedStudent && (
            <div className="mt-8 border border-slate-200 rounded-[10px] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-slate-50/50 p-5 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                       <User size={18} className="text-slate-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 tracking-tight">{selectedStudent.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{manualData.course} • {manualData.branch}</p>
                    </div>
                 </div>
                 <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration No</p>
                     <p className="text-sm font-bold text-slate-800 font-mono tracking-tight">{selectedStudent.regNumber}</p>
                 </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-16 text-center">No</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Document Target</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Status</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Uploaded File</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedStudent.semesters.map((item, idx) => {
                      const isVerified = item.status === "Verified";
                      const stagedFile = semesterFiles[idx];
                      
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                          <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">{idx + 1}</td>
                          <td className="py-4 px-6">
                            <span className="text-sm font-bold text-slate-800">
                              {item.sem === "Degree" ? "Final Degree Certificate" : `Semester ${item.sem} Marksheet`}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                             {isVerified ? (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-[10px] border border-emerald-200 w-fit">
                                    <CheckCircle2 size={14}/> Verified
                                </span>
                             ) : (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-[10px] border border-amber-200 w-fit">
                                    <Clock size={14}/> Pending Upload
                                </span>
                             )}
                          </td>
                          <td className="py-4 px-6">
                            {isVerified ? (
                               <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                 <FileCheck size={16} className="text-emerald-500"/>
                                 {item.fileName}
                               </div>
                            ) : stagedFile ? (
                               <div className="flex items-center justify-between p-2 bg-slate-100 rounded-[10px] border border-slate-200 w-fit">
                                 <div className="flex items-center gap-2 text-xs font-bold text-slate-700 max-w-[150px]">
                                   <FileText size={14} className="text-[#FF6900] shrink-0"/>
                                   <span className="truncate">{stagedFile.name}</span>
                                 </div>
                                 <button type="button" onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500 ml-2 outline-none">
                                    <X size={14}/>
                                 </button>
                               </div>
                            ) : (
                               <span className="text-xs font-medium text-slate-400 italic">No document staged</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {isVerified ? (
                               <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-[10px] text-xs font-bold hover:bg-slate-50 shadow-sm transition-all outline-none">
                                  <Eye size={14}/> View
                               </button>
                            ) : (
                               <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-xs font-bold transition-all shadow-sm outline-none border ${
                                 stagedFile 
                                 ? "bg-white border-orange-200 text-[#FF6900] hover:bg-orange-50" 
                                 : "bg-[#FF6900] text-white hover:bg-[#FF6900]/90 border-transparent"
                               }`}>
                                 <UploadCloud size={14} />
                                 {stagedFile ? "Replace" : "Upload"}
                                 <input 
                                   type="file" 
                                   className="hidden" 
                                   accept=".pdf,.jpg,.jpeg,.png"
                                   onChange={(e) => handleFileChange(idx, e.target.files[0])} 
                                 />
                               </label>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button 
                  type="submit" 
                  disabled={Object.keys(semesterFiles).length === 0}
                  className="bg-[#FF6900] hover:bg-[#FF6900]/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 outline-none"
                >
                  <Check size={18} /> Submit Documents for Review
                </button>
              </div>

            </div>
          )}

        </form>
      </div>

      {/* TABLE TOOLBAR FOR RECENT UPLOADS (Edunut UI - Orange) */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Document Submissions</h3>
        </div>
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by student name or reg number..." 
            value={tableSearch}
            onChange={(e) => {
              setTableSearch(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* DATA TABLE (Edunut UI) */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[250px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Docs Updated</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Review Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((record, index) => (
              <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800 text-sm">{record.studentName}</div>
                  <div className="text-[10px] font-bold text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 rounded-[10px] border border-[#FF6900]/20 w-fit mt-1 uppercase tracking-wider">
                    {record.regNumber}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-[10px] text-xs font-bold border border-slate-200">
                      {record.documentsUpdated} Files
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-slate-600 text-sm font-medium">
                      {record.uploadDate}
                  </span>
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
                <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">
                  No recent submissions found.
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

export default DegreeDataUpload;