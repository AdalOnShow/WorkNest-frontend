'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCreateTask } from '@/hooks/useTasks';
import { useTaskMembers } from '@/hooks/useTasks';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { TaskForm } from '@/components/tasks/task-form';
import { ICreateTaskInput } from '@/types/task.types';
import type { FormData } from '@/components/tasks/task-form';

interface TaskCreateSheetProps {
  projectId: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TaskCreateSheet({ projectId, trigger, open: controlledOpen, onOpenChange: onOpenChangeProp }: TaskCreateSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChangeProp ?? setInternalOpen;
  const { data: members = [] } = useTaskMembers(projectId);
  const createTask = useCreateTask(projectId);

  const extractApiError = (err: unknown) => {
    if (!err || typeof err !== 'object') return {};
    const axiosErr = err as { response?: { data?: { error?: Record<string, string[]>; message?: string } } };
    return axiosErr.response?.data?.error ?? {};
  };

  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (data: FormData & { deadline: string | null }) => {
    setApiErrors({});

    if (!data.deadline) {
      toast.error('Deadline is required');
      return;
    }

    try {
      await createTask.mutateAsync(data as ICreateTaskInput);
      toast.success('Task created');
      setOpen(false);
    } catch (err) {
      const backendErrors = extractApiError(err);
      setApiErrors(backendErrors);

      if (backendErrors.root?.[0]) {
        toast.error(backendErrors.root[0]);
      } else if (backendErrors.title?.[0]) {
        toast.error(backendErrors.title[0]);
      } else {
        toast.error('Could not create task. Please check your inputs.');
      }
    }
  };

  return (
    <>
      {trigger ? <span onClick={() => setOpen(true)}>{trigger}</span> : null}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle>New Task</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <TaskForm
                projectId={projectId}
                members={members}
                onSubmit={handleSubmit}
                submitLabel="Create task"
                onCancel={() => setOpen(false)}
                isSubmitting={createTask.isPending}
                apiErrors={apiErrors}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
