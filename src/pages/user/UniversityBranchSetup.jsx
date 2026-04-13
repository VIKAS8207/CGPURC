import React, { useState } from 'react';
import { 
  GitBranch, BookOpen, Layers, Plus, Search, 
  Edit2, Trash2, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';

const UniversityBranchSetup = () => {
  // --- 1. DUMMY MASTER DATA (Usually comes from your backend) ---
  const courses = [
    { id: 'COURSE_01', name: 'Bachelor of Technology (B.Tech)' },
    { id: 'COURSE_02', name: 'Master of Business Administration (MBA)' },
    { id: 'COURSE_03', name: 'Bachelor of Science (B.Sc)' }
  ];

  // Map courses to their specific allowed branches
  const masterBranches = {
    'COURSE_01': ['Computer Science Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Information Technology'],
    'COURSE_02': ['Human Resources', 'Finance', 'Marketing', 'International Business'],
    'COURSE_03': ['Physics', 'Chemistry', 'Mathematics', 'Computer Science']
  };

  // --- 2. STATE MANAGEMENT ---
  const initialFormState = { courseId: '', branchName: '', semesters: '' };
  const [formData, setFormData] = useState(initialFormState);

  // The list of branches the university has actually created
  const [universityBranches, setUniversityBranches] = useState([
    { id: 1, courseName: 'Bachelor of Technology (B.Tech)', branchName: 'Computer Science Engineering', semesters: '8' },
    { id: 2, courseName: 'Master of Business Administration (MBA)', branchName: 'Finance', semesters: '4' },
  ]);

  // Derived state: Get available branches based on the selected course
  const availableBranches = formData.courseId ? masterBranches[formData.courseId] : [];

  // --- 3. HANDLERS ---
  const handleCourseChange = (e) => {
    // When course changes, reset the branch selection because the old branch might not belong to the new course
    setFormData({ 
      ...formData, 
      courseId: e.target.value, 
      branchName: '' 
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the full course name for the table display
    const selectedCourse = courses.find(c => c.id === formData.courseId);

    const newEntry = {
      id: Date.now(),
      courseName: selectedCourse.name,
      branchName: formData.branchName,
      semesters: formData.semesters
    };

    setUniversityBranches([newEntry, ...universityBranches]);
    setFormData(initialFormState); // Clear form
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <GitBranch className="text-orange-600" size={28} />
            Academic Branch Setup
          </h1>
          <p className="text-slate-500 mt-1">Select courses and activate specific branches for your university.</p>
        </div>
      </div>

      {/* Setup Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Plus className="text-orange-500" size={18} />
          Add New Branch Offering
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Course Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                <BookOpen size={14} className="text-slate-400" /> Master Course
              </label>
              <select 
                name="courseId" 
                value={formData.courseId} 
                onChange={handleCourseChange} 
                required 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white"
              >
                <option value="" disabled>Select Approved Course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Branch Dropdown (Dependent) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                <GitBranch size={14} className="text-slate-400" /> Specialization / Branch
              </label>
              <select 
                name="branchName" 
                value={formData.branchName} 
                onChange={handleInputChange} 
                required 
                disabled={!formData.courseId} // Disabled until a course is picked!
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="" disabled>
                  {formData.courseId ? "Select Branch..." : "Select Course First"}
                </option>
                {availableBranches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* 3. Semesters Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                <Layers size={14} className="text-slate-400" /> Total Semesters
              </label>
              <input 
                type="number" 
                name="semesters" 
                min="1" 
                max="10" 
                value={formData.semesters} 
                onChange={handleInputChange} 
                required 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                placeholder="e.g. 8" 
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              type="submit" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-orange-600/20 flex items-center gap-2"
            >
              Activate Branch
            </button>
          </div>
        </form>
      </div>

      {/* Active Branches Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Your Active Branches</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search branches..." 
              className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                <th className="p-4 font-medium">Course Program</th>
                <th className="p-4 font-medium">Branch / Specialization</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {universityBranches.map((branch) => (
                <tr key={branch.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{branch.courseName}</div>
                  </td>
                  <td className="p-4 text-slate-600">{branch.branchName}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-sm font-medium">
                      {branch.semesters} Semesters
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Active
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <button className="text-slate-400 hover:text-orange-500 transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 bg-white">
          <div>Showing 1 to {universityBranches.length} of {universityBranches.length} entries</div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="px-3 py-1.5 rounded-md bg-orange-50 text-orange-600 font-medium border border-orange-200">1</button>
            <button className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200">2</button>
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UniversityBranchSetup;
