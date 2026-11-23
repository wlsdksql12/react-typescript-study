import type { Post } from "./post.type";

export function isPost(data: unknown): data is Post {
  if (typeof data !== "object" || data === null) return false;

  return (
    "userId" in data &&
    "id" in data &&
    "title" in data &&
    "body" in data &&
    typeof data.userId === "number" &&
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    typeof data.body === "string"
  );
}

export function isPostArray(data: unknown): data is Post[] {
  if (!Array.isArray(data)) return false;

  return data.every(isPost);
}
