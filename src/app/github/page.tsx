'use client';

import { CodeBracketIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Mock GitHub data (would come from API in real app)
const commitData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Commits',
      data: [5, 8, 12, 4, 9, 2, 0],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.3,
    },
  ],
};

const contributionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Contributions',
      data: [65, 78, 90, 85, 92, 88],
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
    },
  ],
};

// Mock recent commits (would come from API in real app)
const recentCommits = [
  { id: 'abc123', message: 'Fix authentication bug in login form', repo: 'company/auth-service', time: '2 hours ago', additions: 25, deletions: 12 },
  { id: 'def456', message: 'Add new dashboard widgets', repo: 'company/frontend', time: '5 hours ago', additions: 120, deletions: 35 },
  { id: 'ghi789', message: 'Update API documentation', repo: 'company/api-docs', time: '1 day ago', additions: 45, deletions: 20 },
  { id: 'jkl012', message: 'Refactor user service for better performance', repo: 'company/user-service', time: '2 days ago', additions: 78, deletions: 65 },
  { id: 'mno345', message: 'Add unit tests for payment module', repo: 'company/payment-service', time: '3 days ago', additions: 95, deletions: 0 },
];

// Mock repositories (would come from API in real app)
const repositories = [
  { name: 'company/auth-service', stars: 12, forks: 5, issues: 3, lastUpdated: '1 day ago' },
  { name: 'company/frontend', stars: 45, forks: 12, issues: 8, lastUpdated: '5 hours ago' },
  { name: 'company/api-docs', stars: 8, forks: 2, issues: 1, lastUpdated: '1 day ago' },
  { name: 'company/user-service', stars: 23, forks: 7, issues: 5, lastUpdated: '2 days ago' },
];

export default function GitHubPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">GitHub Activity</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <CodeBracketIcon className="w-5 h-5 mr-2 inline-block" />
            View GitHub Profile
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
          <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
            <CodeBracketIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Commits</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">247</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pull Requests</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">32</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-green-500 text-white mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Issues Closed</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">45</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Contribution Score</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">87/100</p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commit Activity Chart */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Weekly Commit Activity</h2>
          </div>
          <div className="h-64">
            <Line 
              data={commitData} 
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
        
        {/* Contribution Chart */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Contributions</h2>
          </div>
          <div className="h-64">
            <Bar 
              data={contributionData} 
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
      </div>
      
      {/* Recent Commits */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Commits</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
        </div>
        
        <div className="space-y-4">
          {recentCommits.map((commit) => (
            <div key={commit.id} className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
              <div className="flex-shrink-0 mr-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <CodeBracketIcon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{commit.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{commit.time}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{commit.repo}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                    <span>+{commit.additions}</span>
                  </div>
                  <div className="flex items-center text-xs text-red-600 dark:text-red-400">
                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                    <span>-{commit.deletions}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Repositories */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Active Repositories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.map((repo) => (
            <div key={repo.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-blue-600 dark:text-blue-400">{repo.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last updated {repo.lastUpdated}</p>
              <div className="flex items-center mt-3 space-x-4">
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>{repo.forks}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{repo.issues}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 