export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface ITask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  assigneeId: string | null;
  assignee: { id: string; name: string; email: string; avatarUrl: string | null } | null;
  creatorId: string;
  creator: { id: string; name: string; email: string; avatarUrl: string | null };
}

export interface ICreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string | null;
  deadline?: string;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string | null;
  deadline?: string | null;
}

export interface ITaskQuery {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeId?: string | null;
  deadlineStatus?: 'overdue' | 'upcoming' | 'none';
  search?: string;
}

export interface ITaskMemberOption {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: 'PROJECT_MANAGER' | 'TEAM_MEMBER';
}
