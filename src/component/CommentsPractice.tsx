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
    typeof value.body === "string"
  );
}

function isPostListArray(value: unknown): value is PostList[] {
  return Array.isArray(value) && value.every(isPostListItem);
}

function parsePostList(data: unknown): PostList[] {
  if (!isPostListArray(data)) {
    throw new Error("올바르지 않은 댓글 데이터입니다.");
  }
  return data;
}

async function fetchComments(
  postId: number,
  signal: AbortSignal,
): Promise<PostList[]> {
  const url =
    postId === -1
      ? "https://jsonplaceholder.typicode.com/posts/101"
      : postId === -2
        ? "https://jsonplaceholder.typicode.com/posts/1"
        : `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

  const response = await fetch(url, { signal });

  console.log(response);

  if (!response.ok) {
    throw new Error("HTTP 요청 실패");
  }

  // 데이터 타입 검증을 위해 unknown 타입으로 받음
  const result: unknown = await response.json();

  console.log(result);

  return parsePostList(result);
}

export default function CommentsPractice() {
  const [postId, setPostId] = useState(1);
  const [postList, setPostList] = useState<PostList[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getPostList() {
      try {
        setPostList([]);
        setErrorMessage("");
        setLoading(true);

        const postList = await fetchComments(postId, controller.signal);

        if (!controller.signal.aborted) {
          setPostList(postList);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
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
  }, [postId, refresh]);

  const searchKeywordList = postList.filter(
    (prev) =>
      prev.body.toLowerCase().includes(searchKeyword.trim().toLowerCase()) ||
      prev.name.toLowerCase().includes(searchKeyword.trim().toLowerCase()),
  );

  return (
    <>
      <input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="검색어를 입력해 주세요."
        style={{
          margin: "24px",
          padding: "6px 10px",
          width: "300px",
        }}
      />
      <ul>
        {loading ? (
          <li>댓글을 불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : postList.length === 0 ? (
          <li>등록된 댓글이 없습니다.</li>
        ) : searchKeywordList.length === 0 ? (
          <li>검색 결과가 없습니다.</li>
        ) : (
          searchKeywordList.map((prev) => (
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
        <button type="button" onClick={() => setPostId(-2)} disabled={loading}>
          게시글 -2
        </button>
        <button
          type="button"
          onClick={() => setRefresh((prev) => !prev)}
          disabled={loading}
        >
          새로 고침
        </button>
      </div>
    </>
  );
}
