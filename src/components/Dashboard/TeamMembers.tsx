import React from "react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import type { Task } from "@/types/task";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface TeamMembersProps {
  users: User[];
  tasks: Task[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ users, tasks }) => {
  const activeUsers = users
    .filter((user) =>
      tasks.some(
        (task) => task.assignee?.id === user.id && task.status !== "done",
      ),
    )
    .slice(0, 5);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-gray-700">Active Team Members</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activeUsers.length > 0 ? (
          activeUsers.map((user) => {
            const userTasks = tasks.filter(
              (task) => task.assignee?.id === user.id,
            );
            const pendingTasks = userTasks.filter(
              (task) => task.status !== "done",
            ).length;

            return (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {user.name || user.email}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {pendingTasks} pending task{pendingTasks !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-center text-gray-500">
            No active team members
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
        <Link
          href="/users"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          View all team members →
        </Link>
      </div>
    </div>
  );
};

export default TeamMembers;
