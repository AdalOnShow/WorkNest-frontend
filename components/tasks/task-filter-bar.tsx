'use client';

import { useTaskMembers } from '@/hooks/useTasks';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import type { ITaskQuery, TaskStatus, TaskPriority } from '@/types/task.types';

interface TaskFilterBarProps {
  query: ITaskQuery;
  onChange: (q: ITaskQuery) => void;
  projectId: string;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'IN_REVIEW', label: 'In Review' },
  { value: 'DONE', label: 'Done' },
];

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export function TaskFilterBar({ query, onChange, projectId }: TaskFilterBarProps) {
  const { data: members = [] } = useTaskMembers(projectId);

  const set = <K extends keyof ITaskQuery>(key: K, value: ITaskQuery[K] | undefined) => {
    onChange({ ...query, [key]: value });
  };

  const clear = () => onChange({});

  const hasFilters = Object.values(query).some((v) => v !== undefined && v !== '');

  const toggleArray = (key: 'status' | 'priority', value: string) => {
    const current = (query[key] || []) as string[];
    const nextValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    if (nextValues.length > 0) {
      if (key === 'status') {
        set(key, nextValues as TaskStatus[]);
      } else {
        set(key, nextValues as TaskPriority[]);
      }
    } else {
      set(key, undefined);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border bg-card p-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks…"
          value={query.search || ''}
          onChange={(e) => set('search', e.target.value || undefined)}
          className="pl-9"
        />
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap gap-1">
        {STATUS_OPTIONS.map((opt) => {
          const active = (query.status || []).includes(opt.value);
          return (
            <Button
              key={opt.value}
              variant={active ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleArray('status', opt.value)}
            >
              {opt.label}
            </Button>
          );
        })}
      </div>

      {/* Priority select */}
      <Select
        value={query.priority?.[0] || '_all'}
        onValueChange={(val) =>
          set('priority', val === '_all' ? undefined : ([val] as TaskPriority[]))
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All priorities</SelectItem>
          {PRIORITY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Assignee select */}
      <Select
        value={query.assigneeId || '_all'}
        onValueChange={(val) =>
          set('assigneeId', val === '_all' ? undefined : val)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All members</SelectItem>
          <SelectItem value="null">Unassigned</SelectItem>
          {members.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Deadline select */}
      <Select
        value={query.deadlineStatus || '_all'}
        onValueChange={(val) =>
          set('deadlineStatus', val === '_all' ? undefined : (val as any))
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Deadline" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">Any deadline</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
          <SelectItem value="upcoming">Due in 24h</SelectItem>
          <SelectItem value="none">No deadline</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clear}>
          <X className="mr-1 size-3.5" /> Clear
        </Button>
      )}
    </div>
  );
}
