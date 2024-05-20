import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Moringa Alumni Platform</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/success-stories">Success Stories</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/tech-news">Tech News</Link>
          <Link to="/fundraisers">Fundraisers</Link>
          <Link to="/about">ABOUT US</Link>
          
          {/* <Link to="/find-cofounders">Find Co-founders/Developers/Mentors</Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;