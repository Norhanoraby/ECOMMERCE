import React from 'react'
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom"; 
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from "react-router-dom";
import { useCartStore } from '../stores/useCartStore';

const Navbar = () => {
    const { user, logOut } = useUserStore();
    const isAdmin =user?.role === "admin";
    const { cart } = useCartStore();
    const navigate = useNavigate();

  return (
<header className="fixed top-0 left-0 w-full bg-[#F8F5F2] border-b border-[#E5E0DA] z-40">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    
    <Link to="/" className="text-2xl font-bold tracking-wide text-[#1A1A1A]">
      MAISON ZCNF
    </Link>

    <nav className="flex items-center gap-6">
      <Link to="/" className="text-[#6B6B6B] hover:text-black font-medium">
        Home
      </Link>

      {user && (
        <Link to="/cart" className="relative text-[#6B6B6B] hover:text-black font-medium">
          <ShoppingCart className="inline-block mr-1" size={20} />
          Cart
          <span className="absolute -top-3 -left-3 bg-black text-white rounded-full px-2 py-0.5 text-xs">
            {cart.length}
          </span>
        </Link>
      )}

      {isAdmin && (
        <Link
          to="/secret-dashboard"
          className="border border-black text-black px-4 py-2 font-semibold hover:bg-black hover:text-white transition"
          to={"/secret-dashboard"}
        >
          <lock className="inline-block mr-1" size={18} />
          <span className="hidden sm:inline">Dashboard</span>
          
        </Link>
      )}

      {user ? (
       <button
        onClick={async () => {
        await logOut();
        navigate("/");
       }}
        className="bg-black text-white px-5 py-2 font-semibold hover:bg-gray-800 transition"
    >
       Log Out
      </button>
      ) : (
        <>
          <Link
            to="/signup"
            className="border border-black text-black px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="bg-black text-white px-5 py-2 font-semibold hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  </div>
</header>
  )
}

export default Navbar