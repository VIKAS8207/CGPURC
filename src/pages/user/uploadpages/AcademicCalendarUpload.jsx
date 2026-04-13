import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Download, FileSpreadsheet, UploadCloud, CalendarDays,
  Search, Eye, Edit2, Trash2, FileText, ChevronLeft, 
  ChevronRight, AlertTriangle, CheckCircle2, XCircle, PieChart,
  ArrowLeft, Calendar
} from 'lucide-react';

const AcademicCalendarUpload = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [isProcessed, setIsProcessed] = useState(false); // Controls the overview visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkData, setBulkData] = useState({ academicYear: '', file: null });

  // Dummy Data for Table
  const [uploadHistory, setUploadHistory] = useState([
    { id: 1, academicYear: '2024-2025', eventCount: 142, fileName: 'calendar_2024_master.xlsx', uploadDate: '10 Jan 2024' },
    { id: 2, academicYear: '2025-2026', eventCount: 156, fileName: 'academic_schedule_25_26.xlsx', uploadDate: '05 Nov 2024' },
  ]);

  // Handlers
  const handleBulkChange = (e) => setBulkData({ ...bulkData, [e.target.name]: e.target.value });

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setIsProcessed(true); // Reveal the overview results
    console.log('Processing Calendar Data:', bulkData);
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
        <span className="text-slate-900 font-semibold">Academic Calendar Upload</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg">
              <CalendarDays className="text-[#FF6900]" size={24} />
            </div>
            Academic Calendar Upload
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Upload holidays, term dates, and exam schedules for the entire academic year.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-[#FF6900] hover:bg-orange-50 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold">
          <Download size={18} />
          Format Calendar.xlsx
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Header Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="text-[#FF6900]" size={20} />
            Bulk Excel Upload
          </h2>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: The Upload Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleBulkSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-800 mb-2">Select Target Academic Year</label>
                  <select 
                    name="academicYear" value={bulkData.academicYear} onChange={handleBulkChange} required
                    className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] bg-slate-50 font-medium text-slate-700 cursor-pointer"
                  >
                    <option value="" disabled>Choose Academic Year...</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-800 mb-2">Upload Calendar File</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-orange-50/30 hover:border-[#FF6900]/40 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group shadow-inner">
                    <div className="p-4 bg-white border border-slate-200 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      <UploadCloud size={32} className="text-[#FF6900]" />
                    </div>
                    <p className="text-slate-800 font-bold mb-1">Click to upload or drag and drop</p>
                    <p className="text-slate-500 text-sm mb-4">Strictly .xlsx or .xls formats up to 10MB</p>
                    <input type="file" accept=".xlsx, .xls" className="hidden" id="bulk-upload" required />
                    <label htmlFor="bulk-upload" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold cursor-pointer shadow-sm hover:bg-white hover:text-[#FF6900] hover:border-[#FF6900]/40 transition-all">
                      Browse Files
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto bg-[#FF6900] hover:bg-[#e65f00] text-white px-8 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                  <UploadCloud size={20} />
                  Process & Upload Calendar
                </button>
              </form>
            </div>

            {/* Right Side: Conditional Overview */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 h-full flex flex-col">
                {!isProcessed ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                   <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 shadow-sm">
                     <PieChart size={32} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-400">Awaiting Calendar</h4>
                     <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Analysis summary will appear here</p>
                   </div>
                 </div>
                ) : (
                  <div className="animate-in fade-in duration-500 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                      <PieChart className="text-[#FF6900]" size={20} />
                      <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Processing Results</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Events</p>
                        <p className="font-bold text-slate-800">156</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Mapped</p>
                        <p className="font-bold text-emerald-700">154</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                        <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Denied</p>
                        <p className="font-bold text-red-700">2</p>
                      </div>
                    </div>

                    <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                      <div className="bg-red-50/50 p-3 border-b border-slate-100 flex items-center gap-2 text-red-600">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Error Log</span>
                      </div>
                      <div className="p-3 space-y-3 overflow-y-auto max-h-48">
                        <div className="text-[10px]">
                          <p className="font-bold text-slate-700">Row 14: Mid-Term Exams</p>
                          <p className="text-red-600 font-medium italic">Missing 'End Date'</p>
                        </div>
                        <div className="text-[10px]">
                          <p className="font-bold text-slate-700">Row 89: Diwali Break</p>
                          <p className="text-red-600 font-medium italic">Invalid Event Type</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT UPLOADS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Recent Calendar Uploads</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search records..." className="w-full sm:w-64 pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Academic Year</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Events</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">File Uploaded</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Upload Date</th>
                <th className="py-4 px-6 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {uploadHistory.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group font-medium">
                  <td className="py-4 px-6 text-slate-800 font-bold text-sm">{record.academicYear}</td>
                  <td className="py-4 px-6 text-slate-600 text-xs">{record.eventCount} Events Mapped</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[10px] text-[#FF6900] font-bold bg-orange-50 border border-orange-100 px-3 py-1 rounded-lg w-fit uppercase">
                      <FileText size={12} />
                      {record.fileName}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{record.uploadDate}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-[#FF6900] hover:bg-orange-50 rounded-lg transition-colors"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Standard Pagination Section */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50">
          <div className="text-slate-500 font-medium">Showing <span className="font-bold text-slate-700">1</span> to <span className="font-bold text-slate-700">{uploadHistory.length}</span> entries</div>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-50 transition-colors" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#FF6900] text-white font-bold shadow-sm">1</button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white bg-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AcademicCalendarUpload;