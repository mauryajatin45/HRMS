// src/HR/Pages/HRProfilePage.jsx
import React, { useState } from 'react';
import { 
  Edit, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Lock,
  Calendar,
  FileText
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hrData, setHrData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 987-6543',
    department: 'Human Resources',
    position: 'HR Manager',
    employeeId: 'HR-001',
    joinDate: 'March 10, 2021',
    responsibilities: 'Recruitment, Employee Relations, Benefits Administration'
  });

  const [tempData, setTempData] = useState({ ...hrData });

  const handleEditToggle = () => {
    if (isEditing) {
      setTempData({ ...hrData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value
    });
  };

  const handleSave = () => {
    setHrData({ ...tempData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <title>HR Profile | Shivaurica</title>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">HR Profile</h1>
            <p className="text-gray-600 mt-1">Manage your professional information</p>
          </div>
          
          <button 
            onClick={handleEditToggle}
            className={`mt-4 md:mt-0 flex items-center cursor-pointer px-5 py-2.5 rounded-lg transition-all ${
              isEditing 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* Profile Header */}
            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-4" />
                <h2 className="text-xl font-semibold text-gray-800">{hrData.name}</h2>
                <p className="text-gray-600 mt-1">{hrData.position}</p>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {hrData.joinDate}</span>
                </div>
              </div>
            </div>
            
            {/* Profile Information */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-gray-500" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={tempData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-gray-800">{hrData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={tempData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <p className="text-gray-800">{hrData.email}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={tempData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <p className="text-gray-800">{hrData.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                    Professional Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Employee ID</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="employeeId"
                          value={tempData.employeeId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter employee ID"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 text-gray-400 mr-2" />
                          <p className="text-gray-800">{hrData.employeeId}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="department"
                          value={tempData.department}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter department"
                        />
                      ) : (
                        <p className="text-gray-800">{hrData.department}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Position</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="position"
                          value={tempData.position}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter position"
                        />
                      ) : (
                        <p className="text-gray-800">{hrData.position}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Key Responsibilities</label>
                      {isEditing ? (
                        <textarea
                          name="responsibilities"
                          value={tempData.responsibilities}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your responsibilities"
                        />
                      ) : (
                        <div className="flex items-start">
                          <FileText className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-gray-800">{hrData.responsibilities}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Save Button when editing */}
              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="flex items-center cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional information */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: March 15, 2023 at 2:45 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;