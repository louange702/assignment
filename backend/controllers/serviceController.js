const db = require('../config/database');

exports.getAllServices = async (req, res) => {
  try {
    const [services] = await db.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const [services] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (services.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(services[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const [result] = await db.query(
      'INSERT INTO services (title, description, icon) VALUES (?, ?, ?)',
      [title, description, icon]
    );
    res.status(201).json({ message: 'Service created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    await db.query(
      'UPDATE services SET title = ?, description = ?, icon = ? WHERE id = ?',
      [title, description, icon, req.params.id]
    );
    res.json({ message: 'Service updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await db.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
