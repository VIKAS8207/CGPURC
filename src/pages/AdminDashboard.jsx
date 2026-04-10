import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Payroll Overview</h1>
          <p className="text-slate-500">Monitor your school's financial and staff metrics.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-md">
          Customize Widget
        </button>
      </div>

      {/* Stats Grid mimicking the image provided */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-2">Total Employees</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-800">14</h3>
            <span className="text-slate-400 text-sm">/ 17</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-2">Total Monthly Payroll</p>
          <h3 className="text-3xl font-bold text-slate-800">$202,480</h3>
          <div className="mt-2 text-red-500 text-sm font-medium flex items-center gap-1 bg-red-50 inline-flex px-2 py-0.5 rounded">
            -8% vs last month
          </div>
        </div>
        {/* Add more cards here */}
      </div>
      
      {/* Placeholder for Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[300px]">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Employee Pay Details</h3>
        <p className="text-slate-500 text-sm">Table content will go here...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;