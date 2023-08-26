import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ReactApp
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
            <Link to="/3dmodel" className="nav-links">
              3D model
            </Link>
          </li>
          {/* Add more menu items here */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
