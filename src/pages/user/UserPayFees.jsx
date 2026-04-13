import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, IndianRupee, AlertCircle, 
  Calendar, CheckCircle2, History, ChevronRight, 
  Download, ExternalLink, ShieldCheck, X
} from 'lucide-react';

const UserPayFees = () => {
  const navigate = useNavigate();
  
  // --- MOCK DATA ---
  const [invoice, setInvoice] = useState({
    id: "INV-2026-04-001",
    baseAmount: 500000, // ₹ 5,00,000
    dueDate: "2026-04-20", // Adjust this to test penalty logic
    isPaid: false
  });

  // --- LOGIC CALCULATIONS ---
  const govSharePercentage = 0.01; // 1% Rule
  const govShareAmount = invoice.baseAmount * govSharePercentage;
  
  // Penalty Logic: Check if current date is past due date
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  const isOverdue = today > dueDate;
  const penaltyAmount = isOverdue ? 2500 : 0; // Flat penalty for late payment
  
  const grandTotal = invoice.baseAmount + govShareAmount + penaltyAmount;

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumb Path */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Institutional Fee Payment</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-lg text-[#FF6900]">
            <IndianRupee size={24} />
          </div>
          Payment & Levy Portal
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Clear your institutional dues and processing shares securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PAYMENT BREAKDOWN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-8 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <CreditCard size={18} className="text-[#FF6900]" />
                Invoice Details
              </h2>
              <span className="text-xs font-bold text-slate-400">ID: {invoice.id}</span>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                
                {/* Base Fee */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Base Institutional Fee</p>
                    <p className="text-xs text-slate-500">Accumulated course enrollment fees</p>
                  </div>
                  <p className="text-lg font-black text-slate-900">₹ {invoice.baseAmount.toLocaleString('en-IN')}</p>
                </div>

                {/* 1% Government Rule */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6900] shrink-0 border border-orange-100">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Govt. Processing Share (1%)</p>
                      <p className="text-xs text-slate-400 italic">Calculated based on the 1% regulatory rule</p>
                    </div>
                  </div>
                  <p className="text-lg font-black text-[#FF6900]">₹ {govShareAmount.toLocaleString('en-IN')}</p>
                </div>

                {/* Overdue Penalty (Conditional) */}
                {isOverdue && (
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-2xl border border-red-100 animate-pulse">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-red-500" size={20} />
                      <div>
                        <p className="text-sm font-bold text-red-700">Late Payment Penalty</p>
                        <p className="text-[10px] text-red-500 font-bold uppercase">Overdue since {invoice.dueDate}</p>
                      </div>
                    </div>
                    <p className="text-lg font-black text-red-600">+ ₹ {penaltyAmount.toLocaleString('en-IN')}</p>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* SECURITY NOTICE */}
          <div className="bg-[#FF6900]/5 border border-[#FF6900]/10 rounded-2xl p-6 flex items-start gap-4">
             <div className="p-3 bg-white rounded-xl shadow-sm">
                <ShieldCheck size={24} className="text-emerald-500" />
             </div>
             <div>
                <h4 className="text-sm font-bold text-slate-800">Secure Payment Gateway</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your transaction is protected by end-to-end 256-bit encryption. Payment will be routed directly to the Central Institutional Fund.
                </p>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY & PAY BUTTON */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-8 shadow-xl shadow-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Payment Summary</h3>
            
            <div className="space-y-4 mb-10">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-bold">₹ {(invoice.baseAmount + govShareAmount).toLocaleString('en-IN')}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Tax / Penalty</span>
                  <span className="font-bold text-red-400">₹ {penaltyAmount.toLocaleString('en-IN')}</span>
               </div>
               <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-bold">Grand Total</span>
                  <span className="text-2xl font-black text-[#FF6900]">₹ {grandTotal.toLocaleString('en-IN')}</span>
               </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                className="w-full bg-[#FF6900] hover:bg-[#e65f00] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-900/20 active:scale-95 transition-all"
              >
                Pay Full Amount Now
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-2">
                By clicking Pay Now, you agree to the institutional billing terms.
              </p>
            </div>
          </div>

          {/* DATE WARNING BOX */}
          <div className={`mt-6 p-5 rounded-2xl border flex items-center gap-4 ${isOverdue ? 'bg-red-50 border-red-100 text-red-700' : 'bg-orange-50 border-orange-100 text-orange-700'}`}>
            <Calendar size={20} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Payment Due Date</p>
              <p className="text-sm font-bold">{invoice.dueDate}</p>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      <div className="mt-12 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <History size={20} className="text-slate-400" />
            Transaction History
          </h3>
          <button className="text-xs font-bold text-[#FF6900] hover:underline">View All Records</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-8">Transaction ID</th>
                <th className="py-4 px-8">Date</th>
                <th className="py-4 px-8">Amount</th>
                <th className="py-4 px-8">Status</th>
                <th className="py-4 px-8 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-8 text-sm font-bold text-slate-700">TXN-49201044</td>
                <td className="py-4 px-8 text-xs font-medium text-slate-500">12 Mar 2026</td>
                <td className="py-4 px-8 text-sm font-black text-slate-800">₹ 2,45,000</td>
                <td className="py-4 px-8">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100">SUCCESS</span>
                </td>
                <td className="py-4 px-8 text-right">
                  <button className="p-2 text-slate-400 hover:text-[#FF6900] transition-colors"><Download size={18} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserPayFees;