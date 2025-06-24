const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  clockIn,
  clockOut,
  applyLeave,
  getProfile,
  getAttendanceHistory,
  getPayrollHistory
} = require('../controllers/employeeController');

// Employee routes
router.post('/clockin', auth, role(['employee', 'hr']), clockIn);
router.post('/clockout', auth, role(['employee', 'hr']), clockOut);
router.post('/leave', auth, role(['employee', 'hr']), applyLeave);
router.get('/profile', auth, role(['employee', 'hr']), getProfile);
router.get('/attendance', auth, role(['employee', 'hr']), getAttendanceHistory);
router.get('/payroll', auth, role(['employee', 'hr']), getPayrollHistory);

module.exports = router;