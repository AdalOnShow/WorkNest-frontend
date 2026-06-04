import api from '@/lib/api';
import { IApiResponse } from '@/types/auth.types';
import {
  ICreateTaskInput,
  ITask,
  ITaskMemberOption,
  ITaskQuery,
  IUpdateTaskInput,
} from '@/types/task.types';

export const taskService = {
  async getTasks(projectId: string, query?: ITaskQuery): Promise<ITask[]> {
    const params = new URLSearchParams();
    if (query?.status?.length) params.append('status', query.status.join(','));
    if (query?.priority?.length) params.append('priority', query.priority.join(','));
    if (query?.assigneeId) params.append('assigneeId', query.assigneeId);
    if (query?.deadlineStatus) params.append('deadlineStatus', query.deadlineStatus);
    if (query?.search) params.append('search', query.search);

    const res = await api.get<IApiResponse<ITask[]>>(
      `/projects/${projectId}/tasks`,
      { params },
    );
    return res.data.data;
  },

  async getTask(projectId: string, taskId: string): Promise<ITask> {
    const res = await api.get<IApiResponse<ITask>>(
      `/projects/${projectId}/tasks/${taskId}`,
    );
    return res.data.data;
  },

  async createTask(projectId: string, data: ICreateTaskInput): Promise<ITask> {
    const res = await api.post<IApiResponse<ITask>>(
      `/projects/${projectId}/tasks`,
      data,
    );
    return res.data.data;
  },

  async updateTask(
    projectId: string,
    taskId: string,
    data: IUpdateTaskInput,
  ): Promise<ITask> {
    const res = await api.patch<IApiResponse<ITask>>(
      `/projects/${projectId}/tasks/${taskId}`,
      data,
    );
    return res.data.data;
  },

  async deleteTask(projectId: string, taskId: string): Promise<void> {
    await api.delete(`/projects/${projectId}/tasks/${taskId}`);
  },

  async getMembers(projectId: string): Promise<ITaskMemberOption[]> {
    const res = await api.get<IApiResponse<ITaskMemberOption[]>>(
      `/projects/${projectId}/tasks/members`,
    );
    return res.data.data;
  },
};
