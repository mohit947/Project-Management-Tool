import React from "react";
import { FiUser, FiEdit, FiUserCheck, FiUserX } from "react-icons/fi";
import { api } from "@/utils/api";
import type { User } from "@/types/user";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onViewProfile: (user: User) => void;
  refetch: () => void;
}

export default function UserList({
  users,
  onEdit,
  onViewProfile,
  refetch,
}: UserListProps) {
  const deleteUser = api.user.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h3 className="font-medium text-gray-700">
          All Users ({users.length})
        </h3>
      </div>

      {users.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No users found.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {user.name || "Unnamed User"}
                    </h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onViewProfile(user)}
                    className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FiUserCheck className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => onEdit(user)}
                    className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FiEdit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this user?",
                        )
                      ) {
                        deleteUser.mutate({ id: user.id });
                      }
                    }}
                    className="flex items-center gap-1 rounded-md border border-red-300 bg-white px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiUserX className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
