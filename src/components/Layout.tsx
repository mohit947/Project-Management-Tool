import React, { type ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiCheckSquare,
  FiFolder,
  FiUsers,
  FiLogOut,
  FiLogIn,
  FiUser,
} from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: sessionData } = useSession();

  const navigation = [
    { name: "Dashboard", href: "/", icon: FiHome },
    { name: "Tasks", href: "/tasks", icon: FiCheckSquare },
    { name: "Projects", href: "/projects", icon: FiFolder },
    { name: "Users", href: "/users", icon: FiUsers },
  ];

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="bg-opacity-75 fixed inset-0 z-20 bg-gray-600 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                TaskManager
              </span>
            </Link>
            <button
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive(item.href)
                      ? "text-indigo-600"
                      : "text-gray-500 group-hover:text-gray-600"
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 p-4">
            {sessionData ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    {sessionData.user?.image ? (
                      <img
                        src={sessionData.user.image}
                        alt={sessionData.user.name || "User"}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <FiUser className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {sessionData.user?.name || "User"}
                    </p>
                    <p className="max-w-[160px] truncate text-xs text-gray-500">
                      {sessionData.user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => void signOut()}
                  className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FiLogOut className="mr-3 h-5 w-5 text-gray-500" />
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => void signIn()}
                className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <FiLogIn className="mr-3 h-5 w-5 text-gray-500" />
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6">
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="h-6 w-6" />
          </button>

          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800 lg:text-xl">
              {navigation.find((item) => isActive(item.href))?.name ||
                "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              {sessionData ? (
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-700">
                    {sessionData.user?.name || sessionData.user?.email}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    {sessionData.user?.image ? (
                      <img
                        src={sessionData.user.image}
                        alt={sessionData.user.name || "User"}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <FiUser className="h-4 w-4" />
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => void signIn()}
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
