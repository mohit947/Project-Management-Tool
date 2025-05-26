import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiSave, FiX } from "react-icons/fi";
import { api } from "@/utils/api";
import type { Task } from "@/types/task";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  tasks?: Task[];
}

interface UserProfileProps {
  user: User;
  onClose: () => void;
  refetch: () => void;
}

export default function UserProfile({
  user,
  onClose,
  refetch,
}: UserProfileProps) {
  const [profileTab, setProfileTab] = useState<"info" | "projects">("info");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email?.trim()) {
      alert("Name and email are required");
      return;
    }

    updateUser.mutate({
      id: user.id,
      name,
      email,
    });
    alert("Profile updated successfully");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    alert("Password change functionality would be implemented here");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <FiUser className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {user.name || "Unnamed User"}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setProfileTab("info")}
            className={`px-6 py-3 text-sm font-medium ${
              profileTab === "info"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Personal Information
          </button>

          <button
            onClick={() => setProfileTab("projects")}
            className={`px-6 py-3 text-sm font-medium ${
              profileTab === "projects"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Projects & Tasks
          </button>
        </nav>
      </div>

      <div className="p-6">
        {profileTab === "info" && (
          <div className="space-y-6">
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Your email address"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  <FiSave className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="mb-4 text-lg font-medium text-gray-800">
                Change Password
              </h4>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label
                    htmlFor="current-password"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Your current password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      placeholder="New password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  >
                    <FiLock className="h-5 w-5" />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {profileTab === "projects" && (
          <div>
            <div>
              <h4 className="mb-4 text-lg font-medium text-gray-800">
                Assigned Tasks
              </h4>
              <div className="rounded-lg border border-gray-200">
                {user.tasks && user.tasks.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {user.tasks.map((task: Task) => (
                      <li
                        key={task.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div>
                          <h5 className="font-medium text-gray-800">
                            {task.title}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {task.project?.name || "Unknown project"} • Due:{" "}
                            {task.deadline
                              ? new Date(task.deadline).toLocaleDateString()
                              : "No deadline"}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            task.status === "done"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : task.status === "review"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status === "todo"
                            ? "To Do"
                            : task.status === "in-progress"
                              ? "In Progress"
                              : task.status === "review"
                                ? "Review"
                                : "Done"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No tasks assigned to this user
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
