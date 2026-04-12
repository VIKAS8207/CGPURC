import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, Plus, Search, Filter, ChevronRight, 
  Users, GraduationCap, FileText, IdCard, Receipt, FileCheck
} from 'lucide-react';

const UserUploads = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Professional data structure for the Upload Cards
  const uploadModules = [
    { 
      title: "Student Data Upload", 
      desc: "Bulk upload enrolled student lists via CSV/Excel", 
      icon: Users, 
      status: "Required",
      color: "text-orange-600", 
      bg: "bg-orange-50",
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
      title: "Mark Sheets", 
      desc: "Upload semester-wise mark sheets and transcripts", 
      icon: FileText, 
      status: "2 Uploaded",
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      link: "#"
    },
    { 
      title: "Identity Proofs", 
      desc: "Aadhar, Pan, or University ID cards", 
      icon: IdCard, 
      status: "Verified",
      color: "text-blue-600", 
      bg: "bg-blue-50",
      link: "#"
    },
    { 
      title: "Fee Receipts", 
      desc: "Upload challans and bank transaction proofs", 
      icon: Receipt, 
      status: "Optional",
      color: "text-rose-600", 
      bg: "bg-rose-50",
      link: "/user/uploads/academic-calendar"
    },
    { 
      title: "Migration / NOC", 
      desc: "Migration certificates and No Objection Certificates", 
      icon: FileCheck, 
      status: "Pending",
      color: "text-purple-600", 
      bg: "bg-purple-50",
      link: "#"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <UploadCloud className="text-orange-600" size={24} />
            </div>
            Document Uploads
          </h1>
          <p className="text-slate-500 mt-2">Manage and securely submit your required institutional documents.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 font-semibold">
          <Plus size={20} />
          New Upload
        </button>
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
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium text-slate-700"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium w-full sm:w-auto justify-center">
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
              className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${module.bg} ${module.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    module.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                    module.status === 'Required' ? 'bg-red-100 text-red-700' :
                    module.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {module.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-orange-700 transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {module.desc}
                </p>
              </div>
              
              {/* Bottom interactive bar - Orange variant */}
              <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center group-hover:bg-orange-50 transition-colors">
                <span className="text-sm font-bold text-slate-600 group-hover:text-orange-700">Open Upload Portal</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-600 transform group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default UserUploads;