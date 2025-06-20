import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoutes from './Admin/AdminRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* Add HRRoutes and TeamRoutes in future */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
