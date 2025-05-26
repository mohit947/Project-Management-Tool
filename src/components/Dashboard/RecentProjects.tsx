import React from "react";
import Link from "next/link";
import type { Task } from "@/types/task";

interface Project {
  id: string;
  name: string;
  description: string | null;
}

interface RecentProjectsProps {
  projects: Project[];
  tasks: Task[];
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects, tasks }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-gray-700">Recent Projects</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {projects.length > 0 ? (
          projects.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.project.id === project.id,
            );
            const completedProjectTasks = projectTasks.filter(
              (task) => task.status === "done",
            ).length;
            const projectProgress =
              projectTasks.length > 0
                ? Math.round(
                    (completedProjectTasks / projectTasks.length) * 100,
                  )
                : 0;

            return (
              <div key={project.id} className="p-4 hover:bg-gray-50">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <span className="text-sm text-gray-500">
                    {projectTasks.length} tasks
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600">
                  {project.description || "No description provided"}
                </p>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {projectProgress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: `${projectProgress}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-center text-gray-500">No projects found</div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
        <Link
          href="/projects"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          View all projects →
        </Link>
      </div>
    </div>
  );
};

export default RecentProjects;
