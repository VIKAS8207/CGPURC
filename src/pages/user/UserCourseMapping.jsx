import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, Layers, X, Calendar, ChevronRight, ArrowLeft, ChevronDown, CheckCircle2,
  Hash, GraduationCap, ShieldCheck
} from 'lucide-react';

const UserCourseMapping = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Program Setup</span>
        </>
      );
    }
    return paths.map((path, index) => {
      const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
      const isLast = index === paths.length - 1;
      const displayName = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return (
        <React.Fragment key={routeTo}>
          {isLast ? (
             <span className="text-slate-900 font-semibold tracking-tight">Program Setup</span>
          ) : (
             <>
               <Link to={routeTo} className="hover:text-[#FF6900] transition-colors">{displayName}</Link>
               <ChevronRight size={14} className="text-slate-400" />
             </>
          )}
        </React.Fragment>
      );
    });
  };

  // --- MOCK DATA FROM ADMIN ---
  const adminDefinedCourses = [
    "Bachelor of Technology",
    "Master of Business Administration",
    "Bachelor of Science",
    "Bachelor of Computer Applications",
    "Diploma in Engineering",
    "Master of Arts"
  ];

  const courseTypes = [
    { label: 'Under Graduate (UG)', value: 'UG' },
    { label: 'Post Graduate (PG)', value: 'PG' },
    { label: 'Diploma', value: 'Diploma' },
    { label: 'Doctorate (PhD)', value: 'PhD' }
  ];

  const courseModes = [
    { label: 'Annual (Yearly)', value: 'Year' },
    { label: 'Semester Based', value: 'Semester' }
  ];

  // --- UI STATES ---
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // --- FORM STATE ---
  const initialFormState = { 
    courseName: '', 
    shortCode: '', 
    courseType: '', 
    courseMode: '', // Year or Semester
    duration: ''    // Value for either
  };
  const [formData, setFormData] = useState(initialFormState);

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

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomSelect = (name, value) => {
    if (name === 'courseMode') {
      setFormData({ ...formData, [name]: value, duration: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setOpenDropdown(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit formData to your API here.
    setFormData(initialFormState);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative">
      
      {/* SUCCESS NOTIFICATION TOAST (Edunut UI - Orange) */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Program Mapped</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                The course configuration has been successfully saved to your institutional registry.
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 rounded-[10px] outline-none"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Dynamic Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
            <GraduationCap size={24} />
          </div>
          Institutional Course Setup
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Define the timeline and institutional codes for approved degrees.</p>
      </div>

      {/* MAIN FORM CARD (Edunut UI - Orange) */}
      <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden w-full mb-8">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-6 flex items-center gap-2">
          <Layers size={18} className="text-slate-400" />
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
            Program Parameters
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            
            {/* 1. Course Name (Custom Dropdown) */}
            <div className="lg:col-span-2 relative dropdown-container">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Parent Degree (Registry)</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'courseName' ? null : 'courseName')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
              >
                <span className={formData.courseName ? "text-slate-800" : "text-slate-400"}>
                  {formData.courseName || "Select an approved degree..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'courseName' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'courseName' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100 max-h-60 overflow-y-auto">
                  {adminDefinedCourses.map((course, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect('courseName', course)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${formData.courseName === course ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Course Type (Custom Dropdown) */}
            <div className="relative dropdown-container">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Classification</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'courseType' ? null : 'courseType')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
              >
                <span className={formData.courseType ? "text-slate-800" : "text-slate-400"}>
                  {courseTypes.find(c => c.value === formData.courseType)?.label || "Select Type..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'courseType' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'courseType' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                  {courseTypes.map((type, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect('courseType', type.value)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${formData.courseType === type.value ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Institutional Code */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Internal Program Code</label>
              <input 
                type="text" name="shortCode" value={formData.shortCode} onChange={handleInputChange} required 
                className="w-full px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                placeholder="e.g. BTECH-CS" 
              />
            </div>

            {/* 4. Course Mode (Custom Dropdown - Normal colors) */}
            <div className="relative dropdown-container">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Cycle Mode</label>
              <button 
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'courseMode' ? null : 'courseMode')}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 cursor-pointer outline-none"
              >
                <span className={formData.courseMode ? "text-slate-800" : "text-slate-400"}>
                  {courseModes.find(c => c.value === formData.courseMode)?.label || "Choose Mode..."}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openDropdown === 'courseMode' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'courseMode' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border border-slate-100">
                  {courseModes.map((mode, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCustomSelect('courseMode', mode.value)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-[#FF6900]/10 hover:text-[#FF6900] ${formData.courseMode === mode.value ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700'}`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Dynamic Duration Field */}
            <div className={`transition-all duration-300 ${formData.courseMode ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none'}`}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {formData.courseMode === 'Semester' ? 'Total Semesters' : formData.courseMode === 'Year' ? 'Total Years' : 'Duration'}
              </label>
              <input 
                type="number" 
                name="duration" 
                min="1"
                max="20"
                value={formData.duration} 
                onChange={handleInputChange} 
                required={!!formData.courseMode}
                disabled={!formData.courseMode}
                className="w-full px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                placeholder={formData.courseMode ? `Enter total ${formData.courseMode.toLowerCase()}s` : "Select mode first"} 
              />
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-[#FF6900] hover:bg-[#FF6900]/90 shadow-md hover:shadow-lg rounded-[10px] transition-all active:scale-95 outline-none flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Save Mapping
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UserCourseMapping;