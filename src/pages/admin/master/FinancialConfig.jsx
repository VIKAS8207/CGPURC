import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Landmark, Save, History, 
  User, Percent, ShieldCheck, BellRing, X, ChevronRight
} from 'lucide-react';

const FinancialConfig = () => {
  const navigate = useNavigate();
  // --- STATES ---
  const [levyRate, setLevyRate] = useState("1.0");
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Mock Audit Trail Data (Usually fetched from your database)
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      oldValue: "0.5%",
      newValue: "1.0%",
      changedBy: "Super Admin User",
      role: "System Administrator",
      date: "01-Apr-2026",
      time: "10:45 AM"
    },
    {
      id: 2,
      oldValue: "0.0%",
      newValue: "0.5%",
      changedBy: "System Setup",
      role: "Automated",
      date: "15-Jan-2026",
      time: "08:00 AM"
    }
  ]);

  // --- HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API Call
    setTimeout(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-');
      const formattedTime = currentDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});

      // Create new audit log entry
      const newLog = {
        id: Date.now(),
        oldValue: auditLogs.length > 0 ? auditLogs[0].newValue : "0.0%",
        newValue: `${parseFloat(levyRate).toFixed(2)}%`,
        changedBy: "Current Admin", // In a real app, get from Context/Redux
        role: "Financial Controller",
        date: formattedDate,
        time: formattedTime
      };

      // Update state
      setAuditLogs([newLog, ...auditLogs]);
      setIsSaving(false);
      setShowNotification(true);

      // Auto-hide toast
      setTimeout(() => setShowNotification(false), 5000);
    }, 800); // 800ms fake delay for button loading effect
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg shrink-0">
              <ShieldCheck className="text-[#155DFC]" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Configuration Saved</h3>
              <p className="text-sm text-slate-600 mt-1">
                The Government Profit Share Levy has been securely updated to <strong>{parseFloat(levyRate).toFixed(2)}%</strong>. This change has been logged.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumb Path */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Financial Config</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#155DFC]/10 rounded-lg">
            <Landmark className="text-[#155DFC]" size={24} />
          </div>
          Financial Configuration
        </h1>
        <p className="text-slate-500 mt-2">Manage global financial parameters, levies, and profit-sharing rates.</p>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: THE SETTINGS FORM */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <Percent className="text-slate-400" size={18} />
              <h2 className="text-lg font-bold text-slate-800">Tax & Levies</h2>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Government Profit Share Levy (%)
                </label>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  This percentage will be automatically deducted from all processed university application fees.
                </p>
                
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    max="100"
                    value={levyRate}
                    onChange={(e) => setLevyRate(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-bold text-slate-900 text-lg"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    %
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Save size={18} /> Save Configuration
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Info Card */}
          <div className="bg-[#155DFC]/5 border border-[#155DFC]/20 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#155DFC] flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-[#155DFC]" /> Security Notice
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modifying financial parameters takes effect immediately on all new transactions. All changes are permanently recorded in the system audit log and cannot be deleted.
            </p>
          </div>
        </div>


        {/* RIGHT COLUMN: THE AUDIT TRAIL TABLE */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="text-slate-400" size={18} />
                <h2 className="text-lg font-bold text-slate-800">Audit Trail: Profit Share Levy</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-md">
                Strict Tracking
              </span>
            </div>
            
            <div className="overflow-x-auto flex-1">
              {auditLogs.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-500 text-sm font-medium">No historical changes found.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Modification</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Changed By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800 text-sm">{log.date}</div>
                          <div className="text-xs font-medium text-slate-500 mt-0.5">{log.time}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-semibold text-slate-400 line-through">{log.oldValue}</span>
                            <ArrowRight size={14} className="text-[#155DFC]" />
                            <span className="text-sm font-bold text-[#155DFC] bg-[#155DFC]/10 px-2 py-0.5 rounded border border-[#155DFC]/20">
                              {log.newValue}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg shrink-0 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all">
                              <User size={14} className="text-slate-500" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{log.changedBy}</p>
                              <p className="text-xs font-medium text-slate-500 mt-0.5">{log.role}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinancialConfig;