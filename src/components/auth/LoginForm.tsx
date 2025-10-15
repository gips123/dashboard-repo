'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MOCK_USERS } from '@/lib/mock-data';
import { User } from '@/types';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      setError('Email tidak ditemukan');
      setIsLoading(false);
      return;
    }

    // Simple password validation (in real app, this would be hashed)
    if (password !== 'password123') {
      setError('Password salah');
      setIsLoading(false);
      return;
    }

    // Login successful
    onLogin(user);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Login Form */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Repository</h1>
                  <p className="text-gray-600">
                    Masukkan email dan password untuk mengakses dashboard
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan email Anda"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan password Anda"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    loading={isLoading}
                    disabled={!email || !password}
                  >
                    {isLoading ? 'Memproses...' : 'Masuk ke Dashboard'}
                  </Button>
                </form>

                <div className="mt-8 p-4 bg-gray-200 rounded-lg">
                  <h4 className="text-sm font-medium text-black mb-2">Demo Accounts:</h4>
                  <div className="space-y-1 text-xs text-black">
                    <div>• ahmad.wijaya@university.ac.id (Dosen)</div>
                    <div>• siti.nurhaliza@university.ac.id (Tendik)</div>
                    <div>• bambang.sutrisno@university.ac.id (Wakil Dekan 1)</div>
                    <div>• indah.sari@university.ac.id (Wakil Dekan 2)</div>
                    <div>• rudi.hartono@university.ac.id (Wakil Dekan 3)</div>
                    <div className="mt-2 font-medium">Password: password123</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                <Image
                  src="/abi.jpg"
                  alt="Dashboard Repository"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
