import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { API_URL } from '../config';

function Services() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editId) {
        await axios.put(`${API_URL}/api/services/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/api/services`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setFormData({ title: '', description: '', icon: '' });
      setEditId(null);
      fetchServices();
    } catch (error) {
      alert('Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchServices();
    } catch (error) {
      alert('Error deleting service');
    }
  };

  const handleEdit = (service) => {
    setEditId(service.id);
    setFormData({ title: service.title, description: service.description, icon: service.icon });
    setShowModal(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h1>Services Management</h1>
          <button onClick={() => { setShowModal(true); setEditId(null); setFormData({ title: '', description: '', icon: '' }); }}>Add Service</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.title}</td>
                <td>{service.description}</td>
                <td>{service.icon}</td>
                <td>
                  <button onClick={() => handleEdit(service)}>Edit</button>
                  <button onClick={() => handleDelete(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editId ? 'Edit Service' : 'Add Service'}</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                <input type="text" placeholder="Icon" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} />
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

export default Services;
