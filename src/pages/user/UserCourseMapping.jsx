import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Layers, Clock, X, 
  Calendar, ChevronRight, ArrowLeft, ChevronDown, CheckCircle2 
} from 'lucide-react';

const UserCourseMapping = () => {
  const navigate = useNavigate();
  
  // --- MOCK DATA FROM ADMIN ---
  const adminDefinedCourses = [
    "Bachelor of Technology",
    "Master of Business Administration",
    "Bachelor of Science",
    "Bachelor of Computer Applications",
    "Diploma in Engineering",
    "Master of Arts"
  ];

  // --- FORM STATE ---
  const initialFormState = { 
    courseName: '', 
    shortCode: '', 
    courseType: '', 
    durationYears: '', 
    durationSemesters: '' // Added this state
  };
  const [formData, setFormData] = useState(initialFormState);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Submission
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
    setFormData(initialFormState);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg shrink-0">
              <CheckCircle2 className="text-[#FF6900]" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Course Registered</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                The program has been successfully added to your institutional portfolio.
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
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
        <span className="text-slate-900 font-semibold">Course Registration</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-lg">
            <Layers className="text-[#FF6900]" size={24} />
          </div>
          College Course Setup
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Map official degrees to your institution and define the specific program durations.</p>
      </div>

      {/* MAIN FORM CARD - FULL WIDTH */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-6">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={16} className="text-[#FF6900]" />
            Program Configuration
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Course Name Dropdown */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Course Name (From Registry)</label>
              <div className="relative">
                <select 
                  name="courseName" 
                  value={formData.courseName} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-bold text-slate-700 cursor-pointer"
                >
                  <option value="">Select a registered degree...</option>
                  {adminDefinedCourses.map((course, idx) => (
                    <option key={idx} value={course}>{course}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Course Type */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Course Type</label>
              <div className="relative">
                <select 
                  name="courseType" value={formData.courseType} onChange={handleInputChange} required 
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-bold text-slate-700 cursor-pointer"
                >
                  <option value="">Select Type...</option>
                  <option value="UG">Under Graduate (UG)</option>
                  <option value="PG">Post Graduate (PG)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="PhD">Doctorate (PhD)</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* College Course Code */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Institutional Course Code</label>
              <input 
                type="text" name="shortCode" value={formData.shortCode} onChange={handleInputChange} required 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-bold text-slate-700" 
                placeholder="e.g. BTECH-CS-2026" 
              />
            </div>

            {/* Duration - Years */}
            <div>
              <label className="block text-[10px] font-bold text-[#FF6900] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Calendar size={14} /> Total Years
              </label>
              <input 
                type="number" name="durationYears" value={formData.durationYears} onChange={handleInputChange} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] font-black text-slate-800" 
                placeholder="0" 
              />
            </div>

            {/* Duration - Semesters (New Field Added) */}
            <div>
              <label className="block text-[10px] font-bold text-[#FF6900] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers size={14} /> Total Semesters
              </label>
              <input 
                type="number" name="durationSemesters" value={formData.durationSemesters} onChange={handleInputChange} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] font-black text-slate-800" 
                placeholder="0" 
              />
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              className="bg-[#FF6900] text-white px-10 py-3 rounded-xl font-bold shadow-md shadow-[#FF6900]/20 hover:bg-[#e65f00] active:scale-95 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
            >
              <Plus size={18} />
              Register Program
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UserCourseMapping;