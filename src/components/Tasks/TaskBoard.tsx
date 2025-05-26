import React from "react";
import TaskCard from "./TaskCard";
import type { Task } from "@/types/task";

interface TaskBoardProps {
  groupedTasks: Record<string, Task[]>;
  onTaskClick: (task: Task) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ groupedTasks, onTaskClick }) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <div
          key={status}
          className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md"
        >
          <div className="border-b border-gray-200 bg-gray-50 p-3">
            <h3 className="font-medium text-gray-700">
              {status === "todo"
                ? "To Do"
                : status === "in-progress"
                  ? "In Progress"
                  : "Done"}
              <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                {statusTasks.length}
              </span>
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
              {statusTasks.length === 0 ? (
                <p className="py-3 text-center text-sm text-gray-500">
                  No tasks
                </p>
              ) : (
                statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
