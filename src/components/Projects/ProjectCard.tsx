import React, { useState, useRef } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      onDelete(project.id);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const MAX_DESCRIPTION_LENGTH = 50;

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="flex-1 p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          {project.name}
        </h3>
        {project.description && (
          <div
            className="relative mb-4 text-gray-600"
            ref={descriptionRef}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <p>{truncateText(project.description, MAX_DESCRIPTION_LENGTH)}</p>

            {showTooltip &&
              project.description.length > MAX_DESCRIPTION_LENGTH && (
                <div className="absolute top-full left-0 z-20 mt-1 w-64 max-w-xs rounded-md bg-gray-800 p-2 text-sm text-white shadow-lg">
                  {project.description}
                  <div className="absolute -top-2 left-4 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-gray-800"></div>
                </div>
              )}
          </div>
        )}
        <div className="mt-2 text-sm text-gray-500">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex justify-end space-x-2 border-t border-gray-100 bg-gray-50 p-4">
        <button
          onClick={() => onEdit(project)}
          className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <FiEdit2 className="h-4 w-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          <FiTrash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
