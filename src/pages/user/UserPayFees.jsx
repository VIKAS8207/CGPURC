import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, IndianRupee, AlertCircle, 
  Calendar, CheckCircle2, History, ChevronRight, 
  Download, ShieldCheck, X, ChevronDown, ChevronLeft, 
  Receipt, Landmark, FileText, Wallet, Trash2, Printer
} from 'lucide-react';

const UserLevyPayment = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [selectedInvoice, setSelectedInvoice] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA (Exact Match to Screenshot Fields) ---
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
  const currentItems = duesRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 font-sans">
      
      {/* 1. HEADER */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="mb-8 border-b border-slate-200 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg text-[#FF6900]">
                <Landmark size={24} />
            </div>
            Payments Detail
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Official statement of institutional fee shares and interests.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Printer size={16} /> Print Report
        </button>
      </div>

      {/* 2. DATA TABLE SECTION (EDUNAUT UI) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                <th className="py-4 px-4 w-12 text-center">SNo</th>
                <th className="py-4 px-4">Fees Month</th>
                <th className="py-4 px-4">Transaction No</th>
                <th className="py-4 px-4">Order Id</th>
                <th className="py-4 px-4">One Percent Amount</th>
                <th className="py-4 px-4">Penal Interest</th>
                <th className="py-4 px-4">Total Amount</th>
                <th className="py-4 px-4 text-center">Attempts</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Date & Time / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.map((item, index) => (
                <tr key={item.id} className={`transition-colors hover:bg-slate-50/50 ${selectedInvoice?.id === item.id ? 'bg-orange-50/30' : ''}`}>
                  <td className="py-5 px-4 text-xs font-bold text-slate-400 text-center">{index + 1}</td>
                  <td className="py-5 px-4 text-xs font-bold text-slate-700">{item.feesMonth}</td>
                  <td className="py-5 px-4 text-[11px] font-medium text-slate-500 font-mono tracking-tighter">{item.txnNo}</td>
                  <td className="py-5 px-4 text-[11px] text-slate-400">{item.orderId}</td>
                  <td className="py-5 px-4 text-xs font-bold text-slate-600">₹{item.onePercent.toFixed(2)}</td>
                  <td className="py-5 px-4 text-xs font-bold text-red-500">₹{item.penalInterest.toFixed(2)}</td>
                  <td className="py-5 px-4 text-xs font-black text-slate-900">₹{item.total.toLocaleString('en-IN')}</td>
                  <td className="py-5 px-4 text-xs font-bold text-slate-500 text-center">{item.attempts}</td>
                  <td className="py-5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase ${
                      item.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-right">
                    {item.status === 'Paid' ? (
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{item.dateTime}</div>
                    ) : (
                        <button 
                          onClick={() => setSelectedInvoice(item)}
                          className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#FF6900] transition-all shadow-sm"
                        >
                          Pay Now
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-4">
              <span>Items per page:</span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-slate-700">
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="bg-white border border-orange-200 rounded px-2 py-1 text-[#FF6900] outline-none">
                  {[...Array(totalPages)].map((_, i) => <option key={i+1} value={i+1}>Page {i+1}</option>)}
                </select>
                <span>of {totalPages}</span>
              </div>
              <div className="flex gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50"><ChevronLeft size={14}/></button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50"><ChevronRight size={14}/></button>
              </div>
           </div>
        </div>
      </div>

      {/* 3. DYNAMIC BILLING MANAGER (Triggered by Pay Now) */}
      {selectedInvoice && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-800 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Receipt size={18} className="text-[#FF6900]" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Final Settlement Bill</h2>
                  </div>
                  <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-white transition-colors"><X size={20}/></button>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-8 pb-6 border-b border-slate-100">
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Billing Period</p>
                          <p className="text-sm font-bold text-slate-900">{selectedInvoice.feesMonth}</p>
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Order Identifier</p>
                          <p className="text-sm font-bold text-slate-900">{selectedInvoice.orderId}</p>
                      </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-600">Base Government Levy (1%)</span>
                        <span className="text-sm font-bold text-slate-900">₹{selectedInvoice.onePercent.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-50 border border-red-100 rounded-xl">
                        <div>
                            <span className="text-sm font-bold text-red-700">Accumulated Penal Interest</span>
                            <p className="text-[9px] text-red-500 font-bold uppercase">Computed as per financial master configuration</p>
                        </div>
                        <span className="text-sm font-bold text-red-700">+ ₹{selectedInvoice.penalInterest.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <ShieldCheck size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Direct Treasury Transfer</span>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Grand Total Payable</p>
                       <p className="text-2xl font-black text-slate-900">₹{selectedInvoice.total.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full flex flex-col shadow-sm">
                <div className="flex-1">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Payment Instruction</h3>
                  <div className="space-y-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl">
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            Once processed, the transaction cannot be reversed. Ensure all details including the <strong>Transaction Number</strong> match your internal records.
                        </p>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 px-1">
                          <span>Processing Fee</span>
                          <span>₹0.00</span>
                      </div>
                  </div>
                </div>

                <button className="w-full bg-[#FF6900] hover:bg-slate-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-100 transition-all mt-8 active:scale-95 flex items-center justify-center gap-2">
                  <IndianRupee size={14} />
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