// ReportPage.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  RotateCw as RefreshIcon,
  ChevronDown,
  Calendar,
  FileText as DocumentTextIcon
} from 'lucide-react';

const ReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample report data
  const reports = [
    {
      id: 1,
      title: 'Employee Attendance',
      description: 'Monthly attendance report with late arrivals and absences',
      category: 'Attendance',
      date: '2023-10-15',
      downloads: 124,
      status: 'Generated'
    },
    {
      id: 2,
      title: 'Payroll Summary',
      description: 'Detailed payroll breakdown with deductions and net pay',
      category: 'Finance',
      date: '2023-10-10',
      downloads: 89,
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Recruitment Pipeline',
      description: 'Current status of candidates in hiring process',
      category: 'Recruitment',
      date: '2023-10-05',
      downloads: 67,
      status: 'Generated'
    },
    {
      id: 4,
      title: 'Performance Reviews',
      description: 'Completed employee performance evaluations',
      category: 'Performance',
      date: '2023-09-28',
      downloads: 142,
      status: 'Generated'
    },
    {
      id: 5,
      title: 'Training Completion',
      description: 'Employee training progress and certification status',
      category: 'Development',
      date: '2023-09-20',
      downloads: 56,
      status: 'Archived'
    },
    {
      id: 6,
      title: 'Employee Turnover',
      description: 'Monthly attrition rate with exit reasons',
      category: 'Analytics',
      date: '2023-09-15',
      downloads: 78,
      status: 'Generated'
    },
  ];

  const categories = ['All', 'Attendance', 'Finance', 'Recruitment', 'Performance', 'Development', 'Analytics'];
  const statuses = ['All', 'Generated', 'Pending', 'Archived'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
              <p className="mt-2 text-sm text-gray-600">
                Generate and manage organizational reports
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <label htmlFor="category" className="mr-2 text-sm font-medium text-gray-700">
                Category:
              </label>
              <div className="relative">
                <select
                  id="category"
                  className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="status" className="mr-2 text-sm font-medium text-gray-700">
                Status:
              </label>
              <div className="relative">
                <select
                  id="status"
                  className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {report.category}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === 'Generated' ? 'bg-green-100 text-green-800' : 
                    report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Generated on {report.date}</span>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Download className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>{report.downloads} downloads</span>
                </div>
              </div>
              
              <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-900">
                  <Eye className="h-5 w-5 mr-1" />
                  Preview
                </button>
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-900">
                  <Download className="h-5 w-5 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                <span className="font-medium">12</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;