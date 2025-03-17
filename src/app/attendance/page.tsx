'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: string;
  notes?: string;
}

export default function AttendancePage() {
  const { data: session, status } = useSession();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDays: 0,
    present: 0,
    absent: 0,
    late: 0,
    attendanceRate: '0%',
    avgCheckInTime: '',
  });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAttendance();
    }
  }, [status]);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/attendance');
      if (!response.ok) throw new Error('Failed to fetch attendance');
      
      const data = await response.json();
      setAttendance(data);
      
      // Calculate statistics
      if (data.length > 0) {
        const present = data.filter((record: AttendanceRecord) => 
          record.status === 'PRESENT'
        ).length;
        
        const late = data.filter((record: AttendanceRecord) => 
          record.status === 'LATE'
        ).length;
        
        const workingDays = 20; // Assuming 20 working days per month
        const rate = Math.round(((present + late) / workingDays) * 100);
        
        // Calculate average check-in time
        const checkInTimes = data
          .filter((record: AttendanceRecord) => record.checkIn)
          .map((record: AttendanceRecord) => {
            const date = new Date(record.checkIn);
            return date.getHours() * 60 + date.getMinutes(); // Convert to minutes
          });
        
        const avgMinutes = checkInTimes.length > 0 
          ? Math.round(checkInTimes.reduce((sum, time) => sum + time, 0) / checkInTimes.length) 
          : 0;
        
        const avgHours = Math.floor(avgMinutes / 60);
        const avgMins = avgMinutes % 60;
        const avgTimeFormatted = `${avgHours.toString().padStart(2, '0')}:${avgMins.toString().padStart(2, '0')}`;
        
        setStats({
          totalDays: data.length,
          present: present,
          absent: workingDays - present - late,
          late: late,
          attendanceRate: `${rate}%`,
          avgCheckInTime: avgTimeFormatted,
        });
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const formatTime = (dateString: string | null) => {
    if (!dateString) return '--:--';
    try {
      return format(parseISO(dateString), 'hh:mm a');
    } catch (e) {
      return '--:--';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'LATE':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'ABSENT':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'HALF_DAY':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'ON_LEAVE':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Attendance Records</h1>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Days</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalDays}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500 dark:text-gray-400">Present</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.present}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500 dark:text-gray-400">Absent</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.absent}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500 dark:text-gray-400">Late</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.late}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500 dark:text-gray-400">Attendance Rate</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.attendanceRate}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Attendance Details</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <ClockIcon className="w-4 h-4" /> 
            <span>Avg. Check-in time: {stats.avgCheckInTime}</span>
          </div>
        </div>
        
        {attendance.length === 0 ? (
          <div className="text-center py-8">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No attendance records</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your attendance records will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                      {formatTime(record.checkIn)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                      {formatTime(record.checkOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
} 