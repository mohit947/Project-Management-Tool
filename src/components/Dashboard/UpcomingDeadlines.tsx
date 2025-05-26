import React from "react";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";

interface DeadlineTask {
  id: string;
  title: string;
  deadline: Date | string | null;
  priority: string;
  project?: {
    name: string;
  };
  assignee?: {
    name: string | null;
  } | null;
}

interface UpcomingDeadlinesProps {
  tasks: DeadlineTask[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ tasks }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-gray-700">Upcoming Deadlines</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <FiCalendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    {task.project?.name} • {task.assignee?.name || "Unassigned"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                  Due{" "}
                  {task.deadline
                    ? format(new Date(task.deadline), "MMM d")
                    : ""}
                </span>
                <span
                  className={`mt-1 text-xs ${
                    task.priority === "high"
                      ? "text-red-600"
                      : task.priority === "medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No upcoming deadlines in the next 7 days
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
        <Link
          href="/tasks"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          View all tasks →
        </Link>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
