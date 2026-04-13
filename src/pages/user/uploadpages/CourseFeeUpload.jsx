import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Wallet, Download, FileSpreadsheet, UserPlus, 
  UploadCloud, BookOpen, Search, Eye, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ChevronDown, AlertTriangle,
  CheckCircle2, X, Plus, PieChart, Layers, Check, Calculator
} from 'lucide-react';

const CourseFeeUpload = () => {
  const navigate = useNavigate();
  
  // --- UI STATES ---
  const [uploadMode, setUploadMode] = useState('bulk');
  const [isProcessed, setIsProcessed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBranchSelectorOpen, setIsBranchSelectorOpen] = useState(false);

  // --- FORM STATES ---
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [feeRows, setFeeRows] = useState([{ head: '', amount: '' }]);
  
  // Mock Data for Dropdowns
  const branchList = ["Computer Science", "Mechanical", "Civil", "Electrical", "Information Technology", "Electronics"];
  const courseList = ["B.Tech", "M.Tech", "MBA", "BCA", "B.Sc"];

  // Mock History Data for the Table
  const [history, setHistory] = useState([
    { id: 1, course: 'B.Tech', branches: 'CS, IT, ME', totalFee: '₹ 85,000', year: '2024-25' },
    { id: 2, course: 'MBA', branches: 'Finance, Marketing', totalFee: '₹ 1,20,000', year: '2024-25' },
    { id: 3, course: 'B.Sc', branches: 'Physics, Math', totalFee: '₹ 45,000', year: '2025-26' },
  ]);

  // --- HANDLERS ---
  const toggleBranch = (branch) => {
    setSelectedBranches(prev => 
      prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch]
    );
  };

  const addFeeRow = () => setFeeRows([...feeRows, { head: '', amount: '' }]);
  
  const handleFeeChange = (index, field, value) => {
    const updated = [...feeRows];
    updated[index][field] = value;
    setFeeRows(updated);
  };

  const calculateTotal = () => {
    const total = feeRows.reduce((acc, row) => acc + (Number(row.amount) || 0), 0);
    return total.toLocaleString('en-IN');
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setIsProcessed(true); // Switches Right Side from Placeholder to Results
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">
      
      {/* 1. Universal Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF6900] transition-colors mb-3"
      >
        <ArrowLeft size={16} /> 
        Back
      </button>

      {/* 2. Standard Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/user-dashboard" className="hover:text-[#FF6900]">User Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/user/uploads" className="hover:text-[#FF6900]">Document Uploads</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-semibold">Course & Fee Structure</span>
      </div>

      {/* 3. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 rounded-lg">
              <Wallet className="text-[#FF6900]" size={24} />
            </div>
            Course Fee Structure
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Define institutional programs and their annual fee components.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-[#FF6900] hover:bg-orange-50 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold text-sm">
          <Download size={18} /> 
          Format Template.xlsx
        </button>
      </div>

      {/* 4. Main Interaction Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 pt-2">
          <button 
            onClick={() => {setUploadMode('bulk'); setIsProcessed(false);}} 
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              uploadMode === 'bulk' 
              ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-lg' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <FileSpreadsheet size={16} /> Bulk Upload
          </button>
          <button 
            onClick={() => setUploadMode('manual')} 
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              uploadMode === 'manual' 
              ? 'border-[#FF6900] text-[#FF6900] bg-white rounded-t-lg' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <UserPlus size={16} /> Manual Entry
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Universal Selectors (Session, Course, Branch) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b border-slate-100 pb-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Academic Session</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#FF6900]/20 outline-none">
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Target Course</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-2 focus:ring-[#FF6900]/20 outline-none">
                <option value="">Choose Degree Program...</option>
                {courseList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sub-Branches</label>
              <button 
                onClick={() => setIsBranchSelectorOpen(!isBranchSelectorOpen)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between font-bold text-slate-700 shadow-sm"
              >
                <span className="truncate">{selectedBranches.length > 0 ? `${selectedBranches.length} Selected` : "Select Branches..."}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isBranchSelectorOpen ? 'rotate-180' : ''}`} />
              </button>
              {isBranchSelectorOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto p-2 space-y-1 animate-in zoom-in-95 duration-200">
                  {branchList.map(branch => (
                    <div 
                      key={branch} 
                      onClick={() => toggleBranch(branch)} 
                      className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${selectedBranches.includes(branch) ? 'bg-orange-50' : 'hover:bg-slate-50'}`}
                    >
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${selectedBranches.includes(branch) ? 'bg-[#FF6900] border-[#FF6900]' : 'border-slate-300 bg-white'}`}>
                        {selectedBranches.includes(branch) && <Check size={14} className="text-white" />}
                      </div>
                      <span className={`text-sm font-bold ${selectedBranches.includes(branch) ? 'text-[#FF6900]' : 'text-slate-600'}`}>{branch}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MODE: BULK UPLOAD */}
          {uploadMode === 'bulk' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center bg-slate-50 hover:border-[#FF6900]/40 transition-all cursor-pointer group shadow-inner">
                  <div className="p-5 bg-white border border-slate-100 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <UploadCloud className="text-[#FF6900]" size={40} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Drop your fee structure spreadsheet here</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Supports .xlsx and .csv formats (Max 10MB)</p>
                  <input type="file" className="hidden" />
                  <button className="mt-6 text-xs font-bold text-[#FF6900] bg-white border border-orange-100 px-6 py-2.5 rounded-xl hover:bg-[#FF6900] hover:text-white transition-all shadow-sm uppercase tracking-wider">Browse Files</button>
                </div>
                <button 
                  onClick={handleBulkSubmit} 
                  className="w-full md:w-auto bg-[#FF6900] text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                >
                  <CheckCircle2 size={18} />
                  Process & Validate Structure
                </button>
              </div>

              {/* Conditional Processing Panel */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 h-full flex flex-col">
                  {!isProcessed ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                      <PieChart size={48} className="text-slate-300 mb-4" />
                      <h4 className="font-bold text-slate-400 text-sm uppercase tracking-widest">Awaiting Analysis</h4>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed px-4">Upload a structure to verify fee heads and branch mappings.</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                        <PieChart className="text-[#FF6900]" size={18} />
                        <h3 className="font-bold text-slate-800 uppercase text-[10px] tracking-widest">Validation Results</h3>
                      </div>
                      <div className="space-y-4 mb-8">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matched Heads</span>
                          <span className="font-bold text-emerald-600 text-lg">12 / 12</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Validation Errors</span>
                          <span className="font-bold text-emerald-600 text-lg">None</span>
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
                        <CheckCircle2 className="text-emerald-500 mt-0.5" size={16} />
                        <p className="text-[10px] font-bold text-emerald-800 leading-relaxed uppercase tracking-wider">Data structure verified. Ready for database synchronization.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MODE: MANUAL ENTRY */}
          {uploadMode === 'manual' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                  <Layers size={18} className="text-[#FF6900]"/> Detailed Fee Breakdown
                </h3>
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                  <Calculator size={14} className="text-[#FF6900]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total: </span>
                  <span className="text-sm font-bold text-[#FF6900]">₹ {calculateTotal()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {feeRows.map((row, idx) => (
                  <div key={idx} className="flex gap-4 animate-in fade-in slide-in-from-top-2">
                    <input 
                      type="text" placeholder="e.g. Tuition Fee / Exam Fee" 
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#FF6900]/20"
                      value={row.head} onChange={(e) => handleFeeChange(idx, 'head', e.target.value)}
                    />
                    <div className="relative w-56">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input 
                        type="number" placeholder="0.00" 
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white font-black text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6900]/20"
                        value={row.amount} onChange={(e) => handleFeeChange(idx, 'amount', e.target.value)}
                      />
                    </div>
                    {feeRows.length > 1 && (
                      <button onClick={() => setFeeRows(feeRows.filter((_, i) => i !== idx))} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <X size={20}/>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={addFeeRow} 
                className="mt-6 flex items-center gap-2 text-xs font-bold text-[#FF6900] bg-orange-50 px-5 py-2.5 rounded-xl border border-orange-100 hover:bg-orange-100 transition-all shadow-sm"
              >
                <Plus size={16}/> Add Fee Head
              </button>

              <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end">
                 <button className="bg-[#FF6900] text-white px-12 py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-100 active:scale-95 transition-all text-xs uppercase tracking-widest">
                   Finalize Fee Structure
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Existing Records Table (Summary View) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Active Fee Mappings</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by course..." className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#FF6900]/20 outline-none font-medium" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-widest">
                <th className="py-4 px-6">Session</th>
                <th className="py-4 px-6">Degree Program</th>
                <th className="py-4 px-6">Mapped Branches</th>
                <th className="py-4 px-6">Total Annual Fee</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-500">{item.year}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} className="text-slate-400" />
                      <span className="font-bold text-slate-800">{item.course}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                     <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase">{item.branches}</span>
                  </td>
                  <td className="py-4 px-6 font-black text-[#FF6900] text-sm">{item.totalFee}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-[#FF6900] hover:bg-orange-50 rounded-lg transition-colors"><Eye size={18}/></button>
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18}/></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Standard Pagination */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between text-[10px] bg-slate-50">
          <div className="text-slate-500 font-bold uppercase tracking-widest">Showing {history.length} Course Structures</div>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 bg-white" disabled><ChevronLeft size={16}/></button>
            <button className="w-8 h-8 rounded-lg bg-[#FF6900] text-white font-bold shadow-sm">1</button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CourseFeeUpload;