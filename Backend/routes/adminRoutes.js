const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { 
  addEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee,
  getAdminProfile,
  updateAdminProfile,
  getEmployeeProfile
} = require('../controllers/adminController');

// Admin Profile Route
router.get('/profile', auth, role(['admin']), getAdminProfile);
router.put('/profile', auth, role(['admin']), updateAdminProfile);

// Employee management
router.post('/employees', auth, role(['admin']), addEmployee);
router.get('/employees', auth, role(['admin']), getAllEmployees);
router.get('/employees/:id', auth, role(['admin']), getEmployeeById);
router.put('/employees/:id', auth, role(['admin']), updateEmployee);
router.get('/employee/:id', auth, role(['admin']), getEmployeeProfile);


module.exports = router;