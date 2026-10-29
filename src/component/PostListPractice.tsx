import { useState } from "react";
import { Link } from "react-router";
import type { PostList } from "./PostType";

interface PostListPracticeProps {
  postList: PostList[] | null;
  setPostList: React.Dispatch<React.SetStateAction<PostList[] | null>>;
}

function isPostList(data: unknown): data is PostList[] {
  return Array.isArray(data) && data.every(PostListItem);
}

function PostListItem(data: unknown): data is PostList {
  if (typeof data !== "object" || data === null) return false;

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

export default function PostListPractice({
  postList,
  setPostList,
}: PostListPracticeProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function getPostList(id: number) {
    setPostList(null);
    setErrorMessage("");
    setLoading(true);

    try {
      const url =
        id === -1
          ? "https://jsonplaceholder.typicode.com/posts/101"
          : `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

      const response = await fetch(url);
      console.log(response);

      if (!response.ok) {
        throw new Error("조회에 실패했습니다.");
      }

      const postList: unknown = await response.json();

      if (!isPostList(postList)) {
        throw new Error("타입 검증에 실패했습니다.");
      }

      setPostList(postList);
    } catch (error) {
      console.error(error);
      setErrorMessage("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h3 className="post-title">게시글 목록</h3>
      <ul className="post-ul">
        {loading ? (
          <li>불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : postList === null ? (
          <li>버튼을 눌러 사용자 게시글을 조회하세요.</li>
        ) : postList.length === 0 ? (
          <li>등록된 게시글이 없습니다.</li>
        ) : (
          postList.map((item) => (
            <li key={item.id} className="post-li">
              <Link className="post-link" to={`/posts/${item.id}`}>
                {item.title}
              </Link>
            </li>
          ))
        )}
      </ul>
      <div className="post-buttons">
        <button type="button" onClick={() => getPostList(1)} disabled={loading}>
          사용자 1 게시글
        </button>
        <button type="button" onClick={() => getPostList(2)} disabled={loading}>
          사용자 2 게시글
        </button>
        <button
          type="button"
          onClick={() => getPostList(99)}
          disabled={loading}
        >
          사용자 99 게시글
        </button>
        <button
          type="button"
          onClick={() => getPostList(-1)}
          disabled={loading}
        >
          없는 사용자 게시글
        </button>
      </div>
    </>
  );
}
