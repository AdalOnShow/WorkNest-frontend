"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard, LogOut, Settings, UserCircle, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Settings", href: "/settings", icon: Settings },
];

const adminNavItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Projects", href: "/dashboard/admin/projects", icon: FolderKanban },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const resolvedNavItems = user?.role === "ADMIN" ? adminNavItems : navItems;
  const admin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-card/80 px-4 py-5 lg:block">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FolderKanban className="size-5" />
          </span>
          <span className="text-lg font-bold">
            Work<span className="text-primary">Nest</span>
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {resolvedNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/10 text-primary",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div>
              <p className="text-sm text-muted-foreground">Workspace</p>
              <h1 className="text-lg font-semibold">WorkNest</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/settings" className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <Avatar>
                  {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                  <AvatarFallback>{user ? getInitials(user.name) : <UserCircle className="size-4" />}</AvatarFallback>
                </Avatar>
                <span className="max-w-36 truncate">{user?.name}</span>
              </Link>
              <Button type="button" variant="outline" size="sm" onClick={() => void logout()}>
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 lg:hidden">
            {resolvedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-8 shrink-0 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground",
                  pathname === item.href && "bg-primary/10 text-primary",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
