const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { addEmployee } = require('../controllers/adminController');

router.post('/employees', auth, role(['admin']), addEmployee);
// Add other admin routes

module.exports = router;