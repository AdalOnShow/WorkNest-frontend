'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { toast } from 'sonner';
import { CalendarIcon, ChevronDown, X } from 'lucide-react';
import { format } from 'date-fns';
import type { ITaskMemberOption, TaskPriority, TaskStatus } from '@/types/task.types';

const taskFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(5000).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assigneeId: z.string().uuid().nullable().optional(),
  deadline: z.string().nullable().optional(),
});

export type FormData = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  projectId: string;
  members: ITaskMemberOption[];
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: {
    title?: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: string | null;
    deadline?: string | null;
  };
  submitLabel?: string;
  onCancel?: () => void;
}

export function TaskForm({
  projectId,
  members,
  onSubmit,
  initialData,
  submitLabel = 'Create Task',
  onCancel,
}: TaskFormProps) {
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    initialData?.deadline ? new Date(initialData.deadline) : undefined,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || 'TODO',
      priority: initialData?.priority || 'MEDIUM',
      assigneeId: initialData?.assigneeId || null,
      deadline: initialData?.deadline || null,
    },
  });

  useEffect(() => {
    setValue('deadline', date ? format(date, 'yyyy-MM-dd') : null);
  }, [date, setValue]);

  const assigneeId = watch('assigneeId');
  const assignedMember = members.find((m) => m.id === assigneeId);

  const unassign = () => {
    setValue('assigneeId', null);
    setShowMemberSearch(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} placeholder="Enter task title" />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea id="description" {...register('description')} rows={3} />
      </div>

      {/* Status + Priority row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            defaultValue={initialData?.status || 'TODO'}
            onValueChange={(val) => setValue('status', val as TaskStatus)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="IN_REVIEW">In Review</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>
          <Select
            defaultValue={initialData?.priority || 'MEDIUM'}
            onValueChange={(val) => setValue('priority', val as TaskPriority)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assignee combobox */}
      <div className="space-y-2">
        <Label>Assignee (optional)</Label>
        {assignedMember && !showMemberSearch ? (
          <div className="flex items-center justify-between rounded-md border p-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={assignedMember.avatarUrl || undefined} />
                <AvatarFallback className="text-[10px]">
                  {assignedMember.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{assignedMember.name}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={unassign}
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ) : (
          <Popover open={showMemberSearch} onOpenChange={setShowMemberSearch}>
          <PopoverTrigger>
            <Button variant="outline" className="w-full justify-between">
              {assignedMember
                  ? assignedMember.name
                  : 'Select assignee'}
                <ChevronDown className="size-4" />
            </Button>
          </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search members…" />
                <CommandEmpty>No member found.</CommandEmpty>
                <CommandGroup>
                  {members.map((m) => (
                    <CommandItem
                      key={m.id}
                      onSelect={() => {
                        setValue('assigneeId', m.id);
                        setShowMemberSearch(false);
                      }}
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
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Deadline */}
      <div className="space-y-2">
        <Label>Deadline (optional)</Label>
        <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
               <CalendarIcon className="mr-2 size-4" />
                {date ? format(date, 'PPP') : 'No deadline'}
              </Button>
            </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} />
            {date && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => setDate(undefined)}
                >
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
