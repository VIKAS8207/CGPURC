import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data covering all 17 fields
const studentData = [
  { sno: 1, enrollNum: "EN250001", studentId: "STU-101", name: "Rahul Sharma", fname: "Rajesh Sharma", gender: "Male", dob: "15-05-2004", aadhar: "1234 5678 9012", admissionDate: "01-07-2025", mobile: "9876543210", fmobile: "9988776655", email: "rahul@example.com", address: "123 Civil Lines, Raipur", course: "B.Tech", branch: "Computer Science", sem: "1st Sem", submittedBy: "Admin" },
  { sno: 2, enrollNum: "EN250002", studentId: "STU-102", name: "Priya Verma", fname: "Suresh Verma", gender: "Female", dob: "22-08-2003", aadhar: "9876 5432 1098", admissionDate: "02-07-2025", mobile: "8765432109", fmobile: "8877665544", email: "priya@example.com", address: "45 MG Road, Bhilai", course: "MBA", branch: "Marketing", sem: "3rd Sem", submittedBy: "Admin" },
  { sno: 3, enrollNum: "EN250003", studentId: "STU-103", name: "Amit Kumar", fname: "Ashok Kumar", gender: "Male", dob: "10-11-2002", aadhar: "4567 8901 2345", admissionDate: "05-07-2025", mobile: "7654321098", fmobile: "7766554433", email: "amit@example.com", address: "78 Sector 6, Durg", course: "B.Sc", branch: "Information Tech", sem: "5th Sem", submittedBy: "System" },
];

const StudentListReport = () => {
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(studentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentData.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleJumpPage = (e) => {
    if (e.key === 'Enter') {
      let page = parseInt(jumpPage);
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
      else if (page > totalPages) setCurrentPage(totalPages);
      else if (page < 1) setCurrentPage(1);
      setJumpPage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Link 
              to="/user/uploads" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Students List</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Comprehensive database of all enrolled students</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-700 hover:shadow-md hover:shadow-blue-600/20 transition-all text-sm font-semibold whitespace-nowrap"
            >
              <Printer size={16} />
              Print Report
            </button>
          </div> 
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                {/* --- CUSTOM REPORT HEADERS (Matching Screenshot) --- */}
                
                {/* Title Row */}
                <tr className="bg-white">
                  <td colSpan="16" className="p-3 text-center border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">Test University</h2>
                  </td>
                </tr>

                {/* Meta Info Row */}
                <tr className="bg-white">
                  <td colSpan="4" className="p-3 text-sm font-bold text-slate-800 border-b border-slate-200 border-r border-slate-200 whitespace-nowrap">
                    Date :- 16-04-2026 Time:- 10:36 AM
                  </td>
                  <td colSpan="13" className="p-3 text-sm font-bold text-slate-800 border-b border-slate-200">
                    Academic Session - 2025-26 <span className="ml-6">Students List</span>
                  </td>
                </tr>

                {/* --- COLUMN HEADERS --- */}
                {/* Specific Blue from image */}
                <tr className="bg-[#fb923c] text-white"> 
                    <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c] w-12 text-center">S.No.</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Enrollment<br/>Number</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Student<br/>ID</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Student<br/>Name</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Father<br/>Name</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Gender</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Date of<br/>Birth</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Aadhar<br/>Number</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Date of<br/>Admission</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Student Mobile<br/>Number</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Father's Mobile<br/>Number</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">E-Mail<br/>ID</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Permanent<br/>Address</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Course<br/>Name</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Course Branch<br/>Name</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Persuing<br/>Year/Semester</th>
                  <th className="py-3 px-3 text-xs font-bold border-r bg-[#fb923c]">Submitted<br/>By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentItems.length > 0 ? (
                  currentItems.map((row) => (
                    <tr key={row.sno} className="hover:bg-blue-50/50 transition-colors group bg-white">
                      <td className="py-3 px-3 text-sm font-medium text-slate-600 text-center border-r border-slate-200">{row.sno}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.enrollNum}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.studentId}</td>
                      <td className="py-3 px-3 text-sm font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.name}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.fname}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200">{row.gender}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.dob}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.aadhar}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.admissionDate}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200">{row.mobile}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200">{row.fmobile}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200">{row.email}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 min-w-[200px]">{row.address}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.course}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.branch}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200">{row.sem}</td>
                      <td className="py-3 px-3 text-sm text-slate-700 border-r border-slate-200">{row.submittedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="py-8 text-center text-slate-500 font-medium bg-white">No student data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Rows per page:</span>
              <select 
                value={itemsPerPage} 
                onChange={handleRowsChange}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none shadow-sm transition-all font-medium cursor-pointer hover:border-slate-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="text-sm text-slate-500 font-medium text-center">
              Showing <span className="font-semibold text-slate-700">{studentData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, studentData.length)}</span> of <span className="font-semibold text-slate-700">{studentData.length}</span> entries
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
                <input 
                  type="number" 
                  min="1" 
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  onKeyDown={handleJumpPage}
                  className="w-16 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 text-center outline-none shadow-sm transition-all font-medium placeholder:text-slate-400 hover:border-slate-300"
                  placeholder="Pg"
                />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === 1 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center whitespace-nowrap">
                  <span className="font-bold text-slate-800">{currentPage}</span> / {totalPages}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === totalPages ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-sm'
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