import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Layers, Clock, X, 
  Calendar, ChevronRight, ArrowLeft, ChevronDown, CheckCircle2,
  Hash, GraduationCap
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
    courseMode: '', // Year or Semester
    duration: ''    // Value for either
  };
  const [formData, setFormData] = useState(initialFormState);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Reset duration if courseMode changes to avoid confusion
    if (name === 'courseMode') {
      setFormData({ ...formData, [name]: value, duration: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
    setFormData(initialFormState);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg shrink-0">
              <CheckCircle2 className="text-[#FF6900]" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Program Mapped</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                The course configuration has been saved to your institutional registry.
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold text-xs tracking-tight uppercase">Program Setup</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-lg">
            <GraduationCap className="text-[#FF6900]" size={24} />
          </div>
          Institutional Course Setup
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Define the timeline and institutional codes for approved degrees.</p>
      </div>

      {/* MAIN FORM CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-6">
          <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers size={14} className="text-[#FF6900]" />
            Program Parameters
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Course Name */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Parent Degree (Registry)</label>
              <div className="relative">
                <select 
                  name="courseName" 
                  value={formData.courseName} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full appearance-none px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-bold text-slate-700 cursor-pointer"
                >
                  <option value="">Select an approved degree...</option>
                  {adminDefinedCourses.map((course, idx) => (
                    <option key={idx} value={course}>{course}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 2. Course Type */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Classification</label>
              <div className="relative">
                <select 
                  name="courseType" value={formData.courseType} onChange={handleInputChange} required 
                  className="w-full appearance-none px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-bold text-slate-700 cursor-pointer"
                >
                  <option value="">Select Type...</option>
                  <option value="UG">Under Graduate (UG)</option>
                  <option value="PG">Post Graduate (PG)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="PhD">Doctorate (PhD)</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 3. Institutional Code */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Internal Program Code</label>
              <div className="relative">
                <Hash size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" name="shortCode" value={formData.shortCode} onChange={handleInputChange} required 
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-bold text-slate-800 shadow-inner" 
                  placeholder="e.g. BTECH-CS" 
                />
              </div>
            </div>

            {/* 4. Course Mode (Dropdown) */}
            <div>
              <label className="block text-[10px] font-black text-[#FF6900] uppercase tracking-widest mb-3 ml-1">Academic Cycle Mode</label>
              <div className="relative">
                <select 
                  name="courseMode" 
                  value={formData.courseMode} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full appearance-none px-5 py-3.5 bg-[#FF6900]/5 border-2 border-[#FF6900]/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-black text-[#FF6900] cursor-pointer"
                >
                  <option value="">Choose Mode...</option>
                  <option value="Year">Annual (Yearly)</option>
                  <option value="Semester">Semester Based</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#FF6900] pointer-events-none" />
              </div>
            </div>

            {/* 5. Dynamic Duration Field */}
            <div className={`transition-all duration-300 ${formData.courseMode ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none'}`}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">
                {formData.courseMode === 'Semester' ? 'Total Semesters' : formData.courseMode === 'Year' ? 'Total Years' : 'Duration'}
              </label>
              <div className="relative">
                {formData.courseMode === 'Semester' ? (
                    <Layers size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF6900]" />
                ) : (
                    <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF6900]" />
                )}
                <input 
                  type="number" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleInputChange} 
                  required={!!formData.courseMode}
                  disabled={!formData.courseMode}
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-black text-slate-900" 
                  placeholder={formData.courseMode ? `Enter total ${formData.courseMode.toLowerCase()}s` : "Select mode first"} 
                />
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#FF6900] active:scale-95 transition-all flex items-center gap-3"
            >
              <Plus size={18} />
              Save Mapping
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UserCourseMapping;