import { Navigate, Route, Routes } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeManage from "./Pages/EmployeeManage";
import Attendence from "./Pages/Attendance.jsx";
import LeavePage from "./Pages/LeavePage.jsx";
import PayrollPage from './Pages/PayrollPage.jsx'

const AdminRoutes = () => {
  if (!isAdminLoggedIn()) return <Navigate to="/" replace />;

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="employee/manage/:id" element={<EmployeeManage />} />
          <Route path="attendance" element={<Attendence />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="payroll" element={<PayrollPage />} />

          {/* Add more admin routes here */}
        </Routes>
      </main>
    </div>
  );
};

export default AdminRoutes;
