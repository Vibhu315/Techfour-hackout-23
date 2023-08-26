import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
function Navbar() {
  return (
    <nav className="navbar">
      
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/3dmodel" className="nav-link">
            3D Model
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/services" className="nav-link">
            Services
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>
     
    </nav>
  );
}

export default Navbar;
