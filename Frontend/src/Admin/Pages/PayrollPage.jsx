// src/pages/PayrollPage.jsx
import { useState } from 'react';

export default function PayrollPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [payrollData, setPayrollData] = useState([
    // ... existing mock data ...
  ]);
  
  // New state for salary processing form
  const [salaryForm, setSalaryForm] = useState({
    employeeId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    baseSalary: '',
    overtime: '',
    bonus: '',
    deductions: '',
    deductionReason: '',
    netPay: '',
  });
  
  // Employee data for dropdown
  const employees = [
    { id: 1, name: 'Rajesh Kumar', position: 'Senior Developer' },
    { id: 2, name: 'Priya Sharma', position: 'UX Designer' },
    { id: 3, name: 'Vikram Singh', position: 'Project Manager' },
    { id: 4, name: 'Ananya Patel', position: 'Marketing Specialist' },
    { id: 5, name: 'Arjun Reddy', position: 'DevOps Engineer' },
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Calculate net pay when relevant fields change
    if (['baseSalary', 'overtime', 'bonus', 'deductions'].includes(name)) {
      const base = parseFloat(salaryForm.baseSalary) || 0;
      const overtime = parseFloat(salaryForm.overtime) || 0;
      const bonus = parseFloat(salaryForm.bonus) || 0;
      const deductions = parseFloat(salaryForm.deductions) || 0;
      
      // Only update net pay if we're not changing the netPay field itself
      if (name !== 'netPay') {
        const netPay = base + overtime + bonus - deductions;
        setSalaryForm(prev => ({
          ...prev,
          [name]: value,
          netPay: isNaN(netPay) ? '' : netPay
        }));
        return;
      }
    }
    
    setSalaryForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmitSalary = (e) => {
    e.preventDefault();
    
    const employee = employees.find(emp => emp.id === parseInt(salaryForm.employeeId));
    
    if (!employee) {
      alert('Please select an employee');
      return;
    }
    
    const newEntry = {
      id: payrollData.length + 1,
      name: employee.name,
      position: employee.position,
      baseSalary: parseFloat(salaryForm.baseSalary),
      overtime: parseFloat(salaryForm.overtime),
      bonus: parseFloat(salaryForm.bonus),
      deductions: parseFloat(salaryForm.deductions),
      netPay: parseFloat(salaryForm.netPay),
      paymentDate: salaryForm.paymentDate,
      status: 'Paid',
      paymentMethod: 'Bank Transfer'
    };
    
    setPayrollData(prev => [...prev, newEntry]);
    
    // Reset form
    setSalaryForm({
      employeeId: '',
      paymentDate: new Date().toISOString().split('T')[0],
      baseSalary: '',
      overtime: '',
      bonus: '',
      deductions: '',
      deductionReason: '',
      netPay: '',
    });
    
    alert('Salary processed successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <title>Payroll | Admin</title>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Payroll Management</h1>
        <p className="text-gray-500 mt-1">Process salaries and view payment history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Salary Processing Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Process Salary</h2>
          
          <form onSubmit={handleSubmitSalary} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Employee
              </label>
              <select
                name="employeeId"
                value={salaryForm.employeeId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              >
                <option value="">Select an employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.position}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date
              </label>
              <input
                type="date"
                name="paymentDate"
                value={salaryForm.paymentDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Salary (₹)
                </label>
                <input
                  type="number"
                  name="baseSalary"
                  value={salaryForm.baseSalary}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overtime (₹)
                </label>
                <input
                  type="number"
                  name="overtime"
                  value={salaryForm.overtime}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bonus/Incentives (₹)
                </label>
                <input
                  type="number"
                  name="bonus"
                  value={salaryForm.bonus}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deductions (₹)
                </label>
                <input
                  type="number"
                  name="deductions"
                  value={salaryForm.deductions}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deduction Reason (Optional)
              </label>
              <input
                type="text"
                name="deductionReason"
                value={salaryForm.deductionReason}
                onChange={handleInputChange}
                placeholder="Late arrival, damage, etc."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="font-medium text-indigo-800">Net Pay</div>
                <div className="text-2xl font-bold text-indigo-700">
                  {salaryForm.netPay ? formatCurrency(salaryForm.netPay) : '₹0'}
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Process Salary Payment
            </button>
          </form>
        </div>
        
        {/* Transactions Section */}
        <div>
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
                <h2 className="text-lg font-semibold text-gray-800">Salary Transactions</h2>
                <p className="text-gray-500 text-sm mt-1">Past salary payments and records</p>
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
                
                <div className="flex gap-3">
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm"
                  >
                    <option value="">All Statuses</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                  
                  <button className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Export
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
                      Payment Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Pay
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
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
                              {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" /> */}
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                <div className="text-xs text-gray-500">{employee.position}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {employee.paymentDate || 'Pending'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(employee.netPay)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No payroll records found</h3>
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
              Showing {filteredData.length} of {payrollData.length} records
            </div>
            <div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}