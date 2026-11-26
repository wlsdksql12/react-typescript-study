export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UpdateTitleData {
  id: number;
  title: string;
}

export type Status = "idle" | "loading" | "error" | "success";
