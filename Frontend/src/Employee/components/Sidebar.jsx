// src/components/Sidebar.js
import { Home, BarChart2, User, LogOut } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: Home, link: '/employee/dashboard' },
  { name: 'Reports', icon: BarChart2, link: '/employee/reports' },
  { name: 'Profile', icon: User, link: '/employee/profile' },
  { name: 'Logout', icon: LogOut, link: '/logout' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed w-64 bg-white h-screen shadow-md p-4 space-y-2 border-r border-gray-200">
      {/* <div className="p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Employee Portal</h1>
      </div> */}
      {navItems.map(({ name, icon: Icon, link }) => {
        const isActive = location.pathname === link;
        return (
          <Link
            key={name}
            to={link}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition ${
              isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
            <span>{name}</span>
          </Link>
        );
      })}
      
      {/* Profile section at bottom */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center gap-3 p-3 border-t border-gray-200">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <div>
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}