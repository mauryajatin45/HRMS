import { Home, Users, CalendarDays, FileText, BarChart2, User, LogOut } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: Home, link: '/admin/dashboard' },
  { name: 'Employee', icon: Users, link: '/admin/employee' },
  { name: 'Attendance', icon: CalendarDays, link: '/admin/attendance' },
  { name: 'Leave', icon: FileText, link: '/admin/leave' },
  { name: 'Payroll', icon: FileText, link: '/admin/payroll' },
  { name: 'Reports', icon: BarChart2, link: '/admin/reports' },
  { name: 'Profile', icon: User, link: '/admin/profile' },
  { name: 'Logout', icon: LogOut, link: '/logout' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white h-screen shadow-md p-4 space-y-2">
      {navItems.map(({ name, icon: Icon, link }) => {
        const isActive = location.pathname === link;
        return (
          <Link
            key={name}
            to={link}
            className={`flex items-center gap-3 px-3 py-2 rounded font-medium transition
              ${isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:text-blue-600'}
            `}
          >
            <Icon size={18} />
            {name}
          </Link>
        );
      })}
    </aside>
  );
}
