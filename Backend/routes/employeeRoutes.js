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
  getPayrollHistory,
  getMonthlyAttendanceStats,
  getLeaveHistory
} = require('../controllers/employeeController');

// Employee routes
router.post('/clockin', auth, role(['employee', 'hr']), clockIn);
router.post('/clockout', auth, role(['employee', 'hr']), clockOut);
router.post('/leave', auth, role(['employee', 'hr']), applyLeave);
router.get('/profile', auth, role(['employee', 'hr']), getProfile);
router.get('/attendance', auth, role(['employee', 'hr']), getAttendanceHistory);
router.get('/attendance/stats', auth, role(['employee', 'hr']), getMonthlyAttendanceStats);
router.get('/payroll', auth, role(['employee', 'hr']), getPayrollHistory);
router.get('/leave', auth, role(['employee', 'hr']), getLeaveHistory);

module.exports = router;