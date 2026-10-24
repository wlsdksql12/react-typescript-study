import { useEffect, useState } from "react";

interface PostList {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function isPostListItem(value: unknown): value is PostList {
  if (typeof value !== "object" || value === null) return false;

  return (
    "postId" in value &&
    "id" in value &&
    "name" in value &&
    "email" in value &&
    "body" in value &&
    typeof value.postId === "number" &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.body &&
    typeof value.body === "string"
  );
}

function isPostListArray(value: unknown): value is PostList[] {
  return Array.isArray(value) && value.every(isPostListItem);
}

export default function CommentsPractice() {
  const [postId, setPostId] = useState(1);
  const [postList, setPostList] = useState<PostList[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function getPostList() {
      try {
        setPostList([]);
        setErrorMessage("");
        setLoading(true);

        const url =
          postId === -1
            ? "https://jsonplaceholder.typicode.com/posts/101"
            : `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

        const response = await fetch(url, { signal: controller.signal });
        console.log(response);

        if (!response.ok) {
          throw new Error("불러오기에 실패했습니다.");
        }

        const postList: unknown = await response.json();

        const checkPostList = isPostListArray(postList);

        if (!checkPostList) {
          throw new Error("올바르지 않은 댓글 데이터입니다.");
        }

        if (!controller.signal.aborted) {
          setPostList(postList);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        console.error(error);
        setErrorMessage("댓글을 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getPostList();

    return () => {
      controller.abort();
      console.log(controller.signal.aborted);
    };
  }, [postId]);

  return (
    <>
      <ul>
        {loading ? (
          <li>댓글을 불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : postList.length === 0 ? (
          <li>등록된 댓글이 없습니다.</li>
        ) : (
          postList.map((prev) => (
            <li key={prev.id}>
              <article>
                <p>
                  작성자: {prev.name} / 이메일: {prev.email}
                </p>
                <p>{prev.body}</p>
              </article>
            </li>
          ))
        )}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={() => setPostId(1)} disabled={loading}>
          게시글 1
        </button>
        <button type="button" onClick={() => setPostId(2)} disabled={loading}>
          게시글 2
        </button>
        <button type="button" onClick={() => setPostId(3)} disabled={loading}>
          게시글 3
        </button>
        <button type="button" onClick={() => setPostId(500)} disabled={loading}>
          게시글 500
        </button>
        <button type="button" onClick={() => setPostId(-1)} disabled={loading}>
          게시글 -1
        </button>
      </div>
    </>
  );
}
