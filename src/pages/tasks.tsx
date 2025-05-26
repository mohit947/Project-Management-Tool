import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

const TasksContainer = dynamic(
  () => import("@/components/Tasks/TasksContainer"),
  {
    loading: () => <TasksLoadingPlaceholder />,
    ssr: true,
  },
);

const TasksLoadingPlaceholder = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8 flex justify-between">
      <div className="h-10 w-48 animate-pulse rounded-md bg-gray-200"></div>
      <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200"></div>
    </div>
    <div className="mb-6 h-16 animate-pulse rounded-lg bg-gray-200"></div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-lg bg-gray-200"
        ></div>
      ))}
    </div>
    <div className="mt-8 h-96 animate-pulse rounded-lg bg-gray-200"></div>
  </div>
);

export default function TasksPage() {
  return (
    <Layout>
      <Suspense fallback={<TasksLoadingPlaceholder />}>
        <TasksContainer />
      </Suspense>
    </Layout>
  );
}
