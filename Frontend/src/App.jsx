import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoutes from './Admin/AdminRoutes.jsx';
import HrRoutes from './HR/HrRoutes.jsx';
import EmployeeRoutes from './Employee/EmployeeRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/hr/*" element={<HrRoutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
        {/* Add HRRoutes and TeamRoutes in future */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
