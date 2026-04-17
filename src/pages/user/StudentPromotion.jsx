import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Users, ChevronRight, ChevronDown, Search, 
  CheckCircle2, XCircle, AlertTriangle, UserMinus, 
  UserCheck, Filter, MoreVertical, X, ShieldCheck,
  Check, ChevronLeft, ArrowRight
} from 'lucide-react';

const StudentPromotion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    return (
      <>
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Student Promotion</span>
      </>
    );
  };

  // --- UI STATES ---
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSem, setSelectedSem] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- STUDENT DATA STATE ---
  const [students, setStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  // Mock Data
  const courseList = ["B.Tech", "MBA", "BCA", "M.Tech"];
  const branchList = ["Computer Science", "Mechanical", "Civil", "Electronics"];
  const semList = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"];

  // Initialize students when branch and sem are selected
  useEffect(() => {
    if (selectedBranch && selectedSem) {
      const mockStudents = Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        name: `Student Name ${i + 1}`,
        regNo: `REG-2026-${1000 + i}`,
        isPromoted: true, 
        isPromotedWithBacklog: false,
        status: 'Promoted'
      }));
      setStudents(mockStudents);
      setSelectAll(true);
    } else {
      setStudents([]);
    }
  }, [selectedBranch, selectedSem]);

  // --- HANDLERS ---
  const handleToggleAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    setStudents(students.map(s => ({ 
      ...s, 
      isPromoted: newState, 
      isPromotedWithBacklog: false,
      status: newState ? 'Promoted' : 'Detained' 
    })));
  };

  const handleIndividualToggle = (id) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const newIsPromoted = !s.isPromoted;
        return { 
          ...s, 
          isPromoted: newIsPromoted, 
          isPromotedWithBacklog: false, // Mutually exclusive
          status: newIsPromoted ? 'Promoted' : 'Detained' 
        };
      }
      return s;
    }));
  };

  const handleBacklogToggle = (id) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const newIsBacklog = !s.isPromotedWithBacklog;
        return { 
          ...s, 
          isPromotedWithBacklog: newIsBacklog, 
          isPromoted: false, // Mutually exclusive
          status: newIsBacklog ? 'Promoted with Backlog' : 'Detained' 
        };
      }
      return s;
    }));
  };

  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { 
      ...s, 
      status: newStatus, 
      isPromoted: false, 
      isPromotedWithBacklog: false 
    } : s));
    setOpenDropdown(null);
  };

  const calculateOverview = () => {
    const promoted = students.filter(s => s.isPromoted).length;
    const promotedWithBacklog = students.filter(s => s.isPromotedWithBacklog).length;
    const left = students.filter(s => !s.isPromoted && !s.isPromotedWithBacklog && s.status === 'Left').length;
    const detained = students.filter(s => !s.isPromoted && !s.isPromotedWithBacklog && s.status === 'Detained').length;
    return { promoted, promotedWithBacklog, left, detained };
  };

  const { promoted, promotedWithBacklog, left, detained } = calculateOverview();

  // Filter students based on search
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalRecords = filteredStudents.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const getNextSem = (current) => {
    const num = parseInt(current);
    return isNaN(num) ? "Next" : `${num + 1}th Semester`;
  };

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
              <h3 className="text-sm font-bold text-slate-900">Promotion Finalized</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">The batch has been updated. Records moved to {getNextSem(selectedSem)}.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 outline-none"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* Header */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
            <UserCheck size={24} />
          </div>
          Batch Promotion
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Promote, detain, or mark students who have left the course for the next session.</p>
      </div>

      {/* Selectors Card */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm mb-6 p-6 relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          
          <div className="relative dropdown-container">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Program</label>
            <button type="button" onClick={() => setOpenDropdown(openDropdown === 'course' ? null : 'course')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px]">
              <span>{selectedCourse || "Select Course..."}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'course' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'course' && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                {courseList.map(c => (
                  <button key={c} type="button" onClick={() => {setSelectedCourse(c); setOpenDropdown(null);}} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors">{c}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative dropdown-container">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Branch</label>
            <button type="button" disabled={!selectedCourse} onClick={() => setOpenDropdown(openDropdown === 'branch' ? null : 'branch')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px] disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{selectedBranch || "Select Branch..."}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'branch' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'branch' && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                {branchList.map(b => (
                  <button key={b} type="button" onClick={() => {setSelectedBranch(b); setOpenDropdown(null);}} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors">{b}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative dropdown-container">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Current Semester</label>
            <button type="button" disabled={!selectedBranch} onClick={() => setOpenDropdown(openDropdown === 'sem' ? null : 'sem')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] font-medium text-slate-800 outline-none h-[50px] disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{selectedSem || "Select Semester..."}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'sem' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'sem' && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                {semList.map(s => (
                  <button key={s} type="button" onClick={() => {setSelectedSem(s); setOpenDropdown(null);}} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors">{s}</button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {selectedSem && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Data Overview & Promotion Details */}
          <div className="bg-white border border-slate-200 rounded-[10px] p-6 mb-6 shadow-sm">
             <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-6 justify-center xl:justify-start">
                    <div className="flex items-center gap-3">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current</p>
                            <p className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-[6px] border border-slate-200">{selectedSem}</p>
                        </div>
                        <ArrowRight size={20} className="text-[#FF6900] mt-4" />
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target</p>
                            <p className="text-sm font-black text-[#FF6900] bg-orange-50 px-3 py-1 rounded-[6px] border border-orange-100">{getNextSem(selectedSem)}</p>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
                    <div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Promoted</p>
                            <p className="text-xl font-black text-emerald-700">{promoted}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Promoted w/ Backlog</p>
                            <p className="text-xl font-black text-blue-700">{promotedWithBacklog}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Dropped</p>
                            <p className="text-xl font-black text-amber-700">{detained}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Left</p>
                            <p className="text-xl font-black text-red-700">{left}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
                    <button onClick={() => setSelectedSem("")} className="flex-1 xl:flex-none px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-[10px] transition-all">Cancel</button>
                    <button onClick={() => {setShowNotification(true); setTimeout(() => setShowNotification(false), 4000);}} className="flex-1 xl:flex-none bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-8 py-3 rounded-[10px] font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm outline-none">
                        <UserCheck size={18} /> Confirm Batch Promotion
                    </button>
                </div>
             </div>
          </div>

          {/* List Toolbar */}
          <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectAll ? 'bg-[#FF6900] border-[#FF6900]' : 'border-slate-300'}`}>
                  {selectAll && <Check size={14} className="text-white" />}
                  <input type="checkbox" className="hidden" checked={selectAll} onChange={handleToggleAll} />
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Select All for Promotion</span>
              </label>
            </div>
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search student name or registration..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
              />
            </div>
          </div>

          {/* Student List Table */}
          <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">No</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-20 text-center">Promote</th>
                  {/* UPDATED WIDTH HERE: Changed from w-32 to w-48 and added whitespace-nowrap */}
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-48 whitespace-nowrap text-center">Promote w/ Backlog</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Profile</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Registration Number</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Reason (If Dropped/Left)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((student, index) => (
                  <tr key={student.id} className={`hover:bg-slate-50/50 transition-colors ${(!student.isPromoted && !student.isPromotedWithBacklog) ? 'bg-slate-50/30' : ''}`}>
                    <td className="py-4 px-6 text-sm font-bold text-slate-400 text-center">{indexOfFirstItem + index + 1}</td>
                    
                    {/* Regular Promote Checkbox */}
                    <td className="py-4 px-6 text-center">
                      <label className="flex items-center justify-center cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${student.isPromoted ? 'bg-[#FF6900] border-[#FF6900]' : 'border-slate-300 bg-white'}`}>
                          {student.isPromoted && <Check size={12} className="text-white" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={student.isPromoted} onChange={() => handleIndividualToggle(student.id)} />
                      </label>
                    </td>

                    {/* Promoted with Backlog Checkbox */}
                    <td className="py-4 px-6 text-center">
                      <label className="flex items-center justify-center cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${student.isPromotedWithBacklog ? 'bg-[#FF6900] border-[#FF6900]' : 'border-slate-300 bg-white'}`}>
                          {student.isPromotedWithBacklog && <Check size={12} className="text-white" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={student.isPromotedWithBacklog} onChange={() => handleBacklogToggle(student.id)} />
                      </label>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`text-sm font-bold transition-all ${(!student.isPromoted && !student.isPromotedWithBacklog) ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {student.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-bold text-slate-500 font-mono">{student.regNo}</span>
                    </td>
                    <td className="py-4 px-6 text-right relative dropdown-container">
                      {(!student.isPromoted && !student.isPromotedWithBacklog) ? (
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={() => setOpenDropdown(openDropdown === `status-${student.id}` ? null : `status-${student.id}`)}
                            className="flex items-center gap-2 ml-auto px-4 py-2 bg-white border-none shadow-sm rounded-[10px] text-[10px] font-black uppercase tracking-widest text-[#FF6900] hover:bg-[#FF6900]/10 transition-all outline-none h-[36px]"
                          >
                            {student.status}
                            <ChevronDown size={14} />
                          </button>
                          {openDropdown === `status-${student.id}` && (
                            <div className="absolute right-0 mt-2 w-36 bg-white rounded-[10px] shadow-xl z-[60] border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                              <button onClick={() => handleStatusChange(student.id, 'Detained')} className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] uppercase tracking-wider transition-colors border-b border-slate-50">Dropped</button>
                              <button onClick={() => handleStatusChange(student.id, 'Left')} className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] uppercase tracking-wider transition-colors">Left Course</button>
                            </div>
                          )}
                        </div>
                      ) : student.isPromotedWithBacklog ? (
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-[10px] border border-blue-100">
                          Promoted to {getNextSem(selectedSem)} with backlog
                        </span>
                      ) : (
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-[10px] border border-emerald-100">
                          Eligible for {getNextSem(selectedSem)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edunut Professional Pagination Footer */}
          <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center text-sm text-slate-600">
              <span className="font-bold mr-3">Total Students: {totalRecords}</span>
              
              <div className="relative inline-flex items-center dropdown-container">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
                  className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
                >
                  {[10, 20, 30, 50].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
              </div>
              
              <span className="ml-3 font-medium text-[10px] uppercase tracking-widest text-slate-400">per page</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center">
                <div className="relative inline-flex items-center mr-2 dropdown-container">
                  <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-white font-bold cursor-pointer text-[#FF6900] outline-none"
                  >
                    {Array.from({ length: totalPages || 1 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 text-[#FF6900] pointer-events-none" size={14} />
                </div>
                <span className="font-medium text-[10px] uppercase tracking-widest text-slate-400">of {totalPages} pages</span>
              </div>

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
      )}

      {!selectedSem && (
        <div className="mt-12 text-center p-20 bg-slate-50 rounded-[10px] border border-dashed border-slate-300">
           <Users size={48} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-lg font-bold text-slate-500">Select Batch Parameters</h3>
           <p className="text-sm text-slate-400 mt-1">Select Course, Branch, and Semester to begin the promotion process.</p>
        </div>
      )}

    </div>
  );
};

export default StudentPromotion;