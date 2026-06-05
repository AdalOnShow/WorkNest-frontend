// Re-export canonical role type from auth.types to avoid duplication
export type { UserRole } from "./auth.types";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

/* ------------------------------------------------------------------ */
/*  Shared chart sub-types                                             */
/* ------------------------------------------------------------------ */

export interface TaskStatusDistribution {
  status: TaskStatus;
  count: number;
}

export interface TaskPriorityDistribution {
  priority: TaskPriority;
  count: number;
}

export interface UserProductivityEntry {
  userId: string;
  userName: string;
  completedTaskCount: number;
}

export interface ProjectProgressEntry {
  projectId: string;
  projectName: string;
  totalTasks: number;
  completedTasks: number;
  completionRatio: number; // percentage, 0..100
}

/* ------------------------------------------------------------------ */
/*  Admin & PM — identical shape                                      */
/* ------------------------------------------------------------------ */

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

export interface AdminDashboardData {
  stats: DashboardStats;
  taskStatusDistribution: TaskStatusDistribution[];
  taskPriorityDistribution: TaskPriorityDistribution[];
  topUsersByProductivity: UserProductivityEntry[];
  projectProgress: ProjectProgressEntry[];
}

export type PMDashboardData = AdminDashboardData;

/* ------------------------------------------------------------------ */
/*  Member — different stats shape                                     */
/* ------------------------------------------------------------------ */

export interface MemberStats {
  myProjects: number;
  myAssignedTasks: number;
  myCompletedTasks: number;
  myOverdueTasks: number;
}

export interface CurrentWorkingProject {
  projectId: string;
  projectName: string;
}

export interface MemberDashboardData {
  stats: MemberStats;
  taskStatusDistribution: TaskStatusDistribution[];
  taskPriorityDistribution: TaskPriorityDistribution[];
  topUsersByProductivity: UserProductivityEntry[];
  projectProgress: ProjectProgressEntry[];
  currentWorkingProject: CurrentWorkingProject | null;
}
