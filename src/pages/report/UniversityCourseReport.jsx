import React, { useState } from 'react';
import { ArrowLeft, Search, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sessions = ["2024-25", "2025-26", "2026-27"];
const universities = [
  "Dr CV Raman University",
  "MATS University",
  "Kalinga University",
  "The ICFAI University Raipur",
  "ITM University",
  "Amity University"
];

// Added some dummy data to demonstrate pagination
const dummyData = [
  { sno: 1, course: "B.Tech", subCourse: "CSE", level: "UG", regReg: 120, regAtkt: 15, attReg: 118, attAtkt: 15, pass1: 60, pass2: 40, pass3: 10, fail: 15, atkt: 8 },
  { sno: 2, course: "MBA", subCourse: "Finance", level: "PG", regReg: 80, regAtkt: 5, attReg: 78, attAtkt: 5, pass1: 45, pass2: 25, pass3: 5, fail: 5, atkt: 3 },
  { sno: 3, course: "B.Sc", subCourse: "IT", level: "UG", regReg: 95, regAtkt: 10, attReg: 90, attAtkt: 9, pass1: 30, pass2: 40, pass3: 15, fail: 8, atkt: 6 },
  { sno: 4, course: "BBA", subCourse: "Marketing", level: "UG", regReg: 150, regAtkt: 20, attReg: 145, attAtkt: 18, pass1: 70, pass2: 50, pass3: 20, fail: 15, atkt: 8 },
  { sno: 5, course: "M.Tech", subCourse: "Civil", level: "PG", regReg: 40, regAtkt: 2, attReg: 40, attAtkt: 2, pass1: 25, pass2: 10, pass3: 2, fail: 3, atkt: 2 },
  { sno: 6, course: "B.Com", subCourse: "General", level: "UG", regReg: 200, regAtkt: 30, attReg: 190, attAtkt: 25, pass1: 80, pass2: 70, pass3: 30, fail: 20, atkt: 15 },
];

const UniversityCourseReport = () => {
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [showReport, setShowReport] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // --- CALCS ---
  const totalPages = Math.ceil(dummyData.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = showReport ? dummyData.slice(indexOfFirstItem, indexOfLastItem) : [];

  // --- HANDLERS ---
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

  const handleViewReport = () => {
    if (selectedSession && selectedUniversity) {
      setShowReport(true);
      setCurrentPage(1); // Reset to first page on new search
    } else {
      alert("Please select both a Session and a University.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex items-center gap-4 print:hidden">
          <Link 
            to="/admin-dashboard" 
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">University-wise Course Student Report</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Filter and view course specific student distributions</p>
          </div>
        </div>

        {/* Filter Selection Card */}
        <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-sm print:hidden">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            
            {/* Session Dropdown (Edunut UI Design) */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Session</label>
              <div className="relative group">
                <select 
                  value={selectedSession}
                  onChange={(e) => {
                    setSelectedSession(e.target.value);
                    setShowReport(false); 
                  }}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl block px-4 py-3.5 outline-none appearance-none cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-100"
                  style={{ border: 'none' }}
                >
                  <option value="" disabled>-- Select Session --</option>
                  {sessions.map(session => (
                    <option key={session} value={session}>{session}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* University Dropdown (Edunut UI Design) */}
            <div className="flex-1 md:flex-[2]">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select University</label>
              <div className="relative group">
                <select 
                  value={selectedUniversity}
                  onChange={(e) => {
                    setSelectedUniversity(e.target.value);
                    setShowReport(false);
                  }}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl block px-4 py-3.5 outline-none appearance-none cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-100"
                  style={{ border: 'none' }}
                >
                  <option value="" disabled>-- Select University --</option>
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* View Button */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleViewReport}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all text-sm font-bold"
              >
                <Search size={16} strokeWidth={2.5} />
                VIEW REPORT
              </button>
            </div>

          </div>
        </div>

        {/* Report Container (Conditionally Rendered) */}
        {showReport && (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Report Header Info */}
            <div className="p-6 md:px-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight">Course-wise Student Report</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  <span className="font-bold text-slate-700">University:</span> {selectedUniversity} 
                  <span className="mx-3 text-slate-300">|</span> 
                  <span className="font-bold text-slate-700">Session:</span> {selectedSession}
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all text-sm font-bold shadow-sm whitespace-nowrap">
                <FileDown size={16} />
                EXPORT PDF
              </button>
            </div>

            {/* Complex Table - Edunut UI Design */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  {/* Top Header Row */}
                  <tr className="bg-blue-600 text-white border-b border-blue-700">
                    <th rowSpan="2" className="py-4 px-4 text-xs font-bold uppercase tracking-wider border-r border-blue-500/50 text-center align-middle">S.no</th>
                    <th rowSpan="2" className="py-4 px-4 text-xs font-bold uppercase tracking-wider border-r border-blue-500/50 text-center align-middle">Course</th>
                    <th rowSpan="2" className="py-4 px-4 text-xs font-bold uppercase tracking-wider border-r border-blue-500/50 text-center align-middle">Sub Course</th>
                    <th rowSpan="2" className="py-4 px-4 text-xs font-bold uppercase tracking-wider border-r border-blue-500/50 text-center align-middle">Course Level</th>
                    
                    <th colSpan="3" className="py-3 px-4 text-xs font-bold uppercase tracking-wider border-b border-r border-blue-500/50 text-center">Registered Students</th>
                    <th colSpan="3" className="py-3 px-4 text-xs font-bold uppercase tracking-wider border-b border-r border-blue-500/50 text-center">Attempted Students</th>
                    <th colSpan="3" className="py-3 px-4 text-xs font-bold uppercase tracking-wider border-b border-r border-blue-500/50 text-center">Passed Students</th>
                    
                    <th rowSpan="2" className="py-4 px-4 text-xs font-bold uppercase tracking-wider border-r border-blue-500/50 text-center align-middle">Failed<br/>Students</th>
                    <th rowSpan="2" className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-center align-middle">ATKT<br/>Students</th>
                  </tr>
                  
                  {/* Sub Header Row */}
                  <tr className="bg-blue-50 text-blue-800 border-b border-blue-100">
                    {/* Registered Sub */}
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">Regular</th>
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">ATKT</th>
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50 bg-blue-100/50">Total</th>
                    {/* Attempted Sub */}
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">Regular</th>
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">ATKT</th>
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50 bg-blue-100/50">Total</th>
                    {/* Passed Sub */}
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">1st Div</th>
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">2nd Div</th>
                    <th className="py-2.5 px-3 text-xs font-bold text-center border-r border-blue-200/50">3rd Div</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentItems.length > 0 ? (
                    currentItems.map((row) => (
                      <tr key={row.sno} className="hover:bg-blue-50/40 transition-colors group">
                        <td className="py-3 px-4 text-sm font-medium text-slate-500 text-center border-r border-slate-100">{row.sno}</td>
                        <td className="py-3 px-4 text-sm font-bold text-slate-800 text-center border-r border-slate-100">{row.course}</td>
                        <td className="py-3 px-4 text-sm font-medium text-slate-600 text-center border-r border-slate-100">{row.subCourse}</td>
                        <td className="py-3 px-4 text-sm font-medium text-slate-600 text-center border-r border-slate-100">{row.level}</td>
                        
                        {/* Registered */}
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.regReg}</td>
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.regAtkt}</td>
                        <td className="py-3 px-3 text-sm font-bold text-blue-700 text-center border-r border-slate-100 bg-blue-50/30">{row.regReg + row.regAtkt}</td>
                        
                        {/* Attempted */}
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.attReg}</td>
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.attAtkt}</td>
                        <td className="py-3 px-3 text-sm font-bold text-blue-700 text-center border-r border-slate-100 bg-blue-50/30">{row.attReg + row.attAtkt}</td>
                        
                        {/* Passed */}
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.pass1}</td>
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.pass2}</td>
                        <td className="py-3 px-3 text-sm text-slate-600 text-center border-r border-slate-100">{row.pass3}</td>
                        
                        {/* Fail & ATKT */}
                        <td className="py-3 px-4 text-sm font-bold text-red-600 text-center border-r border-slate-100">{row.fail}</td>
                        <td className="py-3 px-4 text-sm font-bold text-orange-500 text-center">{row.atkt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="15" className="py-12 px-6 text-center text-slate-500 text-sm font-medium">
                        No data available for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Rows per page:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleRowsChange}
                  className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none shadow-sm transition-all font-medium cursor-pointer hover:border-slate-300"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="text-sm text-slate-500 font-medium text-center">
                Showing <span className="font-semibold text-slate-700">{dummyData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, dummyData.length)}</span> of <span className="font-semibold text-slate-700">{dummyData.length}</span> entries
              </div>
              
              <div className="flex items-center justify-between lg:justify-end gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
                  
                  {/* Edunut UI Design Dropdown */}
                  <div className="relative flex items-center group">
                    <select 
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="w-[4.5rem] bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-1.5 pl-3 pr-7 outline-none shadow-sm transition-all font-semibold cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 appearance-none"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <option key={page} value={page}>
                          {page}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                      currentPage === 1 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-sm'
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center whitespace-nowrap">
                    <span className="font-bold text-slate-800">{currentPage}</span> / {totalPages}
                  </span>
                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                      currentPage === totalPages ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-sm'
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UniversityCourseReport;