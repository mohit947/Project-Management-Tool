import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Layout from "@/components/Layout";

const DashboardContainer = dynamic(
  () => import("@/components/Dashboard/DashboardContainer"),
  {
    loading: () => <DashboardLoadingPlaceholder />,
    ssr: false,
  },
);

const DashboardLoadingPlaceholder = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      <div className="h-10 w-64 animate-pulse rounded-md bg-gray-200"></div>
      <div className="mt-2 h-4 w-40 animate-pulse rounded-md bg-gray-200"></div>
    </div>

    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-lg bg-gray-200"
        ></div>
      ))}
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="space-y-8">
        <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Management Dashboard</title>
        <meta name="description" content="Project management dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Suspense fallback={<DashboardLoadingPlaceholder />}>
          <DashboardContainer />
        </Suspense>
      </Layout>
    </>
  );
}
