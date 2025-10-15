'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FileIcon } from '@/components/ui/FileIcon';
import { 
  FileText, 
  FolderOpen, 
  HardDrive, 
  Clock,
  Download,
  Eye
} from 'lucide-react';
import { DashboardStats as Stats, File } from '@/types';
import { formatFileSize, formatDate } from '@/lib/utils';

interface DashboardStatsProps {
  stats: Stats;
  role: string;
}

export function DashboardStats({ stats, role }: DashboardStatsProps) {
  const getRoleColor = (role: string) => {
    const colors = {
      dosen: 'blue',
      tendik: 'green',
      'wakil-dekan-1': 'purple',
      'wakil-dekan-2': 'orange',
      'wakil-dekan-3': 'pink'
    } as const;
    return colors[role as keyof typeof colors] || 'blue';
  };

  const color = getRoleColor(role);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total File"
          value={stats.totalFiles}
          icon={FileText}
          color={color}
        />
        <StatCard
          title="Total Folder"
          value={stats.totalFolders}
          icon={FolderOpen}
          color={color}
        />
        <StatCard
          title="Storage Used"
          value={`${stats.storageUsed} MB`}
          icon={HardDrive}
          color={color}
        />
        <StatCard
          title="Recent Uploads"
          value={stats.recentUploads.length}
          icon={Clock}
          color={color}
        />
      </div>

      {/* Recent Files */}
      <Card>
        <CardHeader>
          <CardTitle>File Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentUploads.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <FileIcon type={file.type} size="md" />
                  <div>
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
