'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FolderOpen, 
  FileText,
  Calendar,
  User
} from 'lucide-react';
import { getRoleConfig, getFilesByRole } from '@/lib/mock-data';
import { UserRole, File as FileType } from '@/types';
import { formatFileSize, formatDate } from '@/lib/utils';

interface DokumenPageProps {
  params: Promise<{
    role: UserRole;
  }>;
}

export default function DokumenPage({ params }: DokumenPageProps) {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dokumen</h1>
          <p className="text-gray-600">Kelola semua dokumen dan file Anda</p>
        </div>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roleConfig.folders.map((folder, index) => {
            const folderFiles = files.filter(f => f.folderId.includes(folder.name.toLowerCase()));
            const totalSize = folderFiles.reduce((sum, file) => sum + file.size, 0);
            
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => router.push(`/${resolvedParams.role}/dokumen/${folder.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {folderFiles.length} file
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{folder.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{folder.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Ukuran total:</span>
                      <span>{formatFileSize(totalSize)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Maksimal:</span>
                      <span>{folder.maxFileSize}MB</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Tipe file:</span>
                      <span>{folder.allowedFileTypes.join(', ')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      {/* Recent Files */}
      <Card>
        <CardHeader>
          <CardTitle>File Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada file</h3>
              <p className="text-gray-600 mb-4">
                Mulai upload file ke salah satu folder di atas
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.slice(0, 10).map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">{file.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(file.uploadedAt)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{file.uploadedBy}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                    <Button size="sm" variant="ghost" onClick={() => handleFileDelete(file.id)}>
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
