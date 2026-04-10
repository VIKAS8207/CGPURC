import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, Settings, 
  Bell, Search, Menu, ChevronDown, ChevronRight, 
  LogOut, ChevronsLeft, Calendar, User
} from 'lucide-react';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const location = useLocation();

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

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
            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <ChevronsLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className={`px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Main Menu' : '•••'}
          </p>

          <Link to="/user-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user-dashboard') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
            <LayoutDashboard size={20} className={isActive('/user-dashboard') ? 'text-orange-500' : 'text-slate-400'} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* DROPDOWN MENU ITEM (Academics) */}
          <div>
            <button 
              onClick={() => {
                setIsAcademicsOpen(!isAcademicsOpen);
                if (!isSidebarOpen) setIsSidebarOpen(true); // Open sidebar if closed
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-slate-400" />
                {isSidebarOpen && <span>Academics</span>}
              </div>
              {isSidebarOpen && (
                isAcademicsOpen ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>
              )}
            </button>
            
            {/* Dropdown Content */}
            {isSidebarOpen && isAcademicsOpen && (
              <div className="pl-11 pr-3 py-2 space-y-1">
                <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-orange-600 transition-colors">Courses</Link>
                <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-orange-600 transition-colors">Departments</Link>
                <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-orange-600 transition-colors">Exams</Link>
              </div>
            )}
          </div>

          <Link to="/user-profile" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive('/user-profile') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Users size={20} className={isActive('/user-profile') ? 'text-orange-500' : 'text-slate-400'} />
            {isSidebarOpen && <span>Users & Profile</span>}
          </Link>

          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar size={20} className="text-slate-400" />
            {isSidebarOpen && <span>Calendar</span>}
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Settings size={20} className="text-slate-400" />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
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
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-700 leading-tight">Student User</p>
                <p className="text-xs text-slate-500">Computer Science</p>
              </div>
              <div className="w-9 h-9 bg-orange-100 rounded-full border border-orange-200 flex items-center justify-center text-orange-600">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT GOES HERE (The Outlet) */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none -z-10"></div>
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default UserLayout;