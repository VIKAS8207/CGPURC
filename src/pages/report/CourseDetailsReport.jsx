import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data based on your columns
const courseDetailsData = [
  { sno: 1, courseId: "BTECH-01", courseName: "Bachelor of Technology", courseCode: "B.Tech", duration: "4 Years", branchName: "Computer Science Engineering", branchCode: "CSE", students: 240 },
  { sno: 2, courseId: "MBA-02", courseName: "Master of Business Admin", courseCode: "MBA", duration: "2 Years", branchName: "Marketing & Finance", branchCode: "MKT-FIN", students: 120 },
  { sno: 3, courseId: "BSC-03", courseName: "Bachelor of Science", courseCode: "B.Sc", duration: "3 Years", branchName: "Information Technology", branchCode: "IT", students: 180 },
  { sno: 4, courseId: "BCA-04", courseName: "Bachelor of Computer Apps", courseCode: "BCA", duration: "3 Years", branchName: "General", branchCode: "GEN", students: 300 },
  { sno: 5, courseId: "MTECH-05", courseName: "Master of Technology", courseCode: "M.Tech", duration: "2 Years", branchName: "Data Science", branchCode: "DS", students: 60 },
  { sno: 6, courseId: "BBA-06", courseName: "Bachelor of Business Admin", courseCode: "BBA", duration: "3 Years", branchName: "Human Resources", branchCode: "HR", students: 150 },
];

const CourseDetailsReport = () => {
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // --- CALCS ---
  const totalPages = Math.ceil(courseDetailsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courseDetailsData.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Link 
              to="/user/uploads" 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Courses Details</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Overview of course structures and student counts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm text-sm font-semibold whitespace-nowrap">
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/20 transition-all text-sm font-semibold whitespace-nowrap"
            >
              <Printer size={16} />
              Print Report
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-[#fb923c] text-white"> {/* Mild Orange Background */}
                  <th className="py-4 px-4 text-sm font-bold tracking-wide border-r border-orange-300/50 w-16">S.No.</th>
                  <th className="py-4 px-4 text-sm font-bold tracking-wide border-r border-orange-300/50 w-32">Course ID</th>
                  <th className="py-4 px-4 text-sm font-bold tracking-wide border-r border-orange-300/50">
                    Course Name ({'Course Code'})<br/>
                    <span className="font-semibold text-orange-50">Course Duration</span>
                  </th>
                  <th className="py-4 px-4 text-sm font-bold tracking-wide border-r border-orange-300/50">
                    Branch/specialization Name<br/>
                    <span className="font-semibold text-orange-50">({'Branch Code'})</span>
                  </th>
                  <th className="py-4 px-4 text-sm font-bold tracking-wide w-40">No of students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.length > 0 ? (
                  currentItems.map((row) => (
                    <tr key={row.sno} className="hover:bg-orange-50/50 transition-colors group">
                      <td className="py-4 px-4 text-sm font-medium text-slate-600 align-top">{row.sno}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-700 align-top">{row.courseId}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 align-top">
                        <span className="font-semibold text-slate-800">{row.courseName}</span> ({row.courseCode})<br/>
                        <span className="text-slate-500 mt-1 inline-block">{row.duration}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600 align-top">
                        <span className="font-semibold text-slate-800">{row.branchName}</span><br/>
                        <span className="text-slate-500 mt-1 inline-block">({row.branchCode})</span>
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-slate-700 align-top">{row.students}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">No course details available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
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

            <div className="text-sm text-slate-500 font-medium text-center">
              Showing <span className="font-semibold text-slate-700">{courseDetailsData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, courseDetailsData.length)}</span> of <span className="font-semibold text-slate-700">{courseDetailsData.length}</span> entries
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
                  className="w-16 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-1.5 text-center outline-none shadow-sm transition-all font-medium placeholder:text-slate-400 hover:border-slate-300"
                  placeholder="Pg"
                />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === 1 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
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
                    currentPage === totalPages ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
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

export default CourseDetailsReport;