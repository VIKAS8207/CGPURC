import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ArrowLeft, 
  ChevronDown, X, MoreVertical 
} from 'lucide-react';

const AdminCourseMaster = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Edit Modal States
  const [editModalData, setEditModalData] = useState(null);
  const [editCourseName, setEditCourseName] = useState("");
  
  // Edunut Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Simplified Form State
  const [courseName, setCourseName] = useState("");

  // Mock Database (Simplified)
  const [courses, setCourses] = useState([
    { id: 1, name: 'Bachelor of Technology' },
    { id: 2, name: 'Master of Business Administration' },
    { id: 3, name: 'Bachelor of Science' },
    { id: 4, name: 'Bachelor of Computer Applications' },
    { id: 5, name: 'Master of Arts' },
    { id: 6, name: 'Bachelor of Arts' },
    { id: 7, name: 'Bachelor of Commerce' },
    { id: 8, name: 'Master of Commerce' },
    { id: 9, name: 'Master of Science' },
    { id: 10, name: 'Bachelor of Architecture' },
    { id: 11, name: 'Master of Computer Applications' },
    { id: 12, name: 'Bachelor of Pharmacy' }
  ]);

  // Handle clicking outside to close any open dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- FILTER & PAGINATION LOGIC ---
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRecords = filteredCourses.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleEditSave = (e) => {
    e.preventDefault();
    if (editModalData && editCourseName.trim() !== "") {
      setCourses(courses.map(course => 
        course.id === editModalData.id ? { ...course, name: editCourseName } : course
      ));
      setEditModalData(null);
      setEditCourseName("");
    }
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full relative">
      
      {/* EDIT COURSE MODAL (Edunut UI Design) */}
      {editModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Course Name</h2>
              <button 
                onClick={() => setEditModalData(null)}
                className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSave} className="p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Course Name</label>
              <input 
                type="text" 
                value={editCourseName}
                onChange={(e) => setEditCourseName(e.target.value)}
                placeholder="Enter new course name..."
                className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400"
                required
              />
              
              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setEditModalData(null)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-[10px] transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-[#155DFC] hover:bg-[#155DFC]/90 rounded-[10px] shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-3 rounded-[10px] outline-none"
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
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px]">
              <BookOpen className="text-[#155DFC]" size={24} />
            </div>
            Course Master
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage the list of approved degrees and programs for the system.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] transition-all shadow-md font-bold text-sm active:scale-95 outline-none ${
            isFormOpen ? 'bg-slate-100 text-slate-600' : 'bg-[#155DFC] text-white hover:bg-[#155DFC]/90 hover:shadow-lg'
          }`}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
          {isFormOpen ? 'Close Form' : 'Register New Course'}
        </button>
      </div>

      {/* SINGLE FIELD FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 font-bold text-slate-800 uppercase text-xs tracking-widest">
            Course Entry
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="max-w-2xl">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Course Name</label>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  value={courseName} 
                  onChange={(e) => setCourseName(e.target.value)} 
                  required 
                  className="flex-1 px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. Bachelor of Technology" 
                />
                <button type="submit" className="bg-[#155DFC] text-white px-8 py-2.5 rounded-[10px] font-bold shadow-md hover:shadow-lg hover:bg-[#155DFC]/90 active:scale-95 transition-all text-sm uppercase tracking-widest">
                  Save Course
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* DATA TABLE SECTION */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 tracking-tight text-lg">Course Registry</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-[10px] border-none shadow-sm bg-slate-50 focus:ring-2 focus:ring-[#155DFC]/20 outline-none font-medium text-slate-800 placeholder-slate-400 transition-all" 
            />
          </div>
        </div>

        {/* Simplified Table with S.No & Action Menu */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-6 w-20">S.No</th>
                <th className="py-4 px-6">Full Course Name</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentItems.length > 0 ? currentItems.map((course, index) => (
                <tr key={course.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-600 font-bold">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800 text-sm">
                    {course.name}
                  </td>
                  <td className="py-4 px-6 text-right relative dropdown-container">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === `action-${course.id}` ? null : `action-${course.id}`)}
                      className="p-2 text-slate-400 hover:bg-[#155DFC]/10 hover:text-[#155DFC] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {/* Edunut Action Dropdown */}
                    {openDropdown === `action-${course.id}` && (
                      <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <button
                          onClick={() => { 
                            setEditModalData(course); 
                            setEditCourseName(course.name); 
                            setOpenDropdown(null); 
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#155DFC]/10 hover:text-[#155DFC] transition-colors border-b border-slate-50 text-left outline-none"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => { handleDelete(course.id); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left outline-none"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-slate-500 font-medium">
                    No courses found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- STRICT EDUNUT PAGINATION UI --- */}
        <div className="bg-white border-t border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center text-sm text-slate-600">
            <span className="font-medium mr-3">Total: {totalRecords}</span>
            
            {/* Custom Styled Dropdown for Items Per Page */}
            <div className="relative inline-flex items-center dropdown-container">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-medium cursor-pointer text-slate-700"
              >
                {[1, 2, 3, 4, 5, 6, 7, 10, 15, 20, 50].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
            </div>
            
            <span className="ml-3">items per page</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-600">
            
            {/* Custom Styled Dropdown for Page Select */}
            <div className="flex items-center">
              <div className="relative inline-flex items-center mr-2 dropdown-container">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-medium cursor-pointer text-slate-700"
                >
                  {Array.from({ length: totalPages || 1 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
              </div>
              <span>of {totalPages || 1} pages</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminCourseMaster;