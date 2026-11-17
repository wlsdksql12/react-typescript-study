import { useEffect, useState } from "react";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

type Status = "idle" | "loading" | "error" | "success";

function isPost(data: unknown): data is Post {
  if (typeof data !== "object" || data === null || Array.isArray(data))
    return false;

  return (
    "id" in data &&
    "userId" in data &&
    "title" in data &&
    "body" in data &&
    typeof data.id === "number" &&
    typeof data.userId === "number" &&
    typeof data.title === "string" &&
    typeof data.body === "string"
  );
}

export default function PostValidatedFetchPractice() {
  const [post, setPost] = useState<Post | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const controller = new AbortController();
    async function getPost() {
      try {
        setStatus("loading");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
          { signal: controller.signal },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("HTTP 요청 실패");
        }

        const result: unknown = await response.json();
        console.log(result);
        if (!isPost(result)) {
          throw new Error("타입 검증 실패");
        }
        setStatus("success");
        setPost(result);
      } catch (error) {
        setStatus("error");
        if (error instanceof Error) {
          console.error(error);
        }
      }
    }

    getPost();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="border box-border rounded-md p-4 m-4 w-full max-w-3xl">
      <h4>게시글 목록</h4>
      <ul className="list-none pl-0">
        {status === "loading" ? (
          <li>게시글을 불러오는중...</li>
        ) : status === "error" ? (
          <li>게시글을 불러오지 못했습니다.</li>
        ) : status === "idle" ? null : (
          <li className="border box-border rounded-md p-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">{post?.title}</span>
              <span>{post?.id}</span>
            </div>
            <span className="wrap-anywhere">{post?.body}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
