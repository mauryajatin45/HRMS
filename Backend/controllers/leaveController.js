const Leave = require('../models/Leave');

// Get my leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id }).sort({ startDate: -1 });
    res.json(leaves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update leave status (for HR/Admin)
exports.updateLeaveStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ msg: 'Leave not found' });

    if (status === 'approved') {
      const user = await User.findById(leave.user).populate('employee');
      
      if (leave.type === 'casual') {
        user.employee.casualLeaves -= 1;
      } else if (leave.type === 'sick') {
        user.employee.sickLeaves -= 1;
      }
      
      await user.employee.save();
    }

    leave.status = status;
    await leave.save();

    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};