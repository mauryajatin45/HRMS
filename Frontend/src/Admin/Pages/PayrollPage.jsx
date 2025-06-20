// src/pages/PayrollPage.jsx
import { useState } from 'react';

export default function PayrollPage() {
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('2025-06');
  const [status, setStatus] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showRunPayrollDialog, setShowRunPayrollDialog] = useState(false);
  const [payrollPeriod, setPayrollPeriod] = useState('2025-07');
  const [payrollDate, setPayrollDate] = useState('2025-07-05');

  // Mock payroll data
  const payrollData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'Senior Developer',
      baseSalary: 125000,
      overtime: 18000,
      bonus: 25000,
      deductions: 21000,
      netPay: 147000,
      paymentDate: '2025-06-30',
      status: 'Paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'UX Designer',
      baseSalary: 95000,
      overtime: 12000,
      bonus: 15000,
      deductions: 16500,
      netPay: 105500,
      paymentDate: '2025-06-30',
      status: 'Paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      position: 'Project Manager',
      baseSalary: 185000,
      overtime: 25000,
      bonus: 35000,
      deductions: 37500,
      netPay: 207500,
      paymentDate: '2025-06-30',
      status: 'Paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 4,
      name: 'Ananya Patel',
      position: 'Marketing Specialist',
      baseSalary: 85000,
      overtime: 8000,
      bonus: 12000,
      deductions: 14500,
      netPay: 90500,
      paymentDate: '',
      status: 'Pending',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 5,
      name: 'Arjun Reddy',
      position: 'DevOps Engineer',
      baseSalary: 135000,
      overtime: 18000,
      bonus: 20000,
      deductions: 24500,
      netPay: 148500,
      paymentDate: '',
      status: 'Pending',
      paymentMethod: 'Bank Transfer'
    },
  ];

  // Filter payroll data
  const filteredData = payrollData.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()) &&
    (status === '' || employee.status === status)
  );

  // Calculate totals
  const totalPayroll = filteredData.reduce((sum, emp) => sum + emp.netPay, 0);
  const paidCount = filteredData.filter(emp => emp.status === 'Paid').length;
  const pendingCount = filteredData.filter(emp => emp.status === 'Pending').length;

  // Format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // View employee details
  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  // Process payment
  const processPayment = (id) => {
    const updatedData = payrollData.map(emp => 
      emp.id === id ? { ...emp, status: 'Paid', paymentDate: '2025-06-30' } : emp
    );
    // In real app, this would update state or API
    console.log(`Processed payment for employee ID: ${id}`);
  };

  // Process all pending payments
  const runPayroll = () => {
    console.log(`Running payroll for ${payrollPeriod} with payment date ${payrollDate}`);
    setShowRunPayrollDialog(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Payroll Management</h1>
        <p className="text-gray-500 mt-1">Process and manage employee payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Total Payroll</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(totalPayroll)}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Total Employees</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{filteredData.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Paid</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{paidCount}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Pending</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Payroll Period</h2>
            <p className="text-gray-500 text-sm mt-1">Select period to process payroll</p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <select
                value={period}
                onChange={e => setPeriod(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm"
              >
                <option value="2025-06">June 2025</option>
                <option value="2025-05">May 2025</option>
                <option value="2025-04">April 2025</option>
                <option value="2025-03">March 2025</option>
              </select>
              
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
              
              <button 
                onClick={() => setShowRunPayrollDialog(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Run Payroll
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Salary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Additions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((employee) => {
                  const statusColor = employee.status === 'Paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800';
                  
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.paymentMethod}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{employee.position}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{formatCurrency(employee.baseSalary)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          +{formatCurrency(employee.overtime + employee.bonus)}
                          <div className="text-xs text-gray-500">
                            OT: {formatCurrency(employee.overtime)}, Bonus: {formatCurrency(employee.bonus)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-red-600">-{formatCurrency(employee.deductions)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(employee.netPay)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => viewEmployeeDetails(employee)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"
                          >
                            Details
                          </button>
                          {employee.status === 'Pending' && (
                            <button 
                              onClick={() => processPayment(employee.id)}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700"
                            >
                              Pay
                            </button>
                          )}
                          <button 
                            onClick={() => setShowPayslipModal(true)}
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700"
                          >
                            Payslip
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search query</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats footer */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-500">
        <div>
          Showing {filteredData.length} of {payrollData.length} employees
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Export to Excel
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Print Payroll Report
          </button>
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Employee Payroll Details</h2>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{selectedEmployee.name}</h3>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <p className="text-gray-500 text-sm mt-1">Payment Method: {selectedEmployee.paymentMethod}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Earnings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Salary</span>
                      <span className="font-medium">{formatCurrency(selectedEmployee.baseSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overtime</span>
                      <span className="font-medium">{formatCurrency(selectedEmployee.overtime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bonus</span>
                      <span className="font-medium">{formatCurrency(selectedEmployee.bonus)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-800 font-medium">Total Earnings</span>
                      <span className="font-medium">
                        {formatCurrency(selectedEmployee.baseSalary + selectedEmployee.overtime + selectedEmployee.bonus)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Deductions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Income Tax</span>
                      <span className="text-red-600">-{formatCurrency(selectedEmployee.deductions * 0.5)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provident Fund</span>
                      <span className="text-red-600">-{formatCurrency(selectedEmployee.deductions * 0.3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Professional Tax</span>
                      <span className="text-red-600">-{formatCurrency(selectedEmployee.deductions * 0.1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance</span>
                      <span className="text-red-600">-{formatCurrency(selectedEmployee.deductions * 0.1)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-800 font-medium">Total Deductions</span>
                      <span className="text-red-600 font-medium">-{formatCurrency(selectedEmployee.deductions)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-indigo-800">Net Pay</h4>
                    <p className="text-2xl font-bold text-indigo-700">
                      {formatCurrency(selectedEmployee.netPay)}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedEmployee.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedEmployee.status}
                      </span>
                    </p>
                  </div>
                  {selectedEmployee.status === 'Pending' && (
                    <button 
                      onClick={() => {
                        processPayment(selectedEmployee.id);
                        setSelectedEmployee(null);
                      }}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                    >
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payslip Modal */}
      {showPayslipModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Employee Payslip</h2>
              <button 
                onClick={() => setShowPayslipModal(false)}
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-lg font-bold">Tech Solutions India Pvt. Ltd.</div>
                  <div className="text-gray-600">123 Business Park, Sector 18</div>
                  <div className="text-gray-600">Gurugram, Haryana 122001</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">Payslip</div>
                  <div className="text-gray-600">Period: June 1-30, 2025</div>
                  <div className="text-gray-600">Issued: June 30, 2025</div>
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="font-bold">Rajesh Kumar</div>
                  <div>Senior Developer</div>
                  <div>Employee ID: EMP-001</div>
                </div>
                <div className="text-right">
                  <div>Payment Method: Bank Transfer</div>
                  <div>Account: **** **** **** 1234</div>
                  <div>Payment Date: June 30, 2025</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Earnings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Basic Salary</span>
                      <span>{formatCurrency(125000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>House Rent Allowance</span>
                      <span>{formatCurrency(50000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime</span>
                      <span>{formatCurrency(18000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance Bonus</span>
                      <span>{formatCurrency(25000)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                      <span>Total Earnings</span>
                      <span>{formatCurrency(218000)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Deductions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Income Tax</span>
                      <span className="text-red-600">-{formatCurrency(31500)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provident Fund (PF)</span>
                      <span className="text-red-600">-{formatCurrency(12500)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Professional Tax</span>
                      <span className="text-red-600">-{formatCurrency(2400)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Insurance</span>
                      <span className="text-red-600">-{formatCurrency(3500)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                      <span>Total Deductions</span>
                      <span className="text-red-600">-{formatCurrency(49900)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-indigo-800">Net Pay</div>
                  <div className="text-2xl font-bold text-indigo-700">{formatCurrency(168100)}</div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                  Download Payslip (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Run Payroll Dialog */}
      {showRunPayrollDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Run Payroll</h2>
              <button 
                onClick={() => setShowRunPayrollDialog(false)}
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payroll Period
                  </label>
                  <select
                    value={payrollPeriod}
                    onChange={e => setPayrollPeriod(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  >
                    <option value="2025-07">July 2025</option>
                    <option value="2025-06">June 2025</option>
                    <option value="2025-05">May 2025</option>
                    <option value="2025-04">April 2025</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={payrollDate}
                    onChange={e => setPayrollDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Running payroll will process payments for all pending employees. This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowRunPayrollDialog(false)}
                  className="px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={runPayroll}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                >
                  Run Payroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}