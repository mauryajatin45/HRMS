const User = require('../models/User');
const Employee = require('../models/Employee');

// Add employee
exports.addEmployee = async (req, res) => {
  const { email, designation, startDate, password } = req.body;
  
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create user
    user = new User({
      email,
      password,
      role: 'employee',
      designation,
      joinDate: startDate
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create employee record
    const employee = new Employee({ user: user._id });
    await employee.save();

    res.json({ msg: 'Employee added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Other admin methods: manageEmployees, addPayroll, etc.