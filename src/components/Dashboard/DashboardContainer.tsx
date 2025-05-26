import React from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { isAfter, isBefore, addDays } from "date-fns";
import DashboardHeader from "./DashboardHeader";
import StatCards from "./StatCards";
import UpcomingDeadlines from "./UpcomingDeadlines";
import RecentProjects from "./RecentProjects";
import TaskStatus from "./TaskStatus";
import TeamMembers from "./TeamMembers";
import OverdueTasks from "./OverdueTasks";
import type { Task } from "@/types/task";
import type { Project } from "@/types/project";

const DashboardContainer: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: projects = [] } = api.project.getAll.useQuery();
  const { data: tasks = [] } = api.task.getAll.useQuery();
  const { data: users = [] } = api.user.getAll.useQuery();

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task: Task) => task.status === "done",
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const today = new Date();
  const nextWeek = addDays(today, 7);

  const upcomingDeadlines = tasks
    .filter(
      (task: Task) =>
        task.deadline &&
        task.status !== "done" &&
        isBefore(new Date(task.deadline), nextWeek) &&
        isAfter(new Date(task.deadline), today),
    )
    .sort(
      (a: any, b: any) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 5);

  const overdueTasks = tasks
    .filter(
      (task: any) =>
        task.deadline &&
        task.status !== "done" &&
        isBefore(new Date(task.deadline), today),
    )
    .sort(
      (a: any, b: any) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    );

  const tasksByStatus = {
    todo: tasks.filter((task: Task) => task.status === "todo").length,
    inProgress: tasks.filter((task: Task) => task.status === "in-progress")
      .length,
    done: tasks.filter((task: Task) => task.status === "done").length,
  };

  const recentProjects = [...projects]
    .sort(
      (a: Project, b: Project) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader userName={sessionData?.user?.name} />

      <StatCards
        totalProjects={totalProjects}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        completionRate={completionRate}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <UpcomingDeadlines tasks={upcomingDeadlines} />
          <RecentProjects projects={recentProjects} tasks={tasks} />
        </div>

        <div className="space-y-8">
          <TaskStatus
            tasksByStatus={tasksByStatus}
            totalTasks={totalTasks}
            completionRate={completionRate}
          />
          <TeamMembers users={users} tasks={tasks} />
        </div>
      </div>

      <OverdueTasks tasks={overdueTasks} today={today} />
    </div>
  );
};

export default DashboardContainer;
