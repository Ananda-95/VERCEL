import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          VERCEL
        </NavLink>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu items */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/taskmanager" onClick={() => setMenuOpen(false)}>
                Task Manager
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/form" onClick={() => setMenuOpen(false)}>
                Form
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products" onClick={() => setMenuOpen(false)}>
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/treeview1" onClick={() => setMenuOpen(false)}>
                Tree View
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
