import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold tracking-wide">MAISON ZCNF</h2>
          <p className="mt-3 text-sm text-gray-300">
            Curated fashion designed to make every moment feel like a statement.
          </p>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-widest mb-3 text-sm">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/cart" className="hover:text-white">Cart</Link>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/signup" className="hover:text-white">Sign Up</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-widest mb-3 text-sm">
            Contact
          </h3>
          <p className="text-sm text-gray-300">Email: maisonzcnf@gmail.com</p>
          <p className="text-sm text-gray-300 mt-2">Cairo, Egypt</p>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MAISON ZCNF. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;