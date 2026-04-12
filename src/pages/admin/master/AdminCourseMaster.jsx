import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Plus, ChevronUp, Search, Filter, 
  Edit2, Trash2, ChevronLeft, ChevronRight, 
  ArrowLeft, ChevronDown 
} from 'lucide-react';

const AdminCourseMaster = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Pagination States (Added for consistency)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Initial Form State
  const initialFormState = { courseName: '', courseCode: '', level: '', duration: '' };
  const [formData, setFormData] = useState(initialFormState);

  // Dummy data representing the central database
  const [courses, setCourses] = useState([
    { id: 1, courseName: 'Bachelor of Technology', courseCode: 'B.Tech', level: 'Under Graduate (UG)', duration: '4 Years' },
    { id: 2, courseName: 'Master of Business Administration', courseCode: 'MBA', level: 'Post Graduate (PG)', duration: '2 Years' },
    { id: 3, courseName: 'Bachelor of Science', courseCode: 'B.Sc', level: 'Under Graduate (UG)', duration: '3 Years' },
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { ...formData, id: Date.now(), duration: `${formData.duration} Years` };
    setCourses([newCourse, ...courses]);
    setFormData(initialFormState); // Reset form
    setIsFormOpen(false); // Close form after submission
  };

  // Handle Delete
  const handleDelete = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
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
        <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Course Master</span>
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
          <p className="text-slate-500 mt-2">Define the overarching degrees and programs available to universities.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm font-medium ${isFormOpen ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' : 'bg-slate-900 hover:bg-black text-white shadow-md active:scale-95'}`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel' : 'Add New Course'}
        </button>
      </div>

      {/* Add Course Form (Expandable) */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Create New Program / Degree</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              
              {/* Full Course Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Course Name</label>
                <input 
                  type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-medium text-slate-800" 
                  placeholder="e.g. Bachelor of Technology" 
                />
              </div>

              {/* Course Code / Short Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Short Name / Code</label>
                <input 
                  type="text" name="courseCode" value={formData.courseCode} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-medium text-slate-800" 
                  placeholder="e.g. B.Tech" 
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Years)</label>
                <input 
                  type="number" name="duration" min="1" max="6" value={formData.duration} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-medium text-slate-800" 
                  placeholder="e.g. 4" 
                />
              </div>

              {/* Academic Level */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Level</label>
                <select 
                  name="level" value={formData.level} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all font-medium text-slate-800"
                >
                  <option value="" disabled>Select Level...</option>
                  <option value="Under Graduate (UG)">Under Graduate (UG)</option>
                  <option value="Post Graduate (PG)">Post Graduate (PG)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Ph.D / Doctorate">Ph.D / Doctorate</option>
                </select>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-2.5 text-sm font-medium text-white bg-[#155DFC] hover:bg-[#155DFC]/90 shadow-md hover:shadow-lg rounded-xl transition-all active:scale-95"
              >
                Save Course to Master
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-t-2xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC] transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Course Data Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Level</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800">{course.courseName}</div>
                  <div className="text-xs font-bold text-[#155DFC] bg-[#155DFC]/10 px-2 py-0.5 rounded border border-[#155DFC]/20 w-fit mt-1">
                    {course.courseCode}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">{course.level}</td>
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">{course.duration}</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-md text-xs font-bold border border-emerald-200">ACTIVE</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(course.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Delete"
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
          Showing <span className="font-medium text-slate-700">{courses.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-medium text-slate-700">{Math.min(indexOfLastItem, courses.length)}</span> of <span className="font-medium text-slate-700">{courses.length}</span> entries
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

export default AdminCourseMaster;