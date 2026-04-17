import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, Layers, X, Calendar, ChevronRight, ArrowLeft, ChevronDown, CheckCircle2,
  Hash, GraduationCap, ShieldCheck, MoreVertical, Edit3, Trash2, ChevronLeft
} from 'lucide-react';

const UserCourseMapping = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- MOCK DATA & CONSTANTS ---
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

  // --- STATE ---
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const initialFormState = { courseName: '', shortCode: '', courseType: '', courseMode: '', duration: '' };
  const [formData, setFormData] = useState(initialFormState);

  // Table Data State
  const [mappedCourses, setMappedCourses] = useState([
    { id: 1, name: "Bachelor of Technology", code: "BTECH-CS", type: "UG", mode: "Semester", duration: "8" },
    { id: 2, name: "Master of Business Administration", code: "MBA-GEN", type: "PG", mode: "Semester", duration: "4" },
    { id: 3, name: "Diploma in Engineering", code: "DIP-MECH", type: "Diploma", mode: "Year", duration: "3" },
  ]);

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
    const newEntry = {
      id: Date.now(),
      name: formData.courseName,
      code: formData.shortCode,
      type: formData.courseType,
      mode: formData.courseMode,
      duration: formData.duration
    };
    setMappedCourses([newEntry, ...mappedCourses]);
    setFormData(initialFormState);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  // --- UI COMPONENTS ---
  const generateBreadcrumbs = () => {
    return (
      <>
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Program Setup</span>
      </>
    );
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-20 relative px-4 md:px-8">
      
      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Program Mapped</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Saved to your institutional registry.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-slate-400 hover:text-slate-600 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation & Header */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
            <GraduationCap size={24} />
          </div>
          Institutional Course Setup
        </h1>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden mb-10">
        <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex items-center gap-2">
          <Layers size={18} className="text-slate-400" />
          <h2 className="text-[10px] font-bold text-slate-700 uppercase tracking-[2px]">Program Parameters</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 relative dropdown-container">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Parent Degree</label>
              <button type="button" onClick={() => setOpenDropdown(openDropdown === 'courseName' ? null : 'courseName')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-none shadow-sm rounded-[10px] outline-none transition-all font-medium text-slate-800">
                <span className={formData.courseName ? "text-slate-800" : "text-slate-400"}>{formData.courseName || "Select degree..."}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${openDropdown === 'courseName' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'courseName' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100 max-h-48 overflow-y-auto">
                  {adminDefinedCourses.map((c, i) => (
                    <button key={i} type="button" onClick={() => handleCustomSelect('courseName', c)} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors outline-none">{c}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative dropdown-container">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Classification</label>
              <button type="button" onClick={() => setOpenDropdown(openDropdown === 'courseType' ? null : 'courseType')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] outline-none shadow-sm transition-all font-medium text-slate-800">
                <span>{courseTypes.find(c => c.value === formData.courseType)?.label || "Select Type..."}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>
              {openDropdown === 'courseType' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100">
                  {courseTypes.map((t, i) => (
                    <button key={i} type="button" onClick={() => handleCustomSelect('courseType', t.value)} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#FF6900]/10 hover:text-[#FF6900] outline-none">{t.label}</button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Course ID</label>
              <input type="text" name="shortCode" value={formData.shortCode} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 rounded-[10px] outline-none shadow-sm font-medium" placeholder="e.g. BTECH-CS" required />
            </div>

            <div className="relative dropdown-container">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cycle Mode</label>
              <button type="button" onClick={() => setOpenDropdown(openDropdown === 'courseMode' ? null : 'courseMode')} className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-[10px] outline-none shadow-sm font-medium">
                <span>{courseModes.find(c => c.value === formData.courseMode)?.label || "Choose Mode..."}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>
              {openDropdown === 'courseMode' && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[10px] shadow-xl z-50 border border-slate-100">
                  {courseModes.map((m, i) => (
                    <button key={i} type="button" onClick={() => handleCustomSelect('courseMode', m.value)} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#FF6900]/10 hover:text-[#FF6900] outline-none">{m.label}</button>
                  ))}
                </div>
              )}
            </div>

            <div className={!formData.courseMode ? 'opacity-40 pointer-events-none' : ''}>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Duration ({formData.courseMode || 'Mode'})</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 rounded-[10px] outline-none shadow-sm font-medium" placeholder="Enter total..." required />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="w-full sm:w-auto px-10 py-3.5 text-sm font-bold text-white bg-[#FF6900] rounded-[10px] shadow-[0_4px_14px_0_rgba(255,105,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,105,0,0.23)] transition-all flex items-center justify-center gap-2 active:scale-95">
              <Plus size={18} /> Save Mapping
            </button>
          </div>
        </form>
      </div>

      {/* TABLE SECTION (Edunut UI Design) */}
      <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm overflow-hidden text-left">
        <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash size={16} className="text-slate-400" />
            <h2 className="text-[10px] font-bold text-slate-700 uppercase tracking-[2px]">Mapped Registries</h2>
          </div>
          <span className="text-[10px] bg-[#FF6900]/10 text-[#FF6900] px-3 py-1 rounded-full font-bold uppercase">{mappedCourses.length} Active Programs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Degree Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Inst. Code</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Classification</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Cycle</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Duration</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mappedCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-[8px] flex items-center justify-center text-slate-400 group-hover:bg-[#FF6900]/10 group-hover:text-[#FF6900] transition-all">
                        <GraduationCap size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{course.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-[6px] text-xs font-bold font-mono tracking-tight">{course.code}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      course.type === 'UG' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {course.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-medium text-slate-500">{course.mode}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-slate-700">{course.duration}</span>
                    <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase">{course.mode === 'Year' ? 'Yrs' : 'Sems'}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-[#FF6900] hover:bg-[#FF6900]/10 rounded-[8px] transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[8px] transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (Edunut UI) */}
        <div className="bg-slate-50/30 p-4 px-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 1 to {mappedCourses.length} of {mappedCourses.length} entries</p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-[8px] text-slate-400 hover:border-[#FF6900] hover:text-[#FF6900] transition-all disabled:opacity-50"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 bg-[#FF6900] text-white rounded-[8px] text-xs font-bold shadow-[0_4px_10px_rgba(255,105,0,0.3)]">1</button>
            <button className="p-2 bg-white border border-slate-200 rounded-[8px] text-slate-400 hover:border-[#FF6900] hover:text-[#FF6900] transition-all disabled:opacity-50"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourseMapping;