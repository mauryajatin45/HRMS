const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const { DOMAIN } = require('../config/emailDomain');

// Admin signup
exports.signupAdmin = async (req, res) => {
  const { email, password, fullName, phoneNumber, businessName, gstNumber, businessAddress } = req.body;

  if (!email.endsWith('@shivaurica.com')) {
    return res.status(400).json({ msg: 'Invalid email domain' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      email,
      password,
      role: 'admin',
      fullName,
      phoneNumber
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create token
    const payload = { id: user.id };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: user.id, role: user.role };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};