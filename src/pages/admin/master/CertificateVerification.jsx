import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, CheckCircle2, XCircle, 
  Eye, FileText, ChevronRight, ChevronLeft, ChevronDown,
  User, School, BookOpen, ShieldCheck, Download, ExternalLink, X
} from 'lucide-react';

const CertificateVerification = () => {
  const navigate = useNavigate();

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // All, Pending, Verified, Rejected
  const [selectedStudent, setSelectedStudent] = useState(null); // For Detail View
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA ---
  const [submissions, setSubmissions] = useState([
    { 
      id: 1, 
      regNo: "REG2026001", 
      studentName: "Aman Vishwakarma", 
      college: "GEC Raipur", 
      course: "B.Tech", 
      branch: "Computer Science",
      semesters: [
        { sem: 1, status: "Verified", file: "m1.pdf" },
        { sem: 2, status: "Pending", file: "m2.pdf" },
        { sem: 3, status: "Pending", file: "m3.pdf" }
      ],
      overallStatus: "Pending" 
    },
    { 
      id: 2, 
      regNo: "REG2026045", 
      studentName: "Priya Sharma", 
      college: "BIT Durg", 
      course: "MBA", 
      branch: "Finance",
      semesters: [
        { sem: 1, status: "Verified", file: "p1.pdf" },
        { sem: 2, status: "Verified", file: "p2.pdf" }
      ],
      overallStatus: "Verified" 
    }
  ]);

  // --- LOGIC ---
  const filteredData = submissions.filter(s => 
    (s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     s.regNo.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === "All" || s.overallStatus === statusFilter)
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleVerifyStudent = (id) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, overallStatus: 'Verified' } : s));
    setSelectedStudent(null);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-20 font-sans">
      
      {/* 1. HEADER & BREADCRUMBS */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-[#155DFC] transition-colors mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            <Link to="/admin-dashboard" className="hover:text-[#155DFC]">Dashboard</Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">Certificate Verification</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]">
              <ShieldCheck size={24} />
            </div>
            Academic Document Verification
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Review and authenticate student marksheets submitted by colleges.</p>
        </div>
      </div>

      {/* 2. SEARCH & FILTER BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Student Name, ID or Registration Number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#155DFC]/10 focus:border-[#155DFC] transition-all font-medium text-sm"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          {["All", "Pending", "Verified"].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${statusFilter === status ? 'bg-white text-[#155DFC] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MASTER LIST TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                <th className="py-5 px-6 w-16 text-center">SNo</th>
                <th className="py-5 px-6">Student Information</th>
                <th className="py-5 px-6">Institution</th>
                <th className="py-5 px-6">Course & Branch</th>
                <th className="py-5 px-6 text-center">Semesters</th>
                <th className="py-5 px-6">System Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6 text-xs font-bold text-slate-400 text-center">{(currentPage-1)*itemsPerPage + index + 1}</td>
                  <td className="py-5 px-6">
                    <div className="text-sm font-bold text-slate-800">{item.studentName}</div>
                    <div className="text-[10px] font-black text-[#155DFC] uppercase tracking-tighter mt-0.5">{item.regNo}</div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <School size={14} className="text-slate-300" />
                        {item.college}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="text-xs font-bold text-slate-700">{item.course}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{item.branch}</div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black text-slate-500 border border-slate-200">{item.semesters.length} Sem</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black border uppercase tracking-widest ${
                      item.overallStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {item.overallStatus}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button 
                      onClick={() => setSelectedStudent(item)}
                      className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#155DFC] transition-all shadow-sm flex items-center gap-2 ml-auto"
                    >
                      <Eye size={14} /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-4">
              <span>Total: {totalRecords} Submissions</span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-[#155DFC]">
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="bg-white border border-blue-200 rounded px-2 py-1 text-[#155DFC] outline-none">
                  {[...Array(totalPages)].map((_, i) => <option key={i+1} value={i+1}>Page {i+1}</option>)}
                </select>
                <span>of {totalPages}</span>
              </div>
              <div className="flex gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50"><ChevronLeft size={14}/></button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50"><ChevronRight size={14}/></button>
              </div>
           </div>
        </div>
      </div>

      {/* 4. VERIFICATION MODAL / OVERLAY */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Modal Header */}
                <div className="bg-slate-900 p-6 px-8 flex justify-between items-center text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#155DFC] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{selectedStudent.studentName}</h2>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{selectedStudent.regNo} | {selectedStudent.college}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400"><X size={24}/></button>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Semester Check-list */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Submitted Marksheets</h3>
                        <div className="space-y-3">
                            {selectedStudent.semesters.map((sem, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl group hover:border-[#155DFC]/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:text-[#155DFC] transition-colors font-black text-xs">
                                            {sem.sem}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Semester {sem.sem} Results</p>
                                            <div className={`text-[9px] font-black uppercase tracking-tighter ${sem.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {sem.status}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#155DFC] transition-all"><Eye size={16}/></button>
                                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#155DFC] transition-all"><Download size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Verification Actions */}
                    <div className="lg:col-span-1 border-l border-slate-100 pl-0 lg:pl-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="bg-[#155DFC]/5 border border-[#155DFC]/10 rounded-2xl p-5">
                                <h4 className="text-[10px] font-black text-[#155DFC] uppercase tracking-widest mb-2">Security Audit</h4>
                                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                    Verification ensures the digital footprint matches the university centralized database records.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Remarks</label>
                                <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-[#155DFC] transition-all h-24" placeholder="Any observation notes..."></textarea>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-8">
                            <button 
                                onClick={() => handleVerifyStudent(selectedStudent.id)}
                                className="w-full bg-[#155DFC] hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={16} /> Verify Student
                            </button>
                            <button className="w-full bg-white border border-slate-200 text-red-500 hover:bg-red-50 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                <XCircle size={16} /> Reject Batch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default CertificateVerification;