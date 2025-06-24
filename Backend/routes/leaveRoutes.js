const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  getMyLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');

// Leave routes
router.get('/me', auth, role(['employee', 'hr']), getMyLeaves);
router.put('/:id', auth, role(['hr', 'admin']), updateLeaveStatus);

module.exports = router;