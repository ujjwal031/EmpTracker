'use client';

import { ChartBarIcon, TrophyIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, BarElement } from 'chart.js';
import { Line, Radar, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, BarElement, Title, Tooltip, Legend);

// Mock performance data (would come from API in real app)
const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Performance Score',
      data: [75, 78, 82, 79, 85, 88],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Team Average',
      data: [72, 74, 75, 76, 78, 80],
      borderColor: 'rgb(156, 163, 175)',
      backgroundColor: 'rgba(156, 163, 175, 0.5)',
      tension: 0.3,
      borderDash: [5, 5],
    },
  ],
};

// Mock skills radar data
const skillsData = {
  labels: ['Technical Skills', 'Communication', 'Teamwork', 'Problem Solving', 'Initiative', 'Adaptability'],
  datasets: [
    {
      label: 'Your Skills',
      data: [85, 75, 90, 80, 85, 78],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgb(99, 102, 241)',
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(99, 102, 241)',
    },
    {
      label: 'Team Average',
      data: [75, 70, 80, 75, 70, 75],
      backgroundColor: 'rgba(156, 163, 175, 0.2)',
      borderColor: 'rgb(156, 163, 175)',
      pointBackgroundColor: 'rgb(156, 163, 175)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(156, 163, 175)',
    },
  ],
};

// Mock productivity data
const productivityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Tasks Completed',
      data: [5, 8, 6, 9, 7],
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
    },
  ],
};

// Mock feedback data
const feedbackData = [
  { id: 1, from: 'John Manager', date: '2 weeks ago', rating: 4.5, comment: 'Great work on the authentication module. Your code was clean and well-documented.' },
  { id: 2, from: 'Sarah Team Lead', date: '1 month ago', rating: 4.0, comment: 'Good job on the recent project. Your problem-solving skills were valuable to the team.' },
  { id: 3, from: 'Mike Peer', date: '2 months ago', rating: 4.8, comment: 'Excellent collaboration on the frontend redesign. Your attention to detail is impressive.' },
];

// Mock goals data
const goalsData = [
  { id: 1, title: 'Complete Advanced React Course', deadline: '2 weeks', progress: 75 },
  { id: 2, title: 'Improve Code Review Skills', deadline: '1 month', progress: 60 },
  { id: 3, title: 'Learn GraphQL', deadline: '3 months', progress: 30 },
  { id: 4, title: 'Contribute to Open Source', deadline: '6 months', progress: 15 },
];

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Performance Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <TrophyIcon className="w-5 h-5 mr-2 inline-block" />
            Set New Goal
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
          <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
            <ChartBarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Score</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">88/100</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-green-500 text-white mr-4">
            <ArrowUpIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Improvement</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">+13%</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
            <TrophyIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Team Rank</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">3rd</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Goals Completed</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">7/10</p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Performance Trend</h2>
          </div>
          <div className="h-64">
            <Line 
              data={performanceData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)',
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        {/* Skills Radar Chart */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Skills Assessment</h2>
          </div>
          <div className="h-64">
            <Radar 
              data={skillsData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    angleLines: {
                      color: 'rgba(156, 163, 175, 0.2)',
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.2)',
                    },
                    pointLabels: {
                      font: {
                        size: 10,
                      },
                    },
                    ticks: {
                      backdropColor: 'transparent',
                      showLabelBackdrop: false,
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Chart */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Weekly Productivity</h2>
          </div>
          <div className="h-64">
            <Bar 
              data={productivityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)',
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        {/* Recent Feedback */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Feedback</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          
          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <div key={feedback.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                        {feedback.from.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{feedback.from}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{feedback.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ${i < Math.floor(feedback.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {feedback.rating % 1 !== 0 && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-yellow-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Development Goals */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Development Goals</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600">Add Goal</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goalsData.map((goal) => (
            <div key={goal.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white">{goal.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline: {goal.deadline}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Progress</span>
                  <span className="text-blue-600 dark:text-blue-400">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 