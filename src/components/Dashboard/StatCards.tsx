import React from "react";
import { FiCheckCircle, FiGrid, FiList, FiTrendingUp } from "react-icons/fi";

interface StatCardsProps {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalProjects,
  totalTasks,
  completedTasks,
  completionRate,
}) => {
  return (
    <div
      data-testid="stat-cards"
      className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        data-testid="total-projects"
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <FiGrid className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
          </div>
        </div>
      </div>

      <div
        data-testid="total-tasks"
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FiList className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
          </div>
        </div>
      </div>

      <div
        data-testid="completed-tasks"
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FiCheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
          </div>
        </div>
      </div>

      <div
        data-testid="completion-rate"
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <FiTrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {completionRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
