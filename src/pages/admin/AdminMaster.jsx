import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Database, Search, Filter, ChevronRight, 
  CalendarDays, GraduationCap, BookOpen, 
  ArrowLeft
} from 'lucide-react';

const AdminMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Professional data structure for mapping the UI
  const masterModules = [
    { 
      title: "Academic Year Master", 
      desc: "Manage sessions, terms, and holidays", 
      icon: CalendarDays, 
      count: "4 Records",
      color: "text-[#155DFC]", 
      bg: "bg-[#155DFC]/10", 
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
      link: "/admin/master/branch-course"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* Simple Back Button (Top Left, Above Path) */}
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
        <span className="text-slate-900 font-semibold">Master Configuration</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#155DFC]/10 rounded-lg">
            <Database className="text-[#155DFC]" size={24} />
          </div>
          Master Configuration
        </h1>
        <p className="text-slate-500 mt-2">Set up and manage your core institutional data schemas.</p>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search master modules (e.g., 'Academic')...." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all text-sm font-medium text-slate-700"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter Modules
        </button>
      </div>

      {/* Master Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {masterModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Link 
              to={module.link}
              key={index} 
              className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#155DFC]/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${module.bg} ${module.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                    {module.count}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#155DFC] transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {module.desc}
                </p>
              </div>
              
              {/* Bottom interactive bar */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center group-hover:bg-[#155DFC]/5 transition-colors">
                <span className="text-sm font-bold text-slate-600 group-hover:text-[#155DFC]">Manage Data</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#155DFC] transform group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default AdminMaster;