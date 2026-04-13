import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Network, Plus, Search, Filter, 
  Trash2, X, BellRing, ChevronDown, ChevronLeft, 
  ChevronRight, BookOpen, Layers
} from 'lucide-react';

const BranchCourseMaster = () => {
  const navigate = useNavigate();

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ course: "", count: 0 });

  // --- NEW EDUNAUT PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Standard starting point

  // --- MOCK DEPENDENCY DATA ---
  const courseList = [
    { id: 'c1', name: 'B.Tech (Bachelor of Technology)' },
    { id: 'c2', name: 'M.Tech (Master of Technology)' },
    { id: 'c3', name: 'B.Sc (Bachelor of Science)' },
    { id: 'c4', name: 'BBA (Bachelor of Arts)' },
    { id: 'c5', name: 'MBA (Master of Business Admin)' },
  ];

  // --- FORM STATE ---
  const [selectedCourse, setSelectedCourse] = useState("");
  const [branches, setBranches] = useState([{ id: Date.now(), value: "" }]);

  // --- MOCK TABLE DATA ---
  const [branchMappings, setBranchMappings] = useState([
    { id: 1, courseName: "B.Tech (Bachelor of Technology)", branches: ["Computer Science", "Civil Engineering", "Mechanical", "Electrical", "Information Technology"] },
    { id: 2, courseName: "B.Sc (Bachelor of Science)", branches: ["Physics", "Mathematics", "Chemistry", "Computer Science"] },
    { id: 3, courseName: "MBA (Master of Business Admin)", branches: ["Finance", "Marketing", "Human Resources"] },
    { id: 4, courseName: "BBA (Bachelor of Arts)", branches: ["General Management"] },
  ]);

  // --- NEW EDUNAUT PAGINATION LOGIC ---
  const totalRecords = branchMappings.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = branchMappings.slice(indexOfFirstItem, indexOfLastItem);

  // --- FORM HANDLERS ---
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

    const newMapping = {
      id: Date.now(),
      courseName: courseObj.name,
      branches: validBranches
    };

    setBranchMappings([newMapping, ...branchMappings]);
    setNotificationData({ course: courseObj.name, count: validBranches.length });
    setShowNotification(true);
    setIsFormOpen(false);
    setSelectedCourse("");
    setBranches([{ id: Date.now(), value: "" }]);

    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleDelete = (id) => {
    setBranchMappings(branchMappings.filter(item => item.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* SUCCESS NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-emerald-500 shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
              <BellRing className="text-emerald-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Branches Mapped Successfully</h3>
              <p className="text-sm text-slate-600 mt-1">
                Added <strong>{notificationData.count}</strong> new branches to <strong>{notificationData.course}</strong>.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
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
        <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Branch Mapping Master</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg">
              <Network className="text-[#155DFC]" size={24} />
            </div>
            Branch Mapping Master
          </h1>
          <p className="text-slate-500 mt-2">Map specific academic branches/specializations to base courses.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm font-medium ${isFormOpen ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' : 'bg-slate-900 hover:bg-black text-white shadow-md active:scale-95'}`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel' : 'Map New Branches'}
        </button>
      </div>

      {/* EXPANDABLE INLINE FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex items-center gap-3">
            <Layers className="text-[#155DFC]" size={20} />
            <h2 className="text-lg font-bold text-slate-800">Configure Course Branches</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-8 p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                <BookOpen size={16} className="text-slate-400" /> 1. Select Parent Course
              </label>
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full md:w-1/2 px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-medium text-slate-700 cursor-pointer appearance-none"
                required
              >
                <option value="" disabled>-- Select a Course from Master --</option>
                {courseList.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-6 pl-2 border-l-2 border-dashed border-slate-300 ml-4 relative">
              <label className="block text-sm font-bold text-slate-800 mb-4 pl-4">
                2. Enter Branches / Specializations
              </label>
              
              <div className="space-y-3 pl-4">
                {branches.map((branch, index) => (
                  <div key={branch.id} className="flex items-center gap-3 animate-in slide-in-from-left-2 duration-300">
                    <div className="w-6 h-[2px] bg-slate-300"></div>
                    <input 
                      type="text" 
                      placeholder={`e.g. ${index === 0 ? 'Computer Science' : 'Civil Engineering'}`}
                      value={branch.value}
                      onChange={(e) => handleBranchChange(branch.id, e.target.value)}
                      className="flex-1 md:w-1/2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-medium text-slate-800"
                      required={index === 0}
                    />
                    {branches.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => handleRemoveBranchField(branch.id)}
                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pl-14 mt-4">
                <button 
                  type="button"
                  onClick={handleAddBranchField}
                  className="flex items-center gap-2 text-sm font-bold text-[#155DFC] bg-[#155DFC]/10 hover:bg-[#155DFC]/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={16} /> Add Another Branch
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-2.5 text-sm font-bold text-white bg-[#155DFC] hover:bg-[#155DFC]/90 shadow-md active:scale-95 rounded-xl transition-all flex items-center gap-2"
              >
                Save Mapping
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Directory Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-lg">Current Mappings</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#155DFC]/20 outline-none font-medium" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-6 w-20">S.No</th>
                <th className="py-4 px-6">Parent Course</th>
                <th className="py-4 px-6">Total Branches</th>
                <th className="py-4 px-6">Specializations</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentItems.map((mapping, index) => (
                <tr key={mapping.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-sm text-slate-400 font-bold">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-800 text-sm">{mapping.courseName}</div>
                  </td>
                  <td className="py-4 px-6 text-center w-32">
                    <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 mx-auto">
                      {mapping.branches.length}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-2">
                      {mapping.branches.slice(0, 3).map((branch, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-[#155DFC]/5 border border-[#155DFC]/20 text-[#155DFC] text-xs font-bold rounded-lg">
                          {branch}
                        </span>
                      ))}
                      {mapping.branches.length > 3 && (
                        <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg">
                          +{mapping.branches.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(mapping.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Mapping"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- NEW EDUNAUT PAGINATION UI --- */}
        <div className="p-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center bg-white gap-4">
          
          {/* Left Side: Items Per Page */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Total: {totalRecords}</span>
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
                className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all cursor-pointer shadow-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">items / page</span>
          </div>

          {/* Right Side: Jump to Page and Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <select 
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all cursor-pointer shadow-sm"
                >
                  {[...Array(totalPages)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
              <span className="text-sm text-slate-500 font-medium whitespace-nowrap">of {totalPages} pages</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BranchCourseMaster;