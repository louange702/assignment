import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { API_URL } from '../config';

function Team() {
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', position: '', bio: '', image_url: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/team`);
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editId) {
        await axios.put(`${API_URL}/api/team/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/api/team`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setFormData({ name: '', position: '', bio: '', image_url: '' });
      setEditId(null);
      fetchTeam();
    } catch (error) {
      alert('Error saving team member');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team member?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTeam();
    } catch (error) {
      alert('Error deleting team member');
    }
  };

  const handleEdit = (member) => {
    setEditId(member.id);
    setFormData({ name: member.name, position: member.position, bio: member.bio, image_url: member.image_url });
    setShowModal(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h1>Team Management</h1>
          <button onClick={() => { setShowModal(true); setEditId(null); setFormData({ name: '', position: '', bio: '', image_url: '' }); }}>Add Member</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>{member.bio?.substring(0, 50)}...</td>
                <td>
                  <button onClick={() => handleEdit(member)}>Edit</button>
                  <button onClick={() => handleDelete(member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editId ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input type="text" placeholder="Position" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} required />
                <textarea placeholder="Bio" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} required />
                <input type="text" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                <div className="modal-actions">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
