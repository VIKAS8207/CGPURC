import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, History, Search, Filter, Download, 
  ChevronRight, ChevronLeft, ChevronDown, Eye,
  Calendar, CheckCircle2, XCircle, Clock
} from 'lucide-react';

const UserPaymentHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Detailed Payment History</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Detailed Payment History</span>
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

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(null); // Used for Filter Dropdown
  const [statusFilter, setStatusFilter] = useState("All");

  // Handle clicking outside to close any open dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- GENERATING 45 ROWS OF DATA BASED ON SCREENSHOT ---
  const [payments] = useState(Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    feesMonth: i % 2 === 0 ? "August 2024" : "September 2024",
    transactionNo: `PU2025060406122${7100 + i}`,
    orderId: `order_Qd7fwVGVb8us${i}`,
    onePercentAmount: (6000 + i * 10.5).toFixed(2),
    penalInterest: (800 + i * 2.2).toFixed(2),
    totalAmount: (7000 + i * 12).toLocaleString('en-IN'),
    attempts: "1",
    status: i % 5 === 2 ? "Failed" : "Paid", // Just to show variety
    dateTime: "04-06-2025 06:12:28 PM"
  })));

  // --- FILTERING & PAGINATION LOGIC ---
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.transactionNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          payment.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' || payment.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRecords = filteredPayments.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative">
      
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

      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <History size={24} />
            </div>
            Payments Detail
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Comprehensive audit of all fee transactions and penal interests.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-[10px] transition-all shadow-sm font-bold text-sm outline-none">
          <Download size={18} /> Download Statement
        </button>
      </div>

      {/* TABLE TOOLBAR (Edunut UI - Orange) */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Transaction or Order ID..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
        
        {/* EDUNUT FILTER DROPDOWN */}
        <div className="relative dropdown-container">
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'filter' ? null : 'filter')}
            className="flex items-center gap-2 text-slate-600 bg-white shadow-sm border-none px-4 py-2.5 rounded-[10px] hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-all text-sm font-bold w-full sm:w-auto justify-center outline-none"
          >
            <Filter size={18} />
            {statusFilter === 'All' ? 'Filter' : statusFilter}
            <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'filter' ? 'rotate-180 text-[#FF6900]' : ''}`} />
          </button>

          {openDropdown === 'filter' && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border-none">
              {['All', 'Paid', 'Failed'].map(status => (
                <button
                  key={status}
                  onClick={() => { setStatusFilter(status); setOpenDropdown(null); setCurrentPage(1); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors outline-none ${statusFilter === status ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900]'}`}
                >
                  {status === 'All' ? 'All Statuses' : status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DATA TABLE (Edunut UI) */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Fees Month</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Order Id</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">One % Amount</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Penal Interest</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Attempts</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-800">{payment.feesMonth}</td>
                <td className="py-4 px-6 text-xs font-bold text-slate-500 font-mono tracking-tight">{payment.transactionNo}</td>
                <td className="py-4 px-6 text-xs font-medium text-slate-500">{payment.orderId}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700">₹{payment.onePercentAmount}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700">₹{payment.penalInterest}</td>
                <td className="py-4 px-6 text-sm font-black text-[#FF6900]">₹{payment.totalAmount}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-[10px] border border-slate-200">{payment.attempts}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border uppercase tracking-wider ${
                    payment.status === 'Paid' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs font-bold text-slate-500 text-right whitespace-nowrap">{payment.dateTime}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="10" className="py-8 text-center text-slate-500 font-medium">
                  No payment records found matching your search.
                </td>
              </tr>
            )}
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
              {[10, 20, 30, 50].map(num => (
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

export default UserPaymentHistory;