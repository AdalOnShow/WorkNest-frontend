import api from "@/lib/api";
import type {
  AdminDashboardData,
  MemberDashboardData,
  PMDashboardData,
} from "@/types/dashboard.types";

export const dashboardService = {
  getAdminDashboard(): Promise<AdminDashboardData> {
    return api
      .get<{ success: true; data: AdminDashboardData }>("/dashboard/admin")
      .then((response) => response.data.data);
  },

  getPMDashboard(): Promise<PMDashboardData> {
    return api
      .get<{ success: true; data: PMDashboardData }>("/dashboard/pm")
      .then((response) => response.data.data);
  },

  getMemberDashboard(): Promise<MemberDashboardData> {
    return api
      .get<{ success: true; data: MemberDashboardData }>("/dashboard/member")
      .then((response) => response.data.data);
  },
};
