import type { CreatePostInput, Post } from "./post.type";
import { isPost, isPostArray } from "./postGuards";

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

export async function fetGetPaginatedPost(
  page: number,
  signal: AbortSignal,
): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("HTTP 요청 실패");
  }

  const result: unknown = await response.json();

  if (!isPostArray(result)) {
    throw new Error("데이터 타입 검증 실패");
  }

  return result;
}

export async function fetchValidatedPosts(
  signal: AbortSignal,
): Promise<Post[]> {
  const result = await fetchGetPost(signal);

  if (!isPostArray(result)) {
    throw new Error("게시글 타입 검증 실패");
  }

  return result;
}

export async function fetchPostPost(item: CreatePostInput): Promise<Post> {
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

  const result: unknown = await response.json();
  console.log("result", result);
  if (!isPost(result)) {
    throw new Error("데이터 타입 검증 실패");
  }

  return result;
}

export async function fetchPatchPost(id: number, title: string): Promise<void> {
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

export async function fetchDeletePost(id: number): Promise<void> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE",
    },
  );
  console.log(response);

  if (!response.ok) {
    throw new Error("DELETE 요청 실패");
  }
}
