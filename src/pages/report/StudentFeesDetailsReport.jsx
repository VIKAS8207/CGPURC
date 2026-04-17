import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Download, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const feesData = [
  { sno: 1, month: "August", year: 2024, amount: 639250 },
  { sno: 2, month: "September", year: 2024, amount: 408995 },
  { sno: 3, month: "October", year: 2024, amount: 419745 },
  { sno: 4, month: "November", year: 2024, amount: 481285 },
  { sno: 5, month: "December", year: 2024, amount: 476540 },
  { sno: 6, month: "January", year: 2025, amount: 133975 },
  { sno: 7, month: "February", year: 2025, amount: 297950 },
  { sno: 8, month: "March", year: 2025, amount: 602600 },
  { sno: 9, month: "April", year: 2025, amount: 392825 },
  { sno: 10, month: "May", year: 2025, amount: 632725 },
];

const StudentFeesDetailsReport = () => {
  // --- FILTER STATE ---
  const [selectedYear, setSelectedYear] = useState('All');

  // Extract unique years for the dropdown
  const availableYears = ['All', ...new Set(feesData.map(item => item.year))].sort();

  // Filter data based on selected year
  const filteredData = selectedYear === 'All' 
    ? feesData 
    : feesData.filter(item => item.year === parseInt(selectedYear));

  // Calculate total dynamically based on filtered data
  const totalFees = filteredData.reduce((sum, item) => sum + item.amount, 0);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

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
      <div className="max-w-4xl mx-auto space-y-6"> {/* max-w-4xl since it's a narrower table */}
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Link 
              to="/user/uploads" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Test University</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Students Fees Details</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* PERFECTLY ALIGNED YEAR FILTER */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 focus:outline-none transition-colors shadow-sm text-sm font-semibold cursor-pointer"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>
                    {year === 'All' ? 'All Years' : year}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-orange-600 transition-colors shadow-sm text-sm font-semibold whitespace-nowrap">
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/20 transition-all text-sm font-semibold whitespace-nowrap"
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
                <tr className="bg-[#fb923c] text-white"> {/* Mild Orange Header */}
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50 w-24">SNo</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50">Month</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50 w-32">Year</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide text-right w-48">Fees Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((row) => (
                  <tr key={row.sno} className="hover:bg-orange-50/50 transition-colors group">
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">{row.sno}</td>
                    <td className="py-4 px-6 text-sm font-bold text-orange-600 hover:text-orange-700 cursor-pointer transition-colors border-l border-r border-transparent group-hover:border-orange-100">{row.month}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{row.year}</td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-700 text-right">{row.amount}</td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-sm text-slate-500">
                      No records found for the selected year.
                    </td>
                  </tr>
                )}
              </tbody>
              {/* Sticky Footer for Totals */}
              <tfoot className="bg-orange-50/80 border-t-2 border-orange-200">
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-sm font-bold text-slate-800 text-right tracking-wider">
                    Total :-
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800 text-right">
                    {totalFees}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Rows per page:</span>
              <select 
                value={itemsPerPage} 
                onChange={handleRowsChange}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-1.5 outline-none shadow-sm transition-all font-medium cursor-pointer hover:border-slate-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="text-sm text-slate-500 font-medium text-center">
              Showing <span className="font-semibold text-slate-700">{filteredData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="font-semibold text-slate-700">{filteredData.length}</span> entries
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
                <input 
                  type="number" 
                  min="1" 
                  max={totalPages || 1}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  onKeyDown={handleJumpPage}
                  disabled={totalPages === 0}
                  className="w-16 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-1.5 text-center outline-none shadow-sm transition-all font-medium placeholder:text-slate-400 hover:border-slate-300 disabled:opacity-50"
                  placeholder="Pg"
                />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || totalPages === 0}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === 1 || totalPages === 0 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center whitespace-nowrap">
                  <span className="font-bold text-slate-800">{totalPages === 0 ? 0 : currentPage}</span> / {totalPages}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === totalPages || totalPages === 0 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
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

export default StudentFeesDetailsReport;