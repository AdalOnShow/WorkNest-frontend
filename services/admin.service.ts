import api from '@/lib/api';
import type {
  AdminDashboardStats,
  IAdminProject,
  IAdminUser,
  PaginatedResponse,
} from '@/types/admin.types';

export type AdminUsersQuery = {
  page: number;
  limit: number;
  search?: string;
  role?: string;
  isActive?: boolean;
};

export type AdminProjectsQuery = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
};

export const adminService = {
  getUsers(params: AdminUsersQuery): Promise<PaginatedResponse<IAdminUser>> {
    return api
      .get<{ success: true; data: PaginatedResponse<IAdminUser> }>('/admin/users', { params })
      .then((response) => response.data.data);
  },

  getUser(id: string): Promise<IAdminUser> {
    return api.get<{ success: true; data: IAdminUser }>(`/admin/users/${id}`).then((response) => response.data.data);
  },

  updateUserStatus(id: string, isActive: boolean): Promise<IAdminUser> {
    return api
      .patch<{ success: true; data: IAdminUser }>(`/admin/users/${id}/status`, { isActive })
      .then((response) => response.data.data);
  },

  deleteUser(id: string): Promise<void> {
    return api.delete(`/admin/users/${id}`);
  },

  getProjects(params: AdminProjectsQuery): Promise<PaginatedResponse<IAdminProject>> {
    return api
      .get<{ success: true; data: PaginatedResponse<IAdminProject> }>('/admin/projects', { params })
      .then((response) => response.data.data);
  },

  getProject(id: string): Promise<IAdminProject> {
    return api.get<{ success: true; data: IAdminProject }>(`/admin/projects/${id}`).then((response) => response.data.data);
  },

  deleteProject(id: string): Promise<void> {
    return api.delete(`/admin/projects/${id}`);
  },

  getAdminDashboard(): Promise<AdminDashboardStats> {
    return api
      .get<{ success: true; data: AdminDashboardStats }>('/admin/dashboard')
      .then((response) => response.data.data);
  },
};
