# WorkNest-frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

> The frontend client for **WorkNest** — a full-stack project and task collaboration platform.  
> Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Magic UI**, **TanStack Query**, and **Recharts**.

🔗 **Live Application:** https://work-nest-adal.vercel.app/  
📦 **Frontend Repo:** https://github.com/AdalOnShow/WorkNest-frontend  
🔧 **Backend Repo:** https://github.com/AdalOnShow/WorkNest-backend

---

## Features

| Category | Description |
|---|---|
| **Authentication** | JWT-based login, register, logout, and silent token refresh via HTTP-only cookies |
| **Projects** | Full CRUD, member management, scoped visibility, PM auto-assignment on creation |
| **Tasks** | Full CRUD, advanced filtering (status / priority / assignee / deadline), status updates, assignment rules |
| **Dashboard** | Live platform-wide stats (total projects, tasks, completed, pending, overdue) + Recharts analytics |
| **Comments** | Threaded task comments with author, timestamp, and delete support |
| **Notifications** | Bell icon with unread badge, task-assignment alerts, due-date reminders, mark-read actions |
| **Attachments** | File upload to tasks via Cloudinary, list all attachments per task |
| **Activity Log** | Chronological project activity feed (tasks, members, projects) |
| **Admin Panel** | System-wide user management, project listing and deletion, dedicated admin dashboard |
| **Search & Filtering** | Server-side search across projects, tasks, and members |
| **Responsive UI** | Collapsible sidebar, mobile-friendly layout |
| **Toast Notifications** | Sonner-powered feedback for all CRUD and auth actions |

---

## Cloning This Repo

```bash
git clone https://github.com/AdalOnShow/WorkNest-frontend.git
cd WorkNest-frontend
```

---

## Project Setup

### 1. Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 9.x
- **Git**

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Required Environment Variables

Create a `.env.local` file in the project root based on `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the WorkNest backend API | `http://localhost:5000/api/v1` |

> **Note:** This frontend is hardcoded to communicate with the backend running on `localhost:5000`. If your backend is deployed on a different host, update this URL accordingly.

### 4. Start the Development Server

```bash
pnpm dev
```

The application runs at **http://localhost:3000**.

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@worknest.com` | `Admin1234` |
| **Team Member** | *(register any new account — defaults to TEAM_MEMBER)* | your password |
| **Project Manager** | *(create any new project — you become PM for that project)* | your password |

---

## Build & Production

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

---

## Deployment

This frontend is deployed on **Vercel**.

1. Push your changes to GitHub
2. Import the repository in the [Vercel Dashboard](https://vercel.com/new)
3. Set the **Framework Preset** to `Next.js`
4. Add the environment variable `NEXT_PUBLIC_API_URL` pointing to your backend
5. Deploy

### Environment Variables (Production)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api/v1` (or your deployed backend URL) |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 14** | React framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Base UI primitive components |
| **Magic UI** | Animated dashboard components (Framer Motion based) |
| **TanStack Query** | Server state management |
| **Recharts** | Charts and analytics |
| **React Hook Form + Zod** | Form handling and validation |
| **Axios** | HTTP client (cookie-based auth) |
| **Sonner** | Toast notifications |

---

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server (localhost:3000) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Related Repositories

- 🔧 **Backend (Express + Prisma):** https://github.com/AdalOnShow/WorkNest-backend
- 🌐 **Live App:** https://work-nest-adal.vercel.app/

---

## About

Built as a full-stack demonstration of modern web development practices: modular architecture, role-based access control, real-time collaboration flows, file uploads, and production-ready CI/CD pipelines.

**Developer:** [Adal](https://github.com/adalOnShow)  
**Portfolio:** https://sharif-adal.web.app/  
**Email:** adalonshow@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/AdalOnShow/
