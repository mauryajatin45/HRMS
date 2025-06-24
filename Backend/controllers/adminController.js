const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
      .select("-password -__v")
      .populate("employee", "-user -__v");

    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id)
      .select("-password -__v")
      .populate("employee", "-user -__v");

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    designation,
    joinDate,
    department,
    isActive,
    aadharNumber,
    panNumber,
    bankName,
    accountNumber,
    ifscCode,
  } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update User fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (designation) user.designation = designation;
    if (joinDate) user.joinDate = joinDate;
    if (department) user.department = department;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    // Update Employee details
    const employee = await Employee.findOne({ user: user._id });
    if (employee) {
      if (aadharNumber) employee.aadharNumber = aadharNumber;
      if (panNumber) employee.panNumber = panNumber;
      if (bankName) employee.bankName = bankName;
      if (accountNumber) employee.accountNumber = accountNumber;
      if (ifscCode) employee.ifscCode = ifscCode;

      await employee.save();
    }

    const updatedEmployee = await User.findById(user._id)
      .select("-password -__v")
      .populate({
        path: "employee",
        select: "-user -__v",
      });

    res.json(updatedEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Add employee
exports.addEmployee = async (req, res) => {
  const { fullName, email, designation, startDate, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Create user
    user = new User({
      fullName,
      email,
      password,
      role: "employee",
      designation,
      joinDate: startDate,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create employee record
    const employee = new Employee({ user: user._id });
    await employee.save();

    res.json({ msg: "Employee added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Other admin methods: manageEmployees, addPayroll, etc.
