import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-slate-900 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">CRM App</Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-slate-300">
            Home
          </Link>
          <Link to="/customerLogin" className="hover:text-slate-300">
            Customers
          </Link>
          <Link to="/deals" className="hover:text-slate-300">
            Deals
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4 bg-slate-800 p-4 rounded">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-slate-300"
          >
            Home
          </Link>
          <Link
            to="/customerLogin"
            onClick={() => setMenuOpen(false)}
            className="hover:text-slate-300"
          >
            Customers
          </Link>
          <Link
            to="/deals"
            onClick={() => setMenuOpen(false)}
            className="hover:text-slate-300"
          >
            Deals
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-left"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
