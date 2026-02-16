const db = require('../config/database');

exports.getAllTeamMembers = async (req, res) => {
  try {
    const [members] = await db.query('SELECT * FROM team_members ORDER BY created_at DESC');
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTeamMemberById = async (req, res) => {
  try {
    const [members] = await db.query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    if (members.length === 0) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(members[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const { name, position, bio, image_url } = req.body;
    const [result] = await db.query(
      'INSERT INTO team_members (name, position, bio, image_url) VALUES (?, ?, ?, ?)',
      [name, position, bio, image_url]
    );
    res.status(201).json({ message: 'Team member created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { name, position, bio, image_url } = req.body;
    await db.query(
      'UPDATE team_members SET name = ?, position = ?, bio = ?, image_url = ? WHERE id = ?',
      [name, position, bio, image_url, req.params.id]
    );
    res.json({ message: 'Team member updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await db.query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
