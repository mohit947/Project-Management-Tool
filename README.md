# 🗂️ Task Management and Collaboration Tool

A full-stack task management application enabling teams to manage projects, assign tasks, and track progress. Built using the **T3 Stack** (Next.js + TypeScript + TailwindCSS), **Supabase** for authentication and database, and **SST** for deploying the backend serverlessly on AWS.

---

## 🚀 Features

- 🔧 **Task Management**: Create, assign, and update tasks with projects, status, priorities, deadline, and team members.
- 👤 **User Profiles**: Manage personal information and projects & tasks.
- 🧩 **Dashboard**: Centralized view of ongoing tasks, deadlines, completion rate, graph and project timelines.
- ✅ **Authentication**: Email and password login powered by Supabase.
- 🛠️ **SST + AWS**: Fully serverless backend deployed via SST.

---

## 🏗️ Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Frontend   | Next.js, TypeScript, TailwindCSS |
| Backend    | SST (Serverless Stack), tRPC     |
| Database   | Supabase (PostgreSQL)            |
| Auth       | Supabase Auth (email/password)   |
| Deployment | AWS via SST                      |

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/project-management-app.git
cd project-management-app
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Configure Environment Variables

Create `.env.local` in both `apps/web` and `packages/backend` with the following:

```env
DATABASE_URL="postgresql://postgres:t00rot!@db.bpbnzsrmregwipylhuei.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://bpbnzsrmregwipylhuei.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYm56c3JtcmVnd2lweWxodWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTk2MDMsImV4cCI6MjA2MzMzNTYwM30.5ajpc-goPQgxIbQIYWPoVMCJgoyP3cnnRef2zfZO6HU
```

---

## 🧬 Database Setup with Supabase

### 1. Set Up Supabase Project

- Go to [supabase.com](https://supabase.com/)
- Create a new project
- Get your project URL and keys

### 2. Define Schema with Prisma

```bash
npx prisma generate
npx prisma db push
```

Your schema includes:

- **User**
- **Project**
- **Task**

---

## ⚙️ Backend Deployment with SST

### 1. Configure SST

Configure sst.config.ts file
Run npx sst deploy

### 2. AWS Credentials

Set AWS credentials using:

```bash
aws configure
```

## 📊 Testing

Install cypress
Run the cypress tests available in folder cypress/e2e with command npm run cypress

---

## 🖥️ UI Features

- 🔍 Search and filter tasks
- 🏷️ Assign priorities and status update
- 📅 Due date management
- 👥 Invite and assign users to tasks
- 📈 Project overview dashboard and many more....

---

## 🔐 Authentication & Authorization

- Users can sign up / sign in via email/password

---

## 📡 Hosting

- **Frontend** hosted via **Vercel** or SST Static Sites
- **Backend** deployed via **SST on AWS Lambda**
- **Database** and **Auth** hosted on **Supabase**

---

## 📸 Working video

You can find the video of the working application here:

---

## 👨‍💻 Author

Made with ❤️ by Mohit(https://github.com/mohit947)

---
