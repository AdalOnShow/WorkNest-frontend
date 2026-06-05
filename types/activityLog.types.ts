export type ActivityAction =
  | 'PROJECT_CREATED'
  | 'PROJECT_UPDATED'
  | 'TASK_CREATED'
  | 'TASK_ASSIGNED'
  | 'TASK_COMPLETED'
  | 'MEMBER_ADDED';

export interface IActivityActor {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface IActivityLog {
  id: string;
  action: ActivityAction;
  entityType: string;
  entityId: string;
  meta: Record<string, unknown> | null;
  createdAt: string;
  actorId: string;
  actor: IActivityActor;
  projectId: string | null;
}

export interface IProjectActivityResponse {
  data: IActivityLog[];
  total: number;
}
