import React, { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { api } from "@/utils/api";

interface UserFormProps {
  editingId: string | null;
  initialName?: string;
  initialEmail?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UserForm({
  editingId,
  initialName = "",
  initialEmail = "",
  onSuccess,
  onCancel,
}: UserFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
  }, [initialName, initialEmail]);

  const createUser = api.user.create.useMutation({
    onSuccess,
  });

  const updateUser = api.user.update.useMutation({
    onSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim())
      return alert("Name and email are required");

    if (editingId) {
      updateUser.mutate({ id: editingId, name, email });
    } else {
      createUser.mutate({ name, email, password: newPassword });
    }

    setName("");
    setEmail("");
    setNewPassword("");
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
    >
      <h3 className="mb-4 text-lg font-medium text-gray-800">
        {editingId ? "Edit User" : "Create New User"}
      </h3>

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {!editingId && (
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter password"
          />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          <FiSave className="h-5 w-5" />
          <span>{editingId ? "Update User" : "Create User"}</span>
        </button>

        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
