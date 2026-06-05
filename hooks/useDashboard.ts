import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import type { AdminDashboardData, MemberDashboardData, PMDashboardData, UserRole } from "@/types/dashboard.types";
import { useAuth } from "./useAuth";

type DashboardResponse = AdminDashboardData | PMDashboardData | MemberDashboardData;

export function useDashboard() {
  const { user } = useAuth();
  const role = (user?.role ?? "TEAM_MEMBER") as UserRole;

  const queryKey =
    role === "ADMIN"
      ? ["dashboard", "admin"]
      : role === "PROJECT_MANAGER"
        ? ["dashboard", "pm"]
        : ["dashboard", "member"];

  const queryFn =
    role === "ADMIN"
      ? dashboardService.getAdminDashboard
      : role === "PROJECT_MANAGER"
        ? dashboardService.getPMDashboard
        : dashboardService.getMemberDashboard;

  return useQuery<DashboardResponse>({
    queryKey,
    queryFn: queryFn as () => Promise<DashboardResponse>,
  });
}

export function useInvalidateDashboard() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["dashboard"] });
}
