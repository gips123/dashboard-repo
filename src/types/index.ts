export type UserRole = 'dosen' | 'tendik' | 'wakil-dekan-1' | 'wakil-dekan-2' | 'wakil-dekan-3';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: ('read' | 'write' | 'delete' | 'upload')[];
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  role: UserRole;
  allowedFileTypes: string[];
  maxFileSize: number;
  description?: string;
  icon?: string;
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  folderId: string;
  url?: string;
}

export interface DashboardStats {
  totalFiles: number;
  totalFolders: number;
  storageUsed: number;
  recentUploads: File[];
}

export interface RoleConfig {
  folders: Omit<Folder, 'id' | 'path' | 'role'>[];
  permissions: string[];
  color: string;
  description: string;
}
