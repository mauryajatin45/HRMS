// src/Pages/EmployeeManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ChevronDown,
  Briefcase,
  HeartPulse,
  Coffee,
  FileText,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const EmployeeManagementPage = () => {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState('2023-10');
  const [employee, setEmployee] = useState(null);
  
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'Senior Developer',
      department: 'Engineering',
      status: 'Active',
      hireDate: '2020-03-15',
      dob: '1990-05-22',
      email: 'alex.j@company.com',
      phone: '+1 (555) 123-4567',
      salary: 8500,
    },
    // ... other employees
  ];

  // Enhanced employee details
  const employeeDetails = {
    1: {
      attendance: [
        // ... existing attendance data
      ],
      salaryHistory: [
        // ... existing salary history
      ],
      leaveBalances: {
        sick: { total: 7, used: 3, remaining: 4 },
        casual: { total: 7, used: 5, remaining: 2 },
        vacation: { total: 20, used: 10, remaining: 10 },
        emergency: { total: 5, used: 0, remaining: 5 }
      },
      payroll: [], // Empty payroll table as requested
      workLogs: [
        { date: '2023-10-01', hours: 8.5, tasks: ['API implementation', 'Code reviews'] },
        { date: '2023-10-02', hours: 8.75, tasks: ['UI bug fixes', 'Performance optimization'] },
        { date: '2023-10-03', hours: 8.25, tasks: ['Team meeting', 'Documentation'] },
        { date: '2023-10-04', hours: 9, tasks: ['Feature deployment', 'Testing'] },
        { date: '2023-10-05', hours: 8.5, tasks: ['Client demo preparation'] },
      ]
    },
    // ... other employees
  };

  // Calculate attendance stats
  const getAttendanceStats = () => {
    if (!employee) return { present: 0, late: 0, absent: 0 };
    
    const attendance = employeeDetails[id]?.attendance || [];
    return {
      present: attendance.filter(a => a.status === 'Present').length,
      late: attendance.filter(a => a.status === 'Late').length,
      absent: 22 - (attendance.filter(a => a.status === 'Present').length + attendance.filter(a => a.status === 'Late').length)
    };
  };

  // Calculate leave usage percentage
  const calculateLeavePercentage = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const attendanceStats = getAttendanceStats();

  useEffect(() => {
    // Find employee by ID
    const foundEmployee = employees.find(emp => emp.id === parseInt(id));
    setEmployee(foundEmployee);
  }, [id]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <title>
        Employee Management - {employee.name} | Admin
      </title>
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {employee.name}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Employee Report Details
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="2023-10">October 2023</option>
                  <option value="2023-09">September 2023</option>
                  <option value="2023-08">August 2023</option>
                  <option value="2023-07">July 2023</option>
                  <option value="2023-06">June 2023</option>
                  <option value="2023-05">May 2023</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-5 w-5 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/admin/reports"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Employee List
        </Link>
        
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-start">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              
              <div className="ml-6 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                    <p className="text-gray-600">{employee.position} • {employee.department}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.status}
                  </span>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* ... existing info fields */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance Summary */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Summary ({selectedMonth})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ... existing attendance cards */}
          </div>
        </div>
        
        {/* Leave Balances */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Balances</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sick Leave */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              {/* ... existing sick leave card */}
            </div>
            
            {/* Casual Leave */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              {/* ... existing casual leave card */}
            </div>
            
            {/* Vacation Leave */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vacation Leave</p>
                  <p className="text-2xl font-bold">
                    {employeeDetails[id]?.leaveBalances?.vacation?.remaining} days
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Used: {employeeDetails[id]?.leaveBalances?.vacation?.used}/{employeeDetails[id]?.leaveBalances?.vacation?.total}</span>
                  <span>{calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.vacation?.used, employeeDetails[id]?.leaveBalances?.vacation?.total)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.vacation?.used, employeeDetails[id]?.leaveBalances?.vacation?.total)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Emergency Leave */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Leave</p>
                  <p className="text-2xl font-bold">
                    {employeeDetails[id]?.leaveBalances?.emergency?.remaining} days
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Used: {employeeDetails[id]?.leaveBalances?.emergency?.used}/{employeeDetails[id]?.leaveBalances?.emergency?.total}</span>
                  <span>{calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.emergency?.used, employeeDetails[id]?.leaveBalances?.emergency?.total)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.emergency?.used, employeeDetails[id]?.leaveBalances?.emergency?.total)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payroll Information - Empty table as requested */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
            Payroll Information
          </h3>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Basic Salary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overtime
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bonuses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Pay
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Empty table body */}
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No payroll records available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Salary History */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary History (Last 6 Months)</h3>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              {/* ... existing salary history table */}
            </table>
          </div>
        </div>
        
        {/* Work Logs */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Work Logs ({selectedMonth})</h3>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours Worked
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasks Completed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeDetails[id]?.workLogs.map((log, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.hours} hours
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <ul className="list-disc pl-5">
                        {log.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Attendance Log */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Log</h3>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock Out
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Done
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeDetails[id]?.attendance.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.clockIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.clockOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.status === 'Present' ? 'bg-green-100 text-green-800' : 
                        entry.status === 'Late' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.reason || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.workDone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementPage;