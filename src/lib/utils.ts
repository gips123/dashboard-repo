import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getFileIcon(type: string): string {
  const iconMap: Record<string, string> = {
    pdf: 'FileText',
    doc: 'FileText',
    docx: 'FileText',
    xlsx: 'FileSpreadsheet',
    xls: 'FileSpreadsheet',
    ppt: 'Presentation',
    pptx: 'Presentation',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    gif: 'Image',
    zip: 'Archive',
    rar: 'Archive'
  };
  
  return iconMap[type.toLowerCase()] || 'File';
}

export function getRoleDisplayName(role: string): string {
  const roleNames: Record<string, string> = {
    dosen: 'Dosen',
    tendik: 'Tenaga Kependidikan',
    'wakil-dekan-1': 'Wakil Dekan Bidang Akademik',
    'wakil-dekan-2': 'Wakil Dekan Bidang Umum & Keuangan',
    'wakil-dekan-3': 'Wakil Dekan Bidang Kemahasiswaan & Alumni'
  };
  
  return roleNames[role] || role;
}
