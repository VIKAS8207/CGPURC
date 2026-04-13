import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, Search, Filter, ChevronRight, 
  Users, GraduationCap, FileText, IdCard, Receipt, 
  FileCheck, ArrowLeft, Calendar, Wallet
} from 'lucide-react';

const UserUploads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Professional data structure for the Upload Cards
  const uploadModules = [
    { 
      title: "Student Data Upload", 
      desc: "Bulk upload enrolled student lists via CSV/Excel", 
      icon: Users, 
      status: "Required",
      color: "text-[#FF6900]", 
      bg: "bg-[#FF6900]/10",
      link: "/user/uploads/student-data"
    },
    { 
      title: "Degree Certificates", 
      desc: "Upload verified degree documents and certificates", 
      icon: GraduationCap, 
      status: "Pending",
      color: "text-amber-600", 
      bg: "bg-amber-50",
      link: "/user/uploads/degree" 
    },
    { 
      title: "Academic Calendar", 
      desc: "Upload institutional holiday and term schedules", 
      icon: Calendar, 
      status: "Optional",
      color: "text-rose-600", 
      bg: "bg-rose-50",
      link: "/user/uploads/academic-calendar"
    },
    { 
      title: "Course & Fee Structure", 
      desc: "Upload annual course lists and approved fee breakdown", 
      icon: Wallet, 
      status: "Required",
      color: "text-blue-600", 
      bg: "bg-blue-50",
      link: "/user/uploads/course-fee" 
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* Simple Back Button (Top Left) */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumb Path */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Document Uploads</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-lg">
            <UploadCloud className="text-[#FF6900]" size={24} />
          </div>
          Document Uploads
        </h1>
        <p className="text-slate-500 mt-2">Manage and securely submit your required institutional documents and schedules.</p>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search upload categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all text-sm font-medium text-slate-700"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter Documents
        </button>
      </div>

      {/* Master Modules Grid - ORANGE THEME */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploadModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Link 
              to={module.link}
              key={index} 
              className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#FF6900]/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${module.bg} ${module.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    module.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    module.status === 'Required' ? 'bg-red-50 text-red-700 border-red-100' :
                    module.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {module.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#FF6900] transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {module.desc}
                </p>
              </div>
              
              {/* Bottom interactive bar */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center group-hover:bg-[#FF6900]/5 transition-colors">
                <span className="text-sm font-bold text-slate-600 group-hover:text-[#FF6900]">Open Upload Portal</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#FF6900] transform group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default UserUploads;