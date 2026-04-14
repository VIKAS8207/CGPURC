import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Search, CheckCircle2, 
  Eye, FileText, ChevronRight, ChevronLeft,
  User, School, ShieldCheck, X,
  Check, AlertCircle, CheckSquare, XSquare,
  Building2, GraduationCap, BookMarked, ChevronDown
} from 'lucide-react';

const CertificateVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Certificate Verification</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Certificate Verification</span>
          ) : (
             <>
               <Link to={routeTo} className="hover:text-[#155DFC] transition-colors">{displayName}</Link>
               <ChevronRight size={14} className="text-slate-400" />
             </>
          )}
        </React.Fragment>
      );
    });
  };

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState("All");
  
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [draftReview, setDraftReview] = useState(null); 
  
  // --- EDUNUT PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // --- BULK ACTION STATES ---
  const [isBulkReject, setIsBulkReject] = useState(false);
  const [bulkRemark, setBulkRemark] = useState("");

  // --- DUMMY PDF URL ---
  const dummyPdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  // --- MOCK DATA (20 Students) ---
  const [submissions, setSubmissions] = useState([
    { id: 1, regNo: "REG2026001", studentName: "Aman Vishwakarma", college: "GEC Raipur", course: "B.Tech", branch: "Computer Science", overallStatus: "Pending", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 2, regNo: "REG2026045", studentName: "Priya Sharma", college: "BIT Durg", course: "MBA", branch: "Finance", overallStatus: "Verified", semesters: Array.from({length: 4}, (_, i) => ({ sem: i+1, status: "Verified", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 3, regNo: "REG2026112", studentName: "Sneha Patel", college: "Shri Shankaracharya", course: "B.Pharma", branch: "Pharmacy", overallStatus: "Rejected", semesters: [{ sem: 1, status: "Verified", file: "s1.pdf", documentUrl: dummyPdfUrl, remark: "" }, { sem: 2, status: "Rejected", file: "s2.pdf", documentUrl: dummyPdfUrl, remark: "Blurry scan, please re-upload." }] },
    { id: 4, regNo: "REG2026201", studentName: "Vikram Singh", college: "Rungta College", course: "B.E.", branch: "Civil", overallStatus: "Pending", semesters: Array.from({length: 6}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 5, regNo: "REG2026305", studentName: "Neha Verma", college: "NIT Raipur", course: "B.Tech", branch: "Mechanical", overallStatus: "Pending", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 6, regNo: "REG2026333", studentName: "Rahul Desai", college: "CSVTU Campus", course: "M.Tech", branch: "Data Science", overallStatus: "Verified", semesters: Array.from({length: 4}, (_, i) => ({ sem: i+1, status: "Verified", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 7, regNo: "REG2026410", studentName: "Anjali Gupta", college: "GEC Bilaspur", course: "B.Tech", branch: "Electrical", overallStatus: "Rejected", semesters: [{ sem: 1, status: "Rejected", file: "a1.pdf", documentUrl: dummyPdfUrl, remark: "Incorrect university seal." }, { sem: 2, status: "Pending", file: "a2.pdf", documentUrl: dummyPdfUrl, remark: "" }] },
    { id: 8, regNo: "REG2026455", studentName: "Karan Johar", college: "Disha Institute", course: "BCA", branch: "Computer Applications", overallStatus: "Pending", semesters: Array.from({length: 6}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 9, regNo: "REG2026512", studentName: "Meera Rajput", college: "Columbia College", course: "BBA", branch: "Management", overallStatus: "Verified", semesters: Array.from({length: 6}, (_, i) => ({ sem: i+1, status: "Verified", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 10, regNo: "REG2026589", studentName: "Amit Tiwari", college: "BIT Raipur", course: "B.Tech", branch: "Computer Science", overallStatus: "Pending", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 11, regNo: "REG2026602", studentName: "Simran Kaur", college: "Kalinga University", course: "B.Sc", branch: "Biotechnology", overallStatus: "Pending", semesters: Array.from({length: 6}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 12, regNo: "REG2026640", studentName: "Rohan Kapoor", college: "Amity Raipur", course: "BA LLB", branch: "Law", overallStatus: "Pending", semesters: Array.from({length: 10}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 13, regNo: "REG2026711", studentName: "Pooja Mishra", college: "GEC Raipur", course: "B.Tech", branch: "IT", overallStatus: "Verified", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Verified", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 14, regNo: "REG2026750", studentName: "Tariq Ahmed", college: "MATS University", course: "B.Com", branch: "Taxation", overallStatus: "Rejected", semesters: [{ sem: 1, status: "Verified", file: "t1.pdf", documentUrl: dummyPdfUrl, remark: "" }, { sem: 2, status: "Verified", file: "t2.pdf", documentUrl: dummyPdfUrl, remark: "" }, { sem: 3, status: "Rejected", file: "t3.pdf", documentUrl: dummyPdfUrl, remark: "Name mismatch on marksheet." }] },
    { id: 15, regNo: "REG2026801", studentName: "Vivek Oberoi", college: "BIT Durg", course: "B.Tech", branch: "Mechanical", overallStatus: "Pending", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 16, regNo: "REG2026844", studentName: "Sanya Malhotra", college: "Shri Shankaracharya", course: "MBA", branch: "HR", overallStatus: "Pending", semesters: Array.from({length: 4}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 17, regNo: "REG2026903", studentName: "Arjun Reddy", college: "Rungta College", course: "B.Pharma", branch: "Pharmacy", overallStatus: "Verified", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Verified", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 18, regNo: "REG2026922", studentName: "Kiara Advani", college: "CSVTU Campus", course: "M.Tech", branch: "Civil", overallStatus: "Pending", semesters: Array.from({length: 4}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 19, regNo: "REG2026960", studentName: "Ishaan Khatter", college: "GEC Raipur", course: "B.Tech", branch: "Mining", overallStatus: "Pending", semesters: Array.from({length: 8}, (_, i) => ({ sem: i+1, status: "Pending", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "" })) },
    { id: 20, regNo: "REG2026999", studentName: "Tara Sutaria", college: "Disha Institute", course: "BBA", branch: "Marketing", overallStatus: "Rejected", semesters: Array.from({length: 6}, (_, i) => ({ sem: i+1, status: "Rejected", file: `sem${i+1}.pdf`, documentUrl: dummyPdfUrl, remark: "Invalid enrollment number across all docs." })) }
  ]);

  // --- DYNAMIC FILTER OPTIONS ---
  const uniqueColleges = useMemo(() => ["All", ...new Set(submissions.map(s => s.college))], [submissions]);
  const uniqueCourses = useMemo(() => ["All", ...new Set(submissions.map(s => s.course))], [submissions]);
  const uniqueBranches = useMemo(() => ["All", ...new Set(submissions.map(s => s.branch))], [submissions]);

  // --- LOGIC ---
  const filteredData = submissions.filter(s => 
    (selectedCollege === "All" || s.college === selectedCollege) &&
    (selectedCourse === "All" || s.course === selectedCourse) &&
    (selectedBranch === "All" || s.branch === selectedBranch) &&
    (statusFilter === "All" || s.overallStatus === statusFilter) &&
    (s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     s.regNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Initialize modal state
  useEffect(() => {
    if (selectedStudent) {
      setDraftReview(JSON.parse(JSON.stringify(selectedStudent))); 
      setIsBulkReject(false);
      setBulkRemark("");
    } else {
      setDraftReview(null);
    }
  }, [selectedStudent]);

  // Handle single doc status change
  const handleDocStatusChange = (semIndex, newStatus) => {
    const updatedDraft = { ...draftReview };
    updatedDraft.semesters[semIndex].status = newStatus;
    
    if (newStatus !== 'Rejected') {
      updatedDraft.semesters[semIndex].remark = "";
    }
    
    if (newStatus === 'Verified' && isBulkReject) {
        setIsBulkReject(false);
    }

    setDraftReview(updatedDraft);
  };

  // Handle single doc remark change
  const handleDocRemarkChange = (semIndex, remark) => {
    const updatedDraft = { ...draftReview };
    updatedDraft.semesters[semIndex].remark = remark;
    setDraftReview(updatedDraft);
  };

  // --- BULK ACTIONS ---
  const handleAcceptAll = () => {
    const updatedDraft = { ...draftReview };
    updatedDraft.semesters = updatedDraft.semesters.map(sem => ({ ...sem, status: 'Verified', remark: '' }));
    setDraftReview(updatedDraft);
    setIsBulkReject(false);
    setBulkRemark("");
  };

  const handleRejectAll = () => {
    const updatedDraft = { ...draftReview };
    updatedDraft.semesters = updatedDraft.semesters.map(sem => ({ ...sem, status: 'Rejected', remark: bulkRemark }));
    setDraftReview(updatedDraft);
    setIsBulkReject(true);
  };

  const handleBulkRemarkChange = (val) => {
    setBulkRemark(val);
    const updatedDraft = { ...draftReview };
    updatedDraft.semesters = updatedDraft.semesters.map(sem => 
        sem.status === 'Rejected' ? { ...sem, remark: val } : sem
    );
    setDraftReview(updatedDraft);
  };

  // Final Submit
  const handleFinalSubmit = () => {
    const hasRejected = draftReview.semesters.some(sem => sem.status === 'Rejected');
    const hasPending = draftReview.semesters.some(sem => sem.status === 'Pending');
    
    let newOverallStatus = 'Pending';
    if (hasRejected) newOverallStatus = 'Rejected';
    else if (!hasPending) newOverallStatus = 'Verified';

    const finalStudent = { ...draftReview, overallStatus: newOverallStatus };
    setSubmissions(submissions.map(s => s.id === finalStudent.id ? finalStudent : s));
    setSelectedStudent(null);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Verified': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const openDocument = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 font-sans relative">
      
      {/* 1. HEADER */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-4 rounded-[10px] outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
         {generateBreadcrumbs()}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] text-[#155DFC]">
              <ShieldCheck size={24} />
            </div>
            Academic Document Verification
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Review and authenticate student marksheets submitted by colleges.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {/* 2. INSTITUTION & PROGRAM FILTERS (Edunut Style) */}
        <div className="bg-white border border-slate-200 rounded-[10px] p-4 shadow-sm flex flex-col md:flex-row gap-4">
          
          {/* College Dropdown */}
          <div className="flex-1 relative dropdown-container">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
              <Building2 size={12} /> Select Institution
            </label>
            <select 
              value={selectedCollege} 
              onChange={(e) => { setSelectedCollege(e.target.value); setCurrentPage(1); }}
              className="appearance-none w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-sm text-slate-800 cursor-pointer outline-none"
            >
              {uniqueColleges.map(college => (
                <option key={college} value={college}>{college === "All" ? "All Institutions" : college}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-[34px] text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Course Dropdown */}
          <div className="flex-1 relative dropdown-container">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
              <GraduationCap size={12} /> Select Course
            </label>
            <select 
              value={selectedCourse} 
              onChange={(e) => { setSelectedCourse(e.target.value); setCurrentPage(1); }}
              className="appearance-none w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-sm text-slate-800 cursor-pointer outline-none"
            >
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course === "All" ? "All Courses" : course}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-[34px] text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Branch Dropdown */}
          <div className="flex-1 relative dropdown-container">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
              <BookMarked size={12} /> Select Branch
            </label>
            <select 
              value={selectedBranch} 
              onChange={(e) => { setSelectedBranch(e.target.value); setCurrentPage(1); }}
              className="appearance-none w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-sm text-slate-800 cursor-pointer outline-none"
            >
              {uniqueBranches.map(branch => (
                <option key={branch} value={branch}>{branch === "All" ? "All Branches" : branch}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-[34px] text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* 3. SEARCH & STATUS FILTER */}
        <div className="bg-white border border-slate-200 rounded-[10px] p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Student Name or Reg No..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-sm text-slate-800 placeholder-slate-400"
            />
          </div>
          <div className="flex bg-slate-50 p-1.5 rounded-[10px] shadow-sm shrink-0 w-full md:w-auto overflow-x-auto border border-slate-100">
            {["All", "Pending", "Verified", "Rejected"].map(status => (
              <button 
                key={status}
                onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                className={`px-6 py-2 rounded-[10px] text-xs font-bold transition-all whitespace-nowrap outline-none ${statusFilter === status ? 'bg-white text-[#155DFC] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MAIN TABLE */}
      <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Information</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Institution</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course & Branch</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Docs</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-slate-800">{item.studentName}</div>
                    <div className="text-[10px] font-bold text-[#155DFC] bg-[#155DFC]/10 px-2 py-0.5 rounded-[10px] border border-[#155DFC]/20 w-fit mt-1 uppercase tracking-wider">
                      {item.regNo}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <School size={14} className="text-slate-400" />
                        {item.college}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-slate-700">{item.course}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{item.branch}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-[10px] text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">{item.semesters.length}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border uppercase tracking-wider ${getStatusStyle(item.overallStatus)}`}>
                      {item.overallStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {/* Explicit Review Action Button replacing 3-dot for this page's specific workflow */}
                    <button 
                      onClick={() => setSelectedStudent(item)}
                      className="px-4 py-2 text-sm font-bold text-[#155DFC] bg-[#155DFC]/10 hover:bg-[#155DFC] hover:text-white rounded-[10px] transition-all shadow-sm flex items-center gap-2 ml-auto outline-none border border-[#155DFC]/20 hover:border-[#155DFC]"
                    >
                      <Eye size={16} /> Review
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 font-medium">No records found matching your current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* --- PROFESSIONAL PAGINATION --- */}
        <div className="bg-white border-t border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center text-sm text-slate-600">
            <span className="font-bold mr-3">Total: {totalRecords}</span>
            
            <div className="relative inline-flex items-center dropdown-container">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
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
            
            <div className="flex items-center">
              <div className="relative inline-flex items-center mr-2 dropdown-container">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
                >
                  {Array.from({ length: totalPages || 1 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
              </div>
              <span className="font-medium">of {totalPages || 1} pages</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. VERIFICATION MODAL (Edunut UI Makeover) */}
      {draftReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl rounded-[10px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                
                {/* Modal Header */}
                <div className="bg-slate-50/50 border-b border-slate-100 p-6 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-[10px] flex items-center justify-center shadow-sm">
                            <User size={24} className="text-slate-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{draftReview.studentName}</h2>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{draftReview.regNo} &bull; {draftReview.college}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedStudent(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none"><X size={20}/></button>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto">
                    
                    {/* Left Panel: Semester Check-list */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        {/* --- BULK ACTION BAR --- */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800">Document Verification</h3>
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleAcceptAll}
                                    className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-bold transition-all bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:shadow-md outline-none"
                                >
                                    <CheckSquare size={16}/> Accept All
                                </button>
                                <button 
                                    onClick={handleRejectAll}
                                    className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-bold transition-all bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:shadow-md outline-none"
                                >
                                    <XSquare size={16}/> Reject All
                                </button>
                            </div>
                        </div>

                        {/* --- COMMON REVIEW PLACE (Appears on Bulk Reject) --- */}
                        {isBulkReject && (
                            <div className="p-5 bg-red-50 border border-red-200 rounded-[10px] shadow-sm animate-in slide-in-from-top-2 duration-300">
                                <label className="flex items-center gap-2 text-sm font-bold text-red-700 mb-3">
                                  <AlertCircle size={16} /> Global Reason for Rejection <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                  value={bulkRemark}
                                  onChange={(e) => handleBulkRemarkChange(e.target.value)}
                                  placeholder="Provide a single reason to reject all documents..." 
                                  className="w-full px-4 py-3 bg-white border-none shadow-sm rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all text-slate-800 min-h-[80px] resize-none placeholder-slate-400"
                                />
                            </div>
                        )}

                        <div className="space-y-4">
                            {draftReview.semesters.map((sem, i) => (
                                <div key={i} className={`p-5 bg-slate-50 border shadow-sm rounded-[10px] transition-all ${sem.status === 'Verified' ? 'border-emerald-200 bg-emerald-50/50' : sem.status === 'Rejected' ? 'border-red-200 bg-red-50/50' : 'border-slate-200'}`}>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                      <div className="flex items-center gap-4">
                                          <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center font-bold text-sm shadow-sm shrink-0 ${sem.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : sem.status === 'Rejected' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white text-slate-500 border border-slate-200'}`}>
                                              {sem.sem}
                                          </div>
                                          <div>
                                              <p className="text-base font-bold text-slate-900">Semester {sem.sem} Marksheet</p>
                                              <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${sem.status === 'Verified' ? 'text-emerald-600' : sem.status === 'Rejected' ? 'text-red-600' : 'text-amber-500'}`}>
                                                  Status: {sem.status}
                                              </div>
                                          </div>
                                      </div>
                                      
                                      {/* Action Buttons */}
                                      <div className="flex flex-wrap gap-2">
                                          <button 
                                            onClick={() => openDocument(sem.documentUrl)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-bold transition-all bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-sm outline-none"
                                          >
                                            <FileText size={16}/> View
                                          </button>
                                          
                                          <button 
                                            onClick={() => handleDocStatusChange(i, 'Verified')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-bold transition-all shadow-sm outline-none ${sem.status === 'Verified' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50'}`}
                                          >
                                            <Check size={16}/> Accept
                                          </button>
                                          
                                          <button 
                                            onClick={() => handleDocStatusChange(i, 'Rejected')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-bold transition-all shadow-sm outline-none ${sem.status === 'Rejected' ? 'bg-red-600 text-white border-red-600' : 'bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50'}`}
                                          >
                                            <X size={16}/> Reject
                                          </button>
                                      </div>
                                    </div>

                                    {/* Individual Remark Field (Hidden if using Bulk Reject) */}
                                    {sem.status === 'Rejected' && !isBulkReject && (
                                      <div className="mt-5 pt-4 border-t border-red-200 animate-in slide-in-from-top-2 duration-300">
                                        <label className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                                          <AlertCircle size={14} /> Reason for Rejection <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                          type="text" 
                                          value={sem.remark}
                                          onChange={(e) => handleDocRemarkChange(i, e.target.value)}
                                          placeholder="e.g., Document is blurry, seal is missing..." 
                                          className="w-full px-4 py-2.5 bg-white border-none shadow-sm rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all text-slate-800 placeholder-slate-400"
                                        />
                                      </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Final Submit */}
                    <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-200 pt-8 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="bg-[#155DFC]/5 border border-[#155DFC]/20 rounded-[10px] p-5 shadow-sm">
                                <h4 className="text-sm font-bold text-[#155DFC] mb-2 flex items-center gap-2">
                                  <ShieldCheck size={18} /> System Audit Check
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    Ensure every document has been reviewed. Use the <b>View</b> button to verify authenticity before accepting or rejecting.
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-[10px] p-6 border border-slate-200 shadow-sm">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-3">Review Summary</h4>
                                <div className="space-y-3 text-sm font-bold text-slate-700">
                                  <div className="flex justify-between items-center p-2 bg-white rounded-[10px] shadow-sm border border-slate-100">
                                    <span className="text-slate-500">Total Docs</span>
                                    <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{draftReview.semesters.length}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-2 bg-white rounded-[10px] shadow-sm border border-slate-100">
                                    <span className="text-emerald-600">Accepted</span>
                                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{draftReview.semesters.filter(s => s.status === 'Verified').length}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-2 bg-white rounded-[10px] shadow-sm border border-slate-100">
                                    <span className="text-red-600">Rejected</span>
                                    <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">{draftReview.semesters.filter(s => s.status === 'Rejected').length}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-2 bg-white rounded-[10px] shadow-sm border border-slate-100">
                                    <span className="text-amber-600">Pending</span>
                                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">{draftReview.semesters.filter(s => s.status === 'Pending').length}</span>
                                  </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button 
                                onClick={handleFinalSubmit}
                                disabled={draftReview.semesters.some(s => s.status === 'Pending') || draftReview.semesters.some(s => s.status === 'Rejected' && s.remark.trim() === '')}
                                className="w-full bg-[#155DFC] hover:bg-[#155DFC]/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 outline-none"
                            >
                                <CheckCircle2 size={18} /> Submit Final Review
                            </button>
                            {(draftReview.semesters.some(s => s.status === 'Pending') || draftReview.semesters.some(s => s.status === 'Rejected' && s.remark.trim() === '')) && (
                                <p className="text-[10px] text-center text-red-500 font-bold uppercase tracking-wider mt-3">
                                  * Action all docs and provide remarks to submit.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default CertificateVerification;