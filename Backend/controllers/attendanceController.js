const Attendance = require('../models/Attendance');
const moment = require('moment-timezone');

// Clock in
exports.clockIn = async (req, res) => {
  try {
    const indiaTime = moment().tz('Asia/Kolkata');
    const isLate = indiaTime.hour() > 10 || (indiaTime.hour() === 10 && indiaTime.minute() > 20);
    
    const attendance = new Attendance({
      user: req.user.id,
      clockIn: new Date(),
      status: isLate ? 'late' : 'present'
    });

    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Clock out
exports.clockOut = async (req, res) => {
  const { notes } = req.body;

  try {
    let attendance = await Attendance.findOne({ 
      user: req.user.id,
      date: { 
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    });

    if (!attendance) return res.status(400).json({ msg: 'No clock-in record found' });

    attendance.clockOut = new Date();
    attendance.notes = notes;
    
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};