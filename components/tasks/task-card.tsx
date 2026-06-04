'use client';

import { useTask } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  ChevronRight,
  CircleCheckBig,
  CircleOff,
  Clock,
  Flag,
  User2,
} from 'lucide-react';
import { format, isPast } from 'date-fns';
import type { ITask, TaskPriority, TaskStatus } from '@/types/task.types';

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  LOW: 'bg-blue-500/15 text-blue-500 border-blue-500/25',
  MEDIUM: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/25',
  HIGH: 'bg-orange-500/15 text-orange-500 border-orange-500/25',
  URGENT: 'bg-red-500/15 text-red-500 border-red-500/25',
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  TODO: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
  IN_PROGRESS: 'bg-blue-500/15 text-blue-500 border-blue-500/25',
  IN_REVIEW: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/25',
  DONE: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25',
};

const STATUS_ICONS: Record<TaskStatus, typeof CircleCheckBig> = {
  TODO: CircleOff,
  IN_PROGRESS: Clock,
  IN_REVIEW: CircleCheckBig,
  DONE: CircleCheckBig,
};

interface TaskCardProps {
  task: ITask;
  projectId: string;
  currentUserRole: string;
  onClick?: () => void;
}

export function TaskCard({ task, projectId, currentUserRole, onClick }: TaskCardProps) {
  const StatusIcon = STATUS_ICONS[task.status];
  const isOverdue = task.deadline && task.status !== 'DONE' && isPast(new Date(task.deadline));

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="rounded-lg border bg-card p-4 shadow-sm cursor-pointer
                 transition hover:border-primary/50 hover:shadow-md
                 focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1">
          <p className="font-medium leading-snug line-clamp-2">{task.title}</p>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
          )}
        </div>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground mt-0.5" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={PRIORITY_COLORS[task.priority]}>
          <Flag className="mr-1 size-3" />
          {task.priority}
        </Badge>
        <Badge variant="outline" className={STATUS_COLORS[task.status] ?? 'bg-muted text-foreground border-border'}>
          <StatusIcon className="size-3" />
          {task.status.replace('_', ' ')}
        </Badge>
        {isOverdue && (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Overdue
          </Badge>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <>
              <Avatar className="size-5">
                <AvatarImage src={task.assignee.avatarUrl || undefined} />
                <AvatarFallback className="text-[10px]">
                  {task.assignee.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{task.assignee.name}</span>
            </>
          ) : (
            <span className="italic">Unassigned</span>
          )}
        </div>
        {task.deadline && (
          <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
            <Calendar className="size-3" />
            {format(new Date(task.deadline), 'MMM d, yyyy')}
          </span>
        )}
      </div>
    </div>
  );
}
