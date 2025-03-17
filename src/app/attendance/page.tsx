'use client';

import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Mock attendance data (would come from API in real app)
const attendanceData = [
  { date: '2023-03-01', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'present' },
  { date: '2023-03-02', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'present' },
  { date: '2023-03-03', checkIn: '09:10 AM', checkOut: '06:30 PM', status: 'present' },
  { date: '2023-03-04', checkIn: null, checkOut: null, status: 'weekend' },
  { date: '2023-03-05', checkIn: null, checkOut: null, status: 'weekend' },
  { date: '2023-03-06', checkIn: '09:05 AM', checkOut: '06:10 PM', status: 'present' },
  { date: '2023-03-07', checkIn: '09:15 AM', checkOut: '06:20 PM', status: 'present' },
  { date: '2023-03-08', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'late' },
  { date: '2023-03-09', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'present' },
  { date: '2023-03-10', checkIn: null, checkOut: null, status: 'absent' },
];

// Mock calendar data (would be generated dynamically in real app)
const calendarDays = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  let status = 'future';
  
  if (day < 10) status = 'present';
  if (day === 5 || day === 6) status = 'weekend';
  if (day === 10) status = 'absent';
  if (day === 8) status = 'late';
  
  return { day, status };
});

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Attendance Tracking</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <ClockIcon className="w-5 h-5 mr-2 inline-block" />
            Check In
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
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Present Days</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">18</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
            <ClockIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Late Check-ins</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">2</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-red-500 text-white mr-4">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Absent Days</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">1</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance Rate</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">95%</p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">March 2023</h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map(({ day, status }) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square flex items-center justify-center rounded-md text-sm font-medium cursor-pointer ${
                  status === 'present' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  status === 'absent' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                  status === 'late' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  status === 'weekend' ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400' :
                  'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                }`}
              >
                {day}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Today's Status */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Status</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                <p className="font-medium text-gray-800 dark:text-white">Check-in Time</p>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">09:05 AM</p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-2" />
                <p className="font-medium text-gray-800 dark:text-white">Working Hours</p>
              </div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">7h 25m</p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" />
                <p className="font-medium text-gray-800 dark:text-white">Status</p>
              </div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">Present</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Attendance */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Attendance</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {attendanceData.map((record) => (
                <tr key={record.date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{record.checkIn || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{record.checkOut || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
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