// src/pages/Reports.js
import { useState } from "react";

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("2023-06");
  const [activeTab, setActiveTab] = useState("attendance");

  // Sample data
  const attendanceData = [
    {
      date: "2023-06-01",
      status: "Present",
      lateReason: "",
      notes: "Completed project tasks",
    },
    {
      date: "2023-06-02",
      status: "Late",
      lateReason: "Traffic jam",
      notes: "Team meeting",
    },
    {
      date: "2023-06-03",
      status: "Present",
      lateReason: "",
      notes: "Client presentation",
    },
    {
      date: "2023-06-05",
      status: "Absent",
      lateReason: "",
      notes: "Sick leave",
    },
    {
      date: "2023-06-06",
      status: "Present",
      lateReason: "",
      notes: "Code review",
    },
    {
      date: "2023-06-07",
      status: "Late",
      lateReason: "Public transport delay",
      notes: "Sprint planning",
    },
  ];

  const salaryData = [
    {
      date: "2023-01-05",
      base: 5000,
      incentives: 500,
      deductions: 200,
      net: 5300,
    },
    {
      date: "2023-02-05",
      base: 5000,
      incentives: 300,
      deductions: 150,
      net: 5150,
    },
    {
      date: "2023-03-05",
      base: 5000,
      incentives: 700,
      deductions: 100,
      net: 5600,
    },
    {
      date: "2023-04-05",
      base: 5200,
      incentives: 600,
      deductions: 250,
      net: 5550,
    },
    {
      date: "2023-05-05",
      base: 5200,
      incentives: 450,
      deductions: 180,
      net: 5470,
    },
    {
      date: "2023-06-05",
      base: 5200,
      incentives: 800,
      deductions: 120,
      net: 5880,
    },
  ];

  const leaveBalances = {
    sickLeave: { total: 12, taken: 2, remaining: 10 },
    casualLeave: { total: 10, taken: 4, remaining: 6 },
    maternityLeave: { total: 180, taken: 0, remaining: 180 },
    paternityLeave: { total: 30, taken: 0, remaining: 30 },
  };

  // Calculate attendance summary
  const attendanceSummary = attendanceData.reduce(
    (acc, record) => {
      if (record.status === "Present") acc.present++;
      if (record.status === "Absent") acc.absent++;
      if (record.status === "Late") acc.late++;
      return acc;
    },
    { present: 0, absent: 0, late: 0 }
  );

  // Calculate attendance rate
  const attendanceRate = Math.round(
    (attendanceSummary.present / attendanceData.length) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Reports</h1>
          <p className="text-gray-600 mt-1">
            Track your attendance, salary, and leave history
          </p>
        </div>

        <div className="w-full md:w-auto">
          <div className="relative w-full">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="2023-06">June 2023</option>
              <option value="2023-05">May 2023</option>
              <option value="2023-04">April 2023</option>
              <option value="2023-03">March 2023</option>
            </select>

            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {["attendance", "salary", "leaves"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 font-medium text-sm capitalize transition-colors duration-200 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Total Present"
              value={attendanceSummary.present}
              percentage={attendanceRate}
              trend="up"
              iconColor="bg-green-100"
              textColor="text-green-800"
            />
            <SummaryCard
              title="Total Absent"
              value={attendanceSummary.absent}
              percentage={Math.round(
                (attendanceSummary.absent / attendanceData.length) * 100
              )}
              trend="down"
              iconColor="bg-red-100"
              textColor="text-red-800"
            />
            <SummaryCard
              title="Total Late"
              value={attendanceSummary.late}
              percentage={Math.round(
                (attendanceSummary.late / attendanceData.length) * 100
              )}
              trend="up"
              iconColor="bg-yellow-100"
              textColor="text-yellow-800"
            />
            <SummaryCard
              title="Attendance Rate"
              value={`${attendanceRate}%`}
              description="Monthly average"
              iconColor="bg-blue-100"
              textColor="text-blue-800"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Attendance for {selectedMonth}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Late Reason
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            record.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : record.status === "Late"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.lateReason || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {record.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Salary Tab */}
      {activeTab === "salary" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard
              title="Current Salary"
              value={`$${salaryData[5].net}`}
              description="Net pay this month"
              iconColor="bg-blue-100"
              textColor="text-blue-800"
            />
            <SummaryCard
              title="Average Salary"
              value={`$${Math.round(
                salaryData.reduce((sum, item) => sum + item.net, 0) /
                  salaryData.length
              )}`}
              description="Last 6 months"
              iconColor="bg-purple-100"
              textColor="text-purple-800"
            />
            <SummaryCard
              title="Total Earnings"
              value={`$${salaryData.reduce((sum, item) => sum + item.net, 0)}`}
              description="Last 6 months"
              iconColor="bg-green-100"
              textColor="text-green-800"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Salary History (Last 6 Months)
              </h2>
              <div className="flex gap-2">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View Payslips
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Base Salary
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Incentives
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Deductions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Net Pay
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salaryData.map((salary, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {salary.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${salary.base}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        +${salary.incentives}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                        -${salary.deductions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${salary.net}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Leaves Tab */}
      {activeTab === "leaves" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(leaveBalances).map(([type, data]) => (
              <LeaveBalanceCard
                key={type}
                type={type
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                taken={data.taken}
                total={data.total}
                remaining={data.remaining}
              />
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Leave History
            </h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-blue-700">
                  No leave requests found for {selectedMonth}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  percentage,
  trend,
  description,
  iconColor,
  textColor,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>

          {percentage && (
            <div className="flex items-center">
              <span
                className={`text-xs font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend === "up" ? "↑" : "↓"} {percentage}%
              </span>
              <span className="text-xs text-gray-500 ml-1">
                from last month
              </span>
            </div>
          )}

          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>

        <div className={`p-3 rounded-lg ${iconColor}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${textColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeaveBalanceCard({ type, taken, total, remaining }) {
  const percentage = Math.round((taken / total) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900 mb-4">{type}</h3>

      <div className="flex justify-between mb-3">
        <div>
          <span className="text-xs text-gray-500">Taken</span>
          <p className="text-lg font-bold">{taken} days</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500">Remaining</span>
          <p className="text-lg font-bold text-green-600">{remaining} days</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>{total} days</span>
      </div>
    </div>
  );
}
