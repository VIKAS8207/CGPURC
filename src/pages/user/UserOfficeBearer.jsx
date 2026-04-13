import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Briefcase, Plus, Search, Filter, 
  ChevronDown, Upload, Trash2, Edit2, ChevronLeft, 
  ChevronRight, X, ShieldCheck, BellRing, FileText
} from 'lucide-react';

const UserOfficeBearer = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Form State
  const initialFormState = { name: '', designation: '', phone: '', email: '', department: '' };
  const [formData, setFormData] = useState(initialFormState);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy data for the table
  const [bearers, setBearers] = useState([
    { id: 1, name: 'Dr. Ramesh Kumar', designation: 'Vice Chancellor', phone: '+91 9876543210', email: 'vc@university.edu', department: 'Administration' },
    { id: 2, name: 'Anita Sharma', designation: 'Registrar', phone: '+91 9876543211', email: 'registrar@university.edu', department: 'Management' },
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(bearers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bearers.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBearer = { ...formData, id: Date.now() };
    setBearers([newBearer, ...bearers]);
    setFormData(initialFormState);
    setSelectedFile(null);
    setIsFormOpen(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleDelete = (id) => {
    setBearers(prev => prev.filter(bearer => bearer.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* SUCCESS NOTIFICATION TOAST (ORANGE) */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-xl p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg shrink-0">
              <ShieldCheck className="text-[#FF6900]" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Information Submitted</h3>
              <p className="text-sm text-slate-600 mt-1">
                The office bearer details have been updated in your institutional directory.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumb Path (User Side) */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Institutional Office Bearers</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg">
              <Briefcase className="text-[#FF6900]" size={24} />
            </div>
            Office Bearers
          </h1>
          <p className="text-slate-500 mt-2">Manage your university's official representatives and contact data.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold ${isFormOpen ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-slate-900 hover:bg-black text-white active:scale-95'}`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel' : 'Add Office Bearer'}
        </button>
      </div>

      {/* Expandable Form */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Bearer Details Form</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium text-slate-800" 
                  placeholder="e.g. Dr. John Smith" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Designation</label>
                <input 
                  type="text" name="designation" value={formData.designation} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium text-slate-800" 
                  placeholder="e.g. Registrar" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
                <select 
                  name="department" value={formData.department} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium text-slate-800"
                >
                  <option value="" disabled>Select Department</option>
                  <option value="Administration">Administration</option>
                  <option value="Management">Management</option>
                  <option value="Finance">Finance</option>
                  <option value="Academics">Academics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium text-slate-800" 
                  placeholder="+91 XXXXX XXXXX" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email ID</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all font-medium text-slate-800" 
                  placeholder="official@university.edu" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Profile Photo</label>
                {selectedFile ? (
                  <div className="flex items-center justify-between p-2 bg-[#FF6900]/5 border border-[#FF6900]/20 rounded-xl">
                    <div className="flex items-center gap-3 truncate">
                      <FileText className="text-[#FF6900]" size={18} />
                      <span className="text-xs font-bold truncate">{selectedFile.name}</span>
                    </div>
                    <button type="button" onClick={() => setSelectedFile(null)} className="p-1 text-red-500 hover:bg-white rounded-lg transition-colors"><X size={16}/></button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-orange-50 transition-all text-slate-600 text-sm font-medium">
                    <Upload size={18} className="text-[#FF6900]" />
                    <span>Upload Image...</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] hover:bg-[#e65f00] shadow-md rounded-xl transition-all active:scale-95"
              >
                Add Bearer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-2xl border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search records..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 focus:border-[#FF6900] transition-all text-sm font-medium"
          />
        </div>
        <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold w-full sm:w-auto justify-center">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name & Role</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Department</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contact</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="py-4 px-6 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((bearer) => (
              <tr key={bearer.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-800 text-sm">{bearer.name}</div>
                  <div className="text-[10px] font-bold text-[#FF6900] bg-[#FF6900]/5 px-2 py-0.5 rounded border border-[#FF6900]/10 w-fit mt-1">{bearer.designation}</div>
                </td>
                <td className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">{bearer.department}</td>
                <td className="py-4 px-6 text-xs font-medium">
                  <div className="text-slate-800">{bearer.email}</div>
                  <div className="text-slate-400 mt-1">{bearer.phone}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-bold border border-emerald-100">ACTIVE</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-[#FF6900] hover:bg-[#FF6900]/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(bearer.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white border border-slate-200 rounded-b-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 font-bold">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, bearers.length)} of {bearers.length} entries</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50"><ChevronLeft size={18} /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-[#FF6900] text-white shadow-sm shadow-[#FF6900]/30' : 'text-slate-500 hover:bg-slate-100'}`}>{i + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-slate-200 text-slate-600"><ChevronRight size={18} /></button>
        </div>
      </div>

    </div>
  );
};

export default UserOfficeBearer;