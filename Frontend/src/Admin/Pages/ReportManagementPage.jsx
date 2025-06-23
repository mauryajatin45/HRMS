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
  Sun,
  Zap
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
    {
      id: 2,
      name: 'Maria Garcia',
      position: 'HR Manager',
      department: 'Human Resources',
      status: 'Active',
      hireDate: '2019-11-20',
      dob: '1988-12-10',
      email: 'maria.g@company.com',
      phone: '+1 (555) 987-6543',
      salary: 7200,
    },
    {
      id: 3,
      name: 'David Kim',
      position: 'Sales Executive',
      department: 'Sales',
      status: 'On Leave',
      hireDate: '2021-02-05',
      dob: '1992-08-15',
      email: 'david.k@company.com',
      phone: '+1 (555) 456-7890',
      salary: 6500,
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Product Designer',
      department: 'Design',
      status: 'Active',
      hireDate: '2022-01-10',
      dob: '1994-03-28',
      email: 'sarah.w@company.com',
      phone: '+1 (555) 234-5678',
      salary: 7800,
    },
    {
      id: 5,
      name: 'James Wilson',
      position: 'QA Engineer',
      department: 'Engineering',
      status: 'Active',
      hireDate: '2020-07-22',
      dob: '1991-11-05',
      email: 'james.w@company.com',
      phone: '+1 (555) 876-5432',
      salary: 6800,
    },
  ];

  // Employee details with leave balances
  const employeeDetails = {
    1: {
      attendance: [
        { date: '2023-10-01', clockIn: '08:45', clockOut: '17:30', status: 'Late', reason: 'Traffic jam', workDone: 'Implemented new API endpoints' },
        { date: '2023-10-02', clockIn: '09:00', clockOut: '17:45', status: 'Late', reason: 'Car trouble', workDone: 'Fixed UI bugs' },
        { date: '2023-10-03', clockIn: '08:30', clockOut: '17:15', status: 'Present', reason: '', workDone: 'Team meeting, code reviews' },
        { date: '2023-10-04', clockIn: '08:25', clockOut: '17:40', status: 'Present', reason: '', workDone: 'Deployed new features' },
        { date: '2023-10-05', clockIn: '08:50', clockOut: '17:20', status: 'Late', reason: 'Family emergency', workDone: 'Documentation updates' },
        { date: '2023-10-06', clockIn: '08:30', clockOut: '16:45', status: 'Present', reason: '', workDone: 'Weekly planning' },
      ],
      salaryHistory: [
        { date: '2023-10-05', base: 8500, bonus: 1200, deduction: 350, net: 9350 },
        { date: '2023-09-05', base: 8500, bonus: 1000, deduction: 350, net: 9150 },
        { date: '2023-08-05', base: 8500, bonus: 800, deduction: 350, net: 8950 },
        { date: '2023-07-05', base: 8500, bonus: 1500, deduction: 350, net: 9650 },
        { date: '2023-06-05', base: 8500, bonus: 900, deduction: 350, net: 9050 },
        { date: '2023-05-05', base: 8500, bonus: 1100, deduction: 350, net: 9250 },
      ],
      leaveBalances: {
        sick: { total: 7, used: 3, remaining: 4 },
        casual: { total: 7, used: 5, remaining: 2 },
      }
    },
    // Similar data for other employees...
    2: {
      // ... other data
      leaveBalances: {
        sick: { total: 10, used: 2, remaining: 8 },
        casual: { total: 12, used: 4, remaining: 8 },
        vacation: { total: 20, used: 10, remaining: 10 },
        emergency: { total: 5, used: 0, remaining: 5 }
      }
    },
    3: {
      // ... other data
      leaveBalances: {
        sick: { total: 10, used: 5, remaining: 5 },
        casual: { total: 12, used: 3, remaining: 9 },
        vacation: { total: 20, used: 15, remaining: 5 },
        emergency: { total: 5, used: 2, remaining: 3 }
      }
    },
    4: {
      // ... other data
      leaveBalances: {
        sick: { total: 10, used: 1, remaining: 9 },
        casual: { total: 12, used: 6, remaining: 6 },
        vacation: { total: 20, used: 5, remaining: 15 },
        emergency: { total: 5, used: 0, remaining: 5 }
      }
    },
    5: {
      // ... other data
      leaveBalances: {
        sick: { total: 10, used: 4, remaining: 6 },
        casual: { total: 12, used: 2, remaining: 10 },
        vacation: { total: 20, used: 12, remaining: 8 },
        emergency: { total: 5, used: 3, remaining: 2 }
      }
    }
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
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{employee.dob}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Hire Date</p>
                      <p className="font-medium">{employee.hireDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{employee.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance Summary */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Summary ({selectedMonth})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Days Present</p>
                  <p className="text-2xl font-bold">{attendanceStats.present}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Late Arrivals</p>
                  <p className="text-2xl font-bold">{attendanceStats.late}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Absences</p>
                  <p className="text-2xl font-bold">{attendanceStats.absent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leave Balances */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Balances</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sick Leave */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <HeartPulse className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sick Leave</p>
                  <p className="text-2xl font-bold">
                    {employeeDetails[id]?.leaveBalances?.sick?.remaining} days
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Used: {employeeDetails[id]?.leaveBalances?.sick?.used}/{employeeDetails[id]?.leaveBalances?.sick?.total}</span>
                  <span>{calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.sick?.used, employeeDetails[id]?.leaveBalances?.sick?.total)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.sick?.used, employeeDetails[id]?.leaveBalances?.sick?.total)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Casual Leave */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Coffee className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Casual Leave</p>
                  <p className="text-2xl font-bold">
                    {employeeDetails[id]?.leaveBalances?.casual?.remaining} days
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Used: {employeeDetails[id]?.leaveBalances?.casual?.used}/{employeeDetails[id]?.leaveBalances?.casual?.total}</span>
                  <span>{calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.casual?.used, employeeDetails[id]?.leaveBalances?.casual?.total)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${calculateLeavePercentage(employeeDetails[id]?.leaveBalances?.casual?.used, employeeDetails[id]?.leaveBalances?.casual?.total)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Salary History */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary History (Last 6 Months)</h3>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Salary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incentives/Bonus
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Pay
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeDetails[id]?.salaryHistory.map((salary, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {salary.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${salary.base}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      +${salary.bonus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      -${salary.deduction}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${salary.net}
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
                      {entry.reason}
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