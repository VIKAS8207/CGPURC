import React, { useState } from 'react';
import { 
  Users, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, Calendar, BookOpen, GitBranch,
  Search, Eye, Edit2, Trash2, FileText, ChevronLeft, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, PieChart
} from 'lucide-react';

const DegreeDataUpload = () => {
  // Toggle between 'bulk' and 'manual'
  const [uploadMode, setUploadMode] = useState('bulk');

  // State for forms
  const [bulkData, setBulkData] = useState({ academicYear: '', file: null });
  const [manualData, setManualData] = useState({
    academicYear: '', course: '', branch: '', 
    studentName: '', regNumber: '', joiningDate: '', 
    email: '', phone: '', gender: ''
  });

  // Dummy Data for the Upload History Table
  const [uploadHistory, setUploadHistory] = useState([
    { id: 1, academicYear: '2024-2025', collegeName: 'Govt. Engineering College Raipur', fileName: 'batch_2024_CS.xlsx', uploadDate: '12 Oct 2024' },
    { id: 2, academicYear: '2024-2025', collegeName: 'Bhilai Institute of Technology', fileName: 'mech_students_v2.xlsx', uploadDate: '14 Oct 2024' },
    { id: 3, academicYear: '2025-2026', collegeName: 'National Institute of Technology', fileName: 'new_admissions.xlsx', uploadDate: '01 Nov 2024' },
  ]);

  // Handlers
  const handleBulkChange = (e) => setBulkData({ ...bulkData, [e.target.name]: e.target.value });
  const handleManualChange = (e) => setManualData({ ...manualData, [e.target.name]: e.target.value });

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Bulk Data:', bulkData);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Manual Data:', manualData);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="text-orange-600" size={24} />
            </div>
            Student & Degree Upload
          </h1>
          <p className="text-slate-500 mt-2">Upload student records and degree data via bulk Excel or manual entry.</p>
        </div>
        
        {/* Template Download Button */}
        <button className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-orange-700 hover:bg-orange-50 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold">
          <Download size={18} />
          Format Template.xlsx
        </button>
      </div>

      {/* Main Content Card (Forms) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Professional Folder-Style Tabs (Top Left) */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 pt-2">
          <button 
            onClick={() => setUploadMode('bulk')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all ${
              uploadMode === 'bulk' 
              ? 'border-orange-500 text-orange-600 bg-white rounded-t-lg' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
            }`}
          >
            <FileSpreadsheet size={18} />
            Bulk Excel Upload
          </button>
          <button 
            onClick={() => setUploadMode('manual')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all ${
              uploadMode === 'manual' 
              ? 'border-orange-500 text-orange-600 bg-white rounded-t-lg' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
            }`}
          >
            <UserPlus size={18} />
            Manual Student Entry
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8">
          
          {/* ================= BULK UPLOAD FORM & OVERVIEW ================= */}
          {uploadMode === 'bulk' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-left-4 duration-300">
              
              {/* Left Side: The Upload Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleBulkSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-800 mb-2">Select Academic Year</label>
                    <select 
                      name="academicYear" value={bulkData.academicYear} onChange={handleBulkChange} required
                      className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50 font-medium text-slate-700 cursor-pointer"
                    >
                      <option value="" disabled>Choose Academic Year...</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-800 mb-2">Upload Data File</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-orange-400 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group">
                      <div className="p-4 bg-white border border-slate-200 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud size={32} className="text-orange-500" />
                      </div>
                      <p className="text-slate-800 font-bold mb-1">Click to upload or drag and drop</p>
                      <p className="text-slate-500 text-sm mb-4">Strictly .xlsx or .xls formats up to 10MB</p>
                      <input type="file" accept=".xlsx, .xls" className="hidden" id="bulk-upload" required />
                      <label htmlFor="bulk-upload" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold cursor-pointer shadow-sm hover:bg-orange-50 hover:text-orange-700 transition-colors">
                        Browse Files
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                    <UploadCloud size={20} />
                    Process & Upload Batch
                  </button>
                </form>
              </div>

              {/* Right Side: Upload Overview & Error Reporting */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                    <PieChart className="text-slate-400" size={20} />
                    <h3 className="font-bold text-slate-800">Batch Processing Overview</h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rows Processed</p>
                        <p className="text-xl font-bold text-slate-800">1,450</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                        <FileSpreadsheet size={20} />
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-wider mb-1">Degrees Uploaded</p>
                        <p className="text-xl font-bold text-emerald-800">1,442</p>
                      </div>
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={20} />
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-red-600/80 uppercase tracking-wider mb-1">Data Denied</p>
                        <p className="text-xl font-bold text-red-800">8</p>
                      </div>
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        <XCircle size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Error Log Section */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                    <div className="bg-red-50/50 p-3 border-b border-slate-100 flex items-center gap-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      <span className="text-sm font-bold text-slate-800">Incomplete Records</span>
                    </div>
                    <div className="p-3 space-y-3 overflow-y-auto max-h-48">
                      <div className="text-xs">
                        <p className="font-bold text-slate-700">Row 42: Aman Verma</p>
                        <p className="text-red-600">Missing Degree Certificate ID</p>
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-700">Row 156: Priya Singh</p>
                        <p className="text-red-600">Invalid Date of Joining format</p>
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-700">Row 892: Unknown</p>
                        <p className="text-red-600">Enrollment Number is blank</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ================= MANUAL ENTRY FORM ================= */}
          {uploadMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="animate-in slide-in-from-right-4 duration-300">
              
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
                  <BookOpen size={18} className="text-orange-500"/> Academic Placement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Academic Year</label>
                    <select name="academicYear" value={manualData.academicYear} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white font-medium">
                      <option value="" disabled>Select Year</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Course</label>
                    <select name="course" value={manualData.course} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white font-medium">
                      <option value="" disabled>Select Course</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="MBA">MBA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Branch</label>
                    <select name="branch" value={manualData.branch} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white font-medium">
                      <option value="" disabled>Select Branch</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mechanical">Mechanical</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Users size={18} className="text-orange-500"/> Student Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" name="studentName" value={manualData.studentName} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium" placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Registration / Roll No.</label>
                    <input type="text" name="regNumber" value={manualData.regNumber} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium" placeholder="e.g. REG-2026-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Date of Joining</label>
                    <input type="date" name="joiningDate" value={manualData.joiningDate} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" name="email" value={manualData.email} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium" placeholder="student@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={manualData.phone} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                    <select name="gender" value={manualData.gender} onChange={handleManualChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white font-medium">
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                  <UserPlus size={20} />
                  Add Student Record
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ================= UPLOAD HISTORY TABLE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Recent Upload History</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search records..." className="w-full sm:w-64 pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Year</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">College Name</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">File Uploaded</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Date</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {uploadHistory.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-slate-800 font-bold">{record.academicYear}</td>
                  <td className="py-4 px-6 text-slate-600 text-sm font-medium">{record.collegeName}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs text-orange-700 font-bold bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg w-fit">
                      <FileText size={14} />
                      {record.fileName}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-sm font-medium">{record.uploadDate}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Record">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Record">
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
        <div className="p-5 border-t border-slate-100 flex items-center justify-between text-sm bg-slate-50">
          <div className="text-slate-500">Showing <span className="font-bold text-slate-700">1</span> to <span className="font-bold text-slate-700">{uploadHistory.length}</span> of <span className="font-bold text-slate-700">{uploadHistory.length}</span> entries</div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-50 transition-colors" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-9 h-9 rounded-lg bg-orange-600 text-white font-bold shadow-sm">1</button>
            <button className="w-9 h-9 rounded-lg bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 font-medium transition-colors">2</button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white bg-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DegreeDataUpload;