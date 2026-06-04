'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import {
  Calendar,
  Flag,
  Pencil,
  Trash2,
  UserPlus,
  UserX,
} from 'lucide-react';
import { format, isPast } from 'date-fns';
import { useTask } from '@/hooks/useTasks';
import { useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { TaskForm } from '@/components/tasks/task-form';
import type { ITaskMemberOption, TaskStatus } from '@/types/task.types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';

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
  const [assigneePopoverOpen, setAssigneePopoverOpen] = useState(false);
  const { user } = useAuth();

  const updateTask = useUpdateTask(projectId);
  const deleteTask = useDeleteTask(projectId);

  const isPM = currentUserRole === 'PROJECT_MANAGER';
  const isAssignee = task?.assigneeId === user?.id;
  const canUpdateStatus = isPM || isAssignee;

  const isOverdue = task?.deadline && task?.status !== 'DONE' && isPast(new Date(task.deadline));
  const isDone = task?.status === 'DONE';

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

  return (
    <Sheet open={open} onOpenChange={onClose}>
      {isLoading ? (
        <SheetContent>
          <div className="space-y-4 p-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </SheetContent>
      ) : error || !task ? (
        <SheetContent>
          <div className="p-4">
            <p className="text-sm text-red-500">Task not found.</p>
            <Button className="mt-4" onClick={onClose}>Close</Button>
          </div>
        </SheetContent>
      ) : (
        <SheetContent>
          <div className="p-6">
            <SheetHeader>
              <SheetTitle className="pr-8">{task.title}</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {!editOpen ? (
                <>
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

                  <Separator />

                  {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                  {!task.description && <p className="text-sm text-muted-foreground italic">No description</p>}

                  <Separator />

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Assignee</p>
                      {isPM && !isDone && (
                        <Popover open={assigneePopoverOpen} onOpenChange={setAssigneePopoverOpen}>
                          <PopoverTrigger
                            render={
                              <Button variant="ghost" size="icon" className="size-7">
                                <UserPlus className="size-3.5" />
                              </Button>
                            }
                          />
                          <PopoverContent className="w-72 p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search members…" />
                              <CommandEmpty>No member found.</CommandEmpty>
                              <CommandGroup>
                                {members.map((m) => (
                                  <CommandItem
                                    key={m.id}
                                    onSelect={async () => {
                                      try {
                                        await updateTask.mutateAsync({
                                          taskId: task.id,
                                          data: { assigneeId: m.id },
                                        });
                                        toast.success(`Assigned to ${m.name}`);
                                        setAssigneePopoverOpen(false);
                                      } catch {
                                        toast.error('Could not update assignee');
                                      }
                                    }}
                                    disabled={updateTask.isPending}
                                  >
                                    <Avatar className="mr-2 size-6">
                                      <AvatarImage src={m.avatarUrl || undefined} />
                                      <AvatarFallback className="text-[10px]">
                                        {m.name[0].toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm">{m.name}</p>
                                      <p className="text-xs text-muted-foreground">{m.email}</p>
                                    </div>
                                  </CommandItem>
                                ))}
                                <CommandItem
                                  onSelect={async () => {
                                    try {
                                      await updateTask.mutateAsync({
                                        taskId: task.id,
                                        data: { assigneeId: null },
                                      });
                                      toast.success('Assignee removed');
                                      setAssigneePopoverOpen(false);
                                    } catch {
                                      toast.error('Could not unassign');
                                    }
                                  }}
                                  disabled={updateTask.isPending}
                                >
                                  <UserX className="mr-2 size-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm">Unassign</p>
                                    <p className="text-xs text-muted-foreground">Remove current assignee</p>
                                  </div>
                                </CommandItem>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
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

                  <Separator />

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

                  <Separator />

                  {task.deadline && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Deadline</p>
                      <span className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
                        <Calendar className="size-4" />
                        {format(new Date(task.deadline), 'PPP')}
                      </span>
                    </div>
                  )}

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

                  {isPM && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setEditOpen(true)}
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
                </>
              ) : (
                <TaskForm
                  projectId={projectId}
                  members={members}
                  onSubmit={async (data) => {
                    await updateTask.mutateAsync({ taskId: task.id, data });
                    toast.success('Task updated');
                    setEditOpen(false);
                  }}
                  initialData={task}
                  submitLabel="Update task"
                  onCancel={() => setEditOpen(false)}
                  isSubmitting={updateTask.isPending}
                />
              )}
            </div>

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
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}
