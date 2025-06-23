import { useState, useMemo } from 'react';

export default function Attendance() {
  const [month, setMonth] = useState(1); // Default to February
  const [year, setYear] = useState(2024);
  const [search, setSearch] = useState('');
  
  // Calculate days in selected month
  const daysInMonth = useMemo(() => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  }, [month, year]);
  
  // Get day names for the selected month
  const dayNames = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(year, month, i + 1);
      return day.toLocaleDateString('en-US', { weekday: 'short' });
    });
  }, [month, year, daysInMonth]);
  
  // Calculate attendance statistics
  const calculateStats = (data) => {
    const presentCount = data.filter(status => status === 'P').length;
    const absentCount = data.filter(status => status === 'A').length;
    const leaveCount = data.filter(status => status === 'L').length;
    const percentage = Math.round((presentCount / daysInMonth) * 100);
    
    return { presentCount, absentCount, leaveCount, percentage };
  };

  const employees = [
    { 
      name: 'John Doe', 
      position: 'Frontend Developer',
      data: ['P', 'P', 'A', 'P', 'P', 'P', 'A', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] 
    },
    { 
      name: 'Paul Wilson', 
      position: 'UX Designer',
      data: ['P', 'A', 'P', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] 
    },
    { 
      name: 'Emma Jones', 
      position: 'Backend Developer',
      data: ['A', 'P', 'P', 'A', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] 
    },
    { 
      name: 'Sarah Davis', 
      position: 'Product Manager',
      data: ['A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] 
    },
    { 
      name: 'Michael Brown', 
      position: 'DevOps Engineer',
      data: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] 
    },
    { 
      name: 'Lisa Taylor', 
      position: 'QA Specialist',
      data: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] 
    }
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase())
  );

  // Month options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Year options
  const years = [2023, 2024, 2025];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Attendance Tracker</h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage employee attendance records
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
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
              placeholder="Search employees or positions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm bg-white"
            >
              {months.map((m, index) => (
                <option key={m} value={index}>{m}</option>
              ))}
            </select>
            
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm bg-white"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Total Employees</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{employees.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Avg. Attendance</div>
          <div className="text-2xl font-bold text-green-600 mt-1">94%</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Days in Month</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{daysInMonth}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-gray-500 text-sm">Working Days</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">22</div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Employee
                </th>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th key={i} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="text-xs text-gray-900">{i + 1}</div>
                    <div className="text-[10px] text-gray-500">{dayNames[i]}</div>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((emp, idx) => {
                const stats = calculateStats(emp.data.slice(0, daysInMonth));
                
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    {/* Fixed employee info column */}
                    <td className="px-6 py-4 sticky left-0 bg-white z-10">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.position}</div>
                      </div>
                    </td>
                    
                    {/* Attendance data - scrollable */}
                    {emp.data.slice(0, daysInMonth).map((val, i) => (
                      <td key={i} className="text-center px-1 py-4">
                        <div className="flex justify-center">
                          <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
                            val === 'P' ? 'bg-green-100 text-green-700' :
                            val === 'A' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {val}
                          </div>
                        </div>
                      </td>
                    ))}
                    
                    {/* Summary column - fixed position */}
                    <td className="px-6 py-4 text-center sticky right-0 bg-white z-10">
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {stats.percentage}%
                        </div>
                        <div className="flex space-x-1 mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                            P: {stats.presentCount}
                          </span>
                          <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                            A: {stats.absentCount}
                          </span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                            L: {stats.leaveCount}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
          {filteredEmployees.length === 0 && (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend and Info */}
      <div className="mt-6 flex flex-wrap gap-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-100 rounded-full mr-2 flex items-center justify-center">
              <span className="text-xs text-green-700 font-bold">P</span>
            </div>
            <span className="text-sm text-gray-600">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-100 rounded-full mr-2 flex items-center justify-center">
              <span className="text-xs text-red-700 font-bold">A</span>
            </div>
            <span className="text-sm text-gray-600">Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-yellow-100 rounded-full mr-2 flex items-center justify-center">
              <span className="text-xs text-yellow-700 font-bold">L</span>
            </div>
            <span className="text-sm text-gray-600">Leave</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing: {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  );
}