import React, { useState } from 'react';
import { 
  Users, IndianRupee, GraduationCap, ArrowUpRight, 
  Settings, UserPlus, FileText, ChevronRight, 
  UserCheck, LayoutGrid, CalendarDays, Wallet,
  History, Landmark, ArrowRight, Bell, Plus,
  ShieldCheck, Activity, BarChart3, TrendingUp,
  FileSearch, Sparkles
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025-2026');

  // Unified Blue/Cyan/Indigo Palette for Stats
  const stats = [
    { title: 'Total Students', value: '1.2M', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100/50' },
    { title: 'Payment Dues', value: '₹ 45.5L', change: 'From Univs.', icon: IndianRupee, color: 'text-cyan-600', bg: 'bg-cyan-100/50' },
    { title: 'System Uptime', value: '99.9%', change: 'Optimal', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100/50' },
    { title: 'Total Universities', value: '17', change: 'All Active', icon: Landmark, color: 'text-sky-600', bg: 'bg-sky-100/50' },
  ];

  const quickActions = [
    { name: 'Academic Year Master', icon: CalendarDays, path: '/academic-year', desc: 'Configure active sessions' },
    { name: 'Due Date Master', icon: History, path: '/due-dates', desc: 'Manage institutional deadlines' },
    { name: 'Verify Certificate', icon: ShieldCheck, path: '/verify-certificate', desc: 'Validate student credentials' },
    { name: 'Add University', icon: Plus, path: '/add-university', desc: 'Register new institutions' },
  ];

  // Mock Data for the Area Graph
  const feeCollectionData = [
    { month: 'Apr', amount: 12.5 },
    { month: 'May', amount: 15.2 },
    { month: 'Jun', amount: 45.8 },
    { month: 'Jul', amount: 68.4 },
    { month: 'Aug', amount: 32.1 },
    { month: 'Sep', amount: 18.5 },
    { month: 'Oct', amount: 14.2 },
    { month: 'Nov', amount: 16.8 },
    { month: 'Dec', amount: 28.5 },
    { month: 'Jan', amount: 34.2 },
    { month: 'Feb', amount: 15.6 },
    { month: 'Mar', amount: 22.4 },
  ];

  // Certificate Verification Pie Chart Data
  const certificateData = [
    { name: 'Verified', value: 8450, color: '#0ea5e9' }, // Sky Blue
    { name: 'Pending', value: 2340, color: '#6366f1' },  // Indigo
    { name: 'Rejected', value: 420, color: '#0f172a' }   // Slate 900
  ];

  // Calculate total for percentages
  const totalCertificates = certificateData.reduce((sum, item) => sum + item.value, 0);

  // Custom Legend to show on the right side
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-4 pl-4">
        {payload.map((entry, index) => {
          const percent = ((entry.payload.value / totalCertificates) * 100).toFixed(1);
          return (
            <li key={`item-${index}`} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
              <div>
                <p className="text-sm font-black text-blue-950 leading-none">{entry.value}</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">
                  {percent}% <span className="font-medium opacity-60">({entry.payload.value.toLocaleString()})</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  // Custom Tooltip for the AreaChart
  const CustomAreaTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 p-4 rounded-xl shadow-xl shadow-blue-900/10 border border-white/50 backdrop-blur-md">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label} {selectedYear.split('-')[0]}</p>
          <p className="text-2xl font-black text-blue-950 tracking-tighter">
            ₹{payload[0].value}<span className="text-sm font-medium text-slate-500 tracking-normal">L</span>
          </p>
          <p className="text-[10px] font-bold text-cyan-600 mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> Fee Collected
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative animate-in fade-in duration-700 pb-10 bg-[#F8FAFC] min-h-screen overflow-hidden">
      
      <div className="relative z-10">
        {/* 1. ADMIN PREMIUM HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-8 px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-black text-blue-950 tracking-tight flex items-center gap-3">
              University Regulatory Dashboard
            </h1>
            <p className="text-slate-500 font-medium mt-1">Central Command Center • <span className="text-blue-600 font-bold">Admin Mode</span></p>
          </div>
          <div className="flex items-center gap-3">
              <button className="p-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-xl text-slate-500 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-900/5 transition-all">
                  <Bell size={20} />
              </button>
              <div className="h-10 w-px bg-blue-200/50 mx-2"></div>
          </div>
        </div>

        <div className="px-6 lg:px-8">
          {/* 2. STATS CARDS (Glass Effect) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="group bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-black text-blue-950 tracking-tighter">{stat.value}</h3>
                  </div>
                  <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl border border-white/50 shadow-sm`}>
                    <stat.icon size={22} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 relative z-10">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.color} ${stat.bg} border border-white/50`}>
                    {stat.change}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">System Status</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 3. MANAGEMENT CONSOLE */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Quick Actions Grid */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter flex items-center gap-2">
                          <LayoutGrid size={20} className="text-blue-600" />
                          Admin Control Tower
                      </h3>
                      <Link to="/admin/master" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors hover:underline">All Master Data</Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quickActions.map((action, i) => (
                          <button 
                              key={i} 
                              onClick={() => navigate(action.path)}
                              className="flex items-center gap-4 p-5 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left group shadow-lg shadow-blue-900/5"
                          >
                              <div className="p-4 bg-blue-50 border border-blue-100/50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-500">
                                  <action.icon size={24} />
                              </div>
                              <div>
                                  <p className="font-black text-blue-950 tracking-tight">{action.name}</p>
                                  <p className="text-xs font-medium text-slate-500 mt-0.5">{action.desc}</p>
                              </div>
                              <ArrowUpRight size={18} className="ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </button>
                      ))}
                  </div>
                </div>

                {/* 3.5 FEE COLLECTION GRAPH WIDGET */}
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-lg shadow-blue-900/5 p-6 relative overflow-hidden">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter flex items-center gap-2">
                          <BarChart3 size={20} className="text-blue-600" />
                          Monthly Fee Collection
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-1">Aggregated 1% fees across all active universities</p>
                      </div>
                      
                      {/* Academic Year Selector */}
                      <select 
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 text-sm font-bold rounded-2xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer shadow-sm"
                      >
                        <option value="2025-2026">AY 2025 - 2026</option>
                        <option value="2024-2025">AY 2024 - 2025</option>
                        <option value="2023-2024">AY 2023 - 2024</option>
                      </select>
                   </div>

                   <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={feeCollectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                            tickFormatter={(value) => `₹${value}L`}
                          />
                          <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                          <Area 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#2563eb" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorAmount)" 
                            activeDot={{ r: 6, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 3, className: "shadow-xl" }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* 4. RECENT ACTIVITY */}
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-lg shadow-blue-900/5 overflow-hidden">
                    <div className="px-6 py-5 border-b border-blue-50 flex items-center justify-between bg-white/40">
                        <h3 className="font-black text-blue-950 uppercase text-xs tracking-widest">Admin Audit Logs</h3>
                        <History size={16} className="text-slate-400" />
                    </div>
                    <div className="divide-y divide-blue-50/50">
                        {[
                            { user: 'System Admin', action: 'Course Master Updated', time: '12 mins ago', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100/50' },
                            { user: 'Registrar Desk', action: 'Office Bearer Assigned', time: '1 hr ago', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-100/50' },
                            { user: 'Super Admin', action: 'New University Added', time: '3 hrs ago', icon: Landmark, color: 'text-indigo-600', bg: 'bg-indigo-100/50' },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/80 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl border border-white/50 ${item.bg} ${item.color}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-950">{item.action}</p>
                                        <p className="text-xs font-medium text-slate-500">{item.user}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 text-xs font-black text-blue-600 hover:bg-blue-50/50 uppercase tracking-widest border-t border-blue-50 transition-colors">
                        Access Master Audit Trail
                    </button>
                </div>
            </div>

            {/* 5. SIDEBAR COMMANDS */}
            <div className="space-y-6">
                
                {/* Deep Ocean Blue Command Card */}
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-blue-900/20 border border-blue-800">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h4 className="text-lg font-black tracking-tight mb-1 flex items-center gap-2">
                            <Settings size={18} className="text-blue-300" />
                            Master Controls
                        </h4>
                        <p className="text-slate-300 text-xs mb-6">Global University Configuration</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm border-b border-blue-800/50 pb-3">
                                <span className="font-medium text-slate-300">Registered Univ.</span>
                                <span className="font-bold text-white">17 Active</span>
                            </div>
                            <div className="flex items-center justify-between text-sm border-b border-blue-800/50 pb-3">
                                <span className="font-medium text-slate-300">Master Sessions</span>
                                <span className="font-bold text-white">2025 - 2026</span>
                            </div>
                        </div>
                        <button 
                          onClick={() => navigate('/admin/master')}
                          className="w-full mt-6 bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            Master Setup <ArrowRight size={14} />
                        </button>
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>

                {/* UPDATED: Certificate Verification Pie Chart */}
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 p-6 shadow-lg shadow-blue-900/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100/50 text-blue-600 rounded-xl border border-white/50">
                            <FileSearch size={20} />
                        </div>
                        <div>
                          <h4 className="font-black text-blue-950 uppercase text-xs tracking-widest">Certificate Status</h4>
                          <p className="text-[10px] font-medium text-slate-500">Current Academic Year Breakdown</p>
                        </div>
                    </div>
                    
                    {/* CHANGED: Made w-full and added Recharts margins to center the contents perfectly */}
                    <div className="h-[220px] w-full">
                      <ResponsiveContainer width="90%" height="100%">
                        <PieChart margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                          <Pie
                            data={certificateData}
                            cx="45%" 
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                          >
                            {certificateData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.1)' }}
                            itemStyle={{ color: '#172554', fontWeight: '900', fontSize: '14px' }}
                          />
                          <Legend 
                            content={renderCustomLegend}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ paddingRight: '10px' }} // Nudges the text slightly inwards for perfect balance
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                </div>

                {/* Security Widget */}
                <div className="bg-gradient-to-b from-blue-50/80 to-blue-100/30 backdrop-blur-md border border-blue-100 rounded-3xl p-6 text-center shadow-inner">
                    <ShieldCheck size={32} className="text-blue-600 mx-auto mb-3" />
                    <h5 className="font-black text-blue-950 text-sm">Secure Instance</h5>
                    <p className="text-slate-600 text-[10px] font-medium mt-1 mb-4 leading-relaxed italic">
                        All administrative actions are logged under Government Compliance Protocols.
                    </p>
                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 hover:underline transition-colors">
                        View Security Protocols
                    </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;