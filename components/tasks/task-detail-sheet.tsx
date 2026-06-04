'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Calendar,
  Flag,
  Pencil,
  Trash2,
  User2,
} from 'lucide-react';
import { format, isPast } from 'date-fns';
import { useTask } from '@/hooks/useTasks';
import { useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { TaskForm } from '@/components/tasks/task-form';
import type { ITask, ITaskMemberOption, TaskStatus } from '@/types/task.types';

const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  MEDIUM: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  HIGH: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  URGENT: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const STATUS_OPTIONS: TaskStatus[] = [
  'TODO',
  'IN_PROGRESS',
  'IN_REVIEW',
  'DONE',
];

interface TaskDetailSheetProps {
  projectId: string;
  taskId: string | null;
  open: boolean;
  onClose: () => void;
  currentUserRole: string;
  members: ITaskMemberOption[];
}

export function TaskDetailSheet({
  projectId,
  taskId,
  open,
  onClose,
  currentUserRole,
  members,
}: TaskDetailSheetProps) {
  const { data: task, isLoading, error } = useTask(projectId, taskId || '');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { user } = useAuth();

  const updateTask = useUpdateTask(projectId);
  const deleteTask = useDeleteTask(projectId);

  const isPM = currentUserRole === 'PROJECT_MANAGER';
  const isAssignee = task?.assigneeId === user?.id;
  const canUpdateStatus = isPM || isAssignee;

  // Close child dialogs when sheet closes
  useEffect(() => {
    if (!open) { setEditOpen(false); setDeleteOpen(false); }
  }, [open]);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (!taskId) return;
    try {
      await updateTask.mutateAsync({ taskId, data: { status: newStatus } });
      toast.success('Status updated');
    } catch {
      toast.error('Could not update status');
    }
  };

  if (!taskId) return null;

  if (isLoading) {
    return (
      <SheetContent>
        <div className="space-y-4 p-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </SheetContent>
    );
  }

  if (error || !task) {
    return (
      <SheetContent>
        <div className="p-4">
          <p className="text-sm text-red-500">Task not found.</p>
          <Button className="mt-4" onClick={onClose}>Close</Button>
        </div>
      </SheetContent>
    );
  }

  const isOverdue = task.deadline && task.status !== 'DONE' && isPast(new Date(task.deadline));
  const isDone = task.status === 'DONE';

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="pr-8">{task.title}</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6 px-1">
        {/* Meta row */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={PRIORITY_COLORS[task.priority]}>
            <Flag className="mr-1 size-3" /> {task.priority}
          </Badge>
          <Badge variant="outline">
            {task.status.replace('_', ' ')}
          </Badge>
          {isOverdue && (
            <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
              Overdue
            </Badge>
          )}
        </div>

        {/* Description */}
        {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}

        <Separator />

        {/* Assignee */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Assignee</p>
          {task.assignee ? (
            <div className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage src={task.assignee.avatarUrl || undefined} />
                <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{task.assignee.name}</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">Unassigned</p>
          )}
        </div>

        {/* Creator */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Created by</p>
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src={task.creator.avatarUrl || undefined} />
              <AvatarFallback>{task.creator.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{task.creator.name}</span>
          </div>
        </div>

        {/* Deadline */}
        {task.deadline && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Deadline</p>
            <span className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
              <Calendar className="size-4" />
              {format(new Date(task.deadline), 'PPP')}
            </span>
          </div>
        )}

        <Separator />

        {/* Status update for eligible users */}
        {canUpdateStatus && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Update status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <Button
                  key={s}
                  variant={task.status === s ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleStatusChange(s)}
                  disabled={updateTask.isPending}
                >
                  {s.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Edit / Delete for PM */}
        {isPM && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => { setEditOpen(true); }}
            >
              <Pencil className="mr-2 size-4" /> Edit
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="mr-2 size-4" /> Delete
            </Button>
          </div>
        )}
      </div>

      {/* Inline edit form */}
      {editOpen && (
        <div className="mt-6 border-t pt-4">
          <TaskForm
            projectId={projectId}
            members={members}
            onSubmit={async (data) => {
              await updateTask.mutateAsync({ taskId: task.id, data });
              toast.success('Task updated');
              setEditOpen(false);
            }}
            initialData={task}
            submitLabel="Save changes"
            onCancel={() => setEditOpen(false)}
          />
        </div>
      )}

      {deleteOpen && (
        <div className="mt-6 border-t pt-4">
          <p className="mb-3 text-sm">Permanently delete this task?</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteTask.mutateAsync(task.id);
                  toast.success('Task deleted');
                  onClose();
                } catch { toast.error('Could not delete task'); }
              }}
              disabled={deleteTask.isPending}
            >
              {deleteTask.isPending ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </div>
      )}
    </SheetContent>
  );
}
