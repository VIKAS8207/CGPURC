import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, Settings, 
  Bell, Search, Menu, ChevronDown, ChevronRight, FileText,
  LogOut, ChevronsLeft, Calendar, Database, Briefcase, School, BarChart3, FileCheck2
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  
  // --- SESSION DROPDOWN STATES ---
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const sessionDropdownRef = useRef(null);

  const location = useLocation();

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  // Handle click outside for custom dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sessionDropdownRef.current && !sessionDropdownRef.current.contains(event.target)) {
        setIsSessionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sessionOptions = [
    { label: "2025 — 2026", value: "2025-26" },
    { label: "2026 — 2027", value: "2026-27" }
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside 
        className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className={`flex items-center gap-2 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">✻</span>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">CGPURC</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <ChevronsLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className={`px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Main Menu' : '•••'}
          </p>

          <Link to="/admin-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/admin-dashboard') ? 'bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <LayoutDashboard size={20} className={isActive('/admin-dashboard') ? 'text-blue-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link to="/admin/master" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/admin/master') ? 'bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Database size={20} className={isActive('/admin/master') ? 'text-blue-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Master</span>}
          </Link>

          {/* ACADEMICS DROPDOWN */}
          <div>
            <button 
              onClick={() => {
                setIsAcademicsOpen(!isAcademicsOpen);
                if (!isSidebarOpen) setIsSidebarOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-slate-400" />
                {isSidebarOpen && <span>Organisation Settings</span>}
              </div>
              {isSidebarOpen && (
                isAcademicsOpen ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>
              )}
            </button>
            
            {isSidebarOpen && isAcademicsOpen && (
              <div className="pl-11 pr-3 py-2 space-y-1">
                <Link 
                  to="/admin/penalty-master" 
                  className={`block py-2 text-sm transition-colors ${isActive('/admin/penalty-master') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  Penalty Percentage
                </Link>

                <Link 
                  to="/admin/master/financial-config" 
                  className={`block py-2 text-sm transition-colors ${isActive('/admin/master/financial-config') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  Financial Configuration
                </Link>
                
                <Link 
                  to="/admin/master/due-date-config" 
                  className={`block py-2 text-sm transition-colors ${isActive('/admin/master/due-date-config') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  Due Date
                </Link>
              </div>
            )}
          </div>

          <Link to="/admin/office-bearers" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/admin/office-bearers') ? 'bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Briefcase size={20} className={isActive('/admin/office-bearers') ? 'text-blue-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Office Bearer</span>}
          </Link>

          <Link to="/admin/add-university" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/admin/add-university') ? 'bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <School size={20} className={isActive('/admin/add-university') ? 'text-blue-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Add University</span>}
          </Link>

          <Link to="/admin/verify-certificates" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/admin/verify-certificates') ? 'bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <FileCheck2 size={20} className={isActive('/admin/verify-certificates') ? 'text-blue-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Verify Certificates</span>}
          </Link>

          {/* REPORTS DROPDOWN */}
          <div>
            <button 
              onClick={() => {
                setIsReportsOpen(!isReportsOpen);
                if (!isSidebarOpen) setIsSidebarOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-slate-400" />
                {isSidebarOpen && <span>Reports</span>}
              </div>
              {isSidebarOpen && (
                isReportsOpen ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>
              )}
            </button>
            
            {isSidebarOpen && isReportsOpen && (
              <div className="pl-11 pr-3 py-2 space-y-1">
                <Link to="/admin/reports/students" className={`block py-2 text-sm transition-colors ${isActive('/admin/reports/students') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}>Students Report</Link>
                <Link to="/admin/reports/students-enrolled" className={`block py-2 text-sm transition-colors ${isActive('/admin/reports/students-enrolled') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}>Students Enrolled Report</Link>
                <Link to="/admin/reports/university-fees" className={`block py-2 text-sm transition-colors ${isActive('/admin/reports/university-fees') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}>University 1% Fees Report</Link>
                <Link to="/admin/reports/pending-fees" className={`block py-2 text-sm transition-colors ${isActive('/admin/reports/pending-fees') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}>Pending Fees Files</Link>
                <Link to="/admin/reports/university-courses" className={`block py-2 text-sm transition-colors ${isActive('/admin/reports/university-courses') ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}>University Wise Course Report</Link>
              </div>
            )}
          </div>

        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors mt-1">
            <LogOut size={20} className="text-red-400" />
            {isSidebarOpen && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          {/* Search Bar */}
          <div className="relative w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-6">
            
            {/* ACADEMIC SESSION PILL - EDUNUT BLUE UI */}
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] hidden lg:block">
                Academic Session
              </span>

              <div className="relative" ref={sessionDropdownRef}>
                <button
                  onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}
                  className="relative flex items-center bg-slate-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300 h-[40px] px-6 min-w-[170px] outline-none group border-none"
                >
                  <span className={`text-sm font-black transition-colors duration-300 ${isSessionDropdownOpen ? 'text-blue-600' : 'text-slate-700'}`}>
                    {sessionOptions.find(opt => opt.value === selectedYear)?.label}
                  </span>
                  
                  <div className="absolute right-4 pointer-events-none flex items-center justify-center border-l border-slate-300/50 pl-2">
                    <ChevronDown 
                      size={16} 
                      className={`transition-all duration-300 ${isSessionDropdownOpen ? 'text-blue-600 rotate-180' : 'text-slate-400'}`} 
                    />
                  </div>
                </button>

                {/* DROPDOWN MENU */}
                {isSessionDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-full min-w-[180px] bg-white rounded-[20px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] py-2 z-[100] border-none animate-in fade-in zoom-in-95 duration-200">
                    {sessionOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedYear(option.value);
                          setIsSessionDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm font-bold transition-all flex items-center justify-between
                          ${selectedYear === option.value 
                            ? 'text-blue-700 bg-blue-50' 
                            : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                          }`}
                      >
                        {option.label}
                        {selectedYear === option.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity pl-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-700 leading-tight">Admin User</p>
                <p className="text-xs text-slate-500 font-medium">Principal</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=eff6ff&color=1d4ed8" alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100 shadow-sm" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none -z-10"></div>
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;