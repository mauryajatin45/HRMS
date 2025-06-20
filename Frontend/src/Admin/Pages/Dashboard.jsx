import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dateTime, setDateTime] = useState(new Date());

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-600 font-medium mt-2 sm:mt-0">
          <span>{formattedDate}</span> | <span>{formattedTime}</span>
        </div>
      </div>
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
    </div>
  );
}
