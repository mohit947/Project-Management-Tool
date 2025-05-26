import type { Project } from "@/types/project";
import type { User } from "@/types/user";
import React from "react";
import { FiFilter, FiX } from "react-icons/fi";

interface TaskFiltersProps {
  statusFilter: string | null;
  priorityFilter: string | null;
  projectFilter: string | null;
  assigneeFilter: string | null;
  projects: Project[];
  users: any;
  onStatusFilterChange: (value: string | null) => void;
  onPriorityFilterChange: (value: string | null) => void;
  onProjectFilterChange: (value: string | null) => void;
  onAssigneeFilterChange: (value: string | null) => void;
  onClearFilters: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  statusFilter,
  priorityFilter,
  projectFilter,
  assigneeFilter,
  projects,
  users,
  onStatusFilterChange,
  onPriorityFilterChange,
  onProjectFilterChange,
  onAssigneeFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <FiFilter className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter || ""}
            onChange={(e) => onStatusFilterChange(e.target.value || null)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            value={priorityFilter || ""}
            onChange={(e) => onPriorityFilterChange(e.target.value || null)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={projectFilter || ""}
            onChange={(e) => onProjectFilterChange(e.target.value || null)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm"
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={assigneeFilter || ""}
            onChange={(e) => onAssigneeFilterChange(e.target.value || null)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm"
          >
            <option value="">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
          </select>

          {(statusFilter ||
            priorityFilter ||
            projectFilter ||
            assigneeFilter) && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
            >
              <FiX className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
