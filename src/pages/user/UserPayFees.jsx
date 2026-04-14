import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, IndianRupee, AlertCircle, 
  Calendar, CheckCircle2, History, ChevronRight, 
  Download, ShieldCheck, X, ChevronDown, ChevronLeft, 
  Receipt, Landmark, FileText, Wallet, Trash2, Printer
} from 'lucide-react';

const UserLevyPayment = () => {
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
          <span className="text-slate-900 font-semibold tracking-tight">Levy Payment</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Levy Payment</span>
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
  const [selectedInvoice, setSelectedInvoice] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA ---
  const [duesRecords] = useState([
    { 
      id: 1, 
      feesMonth: "August 2024", 
      txnNo: "PU20250604061227103", 
      orderId: "order_Qd7fwVGVb8usz", 
      onePercent: 6392.50, 
      penalInterest: 862.99, 
      total: 7255.49, 
      attempts: 1, 
      status: "Paid", 
      dateTime: "04-06-2025 06:12:28 PM" 
    },
    { 
      id: 2, 
      feesMonth: "September 2024", 
      txnNo: "PU20250610113033869", 
      orderId: "order_QfalhEXVral6hg", 
      onePercent: 4089.95, 
      penalInterest: 490.79, 
      total: 4580.74, 
      attempts: 1, 
      status: "Pending", 
      dateTime: "10-06-2025 11:30:34 PM" 
    },
    { 
        id: 3, 
        feesMonth: "October 2024", 
        txnNo: "PU20250614052509211", 
        orderId: "order_Qh4Da89sKdziuT", 
        onePercent: 4197.45, 
        penalInterest: 503.69, 
        total: 4701.14, 
        attempts: 1, 
        status: "Paid", 
        dateTime: "14-06-2025 05:25:32 PM" 
      },
  ]);

  const totalRecords = duesRecords.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = duesRecords.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 font-sans relative">
      
      {/* 1. HEADER & BREADCRUMBS */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 rounded-[10px] outline-none"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
                <Landmark size={24} />
            </div>
            Payments Detail
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Official statement of institutional fee shares and interests.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[10px] text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all outline-none shadow-sm">
            <Printer size={16} /> Print Report
        </button>
      </div>

      {/* 2. DATA TABLE SECTION (EDUNUT UI) */}
      <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">S.No</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Fees Month</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction No</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Order Id</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">One Percent Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Penal Interest</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Attempts</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Date & Time / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.map((item, index) => (
                <tr key={item.id} className={`transition-colors group hover:bg-slate-50 ${selectedInvoice?.id === item.id ? 'bg-[#FF6900]/5' : ''}`}>
                  <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">{indexOfFirstItem + index + 1}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{item.feesMonth}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-500 font-mono tracking-tight">{item.txnNo}</td>
                  <td className="py-4 px-6 text-xs font-medium text-slate-500">{item.orderId}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-700">₹{item.onePercent.toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm font-bold text-red-500">₹{item.penalInterest.toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm font-black text-slate-900">₹{item.total.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-600 text-center">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-[10px] border border-slate-200">{item.attempts}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border uppercase tracking-wider ${
                      item.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {item.status === 'Paid' ? (
                        <div className="text-xs font-bold text-slate-500">{item.dateTime}</div>
                    ) : (
                        <button 
                          onClick={() => setSelectedInvoice(item)}
                          className="bg-slate-900 text-white px-5 py-2 rounded-[10px] text-xs font-bold shadow-md hover:shadow-lg hover:bg-[#FF6900] active:scale-95 transition-all outline-none"
                        >
                          Pay Now
                        </button>
                    )}
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-slate-500 font-medium">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PROFESSIONAL PAGINATION (Edunut Target Design) --- */}
        <div className="bg-white border-t border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center text-sm text-slate-600">
            <span className="font-bold mr-3">Total: {totalRecords}</span>
            
            <div className="relative inline-flex items-center dropdown-container">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-slate-50 font-bold cursor-pointer text-slate-700 outline-none"
              >
                {[5, 10, 15, 20, 50].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
            </div>
            
            <span className="ml-3 font-medium">items per page</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-600">
            
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

      {/* 3. DYNAMIC BILLING MANAGER (Triggered by Pay Now - Edunut Stylized) */}
      {selectedInvoice && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-[10px] shadow-lg overflow-hidden">
                {/* Bill Header (Dark Theme) */}
                <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-[10px]">
                      <Receipt size={20} className="text-[#FF6900]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Final Settlement Bill</h2>
                      <p className="text-xs text-slate-400 font-medium">Invoice Generated for Payment</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedInvoice(null)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-[10px] transition-colors outline-none"><X size={20}/></button>
                </div>
                
                {/* Bill Details */}
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-8 pb-6 border-b border-slate-100 mb-6">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Billing Period</p>
                          <p className="text-base font-bold text-slate-900">{selectedInvoice.feesMonth}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order Identifier</p>
                          <p className="text-sm font-bold text-slate-800 font-mono bg-slate-50 inline-block px-2 py-1 rounded-[10px] border border-slate-100">{selectedInvoice.orderId}</p>
                      </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                        <span className="text-sm font-bold text-slate-700">Base Government Levy (1%)</span>
                        <span className="text-lg font-bold text-slate-900">₹{selectedInvoice.onePercent.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-[10px]">
                        <div>
                            <span className="text-sm font-bold text-red-700 flex items-center gap-2">
                               Accumulated Penal Interest
                               <AlertCircle size={14} className="text-red-500"/>
                            </span>
                            <p className="text-xs text-red-500 font-medium mt-1">Computed as per financial master configuration</p>
                        </div>
                        <span className="text-lg font-bold text-red-700">+ ₹{selectedInvoice.penalInterest.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-end">
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-[10px] border border-emerald-100">
                      <ShieldCheck size={18} />
                      <span className="text-xs font-bold uppercase tracking-wider">Direct Treasury Transfer</span>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Grand Total Payable</p>
                       <p className="text-4xl font-black text-slate-900 tracking-tight">₹{selectedInvoice.total.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Authorization Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-[10px] p-6 h-full flex flex-col shadow-lg relative overflow-hidden">
                {/* Decorative background accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#FF6900]"></div>
                
                <div className="flex-1 mt-2">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Wallet size={18} className="text-[#FF6900]"/>
                    Payment Instruction
                  </h3>
                  
                  <div className="space-y-4">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-[10px]">
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            Once processed, the transaction cannot be reversed. Ensure all details including the <strong>Transaction Number</strong> match your internal records.
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm font-bold text-slate-700 p-4 border border-slate-100 rounded-[10px]">
                          <span>Processing Fee</span>
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[10px]">₹0.00</span>
                      </div>
                  </div>
                </div>

                <button className="w-full bg-[#FF6900] hover:bg-[#FF6900]/90 text-white py-4 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg transition-all mt-8 active:scale-95 flex items-center justify-center gap-2 outline-none">
                  <IndianRupee size={16} />
                  Authorize Payment
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default UserLevyPayment;