import React, { useState } from 'react';
import { 
  Users, IndianRupee, GraduationCap, ArrowUpRight, 
  Settings, UserPlus, FileText, ChevronRight, 
  UserCheck, LayoutGrid, CalendarDays, Wallet,
  History, Landmark, ArrowRight, Bell, Plus,
  TrendingUp, PieChart as PieChartIcon, BarChart2,
  Activity
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025-2026');

  // Mock data for overview
  const stats = [
    { title: 'Total Students', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Fee Collection', value: '₹ 12.5L', change: '+8.2%', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Pending Promotions', value: '450', change: 'In Progress', icon: UserCheck, color: 'text-[#FF6900]', bg: 'bg-orange-50' },
    { title: 'Active Courses', value: '14', change: 'Across 4 branches', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickActions = [
    { name: 'Upload Fees', icon: Wallet, path: '/upload-fees', desc: 'Process monthly data' },
    { name: 'Promote Batch', icon: UserCheck, path: '/user/student-promotion', desc: 'Move students to next sem' },
    { name: 'Student Data', icon: UserPlus, path: '/student-upload', desc: 'Add new registrations' },
    { name: 'Academic Setup', icon: Settings, path: '/user/course-setup', desc: 'Configure courses' },
  ];

  // DATASET 1: Fee Collection Trend (Area Chart)
  const feeCollectionData = [
    { month: 'Apr', amount: 2.5 }, { month: 'May', amount: 3.2 }, { month: 'Jun', amount: 8.8 },
    { month: 'Jul', amount: 12.4 }, { month: 'Aug', amount: 6.1 }, { month: 'Sep', amount: 4.5 },
    { month: 'Oct', amount: 3.2 }, { month: 'Nov', amount: 5.8 }, { month: 'Dec', amount: 9.5 },
    { month: 'Jan', amount: 11.2 }, { month: 'Feb', amount: 4.6 }, { month: 'Mar', amount: 6.4 },
  ];

  // DATASET 2: Demographics (Now a Bar Chart)
  const branchData = [
    { name: 'Engineering', value: 650, color: '#FF6900' }, // Primary Orange
    { name: 'Management', value: 320, color: '#3b82f6' },  // Blue
    { name: 'Sciences', value: 180, color: '#10b981' },    // Emerald
    { name: 'Arts & Hum.', value: 134, color: '#8b5cf6' }  // Purple
  ];

  // DATASET 3: Batch Progression (Now a Pie Chart representing Overall Status)
  // We aggregate the data to show Promoted vs Retained parts of the whole institution
  const batchPieData = [
    { name: 'Successfully Promoted', value: 1370, color: '#10b981' }, // Emerald green
    { name: 'Retained / Pending', value: 60, color: '#FF6900' }       // Ednut Orange
  ];
  const totalBatch = batchPieData.reduce((sum, item) => sum + item.value, 0);

  // Custom Tooltips
  const CustomAreaTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl shadow-orange-900/5 border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label} {selectedYear.split('-')[0]}</p>
          <p className="text-2xl font-black text-slate-800 tracking-tighter">
            ₹{payload[0].value}<span className="text-sm font-medium text-slate-500 tracking-normal">L</span>
          </p>
          <p className="text-[10px] font-bold text-[#FF6900] mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> Institutional Revenue
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl shadow-slate-200 border border-slate-100">
          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }}></div>
            {data.name} Department
          </span>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{data.value} <span className="text-sm font-medium text-slate-500">Students</span></p>
        </div>
      );
    }
    return null;
  };

  // Custom Pie Legend for Batch Progression
  const renderBatchPieLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-4 pl-2">
        {payload.map((entry, index) => {
          const percent = ((entry.payload.value / totalBatch) * 100).toFixed(1);
          return (
            <li key={`item-${index}`} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <div>
                <p className="text-sm font-black text-slate-800 leading-none">{entry.value}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1">
                  {percent}% <span className="font-medium opacity-80">({entry.payload.name})</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="animate-in fade-in duration-700 pb-10 bg-[#fafafa] min-h-screen">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-8 px-6 lg:px-8">
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

      <div className="px-6 lg:px-8">
        {/* 2. TOP STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#FF6900]/5 transition-all duration-300 relative overflow-hidden">
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
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${i === 2 ? 'bg-orange-100 text-[#FF6900]' : 'bg-emerald-100 text-emerald-600'}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">vs last cycle</span>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.bg} opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Quick Actions Console */}
              <div>
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
              </div>

              {/* GRAPH 1: Fee Collection Trend (Area Chart) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                        <TrendingUp size={20} className="text-[#FF6900]" />
                        Revenue Trajectory
                      </h3>
                      <p className="text-xs font-medium text-slate-400 mt-1">Monthly fee deposits for the current academic session</p>
                    </div>
                    
                 </div>

                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={feeCollectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6900" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF6900" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} tickFormatter={(value) => `₹${value}L`} />
                        <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area type="monotone" dataKey="amount" stroke="#FF6900" strokeWidth={3} fillOpacity={1} fill="url(#colorOrange)" activeDot={{ r: 6, fill: '#FF6900', stroke: '#fff', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* GRAPH 2: Demographics (Now a Bar Chart) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                        <Users size={20} className="text-blue-600" />
                        Demographics Distribution
                      </h3>
                      <p className="text-xs font-medium text-slate-400 mt-1">Active student enrollment by academic discipline</p>
                    </div>
                 </div>

                 <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={branchData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                        <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#f8fafc' }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                          {branchData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Recent Activity List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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

          {/* RIGHT SIDEBAR COLUMN */}
          <div className="space-y-6">
              
              {/* GRAPH 3: Batch Progression (Now a Pie Chart) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-50 text-[#FF6900] rounded-xl border border-orange-100">
                          <Activity size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Batch Progression</h4>
                        <p className="text-[10px] font-medium text-slate-500">Overall promotion success rate</p>
                      </div>
                  </div>
                  
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                        <Pie
                          data={batchPieData}
                          cx="40%" 
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                          cornerRadius={4}
                        >
                          {batchPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: '#0f172a', fontWeight: '900', fontSize: '13px' }}
                        />
                        <Legend 
                          content={renderBatchPieLegend}
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          wrapperStyle={{ paddingRight: '10px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              {/* Masters Summary Widget */}
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
                      <button className="w-full mt-6 bg-[#FF6900] py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#FF6900]/20 flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                          System Setup <ArrowRight size={14} />
                      </button>
                  </div>
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
                              <ChevronRight size={14} className="text-slate-300 group-hover:text-[#FF6900]" />
                          </button>
                      ))}
                  </div>
              </div>

              {/* Help/Support Card */}
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
    </div>
  );
};

export default UserDashboard;