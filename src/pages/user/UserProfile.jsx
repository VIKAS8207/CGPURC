import React from 'react';
import { 
  Globe, Mail, MapPin, Phone, Award, Calendar, 
  FileText, Edit2, Building2, ExternalLink, ShieldCheck, Hash, Bookmark
} from 'lucide-react';

const UniversityProfile = () => {
  // Data Mapping
  const universityData = {
    University_Name: "Chhattisgarh Professional University",
    University_ID: "UNIV-2026-CH01",
    Registration_Number: "REG/9920/2026",
    Establishment_Year: "2021",
    Email_ID: "registrar@unipro.edu.in",
    Contact_Number: "+91 771 405 2200",
    Website_URL: "www.unipro.edu.in",
    Address: "New Raipur, Knowledge Hub, Sector 24",
    Pin_Code: "492001",
    University_Details: "Premier State University specialized in Technical Education.",
    // University_Logo would be used in the img src below
  };

  return (
    <div className="animate-in fade-in duration-700 pb-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* PROFILE HEADER SECTION */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="h-40 bg-slate-900 relative">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          <div className="px-10 pb-10">
            <div className="relative flex flex-col md:flex-row md:items-end justify-between -mt-12 mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="w-32 h-32 bg-white p-2 rounded-[24px] shadow-xl border border-slate-100 flex items-center justify-center">
                  <div className="w-full h-full bg-orange-50 rounded-[18px] flex items-center justify-center text-[#FF6900]">
                    <Building2 size={48} />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {universityData.University_Name}
                  </h1>
                  <p className="text-[#FF6900] font-bold text-xs uppercase tracking-widest mt-1">
                    {universityData.University_Details}
                  </p>
                </div>
              </div>
            </div>

            {/* INSTITUTION MASTER DATA GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-10">
              
              {/* Left Column: Identifiers */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Identification</h3>
                
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500"><Hash size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">University ID</p>
                    <p className="text-sm font-black text-slate-800">{universityData.University_ID}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500"><Bookmark size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Registration Number</p>
                    <p className="text-sm font-black text-slate-800">{universityData.Registration_Number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500"><Calendar size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Establishment Year</p>
                    <p className="text-sm font-black text-slate-800">{universityData.Establishment_Year}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact & Web */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Communication</h3>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl text-[#FF6900]"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                    <p className="text-sm font-black text-slate-800">{universityData.Email_ID}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl text-[#FF6900]"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Number</p>
                    <p className="text-sm font-black text-slate-800">{universityData.Contact_Number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl text-[#FF6900]"><Globe size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Website URL</p>
                    <a href={`https://${universityData.Website_URL}`} target="_blank" className="text-sm font-black text-blue-600 flex items-center gap-1">
                      {universityData.Website_URL} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Full Width Row: Address */}
              <div className="md:col-span-2 mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-500"><MapPin size={18} /></div>
                <div className="grid grid-cols-2 w-full">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Registered Address</p>
                    <p className="text-sm font-black text-slate-800">{universityData.Address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Pin Code</p>
                    <p className="text-sm font-black text-slate-800">{universityData.Pin_Code}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-center gap-2 text-slate-400">
           <ShieldCheck size={14} />
           <p className="text-[10px] font-bold uppercase tracking-widest">Verified University Profile — Edunaut Secure Registry</p>
        </div>

      </div>
    </div>
  );
};

export default UniversityProfile;