import { useState } from "react";

interface PostList {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function PostListPractice() {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<PostList[] | null>(null);
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

      const postList = await response.json();
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
      <ul>
        {loading ? (
          <li>불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : postList === null ? (
          <li>버튼을 눌러 사용자 게시글을 조회하세요.</li>
        ) : postList.length === 0 ? (
          <li>등록된 게시글이 없습니다.</li>
        ) : (
          postList.map((item) => <li key={item.id}>{item.title}</li>)
        )}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
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
