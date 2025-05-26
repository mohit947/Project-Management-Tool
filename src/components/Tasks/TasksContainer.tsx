import React, { useState } from "react";
import { api } from "@/utils/api";
import type { Task } from "@/types/task";
import TaskHeader from "./TaskHeader";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import TaskBoard from "./TaskBoard";
import TaskList from "./TaskList";

const TasksContainer: React.FC = () => {
  const { data: tasks = [], refetch: refetchTasks } =
    api.task.getAll.useQuery();
  const { data: projects = [] } = api.project.getAll.useQuery();
  const { data: users = [] } = api.user.getAll.useQuery();

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      refetchTasks();
      resetForm();
    },
  });

  const updateTask = api.task.update.useMutation({
    onSuccess: () => {
      refetchTasks();
      resetForm();
    },
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => {
      refetchTasks();
    },
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);

  const resetForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleSubmit = (taskData: any) => {
    if (editingTask) {
      updateTask.mutate({ id: editingTask.id, ...taskData });
    } else {
      createTask.mutate(taskData);
    }
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setPriorityFilter(null);
    setProjectFilter(null);
    setAssigneeFilter(null);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (statusFilter && task.status !== statusFilter) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    if (projectFilter && task.project.id !== projectFilter) return false;
    if (
      assigneeFilter &&
      (!task.assignee || task.assignee.id !== assigneeFilter)
    )
      return false;
    return true;
  });

  const groupedTasks: Record<string, Task[]> = {
    todo: [],
    "in-progress": [],
    done: [],
  };

  filteredTasks.forEach((task: Task) => {
    const status = task.status.toLowerCase();
    if (groupedTasks[status]) {
      groupedTasks[status].push(task as Task);
    } else {
      groupedTasks?.todo?.push(task as Task);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskHeader onNewTask={() => setShowForm(true)} showForm={showForm} />

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          projects={projects}
          users={users}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isSubmitting={createTask.isPending || updateTask.isPending}
        />
      )}

      <TaskFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        projectFilter={projectFilter}
        assigneeFilter={assigneeFilter}
        projects={projects}
        users={users}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onProjectFilterChange={setProjectFilter}
        onAssigneeFilterChange={setAssigneeFilter}
        onClearFilters={clearFilters}
      />

      <TaskBoard
        groupedTasks={groupedTasks}
        onTaskClick={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        onDelete={(id) => {
          if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTask.mutate({ id });
          }
        }}
      />
    </div>
  );
};

export default TasksContainer;
