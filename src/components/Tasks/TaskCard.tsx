import React from "react";
import { FiCalendar, FiUser } from "react-icons/fi";
import { format } from "date-fns";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md"
      onClick={() => onClick(task)}
    >
      <h4 className="mb-2 font-medium text-gray-800">{task.title}</h4>

      {task.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
            task.priority === "high"
              ? "bg-red-100 text-red-800"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {task.priority}
        </span>

        {task.deadline && (
          <span className="flex items-center gap-1 text-gray-500">
            <FiCalendar className="h-3 w-3" />
            {format(new Date(task.deadline), "MMM d, yyyy")}
          </span>
        )}

        {task.assignee && (
          <span className="flex items-center gap-1 text-gray-500">
            <FiUser className="h-3 w-3" />
            {task.assignee.name || task.assignee.email}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
