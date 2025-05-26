import React from "react";
import Link from "next/link";
import { FiFlag } from "react-icons/fi";
import { format } from "date-fns";

interface OverdueTask {
  id: string;
  title: string;
  deadline: Date | string | null;
  project?: {
    name: string;
  };
  assignee?: {
    name: string | null;
  } | null;
}

interface OverdueTasksProps {
  tasks: OverdueTask[];
  today: Date;
}

const OverdueTasks: React.FC<OverdueTasksProps> = ({ tasks, today }) => {
  if (tasks.length === 0) return null;

  return (
    <div className="mt-8 rounded-lg border border-red-200 bg-white shadow-sm">
      <div className="border-b border-red-200 bg-red-50 px-6 py-4">
        <h2 className="font-medium text-red-700">Overdue Tasks</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <FiFlag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  {task.project?.name} • {task.assignee?.name || "Unassigned"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                Due{" "}
                {task.deadline ? format(new Date(task.deadline), "MMM d") : ""}
              </span>
              <span className="mt-1 text-xs text-red-600">
                {task.deadline
                  ? Math.ceil(
                      (today.getTime() - new Date(task.deadline).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )
                  : ""}{" "}
                days overdue
              </span>
            </div>
          </div>
        ))}
      </div>
      {tasks.length > 3 && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
          <Link
            href="/tasks"
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            View all {tasks.length} overdue tasks →
          </Link>
        </div>
      )}
    </div>
  );
};

export default OverdueTasks;
