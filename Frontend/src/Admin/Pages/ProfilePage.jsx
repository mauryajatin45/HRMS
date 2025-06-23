// src/Admin/Pages/ProfilePage.jsx
import React, { useState } from 'react';
import { 
  Edit, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  CreditCard,
  CalendarDays as Calendar
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    phone: '+1 (555) 123-4567',
    business: 'Tech Solutions Inc.',
    gstNumber: 'GSTIN-09ABCDE1234F1Z5',
    address: '123 Business Avenue, Suite 400, New York, NY 10001',
    role: 'Administrator',
    joinDate: 'January 15, 2020'
  });

  const [tempData, setTempData] = useState({ ...adminData });

  const handleEditToggle = () => {
    if (isEditing) {
      setTempData({ ...adminData });
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
    setAdminData({ ...tempData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <title>Profile | Admin</title>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal and business information</p>
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
                <h2 className="text-xl font-semibold text-gray-800">{adminData.name}</h2>
                <p className="text-gray-600 mt-1">{adminData.role}</p>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {adminData.joinDate}</span>
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
                        <p className="text-gray-800">{adminData.name}</p>
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
                          <p className="text-gray-800">{adminData.email}</p>
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
                          <p className="text-gray-800">{adminData.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Business Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                    Business Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Business Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="business"
                          value={tempData.business}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter business name"
                        />
                      ) : (
                        <p className="text-gray-800">{adminData.business}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">GST Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="gstNumber"
                          value={tempData.gstNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter GST number"
                        />
                      ) : (
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                          <p className="text-gray-800">{adminData.gstNumber}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Business Address</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={tempData.address}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter business address"
                        />
                      ) : (
                        <p className="text-gray-800">{adminData.address}</p>
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