'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FolderOpen, 
  FileText
} from 'lucide-react';
import { getRoleConfig, getStatsByRole, getFilesByRole } from '@/lib/mock-data';
import { UserRole, File as FileType } from '@/types';

interface DashboardPageProps {
  params: Promise<{
    role: UserRole;
  }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const resolvedParams = use(params);
  const [files, setFiles] = useState<FileType[]>(getFilesByRole(resolvedParams.role));

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (user && user.role !== resolvedParams.role) {
      router.push(`/${user.role}`);
    }
  }, [user, isLoading, router, resolvedParams.role]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== resolvedParams.role) {
    return null;
  }

  const roleConfig = getRoleConfig(resolvedParams.role);
  const stats = getStatsByRole(resolvedParams.role);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleFileUpload = (newFile: FileType) => {
    setFiles(prev => [...prev, newFile]);
  };

  const handleFileDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat datang, {user.name.split(',')[0]}!
        </h1>
        <p className="text-blue-100">
          {roleConfig.description} - Kelola dokumen dan file Anda dengan mudah
        </p>
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} role={resolvedParams.role} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleConfig.folders.map((folder, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => router.push(`/${resolvedParams.role}/dokumen/${folder.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <FolderOpen className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium">{folder.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>File Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.slice(0, 5).map((file) => (
                <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(file.uploadedAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Folder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roleConfig.folders.map((folder, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">{folder.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {files.filter(f => f.folderId.includes(folder.name.toLowerCase())).length} file
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
