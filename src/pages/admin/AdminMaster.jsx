import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Plus, Search, Filter, ChevronRight, 
  Building2, CalendarDays, GraduationCap, BookOpen, 
  Briefcase, Wallet, ShieldCheck, Bus
} from 'lucide-react';

const AdminMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Professional data structure for mapping the UI
  const masterModules = [
    { 
      title: "Organization Settings", 
      desc: "Institution details, logos, and branches", 
      icon: Building2, 
      count: "1 Active",
      color: "text-blue-600", 
      bg: "bg-blue-50",
      link: "#"
    },
    { 
      title: "Academic Year Master", 
      desc: "Manage sessions, terms, and holidays", 
      icon: CalendarDays, 
      count: "4 Records",
      color: "text-indigo-600", 
      bg: "bg-indigo-50", // FIXED: Added missing comma here
      link: "/admin/master/Academic-Year" 
    },
    { 
      title: "Course & Class Master", 
      desc: "Degrees, standards, and stream mapping", 
      icon: GraduationCap, 
      count: "24 Classes",
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      link: "/admin/master/course-master"
    },
    { 
      title: "Branch (Sub-Course)", 
      desc: "Global subject list and categorizations", 
      icon: BookOpen, 
      count: "108 Subjects",
      color: "text-amber-600", 
      bg: "bg-amber-50",
      link: "#"
    },
    { 
      title: "Department Master", 
      desc: "Academic and administrative departments", 
      icon: Briefcase, 
      count: "12 Depts",
      color: "text-purple-600", 
      bg: "bg-purple-50",
      link: "#"
    },
    { 
      title: "Fee Head Master", 
      desc: "Tuition, transport, and library fee structures", 
      icon: Wallet, 
      count: "18 Heads",
      color: "text-rose-600", 
      bg: "bg-rose-50",
      link: "#"
    },
    { 
      title: "Role & Permissions", 
      desc: "Access control for staff and students", 
      icon: ShieldCheck, 
      count: "6 Roles",
      color: "text-slate-700", 
      bg: "bg-slate-100",
      link: "#"
    },
    { 
      title: "Transport & Routes", 
      desc: "Vehicles, drivers, and route mapping", 
      icon: Bus, 
      count: "15 Routes",
      color: "text-cyan-600", 
      bg: "bg-cyan-50",
      link: "#"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="text-blue-700" size={24} />
            </div>
            Master Configuration
          </h1>
          <p className="text-slate-500 mt-2">Set up and manage your core institutional data schemas.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 font-medium">
          <Plus size={20} />
          Quick Add
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search master modules (e.g., 'Academic')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter Modules
        </button>
      </div>

      {/* Master Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {masterModules.map((module, index) => {
          const Icon = module.icon;
          return (
            /* FIXED: Combined Link and div classes, and moved key={index} here */
            <Link 
              to={module.link}
              key={index} 
              className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${module.bg} ${module.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {module.count}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {module.desc}
                </p>
              </div>
              
              {/* Bottom interactive bar */}
              <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">Manage Data</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default AdminMaster;