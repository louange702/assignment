import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/services">Services</Link>
        <Link to="/team">Team</Link>
        <Link to="/contacts">Contacts</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </div>
  );
}

export default Sidebar;
