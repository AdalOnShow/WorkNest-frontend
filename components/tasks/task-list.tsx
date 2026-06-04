'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/tasks/task-card';
import { TaskFilterBar } from '@/components/tasks/task-filter-bar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, ListChecks } from 'lucide-react';
import type { ITaskQuery, TaskStatus, TaskPriority } from '@/types/task.types';

interface TaskListProps {
  projectId: string;
  projectName: string;
  currentUserRole: string;
  onCreateTask: () => void;
}

export function TaskList({ projectId, projectName, currentUserRole, onCreateTask }: TaskListProps) {
  const [query, setQuery] = useState<ITaskQuery>({});

  const { data: tasks = [], isLoading, error } = useTasks(projectId, query);

  const isPM = currentUserRole === 'PROJECT_MANAGER';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {projectName} &middot; {tasks.length} task{tasks.length === 1 ? '' : 's'}
          </p>
        </div>
        {isPM && (
          <Button onClick={onCreateTask}>
            <Plus className="mr-2 size-4" /> New task
          </Button>
        )}
      </div>

      <TaskFilterBar
        query={query}
        onChange={setQuery}
        projectId={projectId}
      />

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-red-500">Failed to load tasks.</p>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
          <ListChecks className="size-10 text-muted-foreground mb-3" />
          <h4 className="font-semibold">No tasks found</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {Object.keys(query).length > 0
              ? 'Try adjusting your filters.'
              : 'Create a task to get started.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              projectId={projectId}
              currentUserRole={currentUserRole}
            />
          ))}
        </div>
      )}
    </div>
  );
}
