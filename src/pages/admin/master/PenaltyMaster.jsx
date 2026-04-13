import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Gavel, Save, History, 
  User, Percent, ShieldCheck, X, ChevronRight, AlertCircle 
} from 'lucide-react';

const PenaltyMaster = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [penaltyRate, setPenaltyRate] = useState("2.50"); // Default percentage
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Mock Audit Trail Data
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      oldValue: "2.00%",
      newValue: "2.50%",
      changedBy: "Admin Vikas",
      role: "System Administrator",
      date: "13-Apr-2026",
      time: "02:15 PM"
    },
    {
      id: 2,
      oldValue: "1.00%",
      newValue: "2.00%",
      changedBy: "Finance Dept",
      role: "Financial Controller",
      date: "01-Jan-2026",
      time: "09:00 AM"
    }
  ]);

  // --- HANDLER ---
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API delay
    setTimeout(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-');
      const formattedTime = today.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});

      const newLog = {
        id: Date.now(),
        oldValue: auditLogs[0].newValue,
        newValue: `${parseFloat(penaltyRate).toFixed(2)}%`,
        changedBy: "Super Admin", // Current user context
        role: "System Administrator",
        date: formattedDate,
        time: formattedTime
      };

      setAuditLogs([newLog, ...auditLogs]);
      setIsSaving(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10">
      
      {/* TOAST NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-2xl rounded-xl p-4 flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]"><ShieldCheck size={20} /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Penalty Rate Updated</h3>
              <p className="text-xs text-slate-500 mt-1">The new rate has been applied and logged in the system registry.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-[#155DFC] transition-colors mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC]">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Penalty Master Configuration</span>
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]"><Gavel size={24} /></div>
          Penalty Master Settings
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Define the percentage applied to institutional fee defaults after the due date.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SETTINGS CARD */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Percent size={18} className="text-slate-400" />
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-widest">Rate Configuration</h2>
            </div>
            
            <form onSubmit={handleSave} className="p-8">
              <div className="mb-8">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Penalty Percentage (%)</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    step="0.01"
                    value={penaltyRate}
                    onChange={(e) => setPenaltyRate(e.target.value)}
                    className="w-full pl-6 pr-14 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#155DFC]/10 focus:border-[#155DFC] transition-all font-black text-slate-900 text-3xl shadow-inner"
                    required
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl group-focus-within:text-[#155DFC] transition-colors">%</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic font-medium">
                  Note: This rate will be automatically added to the One Percent Levy amount for any "Pending" status records past their due date.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                {isSaving ? (
                   <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <><Save size={16} /> Update Master Rate</>
                )}
              </button>
            </form>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
              <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Regulatory Impact</h4>
                  <p className="text-[11px] text-amber-700 font-medium leading-relaxed mt-1">
                      Changing this master rate will update all current unpaid bills. This action is recorded in the permanent state audit log.
                  </p>
              </div>
          </div>
        </div>

        {/* AUDIT LOG SECTION */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="text-slate-400" size={18} />
                <h2 className="text-xs font-black text-slate-700 uppercase tracking-widest">Rate Change History</h2>
              </div>
              <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md uppercase tracking-tighter">Audit Registry</span>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                    <th className="py-4 px-8">Modification Date</th>
                    <th className="py-4 px-8">Rate Change</th>
                    <th className="py-4 px-8">Authorized By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-5 px-8">
                        <div className="text-sm font-bold text-slate-800">{log.date}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{log.time}</div>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-400 line-through">{log.oldValue}</span>
                          <ArrowRight size={14} className="text-[#155DFC]" />
                          <span className="text-xs font-black text-[#155DFC] bg-[#155DFC]/5 px-2.5 py-1 rounded-lg border border-[#155DFC]/10">
                            {log.newValue}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#155DFC] group-hover:text-white transition-all shadow-inner">
                            <User size={14} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{log.changedBy}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log.role}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PenaltyMaster;