import { useQuery } from '@tanstack/react-query';
import { activityLogService } from '@/services/activityLog.service';

export const useProjectActivity = (projectId: string, limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['activity', 'project', projectId, limit, page],
    queryFn: () => activityLogService.getProjectActivity(projectId, { limit, page }),
    enabled: !!projectId,
  });
};

export const useRecentActivity = (limit = 10) => {
  return useQuery({
    queryKey: ['activity', 'recent', limit],
    queryFn: () => activityLogService.getRecentActivity(limit),
  });
};
