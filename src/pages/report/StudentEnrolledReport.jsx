import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const enrolmentData = [
  { sno: 1, name: "MATS University", students: 3213 },
  { sno: 2, name: "Kalinga University", students: 4259 },
  { sno: 3, name: "The ICFAI University Raipur", students: 429 },
  { sno: 4, name: "ITM University", students: 753 },
  { sno: 5, name: "Amity University", students: 886 },
  { sno: 6, name: "O.P. Jindal University", students: 900 },
  { sno: 7, name: "ISBM University", students: 4186 },
  { sno: 8, name: "AAFT University", students: 104 },
  { sno: 9, name: "Shri Rawatpura Sarkar University", students: 2372 },
  { sno: 10, name: "K K Modi University", students: 159 },
  { sno: 11, name: "Maharishi University of Management and Technology", students: 122 },
  { sno: 12, name: "Shri Shankracharya Professional University", students: 3512 },
  { sno: 13, name: "Bharti Vishwavidyalaya", students: 1826 },
  { sno: 14, name: "SHRI DAVARA UNIVERSITY", students: 2286 },
  { sno: 15, name: "Rungta International Skills Universityii", students: 2092 },
];

const StudentEnrolledReport = () => {
  // Calculate total dynamically
  const totalStudents = enrolmentData.reduce((sum, uni) => sum + uni.students, 0);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(enrolmentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = enrolmentData.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleJumpPage = (e) => {
    if (e.key === 'Enter') {
      let page = parseInt(jumpPage);
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
      else if (page > totalPages) setCurrentPage(totalPages);
      else if (page < 1) setCurrentPage(1);
      setJumpPage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
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
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Enrolment Report</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Total enrolled students per university</p>
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
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider w-24">SNo.</th>
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider">University Name</th>
                  <th className="py-4 px-6 text-xs font-bold text-blue-800 uppercase tracking-wider text-right w-48">No.Of Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((row) => (
                  <tr key={row.sno} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">{row.sno}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{row.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-700 text-right font-bold">{row.students}</td>
                  </tr>
                ))}
              </tbody>
              {/* Sticky Footer for Totals */}
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan="2" className="py-4 px-6 text-sm font-bold text-slate-800 text-center uppercase tracking-wider">
                    Total :-
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800 text-right">
                    {totalStudents}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
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

            <div className="text-sm text-slate-500 font-medium text-center">
              Showing <span className="font-semibold text-slate-700">{enrolmentData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, enrolmentData.length)}</span> of <span className="font-semibold text-slate-700">{enrolmentData.length}</span> entries
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-6">
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
                />
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
                <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center">
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

      </div>
    </div>
  );
};

export default StudentEnrolledReport;