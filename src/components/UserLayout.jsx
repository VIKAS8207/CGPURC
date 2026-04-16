import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  ChevronsLeft, 
  Menu, 
  LayoutDashboard, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  BarChart3,
  User,
  LogOut,
  Bell,
  Users,
  GraduationCap,
  CalendarDays,
  UploadCloud,
  Briefcase,
  HandCoins,
  FileText,
  Search,
  TrendingUp
} from 'lucide-react';

const UserLayout = () => {
  // --- SIDEBAR STATES ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  
  // --- NAVBAR STATES ---
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
      
      {/* SIDEBAR - ORANGE THEME */}
      <aside 
        className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className={`flex items-center gap-2 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center shadow-sm shadow-orange-200">
              <span className="text-white font-bold">✻</span>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">CGPURC</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <ChevronsLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className={`px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Main Menu' : '•••'}
          </p>

          <Link to="/user-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user-dashboard') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <LayoutDashboard size={20} className={isActive('/user-dashboard') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* ACADEMIC MASTERS DROPDOWN */}
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
                {isSidebarOpen && <span>Academic Masters</span>}
              </div>
              {isSidebarOpen && (
                isAcademicsOpen ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>
              )}
            </button>
            
            {isSidebarOpen && isAcademicsOpen && (
              <div className="pl-11 pr-3 py-2 space-y-1">
                <Link 
                  to="/user/course-setup" 
                  className={`block py-2 text-sm transition-colors ${isActive('/user/course-setup') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Course
                </Link>
                <Link 
                  to="/university/branch-setup" 
                  className={`block py-2 text-sm transition-colors ${isActive('/university/branch-setup') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Branch 
                </Link>
              </div>
            )}
          </div>

          {/* Student Data Link */}
          <Link to="/user/uploads/student-data" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user/uploads/student-data') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Users size={20} className={isActive('/user/uploads/student-data') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Student Data</span>}
          </Link>

          {/* Degree Certificates Link */}
          <Link to="/user/uploads/degree" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user/uploads/degree') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <GraduationCap size={20} className={isActive('/user/uploads/degree') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Degree Certificates</span>}
          </Link>

          {/* Academic Calendar Link */}
          <Link to="/user/uploads/academic-calendar" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user/uploads/academic-calendar') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <CalendarDays size={20} className={isActive('/user/uploads/academic-calendar') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Academic Calendar</span>}
          </Link>

          <Link to="/user/uploads" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user/uploads') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <UploadCloud size={20} className={isActive('/user/uploads') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Bulk Uploads</span>}
          </Link>

          <Link to="/user/student-promotion" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user/student-promotion') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <TrendingUp size={20} className={isActive('/user/student-promotion') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>StudentPromotion</span>}
          </Link>

          <Link to="/user/office-bearers" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user/office-bearers') ? 'bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Briefcase size={20} className={isActive('/user/office-bearers') ? 'text-orange-600' : 'text-slate-400'} />
            {isSidebarOpen && <span>Office Bearer</span>}
          </Link>

          {/* PAYMENT DROPDOWN */}
          <div>
            <button 
              onClick={() => {
                setIsPaymentOpen(!isPaymentOpen);
                if (!isSidebarOpen) setIsSidebarOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HandCoins size={20} className="text-slate-400" />
                {isSidebarOpen && <span>Payment</span>}
              </div>
              {isSidebarOpen && (
                isPaymentOpen ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>
              )}
            </button>
            
            {isSidebarOpen && isPaymentOpen && (
              <div className="pl-11 pr-3 py-2 space-y-1">
                <Link 
                  to="/user/pay-fees" 
                  className={`block py-2 text-sm transition-colors ${isActive('/user/pay-fees') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Pay Fees
                </Link>
                <Link 
                  to="/user/payment-history" 
                  className={`block py-2 text-sm transition-colors ${isActive('/user/payment-history') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Payment History
                </Link>
              </div>
            )}
          </div>



          {/* REPORTS DROPDOWN */}
          <div>
            <button 
              onClick={() => {
                setIsReportsOpen(!isReportsOpen);
                if (!isSidebarOpen) setIsSidebarOpen(true);
                setIsAcademicsOpen(false); 
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BarChart3 size={20} className="text-slate-400" />
                {isSidebarOpen && <span>Reports</span>}
              </div>
              {isSidebarOpen && (
                isReportsOpen ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>
              )}
            </button>
            
            {isSidebarOpen && isReportsOpen && (
              <div className="pl-11 pr-3 py-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                <Link 
                  to="/reports/course-details" 
                  className={`block py-2 text-sm transition-colors ${isActive('/reports/course-details') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Courses & Branches
                </Link>
                <Link 
                  to="/reports/student-list" 
                  className={`block py-2 text-sm transition-colors ${isActive('/reports/student-list') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Student List
                </Link>
                <Link 
                  to="/reports/office-bearers-list" 
                  className={`block py-2 text-sm transition-colors ${isActive('/reports/office-bearers-list') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Bearer List
                </Link>
                <Link 
                  to="/reports/student-fees-details" 
                  className={`block py-2 text-sm transition-colors ${isActive('/reports/student-fees-details') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Fees Report
                </Link>
                <Link 
                  to="/reports/session-wise" 
                  className={`block py-2 text-sm transition-colors ${isActive('/reports/session-wise') ? 'text-orange-600 font-semibold' : 'text-slate-500 hover:text-orange-600'}`}
                >
                  Course-Session Wise Report
                </Link>
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
          <div className="relative w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] hidden lg:block">
                Academic Session
              </span>

              <div className="relative" ref={sessionDropdownRef}>
                {/* The Depth Cutout Pill (Trigger) */}
                <button
                  onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}
                  className="relative flex items-center bg-slate-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300 h-[40px] px-6 min-w-[170px] outline-none group border-none"
                >
                  <span className={`text-sm font-black transition-colors duration-300 ${isSessionDropdownOpen ? 'text-[#FF6900]' : 'text-slate-700'}`}>
                    {sessionOptions.find(opt => opt.value === selectedYear)?.label}
                  </span>
                  
                  <div className="absolute right-4 pointer-events-none flex items-center justify-center border-l border-slate-300/50 pl-2">
                    <ChevronDown 
                      size={16} 
                      className={`transition-all duration-300 ${isSessionDropdownOpen ? 'text-[#FF6900] rotate-180' : 'text-slate-400'}`} 
                    />
                  </div>
                </button>

                {/* EDUNUT UI DROPDOWN MENU */}
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
                            ? 'text-[#FF6900] bg-orange-50' 
                            : 'text-slate-600 hover:bg-orange-50 hover:text-[#FF6900]'
                          }`}
                      >
                        {option.label}
                        {selectedYear === option.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6900]"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            
            <Link 
  to="/user-profile" 
  className="flex items-center gap-3 cursor-pointer pl-2 group transition-all outline-none"
>
  {/* Text Section */}
  <div className="text-right hidden md:block">
    <p className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-[#FF6900] transition-colors">
      Student User
    </p>
    <p className="text-xs text-slate-500 font-medium">
      Computer Science
    </p>
  </div>

  {/* Avatar Section */}
  <div className="w-10 h-10 bg-orange-100 rounded-full border-2 border-orange-200 flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-[#FF6900] group-hover:text-white group-hover:border-[#FF6900] transition-all duration-300">
    <User size={20} />
  </div>
</Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none -z-10"></div>
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default UserLayout;