"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-chart-4/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-2/8 rounded-full blur-[140px] animate-pulse [animation-delay:4s]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 bg-primary/5 text-primary backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            Now in Public Beta — Free for Teams
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          Where teams{" "}
          <span className="bg-gradient-to-r from-primary via-chart-4 to-primary bg-clip-text text-transparent">
            build together
          </span>
          , ship faster
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          WorkNest is the all-in-one project management platform for modern teams.
          Track tasks, manage workloads, and supercharge your team&apos;s productivity
          — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
            >
              Start for Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#features">
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 border-border/50 hover:bg-accent"
            >
              See Features
            </Button>
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                "bg-primary/80",
                "bg-chart-2/80",
                "bg-chart-4/80",
                "bg-chart-3/80",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${color} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <span>
              Trusted by <strong className="text-foreground">2,500+</strong> teams
            </span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border" />
          <div className="hidden sm:flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-500 fill-yellow-500"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1">
              <strong className="text-foreground">4.9</strong>/5 rating
            </span>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent rounded-2xl blur-2xl -z-10" />

          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl shadow-black/20 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground font-mono">
                  app.worknest.io/dashboard
                </span>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="p-6 space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Projects", value: "24", change: "+3" },
                  { label: "Active Tasks", value: "142", change: "+12" },
                  { label: "Completed", value: "89", change: "+8" },
                  { label: "Team Members", value: "36", change: "+5" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-xs text-emerald-400 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart mockup */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 p-4 rounded-lg bg-muted/30 border border-border/30 h-40">
                  <p className="text-xs text-muted-foreground mb-3">
                    Team Productivity
                  </p>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-primary/30"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30 h-40">
                  <p className="text-xs text-muted-foreground mb-3">
                    Task Status
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { label: "Done", pct: 62, color: "bg-emerald-500" },
                      { label: "In Progress", pct: 25, color: "bg-primary" },
                      { label: "To Do", pct: 13, color: "bg-muted-foreground/40" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{item.label}</span>
                          <span>{item.pct}%</span>
                        </div>
                        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
