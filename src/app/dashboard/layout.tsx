'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      <div className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 