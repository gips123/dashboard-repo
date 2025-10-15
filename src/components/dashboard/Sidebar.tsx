'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Menu,
  X,
  Search,
  BookOpen,
  Clipboard,
  BarChart3,
  Mail,
  DollarSign,
  Building,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  Heart,
  Handshake,
  Calendar,
  TrendingUp,
  Shield,
  GraduationCap,
  FileText
} from 'lucide-react';
import { getRoleConfig } from '@/lib/mock-data';
import { getRoleDisplayName } from '@/lib/utils';
import { User } from '@/types';
import { Button } from '@/components/ui/Button';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

const iconMap = {
  Search,
  BookOpen,
  GraduationCap,
  FileText,
  Clipboard,
  BarChart3,
  Mail,
  DollarSign,
  Building,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  Heart,
  Handshake,
  Calendar,
  TrendingUp,
  Shield
};

export function Sidebar({ user, onLogout }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const roleConfig = getRoleConfig(user.role);

  const navigation = [
    {
      name: 'Dashboard',
      href: `/${user.role}`,
      icon: LayoutDashboard,
      current: pathname === `/${user.role}`
    },
    {
      name: 'Dokumen',
      href: `/${user.role}/dokumen`,
      icon: FolderOpen,
      current: pathname === `/${user.role}/dokumen`
    }
  ];

  const folderNavigation = roleConfig.folders.map(folder => {
    const Icon = iconMap[folder.icon as keyof typeof iconMap] || FolderOpen;
    const folderPath = `/${user.role}/dokumen/${folder.name.toLowerCase().replace(/\s+/g, '-')}`;
    return {
      name: folder.name,
      href: folderPath,
      icon: Icon,
      current: pathname === folderPath
    };
  });

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 p-6 border-b border-gray-200">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">{getRoleDisplayName(user.role)}</p>
            </div>
          </div>


          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {/* Main navigation */}
            <div className="space-y-1 mb-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                      ${item.current 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Folder navigation */}
            {folderNavigation.length > 0 && (
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Folder Dokumen
                </h3>
                <div className="space-y-1">
                  {folderNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                          ${item.current 
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>

        </div>
      </div>
    </>
  );
}
