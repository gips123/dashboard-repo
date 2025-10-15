import { User, File, RoleConfig, DashboardStats } from '@/types';

export const ROLE_CONFIG: Record<string, RoleConfig> = {
  dosen: {
    folders: [
      { 
        name: 'Penelitian', 
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.xlsx'], 
        maxFileSize: 10,
        description: 'Dokumen penelitian dan riset',
        icon: 'Search'
      },
      { 
        name: 'Publikasi', 
        allowedFileTypes: ['.pdf', '.doc', '.docx'], 
        maxFileSize: 5,
        description: 'Artikel dan jurnal publikasi',
        icon: 'BookOpen'
      },
      { 
        name: 'Materi Kuliah', 
        allowedFileTypes: ['.pdf', '.ppt', '.pptx', '.docx'], 
        maxFileSize: 20,
        description: 'Materi pembelajaran dan presentasi',
        icon: 'GraduationCap'
      },
      { 
        name: 'Tugas Akhir', 
        allowedFileTypes: ['.pdf', '.doc', '.docx'], 
        maxFileSize: 15,
        description: 'Bimbingan tugas akhir mahasiswa',
        icon: 'FileText'
      }
    ],
    permissions: ['read', 'write', 'upload'],
    color: 'blue',
    description: 'Dashboard untuk Dosen'
  },
  tendik: {
    folders: [
      { 
        name: 'Administrasi', 
        allowedFileTypes: ['.pdf', '.xlsx', '.docx'], 
        maxFileSize: 5,
        description: 'Dokumen administrasi umum',
        icon: 'Clipboard'
      },
      { 
        name: 'Laporan', 
        allowedFileTypes: ['.pdf', '.xlsx', '.docx'], 
        maxFileSize: 10,
        description: 'Laporan bulanan dan tahunan',
        icon: 'BarChart3'
      },
      { 
        name: 'Surat Menyurat', 
        allowedFileTypes: ['.pdf', '.docx'], 
        maxFileSize: 2,
        description: 'Surat resmi dan komunikasi',
        icon: 'Mail'
      },
      { 
        name: 'Keuangan', 
        allowedFileTypes: ['.pdf', '.xlsx'], 
        maxFileSize: 8,
        description: 'Dokumen keuangan dan anggaran',
        icon: 'DollarSign'
      }
    ],
    permissions: ['read', 'write', 'upload'],
    color: 'green',
    description: 'Dashboard untuk Tenaga Kependidikan'
  },
  'wakil-dekan-1': {
    folders: [
      { 
        name: 'Akademik', 
        allowedFileTypes: ['.pdf', '.docx', '.xlsx'], 
        maxFileSize: 15,
        description: 'Dokumen akademik dan kurikulum',
        icon: 'BookOpen'
      },
      { 
        name: 'Kurikulum', 
        allowedFileTypes: ['.pdf', '.docx'], 
        maxFileSize: 10,
        description: 'Dokumen kurikulum dan silabus',
        icon: 'Calendar'
      },
      { 
        name: 'Evaluasi', 
        allowedFileTypes: ['.pdf', '.xlsx'], 
        maxFileSize: 5,
        description: 'Hasil evaluasi dan penilaian',
        icon: 'TrendingUp'
      },
      { 
        name: 'Kebijakan', 
        allowedFileTypes: ['.pdf', '.docx'], 
        maxFileSize: 8,
        description: 'Kebijakan akademik',
        icon: 'Shield'
      }
    ],
    permissions: ['read', 'write', 'upload', 'delete'],
    color: 'purple',
    description: 'Dashboard Wakil Dekan Bidang Akademik'
  },
  'wakil-dekan-2': {
    folders: [
      { 
        name: 'Keuangan', 
        allowedFileTypes: ['.pdf', '.xlsx'], 
        maxFileSize: 10,
        description: 'Dokumen keuangan dan anggaran',
        icon: 'DollarSign'
      },
      { 
        name: 'Sarana Prasarana', 
        allowedFileTypes: ['.pdf', '.docx'], 
        maxFileSize: 15,
        description: 'Dokumen sarana dan prasarana',
        icon: 'Building'
      },
      { 
        name: 'Inventaris', 
        allowedFileTypes: ['.pdf', '.xlsx'], 
        maxFileSize: 5,
        description: 'Daftar inventaris dan aset',
        icon: 'Package'
      },
      { 
        name: 'Pengadaan', 
        allowedFileTypes: ['.pdf', '.docx', '.xlsx'], 
        maxFileSize: 8,
        description: 'Dokumen pengadaan barang/jasa',
        icon: 'ShoppingCart'
      }
    ],
    permissions: ['read', 'write', 'upload', 'delete'],
    color: 'orange',
    description: 'Dashboard Wakil Dekan Bidang Umum & Keuangan'
  },
  'wakil-dekan-3': {
    folders: [
      { 
        name: 'Kemahasiswaan', 
        allowedFileTypes: ['.pdf', '.docx'], 
        maxFileSize: 10,
        description: 'Dokumen kemahasiswaan dan organisasi',
        icon: 'Users'
      },
      { 
        name: 'Alumni', 
        allowedFileTypes: ['.pdf', '.xlsx'], 
        maxFileSize: 5,
        description: 'Data alumni dan tracer study',
        icon: 'UserCheck'
      },
      { 
        name: 'Pengabdian', 
        allowedFileTypes: ['.pdf', '.docx'], 
        maxFileSize: 15,
        description: 'Dokumen pengabdian masyarakat',
        icon: 'Heart'
      },
      { 
        name: 'Kemitraan', 
        allowedFileTypes: ['.pdf', '.docx', '.xlsx'], 
        maxFileSize: 8,
        description: 'Dokumen kemitraan dan kerjasama',
        icon: 'Handshake'
      }
    ],
    permissions: ['read', 'write', 'upload', 'delete'],
    color: 'pink',
    description: 'Dashboard Wakil Dekan Bidang Kemahasiswaan & Alumni'
  }
};

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Ahmad Wijaya, M.T.',
    email: 'ahmad.wijaya@university.ac.id',
    role: 'dosen',
    avatar: '/avatars/dosen-1.jpg',
    permissions: [{ resource: 'files', actions: ['read', 'write', 'upload'] }]
  },
  {
    id: '2',
    name: 'Siti Nurhaliza, S.Kom.',
    email: 'siti.nurhaliza@university.ac.id',
    role: 'tendik',
    avatar: '/avatars/tendik-1.jpg',
    permissions: [{ resource: 'files', actions: ['read', 'write', 'upload'] }]
  },
  {
    id: '3',
    name: 'Prof. Dr. Bambang Sutrisno, M.Sc.',
    email: 'bambang.sutrisno@university.ac.id',
    role: 'wakil-dekan-1',
    avatar: '/avatars/wadek-1.jpg',
    permissions: [{ resource: 'files', actions: ['read', 'write', 'upload', 'delete'] }]
  },
  {
    id: '4',
    name: 'Dr. Indah Sari, M.M.',
    email: 'indah.sari@university.ac.id',
    role: 'wakil-dekan-2',
    avatar: '/avatars/wadek-2.jpg',
    permissions: [{ resource: 'files', actions: ['read', 'write', 'upload', 'delete'] }]
  },
  {
    id: '5',
    name: 'Dr. Rudi Hartono, M.Pd.',
    email: 'rudi.hartono@university.ac.id',
    role: 'wakil-dekan-3',
    avatar: '/avatars/wadek-3.jpg',
    permissions: [{ resource: 'files', actions: ['read', 'write', 'upload', 'delete'] }]
  }
];

export const MOCK_FILES: File[] = [
  {
    id: '1',
    name: 'Laporan Penelitian Q1 2024.pdf',
    type: 'pdf',
    size: 2048576, // 2MB
    uploadedAt: new Date('2024-01-15'),
    uploadedBy: 'Dr. Ahmad Wijaya, M.T.',
    folderId: 'penelitian-1',
    url: '/files/penelitian/laporan-q1-2024.pdf'
  },
  {
    id: '2',
    name: 'Materi Kuliah Algoritma.pptx',
    type: 'pptx',
    size: 15728640, // 15MB
    uploadedAt: new Date('2024-01-14'),
    uploadedBy: 'Dr. Ahmad Wijaya, M.T.',
    folderId: 'materi-kuliah-1',
    url: '/files/materi/algoritma.pptx'
  },
  {
    id: '3',
    name: 'Laporan Keuangan Januari.xlsx',
    type: 'xlsx',
    size: 1048576, // 1MB
    uploadedAt: new Date('2024-01-13'),
    uploadedBy: 'Siti Nurhaliza, S.Kom.',
    folderId: 'keuangan-1',
    url: '/files/keuangan/laporan-januari.xlsx'
  },
  {
    id: '4',
    name: 'Kurikulum 2024.pdf',
    type: 'pdf',
    size: 3145728, // 3MB
    uploadedAt: new Date('2024-01-12'),
    uploadedBy: 'Prof. Dr. Bambang Sutrisno, M.Sc.',
    folderId: 'kurikulum-1',
    url: '/files/kurikulum/kurikulum-2024.pdf'
  },
  {
    id: '5',
    name: 'Data Alumni 2023.xlsx',
    type: 'xlsx',
    size: 2097152, // 2MB
    uploadedAt: new Date('2024-01-11'),
    uploadedBy: 'Dr. Rudi Hartono, M.Pd.',
    folderId: 'alumni-1',
    url: '/files/alumni/data-2023.xlsx'
  }
];

export const MOCK_STATS: Record<string, DashboardStats> = {
  dosen: {
    totalFiles: 24,
    totalFolders: 4,
    storageUsed: 156.8, // MB
    recentUploads: MOCK_FILES.slice(0, 3)
  },
  tendik: {
    totalFiles: 18,
    totalFolders: 4,
    storageUsed: 89.2,
    recentUploads: MOCK_FILES.slice(1, 4)
  },
  'wakil-dekan-1': {
    totalFiles: 32,
    totalFolders: 4,
    storageUsed: 234.5,
    recentUploads: MOCK_FILES.slice(2, 5)
  },
  'wakil-dekan-2': {
    totalFiles: 28,
    totalFolders: 4,
    storageUsed: 198.7,
    recentUploads: MOCK_FILES.slice(0, 3)
  },
  'wakil-dekan-3': {
    totalFiles: 21,
    totalFolders: 4,
    storageUsed: 167.3,
    recentUploads: MOCK_FILES.slice(1, 4)
  }
};

export const getRoleConfig = (role: string) => ROLE_CONFIG[role] || ROLE_CONFIG.dosen;
export const getUserByRole = (role: string) => MOCK_USERS.find(user => user.role === role);
export const getStatsByRole = (role: string) => MOCK_STATS[role] || MOCK_STATS.dosen;
export const getFilesByRole = (role: string) => MOCK_FILES.filter(file => {
  const user = getUserByRole(role);
  return user && file.uploadedBy === user.name;
});
