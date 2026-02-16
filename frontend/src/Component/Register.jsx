import { Link } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';
import { API_BASE_URL } from '../config';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatusType('success');
        setStatusMessage('Registration successful. You can now log in.');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setStatusType('error');
        setStatusMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setStatusType('error');
      setStatusMessage('Failed to connect to server.');
    }
  };

  return (
    <div className="container">
      <div className="register-section">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <button type="submit" className="register-btn">Register</button>
        </form>
        {statusMessage && (
          <p className={`status-message ${statusType}`}>{statusMessage}</p>
        )}
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
