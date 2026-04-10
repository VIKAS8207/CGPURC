import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
// 1. Import Link from react-router-dom
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Added for handling the login redirect later
  
  const [email, setEmail] = useState("student@edunaut.edu");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAdmin) {
      setEmail("admin@edunaut.edu");
    } else {
      setEmail("student@edunaut.edu");
    }
  }, [isAdmin]);

    const handleLogin = (e) => {
    e.preventDefault();
    
    if (isAdmin) {
      // 1. Remove the alert() and use the navigate function
      navigate('/admin-dashboard');
    } else {
      // 2. Navigate to the user profile
      navigate('/user-profile');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* Left Side: Branding & Info */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <div className="z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-700 font-bold text-2xl">✻</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">CGPURC</span>
          </div>

          <h1 className="text-white text-6xl font-extrabold leading-tight mb-6">
            Welcome to <br />CGPURC! 👋
          </h1>
          
          <p className="text-blue-100 text-xl max-w-md leading-relaxed">
            Empowering your school community with seamless management. The modern ERP for administrators, teachers, and students.
          </p>
        </div>

        <div className="z-10 text-blue-200 text-sm">
          © 2026 Edunaut. All rights reserved.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login to Edunaut</h2>
            <p className="text-gray-500 font-medium">
                {isAdmin ? "Admin Access Only" : "Student/Teacher Portal"}
            </p>
          </div>

          <div className="bg-gray-100 p-1 rounded-xl flex mb-8">
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-300 ${
                isAdmin ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-gray-500'
              }`}
            >
              <ShieldCheck size={18} />
              Administrator
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-300 ${
                !isAdmin ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-gray-500'
              }`}
            >
              <User size={18} />
              User
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-600">Remember me</label>
                </div>
                {/* 2. Link connected to the /forgot-password route */}
                <Link to="/forgot-password" size={18} className="text-sm font-semibold text-blue-600 hover:underline">
                  Forgot password?
                </Link>
            </div>

            <button 
                type="submit"
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all transform active:scale-[0.98] shadow-lg"
            >
              Login as {isAdmin ? "Administrator" : "User"}
            </button>

          </form>

          <p className="mt-10 text-center text-gray-500">
            Problems logging in? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;