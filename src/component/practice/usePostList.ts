import { useEffect, useState } from "react";
import type { Post, Status } from "./post.type";
import { fetchGetPost } from "./postApi";
import { isPostArray } from "./postGuards";

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
