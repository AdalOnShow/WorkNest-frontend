import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import type { ITaskQuery } from "@/types/task.types";

export const useTasks = (projectId: string, query?: ITaskQuery) => {
  return useQuery({
    queryKey: ['tasks', projectId, query],
    queryFn: () => taskService.getTasks(projectId, query),
    enabled: !!projectId,
  });
};

export const useTask = (projectId: string, taskId: string) => {
  return useQuery({
    queryKey: ['tasks', projectId, taskId],
    queryFn: () => taskService.getTask(projectId, taskId),
    enabled: !!projectId && !!taskId,
  });
};

export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof taskService.createTask>[1]) =>
      taskService.createTask(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
  });
};

export const useUpdateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: { taskId: string; data: Parameters<typeof taskService.updateTask>[2] }) =>
      taskService.updateTask(projectId, taskId, data),
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId, taskId] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
  });
};

export const useDeleteTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => taskService.deleteTask(projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
  });
};

export const useTaskMembers = (projectId: string) => {
  return useQuery({
    queryKey: ['tasks', projectId, 'members'],
    queryFn: () => taskService.getMembers(projectId),
    enabled: !!projectId,
  });
};
