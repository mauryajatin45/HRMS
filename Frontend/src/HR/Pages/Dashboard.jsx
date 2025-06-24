import { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  FileText, 
  X,
  CheckCircle,
  Clock as ClockIcon
} from 'lucide-react';

// Dialog Component Implementation
function Dialog({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [clockedIn, setClockedIn] = useState(false);
  const [showClockInDialog, setShowClockInDialog] = useState(false);
  const [showClockOutDialog, setShowClockOutDialog] = useState(false);
  const [dailyNote, setDailyNote] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState(null);
  const [activities, setActivities] = useState([]);

  const handleClockIn = () => {
    setShowClockInDialog(true);
  };

  const confirmClockIn = () => {
    setClockedIn(true);
    setShowClockInDialog(false);
    const now = new Date();
    setClockInTime(now);
    
    // Add new activity
    setActivities([...activities, {
      id: activities.length + 1,
      task: "Started work",
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleClockOut = () => {
    setShowClockOutDialog(true);
  };

  const confirmClockOut = () => {
    const now = new Date();
    setClockedIn(false);
    setShowClockOutDialog(false);
    
    // Add clock out activity
    setActivities([
      ...activities, 
      {
        id: activities.length + 1,
        task: "Finished work",
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    setDailyNote("");
  };

  const addActivity = () => {
    if (!dailyNote.trim()) return;
    
    setActivities([
      ...activities, 
      {
        id: activities.length + 1,
        task: dailyNote,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setDailyNote("");
  };

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="space-y-6">
      <title>Dashboard | HR</title>
      
      {/* Top Bar with Date/Time */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back! Here's your daily summary
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={16} />
              <span>{formattedTime}</span>
            </div>
          </div>
          <button
            onClick={clockedIn ? handleClockOut : handleClockIn}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              clockedIn
                ? "bg-red-100 hover:bg-red-200 text-red-700"
                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
            }`}
          >
            <ClockIcon size={20} />
            {clockedIn ? "Clock Out" : "Clock In"}
          </button>
        </div>
      </div>
      
      {/* Activity Tracker */}
      {clockedIn && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Today's Activity Tracker
          </h3>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={dailyNote}
              onChange={(e) => setDailyNote(e.target.value)}
              placeholder="Add your current activity..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              onClick={addActivity}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          
          <div className="border-l-2 border-gray-200 pl-4 ml-3 space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="relative">
                <div className="absolute -left-4 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{activity.task}</span>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROW 1: STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Total Employees</p>
          <h2 className="text-3xl text-blue-600 font-bold">120</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Present Today</p>
          <h2 className="text-3xl text-green-600 font-bold">95</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Absent Today</p>
          <h2 className="text-3xl text-red-600 font-bold">25</h2>
        </div>
      </div>

      {/* ROW 2: LEAVE REQUEST TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Leave Requests
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                {
                  name: "Priya Sharma",
                  dept: "HR",
                  date: "2025-06-19",
                  reason: "Sick Leave",
                  status: "Pending",
                },
                {
                  name: "Raj Mehta",
                  dept: "Development",
                  date: "2025-06-18",
                  reason: "Personal Work",
                  status: "Approved",
                },
                {
                  name: "Neel Patel",
                  dept: "Testing",
                  date: "2025-06-17",
                  reason: "Family Event",
                  status: "Rejected",
                },
              ].map((req, i) => (
                <tr key={i} className="hover:bg-blue-50">
                  <td className="p-3 font-medium">{req.name}</td>
                  <td className="p-3">{req.dept}</td>
                  <td className="p-3">{req.date}</td>
                  <td className="p-3">{req.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 cursor-pointer">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 cursor-pointer">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROW 3: YESTERDAY'S ACTIVITY TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Yesterday's Employee Activities
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Tasks Completed</th>
                <th className="p-3">Login Time</th>
                <th className="p-3">Logout Time</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-blue-50">
                <td className="p-3 font-medium">Raj Mehta</td>
                <td className="p-3">Development</td>
                <td className="p-3">5</td>
                <td className="p-3">9:10 AM</td>
                <td className="p-3">6:05 PM</td>
                <td className="p-3">Implemented login module & fixed bugs</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="p-3 font-medium">Priya Sharma</td>
                <td className="p-3">HR</td>
                <td className="p-3">3</td>
                <td className="p-3">9:30 AM</td>
                <td className="p-3">5:45 PM</td>
                <td className="p-3">Conducted interviews & onboarding</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="p-3 font-medium">Neel Patel</td>
                <td className="p-3">Testing</td>
                <td className="p-3">4</td>
                <td className="p-3">10:00 AM</td>
                <td className="p-3">6:30 PM</td>
                <td className="p-3">Tested 3 modules and logged 6 bugs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Clock In Dialog */}
      {showClockInDialog && (
        <Dialog onClose={() => setShowClockInDialog(false)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Confirm Clock In</h3>
            <button 
              onClick={() => setShowClockInDialog(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mb-6 text-gray-600">Are you sure you want to clock in for the day?</p>
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setShowClockInDialog(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={confirmClockIn}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <CheckCircle className="mr-2" size={18} />
              Confirm Clock In
            </button>
          </div>
        </Dialog>
      )}
  
      {/* Clock Out Dialog */}
      {showClockOutDialog && (
        <Dialog onClose={() => setShowClockOutDialog(false)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Clock Out</h3>
            <button 
              onClick={() => setShowClockOutDialog(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">What did you work on today?</label>
            <textarea
              value={dailyNote}
              onChange={(e) => setDailyNote(e.target.value)}
              placeholder="Describe your work today..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setShowClockOutDialog(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={confirmClockOut}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}