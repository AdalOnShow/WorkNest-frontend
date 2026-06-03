/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/hooks/useProjects";
import {
  ProjectForm,
  projectFormSchema,
} from "@/components/projects/project-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

export default function NewProjectPage() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "ACTIVE",
      deadline: "",
    } as z.infer<typeof projectFormSchema>,
    validators: {
      onSubmit: projectFormSchema,
    },
    onSubmit: async ({ value }) => {
      createProject(
        {
          ...value,
          description: value.description || undefined,
          deadline: value.deadline || undefined,
        },
        {
          onSuccess: (project) => {
            toast.success("Project created successfully");
            router.push(`/projects/${project.id}`);
          },
          onError: (error: any) => {
            toast.error(
              error.response?.data?.message || "Failed to create project",
            );
          },
        },
      );
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/projects"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to projects
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight">
          Create new project
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details to get started with your new project.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <ProjectForm form={form} />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/projects")}
              disabled={isPending}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isPending}>
                  {isPending ? "Creating..." : "Create project"}
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
