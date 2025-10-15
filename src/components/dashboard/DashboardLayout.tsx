'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User } from '@/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} />
      
      {/* Main content */}
      <div className="lg:ml-64">
        <Header user={user} onLogout={onLogout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
