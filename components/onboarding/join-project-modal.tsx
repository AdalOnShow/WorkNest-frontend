"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface JoinProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export function JoinProjectModal({ open, onClose }: JoinProjectModalProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!user?.email) return;
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied — silently ignore
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>How to join a project</DialogTitle>
          <DialogDescription>
            Share your email address with a Project Manager. They can add you to
            their project from the Members section.
          </DialogDescription>
        </DialogHeader>

        {/* Email display row */}
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-muted p-3">
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {user?.email}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green-500" />
                <span className="text-green-500">Copied ✓</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        <Button onClick={onClose} className="mt-4 w-full">
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
}
