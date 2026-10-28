import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface PostItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function isPostItem(data: unknown): data is PostItem {
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

export default function PostPage() {
  const { postId } = useParams();
  const [postList, setPostList] = useState<PostItem | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const numericPostId = Number(postId);

  const isValidPostId = Number.isInteger(numericPostId) && numericPostId > 0;

  useEffect(() => {
    if (!isValidPostId) return;
    const controller = new AbortController();

    async function getPost() {
      try {
        setPostList(undefined);
        setErrorMessage("");
        setLoading(true);

        const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

        const response = await fetch(url, { signal: controller.signal });

        if (controller.signal.aborted) {
          throw new Error("요청을 중지했습니다.");
        }

        if (!response.ok) {
          throw new Error("HTTP 요청 실패");
        }

        const result: unknown = await response.json();

        if (!isPostItem(result)) {
          throw new Error("타입 검증에 실패했습니다.");
        }

        if (!controller.signal.aborted) {
          setPostList(result);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        } else {
          if (error instanceof Error) {
            console.error(error);
            setErrorMessage("페이지 불러오기에 실패했습니다.");
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getPost();
    return () => {
      controller.abort();
    };
  }, [postId, isValidPostId]);

  if (!isValidPostId) {
    return <h2>올바르지 않은 게시글 ID입니다.</h2>;
  }

  return (
    <ul>
      {loading ? (
        <li>로딩중 입니다.</li>
      ) : errorMessage !== "" ? (
        <li>{errorMessage}</li>
      ) : postList === undefined ? (
        <li>게시글이 없습니다.</li>
      ) : (
        <li key={postList.id} style={{ listStyle: "none" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span>{postList.title}</span>
            <span>#{postList.id}</span>
          </div>
          <div style={{ lineHeight: "20px" }}>
            <span>{postList.body}</span>
          </div>
        </li>
      )}
    </ul>
  );
}
