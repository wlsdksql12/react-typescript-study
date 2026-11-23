import { useEffect, useState } from "react";
import type { Post, Status } from "./post.type";
import { fetchGetPost } from "./postApi";
import { isPostArray } from "./postGuards";

// function isPost(data: unknown): data is Post {
//   if (typeof data !== "object" || data === null) return false;

//   return (
//     "userId" in data &&
//     "id" in data &&
//     "title" in data &&
//     "body" in data &&
//     typeof data.userId === "number" &&
//     typeof data.id === "number" &&
//     typeof data.title === "string" &&
//     typeof data.body === "string"
//   );
// }

// function isPostArray(data: unknown): data is Post[] {
//   if (!Array.isArray(data)) return false;

//   return data.every(isPost);
// }

export function usePostList() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  function addPost(item: Post) {
    setPostList((prev) => [...prev, item]);
    setStatus("success");
  }

  function updatePostTitle(id: number, title: string) {
    setPostList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: title } : item)),
    );
  }

  function removePost(id: number) {
    setPostList((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function getPost() {
      try {
        const result = await fetchGetPost(controller.signal);
        console.log(result);

        if (!isPostArray(result)) {
          throw new Error("데이터 타입 검증 실패");
        }

        setStatus("success");
        setPostList((prev) => [...prev, ...result]);
      } catch (error) {
        if (controller.signal.aborted) return;

        setStatus("error");
        if (error instanceof Error) {
          console.error(error);
        }
      } finally {
      }
    }

    getPost();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    postList,
    status,
    addPost,
    updatePostTitle,
    removePost,
  };
}
