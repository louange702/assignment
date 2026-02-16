const db = require('../config/database');

exports.getAllContacts = async (req, res) => {
  try {
    const [contacts] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const [contacts] = await db.query('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contacts[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    res.status(201).json({ message: 'Contact message sent', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE contacts SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Contact status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await db.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
