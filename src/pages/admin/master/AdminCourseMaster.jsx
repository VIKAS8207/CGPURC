import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ArrowLeft, 
  ChevronDown, X 
} from 'lucide-react';

const AdminCourseMaster = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Edunaut Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Simplified Form State
  const [courseName, setCourseName] = useState("");

  // Mock Database (Simplified)
  const [courses, setCourses] = useState([
    { id: 1, name: 'Bachelor of Technology' },
    { id: 2, name: 'Master of Business Administration' },
    { id: 3, name: 'Bachelor of Science' },
    { id: 4, name: 'Bachelor of Computer Applications' },
    { id: 5, name: 'Master of Arts' },
  ]);

  // --- PAGINATION LOGIC ---
  const totalRecords = courses.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { 
      id: Date.now(), 
      name: courseName 
    };
    setCourses([newCourse, ...courses]);
    setCourseName("");
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
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
        <Link to="/admin-dashboard" className="hover:text-[#155DFC]">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC]">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Course Registry</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg">
              <BookOpen className="text-[#155DFC]" size={24} />
            </div>
            Course Master
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage the list of approved degrees and programs for the system.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md font-bold text-sm active:scale-95 ${
            isFormOpen ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-[#155DFC] text-white'
          }`}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
          {isFormOpen ? 'Close Form' : 'Register New Course'}
        </button>
      </div>

      {/* SINGLE FIELD FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 font-bold text-slate-800 uppercase text-xs tracking-widest">
            Course Entry
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="max-w-2xl">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Full Course Name</label>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  value={courseName} 
                  onChange={(e) => setCourseName(e.target.value)} 
                  required 
                  className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#155DFC]/10 focus:border-[#155DFC] transition-all font-bold text-slate-700" 
                  placeholder="e.g. Bachelor of Technology" 
                />
                <button type="submit" className="bg-[#155DFC] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-[#155DFC]/20 active:scale-95 transition-all text-xs uppercase tracking-widest">
                  Save Course
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* DATA TABLE SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 tracking-tight text-lg">Course Registry</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#155DFC]/20 outline-none font-medium" 
            />
          </div>
        </div>

        {/* Simplified Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-6 w-20">S.No</th>
                <th className="py-4 px-6">Full Course Name</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentItems.map((course, index) => (
                <tr key={course.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-400 font-bold">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800 text-sm">
                    {course.name}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-[#155DFC] hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- NEW EDUNAUT PAGINATION UI --- */}
        <div className="p-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center bg-white gap-4">
          
          {/* Left: Items Per Page Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Total: {totalRecords}</span>
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
                className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all cursor-pointer shadow-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
            <span className="text-sm text-slate-500 font-medium">items / page</span>
          </div>

          {/* Right: Page Selector Dropdown */}
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
                className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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

export default AdminCourseMaster;