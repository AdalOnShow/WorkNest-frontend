/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectService.getProjects,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectService.getProjectById(id),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => projectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", id] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useProjectMembers = (projectId: string) => {
  return useQuery({
    queryKey: ["projects", projectId, "members"],
    queryFn: () => projectService.getMembers(projectId),
  });
};

export const useAddMember = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => projectService.addMember(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "members"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useRemoveMember = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (memberId: string) =>
      projectService.removeMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "members"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useSearchUser = () => {
  return useMutation({
    mutationFn: projectService.searchUserByEmail,
  });
};
