import { Home, Users, CalendarDays, FileText, BarChart2, User, LogOut } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: Home, link: '/hr/dashboard' },
  { name: 'Employee', icon: Users, link: '/hr/employee', matchPrefix: '/hr/employee' },
  { name: 'Attendance', icon: CalendarDays, link: '/hr/attendance' },
  { name: 'Leave', icon: FileText, link: '/hr/leave' },
  { name: 'Reports', icon: BarChart2, link: '/hr/reports' , matchPrefix: '/hr/reports' },
  { name: 'Profile', icon: User, link: '/hr/profile' },
  { name: 'Logout', icon: LogOut, link: '/logout' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed w-64 bg-white h-screen shadow-md p-4 space-y-2">
      {navItems.map(({ name, icon: Icon, link, matchPrefix }) => {
        const isActive = matchPrefix
          ? location.pathname.startsWith(matchPrefix)
          : location.pathname === link;

        return (
          <Link
            key={name}
            to={link}
            className={`flex items-center gap-3 px-3 py-2 rounded font-medium transition ${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <Icon size={18} />
            {name}
          </Link>
        );
      })}
    </aside>
  );
}
