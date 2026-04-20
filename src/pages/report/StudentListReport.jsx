import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Filter, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data covering all 17 fields
const studentData = [
  { sno: 1, enrollNum: "EN250001", studentId: "STU-101", name: "Rahul Sharma", fname: "Rajesh Sharma", gender: "Male", dob: "15-05-2004", aadhar: "[Aadhaar Redacted]", admissionDate: "01-07-2025", mobile: "9876543210", fmobile: "9988776655", email: "rahul@example.com", address: "123 Civil Lines, Raipur", course: "B.Tech", branch: "Computer Science", sem: "1st Sem", submittedBy: "Admin" },
  { sno: 2, enrollNum: "EN250002", studentId: "STU-102", name: "Priya Verma", fname: "Suresh Verma", gender: "Female", dob: "22-08-2003", aadhar: "[Aadhaar Redacted]", admissionDate: "02-07-2025", mobile: "8765432109", fmobile: "8877665544", email: "priya@example.com", address: "45 MG Road, Bhilai", course: "MBA", branch: "Marketing", sem: "3rd Sem", submittedBy: "Admin" },
  { sno: 3, enrollNum: "EN250003", studentId: "STU-103", name: "Amit Kumar", fname: "Ashok Kumar", gender: "Male", dob: "10-11-2002", aadhar: "[Aadhaar Redacted]", admissionDate: "05-07-2024", mobile: "7654321098", fmobile: "7766554433", email: "amit@example.com", address: "78 Sector 6, Durg", course: "B.Sc", branch: "Information Tech", sem: "5th Sem", submittedBy: "System" },
];

const StudentListReport = () => {
  // --- STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // --- FILTER STATES ---
  const [filterCategory, setFilterCategory] = useState('Course'); // 'Course' or 'Year'
  const [filterValue, setFilterValue] = useState('All');

  // --- DYNAMIC FILTER OPTIONS ---
  let dynamicOptions = ['All'];
  if (filterCategory === 'Course') {
    dynamicOptions = ['All', ...new Set(studentData.map(student => student.course))];
  } else if (filterCategory === 'Year') {
    // Extracting year from admissionDate (Assuming DD-MM-YYYY format)
    dynamicOptions = ['All', ...new Set(studentData.map(student => student.admissionDate.split('-')[2]))];
  }

  // --- FILTERING LOGIC ---
  const filteredData = studentData.filter(student => {
    if (filterValue === 'All') return true;
    
    if (filterCategory === 'Course') {
      return student.course === filterValue;
    } else if (filterCategory === 'Year') {
      return student.admissionDate.split('-')[2] === filterValue;
    }
    return true;
  });

  // --- PAGINATION CALCS ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // --- HANDLERS ---
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setFilterValue('All'); // Reset second filter when category changes
    setCurrentPage(1);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Section (Removed Border) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden bg-white p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <Link 
              to="/user/uploads" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Students List</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Comprehensive database of all enrolled students</p> 
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Dynamic Filters Wrapper */}
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              
              {/* Filter 1: Category Selection */}
              <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">
                <Filter size={14} className="text-slate-400" />
                <select 
                  value={filterCategory}
                  onChange={handleCategoryChange}
                  className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Course">Course</option>
                  <option value="Year">Year</option>
                </select>
              </div>

              {/* Filter 2: Dynamic Options Selection */}
              <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">
                <ListFilter size={14} className="text-orange-400" />
                <select 
                  value={filterValue}
                  onChange={handleValueChange}
                  className="bg-transparent text-sm font-semibold text-orange-700 outline-none cursor-pointer min-w-[100px]"
                >
                  {dynamicOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {opt === 'All' ? `All ${filterCategory}s` : opt}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Print Button */}
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 shadow-md hover:shadow-orange-600/20 transition-all text-sm font-semibold whitespace-nowrap"
            >
              <Printer size={16} />
              Print Report
            </button>
          </div> 
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                {/* Meta Info Row */}
                <tr className="bg-slate-50/50">
                  <td colSpan="5" className="p-4 px-5 text-sm font-semibold text-slate-600 border-b border-slate-200 border-r border-slate-200 whitespace-nowrap">
                    Date: <span className="text-slate-800">16-04-2026</span> &nbsp;|&nbsp; Time: <span className="text-slate-800">10:36 AM</span>
                  </td>
                  <td colSpan="12" className="p-4 px-5 text-sm font-semibold text-slate-600 border-b border-slate-200">
                    Academic Session: <span className="text-slate-800">2025-26</span> <span className="ml-8 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs tracking-wider uppercase">Students List</span>
                  </td>
                </tr>

                {/* --- COLUMN HEADERS (Mild Orange with Dark Orange Text) --- */}
                <tr className="bg-orange-100 text-orange-900 print:bg-slate-200 print:text-black"> 
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80 w-12 text-center">S.No.</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Enrollment<br/>Number</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Student<br/>ID</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Student<br/>Name</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Father<br/>Name</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Gender</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Date of<br/>Birth</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Aadhar<br/>Number</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Date of<br/>Admission</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Student Mobile<br/>Number</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Father's Mobile<br/>Number</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">E-Mail<br/>ID</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Permanent<br/>Address</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Course<br/>Name</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Course Branch<br/>Name</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide border-r border-orange-200/80">Persuing<br/>Year/Semester</th>
                  <th className="py-4 px-3 text-xs font-bold tracking-wide">Submitted<br/>By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={row.sno} className="hover:bg-orange-50/40 transition-colors group bg-white">
                      <td className="py-3 px-3 text-sm font-medium text-slate-500 text-center border-r border-slate-100">{indexOfFirstItem + index + 1}</td>
                      <td className="py-3 px-3 text-sm font-medium text-slate-700 border-r border-slate-100 whitespace-nowrap">{row.enrollNum}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.studentId}</td>
                      <td className="py-3 px-3 text-sm font-bold text-slate-800 border-r border-slate-100 whitespace-nowrap">{row.name}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.fname}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${row.gender === 'Male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                          {row.gender}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.dob}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.aadhar}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.admissionDate}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100">{row.mobile}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100">{row.fmobile}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100">{row.email}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 min-w-[200px]">{row.address}</td>
                      <td className="py-3 px-3 text-sm font-semibold text-orange-700 border-r border-slate-100 whitespace-nowrap">{row.course}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.branch}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 border-r border-slate-100">{row.sem}</td>
                      <td className="py-3 px-3 text-sm text-slate-600">{row.submittedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="py-12 text-center text-slate-500 font-medium bg-white">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Filter size={32} className="text-slate-300" />
                        <p>No student data found for the selected filter.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden border-t border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Rows per page:</span>
              <select 
                value={itemsPerPage} 
                onChange={handleRowsChange}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-1.5 outline-none shadow-sm transition-all font-medium cursor-pointer hover:border-slate-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="text-sm text-slate-500 font-medium text-center bg-white px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              Showing <span className="font-bold text-orange-600">{filteredData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-bold text-orange-600">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="font-bold text-orange-600">{filteredData.length}</span> entries
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
                
                {/* Edunut UI Design Dropdown (Orange Theme) */}
                <div className="relative flex items-center group">
                  <select 
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    disabled={filteredData.length === 0}
                    className="w-[4.5rem] bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block py-1.5 pl-3 pr-7 outline-none shadow-sm transition-all font-semibold cursor-pointer hover:border-orange-300 hover:bg-orange-50/50 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {totalPages > 0 ? (
                      Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <option key={page} value={page}>
                          {page}
                        </option>
                      ))
                    ) : (
                      <option value={1}>1</option>
                    )}
                  </select>
                  <div className="absolute right-2.5 pointer-events-none text-slate-400 group-hover:text-orange-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

              </div>

              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || filteredData.length === 0}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
                    currentPage === 1 || filteredData.length === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center whitespace-nowrap">
                  <span className="font-bold text-slate-800">{totalPages === 0 ? 0 : currentPage}</span> / {totalPages}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || filteredData.length === 0}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
                    currentPage === totalPages || filteredData.length === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentListReport;