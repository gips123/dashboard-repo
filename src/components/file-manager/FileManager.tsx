'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileIcon } from '@/components/ui/FileIcon';
import { FileUpload } from './FileUpload';
import { 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  MoreVertical,
  Grid3X3,
  List,
  Search,
  Filter
} from 'lucide-react';
import { File, Folder } from '@/types';
import { formatFileSize, formatDate } from '@/lib/utils';

interface FileManagerProps {
  folder: Folder;
  files: File[];
  onFileUpload: (file: File) => void;
  onFileDelete: (fileId: string) => void;
}

export function FileManager({ folder, files, onFileUpload, onFileDelete }: FileManagerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (file: File) => {
    onFileUpload(file);
    setShowUpload(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{folder.name}</h1>
          <p className="text-gray-600">{folder.description}</p>
        </div>
        <Button onClick={() => setShowUpload(true)} className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload File</span>
        </Button>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari file..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* File Upload Modal */}
      {showUpload && (
        <FileUpload
          folder={folder}
          onUpload={handleFileUpload}
          onCancel={() => setShowUpload(false)}
        />
      )}

      {/* Files Display */}
      {filteredFiles.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada file</h3>
            <p className="text-gray-600 mb-4">
              Upload file pertama Anda ke folder {folder.name}
            </p>
            <Button onClick={() => setShowUpload(true)}>
              Upload File
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
          {filteredFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                {viewMode === 'grid' ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <FileIcon type={file.type} size="lg" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1 truncate" title={file.name}>
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      {formatFileSize(file.size)}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      {formatDate(file.uploadedAt)}
                    </p>
                    <div className="flex justify-center space-x-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onFileDelete(file.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileIcon type={file.type} size="md" />
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onFileDelete(file.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
