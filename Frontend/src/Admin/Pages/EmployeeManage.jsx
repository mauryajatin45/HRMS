import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EmployeeManage() {
  const { id } = useParams();
  const [basicInfo, setBasicInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    position: 'Frontend Developer',
    startDate: '2024-01-01'
  });

  const [docsInfo, setDocsInfo] = useState({
    aadhaar: '',
    pan: '',
    bankName: '',
    accountNumber: '',
    ifsc: ''
  });

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleDocsInfoChange = (e) => {
    const { name, value } = e.target;
    setDocsInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (section) => {
    console.log(`Saved ${section} data`);
    // API call would go here
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <title>Manage Employee | Admin</title>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Employee</h1>
        <p className="text-gray-500 mt-1">ID: {id}</p>
      </div>

      {/* Basic Info Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            <p className="text-gray-500 text-sm mt-1">
              Basic employee details and contact information
            </p>
          </div>
          <button 
            onClick={() => handleSubmit('basic')}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
          >
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={basicInfo.name}
              onChange={handleBasicInfoChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={basicInfo.email}
              onChange={handleBasicInfoChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              name="position"
              value={basicInfo.position}
              onChange={handleBasicInfoChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={basicInfo.startDate}
              onChange={handleBasicInfoChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Financial Details</h2>
            <p className="text-gray-500 text-sm mt-1">
              Government IDs and banking information
            </p>
          </div>
          <button 
            onClick={() => handleSubmit('docs')}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
          >
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aadhaar Number
            </label>
            <input
              name="aadhaar"
              value={docsInfo.aadhaar}
              onChange={handleDocsInfoChange}
              placeholder="XXXX-XXXX-XXXX"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PAN Number
            </label>
            <input
              name="pan"
              value={docsInfo.pan}
              onChange={handleDocsInfoChange}
              placeholder="ABCDE1234F"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              name="bankName"
              value={docsInfo.bankName}
              onChange={handleDocsInfoChange}
              placeholder="e.g. State Bank of India"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              name="accountNumber"
              value={docsInfo.accountNumber}
              onChange={handleDocsInfoChange}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC Code
            </label>
            <input
              name="ifsc"
              value={docsInfo.ifsc}
              onChange={handleDocsInfoChange}
              placeholder="SBIN0000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}