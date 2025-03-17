'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UserIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  VideoCameraIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Attendance', href: '/attendance', icon: CalendarIcon },
  { name: 'GitHub Updates', href: '/github', icon: CodeBracketIcon },
  { name: 'Meetings', href: '/meetings', icon: VideoCameraIcon },
  { name: 'Performance', href: '/performance', icon: ChartBarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed left-0 top-0 shadow-sm z-20">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          EmpTrack
        </Link>
      </div>
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <li key={item.name}>
                <Link href={item.href} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium relative ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 w-1 h-full bg-blue-600 dark:bg-blue-400 rounded-r-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link href="/settings" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium relative ${
            pathname === '/settings' 
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800' 
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}>
            <Cog6ToothIcon className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </div>
      </nav>
      <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-800 p-4">
        <Link href="/login" className="flex items-center text-red-500 hover:text-red-600 font-medium text-sm w-full">
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </Link>
      </div>
    </div>
  );
} 