require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const hrRoutes = require('./routes/hrRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave', leaveRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));