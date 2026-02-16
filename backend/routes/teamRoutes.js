const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/auth');

router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);
router.post('/', authMiddleware, teamController.createTeamMember);
router.put('/:id', authMiddleware, teamController.updateTeamMember);
router.delete('/:id', authMiddleware, teamController.deleteTeamMember);

module.exports = router;
