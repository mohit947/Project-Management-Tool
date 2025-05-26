import React from "react";
import { FiCalendar, FiTag, FiUser } from "react-icons/fi";
import { format } from "date-fns";
import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <h3 className="font-medium text-gray-700">
          All Tasks ({tasks.length})
        </h3>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="mb-4 text-gray-500">No tasks found</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  {task.description && (
                    <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        task.status === "todo"
                          ? "bg-gray-100 text-gray-800"
                          : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.status === "todo"
                        ? "To Do"
                        : task.status === "in-progress"
                          ? "In Progress"
                          : "Done"}
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-col text-sm text-gray-500">
                    {task.deadline && (
                      <span className="flex items-center gap-1">
                        <FiCalendar className="h-3 w-3" />
                        {format(new Date(task.deadline), "MMM d, yyyy")}
                      </span>
                    )}

                    {task.assignee ? (
                      <span className="flex items-center gap-1">
                        <FiUser className="h-3 w-3" />
                        {task.assignee.name || task.assignee.email}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 italic">
                        <FiUser className="h-3 w-3" />
                        Unassigned
                      </span>
                    )}

                    <span className="flex items-center gap-1">
                      <FiTag className="h-3 w-3" />
                      {task.project.name}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            "Are you sure you want to delete this task?",
                          )
                        ) {
                          onDelete(task.id);
                        }
                      }}
                      className="rounded-md border border-red-300 bg-white px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
