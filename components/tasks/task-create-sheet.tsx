'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCreateTask } from '@/hooks/useTasks';
import { useTaskMembers } from '@/hooks/useTasks';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { TaskForm, type FormData } from '@/components/tasks/task-form';
import { ICreateTaskInput } from '@/types/task.types';

interface TaskCreateSheetProps {
  projectId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TaskCreateSheet({ projectId, open: controlledOpen, onOpenChange: onOpenChangeProp }: TaskCreateSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChangeProp ?? setInternalOpen;
  const { data: members = [] } = useTaskMembers(projectId);
  const createTask = useCreateTask(projectId);

  const handleSubmit = async (data: FormData) => {
    try {
      await createTask.mutateAsync(data as ICreateTaskInput);
      toast.success('Task created');
      setOpen(false);
    } catch {
      toast.error('Could not create task');
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button>
          <Plus className="mr-2 size-4" /> New task
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Task</SheetTitle>
        </SheetHeader>
        <div className="mt-6 px-1">
          <TaskForm
            projectId={projectId}
            members={members}
            onSubmit={handleSubmit}
            submitLabel="Create task"
            onCancel={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
