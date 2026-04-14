import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, School, Plus, Search, 
  ChevronDown, Trash2, Edit2, ChevronLeft, 
  ChevronRight, X, ShieldCheck, User,
  MoreVertical, Eye, Image as ImageIcon
} from 'lucide-react';

const AddUniversity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- DYNAMIC BREADCRUMBS ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/admin-dashboard" className="hover:text-[#155DFC] transition-colors">Admin Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link to="/admin/master" className="hover:text-[#155DFC] transition-colors">Master Configuration</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Institution Registration</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Institution Registration</span>
          ) : (
             <>
               <Link to={routeTo} className="hover:text-[#155DFC] transition-colors">{displayName}</Link>
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

  // Modals
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Form States (Updated Fields)
  const initialFormState = { 
    universityId: '', 
    universityName: '', 
    contactNumber: '', 
    emailId: '', 
    address: '', 
    pinCode: '', 
    websiteUrl: '', 
    universityDetails: '', 
    establishmentYear: '', 
    registrationNumber: '',
    loginUsername: ''
  };
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
  const [universities, setUniversities] = useState([
    { 
      id: 1, 
      universityId: 'UNI-001', 
      universityName: 'Sarguja University', 
      contactNumber: '0771-223344', 
      emailId: 'contact@su.edu.in', 
      address: 'Main Campus, Ambikapur', 
      pinCode: '497001', 
      websiteUrl: 'https://su.edu.in', 
      universityDetails: 'State university established by Government of Chhattisgarh.', 
      establishmentYear: '2008', 
      registrationNumber: 'CGS-2008-01',
      loginUsername: 'admin_sarguja',
      avatar: 'https://i.pravatar.cc/150?u=u1' 
    },
    { 
      id: 2, 
      universityId: 'UNI-002', 
      universityName: 'Bhilai Institute of Technology', 
      contactNumber: '0788-221133', 
      emailId: 'admin@bitb.ac.in', 
      address: 'BIT Campus, Durg', 
      pinCode: '491001', 
      websiteUrl: 'https://bitb.ac.in', 
      universityDetails: 'Premier technical institute in Central India.', 
      establishmentYear: '1986', 
      registrationNumber: 'AICTE-1986-BIT',
      loginUsername: 'admin_bit',
      avatar: 'https://i.pravatar.cc/150?u=u2' 
    }
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
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()) || uni.universityId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalRecords = filteredUniversities.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUniversities.slice(indexOfFirstItem, indexOfLastItem);

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
    const newUni = { 
      ...formData, 
      id: Date.now(),
      avatar: previewUrl || null 
    };
    setUniversities([newUni, ...universities]);
    
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
    const updatedUni = {
      ...editFormData,
      avatar: editPreviewUrl || editFormData.avatar
    };
    setUniversities(universities.map(u => u.id === updatedUni.id ? updatedUni : u));
    setEditModalData(null);
    setEditSelectedFile(null);
  };

  const openEditModal = (uni) => {
    setEditFormData(uni);
    setEditPreviewUrl(uni.avatar);
    setEditModalData(uni);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setUniversities(prev => prev.filter(uni => uni.id !== id));
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
          <div className="bg-white border-l-4 border-l-[#155DFC] shadow-xl rounded-[10px] p-4 max-w-md flex items-start gap-4">
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] shrink-0 text-[#155DFC]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Institution Registered</h3>
              <p className="text-xs text-slate-500 mt-1">
                The university profile and admin login have been successfully created.
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
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Institution Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{viewModalData.universityName}</h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-[#155DFC]/10 text-[#155DFC] text-xs font-bold uppercase tracking-wider rounded-[10px] border border-[#155DFC]/20">
                    {viewModalData.universityId}
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-3">{viewModalData.registrationNumber}</p>
                </div>
                {/* Image Top Right */}
                <div className="shrink-0">
                  {viewModalData.avatar ? (
                    <img src={viewModalData.avatar} alt="Logo" className="w-24 h-24 rounded-[10px] object-cover shadow-sm border border-slate-200" />
                  ) : (
                    <div className="w-24 h-24 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200">
                      <School size={32} className="text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email ID</p>
                  <p className="text-sm font-bold text-slate-800">{viewModalData.emailId}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
                  <p className="text-sm font-bold text-slate-800">{viewModalData.contactNumber}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Website URL</p>
                  <p className="text-sm font-bold text-[#155DFC] truncate">{viewModalData.websiteUrl}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Establishment Year</p>
                  <p className="text-sm font-bold text-slate-800">{viewModalData.establishmentYear}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100 sm:col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                  <p className="text-sm font-bold text-slate-800">{viewModalData.address}, {viewModalData.pinCode}</p>
                </div>
              </div>

              <div className="p-5 bg-slate-100/50 rounded-[10px] border border-slate-200">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Admin Access Credentials</p>
                 <div className="flex items-center gap-3">
                    <User size={16} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-800">{viewModalData.loginUsername}</span>
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
          <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Institution Profile</h2>
              <button onClick={() => setEditModalData(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-[10px] transition-colors outline-none">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-8 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University Name</label>
                  <input type="text" name="universityName" value={editFormData.universityName} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University ID</label>
                  <input type="text" name="universityId" value={editFormData.universityId} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Number</label>
                  <input type="text" name="registrationNumber" value={editFormData.registrationNumber} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
                  <input type="tel" name="contactNumber" value={editFormData.contactNumber} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID</label>
                  <input type="email" name="emailId" value={editFormData.emailId} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                  <input type="url" name="websiteUrl" value={editFormData.websiteUrl} onChange={handleEditInputChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                  <input type="text" name="address" value={editFormData.address} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pin Code</label>
                  <input type="text" name="pinCode" value={editFormData.pinCode} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University Details / Bio</label>
                  <textarea name="universityDetails" value={editFormData.universityDetails} onChange={handleEditInputChange} rows="3"
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Establishment Year</label>
                  <input type="text" name="establishmentYear" value={editFormData.establishmentYear} onChange={handleEditInputChange} required 
                    className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Login Username</label>
                  <input type="text" name="loginUsername" value={editFormData.loginUsername} readOnly disabled
                    className="w-full px-4 py-2.5 bg-slate-100 border-none shadow-sm rounded-[10px] font-medium text-slate-500 cursor-not-allowed" title="Username cannot be changed" />
                </div>
                
                {/* Edit Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Update Logo</label>
                  {editPreviewUrl ? (
                    <div className="flex items-center justify-between p-2 px-3 bg-white border border-slate-200 shadow-sm rounded-[10px]">
                      <div className="flex items-center gap-3">
                        <img src={editPreviewUrl} alt="preview" className="w-10 h-10 rounded-[10px] object-cover border border-slate-100" />
                        <div>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{editSelectedFile ? editSelectedFile.name : 'Current Logo'}</p>
                          {editSelectedFile && <p className="text-xs font-medium text-slate-500">{formatFileSize(editSelectedFile.size)}</p>}
                        </div>
                      </div>
                      <button type="button" onClick={() => { setEditSelectedFile(null); setEditPreviewUrl(null); }} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] transition-colors outline-none">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 shadow-sm border border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#155DFC]/5 hover:border-[#155DFC]/30 transition-all text-slate-600 text-sm font-medium group">
                      <Upload size={18} className="text-slate-400 group-hover:text-[#155DFC] transition-colors" />
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
                <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-[#155DFC] hover:bg-[#155DFC]/90 rounded-[10px] shadow-md hover:shadow-lg transition-all active:scale-95 outline-none">
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
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#155DFC] transition-colors mb-4 rounded-[10px] outline-none"
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
            <div className="p-2 bg-[#155DFC]/10 rounded-[10px] text-[#155DFC]">
              <School size={24} />
            </div>
            Institution Registration Form
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Onboard new educational institutions, manage profiles, and generate admin credentials.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] transition-all shadow-md font-bold text-sm active:scale-95 outline-none ${
            isFormOpen ? 'bg-slate-100 text-slate-600' : 'bg-[#155DFC] hover:bg-[#155DFC]/90 text-white hover:shadow-lg'
          }`}
        >
          {isFormOpen ? <ChevronDown size={20} className="transform rotate-180" /> : <Plus size={20} />}
          {isFormOpen ? 'Cancel Form' : 'Register Institution'}
        </button>
      </div>

      {/* Expandable Form Section */}
      {isFormOpen && (
        <div className="bg-white border border-slate-200 rounded-[10px] shadow-sm mb-8 animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">New Institution Profile</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              {/* Row 1 */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">University Name</label>
                <input type="text" name="universityName" value={formData.universityName} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. State Technical University" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">University ID</label>
                <input type="text" name="universityId" value={formData.universityId} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. UNI-001" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Number</label>
                <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. GOV-REG-2026" 
                />
              </div>

              {/* Row 2 */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="+91 XXXXX XXXXX" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID</label>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="official@university.edu" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="https://www.university.edu" 
                />
              </div>

              {/* Row 3 - Span 2 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="Full physical address..." 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pin Code</label>
                <input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. 492001" 
                />
              </div>

              {/* Row 4 - Textarea */}
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-slate-700 mb-2">University Details</label>
                <textarea name="universityDetails" value={formData.universityDetails} onChange={handleInputChange} rows="3"
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400 resize-none"
                  placeholder="Brief description about the university..."
                ></textarea>
              </div>

              {/* Row 5 */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Establishment Year</label>
                <input type="text" name="establishmentYear" value={formData.establishmentYear} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all font-medium text-slate-800 placeholder-slate-400" 
                  placeholder="e.g. 1995" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 text-[#155DFC]">Admin Login Username</label>
                <input type="text" name="loginUsername" value={formData.loginUsername} onChange={handleInputChange} required 
                  className="w-full px-4 py-2.5 bg-[#155DFC]/5 border border-[#155DFC]/20 shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/30 transition-all font-bold text-[#155DFC] placeholder-[#155DFC]/40" 
                  placeholder="e.g. admin_stu" 
                />
              </div>

              {/* Upload with Visual Preview */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">University Logo</label>
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
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 shadow-sm border border-slate-200 border-dashed rounded-[10px] cursor-pointer hover:bg-[#155DFC]/5 hover:border-[#155DFC]/30 transition-all text-slate-600 text-sm font-medium group">
                    <ImageIcon size={18} className="text-slate-400 group-hover:text-[#155DFC] transition-colors" />
                    <span>Browse Logo...</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, false)} />
                  </label>
                )}
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button type="submit" className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-[#155DFC] hover:bg-[#155DFC]/90 shadow-md hover:shadow-lg rounded-[10px] transition-all active:scale-95 outline-none flex items-center justify-center gap-2">
                <User size={16} /> Create & Generate Login
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar: Search */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search institutions by name or ID..." 
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none shadow-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all text-sm font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border-x border-t border-slate-200 overflow-hidden overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">S.No</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Institution Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Login</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((uni, index) => (
              <tr key={uni.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {uni.avatar ? (
                       <img src={uni.avatar} alt="logo" className="w-10 h-10 rounded-[10px] object-cover border border-slate-200 shadow-sm bg-white" />
                    ) : (
                       <div className="w-10 h-10 rounded-[10px] bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm">
                         <School size={16} className="text-slate-400" />
                       </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{uni.universityName}</div>
                      <div className="text-[10px] font-bold text-[#155DFC] bg-[#155DFC]/10 px-2 py-0.5 rounded-[10px] border border-[#155DFC]/20 w-fit mt-1 uppercase tracking-wider">
                        {uni.universityId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <div className="font-bold text-slate-700">{uni.emailId}</div>
                  <div className="text-slate-500 font-medium mt-0.5">{uni.contactNumber}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-[10px] text-xs font-bold border border-slate-200">
                    @{uni.loginUsername}
                  </span>
                </td>
                <td className="py-4 px-6 text-right relative dropdown-container">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === `action-${uni.id}` ? null : `action-${uni.id}`)}
                    className="p-2 text-slate-400 hover:bg-[#155DFC]/10 hover:text-[#155DFC] rounded-[10px] transition-colors outline-none opacity-0 group-hover:opacity-100 focus:opacity-100" 
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Edunut Action Dropdown */}
                  {openDropdown === `action-${uni.id}` && (
                    <div className="absolute right-8 top-10 w-36 bg-white border-none rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={() => { setViewModalData(uni); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#155DFC]/10 hover:text-[#155DFC] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={() => openEditModal(uni)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#155DFC]/10 hover:text-[#155DFC] transition-colors border-b border-slate-50 text-left outline-none"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(uni.id)}
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
                <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">
                  No institutions found matching your criteria.
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
              className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-bold cursor-pointer text-slate-700 outline-none"
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
                className="appearance-none border-none shadow-sm rounded-[10px] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 transition-all bg-white font-bold cursor-pointer text-slate-700 outline-none"
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
  );
};

export default AddUniversity;