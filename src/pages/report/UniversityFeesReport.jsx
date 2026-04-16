import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const feeData = [
  { sno: 1, name: "AAFT University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '134254', 'Oct-2025': '27964', 'Nov-2025': '48214', 'Dec-2025': '-' }, total: '210432' },
  { sno: 2, name: "Amity University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '1501', 'Oct-2025': '16005', 'Nov-2025': '1888', 'Dec-2025': '-' }, total: '19394' },
  { sno: 3, name: "Anjaneya University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '12647', 'Oct-2025': '33912', 'Nov-2025': '7815', 'Dec-2025': '8064' }, total: '62438' },
  { sno: 4, name: "Bharti Vishwavidyalaya", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '18283', 'Oct-2025': '19188', 'Nov-2025': '30126', 'Dec-2025': '15136' }, total: '82733' },
  { sno: 5, name: "K K Modi University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '-', 'Oct-2025': '24590', 'Nov-2025': '-', 'Dec-2025': '-' }, total: '24590' },
  { sno: 6, name: "Kalinga University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '87042', 'Oct-2025': '181337', 'Nov-2025': '186396', 'Dec-2025': '125292' }, total: '580067' },
  { sno: 7, name: "Maharishi University of Management and Technology", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '2170', 'Oct-2025': '847', 'Nov-2025': '612', 'Dec-2025': '1255' }, total: '4884' },
  { sno: 8, name: "MATS University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '142815', 'Oct-2025': '197438', 'Nov-2025': '93266', 'Dec-2025': '43656' }, total: '477175' },
  { sno: 9, name: "Rungta International Skills Universityii", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '68028', 'Sep-2025': '224253', 'Oct-2025': '118398', 'Nov-2025': '136354', 'Dec-2025': '21071' }, total: '568104' },
  { sno: 10, name: "Shri Rawatpura Sarkar University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '178202', 'Oct-2025': '399292', 'Nov-2025': '389349', 'Dec-2025': '67926' }, total: '1034769' },
  { sno: 11, name: "Shri Shankracharya Professional University", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '124013', 'Oct-2025': '132844', 'Nov-2025': '240041', 'Dec-2025': '162875' }, total: '659773' },
  { sno: 12, name: "The ICFAI University Raipur", months: { 'Jan-2025': '-', 'Feb-2025': '-', 'Mar-2025': '-', 'Apr-2025': '-', 'May-2025': '-', 'Jun-2025': '-', 'Jul-2025': '-', 'Aug-2025': '-', 'Sep-2025': '-', 'Oct-2025': '5867', 'Nov-2025': '41942', 'Dec-2025': '-' }, total: '47809' },
];

const monthColumns = ['Jan-2025', 'Feb-2025', 'Mar-2025', 'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025'];

const UniversityFeesReport = () => {
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(feeData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feeData.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="w-full mx-auto space-y-6">
        
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
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">University 1% Fees Report</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Month-wise fee collection overview</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm text-sm font-semibold whitespace-nowrap">
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 transition-all text-sm font-semibold whitespace-nowrap"
            >
              <Printer size={16} />
              Print Report
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-[#fcf8e3] border-b border-[#f3ebbd]">
                  <th className="py-4 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap sticky left-0 z-10 bg-[#fcf8e3] border-r border-[#f3ebbd]">S.No.</th>
                  <th className="py-4 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap sticky left-[60px] z-10 bg-[#fcf8e3] border-r border-[#f3ebbd]">University Name</th>
                  {monthColumns.map(month => (
                    <th key={month} className="py-4 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap text-right">
                      {month.split('-')[0]}<br/>{month.split('-')[1]}
                    </th>
                  ))}
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap text-right border-l border-[#f3ebbd]">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((row) => (
                  <tr key={row.sno} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-4 text-sm font-medium text-slate-500 whitespace-nowrap sticky left-0 z-10 bg-white group-hover:bg-slate-50/80 border-r border-slate-100">{row.sno}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap sticky left-[60px] z-10 bg-white group-hover:bg-slate-50/80 border-r border-slate-100">{row.name}</td>
                    {monthColumns.map(month => (
                      <td key={month} className="py-4 px-4 text-sm text-slate-600 whitespace-nowrap text-right">
                        {row.months[month]}
                      </td>
                    ))}
                    <td className="py-4 px-6 text-sm text-slate-700 font-bold whitespace-nowrap text-right border-l border-slate-100">{row.total}</td>
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
              Showing <span className="font-semibold text-slate-700">{feeData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, feeData.length)}</span> of <span className="font-semibold text-slate-700">{feeData.length}</span> entries
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
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

export default UniversityFeesReport;