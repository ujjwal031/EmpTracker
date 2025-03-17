'use client';

import { 
  UserGroupIcon, 
  ClockIcon, 
  CalendarIcon, 
  ChartBarIcon,
  CodeBracketIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: string;
}

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface Event {
  id: number;
  title: string;
  time: string;
  type: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    attendanceRate: '0%',
    githubCommits: '0',
    meetingsAttended: '0/0',
    performanceScore: '0/10',
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkedOutToday, setCheckedOutToday] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch attendance data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchAttendance();
      fetchActivities();
    }
  }, [status, session]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch('/api/attendance');
      if (!response.ok) throw new Error('Failed to fetch attendance');
      
      const data = await response.json();
      setAttendance(data);
      
      // Check if already checked in/out today
      const today = new Date().toISOString().split('T')[0];
      const todayRecord = data.find((record: AttendanceRecord) => 
        new Date(record.date).toISOString().split('T')[0] === today
      );
      
      if (todayRecord) {
        setCheckedInToday(true);
        setCheckedOutToday(!!todayRecord.checkOut);
      }
      
      // Calculate attendance rate
      if (data.length > 0) {
        const workingDays = 20; // Assuming 20 working days in a month
        const present = data.filter((record: AttendanceRecord) => 
          record.status === 'PRESENT' || record.status === 'LATE'
        ).length;
        const rate = Math.round((present / workingDays) * 100);
        setStats(prev => ({ ...prev, attendanceRate: `${rate}%` }));
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchActivities = async () => {
    // In a real app, this would come from your API
    // For now, we'll use static data with dates based on current time
    setActivities([
      { id: 1, type: 'commit', message: 'Fixed bug in user authentication', time: '2 hours ago' },
      { id: 2, type: 'meeting', message: 'Attended sprint planning meeting', time: '4 hours ago' },
      { id: 3, type: 'attendance', message: 'Checked in at 9:05 AM', time: '8 hours ago' },
      { id: 4, type: 'performance', message: 'Completed code review for PR #123', time: '1 day ago' },
      { id: 5, type: 'commit', message: 'Added new feature for dashboard', time: '2 days ago' },
    ]);

    setEvents([
      { id: 1, title: 'Team Standup', time: 'Today, 10:00 AM', type: 'meeting' },
      { id: 2, title: 'Project Deadline', time: 'Tomorrow, 5:00 PM', type: 'deadline' },
      { id: 3, title: 'Code Review Session', time: 'Wed, 2:00 PM', type: 'review' },
      { id: 4, title: 'Monthly Performance Review', time: 'Fri, 11:00 AM', type: 'review' },
    ]);
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'check-in',
          notes: 'Checked in via dashboard',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to check in');
      }

      setCheckedInToday(true);
      fetchAttendance(); // Refresh attendance data
    } catch (error) {
      console.error('Check-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'check-out',
          notes: 'Checked out via dashboard',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to check out');
      }

      setCheckedOutToday(true);
      fetchAttendance(); // Refresh attendance data
    } catch (error) {
      console.error('Check-out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
          {session?.user?.name && (
            <span className="ml-2 text-lg font-normal text-gray-600 dark:text-gray-400">
              Welcome, {session.user.name}
            </span>
          )}
        </h1>
        <div className="flex space-x-2">
          {!checkedInToday ? (
            <button 
              className="btn-primary"
              onClick={handleCheckIn}
              disabled={isLoading}
            >
              <ClockIcon className="w-5 h-5 mr-2 inline-block" />
              Check In
            </button>
          ) : !checkedOutToday ? (
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={handleCheckOut}
              disabled={isLoading}
            >
              <ClockIcon className="w-5 h-5 mr-2 inline-block" />
              Check Out
            </button>
          ) : (
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 py-2 px-4 rounded-md">
              <span className="text-sm">Day Complete</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="card flex items-center"
          variants={itemVariants}
        >
          <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
            <ClockIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance Rate</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.attendanceRate}</p>
          </div>
        </motion.div>

        <motion.div
          className="card flex items-center"
          variants={itemVariants}
        >
          <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
            <CodeBracketIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Commits</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.githubCommits}</p>
          </div>
        </motion.div>

        <motion.div
          className="card flex items-center"
          variants={itemVariants}
        >
          <div className="p-3 rounded-full bg-green-500 text-white mr-4">
            <VideoCameraIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Meetings Attended</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.meetingsAttended}</p>
          </div>
        </motion.div>

        <motion.div
          className="card flex items-center"
          variants={itemVariants}
        >
          <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
            <ChartBarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Performance Score</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.performanceScore}</p>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mr-3">
                  {activity.type === 'commit' && (
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <CodeBracketIcon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                    </div>
                  )}
                  {activity.type === 'meeting' && (
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <VideoCameraIcon className="w-5 h-5 text-green-500 dark:text-green-300" />
                    </div>
                  )}
                  {activity.type === 'attendance' && (
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <ClockIcon className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                    </div>
                  )}
                  {activity.type === 'performance' && (
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <ChartBarIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Upcoming Events */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Events</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View Calendar</button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium text-gray-800 dark:text-white">{event.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 