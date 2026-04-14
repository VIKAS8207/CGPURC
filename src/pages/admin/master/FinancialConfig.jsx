import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Landmark, Save, History, 
  User, Percent, ShieldCheck, BellRing, X, ChevronRight, AlertCircle
} from 'lucide-react';

const FinancialConfig = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to dynamically generate breadcrumbs based on the current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    
    // Fallback if not accessed through a standard routing path
    if (paths.length === 0) {
      return (
        <>
          <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Tax Deduction Percentage</span>
        </>
      );
    }

    return paths.map((path, index) => {
      const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
      const isLast = index === paths.length - 1;
      
      // Format the path string for display
      const displayName = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      return (
        <React.Fragment key={routeTo}>
          {isLast ? (
             <span className="text-slate-900 font-semibold tracking-tight">Tax Deduction Percentage</span>
          ) : (
             <>
               <Link to={routeTo} className="hover:text-[#155DFC] transition-colors">{displayName}</Link>
               <ChevronRight size={14} className="text-slate-400" />
             </>
          )}
        </React.Fragment>
      );
    });
  };

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
        changedBy: "Current Admin", 
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
    }, 800); 
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative">
      
      {/* SUCCESS NOTIFICATION TOAST (Edunut UI) */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] shrink-0 text-[#155DFC]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Configuration Saved</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                The Tax Deduction Percentage has been securely updated to <strong className="text-slate-700">{parseFloat(levyRate).toFixed(2)}%</strong>. This change has been logged.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-4 rounded-[10px] outline-none"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Dynamic Breadcrumb Path */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
         {generateBreadcrumbs()}
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#155DFC]/10 rounded-[10px] text-[#155DFC]">
            <Landmark size={24} />
          </div>
          Tax Deduction Percentage
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Manage global financial parameters, levies, and profit-sharing rates.</p>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: THE SETTINGS FORM (Edunut UI) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Percent className="text-slate-400" size={18} />
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Tax & Levies</h2>
            </div>
            
            <form onSubmit={handleSave} className="p-8">
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Government Profit Share Levy (%)
                </label>
                
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    max="100"
                    value={levyRate}
                    onChange={(e) => setLevyRate(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-bold text-slate-900 text-lg"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    %
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                  This percentage will be automatically deducted from all processed university application fees.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-[#155DFC] hover:bg-[#155DFC]/90 text-white px-6 py-3 rounded-[10px] font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
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
          
          {/* Info Card (Amber Compliance Notice Style) */}
          <div className="p-6 bg-amber-50 border border-amber-100 rounded-[10px] flex items-start gap-4 shadow-sm">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900 tracking-tight">Security Notice</h3>
              <p className="text-xs text-amber-700 font-medium leading-relaxed mt-1">
                Modifying financial parameters takes effect immediately on all new transactions. All changes are permanently recorded in the system audit log and cannot be deleted.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE AUDIT TRAIL TABLE (Edunut UI) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden flex flex-col h-full">
            
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 tracking-tight text-lg">
                <History className="text-slate-400" size={18} />
                Audit Trail: Profit Share Levy
              </h3>
              <span className="text-xs font-bold text-[#155DFC] bg-[#155DFC]/10 px-3 py-1 rounded-[10px] border border-[#155DFC]/20 uppercase tracking-wider">
                Strict Tracking
              </span>
            </div>
            
            <div className="overflow-x-auto flex-1 min-h-[300px]">
              {auditLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16">
                  <p className="text-slate-500 text-sm font-medium">No historical changes found.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200">
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">S.No</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Modification</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Changed By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log, index) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-4 px-6 text-sm font-bold text-slate-600">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800 text-sm">{log.date}</div>
                          <div className="text-xs font-medium text-slate-500 mt-0.5">{log.time}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-400 line-through decoration-slate-300">{log.oldValue}</span>
                            <ArrowRight size={14} className="text-[#155DFC]" />
                            <span className="text-sm font-bold text-[#155DFC] bg-[#155DFC]/10 px-2.5 py-1 rounded-[10px] border border-[#155DFC]/20">
                              {log.newValue}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-[10px] bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#155DFC] group-hover:text-white transition-all shadow-sm">
                              <User size={14} />
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