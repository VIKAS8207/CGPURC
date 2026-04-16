import React, { useState } from 'react';
import { ArrowLeft, Search, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const sessions = ["2024-25", "2025-26", "2026-27"];
const universities = [
  "Dr CV Raman University",
  "MATS University",
  "Kalinga University",
  "The ICFAI University Raipur",
  "ITM University",
  "Amity University"
];

const UniversityCourseReport = () => {
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [showReport, setShowReport] = useState(false);

  const handleViewReport = () => {
    if (selectedSession && selectedUniversity) {
      setShowReport(true);
    } else {
      // Small visual feedback if they try to search without selecting
      alert("Please select both a Session and a University.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex items-center gap-4 print:hidden">
          <Link 
            to="/admin-dashboard" 
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">University-wise Course Student Report</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Filter and view course specific student distributions</p>
          </div>
        </div>

        {/* Filter Selection Card */}
        <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm print:hidden">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            
            {/* Session Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Session</label>
              <select 
                value={selectedSession}
                onChange={(e) => {
                  setSelectedSession(e.target.value);
                  setShowReport(false); // Hide report if filter changes
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all font-medium hover:border-slate-300"
              >
                <option value="" disabled>-- Select Session --</option>
                {sessions.map(session => (
                  <option key={session} value={session}>{session}</option>
                ))}
              </select>
            </div>

            {/* University Dropdown */}
            <div className="flex-1 md:flex-[2]">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select University</label>
              <select 
                value={selectedUniversity}
                onChange={(e) => {
                  setSelectedUniversity(e.target.value);
                  setShowReport(false); // Hide report if filter changes
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all font-medium hover:border-slate-300"
              >
                <option value="" disabled>-- Select University --</option>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* View Button */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleViewReport}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1e40af] text-white rounded-xl hover:bg-blue-800 hover:shadow-md transition-all text-sm font-bold"
              >
                <Search size={16} strokeWidth={2.5} />
                VIEW REPORT
              </button>
            </div>

          </div>
        </div>

        {/* Report Container (Conditionally Rendered) */}
        {showReport && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Report Header Info */}
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-blue-800">Course-wise Student Report</h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  <span className="font-bold text-slate-800">University:</span> {selectedUniversity} 
                  <span className="mx-3 text-slate-300">|</span> 
                  <span className="font-bold text-slate-800">Session:</span> {selectedSession}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-red-700 transition-all text-sm font-bold shadow-sm whitespace-nowrap">
                <FileDown size={16} />
                EXPORT TO PDF
              </button>
            </div>

            {/* Complex Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  {/* Top Header Row */}
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th rowSpan="2" className="py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200 text-center align-middle">S.no</th>
                    <th rowSpan="2" className="py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200 text-center align-middle">Course</th>
                    <th rowSpan="2" className="py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200 text-center align-middle">Sub Course</th>
                    <th rowSpan="2" className="py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200 text-center align-middle">Course Level</th>
                    
                    <th colSpan="3" className="py-2 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-r border-slate-200 text-center">Registered Students</th>
                    <th colSpan="3" className="py-2 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-r border-slate-200 text-center">Attempted Students</th>
                    <th colSpan="3" className="py-2 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-r border-slate-200 text-center">Passed Students</th>
                    
                    <th rowSpan="2" className="py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200 text-center align-middle">Failed Students</th>
                    <th rowSpan="2" className="py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider text-center align-middle">ATKT Students</th>
                  </tr>
                  
                  {/* Sub Header Row */}
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {/* Registered Sub */}
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">Regular</th>
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">ATKT</th>
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">Total</th>
                    {/* Attempted Sub */}
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">Regular</th>
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">ATKT</th>
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">Total</th>
                    {/* Passed Sub */}
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">1st Div</th>
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">2nd Div</th>
                    <th className="py-2 px-3 text-xs font-semibold text-slate-600 text-center border-r border-slate-200 bg-white">3rd Div</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty State Row */}
                  <tr>
                    <td colSpan="15" className="py-8 px-6 text-center text-red-500 text-sm font-medium">
                      No data available.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UniversityCourseReport;