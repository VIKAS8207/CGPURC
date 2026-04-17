import React, { useState } from 'react';
import { ArrowLeft, Printer, Download, Building2, BookOpen, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Base data enriched with simulated program/branch details to fit the new requirement
const generateDetails = (totalStudents) => [
  { course: "B.Tech", branch: "Computer Science & Engineering", students: Math.floor(totalStudents * 0.35) },
  { course: "B.Tech", branch: "Mechanical Engineering", students: Math.floor(totalStudents * 0.20) },
  { course: "MBA", branch: "Marketing & Finance", students: Math.floor(totalStudents * 0.25) },
  { course: "B.Sc", branch: "Information Technology", students: Math.floor(totalStudents * 0.15) },
  { course: "BBA", branch: "Business Administration", students: Math.floor(totalStudents * 0.05) }
];

const universityData = [
  { id: 1, name: "Dr CV Raman University", courses: 33, branches: 74, students: 5337, details: generateDetails(5337) },
  { id: 2, name: "MATS University", courses: 84, branches: 86, students: 12240, details: generateDetails(12240) },
  { id: 3, name: "Kalinga University", courses: 48, branches: 136, students: 16895, details: generateDetails(16895) },
  { id: 4, name: "The ICFAI University Raipur", courses: 23, branches: 53, students: 1794, details: generateDetails(1794) },
  { id: 5, name: "ITM University", courses: 19, branches: 35, students: 3481, details: generateDetails(3481) },
  { id: 6, name: "Amity University", courses: 66, branches: 64, students: 5140, details: generateDetails(5140) },
  { id: 7, name: "O.P. Jindal University", courses: 35, branches: 44, students: 4563, details: generateDetails(4563) },
  { id: 8, name: "ISBM University", courses: 43, branches: 135, students: 9327, details: generateDetails(9327) },
  { id: 9, name: "AAFT University", courses: 12, branches: 41, students: 1486, details: generateDetails(1486) },
  { id: 10, name: "Shri Rawatpura Sarkar University", courses: 65, branches: 213, students: 15588, details: generateDetails(15588) },
];

const StudentReport = () => {
  const [selectedUniId, setSelectedUniId] = useState('');

  // Find the selected university object
  const selectedUni = universityData.find(u => u.id === Number(selectedUniId));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- TOP NAVIGATION & ACTIONS (Hidden on Print) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin-dashboard" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">University Enrollment Report</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Select a university to view detailed branch distributions</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* --- EDUNUT UI DROPDOWN --- */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Building2 size={18} className="text-blue-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <select
                value={selectedUniId}
                onChange={(e) => setSelectedUniId(e.target.value)}
                className="w-full md:w-72 pl-11 pr-4 py-3 bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl appearance-none outline-none cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm focus:ring-2 focus:ring-blue-100"
                style={{ border: 'none' }} // Explicitly removing border per instructions
              >
                <option value="" disabled>Select University...</option>
                {universityData.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm text-sm font-semibold">
              <Download size={16} />
              Export
            </button>
            <button 
              onClick={handlePrint}
              disabled={!selectedUni}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-sm font-semibold shadow-sm ${selectedUni ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>

        {/* --- DYNAMIC REPORT AREA --- */}
        {selectedUni ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden print:border-none print:shadow-none">
            
            {/* Report Document Header */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white print:bg-white print:text-black print:p-0 print:mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-blue-500/50 print:border-slate-300 pb-8 print:pb-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-2">{selectedUni.name}</h2>
                  <p className="text-blue-100 print:text-slate-500 font-medium text-sm flex items-center gap-2">
                    Official Enrollment Distribution Report &bull; Academic Year 2025-26
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200 print:text-slate-500 font-semibold mb-1">Generated On</p>
                  <p className="font-bold">April 17, 2026</p>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 print:pt-4">
                <div className="bg-white/10 print:bg-slate-50 print:border print:border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 print:bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen size={24} className="text-white print:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100 print:text-slate-500 font-medium">Total Courses</p>
                    <p className="text-2xl font-bold">{selectedUni.courses}</p>
                  </div>
                </div>
                <div className="bg-white/10 print:bg-slate-50 print:border print:border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 print:bg-blue-100 rounded-xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-white print:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100 print:text-slate-500 font-medium">Total Branches</p>
                    <p className="text-2xl font-bold">{selectedUni.branches}</p>
                  </div>
                </div>
                <div className="bg-white/10 print:bg-slate-50 print:border print:border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 print:bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users size={24} className="text-white print:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100 print:text-slate-500 font-medium">Total Enrolled Students</p>
                    <p className="text-2xl font-bold">{selectedUni.students.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Data Table */}
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100">
                    <th className="py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-24 border-r border-slate-200">S.No</th>
                    <th className="py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">Course Name</th>
                    <th className="py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">Branch Name</th>
                    <th className="py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-48">Enrolled Students</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedUni.details.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="py-4 px-8 text-sm font-semibold text-slate-400 border-r border-slate-100">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </td>
                      <td className="py-4 px-8 text-sm font-bold text-blue-700 border-r border-slate-100">
                        {row.course}
                      </td>
                      <td className="py-4 px-8 text-sm font-medium text-slate-700 border-r border-slate-100">
                        {row.branch}
                      </td>
                      <td className="py-4 px-8 text-sm font-bold text-slate-800 text-right">
                        {row.students.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {/* Table Footer Totals */}
                  <tr className="bg-slate-50/80 border-t-2 border-slate-200">
                    <td colSpan="3" className="py-5 px-8 text-sm font-bold text-slate-800 text-right uppercase tracking-wider">
                      Aggregate Total
                    </td>
                    <td className="py-5 px-8 text-lg font-black text-blue-700 text-right">
                      {selectedUni.students.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 text-center text-xs text-slate-400 font-medium hidden print:block border-t border-slate-200">
              * This is a system-generated document and does not require a physical signature.
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-16 flex flex-col items-center justify-center text-center print:hidden">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Building2 size={40} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No University Selected</h2>
            <p className="text-slate-500 max-w-md mx-auto font-medium">
              Please select a university from the dropdown menu above to view its detailed course, branch, and student enrollment report.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentReport;