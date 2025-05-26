import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import UserHeader from "@/components/Users/UserHeader";
import type { User } from "@/types/user";

const UserForm = dynamic(() => import("@/components/Users/UserForm"), {
  loading: () => <div className="p-4">Loading form...</div>,
});

const UserList = dynamic(() => import("@/components/Users/UserList"), {
  loading: () => <div className="p-4">Loading user list...</div>,
});

const UserProfile = dynamic(() => import("@/components/Users/UserProfile"), {
  loading: () => <div className="p-4">Loading user profile...</div>,
});

export default function UsersPage() {
  const { data: users = [], refetch } = api.user.getAll.useQuery();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setEditingId(null);
  }, []);

  const startEdit = useCallback((user: User) => {
    setEditingId(user.id);
  }, []);

  const viewProfile = useCallback((user: User) => {
    setViewingProfile(user.id);
  }, []);

  const closeProfile = useCallback(() => {
    setViewingProfile(null);
  }, []);

  const handleAddNewUser = useCallback(() => {
    resetForm();
    setEditingId(null);
  }, [resetForm]);

  const handleFormSuccess = useCallback(() => {
    void refetch();
    resetForm();
  }, [refetch, resetForm]);

  const currentViewedUser = users.find((user) => user.id === viewingProfile);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <UserHeader
          viewingProfile={viewingProfile}
          onAddNewUser={handleAddNewUser}
        />

        {viewingProfile && currentViewedUser && (
          <UserProfile
            user={currentViewedUser}
            onClose={closeProfile}
            refetch={refetch}
          />
        )}

        {!viewingProfile && (
          <UserForm
            editingId={editingId}
            initialName={
              editingId ? users.find((u) => u.id === editingId)?.name || "" : ""
            }
            initialEmail={
              editingId
                ? users.find((u) => u.id === editingId)?.email || ""
                : ""
            }
            onSuccess={handleFormSuccess}
            onCancel={resetForm}
          />
        )}

        {!viewingProfile && (
          <UserList
            users={users as User[]}
            onEdit={startEdit}
            onViewProfile={viewProfile}
            refetch={refetch}
          />
        )}
      </div>
    </Layout>
  );
}
