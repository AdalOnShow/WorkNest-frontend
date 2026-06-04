"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Mail, Calendar, Shield, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminUser } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";

const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  ADMIN: "default",
  PROJECT_MANAGER: "secondary",
  TEAM_MEMBER: "outline",
};

export default function AdminUserDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: user, isLoading, error } = useAdminUser(id);
  const { user: currentUser } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-destructive">
        User not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/admin/users" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Link>

      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={statusColors[user.role] || "outline"} className="text-base">
              {user.role}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={user.isActive ? "default" : "destructive"} className="text-base">
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Joined</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ID</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-mono text-xs">{user.id}</p>
          </CardContent>
        </Card>
      </div>

      {currentUser?.id !== user.id && (
        <div className="flex gap-2">
          <Button variant="outline">Edit User</Button>
          <Button variant="destructive">Delete User</Button>
        </div>
      )}
    </div>
  );
}
