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

// Stats data (would come from API in real app)
const stats = [
  { name: 'Attendance Rate', value: '95%', icon: ClockIcon, color: 'bg-blue-500' },
  { name: 'GitHub Commits', value: '37', icon: CodeBracketIcon, color: 'bg-purple-500' },
  { name: 'Meetings Attended', value: '12/15', icon: VideoCameraIcon, color: 'bg-green-500' },
  { name: 'Performance Score', value: '8.7/10', icon: ChartBarIcon, color: 'bg-yellow-500' },
];

// Recent activities (would come from API in real app)
const activities = [
  { id: 1, type: 'commit', message: 'Fixed bug in user authentication', time: '2 hours ago' },
  { id: 2, type: 'meeting', message: 'Attended sprint planning meeting', time: '4 hours ago' },
  { id: 3, type: 'attendance', message: 'Checked in at 9:05 AM', time: '8 hours ago' },
  { id: 4, type: 'performance', message: 'Completed code review for PR #123', time: '1 day ago' },
  { id: 5, type: 'commit', message: 'Added new feature for dashboard', time: '2 days ago' },
];

// Upcoming events (would come from API in real app)
const events = [
  { id: 1, title: 'Team Standup', time: 'Today, 10:00 AM', type: 'meeting' },
  { id: 2, title: 'Project Deadline', time: 'Tomorrow, 5:00 PM', type: 'deadline' },
  { id: 3, title: 'Code Review Session', time: 'Wed, 2:00 PM', type: 'review' },
  { id: 4, title: 'Monthly Performance Review', time: 'Fri, 11:00 AM', type: 'review' },
];

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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <CalendarIcon className="w-5 h-5 mr-2 inline-block" />
            Check In
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            className="card flex items-center"
            variants={itemVariants}
          >
            <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
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