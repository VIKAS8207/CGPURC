import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, Search, Edit2, Trash2, Eye,
  ChevronLeft, ChevronRight, CheckCircle2,
  ArrowLeft, ChevronDown, X, Hash, Save,
  Calendar, Layers, FileText, Landmark,
  ShieldCheck, MoreVertical
} from 'lucide-react';

const UniversityBranchSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null); // Ref for reliable scrolling to form

  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Branch Setup</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Branch Setup</span>
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

  // --- 1. MASTER DATA ---
  const masterCourses = [
    { id: 'C01', name: 'Bachelor of Technology (B.Tech)' },
    { id: 'C02', name: 'Master of Business Administration (MBA)' },
    { id: 'C03', name: 'Bachelor of Science (B.Sc)' },
    { id: 'C04', name: 'Bachelor of Arts (B.A)' },
    { id: 'C05', name: 'Bachelor of Commerce (B.Com)' },
    { id: 'C06', name: 'Master of Arts (M.A)' },
    { id: 'C07', name: 'Master of Science (M.Sc)' },
    { id: 'C08', name: 'Diploma in Engineering' },
  ];

  // Fixed the mock data mismatch here (e.g. IT -> Information Technology)
  const masterBranchesRegistry = {
    'C01': ['Computer Science', 'Civil Engineering', 'Mechanical', 'Information Technology', 'Electrical', 'Mining', 'Electronics'],
    'C02': ['Finance', 'Marketing', 'HR', 'Business Analytics', 'Operations'],
    'C03': ['Physics', 'Maths', 'Chemistry', 'Biology', 'Biotechnology', 'Computer Science'],
    'C04': ['English', 'History', 'Political Science', 'Economics', 'Sociology'],
    'C05': ['General', 'Taxation', 'Computer Applications', 'Honors'],
    'C06': ['English', 'History', 'Public Administration', 'Psychology'],
    'C07': ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology'],
    'C08': ['Mechanical', 'Civil', 'Electrical', 'Computer Science']
  };

  const academicSessions = [
    "2024-25",
    "2025-26",
    "2026-27"
  ];

  // --- 2. STATES ---
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [formRows, setFormRows] = useState([{ id: Date.now(), branchName: '', branchCode: '' }]);
  
  const [isEditing, setIsEditing] = useState(null); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // View Modal State
  const [viewModalData, setViewModalData] = useState(null);

  // Mapping List (Stores Course-wide groupings)
  const [branchesList, setBranchesList] = useState([
    { id: 1, courseId: 'C01', courseName: 'Bachelor of Technology (B.Tech)', academicYear: '2025-26', branches: [{ name: 'Computer Science', code: 'BTECH-CS-01' }, { name: 'Information Technology', code: 'BTECH-IT-02' }] },
    { id: 2, courseId: 'C02', courseName: 'Master of Business Administration (MBA)', academicYear: '2025-26', branches: [{ name: 'Finance', code: 'MBA-FIN-01' }, { name: 'Marketing', code: 'MBA-MKT-02' }, { name: 'HR', code: 'MBA-HR-03' }] },
    { id: 3, courseId: 'C03', courseName: 'Bachelor of Science (B.Sc)', academicYear: '2025-26', branches: [{ name: 'Physics', code: 'BSC-PHY-01' }, { name: 'Maths', code: 'BSC-MAT-02' }] },
    { id: 4, courseId: 'C04', courseName: 'Bachelor of Arts (B.A)', academicYear: '2024-25', branches: [{ name: 'English', code: 'BA-ENG-01' }, { name: 'History', code: 'BA-HIS-02' }] },
    { id: 5, courseId: 'C01', courseName: 'Bachelor of Technology (B.Tech)', academicYear: '2024-25', branches: [{ name: 'Mechanical', code: 'BTECH-ME-03' }, { name: 'Civil Engineering', code: 'BTECH-CE-04' }] },
    { id: 6, courseId: 'C05', courseName: 'Bachelor of Commerce (B.Com)', academicYear: '2026-27', branches: [{ name: 'General', code: 'BCOM-GEN-01' }, { name: 'Taxation', code: 'BCOM-TAX-02' }] },
    { id: 7, courseId: 'C08', courseName: 'Diploma in Engineering', academicYear: '2026-27', branches: [{ name: 'Mechanical', code: 'DIP-ME-01' }, { name: 'Electrical', code: 'DIP-EE-02' }] },
    { id: 8, courseId: 'C06', courseName: 'Master of Arts (M.A)', academicYear: '2025-26', branches: [{ name: 'Economics', code: 'MA-ECO-01' }, { name: 'Sociology', code: 'MA-SOC-02' }] },
    { id: 9, courseId: 'C07', courseName: 'Master of Science (M.Sc)', academicYear: '2025-26', branches: [{ name: 'Chemistry', code: 'MSC-CHE-01' }, { name: 'Botany', code: 'MSC-BOT-02' }] },
  ]);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- 3. HANDLERS ---
  const handleCustomSelect = (type, value) => {
    if (type === 'academicYear') {
      setAcademicYear(value);
    } else if (type === 'courseId') {
      setSelectedCourseId(value);
      if(!isEditing) {
          setFormRows([{ id: Date.now(), branchName: '', branchCode: '' }]);
      }
    }
    setOpenDropdown(null);
  };

  const addRow = () => {
    setFormRows([...formRows, { id: Date.now(), branchName: '', branchCode: '' }]);
  };

  const removeRow = (id) => {
    if (formRows.length > 1) {
      setFormRows(formRows.filter(row => row.id !== id));
    }
  };

  const handleRowChange = (id, field, value) => {
    setFormRows(formRows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !academicYear) {
        alert("Please select both Academic Session and Course Program.");
        return;
    }

    const courseObj = masterCourses.find(c => c.id === selectedCourseId);
    const branchData = formRows.map(row => ({ name: row.branchName, code: row.branchCode }));

    if (isEditing) {
      setBranchesList(branchesList.map(b => b.id === isEditing ? { 
        ...b, courseId: selectedCourseId, courseName: courseObj.name, academicYear, branches: branchData 
      } : b));
      setIsEditing(null);
    } else {
      const newEntry = {
        id: Date.now(),
        courseId: selectedCourseId,
        courseName: courseObj.name,
        academicYear,
        branches: branchData
      };
      setBranchesList([newEntry, ...branchesList]);
    }

    setSelectedCourseId("");
    setAcademicYear("");
    setFormRows([{ id: Date.now(), branchName: '', branchCode: '' }]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleEdit = (item, e) => {
    if (e) e.stopPropagation();
    setIsEditing(item.id);
    setSelectedCourseId(item.courseId);
    setAcademicYear(item.academicYear);
    // Added a randomized increment to ensure IDs are strictly unique when mapping
    setFormRows(item.branches.map((b, i) => ({ id: Date.now() + i, branchName: b.name, branchCode: b.code })));
    setOpenDropdown(null);
    
    // Reliably scroll to the form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    setBranchesList(prev => prev.filter(b => b.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setOpenDropdown(null);
  };

  // Pagination Logic
  const filteredData = branchesList.filter(b => 
    b.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.academicYear.includes(searchQuery)
  );
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 font-sans relative">
      
      {/* VIEW MODAL */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Configuration Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-[#FF6900] uppercase tracking-widest mb-1">Program</p>
                <h3 className="text-2xl font-bold text-slate-900">{viewModalData.courseName}</h3>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-[10px] border border-slate-200">
                  <Calendar size={14} className="mr-1.5" /> {viewModalData.academicYear}
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Mapped Branches ({viewModalData.branches.length})</p>
                <div className="space-y-3">
                  {viewModalData.branches.map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-[10px] border border-slate-100">
                      <span className="text-sm font-bold text-slate-800">{b.name}</span>
                      <span className="text-xs font-black text-slate-500 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">{b.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[10px] transition-all shadow-sm outline-none">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS NOTIFICATION TOAST (Edunut UI - Orange) */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Configuration Saved</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                The branch setup has been successfully updated in your institutional registry.
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 1. HEADER & BREADCRUMBS */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 rounded-[10px] outline-none"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
            <Landmark size={24} />
          </div>
          Institutional Branch Configuration
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Group and activate specializations for your academic session.</p>
      </div>

      {/* 2. SETUP FORM CARD (Edunut UI) */}
      <div ref={formRef} className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden w-full mb-10 scroll-mt-24">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-6 flex items-center gap-2">
          <Layers size={18} className="text-slate-400" />
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
            {isEditing ? 'Update Branch Mapping' : 'Define New Course Mapping'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* 1. Target Academic Session (Edunut Custom Dropdown) */}
            <div className="relative dropdown-container">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Academic Session</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'academicYear' ? null : 'academicYear')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
              >
                <span className={academicYear ? "text-slate-800" : "text-slate-400"}>
                  {academicYear || "Select Session..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'academicYear' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'academicYear' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                  {academicSessions.map((session, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect('academicYear', session)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${academicYear === session ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {session}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Course Selector (Edunut Custom Dropdown) */}
            <div className="relative dropdown-container">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course Program</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'courseId' ? null : 'courseId')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
              >
                <span className={selectedCourseId ? "text-slate-800" : "text-slate-400"}>
                  {masterCourses.find(c => c.id === selectedCourseId)?.name || "Select an approved degree..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'courseId' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'courseId' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                  {masterCourses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => handleCustomSelect('courseId', course.id)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${selectedCourseId === course.id ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {course.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Plus size={16} className="text-[#FF6900]" /> Branches to include in this program
            </label>
            
            {formRows.map((row, index) => (
              <div key={row.id} className="flex flex-col md:flex-row gap-4 items-end animate-in slide-in-from-left-2 duration-300">
                <div className="flex-1 w-full relative dropdown-container">
                  {index === 0 && <label className="block text-xs font-medium text-slate-500 mb-2">Branch Name</label>}
                  <select 
                    value={row.branchName} 
                    onChange={(e) => handleRowChange(row.id, 'branchName', e.target.value)}
                    disabled={!selectedCourseId}
                    required
                    className="w-full appearance-none px-4 py-3.5 bg-white border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 font-medium text-slate-700 cursor-pointer disabled:opacity-50 disabled:bg-slate-50 outline-none transition-all"
                  >
                    <option value="" disabled>Select Branch...</option>
                    {(masterBranchesRegistry[selectedCourseId] || []).map((b, i) => <option key={i} value={b}>{b}</option>)}
                  </select>
                  <ChevronDown size={14} className={`absolute right-4 text-slate-400 pointer-events-none ${index === 0 ? 'top-[40px]' : 'top-[16px]'}`} />
                </div>

                <div className="flex-1 w-full relative">
                  {index === 0 && <label className="block text-xs font-medium text-slate-500 mb-2">Institutional Code</label>}
                  <Hash size={16} className={`absolute left-3 text-slate-400 ${index === 0 ? 'top-[40px]' : 'top-[14px]'}`} />
                  <input 
                    type="text" 
                    value={row.branchCode} 
                    onChange={(e) => handleRowChange(row.id, 'branchCode', e.target.value)}
                    placeholder="e.g. CS-101" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 font-medium text-slate-800 text-sm outline-none transition-all"
                  />
                </div>

                {!isEditing && (
                  <button 
                    type="button" 
                    onClick={() => removeRow(row.id)} 
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] disabled:opacity-0 transition-colors outline-none" 
                    disabled={formRows.length === 1}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}

            {!isEditing && (
              <button 
                type="button" 
                onClick={addRow} 
                className="mt-4 flex items-center gap-2 text-sm font-bold text-[#FF6900] bg-[#FF6900]/10 hover:bg-[#FF6900]/20 px-4 py-2.5 rounded-[10px] transition-all outline-none"
              >
                <Plus size={16} /> Add Branch
              </button>
            )}
          </div>

          <div className="pt-8 mt-10 border-t border-slate-100 flex justify-end gap-3">
            {isEditing && (
               <button 
                 type="button"
                 onClick={() => {
                   setIsEditing(null); 
                   setSelectedCourseId(""); 
                   setAcademicYear("");
                   setFormRows([{ id: Date.now(), branchName: '', branchCode: '' }]);
                 }} 
                 className="px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-[10px] transition-all shadow-sm outline-none"
               >
                 Cancel
               </button>
            )}
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-8 py-3 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 outline-none"
            >
              <Save size={18}/> {isEditing ? 'Save Updates' : 'Activate Configuration'}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE TOOLBAR (Edunut UI - Orange) */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by course name or academic year..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* 3. REGISTRY TABLE SECTION (Edunut UI) */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Branches Added</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Year</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length === 0 ? (
                <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">No mappings found.</td>
                </tr>
            ) : currentItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm font-bold text-slate-800">{item.courseName}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                      {item.branches.map((b, i) => (
                          <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-[10px] border border-slate-200 shadow-sm">
                            {b.name} <span className="text-slate-400 ml-1">({b.code})</span>
                          </span>
                      ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-[#FF6900]/10 text-[#FF6900] rounded-[10px] text-xs font-bold border border-[#FF6900]/20">
                      {item.branches.length} Specializations
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                      <Calendar size={16} className="text-slate-400" /> {item.academicYear}
                  </span>
                </td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === `action-${item.id}` ? null : `action-${item.id}`)}
                    className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Edunut Action Dropdown */}
                  {openDropdown === `action-${item.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); setViewModalData(item); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={(e) => handleEdit(item, e)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left outline-none"
                      >
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
              {[5, 10, 15, 20, 50].map(num => (
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

export default UniversityBranchSetup;