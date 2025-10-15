'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth, AuthProvider } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { User } from '@/types';

function HomeContent() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Use window.location for more reliable redirect
      window.location.href = `/${user.role}`;
    }
  }, [user, router]);

  if (user) {
    return null; // Will redirect
  }

  const handleLogin = (userData: User) => {
    login(userData);
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
