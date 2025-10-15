'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileIcon } from '@/components/ui/FileIcon';
import { 
  Upload, 
  X, 
  File, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { File as FileType, Folder } from '@/types';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  folder: Folder;
  onUpload: (file: FileType) => void;
  onCancel: () => void;
}

export function FileUpload({ folder, onUpload, onCancel }: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setUploadError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    maxFiles: 1,
    maxSize: folder.maxFileSize * 1024 * 1024, // Convert MB to bytes
  });

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > folder.maxFileSize * 1024 * 1024) {
      return `File terlalu besar. Maksimal ${folder.maxFileSize}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!folder.allowedFileTypes.includes(fileExtension)) {
      return `Tipe file tidak diizinkan. Hanya ${folder.allowedFileTypes.join(', ')}`;
    }

    return null;
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    const error = validateFile(uploadedFile);
    if (error) {
      setUploadError(error);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mock file object
      const newFile: FileType = {
        id: Date.now().toString(),
        name: uploadedFile.name,
        type: uploadedFile.name.split('.').pop() || 'unknown',
        size: uploadedFile.size,
        uploadedAt: new Date(),
        uploadedBy: 'Current User',
        folderId: folder.id,
        url: URL.createObjectURL(uploadedFile)
      };

      onUpload(newFile);
    } catch (error) {
      setUploadError('Gagal mengupload file. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upload File ke {folder.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File restrictions info */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Ketentuan Upload:</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Tipe file: {folder.allowedFileTypes.join(', ')}</li>
              <li>• Ukuran maksimal: {folder.maxFileSize}MB</li>
            </ul>
          </div>

          {/* Dropzone */}
          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200
                ${isDragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-blue-600">Lepaskan file di sini...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop file di sini, atau klik untuk memilih
                  </p>
                  <p className="text-sm text-gray-500">
                    Mendukung: {folder.allowedFileTypes.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FileIcon type={uploadedFile.name.split('.').pop() || 'unknown'} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Error message */}
          {uploadError && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{uploadError}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1"
              disabled={!uploadedFile || isUploading}
              loading={isUploading}
            >
              {isUploading ? 'Mengupload...' : 'Upload'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
