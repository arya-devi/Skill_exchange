import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home" className="brand-text">Skill Exchange</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home" className="nav-link">Home</Link></li>
        <li><Link to="/skills" className="nav-link">Skills</Link></li>
        <li><Link to="/profile" className="nav-link">Profile</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/messagebox" className="nav-link">Message</Link></li>
        <li><Link to="/allskills" className="nav-link">All skills</Link></li>
        <li><Link to="/messageRequest" className="nav-link">Message Requests</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
