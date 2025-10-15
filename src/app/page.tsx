'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { User } from '@/types';

function HomeContent() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  console.log('HomeContent - user:', user, 'isLoading:', isLoading);

  useEffect(() => {
    if (user) {
      console.log('User found, redirecting to:', `/${user.role}`);
      // Use window.location for more reliable redirect
      window.location.href = `/${user.role}`;
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  const handleLogin = (userData: User) => {
    login(userData);
  };

  console.log('Rendering LoginForm');
  return <LoginForm onLogin={handleLogin} />;
}

export default function Home() {
  return <HomeContent />;
}
