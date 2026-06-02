import Link from "next/link";
import { FolderKanban } from "lucide-react";

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
        <Link href="/" className="mb-8 flex items-center gap-2.5 self-start">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FolderKanban className="size-5" />
          </span>
          <span className="text-xl font-bold">
            Work<span className="text-primary">Nest</span>
          </span>
        </Link>

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </section>

        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </main>
  );
}
