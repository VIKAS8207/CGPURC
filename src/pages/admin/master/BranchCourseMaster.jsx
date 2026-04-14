import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Network, Plus, Search, 
  Trash2, X, ChevronDown, ChevronLeft, 
  ChevronRight, Layers, CheckCircle2, ShieldCheck,
  Edit2, MoreVertical
} from 'lucide-react';

const BranchCourseMaster = () => {
  const navigate = useNavigate();

  // --- UI STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // --- EDIT MODAL STATES ---
  const [editModalData, setEditModalData] = useState(null);
  const [editBranchName, setEditBranchName] = useState("");

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- FORM STATE ---
  const [branchName, setBranchName] = useState("");

  // --- MOCK DATA ---
  const [branches, setBranches] = useState([
    { id: 1, name: "Computer Science Engineering" },
    { id: 2, name: "Civil Engineering" },
    { id: 3, name: "Mechanical Engineering" },
    { id: 4, name: "Electrical Engineering" },
    { id: 5, name: "Information Technology" },
    { id: 6, name: "Electronics and Communication" },
    { id: 7, name: "Chemical Engineering" },
  ]);

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

  // --- LOGIC ---
  const filteredData = branches.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!branchName.trim()) return;

    const newBranch = {
      id: Date.now(),
      name: branchName.trim()
    };

    setBranches([newBranch, ...branches]);
    setBranchName("");
    setIsFormOpen(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (editModalData && editBranchName.trim() !== "") {
      setBranches(branches.map(branch => 
        branch.id === editModalData.id ? { ...branch, name: editBranchName } : branch
      ));
      setEditModalData(null);
      setEditBranchName("");
    }
  };

  const handleDelete = (id) => {
    setBranches(branches.filter(b => b.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative">
      
      {/* EDIT BRANCH MODAL (Edunut UI Design) */}
      {editModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Branch Name</h2>
              <button 
                onClick={() => setEditModalData(null)}
                className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSave} className="p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Branch Name</label>
              <input 
                type="text" 
                value={editBranchName}
                onChange={(e) => setEditBranchName(e.target.value)}
                placeholder="Enter new branch name..."
                className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400"
                required
              />
              
              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setEditModalData(null)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-[10px] transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-[#155DFC] hover:bg-[#155DFC]/90 rounded-[10px] shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-xl rounded-[10px] p-4 flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] text-[#155DFC]"><CheckCircle2 size={20} /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registry Updated</h3>
              <p className="text-xs text-slate-500 mt-0.5">The branch has been successfully registered.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* 1. NAVIGATION & PATH */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-4 rounded-[10px] outline-none">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC]">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/admin/master" className="hover:text-[#155DFC]">Master Configuration</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold tracking-tight">Branch Registry</span>
      </div>

      {/* 2. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] text-[#155DFC]"><Network size={24} /></div>
            Branch Master Registry
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Define official academic specializations for the entire state portal.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] font-bold text-sm transition-all shadow-md active:scale-95 outline-none ${
            isFormOpen ? 'bg-slate-100 text-slate-600' : 'bg-[#155DFC] text-white hover:bg-[#155DFC]/90 hover:shadow-lg'
          }`}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
          {isFormOpen ? 'Close Form' : 'Add New Branch'}
        </button>
      </div>

      {/* 3. SIMPLIFIED EDUNUT FORM */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm mb-10 overflow-hidden animate-in slide-in-from-top-4 duration-500">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 font-bold text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#155DFC]" /> Branch Entry Console
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="max-w-2xl">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Official Branch Name</label>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="e.g. Computer Science Engineering"
                  className="flex-1 px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#155DFC] text-white px-8 py-2.5 rounded-[10px] font-bold shadow-md hover:shadow-lg hover:bg-[#155DFC]/90 active:scale-95 transition-all text-sm uppercase tracking-widest"
                >
                  Register Branch
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 4. DATA TABLE */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 tracking-tight text-lg">
            <Layers size={18} className="text-slate-400" />
            Registry Listings
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search registry..." 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-[10px] border-none shadow-sm bg-slate-50 focus:ring-2 focus:ring-[#155DFC]/20 outline-none font-medium text-slate-800 placeholder-slate-400 transition-all" 
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-6 w-20">S.No</th>
                <th className="py-4 px-6">Official Branch Title</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentItems.length > 0 ? currentItems.map((branch, index) => (
                <tr key={branch.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-slate-600">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">
                    {branch.name}
                  </td>
                  <td className="py-4 px-6 text-right relative dropdown-container">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === `action-${branch.id}` ? null : `action-${branch.id}`)}
                      className="p-2 text-slate-400 hover:bg-[#155DFC]/10 hover:text-[#155DFC] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {/* Edunut Action Dropdown */}
                    {openDropdown === `action-${branch.id}` && (
                      <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <button
                          onClick={() => { 
                            setEditModalData(branch); 
                            setEditBranchName(branch.name); 
                            setOpenDropdown(null); 
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#155DFC]/10 hover:text-[#155DFC] transition-colors border-b border-slate-50 text-left outline-none"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => { handleDelete(branch.id); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left outline-none"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-slate-500 font-medium">
                    No branches found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. STRICT EDUNUT PAGINATION UI */}
        <div className="bg-white border-t border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center text-sm text-slate-600">
            <span className="font-medium mr-3">Total: {totalRecords}</span>
            
            {/* Custom Styled Dropdown for Items Per Page */}
            <div className="relative inline-flex items-center dropdown-container">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-medium cursor-pointer text-slate-700"
              >
                {[1, 2, 3, 4, 5, 6, 7, 10, 15, 20, 50].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
            </div>
            
            <span className="ml-3">items per page</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-600">
            
            {/* Custom Styled Dropdown for Page Select */}
            <div className="flex items-center">
              <div className="relative inline-flex items-center mr-2 dropdown-container">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-medium cursor-pointer text-slate-700"
                >
                  {Array.from({ length: totalPages || 1 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
              </div>
              <span>of {totalPages || 1} pages</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#155DFC] hover:bg-[#155DFC]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default BranchCourseMaster;