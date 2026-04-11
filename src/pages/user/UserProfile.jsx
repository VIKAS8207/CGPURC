import React from 'react';
import { User, Mail, GraduationCap, MapPin, Edit2 } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="min-h-screen p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
        
        {/* Top Gradient Banner */}
        <div className="h-32 bg-gradient-to-r from-orange-500 to-amber-500"></div>
        
        <div className="px-8 pb-8">
          {/* Profile Picture & Edit Button */}
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white p-1 rounded-2xl shadow-md">
              <div className="w-full h-full bg-orange-50 rounded-xl flex items-center justify-center text-orange-400">
                <User size={48} />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-black transition-all shadow-md">
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>

          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">Student User</h2>
              <p className="text-orange-600 mb-6 font-semibold bg-orange-50 inline-block px-3 py-1 rounded-lg text-sm">
                Student ID: #ST-89021
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Mail size={18} className="text-orange-500" /> student@edunaut.edu
                </div>
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <GraduationCap size={18} className="text-orange-500" /> B.Tech Computer Science
                </div>
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <MapPin size={18} className="text-orange-500" /> Semester 4, Section A
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
