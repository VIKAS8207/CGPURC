import React, { useState } from 'react';
import { BookOpen, Plus, ChevronUp, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminCourseMaster = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Initial Form State
  const initialFormState = { courseName: '', courseCode: '', level: '', duration: '' };
  const [formData, setFormData] = useState(initialFormState);

  // Dummy data representing the central database
  const [courses, setCourses] = useState([
    { id: 1, courseName: 'Bachelor of Technology', courseCode: 'B.Tech', level: 'Under Graduate (UG)', duration: '4 Years' },
    { id: 2, courseName: 'Master of Business Administration', courseCode: 'MBA', level: 'Post Graduate (PG)', duration: '2 Years' },
    { id: 3, courseName: 'Bachelor of Science', courseCode: 'B.Sc', level: 'Under Graduate (UG)', duration: '3 Years' },
  ]);

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
    setIsFormOpen(false); // Optionally close form after submission
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={28} />
            Course Master
          </h1>
          <p className="text-slate-500 mt-1">Define the overarching degrees and programs available to universities.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm font-medium"
        >
          {isFormOpen ? <ChevronUp size={20} /> : <Plus size={20} />}
          {isFormOpen ? 'Close Form' : 'Add New Course'}
        </button>
      </div>

      {/* Add Course Form (Dropdown) */}
      {isFormOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-3">Course Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Full Course Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Course Name</label>
                <input 
                  type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  placeholder="e.g. Bachelor of Technology" 
                />
              </div>

              {/* Course Code / Short Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Short Name / Code</label>
                <input 
                  type="text" name="courseCode" value={formData.courseCode} onChange={handleInputChange} required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  placeholder="e.g. B.Tech" 
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Years)</label>
                <input 
                  type="number" name="duration" min="1" max="6" value={formData.duration} onChange={handleInputChange} required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  placeholder="e.g. 4" 
                />
              </div>

              {/* Academic Level */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Academic Level</label>
                <select 
                  name="level" value={formData.level} onChange={handleInputChange} required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                >
                  <option value="" disabled>Select Level</option>
                  <option value="Under Graduate (UG)">Under Graduate (UG)</option>
                  <option value="Post Graduate (PG)">Post Graduate (PG)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Ph.D / Doctorate">Ph.D / Doctorate</option>
                </select>
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Course Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Master Course Directory</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search courses..." className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                <th className="p-4 font-medium">Course Details</th>
                <th className="p-4 font-medium">Level</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{course.courseName}</div>
                    <div className="text-sm text-slate-500 font-mono mt-0.5">{course.courseCode}</div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{course.level}</td>
                  <td className="p-4 text-slate-600 text-sm">{course.duration}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-200">Active</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 bg-white">
          <div>Showing 1 to {courses.length} of {courses.length} entries</div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">1</button>
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseMaster;