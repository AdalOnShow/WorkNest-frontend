import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '@/services/admin.service';
import type { AdminProjectsQuery, AdminUsersQuery } from '@/services/admin.service';

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: adminService.getAdminDashboard,
  });
};

export const useAdminUsers = (params: AdminUsersQuery) => {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminService.getUsers(params),
  });
};

export const useAdminUser = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => adminService.getUser(id),
    enabled: Boolean(id),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminService.updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User status updated successfully');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User deleted successfully');
    },
  });
};

export const useAdminProjects = (params: AdminProjectsQuery) => {
  return useQuery({
    queryKey: ['admin', 'projects', params],
    queryFn: () => adminService.getProjects(params),
  });
};

export const useAdminProject = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'projects', id],
    queryFn: () => adminService.getProject(id),
    enabled: Boolean(id),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      toast.success('Project deleted successfully');
    },
  });
};
