import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data covering the requested fields
const bearerData = [
  { id: 1, name: "Dr. Rajesh Kumar", designation: "Vice Chancellor", email: "vc@university.edu", phone: "+91 9876543210", hasPicture: true },
  { id: 2, name: "Prof. Amit Sharma", designation: "Registrar", email: "registrar@university.edu", phone: "+91 9876543211", hasPicture: false },
  { id: 3, name: "Dr. Neha Verma", designation: "Dean of Academics", email: "dean.academics@university.edu", phone: "+91 9876543212", hasPicture: true },
];

const OfficeBearerReport = () => {
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(bearerData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bearerData.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleRowsChange = (e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); };
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
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 print:hidden">
          <Link 
            to="/user/uploads" 
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-[#f05a28] hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Office Bearers</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Manage key personnel and university officials</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Top Action Bar */}
          <div className="p-6 border-b border-slate-100">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#f05a28] text-white rounded hover:bg-[#d94d20] transition-colors shadow-sm font-bold tracking-wide text-sm">
              ADD NEW BEARER
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="border-b border-slate-300 bg-white">
                  <th className="py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider w-16">#</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider w-80">Name / Designation</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">Other Details</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider text-center w-32">Picture</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider text-center w-32">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-6 text-sm font-medium text-slate-500 align-top">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="py-4 px-6 align-top">
                        <div className="text-sm font-bold text-slate-800">{row.name}</div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{row.designation}</div>
                      </td>
                      <td className="py-4 px-6 align-top">
                        <div className="text-sm text-slate-600 font-medium">{row.email}</div>
                        <div className="text-sm text-slate-500 mt-1">{row.phone}</div>
                      </td>
                      <td className="py-4 px-6 text-center align-middle">
                        {row.hasPicture ? (
                          <img src={`https://ui-avatars.com/api/?name=${row.name.replace(/ /g, '+')}&background=f05a28&color=fff`} alt="profile" className="w-10 h-10 rounded-full mx-auto shadow-sm" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center align-middle">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-slate-400 hover:text-blue-600 transition-colors p-1" title="Edit">
                            <Edit size={18} strokeWidth={2.5} />
                          </button>
                          <button className="text-slate-400 hover:text-red-600 transition-colors p-1" title="Delete">
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">No office bearers found. Click "ADD NEW BEARER" to create one.</td>
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
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#f05a28] focus:border-[#f05a28] block p-1.5 outline-none shadow-sm transition-all font-medium cursor-pointer hover:border-slate-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="text-sm text-slate-500 font-medium text-center">
              Showing <span className="font-semibold text-slate-700">{bearerData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, bearerData.length)}</span> of <span className="font-semibold text-slate-700">{bearerData.length}</span> entries
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
                  className="w-16 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#f05a28] focus:border-[#f05a28] block p-1.5 text-center outline-none shadow-sm transition-all font-medium placeholder:text-slate-400 hover:border-slate-300"
                  placeholder="Pg"
                />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === 1 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-[#f05a28] shadow-sm'
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
                    currentPage === totalPages ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-[#f05a28] shadow-sm'
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

export default OfficeBearerReport;