import React, { useState } from 'react';
import { Briefcase, Plus, ChevronUp, ChevronDown, Upload, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const AdminOfficeBearer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // State for the form inputs
  const initialFormState = { name: '', designation: '', phone: '', email: '', department: '' };
  const [formData, setFormData] = useState(initialFormState);

  // Dummy data for the table
  const [bearers, setBearers] = useState([
    { id: 1, name: 'Dr. Ramesh Kumar', designation: 'Vice Chancellor', phone: '+91 9876543210', email: 'vc@university.edu', department: 'Administration' },
    { id: 2, name: 'Anita Sharma', designation: 'Registrar', phone: '+91 9876543211', email: 'registrar@university.edu', department: 'Management' },
  ]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new bearer to the list (in a real app, you'd send this to your backend via API)
    const newBearer = { ...formData, id: Date.now() };
    setBearers([newBearer, ...bearers]);
    
    // Reset the form so it "becomes a new form" ready for the next entry
    setFormData(initialFormState);
    
    // Optional: Show a success toast notification here
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="text-indigo-600" size={28} />
            Office Bearers
          </h1>
          <p className="text-slate-500 mt-1">Manage the official representatives and their contact details.</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm font-medium"
        >
          {isFormOpen ? <ChevronUp size={20} /> : <Plus size={20} />}
          {isFormOpen ? 'Close Form' : 'Add Office Bearer'}
        </button>
      </div>

      {/* Dropdown Form Section */}
      {isFormOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-3">New Office Bearer Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. John Doe" />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. Registrar" />
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select name="department" value={formData.department} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white">
                  <option value="" disabled>Select Department</option>
                  <option value="Administration">Administration</option>
                  <option value="Management">Management</option>
                  <option value="Finance">Finance</option>
                  <option value="Academics">Academics</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="+91 XXXXX XXXXX" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="official@email.com" />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Photo</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-100 transition-colors text-slate-600 text-sm">
                    <Upload size={16} />
                    <span>Choose File</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Submit & Add Another
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List / Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Directory List</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search bearers..." className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                <th className="p-4 font-medium">Name & Role</th>
                <th className="p-4 font-medium">Department</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bearers.map((bearer) => (
                <tr key={bearer.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{bearer.name}</div>
                    <div className="text-sm text-slate-500">{bearer.designation}</div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{bearer.department}</td>
                  <td className="p-4 text-sm">
                    <div className="text-slate-800">{bearer.email}</div>
                    <div className="text-slate-500">{bearer.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 bg-white">
          <div>Showing 1 to {bearers.length} of {bearers.length} entries</div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">1</button>
            <button className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200">2</button>
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOfficeBearer;