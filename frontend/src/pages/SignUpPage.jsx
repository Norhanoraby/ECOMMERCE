import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const loading = false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F5F2]">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1A1A1A] uppercase tracking-wide">
          Create your account
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white py-8 px-6 border border-[#E5E0DA] shadow-sm rounded-md sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
              >
                Full name
              </label>

              <div className="mt-2 relative shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9CA3AF]" aria-hidden="true" />
                </div>

                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full px-3 py-3 pl-10 bg-white border border-[#E5E0DA] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
              >
                Email address
              </label>

              <div className="mt-2 relative shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9CA3AF]" aria-hidden="true" />
                </div>

                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full px-3 py-3 pl-10 bg-white border border-[#E5E0DA] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
              >
                Password
              </label>

              <div className="mt-2 relative shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9CA3AF]" aria-hidden="true" />
                </div>

                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full px-3 py-3 pl-10 bg-white border border-[#E5E0DA] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
              >
                Confirm password
              </label>

              <div className="mt-2 relative shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9CA3AF]" aria-hidden="true" />
                </div>

                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-3 pl-10 bg-white border border-[#E5E0DA] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-black text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-[#333333] transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sign up
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6B6B6B]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black underline hover:text-[#333333]"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;