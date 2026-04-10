import React, { useState } from 'react';
import { Mail, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  // Logic states: 1 = Email Input, 2 = OTP/Code, 3 = New Password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-10 relative overflow-hidden">
        
        {/* Step Progress Indicator */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
            <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-in-out" 
                style={{ width: `${(step / 3) * 100}%` }}
            ></div>
        </div>

        {/* Back Navigation */}
        <button 
            onClick={() => step > 1 ? setStep(step - 1) : window.location.href = "/"}
            className="flex items-center text-sm font-semibold text-gray-400 hover:text-blue-600 transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          {step === 1 ? "Back to Login" : "Previous Step"}
        </button>

        {/* --- STEP 1: Identification --- */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Mail size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">No worries! Enter your school email and we'll send you a reset code.</p>
            
            <form onSubmit={handleNext} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">School Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@edunaut.edu"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                Send Reset Code
              </button>
            </form>
          </div>
        )}

        {/* --- STEP 2: Verification --- */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify it's you</h2>
            <p className="text-gray-500 mb-8">We've sent a 6-digit code to <span className="text-gray-900 font-semibold">{email || "your email"}</span>.</p>
            
            <form onSubmit={handleNext} className="space-y-6">
              <div className="flex gap-2 justify-center">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="000000"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-3xl tracking-[0.5em] font-bold"
                />
              </div>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
                Verify Code
              </button>
              <p className="text-center text-sm text-gray-400">
                Resend code in <span className="text-blue-600 font-bold">0:59</span>
              </p>
            </form>
          </div>
        )}

        {/* --- STEP 3: Reset --- */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
              <Lock size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Password</h2>
            <p className="text-gray-500 mb-8">Almost there! Choose a strong password for your Edunaut account.</p>
            
            <form onSubmit={() => alert("Password Updated!")} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg">
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;