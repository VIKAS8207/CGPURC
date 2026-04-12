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

  // --- MOCK DEPENDENCY DATA (From Course Master) ---
  const courseList = [
    { id: 'c1', name: 'B.Tech (Bachelor of Technology)' },
    { id: 'c2', name: 'M.Tech (Master of Technology)' },
    { id: 'c3', name: 'B.Sc (Bachelor of Science)' },
    { id: 'c4', name: 'BBA (Bachelor of Arts)' },
    { id: 'c5', name: 'MBA (Master of Business Admin)' },
  ];

  // --- FORM STATE (Dynamic Branch Inputs) ---
  const [selectedCourse, setSelectedCourse] = useState("");
  const [branches, setBranches] = useState([{ id: Date.now(), value: "" }]);

  // --- MOCK TABLE DATA ---
  const [branchMappings, setBranchMappings] = useState([
    { id: 1, courseName: "B.Tech (Bachelor of Technology)", branches: ["Computer Science", "Civil Engineering", "Mechanical", "Electrical", "Information Technology"] },
    { id: 2, courseName: "B.Sc (Bachelor of Science)", branches: ["Physics", "Mathematics", "Chemistry", "Computer Science"] },
    { id: 3, courseName: "MBA (Master of Business Admin)", branches: ["Finance", "Marketing", "Human Resources"] },
    { id: 4, courseName: "BBA (Bachelor of Arts)", branches: ["General Management"] },
  ]);

  // --- PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(branchMappings.length / itemsPerPage);
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
    
    // Filter out empty branches
    const validBranches = branches.filter(b => b.value.trim() !== "").map(b => b.value.trim());
    const courseObj = courseList.find(c => c.id === selectedCourse);

    if (!courseObj || validBranches.length === 0) return;

    // Add to table
    const newMapping = {
      id: Date.now(),
      courseName: courseObj.name,
      branches: validBranches
    };

    setBranchMappings([newMapping, ...branchMappings]);
    
    // Trigger Notification
    setNotificationData({ course: courseObj.name, count: validBranches.length });
    setShowNotification(true);
    setIsFormOpen(false);

    // Reset Form
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
            
            {/* Step 1: Select Parent Course */}
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

            {/* Step 2: Dynamic Branch Inputs */}
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
                  className="flex items-center gap-2 text-sm font-bold text-[#155DFC] hover:text-[#155DFC] bg-[#155DFC]/10 hover:bg-[#155DFC]/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={16} /> Add Another Branch
                </button>
              </div>
            </div>

            {/* Footer */}
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

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-2xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search mappings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all text-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Parent Course</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Branches</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Mapped Branches</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((mapping) => (
              <tr key={mapping.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    
                    {mapping.courseName}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                    {mapping.branches.length}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-2">
                    {mapping.branches.slice(0, 3).map((branch, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#155DFC]/5 border border-[#155DFC]/20 text-[#155DFC] text-xs font-semibold rounded-lg">
                        {branch}
                      </span>
                    ))}
                    {mapping.branches.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg">
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

      {/* Pagination Footer */}
      <div className="bg-white border border-slate-200 rounded-b-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">{branchMappings.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-medium text-slate-700">{Math.min(indexOfLastItem, branchMappings.length)}</span> of <span className="font-medium text-slate-700">{branchMappings.length}</span> entries
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-[#155DFC] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default BranchCourseMaster;