import React from "react";
import { FiPlus } from "react-icons/fi";

interface TaskHeaderProps {
  onNewTask: () => void;
  showForm: boolean;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onNewTask, showForm }) => {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h2 className="text-3xl font-bold text-gray-800">Task Management</h2>

      {!showForm && (
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          <FiPlus className="h-5 w-5" />
          <span>New Task</span>
        </button>
      )}
    </div>
  );
};

export default TaskHeader;
