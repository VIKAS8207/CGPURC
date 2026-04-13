import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GitBranch, Plus, Search, Edit2, Trash2, 
  ChevronLeft, ChevronRight, CheckCircle2,
  ArrowLeft, ChevronDown, X, Hash, Save,
  Calendar, Layers, FileText, Landmark
} from 'lucide-react';

const UniversityBranchSetup = () => {
  const navigate = useNavigate();

  // --- 1. MASTER DATA ---
  const masterCourses = [
    { id: 'C01', name: 'Bachelor of Technology (B.Tech)' },
    { id: 'C02', name: 'Master of Business Administration (MBA)' },
    { id: 'C03', name: 'Bachelor of Science (B.Sc)' }
  ];

  const masterBranchesRegistry = {
    'C01': ['Computer Science', 'Civil Engineering', 'Mechanical', 'IT', 'Electrical'],
    'C02': ['Finance', 'Marketing', 'HR', 'Business Analytics'],
    'C03': ['Physics', 'Maths', 'Chemistry', 'Biology']
  };

  // --- 2. STATES ---
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [formRows, setFormRows] = useState([{ id: Date.now(), branchName: '', branchCode: '' }]);
  const [isEditing, setIsEditing] = useState(null); 

  // Mapping List (Stores Course-wide groupings)
  const [branchesList, setBranchesList] = useState([
    { 
      id: 1, 
      courseId: 'C01', 
      courseName: 'Bachelor of Technology (B.Tech)', 
      academicYear: '2025-26',
      branches: [
        { name: 'Computer Science', code: 'BTECH-CS-01' },
        { name: 'Information Technology', code: 'BTECH-IT-02' }
      ]
    },
  ]);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // --- 3. HANDLERS ---
  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
    if(!isEditing) {
        setFormRows([{ id: Date.now(), branchName: '', branchCode: '' }]);
    }
  };

  const addRow = () => {
    setFormRows([...formRows, { id: Date.now(), branchName: '', branchCode: '' }]);
  };

  const removeRow = (id) => {
    if (formRows.length > 1) {
      setFormRows(formRows.filter(row => row.id !== id));
    }
  };

  const handleRowChange = (id, field, value) => {
    setFormRows(formRows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseObj = masterCourses.find(c => c.id === selectedCourseId);

    const branchData = formRows.map(row => ({ name: row.branchName, code: row.branchCode }));

    if (isEditing) {
      setBranchesList(branchesList.map(b => b.id === isEditing ? { 
        ...b, courseId: selectedCourseId, courseName: courseObj.name, academicYear, branches: branchData 
      } : b));
      setIsEditing(null);
    } else {
      const newEntry = {
        id: Date.now(),
        courseId: selectedCourseId,
        courseName: courseObj.name,
        academicYear,
        branches: branchData
      };
      setBranchesList([newEntry, ...branchesList]);
    }

    setSelectedCourseId("");
    setFormRows([{ id: Date.now(), branchName: '', branchCode: '' }]);
  };

  const handleEdit = (item) => {
    setIsEditing(item.id);
    setSelectedCourseId(item.courseId);
    setAcademicYear(item.academicYear);
    setFormRows(item.branches.map((b, i) => ({ id: i, branchName: b.name, branchCode: b.code })));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this course mapping and all its branches?")) {
      setBranchesList(branchesList.filter(b => b.id !== id));
    }
  };

  // Pagination Logic
  const filteredData = branchesList.filter(b => b.courseName.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 font-sans">
      
      {/* 1. HEADER & BREADCRUMBS */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900]">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Branch Setup Registry</span>
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#FF6900]/10 rounded-lg text-[#FF6900]">
            <Landmark size={24} />
          </div>
          Institutional Branch Configuration
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Group and activate specializations for your academic session.</p>
      </div>

      {/* 2. SETUP FORM CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
          <h2 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} className="text-[#FF6900]" />
            {isEditing ? 'Update Branch Mapping' : 'Define New Course Mapping'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Course Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Course Program</label>
              <div className="relative">
                <select value={selectedCourseId} onChange={handleCourseChange} required className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-bold text-slate-700 cursor-pointer">
                  <option value="">-- Choose Course --</option>
                  {masterCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Academic Year Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Academic Session</label>
              <div className="relative">
                <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} required className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#FF6900]/10 focus:border-[#FF6900] transition-all font-bold text-slate-700 cursor-pointer">
                  <option value="2025-26">2025 - 2026</option>
                  <option value="2026-27">2026 - 2027</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Plus size={12} className="text-[#FF6900]" /> Branches to include in this program
            </label>
            {formRows.map((row) => (
              <div key={row.id} className="flex flex-col md:flex-row gap-4 items-end animate-in slide-in-from-left-2 duration-300">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <select 
                      value={row.branchName} 
                      onChange={(e) => handleRowChange(row.id, 'branchName', e.target.value)}
                      disabled={!selectedCourseId}
                      required
                      className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 font-bold text-slate-700 cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select Branch...</option>
                      {(masterBranchesRegistry[selectedCourseId] || []).map((b, i) => <option key={i} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="text" 
                      value={row.branchCode} 
                      onChange={(e) => handleRowChange(row.id, 'branchCode', e.target.value)}
                      placeholder="Institutional Code (e.g. CS-101)" 
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 font-bold text-slate-800 text-sm"
                    />
                  </div>
                </div>

                {!isEditing && (
                  <button type="button" onClick={() => removeRow(row.id)} className="p-2.5 mb-0.5 text-slate-300 hover:text-red-500 rounded-xl disabled:opacity-0" disabled={formRows.length === 1}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}

            {!isEditing && (
              <button type="button" onClick={addRow} className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF6900] bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg border border-orange-200 transition-all">
                <Plus size={14} /> Add Branch Row
              </button>
            )}
          </div>

          <div className="pt-8 mt-10 border-t border-slate-100 flex justify-end gap-4">
            {isEditing && (
               <button onClick={() => {setIsEditing(null); setSelectedCourseId(""); setFormRows([{ id: Date.now(), branchName: '', branchCode: '' }]);}} className="px-6 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
            )}
            <button type="submit" className="bg-slate-900 text-white px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Save size={16}/> {isEditing ? 'Save Updates' : 'Activate Configuration'}
            </button>
          </div>
        </form>
      </div>

      {/* 3. REGISTRY TABLE SECTION */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileText size={18} className="text-slate-400" />
              Institutional Registry Mappings
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by course..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-[#FF6900]/10 outline-none font-bold" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                <th className="py-4 px-6 w-16 text-center">SNo</th>
                <th className="py-4 px-6">Course Name</th>
                <th className="py-4 px-6 text-center">Branches Added</th>
                <th className="py-4 px-6 text-center">Academic Year</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                  <tr>
                      <td colSpan="5" className="py-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No Mappings Found</td>
                  </tr>
              ) : currentItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6 text-xs font-bold text-slate-400 text-center">{(currentPage-1)*itemsPerPage + index + 1}</td>
                  <td className="py-5 px-6">
                    <div className="text-sm font-bold text-slate-800">{item.courseName}</div>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {item.branches.map((b, i) => (
                            <span key={i} className="text-[9px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase">{b.name}</span>
                        ))}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="px-3 py-1 bg-[#FF6900]/5 text-[#FF6900] rounded-full text-[10px] font-black border border-[#FF6900]/10">
                        {item.branches.length} Specializations
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="flex items-center justify-center gap-1.5 text-slate-600 text-xs font-bold">
                        <Calendar size={14} className="text-slate-300" /> {item.academicYear}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. NEW EDUNAUT PAGINATION UI */}
        <div className="p-5 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <div className="flex items-center gap-3">
              <span>Total: {totalRecords} Records</span>
              <div className="h-4 w-px bg-slate-200 mx-1"></div>
              <div className="relative">
                <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}} className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer">
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none" />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                    <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="appearance-none bg-white border-2 border-orange-50 rounded-lg pl-3 pr-8 py-1.5 text-[#FF6900] outline-none transition-all cursor-pointer">
                        {[...Array(totalPages)].map((_, i) => <option key={i+1} value={i+1}>Page {i+1}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FF6900] pointer-events-none" />
                </div>
                <span>of {totalPages} pages</span>
              </div>
              <div className="flex gap-1.5">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"><ChevronLeft size={18}/></button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"><ChevronRight size={18}/></button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default UniversityBranchSetup;