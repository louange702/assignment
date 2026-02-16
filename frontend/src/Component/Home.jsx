import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';
import { API_BASE_URL } from '../config';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.user.name);
        setStatusType('success');
        setStatusMessage(`Login successful. Welcome ${data?.user?.name || email}.`);
        setTimeout(() => {
          navigate('/about');
        }, 1000);
      } else {
        setStatusType('error');
        setStatusMessage(data.message || 'Login failed. Check your email and password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setStatusType('error');
      setStatusMessage('Failed to connect to server.');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Garden tss</h1>

      <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        {statusMessage && (
          <p className={`status-message ${statusType}`}>{statusMessage}</p>
        )}
        <p className="register-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
