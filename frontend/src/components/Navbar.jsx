import React from "react";
import { ShoppingCart, LogOut, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearCart();
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#F8F5F2] border-b border-[#E5E0DA] z-40">
      <div className="mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold tracking-wide text-[#1A1A1A] leading-tight"
        >
          MAISON<br className="sm:hidden" /> ZCNF
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base">
          <Link
            to="/"
            className="text-[#6B6B6B] hover:text-black font-medium"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative text-[#6B6B6B] hover:text-black font-medium flex flex-col sm:flex-row items-center"
            >
              <ShoppingCart size={22} />
              <span>Cart</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-black text-white rounded-full px-2 py-0.5 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
  <Link
    to="/secret-dashboard"
    title="Admin Dashboard"
    className="border border-black text-black w-12 h-11 flex items-center justify-center hover:bg-black hover:text-white transition"
  >
    <Lock size={20} />
  </Link>
)}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-3 sm:px-5 py-2 font-semibold hover:bg-gray-800 transition"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="border border-black text-black px-3 sm:px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="bg-black text-white px-3 sm:px-5 py-2 font-semibold hover:bg-gray-800 transition"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;