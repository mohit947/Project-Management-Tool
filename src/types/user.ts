export interface User {
  id: string;
  name: string | null;
  email: string | null;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
  deadline?: Date;
  project?: {
    name: string;
  };
}
