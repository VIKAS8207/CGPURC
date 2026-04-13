import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, School, Plus, Search, Filter, 
  ChevronDown, Trash2, Edit2, ChevronRight, 
  X, CheckCircle2, Building2, Globe, Mail, Phone, Hash, 
} from 'lucide-react';

const AddUniversity = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // --- FORM STATE ---
  const initialFormState = {
    name: '',
    code: '',
    state: '',
    email: '',
    phone: '',
    website: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- MOCK DATA ---
  const [universities, setUniversities] = useState([
    { id: 1, name: 'Sarguja University', code: 'SU001', state: 'Chhattisgarh', email: 'contact@su.edu.in', phone: '0771-223344' },
    { id: 2, name: 'Bhilai Institute of Technology', code: 'BIT042', state: 'Chhattisgarh', email: 'admin@bitb.ac.in', phone: '0788-221133' },
    { id: 3, name: 'Pt. Ravishankar Shukla University', code: 'PRSU99', state: 'Chhattisgarh', email: 'info@prsu.org', phone: '0771-445566' },
  ]);

  // --- PAGINATION LOGIC ---
  const itemsPerPage = 5;
  const totalPages = Math.ceil(universities.length / itemsPerPage) || 1;

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUni = { ...formData, id: Date.now() };
    setUniversities([newUni, ...universities]);
    setFormData(initialFormState);
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    setUniversities(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* Universal Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-3"
      >
        <ArrowLeft size={16} /> 
        Back
      </button>

      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/admin-dashboard" className="hover:text-[#155DFC]">Admin Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">University Management</span>
      </div>

      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#155DFC]/10 rounded-lg">
              <School className="text-[#155DFC]" size={24} />
            </div>
            Manage Universities
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Onboard new educational institutions and manage existing profiles.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md font-bold text-sm active:scale-95 ${
            isFormOpen ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-[#155DFC] text-white'
          }`}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
          {isFormOpen ? 'Close Form' : 'Add University'}
        </button>
      </div>

      {/* Expandable Form Section */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-[#155DFC]/5 border-b border-slate-100 p-4 px-6">
            <h2 className="text-sm font-bold text-[#155DFC] uppercase tracking-widest">Institution Registration Form</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">University Name</label>
                <div className="relative">
                   <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#155DFC]/20 outline-none" placeholder="e.g. Sarguja University" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">University Code</label>
                <div className="relative">
                   <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input type="text" name="code" value={formData.code} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#155DFC]/20 outline-none" placeholder="e.g. SU001" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">State / Region</label>
                <select name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#155DFC]/20 outline-none">
                  <option value="">Select State</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Official Email</label>
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#155DFC]/20 outline-none" placeholder="admin@university.edu" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact Number</label>
                <div className="relative">
                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#155DFC]/20 outline-none" placeholder="0771-XXXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Website URL</label>
                <div className="relative">
                   <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#155DFC]/20 outline-none" placeholder="https://www.university.edu" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button type="submit" className="bg-[#155DFC] text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all text-xs uppercase tracking-widest">
                Save University Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">University Directory</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by name or code..." className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#155DFC]/20 outline-none font-medium" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-6 w-16">S.No</th>
                <th className="py-4 px-6">Institution Details</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Contact info</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {universities.map((uni, index) => (
                <tr key={uni.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-400">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-800 text-sm">{uni.name}</div>
                    <div className="text-[10px] font-bold text-[#155DFC] bg-[#155DFC]/5 px-2 py-0.5 rounded border border-[#155DFC]/10 w-fit mt-1">{uni.code}</div>
                  </td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">{uni.state}</td>
                  <td className="py-4 px-6 text-xs font-medium">
                    <div className="text-slate-800">{uni.email}</div>
                    <div className="text-slate-400 mt-1">{uni.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-[#155DFC] hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(uni.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CUSTOM PAGINATION (DROPDOWN STYLE) */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jump to Page:</label>
             <div className="relative">
                <select 
                  value={currentPage} 
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-1.5 pr-8 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#155DFC]/20 cursor-pointer shadow-sm"
                >
                  {[...Array(totalPages)].map((_, i) => (
                    <option key={i+1} value={i+1}>Page {i+1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
             </div>
          </div>

          <div className="text-right">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Showing Page <span className="text-[#155DFC]">{currentPage}</span> of <span className="text-slate-700">{totalPages}</span>
             </p>
             <p className="text-[9px] text-slate-400 font-medium mt-0.5">Total Records: {universities.length}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AddUniversity;