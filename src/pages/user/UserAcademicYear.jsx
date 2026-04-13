import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarDays, AlertTriangle, Eye, Edit2, 
  CheckCircle2, Clock, ArrowRight, X, FileText, Check,
  ChevronLeft, ChevronRight, UploadCloud, ArrowLeft, ChevronDown
} from 'lucide-react';

const UserAcademicYear = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  
  // 1. Action Required (Strictly Pending)
  const [openSession, setOpenSession] = useState({
    id: 101,
    name: "Academic Year 2024-25",
    deadline: "Oct 31, 2024",
    status: "pending" 
  });

  // 2. Currently Active (Submitted - Unlimited Edits Allowed)
  const [activeYears, setActiveYears] = useState([
    { id: 201, name: "Academic Year 2023-24", start: "Apr 01, 2023", end: "Mar 31, 2024", submittedOn: "Nov 12, 2023" }
  ]);

  // 3. Completed Sessions (Archived, Read-Only)
  const completedYearsData = [
    { id: 301, name: "Academic Year 2022-23", start: "Apr 01, 2022", end: "Mar 31, 2023", submittedOn: "Oct 25, 2022" },
    { id: 302, name: "Academic Year 2021-22", start: "Apr 01, 2021", end: "Mar 31, 2022", submittedOn: "Nov 02, 2021" },
    { id: 303, name: "Academic Year 2020-21", start: "Apr 01, 2020", end: "Mar 31, 2021", submittedOn: "Oct 15, 2020" },
    { id: 304, name: "Academic Year 2019-20", start: "Apr 01, 2019", end: "Mar 31, 2020", submittedOn: "Nov 01, 2019" },
  ];

  // --- UI STATES ---
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);
  const [sessionBeingEdited, setSessionBeingEdited] = useState(null);

  // --- PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(completedYearsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompletedYears = completedYearsData.slice(indexOfFirstItem, indexOfLastItem);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    universityId: "",
    universityName: "",
    uniqueId: "",
    contactNumber: "",
    emailId: "",
    websiteUrl: "",
    address: "",
    pinCode: "",
    logoFileName: ""
  });

  // --- HANDLERS ---
  const handleOpenEdit = (year) => {
    setSessionBeingEdited(year);
    setIsFormModalOpen(true); // Directly open form, no warning popup
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFormModalOpen(false);
    
    if (sessionBeingEdited) {
      // Logic for updating existing entry
      setSessionBeingEdited(null);
    } else if (openSession) {
      // Logic for moving pending to active
      setOpenSession(null); 
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
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
        <span className="text-slate-900 font-semibold">Academic Year Submissions</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-lg">
            <CalendarDays className="text-[#FF6900]" size={24} />
          </div>
          Academic Year Submissions
        </h1>
        <p className="text-slate-500 mt-2 font-medium">View active sessions and manage your institutional compliance data.</p>
      </div>

      {/* SECTION 1: ACTION REQUIRED */}
      {openSession && (
        <div className="mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Action Required</h2>
          
          <div className="bg-gradient-to-br from-[#FF6900]/5 to-white border border-[#FF6900]/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6900]/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#FF6900]/10 text-[#FF6900] rounded-xl mt-1">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{openSession.name}</h3>
                    <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-md uppercase tracking-wider border border-red-100">
                      Pending Submission
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium flex items-center gap-2 mt-2">
                    <Clock size={16} className="text-[#FF6900]" />
                    Submission Deadline: <span className="font-bold text-slate-800">{openSession.deadline}</span>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => { setSessionBeingEdited(null); setIsFormModalOpen(true); }}
                className="flex items-center gap-2 bg-[#FF6900] hover:bg-[#e65f00] text-white px-6 py-2.5 rounded-xl font-bold shadow-md active:scale-95 transition-all"
              >
                Enter Details <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}


      {/* SECTION 2: CURRENTLY ACTIVE (EDITABLE) */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Currently Active</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeYears.map(year => (
            <div key={year.id} className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#FF6900]/30 transition-all duration-300 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">{year.name}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-sm text-slate-500 font-medium">{year.start} to {year.end}</p>
                <p className="text-xs font-bold text-[#FF6900] bg-[#FF6900]/5 px-2 py-1 rounded w-fit mt-3 uppercase tracking-wider">
                  Verified Submission
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleOpenEdit(year)}
                  className="p-2.5 text-[#FF6900] hover:bg-[#FF6900]/10 rounded-xl transition-colors border border-transparent hover:border-[#FF6900]/20"
                  title="Update Information"
                >
                  <Edit2 size={18} />
                </button>
                
                <button 
                  onClick={() => setViewModalData({ ...year, isRecent: true, ...formData })}
                  className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                  title="View Submission"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* SECTION 3: COMPLETED SESSIONS */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Completed Sessions</h2>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session Name</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Date</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Date</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="py-4 px-6 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentCompletedYears.map((year) => (
                  <tr key={year.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" />
                        {year.name}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.start}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.end}</td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 border border-slate-200">ARCHIVED</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setViewModalData(year)}
                        className="p-2 text-slate-400 hover:text-[#FF6900] hover:bg-orange-50 rounded-lg transition-colors inline-flex opacity-0 group-hover:opacity-100" 
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white border-t border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-bold">
              Showing <span className="text-slate-900">{indexOfFirstItem + 1}</span> to <span className="text-slate-900">{Math.min(indexOfLastItem, completedYearsData.length)}</span> of {completedYearsData.length} records
            </p>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-[#FF6900] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* DATA ENTRY FORM MODAL */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Institution Master Data Form</h2>
                <p className="text-xs font-bold text-[#FF6900] mt-1 uppercase tracking-wider">{sessionBeingEdited ? sessionBeingEdited.name : openSession?.name}</p>
              </div>
              <button onClick={() => setIsFormModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">University ID</label>
                  <input 
                    type="text" placeholder="e.g. UNIV-1024" value={formData.universityId}
                    onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Name</label>
                  <input 
                    type="text" placeholder="Full Institution Name" value={formData.universityName}
                    onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">AISHE / State Code</label>
                  <input 
                    type="text" placeholder="Unique Identification Code" value={formData.uniqueId}
                    onChange={(e) => setFormData({...formData, uniqueId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
                  <input 
                    type="tel" placeholder="+91 XXXXX XXXXX" value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Official Email ID</label>
                  <input 
                    type="email" placeholder="official@university.edu" value={formData.emailId}
                    onChange={(e) => setFormData({...formData, emailId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Website URL</label>
                  <input 
                    type="url" placeholder="https://www.university.edu" value={formData.websiteUrl}
                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Address</label>
                  <textarea 
                    rows="3" placeholder="Enter complete physical address..." value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Logo</label>
                  <label className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-[#FF6900]/40 transition-all cursor-pointer group shadow-inner">
                    <div className="p-4 bg-white border border-slate-200 rounded-full mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <UploadCloud className="text-[#FF6900]" size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 font-medium">PNG, JPG, SVG up to 2MB</p>
                    <input 
                      type="file" className="hidden" 
                      onChange={(e) => setFormData({...formData, logoFileName: e.target.files[0]?.name || ""})} 
                    />
                    {formData.logoFileName && (
                      <p className="mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <Check size={14} /> Selected: {formData.logoFileName}
                      </p>
                    )}
                  </label>
                </div>

              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsFormModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
              <button onClick={handleFormSubmit} className="px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] hover:bg-[#e65f00] rounded-xl shadow-md active:scale-95 transition-all">Submit Details</button>
            </div>
          </div>
        </div>
      )}


      {/* VIEW SUBMITTED DATA MODAL (READ-ONLY) */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Submission Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Academic Session</p>
                  <p className="text-xl font-bold text-slate-800">{viewModalData.name}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-widest">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "University ID", value: viewModalData.universityId },
                  { label: "University Name", value: viewModalData.universityName },
                  { label: "AISHE Code", value: viewModalData.uniqueId },
                  { label: "Contact No.", value: viewModalData.contactNumber },
                  { label: "Email ID", value: viewModalData.emailId },
                  { label: "Website", value: viewModalData.websiteUrl },
                  { label: "Address", value: viewModalData.address, full: true },
                  { label: "Pin Code", value: viewModalData.pinCode },
                  { label: "Logo File", value: viewModalData.logoFileName }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 bg-slate-50 rounded-2xl border border-slate-100 ${item.full ? 'md:col-span-2' : ''}`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-slate-800 break-all">{item.value || "N/A"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setViewModalData(null)}
                className="px-8 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-all shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserAcademicYear;