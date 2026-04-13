import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Network, Plus, Search, 
  Trash2, X, ChevronDown, ChevronLeft, 
  ChevronRight, Layers, CheckCircle2, ShieldCheck,
  FileText, Hash
} from 'lucide-react';

const BranchCourseMaster = () => {
  const navigate = useNavigate();

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- MOCK DATA ---
  const [branches, setBranches] = useState([
    { id: 1, name: "Computer Science Engineering", status: "Active" },
    { id: 2, name: "Civil Engineering", status: "Active" },
    { id: 3, name: "Mechanical Engineering", status: "Active" },
  ]);

  // --- MULTI-FIELD FORM STATE ---
  const [formRows, setFormRows] = useState([{ id: Date.now(), name: "" }]);

  // --- LOGIC ---
  const filteredData = branches.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Dynamic Row Handlers
  const addRow = () => {
    setFormRows([...formRows, { id: Date.now(), name: "" }]);
  };

  const removeRow = (id) => {
    if (formRows.length > 1) {
      setFormRows(formRows.filter(row => row.id !== id));
    }
  };

  const handleRowChange = (id, value) => {
    setFormRows(formRows.map(row => row.id === id ? { ...row, name: value } : row));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty rows
    const validRows = formRows.filter(row => row.name.trim() !== "");
    if (validRows.length === 0) return;

    const newBranches = validRows.map(row => ({
      id: Math.random() + Date.now(),
      name: row.name.trim(),
      status: "Active"
    }));

    setBranches([...newBranches, ...branches]);
    setFormRows([{ id: Date.now(), name: "" }]);
    setIsFormOpen(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this branch from the master registry?")) {
      setBranches(branches.filter(b => b.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10">
      
      {/* SUCCESS NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-2xl rounded-xl p-4 flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]"><CheckCircle2 size={20} /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registry Updated</h3>
              <p className="text-xs text-slate-500 mt-0.5">Multiple branches have been successfully registered.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* 1. NAVIGATION & PATH */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-[#155DFC] transition-colors mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC]">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC]">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Multi-Branch Registry</span>
      </div>

      {/* 2. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg text-[#155DFC]"><Network size={24} /></div>
            Branch Master Registry
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Define official academic specializations for the entire state portal.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md ${
            isFormOpen ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-slate-900 text-white hover:bg-black'
          }`}
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          {isFormOpen ? 'Cancel' : 'Bulk Create Branches'}
        </button>
      </div>

      {/* 3. DYNAMIC MULTI-ENTRY FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-10 overflow-hidden animate-in slide-in-from-top-4 duration-500">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 px-8 flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#155DFC]" /> Registry Configuration Console
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <div className="max-w-3xl space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Define Official Branch Names</label>
              
              <div className="space-y-3">
                {formRows.map((row, index) => (
                  <div key={row.id} className="flex items-center gap-3 animate-in slide-in-from-left-2 duration-300">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300 border border-slate-100 italic">
                      {index + 1}
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g. Master of Business Laws"
                      value={row.name}
                      onChange={(e) => handleRowChange(row.id, e.target.value)}
                      className="flex-1 px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#155DFC]/10 focus:border-[#155DFC] transition-all font-bold text-slate-800 text-sm shadow-inner"
                      required
                    />
                    {formRows.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeRow(row.id)}
                        className="p-3 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-50 mt-6">
                <button 
                  type="button"
                  onClick={addRow}
                  className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#155DFC] bg-[#155DFC]/5 hover:bg-[#155DFC]/10 py-3.5 px-6 rounded-xl border-2 border-dashed border-[#155DFC]/20 transition-all active:scale-95"
                >
                  <Plus size={14} /> Add Another Field
                </button>
                
                <button 
                  type="submit"
                  className="flex-1 bg-[#155DFC] text-white px-10 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#155DFC]/20 hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> Finalize & Register All
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 4. DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Layers size={18} className="text-slate-400" />
            Registry Listings
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search registry..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-[#155DFC]/10 outline-none font-bold" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                <th className="py-5 px-6 w-20 text-center">SNo</th>
                <th className="py-5 px-6">Official Branch Title</th>
                <th className="py-5 px-6 text-center">Current Status</th>
                <th className="py-5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentItems.map((branch, index) => (
                <tr key={branch.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6 text-xs font-bold text-slate-400 text-center">{(currentPage-1)*itemsPerPage + index + 1}</td>
                  <td className="py-5 px-6 text-sm font-bold text-slate-800">{branch.name}</td>
                  <td className="py-5 px-6 text-center">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black border border-emerald-100 uppercase tracking-tighter">
                      {branch.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button onClick={() => handleDelete(branch.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. NEW EDUNAUT PAGINATION UI */}
        <div className="p-5 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <div className="flex items-center gap-3">
              <span>Registry Base: {totalRecords} Records</span>
              <div className="h-4 w-px bg-slate-200 mx-1"></div>
              <div className="relative">
                <select 
                  value={itemsPerPage} 
                  onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}} 
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#155DFC]/10 transition-all cursor-pointer"
                >
                  <option value={5}>05 per page</option>
                  <option value={10}>10 per page</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#155DFC] pointer-events-none" />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select 
                    value={currentPage} 
                    onChange={(e) => setCurrentPage(Number(e.target.value))} 
                    className="appearance-none bg-white border-2 border-blue-50 rounded-lg pl-3 pr-8 py-1.5 text-[#155DFC] outline-none"
                  >
                    {[...Array(totalPages)].map((_, i) => (
                      <option key={i+1} value={i+1}>Page {i+1}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#155DFC] pointer-events-none" />
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

export default BranchCourseMaster;