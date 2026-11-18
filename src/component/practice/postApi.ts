import type { Post } from "./post.type";

export async function fetchGetPost(signal: AbortSignal): Promise<unknown> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    {
      signal: signal,
    },
  );

  if (!response.ok) {
    throw new Error("GET HTTP 요청 실패");
  }

  const result: unknown = await response.json();

  return result;
}

export async function fetchPostPost(item: Post): Promise<void> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("POST HTTP 요청 실패");
  }
}

export async function fetchPatchPost(
  id: number | null,
  title: string,
): Promise<void> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
      }),
    },
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("PATCH 요청 실패");
  }
}
