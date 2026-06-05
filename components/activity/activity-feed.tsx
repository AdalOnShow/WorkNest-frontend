'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import type { IActivityLog, ActivityAction } from '@/types/activityLog.types';

const ACTION_LABEL: Record<ActivityAction, string> = {
  PROJECT_CREATED: 'created project',
  PROJECT_UPDATED: 'updated project',
  TASK_CREATED: 'created task',
  TASK_ASSIGNED: 'assigned task',
  TASK_COMPLETED: 'completed task',
  MEMBER_ADDED: 'added a new member',
};

const ACTION_COLOR: Record<ActivityAction, string> = {
  PROJECT_CREATED: 'text-blue-500',
  PROJECT_UPDATED: 'text-yellow-500',
  TASK_CREATED: 'text-emerald-500',
  TASK_ASSIGNED: 'text-purple-500',
  TASK_COMPLETED: 'text-green-600',
  MEMBER_ADDED: 'text-orange-500',
};

interface Props {
  logs: IActivityLog[] | undefined;
  isLoading: boolean;
  emptyMessage?: string;
}

export function ActivityFeed({ logs, isLoading, emptyMessage = 'No activity yet.' }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const entityName =
          (log.meta?.title as string) ||
          (log.meta?.name as string) ||
          (log.meta?.userName as string) ||
          '';

        return (
          <div key={log.id} className="flex items-start gap-2">
            <Avatar className="size-7 shrink-0">
              <AvatarImage src={log.actor.avatarUrl || undefined} />
              <AvatarFallback className="text-[10px]">{log.actor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-medium">{log.actor.name}</span>{' '}
                <span className={ACTION_COLOR[log.action]}>
                  {ACTION_LABEL[log.action]}
                </span>
                {entityName && (
                  <span className="text-muted-foreground"> &quot;{entityName}&quot;</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
