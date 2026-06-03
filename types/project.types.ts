export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type MemberRole = 'PROJECT_MANAGER' | 'TEAM_MEMBER';

export interface IProject {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  taskCount: number;
  completedTaskCount: number;
  currentUserRole: MemberRole | null;
}

export interface IProjectMember {
  id: string;
  role: MemberRole;
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
}

export interface ICreateProjectInput {
  name: string;
  description?: string;
  status?: ProjectStatus;
  deadline?: string;
}

export interface IUpdateProjectInput {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
  deadline?: string | null;
}

export interface IAddMemberInput {
  email: string;
  role: MemberRole;
}

export interface IUserSearchResult {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}
