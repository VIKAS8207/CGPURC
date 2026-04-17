import React from 'react';
import { 
  Users, IndianRupee, GraduationCap, ArrowUpRight, 
  Settings, UserPlus, FileText, ChevronRight, 
  UserCheck, LayoutGrid, CalendarDays, Wallet,
  History, Landmark, ArrowRight, Bell, Plus,
  ShieldCheck, Activity, BarChart3
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Updated Mock data with Blue/Emerald palette
  const stats = [
    { title: 'Total Students', value: '1.2M', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Payment Dues', value: '₹ 45.5L', change: 'From Univs.', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'System Uptime', value: '99.9%', change: 'Optimal', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Total Universities', value: '17', change: 'All Active', icon: Landmark, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  const quickActions = [
    { name: 'Academic Year Master', icon: CalendarDays, path: '/academic-year', desc: 'Configure active sessions' },
    { name: 'Due Date Master', icon: History, path: '/due-dates', desc: 'Manage institutional deadlines' },
    { name: 'Verify Certificate', icon: ShieldCheck, path: '/verify-certificate', desc: 'Validate student credentials' },
    { name: 'Add University', icon: Plus, path: '/add-university', desc: 'Register new institutions' },
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-10 bg-[#f8fafc]">
      
      {/* 1. ADMIN PREMIUM HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">University Regulatory Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Central Command Center • <span className="text-blue-600">Admin Mode</span></p>
        </div>
        <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                <Bell size={20} />
            </button>
            <div className="h-10 w-px bg-slate-200 mx-2"></div>
        </div>
      </div>

      {/* 2. STATS CARDS (Sapphire & Emerald Accents) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                <stat.icon size={22} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 relative z-10">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.color} ${stat.bg}`}>
                {stat.change}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">System Status</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. MANAGEMENT CONSOLE (Blue Glass Theme) */}
        <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                    <LayoutGrid size={20} className="text-blue-700" />
                    Admin Control Tower
                </h3>
                <Link to="/admin/master" className="text-xs font-bold text-blue-700 hover:underline">All Master Data</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                    <button 
                        key={i} 
                        onClick={() => navigate(action.path)}
                        className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group shadow-sm"
                    >
                        <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-700 group-hover:text-white transition-all text-slate-500">
                            <action.icon size={24} />
                        </div>
                        <div>
                            <p className="font-black text-slate-800 tracking-tight">{action.name}</p>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">{action.desc}</p>
                        </div>
                        <ArrowUpRight size={18} className="ml-auto text-slate-300 group-hover:text-blue-700 transition-colors" />
                    </button>
                ))}
            </div>

            {/* 4. RECENT ACTIVITY (Clean Sidebar List) */}
            <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Admin Audit Logs</h3>
                    <History size={16} className="text-slate-400" />
                </div>
                <div className="divide-y divide-slate-50">
                    {[
                        { user: 'System Admin', action: 'Course Master Updated', time: '12 mins ago', icon: FileText, color: 'text-blue-500' },
                        { user: 'Registrar Desk', action: 'Office Bearer Assigned', time: '1 hr ago', icon: Users, color: 'text-emerald-500' },
                        { user: 'Super Admin', action: 'New University Added', time: '3 hrs ago', icon: Landmark, color: 'text-slate-500' },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                                    <item.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{item.action}</p>
                                    <p className="text-xs font-medium text-slate-500">{item.user}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.time}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full py-4 text-xs font-black text-blue-600 hover:bg-blue-50/50 uppercase tracking-widest border-t border-slate-100 transition-colors">
                    Access Master Audit Trail
                </button>
            </div>
        </div>

        {/* 5. SIDEBAR COMMANDS */}
        <div className="space-y-6">
            {/* Deep Blue Command Card */}
            <div className="bg-[#1e293b] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
                <div className="relative z-10">
                    <h4 className="text-lg font-black tracking-tight mb-1 flex items-center gap-2">
                        <Settings size={18} className="text-blue-400" />
                        Master Controls
                    </h4>
                    <p className="text-slate-400 text-xs mb-6">Global University Configuration</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm border-b border-white/5 pb-3">
                            <span className="font-medium opacity-60">Registered Univ.</span>
                            <span className="font-bold">17 Active</span>
                        </div>
                        <div className="flex items-center justify-between text-sm border-b border-white/5 pb-3">
                            <span className="font-medium opacity-60">Master Sessions</span>
                            <span className="font-bold">2025 - 2026</span>
                        </div>
                    </div>
                    <button 
                      onClick={() => navigate('/admin/master')}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        Master Setup <ArrowRight size={14} />
                    </button>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Quick Reports Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <BarChart3 size={20} />
                    </div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Analytics Pulse</h4>
                </div>
                <div className="space-y-3">
                    {['Student Report', 'Pending Feed Files', 'University 1% Fees Report'].map((report, i) => (
                        <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                            <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700">{report}</span>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-700" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Security Widget */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                <ShieldCheck size={32} className="text-blue-700 mx-auto mb-3" />
                <h5 className="font-black text-blue-900 text-sm">Secure Instance</h5>
                <p className="text-blue-700/70 text-[10px] font-medium mt-1 mb-4 leading-relaxed italic">
                    All administrative actions are logged under Government Compliance Protocols.
                </p>
                <button className="text-xs font-black text-blue-700 uppercase tracking-widest hover:underline">
                    View Security Protocols
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;