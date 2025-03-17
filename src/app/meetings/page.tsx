'use client';

import { VideoCameraIcon, CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Mock upcoming meetings (would come from API in real app)
const upcomingMeetings = [
  { id: 1, title: 'Daily Standup', time: 'Today, 10:00 AM', duration: '15 min', participants: 8, link: 'https://meet.google.com/abc-defg-hij' },
  { id: 2, title: 'Product Demo', time: 'Today, 2:00 PM', duration: '45 min', participants: 12, link: 'https://meet.google.com/klm-nopq-rst' },
  { id: 3, title: 'Sprint Planning', time: 'Tomorrow, 11:00 AM', duration: '1 hour', participants: 10, link: 'https://meet.google.com/uvw-xyz-123' },
  { id: 4, title: 'Team Retrospective', time: 'Friday, 4:00 PM', duration: '1 hour', participants: 8, link: 'https://meet.google.com/456-789-abc' },
];

// Mock past meetings (would come from API in real app)
const pastMeetings = [
  { id: 1, title: 'Daily Standup', date: 'Yesterday', duration: '15 min', attended: true },
  { id: 2, title: 'Client Meeting', date: '2 days ago', duration: '1 hour', attended: true },
  { id: 3, title: 'Team Sync', date: '3 days ago', duration: '30 min', attended: true },
  { id: 4, title: 'Project Kickoff', date: '1 week ago', duration: '1.5 hours', attended: false },
  { id: 5, title: 'Daily Standup', date: '1 week ago', duration: '15 min', attended: true },
  { id: 6, title: 'Architecture Review', date: '2 weeks ago', duration: '1 hour', attended: true },
];

// Mock meeting stats (would come from API in real app)
const meetingStats = {
  attended: 28,
  missed: 2,
  attendanceRate: '93%',
  totalHours: 42,
};

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Meetings</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <VideoCameraIcon className="w-5 h-5 mr-2 inline-block" />
            Join Meeting
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-green-500 text-white mr-4">
            <VideoCameraIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Meetings Attended</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{meetingStats.attended}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-red-500 text-white mr-4">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Meetings Missed</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{meetingStats.missed}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
            <UserGroupIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance Rate</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{meetingStats.attendanceRate}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
            <ClockIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Hours</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{meetingStats.totalHours}</p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Meetings */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Meetings</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View Calendar</button>
          </div>
          
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <motion.div 
                key={meeting.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{meeting.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{meeting.time}</span>
                      <span className="mx-2">•</span>
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span>{meeting.duration}</span>
                      <span className="mx-2">•</span>
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      <span>{meeting.participants} participants</span>
                    </div>
                  </div>
                  <a 
                    href={meeting.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors duration-200"
                  >
                    Join
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Meeting Tips */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Meeting Tips</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="font-medium text-blue-700 dark:text-blue-300">Be Prepared</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Review the agenda and any relevant documents before the meeting.</p>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="font-medium text-green-700 dark:text-green-300">Be On Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Join meetings a few minutes early to ensure everything is working properly.</p>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h3 className="font-medium text-purple-700 dark:text-purple-300">Stay Engaged</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Participate actively and avoid multitasking during meetings.</p>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h3 className="font-medium text-yellow-700 dark:text-yellow-300">Follow Up</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Take notes and follow up on action items assigned to you.</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Past Meetings */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Past Meetings</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Meeting</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {pastMeetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{meeting.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{meeting.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{meeting.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      meeting.attended 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {meeting.attended ? 'Attended' : 'Missed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 