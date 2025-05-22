import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeAdmin } from "../utils/adminSlice";
import { BASE_URL } from "../utils/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/create-chef-waiter", label: "Create Staff" },
  { to: "/create-menu", label: "Create Menu" },
];

const NavBar = () => {
  const admin = useSelector((store) => store.admin);
  const adminName = admin?.admin?.name;
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLoginLogout = async () => {
    if (!admin) {
      navigate("/admin_login");
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeAdmin());
      navigate("/admin_login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="hover:scale-110 transition-transform text-white dark:text-[#EFE5D2]"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-green-600 dark:bg-green-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide text-white dark:text-[#EFE5D2]">
          Infinity Menus
        </div>

        {/* Welcome Message - Desktop */}
        {adminName && (
          <div className="hidden md:block text-sm font-medium text-white dark:text-[#EFE5D2]">
            Welcome, {adminName}
          </div>
        )}

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-white dark:text-[#EFE5D2] hover:opacity-80 hover:underline transition-all"
            >
              {item.label}
            </Link>
          ))}

          {/* Login/Logout */}
          <button
            onClick={handleLoginLogout}
            className="px-4 py-1 rounded-md border text-white dark:text-[#EFE5D2] border-white dark:border-[#EFE5D2] bg-white/20 dark:bg-white/10 font-medium transition-all duration-200 hover:scale-105"
          >
            {admin ? "Logout" : "Login"}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile: Theme Toggle & Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white dark:text-[#EFE5D2] hover:scale-110 transition-transform"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden px-6 pb-4 pt-2 space-y-3 bg-green-600 dark:bg-green-900 text-white dark:text-[#EFE5D2] transition-all duration-300"
        >
          {adminName && (
            <div className="text-sm font-medium">Welcome, {adminName}</div>
          )}

          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block text-base font-medium hover:opacity-80 hover:underline transition-all"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLoginLogout();
            }}
            className="w-full px-4 py-2 rounded-md font-medium border text-white dark:text-[#EFE5D2] border-white dark:border-[#EFE5D2] bg-white/20 dark:bg-white/10 hover:scale-105 transition-all"
          >
            {admin ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
