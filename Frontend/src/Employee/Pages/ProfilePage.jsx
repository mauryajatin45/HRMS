// src/pages/Profile.js
export default function Profile() {
  const employeeData = {
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2020"
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-800 mb-8">My Profile</h1>
      <title>Profile | Employee</title>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl">
        <div className="flex items-center mb-8">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{employeeData.name}</h2>
            <p className="text-blue-600">{employeeData.position}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInfo label="Department" value={employeeData.department} />
          <ProfileInfo label="Email" value={employeeData.email} />
          <ProfileInfo label="Phone" value={employeeData.phone} />
          <ProfileInfo label="Join Date" value={employeeData.joinDate} />
        </div>
      </div>
    </div>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}