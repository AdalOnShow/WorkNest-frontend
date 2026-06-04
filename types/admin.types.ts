export const USER_ROLES = ['ADMIN', 'PROJECT_MANAGER', 'TEAM_MEMBER'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const PROJECT_STATUSES = ['ACTIVE', 'COMPLETED', 'ARCHIVED'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface IAdminProject {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  deadline: Date | null;
  createdAt: Date;
  memberCount: number;
  taskCount: number;
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalTasks: number;
  projectsByStatus: { status: ProjectStatus; count: number }[];
}
