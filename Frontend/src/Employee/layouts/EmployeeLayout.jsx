// src/layouts/EmployeeLayout.js
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function EmployeeLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}