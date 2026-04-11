import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, CalendarClock, Save, History, 
  User, Clock, Calendar, ShieldCheck, BellRing, X, CheckCircle2
} from 'lucide-react';

const DueDateConfig = () => {
  // --- STATES ---
  // Default to a future date for the mockup
  const [dueDate, setDueDate] = useState("2026-05-15");
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Helper to format dates for display
  const formatDateForDisplay = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    }).replace(/ /g, '-');
  };

  // Mock Audit Trail Data
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      oldValue: "15-Apr-2026",
      newValue: "15-May-2026",
      changedBy: "Super Admin User",
      role: "System Administrator",
      date: "05-Apr-2026",
      time: "09:30 AM"
    },
    {
      id: 2,
      oldValue: "15-Mar-2026",
      newValue: "15-Apr-2026",
      changedBy: "System Setup",
      role: "Automated",
      date: "01-Jan-2026",
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
      const formattedLogDate = currentDate.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-');
      const formattedLogTime = currentDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});

      const newlySelectedDate = formatDateForDisplay(dueDate);

      // Create new audit log entry
      const newLog = {
        id: Date.now(),
        oldValue: auditLogs.length > 0 ? auditLogs[0].newValue : "Not Set",
        newValue: newlySelectedDate,
        changedBy: "Current Admin", // In a real app, get from Context/Redux
        role: "Financial Controller",
        date: formattedLogDate,
        time: formattedLogTime
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
    <div className="animate-in fade-in duration-500 relative max-w-6xl mx-auto">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-emerald-500 shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
              <ShieldCheck className="text-emerald-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Due Date Updated</h3>
              <p className="text-sm text-slate-600 mt-1">
                The Global Payment Due Date has been securely updated to <strong>{formatDateForDisplay(dueDate)}</strong>. The system will now use this date for all payment deadlines.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/admin/master" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> Back to Master Settings
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <CalendarClock className="text-blue-600" size={24} />
          </div>
          Payment Due Date Configuration
        </h1>
        <p className="text-slate-500 mt-2">Set the global deadline for university bill payments and submissions.</p>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: THE SETTINGS FORM */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <Calendar className="text-slate-400" size={18} />
              <h2 className="text-lg font-bold text-slate-800">Global Deadline</h2>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  University Payment Due Date
                </label>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  This date will be applied system-wide. Penalties may be automatically calculated after this deadline passes.
                </p>
                
                <div className="relative">
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-900 text-base"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Save size={18} /> Update Due Date
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-blue-600" /> Compliance Notice
            </h3>
            <p className="text-xs text-blue-800/80 leading-relaxed">
              Changing the global due date affects all universities currently in the billing cycle. Changes are logged permanently to ensure strict audit compliance.
            </p>
          </div>
        </div>


        {/* RIGHT COLUMN: THE AUDIT TRAIL */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="text-slate-400" size={18} />
                <h2 className="text-lg font-bold text-slate-800">Audit Trail: Due Date Changes</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-md">
                Strict Tracking
              </span>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {auditLogs.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-500 text-sm">No historical changes found.</p>
                </div>
              ) : (
                <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  
                  {auditLogs.map((log, index) => (
                    <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8 last:mb-0">
                      
                      {/* Timeline Dot */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${index === 0 ? 'bg-blue-500' : 'bg-slate-300'}`}>
                        {index === 0 ? <CheckCircle2 size={16} className="text-white" /> : <Clock size={16} className="text-white" />}
                      </div>
                      
                      {/* Log Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-blue-200 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${index === 0 ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                            {log.date}
                          </span>
                          <span className="text-xs font-medium text-slate-400">{log.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex-1 text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Previous Deadline</p>
                            <p className="text-sm font-semibold text-slate-600 line-through decoration-slate-400">{log.oldValue}</p>
                          </div>
                          <ArrowLeft size={16} className="text-slate-400 transform rotate-180 shrink-0" />
                          <div className="flex-1 text-center">
                            <p className="text-[10px] font-bold text-blue-500 uppercase mb-0.5">Updated To</p>
                            <p className="text-base font-bold text-blue-700">{log.newValue}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 border-t border-slate-100 pt-3">
                          <div className="p-1.5 bg-slate-100 rounded-md shrink-0">
                            <User size={14} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{log.changedBy}</p>
                            <p className="text-xs text-slate-500">{log.role}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                  
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DueDateConfig;