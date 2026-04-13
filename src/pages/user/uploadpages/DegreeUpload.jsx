import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, Calendar, BookOpen, GitBranch,
  Search, Eye, Edit2, Trash2, FileText, ChevronLeft, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, PieChart,
  ArrowLeft, Layers
} from 'lucide-react';

const DegreeDataUpload = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [uploadMode, setUploadMode] = useState('bulk');
  const [isProcessed, setIsProcessed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form States
  const [bulkData, setBulkData] = useState({ academicYear: '', file: null });
  const [manualData, setManualData] = useState({
    academicYear: '', course: '', branch: '', semester: '',
    studentName: '', regNumber: '', joiningDate: '', 
    email: '', phone: '', gender: '', certificateFile: null
  });

  // Dummy Data for Table
  const [uploadHistory, setUploadHistory] = useState([
    { id: 1, academicYear: '2024-2025', collegeName: 'Govt. Engineering College Raipur', fileName: 'final_degrees_batch_A.xlsx', uploadDate: '12 Oct 2024' },
    { id: 2, academicYear: '2024-2025', collegeName: 'Bhilai Institute of Technology', fileName: 'sem_6_marks_mech.xlsx', uploadDate: '14 Oct 2024' },
  ]);

  // --- HANDLERS ---
  const handleBulkChange = (e) => setBulkData({ ...bulkData, [e.target.name]: e.target.value });
  const handleManualChange = (e) => setManualData({ ...manualData, [e.target.name]: e.target.value });

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setIsProcessed(true); // Reveal the overview panel
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Manual Data:', manualData);
    // Reset Logic here
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
        <Link to="/user/uploads" className="hover:text-[#FF6900] transition-colors">Document Uploads</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Degree Data Upload</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg">
              <GraduationCap className="text-[#FF6900]" size={24} />
            </div>
            Degree Data Upload
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage and upload student degree certificates and semester marksheets.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-[#FF6900] hover:bg-orange-50 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold">
          <Download size={18} />
          Format Template.xlsx
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Professional Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 pt-2">
          <button 
            onClick={() => { setUploadMode('bulk'); setIsProcessed(false); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all ${
              uploadMode === 'bulk' 
              ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-lg' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
            }`}
          >
            <FileSpreadsheet size={18} />
            Bulk Degree Upload
          </button>
          <button 
            onClick={() => setUploadMode('manual')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all ${
              uploadMode === 'manual' 
              ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-lg' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
            }`}
          >
            <UserPlus size={18} />
            Manual Entry
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* ================= BULK UPLOAD ================= */}
          {uploadMode === 'bulk' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-left-4 duration-300">
              <div className="lg:col-span-2">
                <form onSubmit={handleBulkSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-800 mb-2">Academic Year</label>
                    <select 
                      name="academicYear" value={bulkData.academicYear} onChange={handleBulkChange} required
                      className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] bg-slate-50 font-medium text-slate-700"
                    >
                      <option value="" disabled>Select Year...</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-800 mb-2">Upload Degree Data</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-orange-50/30 hover:border-[#FF6900]/40 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group shadow-inner">
                      <div className="p-4 bg-white border border-slate-200 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm">
                        <UploadCloud size={32} className="text-[#FF6900]" />
                      </div>
                      <p className="text-slate-800 font-bold mb-1">Click to upload or drag and drop</p>
                      <p className="text-slate-500 text-sm mb-4">Strictly .xlsx or .xls formats</p>
                      <input type="file" className="hidden" id="bulk-upload" required />
                      <label htmlFor="bulk-upload" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold cursor-pointer shadow-sm hover:text-[#FF6900] hover:border-[#FF6900]/40 transition-all">
                        Browse Files
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="w-full md:w-auto bg-[#FF6900] hover:bg-[#e65f00] text-white px-8 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                    <UploadCloud size={20} />
                    Process & Upload Batch
                  </button>
                </form>
              </div>

              {/* OVERVIEW PANEL */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 h-full flex flex-col">
                  {!isProcessed ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                      <PieChart size={40} className="text-slate-200 mb-3" />
                      <h4 className="font-bold text-slate-400">Analysis Pending</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Upload a file to see validation details.</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 h-full flex flex-col">
                      <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b border-slate-200 pb-4 mb-6">Batch Results</h3>
                      <div className="space-y-3 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Processed</p>
                          <p className="font-bold text-slate-800">850</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase">Degrees OK</p>
                          <p className="font-bold text-emerald-700">842</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                          <p className="text-[10px] font-bold text-red-600 uppercase">Rejected</p>
                          <p className="font-bold text-red-700">8</p>
                        </div>
                      </div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden p-3 space-y-3 max-h-48 overflow-y-auto">
                        <div className="text-[10px]"><p className="font-bold">Row 12: Missing CGPA</p></div>
                        <div className="text-[10px]"><p className="font-bold text-red-500">Row 45: Invalid Enrollment</p></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= MANUAL ENTRY ================= */}
          {uploadMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-right-4 duration-300">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wider">
                  <BookOpen size={18} className="text-[#FF6900]"/> Course & Semester Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Academic Year</label>
                    <select name="academicYear" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium">
                      <option value="">Select Year</option>
                      <option value="2024-25">2024-25</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Course</label>
                    <select name="course" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium">
                      <option value="">Select Course</option>
                      <option value="B.Tech">B.Tech</option>
                    </select>
                  </div>
                  {/* NEW SEMESTER FIELD */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Semester</label>
                    <select 
                      name="semester" 
                      value={manualData.semester} 
                      onChange={handleManualChange} 
                      required 
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FF6900]/40 focus:ring-2 focus:ring-[#FF6900]/20 bg-white font-bold text-[#FF6900]"
                    >
                      <option value="">Choose Semester</option>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Branch</label>
                    <select name="branch" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium">
                      <option value="">Select Branch</option>
                      <option value="CS">Computer Science</option>
                    </select>
                  </div>
                </div>

                {/* DYNAMIC DOCUMENT UPLOAD */}
                {manualData.semester && (
                  <div className="mt-8 pt-6 border-t border-slate-200 animate-in fade-in zoom-in-95 duration-300">
                    <label className="block text-sm font-bold text-slate-800 mb-3">
                      Upload Semester {manualData.semester} Marksheet / Certificate
                    </label>
                    <label className="flex items-center gap-4 p-4 bg-white border-2 border-dashed border-[#FF6900]/30 rounded-2xl cursor-pointer hover:bg-orange-50 transition-all group">
                      <div className="p-3 bg-orange-100 text-[#FF6900] rounded-xl group-hover:scale-110 transition-transform">
                        <UploadCloud size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-700">Click to select PDF or Image</p>
                        <p className="text-xs text-slate-400">Verified certificate for Semester {manualData.semester} only</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <UserPlus size={18} className="text-[#FF6900]"/> Student Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                    <input type="text" name="studentName" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-medium" placeholder="Student Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Enrollment Number</label>
                    <input type="text" name="regNumber" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-medium" placeholder="REG-2024-00X" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-[#FF6900] hover:bg-[#e65f00] text-white px-10 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all text-sm uppercase tracking-wider">
                  Submit Degree Record
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* RECENT HISTORY TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Recent Degree Uploads</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search..." className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Academic Year</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">File Details</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {uploadHistory.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-slate-800 font-bold text-sm">{record.academicYear}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[10px] text-[#FF6900] font-bold bg-orange-50 border border-orange-100 px-3 py-1 rounded-lg w-fit uppercase">
                      <FileText size={12} /> {record.fileName}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle2 size={14} /> Processed
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#FF6900] opacity-0 group-hover:opacity-100"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default DegreeDataUpload;