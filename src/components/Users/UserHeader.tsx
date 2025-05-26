import React from "react";
import { FiUserPlus } from "react-icons/fi";

interface UserHeaderProps {
  viewingProfile: string | null;
  onAddNewUser: () => void;
}
function UserHeader({ viewingProfile, onAddNewUser }: UserHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <h2 className="text-2xl font-bold text-gray-800">Users</h2>

      {!viewingProfile && (
        <button
          onClick={onAddNewUser}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          <FiUserPlus className="h-5 w-5" />
          <span>Add New User</span>
        </button>
      )}
    </div>
  );
}

export default React.memo(UserHeader);
