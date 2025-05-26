import React from "react";
import { FiFolder, FiPlus } from "react-icons/fi";

interface EmptyStateProps {
  onCreateNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNew }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      <FiFolder className="mb-4 h-16 w-16 text-gray-400" />
      <h3 className="mb-2 text-xl font-medium text-gray-900">
        No projects yet
      </h3>
      <p className="mb-6 text-gray-500">
        Get started by creating your first project
      </p>
      <button
        onClick={onCreateNew}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
      >
        <FiPlus className="h-5 w-5" />
        <span>New Project</span>
      </button>
    </div>
  );
};

export default EmptyState;
