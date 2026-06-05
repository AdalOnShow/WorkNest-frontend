import api from '@/lib/api';
import { IApiResponse } from '@/types/auth.types';
import { IActivityLog, IProjectActivityResponse } from '@/types/activityLog.types';

export const activityLogService = {
  async getProjectActivity(
    projectId: string,
    params?: { limit?: number; page?: number },
  ): Promise<IProjectActivityResponse> {
    const res = await api.get<IApiResponse<IProjectActivityResponse>>(
      `/activity/project/${projectId}`,
      { params },
    );
    return res.data.data;
  },

  async getRecentActivity(limit = 10): Promise<IActivityLog[]> {
    const res = await api.get<IApiResponse<IActivityLog[]>>('/activity/recent', {
      params: { limit },
    });
    return res.data.data;
  },
};
