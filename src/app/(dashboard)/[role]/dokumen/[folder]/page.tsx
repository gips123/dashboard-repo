'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileManager } from '@/components/file-manager/FileManager';
import { getRoleConfig, getFilesByRole } from '@/lib/mock-data';
import { UserRole, File, Folder } from '@/types';

interface FolderPageProps {
  params: Promise<{
    role: UserRole;
    folder: string;
  }>;
}

export default function FolderPage({ params }: FolderPageProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const resolvedParams = use(params);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    } else if (user && user.role !== resolvedParams.role) {
      router.push(`/${user.role}`);
    }
  }, [user, isLoading, router, resolvedParams.role]);

  useEffect(() => {
    // Filter files for this specific folder
    const allFiles = getFilesByRole(resolvedParams.role);
    const folderName = resolvedParams.folder.replace(/-/g, ' ');
    const folderFiles = allFiles.filter(file => 
      file.folderId.toLowerCase().includes(folderName.toLowerCase())
    );
    setFiles(folderFiles);
  }, [resolvedParams.role, resolvedParams.folder]);

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
  const folderName = resolvedParams.folder.replace(/-/g, ' ');
  const folder = roleConfig.folders.find(f => 
    f.name.toLowerCase() === folderName.toLowerCase()
  );

  if (!folder) {
    return (
      <DashboardLayout user={user} onLogout={() => logout()}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Folder tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">Folder yang Anda cari tidak tersedia untuk role Anda.</p>
          <button
            onClick={() => router.push(`/${resolvedParams.role}/dokumen`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Kembali ke Dokumen
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // Create folder object with id
  const folderWithId: Folder = {
    id: folder.name.toLowerCase().replace(/\s+/g, '-'),
    name: folder.name,
    path: `/${resolvedParams.role}/dokumen/${resolvedParams.folder}`,
    role: resolvedParams.role,
    allowedFileTypes: folder.allowedFileTypes,
    maxFileSize: folder.maxFileSize,
    description: folder.description,
    icon: folder.icon
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleFileUpload = (newFile: File) => {
    setFiles(prev => [...prev, newFile]);
  };

  const handleFileDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <FileManager
        folder={folderWithId}
        files={files}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
      />
    </DashboardLayout>
  );
}
