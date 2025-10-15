import React from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Image, 
  Archive, 
  File,
  FileType,
  FileImage,
  FileVideo,
  FileAudio
} from 'lucide-react';
import { getFileIcon } from '@/lib/utils';

interface FileIconProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap = {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image,
  Archive,
  File,
  FileType,
  FileImage,
  FileVideo,
  FileAudio
};

export function FileIcon({ type, size = 'md', className = '' }: FileIconProps) {
  const iconName = getFileIcon(type);
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || File;
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  const colorClasses = {
    pdf: 'text-red-500',
    doc: 'text-blue-500',
    docx: 'text-blue-500',
    xlsx: 'text-green-500',
    xls: 'text-green-500',
    ppt: 'text-orange-500',
    pptx: 'text-orange-500',
    jpg: 'text-purple-500',
    jpeg: 'text-purple-500',
    png: 'text-purple-500',
    gif: 'text-purple-500',
    zip: 'text-gray-500',
    rar: 'text-gray-500'
  };
  
  return (
    <IconComponent 
      className={`${sizeClasses[size]} ${colorClasses[type.toLowerCase() as keyof typeof colorClasses] || 'text-gray-500'} ${className}`}
    />
  );
}
