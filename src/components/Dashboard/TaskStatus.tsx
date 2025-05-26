import React from "react";

interface TaskStatusProps {
  tasksByStatus: {
    todo: number;
    inProgress: number;
    done: number;
  };
  totalTasks: number;
  completionRate: number;
}

const TaskStatus: React.FC<TaskStatusProps> = ({
  tasksByStatus,
  totalTasks,
  completionRate,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-gray-700">Task Status</h2>
      </div>
      <div className="p-6">
        <div className="mb-6 flex h-36 items-end justify-between gap-2">
          <div className="flex w-1/4 flex-col items-center">
            <div
              className="w-full rounded-t-lg bg-gray-200"
              style={{
                height: `${tasksByStatus.todo > 0 ? (tasksByStatus.todo / totalTasks) * 100 : 0}%`,
                minHeight: tasksByStatus.todo > 0 ? "20px" : "5px",
              }}
            ></div>
            <span className="mt-2 text-xs font-medium text-gray-500">
              To Do
            </span>
            <span className="text-sm font-bold text-gray-700">
              {tasksByStatus.todo}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center">
            <div
              className="w-full rounded-t-lg bg-blue-400"
              style={{
                height: `${tasksByStatus.inProgress > 0 ? (tasksByStatus.inProgress / totalTasks) * 100 : 0}%`,
                minHeight: tasksByStatus.inProgress > 0 ? "20px" : "5px",
              }}
            ></div>
            <span className="mt-2 text-xs font-medium text-gray-500">
              In Progress
            </span>
            <span className="text-sm font-bold text-gray-700">
              {tasksByStatus.inProgress}
            </span>
          </div>

          <div className="flex w-1/4 flex-col items-center">
            <div
              className="w-full rounded-t-lg bg-green-400"
              style={{
                height: `${tasksByStatus.done > 0 ? (tasksByStatus.done / totalTasks) * 100 : 0}%`,
                minHeight: tasksByStatus.done > 0 ? "20px" : "5px",
              }}
            ></div>
            <span className="mt-2 text-xs font-medium text-gray-500">Done</span>
            <span className="text-sm font-bold text-gray-700">
              {tasksByStatus.done}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-indigo-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-700">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-indigo-700">
              {completionRate}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-indigo-200">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
