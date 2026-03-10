import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo">MyApp</div>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/taskmanager" onClick={() => setMenuOpen(false)}>Task Manager</NavLink>

          <div
            className="dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="dropdown-title">
              Tree Views ▾
            </span>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <NavLink
                  to="/treeview1"
                  onClick={() => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  Tree View 1
                </NavLink>

                <NavLink
                  to="/treeview2"
                  onClick={() => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  Tree View 2
                </NavLink>
              </div>
            )}

          </div>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;
