import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Network, Plus, Search, Filter, 
  Trash2, X, BellRing, ChevronDown, ChevronLeft, 
  ChevronRight, BookOpen, Layers, CheckCircle2, ShieldCheck
} from 'lucide-react';

const BranchCourseMaster = () => {
  const navigate = useNavigate();

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA ---
  const courseList = [
    { id: 'c1', name: 'Bachelor of Technology' },
    { id: 'c2', name: 'Master of Business Administration' },
    { id: 'c3', name: 'Bachelor of Science' },
  ];

  const [branchMappings, setBranchMappings] = useState([
    { id: 1, courseName: "Bachelor of Technology", branches: ["Computer Science", "Civil Engineering", "Mechanical"] },
    { id: 2, courseName: "Bachelor of Science", branches: ["Physics", "Mathematics"] },
  ]);

  // --- FORM STATE ---
  const [selectedCourse, setSelectedCourse] = useState("");
  const [branches, setBranches] = useState([{ id: Date.now(), value: "" }]);

  // --- LOGIC ---
  const totalRecords = branchMappings.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const currentItems = branchMappings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddBranchField = () => {
    setBranches([...branches, { id: Date.now(), value: "" }]);
  };

  const handleRemoveBranchField = (idToRemove) => {
    if (branches.length > 1) {
      setBranches(branches.filter(b => b.id !== idToRemove));
    }
  };

  const handleBranchChange = (id, newValue) => {
    setBranches(branches.map(b => b.id === id ? { ...b, value: newValue } : b));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validBranches = branches.filter(b => b.value.trim() !== "").map(b => b.value.trim());
    const courseObj = courseList.find(c => c.id === selectedCourse);

    if (!courseObj || validBranches.length === 0) return;

    const newMapping = { id: Date.now(), courseName: courseObj.name, branches: validBranches };
    setBranchMappings([newMapping, ...branchMappings]);
    setShowNotification(true);
    setIsFormOpen(false);
    setSelectedCourse("");
    setBranches([{ id: Date.now(), value: "" }]);
    setTimeout(() => setShowNotification(false), 4000);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10">
      
      {/* SUCCESS NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-2xl rounded-xl p-4 flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]"><CheckCircle2 size={20} /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Configuration Updated</h3>
              <p className="text-xs text-slate-500 mt-0.5">Course branch mapping has been successfully saved to the registry.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* 1. SIMPLE BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-[#155DFC] transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* 2. BREADCRUMB PATH (NEW ADDITION) */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Branch Course Registry</span>
      </div>

      {/* 3. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]"><Network size={24} /></div>
            Branch Course Master
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Associate academic specializations with their respective parent degrees.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md ${
            isFormOpen ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-slate-900 text-white hover:bg-black'
          }`}
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          {isFormOpen ? 'Cancel Configuration' : 'Map New Branches'}
        </button>
      </div>

      {/* 4. PROFESSIONAL SPLIT FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-10 overflow-hidden animate-in slide-in-from-top-4 duration-500">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-8 flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#155DFC]" /> Branch Association Console
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* LEFT COLUMN: COURSE SELECTION */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">1. Select Parent Course</label>
                  <div className="relative group">
                    <select 
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full appearance-none px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#155DFC]/10 focus:border-[#155DFC] transition-all font-bold text-slate-700 cursor-pointer shadow-inner"
                      required
                    >
                      <option value="">-- Choose Course from Master --</option>
                      {courseList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-[#155DFC] transition-colors" />
                  </div>
                </div>

                <div className="p-6 bg-[#155DFC]/5 rounded-2xl border border-[#155DFC]/10">
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                        <span className="font-bold text-[#155DFC]">Pro-Tip:</span> Once a course is selected on the left, you can define multiple specializations on the right. These will be grouped under this single degree in the system.
                    </p>
                </div>
              </div>

              {/* RIGHT COLUMN: DYNAMIC BRANCHES */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">2. Define Specializations / Branches</label>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {branches.map((branch, index) => (
                    <div key={branch.id} className="flex items-center gap-3 animate-in slide-in-from-right-4 duration-300">
                      <div className="flex-1 relative group">
                        <input 
                          type="text" 
                          placeholder={`Branch Name (e.g. ${index === 0 ? 'Civil Engineering' : 'Information Tech'})`}
                          value={branch.value}
                          onChange={(e) => handleBranchChange(branch.id, e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-bold text-slate-800 text-sm shadow-sm"
                          required={index === 0}
                        />
                      </div>
                      {branches.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => handleRemoveBranchField(branch.id)}
                          className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={handleAddBranchField}
                  className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#155DFC] bg-[#155DFC]/5 hover:bg-[#155DFC]/10 py-4 rounded-xl border-2 border-dashed border-[#155DFC]/20 transition-all active:scale-[0.98]"
                >
                  <Plus size={14} /> Add Another specialization
                </button>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                className="bg-[#155DFC] text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#155DFC]/20 hover:bg-slate-900 transition-all active:scale-95 flex items-center gap-3"
              >
                Complete Mapping & Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. TABLE SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Layers size={18} className="text-slate-400" />
            Registry Mappings
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search registry..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-[#155DFC]/10 outline-none font-bold" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                <th className="py-5 px-6 w-16 text-center">SNo</th>
                <th className="py-5 px-6">Associated Course</th>
                <th className="py-5 px-6 text-center">Branch Count</th>
                <th className="py-5 px-6">Mapped Specializations</th>
                <th className="py-5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentItems.map((mapping, index) => (
                <tr key={mapping.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6 text-xs font-bold text-slate-400 text-center">{(currentPage-1)*itemsPerPage + index + 1}</td>
                  <td className="py-5 px-6 text-sm font-bold text-slate-800">{mapping.courseName}</td>
                  <td className="py-5 px-6 text-center">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-black border border-slate-200">{mapping.branches.length}</span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap gap-1.5">
                      {mapping.branches.map((branch, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#155DFC]/5 text-[#155DFC] text-[9px] font-black rounded uppercase border border-[#155DFC]/10">{branch}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 6. NEW EDUNAUT PAGINATION */}
        <div className="p-5 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <div className="flex items-center gap-3">
              <span>Registry Data: {totalRecords} Records</span>
              <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}} className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-[#155DFC]">
                <option value={5}>05 per page</option>
                <option value={10}>10 per page</option>
              </select>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="bg-white border-2 border-blue-50 rounded-lg px-2 py-1 text-[#155DFC] outline-none">
                  {[...Array(totalPages)].map((_, i) => <option key={i+1} value={i+1}>Page {i+1}</option>)}
                </select>
                <span>of {totalPages} pages</span>
              </div>
              <div className="flex gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50"><ChevronLeft size={16}/></button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50"><ChevronRight size={16}/></button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default BranchCourseMaster;