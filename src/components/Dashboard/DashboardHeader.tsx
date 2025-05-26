import React from "react";
import { format } from "date-fns";

interface DashboardHeaderProps {
  userName?: string | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {userName ? `Welcome, ${userName}` : "Dashboard"}
        </h1>
        <p className="mt-1 text-gray-600">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
