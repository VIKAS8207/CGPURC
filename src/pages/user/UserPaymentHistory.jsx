import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, History, Search, Filter, Download, 
  ChevronRight, ChevronLeft, ChevronDown, Eye,
  CreditCard, Calendar, CheckCircle2, XCircle, Clock
} from 'lucide-react';

const UserPaymentHistory = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA ---
  const [payments, setPayments] = useState([
    { id: "TXN-88201", date: "2026-04-10", type: "Annual Fee + 1% Levy", amount: "5,07,500", status: "Success", method: "Net Banking" },
    { id: "TXN-88195", date: "2026-03-12", type: "Late Penalty Payment", amount: "2,500", status: "Success", method: "UPI" },
    { id: "TXN-87550", date: "2025-10-05", type: "Semester processing Share", amount: "45,000", status: "Failed", method: "Card" },
    { id: "TXN-86400", date: "2025-04-20", type: "Annual Fee + 1% Levy", amount: "4,85,000", status: "Success", method: "Net Banking" },
    { id: "TXN-85122", date: "2024-04-15", type: "Annual Fee + 1% Levy", amount: "4,85,000", status: "Success", method: "Net Banking" },
  ]);

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
        <span className="text-slate-900 font-semibold">Payment History</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg text-[#FF6900]">
              <History size={24} />
            </div>
            Transaction History
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Detailed log of all financial settlements and government shares.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold text-sm">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* SEARCH & FILTER TOOLBAR */}
      <div className="bg-white p-4 rounded-t-3xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Transaction ID or Type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all text-sm font-medium"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-widest">
          <Filter size={16} /> Filter Results
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white border-x border-slate-200 overflow-hidden overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-y border-slate-200">
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-16">S.No</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction Info</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Payment Type</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="py-4 px-6 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-5 px-6 text-sm font-bold text-slate-400">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-5 px-6">
                  <div className="font-bold text-slate-800 text-sm">{payment.id}</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                    <Calendar size={12} /> {payment.date}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-xs font-bold text-slate-600">{payment.type}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{payment.method}</div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-sm font-black text-slate-900">₹ {payment.amount}</div>
                </td>
                <td className="py-5 px-6">
                  {payment.status === 'Success' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-md border border-emerald-100 uppercase tracking-wider">
                      <CheckCircle2 size={12} /> Successful
                    </span>
                  ) : payment.status === 'Failed' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-md border border-red-100 uppercase tracking-wider">
                      <XCircle size={12} /> Failed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-md border border-amber-100 uppercase tracking-wider">
                      <Clock size={12} /> Pending
                    </span>
                  )}
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-[#FF6900] hover:bg-orange-50 rounded-lg transition-all" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-[#FF6900] hover:bg-orange-50 rounded-lg transition-all" title="Download Receipt">
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- NEW EDUNAUT PAGINATION UI --- */}
      <div className="p-5 border-x border-b border-slate-200 rounded-b-3xl bg-white flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Items per page */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Records: {totalRecords}</span>
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">items / page</span>
        </div>

        {/* Right: Page Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-white border-2 border-orange-50 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-[#FF6900] outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF6900] transition-all cursor-pointer"
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i+1} value={i+1}>Page {i+1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6900] pointer-events-none" size={14} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">of {totalPages} pages</span>
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