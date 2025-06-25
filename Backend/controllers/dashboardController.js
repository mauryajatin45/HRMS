const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const moment = require("moment-timezone");

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const todayStart = moment().tz("Asia/Kolkata").startOf("day").toDate();
    const todayEnd = moment().tz("Asia/Kolkata").endOf("day").toDate();

    // Total employees
    const totalEmployees = await User.countDocuments({
      role: "employee",
      isActive: true,
    });

    // Present today
    const presentEmployees = await Attendance.countDocuments({
      date: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["present", "late"] },
    });

    // Absent today (total active employees - present)
    const absentEmployees = totalEmployees - presentEmployees;

    // Recent leave requests (last 7 days)
    const recentLeaves = await Leave.find({
      createdAt: { $gte: moment().subtract(7, "days").toDate() },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName email");

    // Today's attendance
    const todayAttendance = await Attendance.find({
      date: { $gte: todayStart, $lte: todayEnd },
    })
      .populate("user", "fullName email designation")
      .sort({ clockIn: -1 });

    res.json({
      stats: {
        totalEmployees,
        presentToday: presentEmployees,
        absentToday: absentEmployees,
      },
      recentLeaves,
      todayAttendance,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Approve/reject leave from dashboard
exports.processLeaveRequest = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const leave = await Leave.findById(id).populate("user");
    if (!leave) return res.status(404).json({ msg: "Leave request not found" });

    // Check if leave is already processed
    if (leave.status !== "pending") {
      return res.status(400).json({ msg: "Leave request already processed" });
    }

    // Update leave status
    leave.status = status;
    await leave.save();

    // Deduct leave balance if approved
    if (status === "approved") {
      const employee = await Employee.findOne({ user: leave.user._id });
      if (!employee)
        return res.status(404).json({ msg: "Employee record not found" });

      if (leave.type === "casual" && employee.casualLeaves > 0) {
        employee.casualLeaves -= 1;
      } else if (leave.type === "sick" && employee.sickLeaves > 0) {
        employee.sickLeaves -= 1;
      }

      await employee.save();
    }

    // Return updated dashboard data
    const todayStart = moment().tz("Asia/Kolkata").startOf("day").toDate();
    const todayEnd = moment().tz("Asia/Kolkata").endOf("day").toDate();

    const recentLeaves = await Leave.find({
      createdAt: { $gte: moment().subtract(7, "days").toDate() },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName email");

    res.json({
      message: `Leave request ${status}`,
      recentLeaves,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

