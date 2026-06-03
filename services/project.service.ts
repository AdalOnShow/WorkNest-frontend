import api from '@/lib/api';
import { IApiResponse } from '@/types/auth.types';
import {
  IAddMemberInput,
  ICreateProjectInput,
  IProject,
  IProjectMember,
  IUpdateProjectInput,
  IUserSearchResult,
} from '@/types/project.types';

export const projectService = {
  async createProject(data: ICreateProjectInput): Promise<IProject> {
    const res = await api.post<IApiResponse<IProject>>('/projects', data);
    return res.data.data;
  },

  async getProjects(): Promise<IProject[]> {
    const res = await api.get<IApiResponse<IProject[]>>('/projects');
    return res.data.data;
  },

  async getProjectById(id: string): Promise<IProject> {
    const res = await api.get<IApiResponse<IProject>>(`/projects/${id}`);
    return res.data.data;
  },

  async updateProject(id: string, data: IUpdateProjectInput): Promise<IProject> {
    const res = await api.patch<IApiResponse<IProject>>(`/projects/${id}`, data);
    return res.data.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },

  async addMember(projectId: string, data: IAddMemberInput): Promise<IProjectMember> {
    const res = await api.post<IApiResponse<IProjectMember>>(`/projects/${projectId}/members`, data);
    return res.data.data;
  },

  async getMembers(projectId: string): Promise<IProjectMember[]> {
    const res = await api.get<IApiResponse<IProjectMember[]>>(`/projects/${projectId}/members`);
    return res.data.data;
  },

  async removeMember(projectId: string, memberId: string): Promise<void> {
    await api.delete(`/projects/${projectId}/members/${memberId}`);
  },

  async searchUserByEmail(email: string): Promise<IUserSearchResult | null> {
    try {
      const res = await api.get<IApiResponse<IUserSearchResult>>(`/users/search?email=${encodeURIComponent(email)}`);
      return res.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  },
};
