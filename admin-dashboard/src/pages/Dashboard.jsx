import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { API_URL } from '../config';

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, services: 0, team: 0, contacts: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const [users, services, team, contacts] = await Promise.all([
        axios.get(`${API_URL}/api/users`, config),
        axios.get(`${API_URL}/api/services`),
        axios.get(`${API_URL}/api/team`),
        axios.get(`${API_URL}/api/contacts`, config)
      ]);

      setStats({
        users: users.data.length,
        services: services.data.length,
        team: team.data.length,
        contacts: contacts.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
          <div className="stat-card">
            <h3>Services</h3>
            <p>{stats.services}</p>
          </div>
          <div className="stat-card">
            <h3>Team Members</h3>
            <p>{stats.team}</p>
          </div>
          <div className="stat-card">
            <h3>Contact Messages</h3>
            <p>{stats.contacts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
