import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { API_URL } from '../config';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.get(`${API_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`${API_URL}/api/contacts/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (error) {
      alert('Error deleting contact');
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <h1>Contact Messages</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>
                  <select value={contact.status} onChange={(e) => handleStatusChange(contact.id, e.target.value)}>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
                <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => setSelectedContact(contact)}>View</button>
                  <button onClick={() => handleDelete(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedContact && (
          <div className="modal">
            <div className="modal-content">
              <h2>Contact Message</h2>
              <p><strong>From:</strong> {selectedContact.name} ({selectedContact.email})</p>
              <p><strong>Subject:</strong> {selectedContact.subject}</p>
              <p><strong>Message:</strong></p>
              <p>{selectedContact.message}</p>
              <button onClick={() => setSelectedContact(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
