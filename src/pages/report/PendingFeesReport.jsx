import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const pendingFilesData = [
  { sno: 1, name: "AAFT University", filename: "AAFT_9_05_09_25_100854.xlsx", date: "05-09-2025 10:08:54 AM" },
  { sno: 2, name: "Shri Rawatpura Sarkar University", filename: "SRPS_10_08_09_25_103621.xlsx", date: "08-09-2025 10:36:21 AM" },
  { sno: 3, name: "Shri Shankracharya Professional University", filename: "SSP_14_12_08_25_165446.xlsx", date: "12-08-2025 04:54:46 PM" },
  { sno: 4, name: "Anjaneya University", filename: "AJNY_16_02_09_25_152322.xlsx", date: "02-09-2025 03:23:22 PM" },
  { sno: 5, name: "Anjaneya University", filename: "AJNY_16_02_09_25_152815.xlsx", date: "02-09-2025 03:28:15 PM" },
];

const PendingFeesReport = () => {
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- CALCS ---
  const totalPages = Math.ceil(pendingFilesData.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingFilesData.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin-dashboard" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pending Fees Files</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Manage and review uploaded fee data files</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 transition-all text-sm font-semibold whitespace-nowrap"
            >
              <Printer size={16} />
              Print List
            </button>
          </div>
        </div>

        {/* Table Container - Edunut UI Design */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white print:bg-slate-100 print:text-black border-b border-blue-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-20">SNo</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">University Name</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">File Name</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">Uploaded Date</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center w-24">Download</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center w-24">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((row) => (
                  <tr key={row.sno} className="hover:bg-blue-50/50 transition-colors group bg-white">
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">{row.sno}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{row.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{row.filename}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 whitespace-nowrap">{row.date}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors inline-flex items-center justify-center">
                        <Download size={20} strokeWidth={2.5} />
                      </button>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors inline-flex items-center justify-center">
                        <Trash2 size={20} strokeWidth={2.5} />
                      </button>
                    </td>
                  </tr>
                ))}
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
              Showing <span className="font-semibold text-slate-700">{pendingFilesData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, pendingFilesData.length)}</span> of <span className="font-semibold text-slate-700">{pendingFilesData.length}</span> entries
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
                  {/* Custom aligned arrow icon */}
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

      </div>
    </div>
  );
};

export default PendingFeesReport;