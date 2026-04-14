import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Briefcase, Plus, Search, Filter, 
  ChevronDown, Upload, Trash2, Edit2, ChevronLeft, 
  ChevronRight, X, ShieldCheck, FileText,
  MoreVertical, Eye, Image as ImageIcon, User
} from 'lucide-react';

const UserOfficeBearer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Institutional Office Bearers</span>
        </>
      );
    }
    return paths.map((path, index) => {
      const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
      const isLast = index === paths.length - 1;
      const displayName = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return (
        <React.Fragment key={routeTo}>
          {isLast ? (
             <span className="text-slate-900 font-semibold tracking-tight">Institutional Office Bearers</span>
          ) : (
             <>
               <Link to={routeTo} className="hover:text-[#FF6900] transition-colors">{displayName}</Link>
               <ChevronRight size={14} className="text-slate-400" />
             </>
          )}
        </React.Fragment>
      );
    });
  };

  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Modals
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Form States
  const initialFormState = { name: '', designation: '', phone: '', email: '', department: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Edit Form States
  const [editFormData, setEditFormData] = useState(initialFormState);
  const [editSelectedFile, setEditSelectedFile] = useState(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dummy data for the table
  const [bearers, setBearers] = useState([
    { id: 1, name: 'Dr. Ramesh Kumar', designation: 'Vice Chancellor', phone: '+91 9876543210', email: 'vc@university.edu', department: 'Administration', avatar: 'https://i.pravatar.cc/150?u=11' },
    { id: 2, name: 'Anita Sharma', designation: 'Registrar', phone: '+91 9876543211', email: 'registrar@university.edu', department: 'Management', avatar: 'https://i.pravatar.cc/150?u=12' },
    { id: 3, name: 'Vikram Singh', designation: 'Dean of Academics', phone: '+91 9876543212', email: 'dean@university.edu', department: 'Academics', avatar: 'https://i.pravatar.cc/150?u=13' },
    { id: 4, name: 'Priya Patel', designation: 'Chief Finance Officer', phone: '+91 9876543213', email: 'cfo@university.edu', department: 'Finance', avatar: 'https://i.pravatar.cc/150?u=14' },
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

  // Filter and Pagination Logic
  const filteredBearers = bearers.filter(bearer => {
    const matchesSearch = bearer.name.toLowerCase().includes(searchQuery.toLowerCase()) || bearer.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = departmentFilter === 'All' || bearer.department === departmentFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRecords = filteredBearers.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBearers.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEditInputChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (isEdit) {
        setEditSelectedFile(file);
        setEditPreviewUrl(url);
      } else {
        setSelectedFile(file);
        setPreviewUrl(url);
      }
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
    const newBearer = { 
      ...formData, 
      id: Date.now(),
      avatar: previewUrl || 'https://i.pravatar.cc/150?u=' + Date.now() // fallback avatar
    };
    setBearers([newBearer, ...bearers]);
    
    // Reset
    setFormData(initialFormState);
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsFormOpen(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedBearer = {
      ...editFormData,
      avatar: editPreviewUrl || editFormData.avatar
    };
    setBearers(bearers.map(b => b.id === updatedBearer.id ? updatedBearer : b));
    setEditModalData(null);
    setEditSelectedFile(null);
  };

  const openEditModal = (bearer) => {
    setEditFormData(bearer);
    setEditPreviewUrl(bearer.avatar);
    setEditModalData(bearer);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setBearers(prev => prev.filter(bearer => bearer.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setOpenDropdown(null);
  };

  return (
    <div className="animate-in fade-in duration-500 w-full pb-10 relative">
      
      {/* SUCCESS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white border-l-4 border-l-[#FF6900] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] shrink-0 text-[#FF6900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Information Submitted</h3>
              <p className="text-xs text-slate-500 mt-1">
                The office bearer details have been updated in your institutional directory.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Bearer Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{viewModalData.name}</h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-[#FF6900]/10 text-[#FF6900] text-xs font-bold uppercase tracking-wider rounded-[10px] border border-[#FF6900]/20">
                    {viewModalData.designation}
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-3">{viewModalData.department} Department</p>
                </div>
                {/* Image Top Right */}
                <div className="shrink-0">
                  {viewModalData.avatar ? (
                    <img src={viewModalData.avatar} alt="Profile" className="w-24 h-24 rounded-[10px] object-cover shadow-sm border border-slate-200" />
                  ) : (
                    <div className="w-24 h-24 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200">
                      <User size={32} className="text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-sm font-bold text-slate-800">{viewModalData.email}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                  <p className="text-sm font-bold text-slate-800">{viewModalData.phone}</p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[10px] transition-all shadow-sm outline-none">
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Office Bearer</h2>
              <button onClick={() => setEditModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Designation</label>
                  <input type="text" name="designation" value={editFormData.designation} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800" />
                </div>
                
                <div className="relative dropdown-container">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                  <select name="department" value={editFormData.department} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Management">Management</option>
                    <option value="Finance">Finance</option>
                    <option value="Academics">Academics</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-[38px] text-slate-400 pointer-events-none" size={16} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={editFormData.phone} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800" />
                </div>
                
                {/* Edit Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Update Photo</label>
                  {editPreviewUrl ? (
                    <div className="flex items-center justify-between p-2 px-3 bg-white border border-slate-200 shadow-sm rounded-[10px]">
                      <div className="flex items-center gap-3">
                        <img src={editPreviewUrl} alt="preview" className="w-10 h-10 rounded-[10px] object-cover border border-slate-100" />
                        <div>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{editSelectedFile ? editSelectedFile.name : 'Current Photo'}</p>
                          {editSelectedFile && <p className="text-xs font-medium text-slate-500">{formatFileSize(editSelectedFile.size)}</p>}
                        </div>
                      </div>
                      <button type="button" onClick={() => { setEditSelectedFile(null); setEditPreviewUrl(null); }} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] transition-colors outline-none">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 shadow-sm border border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#FF6900]/5 hover:border-[#FF6900]/30 transition-all text-slate-600 text-sm font-medium group">
                      <Upload size={18} className="text-slate-400 group-hover:text-[#FF6900] transition-colors" />
                      <span>Browse New Image...</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, true)} />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setEditModalData(null)} className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-[10px] transition-all shadow-sm outline-none">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-[#FF6900] hover:bg-[#FF6900]/90 rounded-[10px] shadow-md hover:shadow-lg transition-all active:scale-95 outline-none">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-4 rounded-[10px] outline-none"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Dynamic Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        {generateBreadcrumbs()}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <Briefcase size={24} />
            </div>
            Office Bearers
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your university's official representatives and contact data.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] transition-all shadow-md font-bold text-sm active:scale-95 outline-none ${
            isFormOpen ? 'bg-slate-100 text-slate-600' : 'bg-[#FF6900] hover:bg-[#FF6900]/90 text-white hover:shadow-lg'
          }`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel Form' : 'Add Office Bearer'}
        </button>
      </div>

      {/* Expandable Form Section */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">New Office Bearer Details</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. Dr. John Doe" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. Registrar" 
                />
              </div>

              <div className="relative dropdown-container">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                <select name="department" value={formData.department} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Department</option>
                  <option value="Administration">Administration</option>
                  <option value="Management">Management</option>
                  <option value="Finance">Finance</option>
                  <option value="Academics">Academics</option>
                </select>
                <ChevronDown className="absolute right-4 top-[38px] text-slate-400 pointer-events-none" size={16} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="+91 XXXXX XXXXX" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="official@university.edu" 
                />
              </div>

              {/* Upload with Visual Preview */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Photo</label>
                {previewUrl ? (
                  <div className="flex items-center justify-between p-2 px-3 bg-white border border-slate-200 shadow-sm rounded-[10px]">
                    <div className="flex items-center gap-3">
                      <img src={previewUrl} alt="preview" className="w-10 h-10 rounded-[10px] object-cover border border-slate-100" />
                      <div>
                        <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{selectedFile.name}</p>
                        <p className="text-xs font-medium text-slate-500">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] transition-colors outline-none">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 shadow-sm border border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#FF6900]/5 hover:border-[#FF6900]/30 transition-all text-slate-600 text-sm font-medium group">
                    <ImageIcon size={18} className="text-slate-400 group-hover:text-[#FF6900] transition-colors" />
                    <span>Browse Image...</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, false)} />
                  </label>
                )}
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button type="submit" className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-[#FF6900] hover:bg-[#FF6900]/90 shadow-md hover:shadow-lg rounded-[10px] transition-all active:scale-95 outline-none">
                Save to Directory
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search bearers by name or role..." 
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
        
        {/* EDUNUT FILTER DROPDOWN */}
        <div className="relative dropdown-container">
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'filter' ? null : 'filter')}
            className="flex items-center gap-2 text-slate-600 bg-white shadow-sm border-none px-4 py-2 rounded-[10px] hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-all text-sm font-bold w-full sm:w-auto justify-center outline-none"
          >
            <Filter size={18} />
            {departmentFilter === 'All' ? 'All Depts' : departmentFilter}
            <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'filter' ? 'rotate-180 text-[#FF6900]' : ''}`} />
          </button>

          {openDropdown === 'filter' && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border-none">
              {['All', 'Administration', 'Management', 'Finance', 'Academics'].map(dept => (
                <button
                  key={dept}
                  onClick={() => { setDepartmentFilter(dept); setOpenDropdown(null); setCurrentPage(1); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors outline-none ${departmentFilter === dept ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900]'}`}
                >
                  {dept === 'All' ? 'All Departments' : dept}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Name & Role</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((bearer, index) => (
              <tr key={bearer.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {bearer.avatar ? (
                       <img src={bearer.avatar} alt="avatar" className="w-10 h-10 rounded-[10px] object-cover border border-slate-200 shadow-sm" />
                    ) : (
                       <div className="w-10 h-10 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm">
                         <User size={16} className="text-slate-400" />
                       </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{bearer.name}</div>
                      <div className="text-[10px] font-bold text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 rounded-[10px] border border-[#FF6900]/20 w-fit mt-1 uppercase tracking-wider">
                        {bearer.designation}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 font-bold">
                  {bearer.department}
                </td>
                <td className="py-4 px-6 text-sm">
                  <div className="font-bold text-slate-700">{bearer.email}</div>
                  <div className="text-slate-500 font-medium mt-0.5">{bearer.phone}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-[10px] text-xs font-bold border border-emerald-200 uppercase tracking-wider">Active</span>
                </td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === `action-${bearer.id}` ? null : `action-${bearer.id}`)}
                    className="p-2 text-slate-400 hover:bg-[#FF6900]/10 hover:text-[#FF6900] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Edunut Action Dropdown */}
                  {openDropdown === `action-${bearer.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={() => { setViewModalData(bearer); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={() => openEditModal(bearer)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bearer.id)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left outline-none"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                  No office bearers found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination Footer (Matches Edunut Target Design) */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-bold mr-3">Total: {totalRecords}</span>
          
          {/* Custom Styled Dropdown for Items Per Page */}
          <div className="relative inline-flex items-center dropdown-container">
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-white font-bold cursor-pointer text-slate-700 outline-none"
            >
              {[5, 10, 15, 20, 50].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
          </div>
          
          <span className="ml-3 font-medium">items per page</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600">
          
          {/* Custom Styled Dropdown for Page Select */}
          <div className="flex items-center">
            <div className="relative inline-flex items-center mr-2 dropdown-container">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF6900]/20 transition-all bg-white font-bold cursor-pointer text-slate-700 outline-none"
              >
                {Array.from({ length: totalPages || 1 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={14} />
            </div>
            <span className="font-medium">of {totalPages || 1} pages</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#FF6900] hover:bg-[#FF6900]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 border-none shadow-sm bg-white rounded-[10px] text-slate-600 hover:text-[#FF6900] hover:bg-[#FF6900]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserOfficeBearer;