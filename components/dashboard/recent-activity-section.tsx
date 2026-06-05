'use client';

import { ActivityFeed } from '@/components/activity/activity-feed';
import { useRecentActivity } from '@/hooks/useActivityLog';

export function RecentActivitySection() {
  const { data: logs, isLoading } = useRecentActivity(10);

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-semibold">Recent Activity</h3>
      <ActivityFeed
        logs={logs}
        isLoading={isLoading}
        emptyMessage="Create a project or task to see activity here."
      />
    </section>
  );
}
