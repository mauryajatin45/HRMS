// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './Admin/AdminRoutes.jsx';
import HrRoutes from './HR/HrRoutes.jsx';
import EmployeeRoutes from './Employee/EmployeeRoutes.jsx';
import Login from './auth/Login'; // Import the new Login component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/hr/*" element={<HrRoutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;