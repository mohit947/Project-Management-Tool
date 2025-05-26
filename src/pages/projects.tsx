import React, { useState } from "react";
import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import EmptyState from "@/components/Projects/EmptyState";
import type { Project } from "@/types/project";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(() => import("@/components/Projects/ProjectForm"), {
  loading: () => <div className="p-4">Loading form...</div>,
});

const ProjectList = dynamic(() => import("@/components/Projects/ProjectList"), {
  loading: () => <div className="p-4">Loading project list...</div>,
});

export default function ProjectsPage() {
  const { data: projects = [], refetch } = api.project.getAll.useQuery();
  const createProject = api.project.create.useMutation({
    onSuccess: () => void refetch(),
  });
  const updateProject = api.project.update.useMutation({
    onSuccess: () => void refetch(),
  });
  const deleteProject = api.project.delete.useMutation({
    onSuccess: () => void refetch(),
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Project name is required");

    if (editingId) {
      updateProject.mutate({ id: editingId, name, description });
    } else {
      createProject.mutate({ name, description });
    }
    resetForm();
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description || "");
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteProject.mutate({ id });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProjectHeader
          showForm={showForm}
          onShowForm={() => setShowForm(true)}
        />

        {showForm && (
          <ProjectForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            isEditing={!!editingId}
          />
        )}

        {projects.length === 0 ? (
          <EmptyState onCreateNew={() => setShowForm(true)} />
        ) : (
          <ProjectList
            projects={projects}
            onEdit={startEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Layout>
  );
}
