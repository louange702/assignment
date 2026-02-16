import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <div className="nav-logo">Garden tss</div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link></li>
        <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link></li>
        <li><Link to="/team" onClick={() => setIsMenuOpen(false)}>TEAM</Link></li>
        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>LOG OUT</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
