import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const universityData = [
  { sno: 1, name: "Dr CV Raman University", courses: 33, branches: 74, students: 5337 },
  { sno: 2, name: "MATS University", courses: 84, branches: 86, students: 12240 },
  { sno: 3, name: "Kalinga University", courses: 48, branches: 136, students: 16895 },
  { sno: 4, name: "The ICFAI University Raipur", courses: 23, branches: 53, students: 1794 },
  { sno: 5, name: "ITM University", courses: 19, branches: 35, students: 3481 },
  { sno: 6, name: "Amity University", courses: 66, branches: 64, students: 5140 },
  { sno: 7, name: "O.P. Jindal University", courses: 35, branches: 44, students: 4563 },
  { sno: 8, name: "ISBM University", courses: 43, branches: 135, students: 9327 },
  { sno: 9, name: "AAFT University", courses: 12, branches: 41, students: 1486 },
  { sno: 10, name: "Shri Rawatpura Sarkar University", courses: 65, branches: 213, students: 15588 },
  { sno: 11, name: "Dev Sanskriti University", courses: 29, branches: 141, students: 314 },
  { sno: 12, name: "K K Modi University", courses: 19, branches: 63, students: 837 },
  { sno: 13, name: "Maharishi University of Management and Technology", courses: 31, branches: 31, students: 2520 },
  { sno: 14, name: "Shri Shankracharya Professional University", courses: 58, branches: 77, students: 9311 },
  { sno: 15, name: "Bharti Vishwavidyalaya", courses: 51, branches: 125, students: 5517 },
  { sno: 16, name: "Anjaneya University", courses: 23, branches: 54, students: 3562 },
  { sno: 17, name: "SHRI DAVARA UNIVERSITY", courses: 22, branches: 48, students: 3537 },
];

const StudentReport = () => {
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(universityData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = universityData.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when changing density
  };

  const handleJumpPage = (e) => {
    if (e.key === 'Enter') {
      let page = parseInt(jumpPage);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      } else if (page > totalPages) {
        setCurrentPage(totalPages); // Cap at max
      } else if (page < 1) {
        setCurrentPage(1); // Floor at 1
      }
      setJumpPage(''); // Clear input after jumping
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin-dashboard" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Enrollment Report</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Comprehensive overview of university student counts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm text-sm font-semibold">
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 transition-all text-sm font-semibold"
            >
              <Printer size={16} />
              Print Report
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/80 border-b border-blue-100">
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider w-20">SNo.</th>
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider">University Name</th>
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider text-right">Courses</th>
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider text-right">Branches</th>
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider text-right">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((row) => (
                  <tr key={row.sno} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">{row.sno < 10 ? `0${row.sno}` : row.sno}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{row.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 text-right font-medium">{row.courses}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 text-right font-medium">{row.branches}</td>
                    <td className="py-4 px-6 text-sm text-slate-700 text-right font-bold">{row.students.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- NEW PAGINATION FOOTER --- */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
            
            {/* Left: Rows Per Page Selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium">Rows per page:</span>
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

            {/* Middle: Data Info */}
            <div className="text-sm text-slate-500 font-medium text-center">
              Showing <span className="font-semibold text-slate-700">{universityData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, universityData.length)}</span> of <span className="font-semibold text-slate-700">{universityData.length}</span> entries
            </div>
            
            {/* Right: Controls & Go-To */}
            <div className="flex items-center justify-between lg:justify-end gap-6">
              
              {/* Go-To Page Input */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium hidden sm:inline-block">Go to:</span>
                <input 
                  type="number" 
                  min="1" 
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  onKeyDown={handleJumpPage}
                  className="w-16 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 text-center outline-none shadow-sm transition-all font-medium placeholder:text-slate-400 hover:border-slate-300"
                  placeholder="Pg"
                  title="Type page number and press Enter"
                />
              </div>

              {/* Prev/Next Arrows */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === 1 
                      ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' 
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                
                <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center">
                  <span className="font-bold text-slate-800">{currentPage}</span> / {totalPages}
                </span>

                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === totalPages 
                      ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' 
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentReport;