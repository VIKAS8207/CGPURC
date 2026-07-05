import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ChevronRight, CheckCircle2, FileCheck2, Stamp,
  ArrowLeft, ChevronDown, Filter, ChevronLeft, X, ShieldCheck
} from 'lucide-react';

const VerifyDuplicateRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- DYNAMIC BREADCRUMBS (Matched from Template) ---
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) {
      return (
        <>
          <Link to="/user-dashboard" className="hover:text-[#FF6900] transition-colors">User Dashboard</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold tracking-tight">Verify Duplicate Requests</span>
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
             <span className="text-slate-900 font-semibold tracking-tight">Verify Duplicate Requests</span>
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNotification, setShowNotification] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock Data
  const [requests, setRequests] = useState([
    { id: "REQ-001", name: "Rahul Sharma", studentId: "ST-89021", course: "B.Tech Computer Science", date: "12 Apr 2026", status: "Pending" },
    { id: "REQ-002", name: "Priya Verma", studentId: "ST-89045", course: "MBA Finance", date: "13 Apr 2026", status: "Pending" },
    { id: "REQ-003", name: "Amit Kumar", studentId: "ST-89067", course: "B.Sc Mathematics", date: "14 Apr 2026", status: "Given" },
    { id: "REQ-004", name: "Sanya Gupta", studentId: "ST-89088", course: "B.Tech Civil Engineering", date: "15 Apr 2026", status: "Pending" },
  ]);

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- HANDLERS ---
  const handleMarkAsGiven = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Given" } : req
    ));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  // --- FILTER & PAGINATION LOGIC ---
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRecords = filteredRequests.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

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
              <h3 className="text-sm font-bold text-slate-900">Request Verified</h3>
              <p className="text-xs text-slate-500 mt-1">
                The duplicate marksheet has been marked as 'Given' to the student.
              </p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 shrink-0 outline-none">
              <X size={18} />
            </button>
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-[10px] text-[#FF6900]">
              <FileCheck2 size={24} />
            </div>
            Verify Duplicate Requests
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Verify and issue duplicate marksheets to students sent by the administration.</p>
        </div>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-t-[10px] border-x border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by student name or ID..." 
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
            {statusFilter === 'All' ? 'All Status' : statusFilter}
            <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'filter' ? 'rotate-180 text-[#FF6900]' : ''}`} />
          </button>

          {openDropdown === 'filter' && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-[10px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 border-none">
              {['All', 'Pending', 'Given'].map(status => (
                <button
                  key={status}
                  onClick={() => { setStatusFilter(status); setOpenDropdown(null); setCurrentPage(1); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors outline-none ${statusFilter === status ? 'bg-[#FF6900]/10 text-[#FF6900]' : 'text-slate-700 hover:bg-[#FF6900]/10 hover:text-[#FF6900]'}`}
                >
                  {status === 'All' ? 'All Status' : status}
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
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Info</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Details</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Sent</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.length > 0 ? currentItems.map((req, index) => (
              <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-slate-600">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{req.name}</div>
                    <div className="text-[10px] font-bold text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 rounded-[10px] border border-[#FF6900]/20 w-fit mt-1 uppercase tracking-wider">
                      {req.studentId}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 font-bold">
                  {req.course}
                </td>
                <td className="py-4 px-6 text-sm">
                  <div className="font-bold text-slate-700">{req.date}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  {req.status === 'Pending' ? (
                    <button 
                      onClick={() => handleMarkAsGiven(req.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF6900] border border-orange-100 hover:bg-[#FF6900] hover:text-white rounded-[10px] font-bold text-xs uppercase tracking-widest transition-all outline-none shadow-sm"
                    >
                      Verify & Give <Stamp size={14} />
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-[10px] font-bold text-xs uppercase tracking-widest shadow-sm">
                      Given <CheckCircle2 size={14} />
                    </div>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">
                  No duplicate requests found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination Footer (Exact Match) */}
      <div className="bg-white border border-slate-200 rounded-b-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-bold mr-3">Total: {totalRecords}</span>
          
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

export default VerifyDuplicateRequest;