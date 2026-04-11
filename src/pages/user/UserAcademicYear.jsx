import React, { useState } from 'react';
import { 
  CalendarDays, AlertTriangle, Eye, Edit2, 
  CheckCircle2, Clock, ArrowRight, X, FileText, Check,
  ChevronLeft, ChevronRight, UploadCloud
} from 'lucide-react';

const UserAcademicYear = () => {
  // --- MOCK DATA ---
  
  // 1. Action Required (Strictly Pending)
  const [openSession, setOpenSession] = useState({
    id: 101,
    name: "Academic Year 2024-25",
    deadline: "Oct 31, 2024",
    status: "pending" 
  });

  // 2. Currently Active (Submitted but still in the active year - Editable ONCE)
  const [activeYears, setActiveYears] = useState([
    { id: 201, name: "Academic Year 2023-24", start: "Apr 01, 2023", end: "Mar 31, 2024", submittedOn: "Nov 12, 2023", editUsed: false }
  ]);

  // 3. Completed Sessions (Archived, Read-Only)
  const completedYearsData = [
    { id: 301, name: "Academic Year 2022-23", start: "Apr 01, 2022", end: "Mar 31, 2023", submittedOn: "Oct 25, 2022" },
    { id: 302, name: "Academic Year 2021-22", start: "Apr 01, 2021", end: "Mar 31, 2022", submittedOn: "Nov 02, 2021" },
    { id: 303, name: "Academic Year 2020-21", start: "Apr 01, 2020", end: "Mar 31, 2021", submittedOn: "Oct 15, 2020" },
    { id: 304, name: "Academic Year 2019-20", start: "Apr 01, 2019", end: "Mar 31, 2020", submittedOn: "Nov 01, 2019" },
    { id: 305, name: "Academic Year 2018-19", start: "Apr 01, 2018", end: "Mar 31, 2019", submittedOn: "Oct 20, 2018" },
    { id: 306, name: "Academic Year 2017-18", start: "Apr 01, 2017", end: "Mar 31, 2018", submittedOn: "Oct 10, 2017" },
  ];

  // --- UI STATES ---
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);
  const [sessionBeingEdited, setSessionBeingEdited] = useState(null);

  // --- PAGINATION STATES (For Completed Sessions) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(completedYearsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompletedYears = completedYearsData.slice(indexOfFirstItem, indexOfLastItem);

  // --- NEW UPDATED FORM STATE ---
  const [formData, setFormData] = useState({
    universityId: "",
    universityName: "",
    uniqueId: "",
    contactNumber: "",
    emailId: "",
    websiteUrl: "",
    address: "",
    pinCode: "",
    logoFileName: "" // Mocking the file upload state
  });

  // --- HANDLERS ---
  const handleOpenEdit = (year) => {
    setSessionBeingEdited(year);
    setIsWarningModalOpen(true);
  };

  const confirmEdit = () => {
    setIsWarningModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFormModalOpen(false);
    
    // If they were editing an active year, lock it so they can't edit again
    if (sessionBeingEdited) {
      setActiveYears(activeYears.map(year => 
        year.id === sessionBeingEdited.id ? { ...year, editUsed: true } : year
      ));
      setSessionBeingEdited(null);
    } else if (openSession) {
      // If they were entering details for the first time, move it to active (Mock logic)
      setOpenSession(null); 
    }
  };

  return (
    <div className="animate-in fade-in duration-500 relative max-w-6xl mx-auto">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <CalendarDays className="text-orange-600" size={24} />
          </div>
          Academic Year Submissions
        </h1>
        <p className="text-slate-500 mt-2">View active sessions and submit your institutional data.</p>
      </div>

      {/* =========================================
          SECTION 1: ACTION REQUIRED (OPEN SESSIONS)
          ========================================= */}
      {openSession && (
        <div className="mb-10">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Action Required</h2>
          
          <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl mt-1">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{openSession.name}</h3>
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md uppercase tracking-wide">
                      Pending Submission
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium flex items-center gap-2 mt-2">
                    <Clock size={16} className="text-orange-500" />
                    Submission Deadline: <span className="font-bold text-slate-800">{openSession.deadline}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setSessionBeingEdited(null); setIsFormModalOpen(true); }}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
                >
                  Enter Details <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* =========================================
          SECTION 2: CURRENTLY ACTIVE
          ========================================= */}
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Currently Active</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeYears.map(year => (
            <div key={year.id} className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-800">{year.name}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-sm text-slate-500 mb-1">{year.start} to {year.end}</p>
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1 mt-3">
                  <CheckCircle2 size={14} className="text-emerald-500"/> Submitted on {year.submittedOn}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {!year.editUsed ? (
                  <button 
                    onClick={() => handleOpenEdit(year)}
                    className="p-2.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-xl transition-colors"
                    title="Edit Data (1 Chance Left)"
                  >
                    <Edit2 size={18} />
                  </button>
                ) : (
                  <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl cursor-not-allowed" title="Edit Locked">
                    <CheckCircle2 size={18} />
                  </div>
                )}
                
                <button 
                  onClick={() => setViewModalData({ ...year, isRecent: true, ...formData })}
                  className="p-2.5 bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors"
                  title="View Submitted Data"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* =========================================
          SECTION 3: COMPLETED SESSIONS
          ========================================= */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Completed Sessions</h2>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Session Name</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted On</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
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
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{year.submittedOn}</td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setViewModalData(year)}
                        className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors inline-flex" 
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

          <div className="bg-white border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-700">{indexOfFirstItem + 1}</span> to <span className="font-medium text-slate-700">{Math.min(indexOfLastItem, completedYearsData.length)}</span> of <span className="font-medium text-slate-700">{completedYearsData.length}</span> entries
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
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* =========================================
          MODAL 1: ONE-TIME EDIT WARNING
          ========================================= */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Are you absolutely sure?</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                You only have <strong className="text-red-600">ONE</strong> chance to edit your submitted data for <span className="font-semibold">{sessionBeingEdited?.name}</span>. Once you save these changes, the form will be permanently locked for review.
              </p>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsWarningModalOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmEdit}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all active:scale-95"
                >
                  Yes, Proceed to Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* =========================================
          MODAL 2: DATA ENTRY FORM (WIDER & DETAILED)
          ========================================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Institution Master Data Form</h2>
                <p className="text-xs text-slate-500 mt-1">{sessionBeingEdited ? sessionBeingEdited.name : openSession?.name}</p>
              </div>
              <button onClick={() => setIsFormModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. UNIV-1024"
                    value={formData.universityId}
                    onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University Name</label>
                  <input 
                    type="text" 
                    placeholder="Full Institution Name"
                    value={formData.universityName}
                    onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Unique Identification Code</label>
                  <input 
                    type="text" 
                    placeholder="AISHE / State Code"
                    value={formData.uniqueId}
                    onChange={(e) => setFormData({...formData, uniqueId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Official Email ID</label>
                  <input 
                    type="email" 
                    placeholder="registrar@university.edu"
                    value={formData.emailId}
                    onChange={(e) => setFormData({...formData, emailId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                  <input 
                    type="url" 
                    placeholder="https://www.university.edu"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University Address</label>
                  <textarea 
                    rows="3"
                    placeholder="Complete physical address..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pin Code</label>
                  <input 
                    type="text" 
                    placeholder="6-digit postal code"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({...formData, pinCode: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800"
                  />
                </div>

                {/* File Upload Dropzone */}
                <div className="md:col-span-2 mt-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University Logo</label>
                  <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-orange-300 transition-all cursor-pointer group">
                    <div className="p-3 bg-white border border-slate-200 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="text-orange-500" size={24} />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setFormData({...formData, logoFileName: e.target.files[0]?.name || ""})} 
                    />
                    {formData.logoFileName && (
                      <p className="mt-3 text-sm text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-md">
                        Selected: {formData.logoFileName}
                      </p>
                    )}
                  </label>
                </div>

              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl mt-6">
                <p className="text-xs text-orange-800 font-medium flex items-start gap-2">
                  <AlertTriangle size={16} className="text-orange-600 shrink-0 mt-0.5" />
                  Please verify all data before submission. Incorrect data may affect your institution's compliance standing.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsFormModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
              >
                Save Draft
              </button>
              <button 
                onClick={handleFormSubmit}
                className="px-6 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md active:scale-95 transition-all"
              >
                Final Submit
              </button>
            </div>
          </div>
        </div>
      )}


      {/* =========================================
          MODAL 3: VIEW SUBMITTED DATA (READ-ONLY)
          ========================================= */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Submission Record</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Session</p>
                <p className="text-xl font-bold text-slate-800">{viewModalData.name}</p>
              </div>

              {viewModalData.isRecent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">University ID</p>
                    <p className="font-bold text-slate-800">{viewModalData.universityId || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">University Name</p>
                    <p className="font-bold text-slate-800">{viewModalData.universityName || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Unique ID</p>
                    <p className="font-bold text-slate-800">{viewModalData.uniqueId || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Contact Number</p>
                    <p className="font-bold text-slate-800">{viewModalData.contactNumber || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Email ID</p>
                    <p className="font-bold text-slate-800">{viewModalData.emailId || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Website URL</p>
                    <p className="font-bold text-slate-800 break-all">{viewModalData.websiteUrl || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Address</p>
                    <p className="font-bold text-slate-800">{viewModalData.address || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Pin Code</p>
                    <p className="font-bold text-slate-800">{viewModalData.pinCode || "N/A"}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Logo File</p>
                    <p className="font-bold text-slate-800">{viewModalData.logoFileName || "Not Uploaded"}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 border border-slate-100 rounded-xl border-dashed">
                  <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">Data locked and archived.</p>
                  <p className="text-xs text-slate-500 mt-1">Submitted on {viewModalData.submittedOn}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setViewModalData(null)}
                className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl shadow-sm transition-all"
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