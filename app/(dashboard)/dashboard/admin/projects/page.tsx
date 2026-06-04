"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, MoreVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAdminProjects, useDeleteProject } from "@/hooks/useAdmin";
import type { IAdminProject } from "@/types/admin.types";

const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  ACTIVE: "default",
  COMPLETED: "secondary",
  ARCHIVED: "outline",
};

export default function AdminProjectsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const query = {
    page,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
  };

  const { data, isLoading, error } = useAdminProjects(query);
  const deleteProject = useDeleteProject();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  };

  if (isLoading && !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-destructive">
        Failed to load projects
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all projects across the platform
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-64 pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:border-ring"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((project: IAdminProject) => (
              <TableRow key={project.id}>
                <TableCell>
                  <p className="font-medium">{project.name}</p>
                  {project.description && (
                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {project.description}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[project.status] || "outline"}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.memberCount}</TableCell>
                <TableCell>{project.taskCount}</TableCell>
                <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this project?")) {
                            deleteProject.mutate(project.id);
                          }
                        }}
                        className="text-destructive focus:text-destructive"
                        disabled={deleteProject.isPending}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {data?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} — {data?.total} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
