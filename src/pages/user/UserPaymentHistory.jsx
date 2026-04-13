import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, History, Search, Filter, Download, 
  ChevronRight, ChevronLeft, ChevronDown, Eye,
  Calendar, CheckCircle2, XCircle, Clock
} from 'lucide-react';

const UserPaymentHistory = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    status: i === 2 ? "Failed" : "Paid", // Just to show variety
    dateTime: "04-06-2025 06:12:28 PM"
  })));

  // --- PAGINATION LOGIC ---
  const totalRecords = payments.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Detailed Payment History</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg text-[#FF6900]">
              <History size={24} />
            </div>
            Payments Detail
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Comprehensive audit of all fee transactions and penal interests.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold text-sm">
          <Download size={18} /> Download Statement
        </button>
      </div>

      {/* SEARCH TOOLBAR */}
      <div className="bg-white p-4 rounded-t-3xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Transaction or Order ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all text-sm font-medium"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-widest">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* DETAILED TABLE SECTION */}
      <div className="bg-white border-x border-slate-200 overflow-hidden overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-slate-50/80 border-y border-slate-200">
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-12 text-center">SNo</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fees Month</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction No</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Order Id</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">One % Amount</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Penal Interest</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Amount</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Attempts</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-4 text-xs font-bold text-slate-400 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-4 text-xs font-semibold text-slate-700">{payment.feesMonth}</td>
                <td className="py-4 px-4 text-xs font-medium text-slate-500 font-mono tracking-tight">{payment.transactionNo}</td>
                <td className="py-4 px-4 text-xs font-medium text-slate-400">{payment.orderId}</td>
                <td className="py-4 px-4 text-xs font-bold text-slate-600">₹ {payment.onePercentAmount}</td>
                <td className="py-4 px-4 text-xs font-bold text-slate-600">₹ {payment.penalInterest}</td>
                <td className="py-4 px-4 text-xs font-black text-[#FF6900]">₹ {payment.totalAmount}</td>
                <td className="py-4 px-4 text-xs font-bold text-slate-500 text-center">{payment.attempts}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-[9px] font-black border uppercase tracking-wider ${
                    payment.status === 'Paid' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-[10px] font-bold text-slate-500 whitespace-nowrap">{payment.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- NEW EDUNAUT PAGINATION UI --- */}
      <div className="p-5 border-x border-b border-slate-200 rounded-b-3xl bg-white flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Items per page */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total: {totalRecords}</span>
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          <div className="relative">
            <select 
              value={itemsPerPage}
              onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF6900] transition-all cursor-pointer shadow-inner"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6900] pointer-events-none" size={14} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">items per page</span>
        </div>

        {/* Right: Page Navigation Dropdown & Arrows */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-white border-2 border-orange-50 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-[#FF6900] outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF6900] transition-all cursor-pointer"
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6900] pointer-events-none" size={14} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">of {totalPages} pages</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-[#FF6900] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-[#FF6900] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserPaymentHistory;