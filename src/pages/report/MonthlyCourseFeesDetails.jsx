import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom'; // Using useParams to get month/year from URL

// --- MOCK DATA (Backend ready: structure matches the screenshot) ---
const mockCourseData = [
  { sno: 1, courseName: "Bachelors of Arts (BA)", subCourse: "Bachelors of Arts (BA)", noOfStudents: 4, amount: 13300 },
  { sno: 2, courseName: "Bachelor of Commerce (B.Com.)", subCourse: "Bachelor of Commerce (B.Com.)", noOfStudents: 30, amount: 110740 },
  { sno: 3, courseName: "Advance Diploma in Industrial Safety", subCourse: "Advance Diploma in Industrial Safety", noOfStudents: 2, amount: 12500 },
  { sno: 4, courseName: "B.A.LLB", subCourse: "B.A.LLB", noOfStudents: 97, amount: 965880 },
  { sno: 5, courseName: "B.Com. LLB", subCourse: "B.Com. LLB", noOfStudents: 39, amount: 260450 },
  { sno: 6, courseName: "Bachelor in Library & Information Science", subCourse: "Bachelor in Library & Information Science", noOfStudents: 6, amount: 33200 },
  { sno: 7, courseName: "Bachelor of Arts in Journalism & Mass Communication (B.A.JMC)", subCourse: "Bachelor of Arts in Journalism & Mass Communication (B.A.JMC)", noOfStudents: 1, amount: 16490 },
  { sno: 8, courseName: "Bachelor of Business Administration (BBA)", subCourse: "Bachelor of Business Administration (BBA)", noOfStudents: 31, amount: 272150 },
  { sno: 9, courseName: "Bachelor of Legislative Law (LLB)", subCourse: "Bachelor of Legislative Law (LLB)", noOfStudents: 84, amount: 864085 },
  { sno: 10, courseName: "Bachelor of Science (Forensic science)", subCourse: "Forensic Science", noOfStudents: 34, amount: 263415 },
  { sno: 11, courseName: "Bachelor of Technology (B.Tech)", subCourse: "Civil Engineering", noOfStudents: 15, amount: 304755 },
];

const MonthlyCourseFeesDetails = () => {
  // Extract month and year from the route parameters (e.g., /fees/2026/March)
  // Fallbacks provided for demonstration purposes
  const { year = "2026", month = "March" } = useParams(); 
  
  const [data, setData] = useState(mockCourseData);
  const [isLoading, setIsLoading] = useState(false);

  // --- BACKEND CONNECTION READY ---
  // The next team can replace mockCourseData with an API call here
  /*
  useEffect(() => {
    const fetchMonthData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/fees/monthly-details?year=${year}&month=${month}`);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMonthData();
  }, [month, year]);
  */

  // --- CALCULATIONS ---
  const totalStudents = data.reduce((sum, item) => sum + item.noOfStudents, 0);
  const totalFees = data.reduce((sum, item) => sum + item.amount, 0);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6"> {/* Wider container to fit the course names */}
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Link 
              to="/reports/student-fees-details" // Link back to the main list
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Bharti Vishwavidyalaya</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Students Fees Details</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dynamic Month/Year Display instead of dropdown filter */}
            <div className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl shadow-sm text-sm font-bold whitespace-nowrap">
              Month - <span className="text-orange-600">{month} {year}</span>
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-orange-600 transition-colors shadow-sm text-sm font-semibold whitespace-nowrap">
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

        {/* Table Container - Exact Edunut UI Structure */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#fb923c] text-white">
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50 w-20">SNo</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50">Course Name</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50">Course/Sub-Course/Branch</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide border-r border-orange-300/50 text-center w-32">No Of Students</th>
                  <th className="py-4 px-6 text-sm font-bold tracking-wide text-right w-40">Fees Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-sm text-slate-500">Loading data...</td>
                  </tr>
                ) : currentItems.map((row) => (
                  <tr key={row.sno} className="hover:bg-orange-50/50 transition-colors group">
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">{row.sno}</td>
                    <td className="py-4 px-6 text-sm text-slate-700 font-medium">{row.courseName}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{row.subCourse}</td>
                    <td className="py-4 px-6 text-sm font-bold text-orange-600 text-center">{row.noOfStudents}</td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-700 text-right">{row.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
                {currentItems.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-sm text-slate-500">
                      No records found for {month} {year}.
                    </td>
                  </tr>
                )}
              </tbody>
              
              {/* Sticky Footer for Totals */}
              <tfoot className="bg-orange-50/80 border-t-2 border-orange-200">
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-sm font-bold text-slate-800 text-right tracking-wider">
                    Total :-
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-orange-600 text-center">
                    {totalStudents}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800 text-right">
                    {totalFees.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination Footer - Exact Edunut UI Copy */}
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
              Showing <span className="font-semibold text-slate-700">{data.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(indexOfLastItem, data.length)}</span> of <span className="font-semibold text-slate-700">{data.length}</span> entries
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium hidden sm:inline-block whitespace-nowrap">Go to:</span>
                
                {/* Edunut UI Design Dropdown (Orange Theme) */}
                <div className="relative flex items-center group">
                  <select 
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    disabled={data.length === 0}
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

              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || data.length === 0}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === 1 || data.length === 0 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center whitespace-nowrap">
                  <span className="font-bold text-slate-800">{data.length === 0 ? 0 : currentPage}</span> / {totalPages}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || data.length === 0}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    currentPage === totalPages || data.length === 0 ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-orange-500 shadow-sm'
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

export default MonthlyCourseFeesDetails;