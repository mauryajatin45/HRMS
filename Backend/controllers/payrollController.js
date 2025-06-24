const Payroll = require('../models/Payroll');
const User = require('../models/User');

// Create payroll
exports.createPayroll = async (req, res) => {
  const { userId, paymentDate, baseSalary, overtime, bonus, deductions, netPay } = req.body;

  try {
    const payroll = new Payroll({
      user: userId,
      paymentDate,
      baseSalary,
      overtime,
      bonus,
      deductions,
      netPay
    });

    await payroll.save();
    res.json(payroll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get payroll by employee
exports.getPayrollByEmployee = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ user: req.params.userId })
      .sort({ paymentDate: -1 });

    res.json(payrolls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all payrolls
exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .populate('user', 'fullName email')
      .sort({ paymentDate: -1 });

    res.json(payrolls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};