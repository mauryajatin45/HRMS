// src/AdminRoutes.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth.js";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ReportEmployeeList from "./Pages/ReportEmployeeList.jsx";
import EmployeeManagementPage from "./Pages/ReportManagementPage.jsx";
import Attendence from "./Pages/Attendance.jsx";
import LeavePage from "./Pages/LeavePage.jsx";
import ProfilePage from './Pages/ProfilePage.jsx';
import EmployeeList from "./Pages/EmployeeList.jsx";
import EmployeeManage from "./Pages/EmployeeManage.jsx";

const AdminRoutes = () => {
  if (!isAdminLoggedIn()) return <Navigate to="/" replace />;

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<ReportEmployeeList />} />
          <Route path="reports/manage/:id" element={<EmployeeManagementPage />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="employee/manage/:id" element={<EmployeeManage />} />
          <Route path="attendance" element={<Attendence />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminRoutes;