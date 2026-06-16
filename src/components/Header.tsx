import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMap, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition hover:text-green-400 ${isActive ? "text-green-400" : "text-white/80"}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 md:px-0 py-3 md:py-0">
        <div
          className="
          flex items-center justify-between
          bg-white/10 backdrop-blur-xl border border-white/20 
          shadow-lg px-8 xl:px-36 py-3
          rounded-2xl md:rounded-none
        "
        >
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
              <img
                src="/logo-light.png"
                alt="NaviAtlas Logo"
                className="w-10 h-10 object-cover"
              />
            </div>

            <span className="text-white font-semibold tracking-wide text-lg">
              <span className="text-green-500 font-extrabold">Navi</span>Atlas
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/upload" className={linkClass}>
              Upload SVG
            </NavLink>
            <NavLink to="/guide" className={linkClass}>
              Guide
            </NavLink>
            <NavLink to="/documentation" className={linkClass}>
              Documentation
            </NavLink>
          </nav>

          {/* CTA Button (desktop only) */}
          <button
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=jpquintana01@gmail.com&su=NaviAtlas%20Inquiry",
                "_blank",
              )
            }
            className="hidden md:block px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-400 transition shadow-md"
          >
            Contact Me
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <nav className="flex flex-col gap-4 text-sm">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/upload"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Upload SVG
              </NavLink>
              <NavLink
                to="/guide"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Guide
              </NavLink>
              <NavLink
                to="/documentation"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Documentation
              </NavLink>
              {/* CTA button mobile */}
              <button
                className="mt-2 px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-400 transition"
                onClick={() => setOpen(false)}
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
