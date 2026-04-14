import React from 'react';
import { 
  Users, IndianRupee, GraduationCap, ArrowUpRight, 
  Settings, UserPlus, FileText, ChevronRight, 
  UserCheck, LayoutGrid, CalendarDays, Wallet,
  History, Landmark, ArrowRight, Bell, Plus // <--- CHECK THIS
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  // Mock data for overview
  const stats = [
    { title: 'Total Students', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Fee Collection', value: '₹ 12.5L', change: '+8.2%', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Pending Promotions', value: '450', change: 'In Progress', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Active Courses', value: '14', change: 'Across 4 branches', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickActions = [
    { name: 'Upload Fees', icon: Wallet, path: '/upload-fees', desc: 'Process monthly data' },
    { name: 'Promote Batch', icon: UserCheck, path: '/user/student-promotion', desc: 'Move students to next sem' },
    { name: 'Student Data', icon: UserPlus, path: '/student-upload', desc: 'Add new registrations' },
    { name: 'Academic Setup', icon: Settings, path: '/user/course-setup', desc: 'Configure courses' },
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Institutional Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Good morning, Vikas. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#FF6900] transition-all shadow-sm">
                <Bell size={20} />
            </button>
            <div className="h-10 w-px bg-slate-200 mx-2"></div>
        </div>
      </div>

      {/* 2. TOP STATS CARDS (Modern Dribbble Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 relative z-10">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {stat.change}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">vs last month</span>
            </div>
            {/* Background Accent */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.bg} opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. QUICK ACCESS TILES (Accumulated Modules) */}
        <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                    <LayoutGrid size={20} className="text-[#FF6900]" />
                    Management Console
                </h3>
                <Link to="/user/uploads" className="text-xs font-bold text-[#FF6900] hover:underline">View All Modules</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                    <button 
                        key={i} 
                        onClick={() => navigate(action.path)}
                        className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-[#FF6900]/50 hover:bg-orange-50/30 transition-all text-left group shadow-sm"
                    >
                        <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-[#FF6900] group-hover:text-white transition-all text-slate-500">
                            <action.icon size={24} />
                        </div>
                        <div>
                            <p className="font-black text-slate-800 tracking-tight">{action.name}</p>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">{action.desc}</p>
                        </div>
                        <ArrowUpRight size={18} className="ml-auto text-slate-300 group-hover:text-[#FF6900] transition-colors" />
                    </button>
                ))}
            </div>

            {/* 4. RECENT ACTIVITY LIST */}
            <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Live Sync Activities</h3>
                    <History size={16} className="text-slate-400" />
                </div>
                <div className="divide-y divide-slate-50">
                    {[
                        { user: 'Rahul Sharma', action: 'Uploaded Fees Data', time: '12 mins ago', icon: Wallet, color: 'text-emerald-500' },
                        { user: 'Admin System', action: 'Batch Promotion Finalized', time: '1 hr ago', icon: UserCheck, color: 'text-[#FF6900]' },
                        { user: 'Priya Verma', action: 'New Student Registration', time: '3 hrs ago', icon: UserPlus, color: 'text-blue-500' },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg bg-slate-100 ${item.color}`}>
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
                <button className="w-full py-4 text-xs font-black text-slate-400 hover:text-[#FF6900] bg-slate-50/30 uppercase tracking-widest border-t border-slate-100 transition-colors">
                    View Complete Audit Log
                </button>
            </div>
        </div>

        {/* 5. SIDEBAR WIDGETS (Masters & Reports Info) */}
        <div className="space-y-6">
            {/* Masters Summary */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-slate-300">
                <div className="relative z-10">
                    <h4 className="text-lg font-black tracking-tight mb-1">Configuration Master</h4>
                    <p className="text-slate-400 text-xs mb-6">Manage University IDs and Sessions</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm border-b border-white/10 pb-3">
                            <span className="font-medium opacity-60">Mapped Branches</span>
                            <span className="font-bold">24 Units</span>
                        </div>
                        <div className="flex items-center justify-between text-sm border-b border-white/10 pb-3">
                            <span className="font-medium opacity-60">Fee Structures</span>
                            <span className="font-bold">12 Mappings</span>
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-[#FF6900] py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#FF6900]/20 flex items-center justify-center gap-2">
                        System Setup <ArrowRight size={14} />
                    </button>
                </div>
                {/* Decorative circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Reports Shortcut */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={20} />
                    </div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Quick Reports</h4>
                </div>
                <div className="space-y-3">
                    {['Bearer List', 'Fee Collection 2026', 'Defaulter Students'].map((report, i) => (
                        <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{report}</span>
                            <ChevronRight size={14} className="text-slate-300" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Help/Support Glass Card */}
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 text-center">
                <Landmark size={32} className="text-[#FF6900] mx-auto mb-3" />
                <h5 className="font-black text-orange-900 text-sm">Need Assistance?</h5>
                <p className="text-orange-700/70 text-[10px] font-medium mt-1 mb-4 leading-relaxed">
                    Contact the Unipro support desk for university integration issues.
                </p>
                <button className="text-xs font-black text-[#FF6900] uppercase tracking-widest hover:underline">
                    Get Support
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;