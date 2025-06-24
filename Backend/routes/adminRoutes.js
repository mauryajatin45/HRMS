const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { 
  addEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee 
} = require('../controllers/adminController');

// Employee management
router.post('/employees', auth, role(['admin']), addEmployee);
router.get('/employees', auth, role(['admin']), getAllEmployees);
router.get('/employees/:id', auth, role(['admin']), getEmployeeById);
router.put('/employees/:id', auth, role(['admin']), updateEmployee);

module.exports = router;