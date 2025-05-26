export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  deadline: Date | string | null;
  assignee?: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
  project: {
    id: string;
    name: string | null;
  };
}
