import { useState } from "react";

interface Post {
  userId: number;
  id: number;
  body: string;
  title: string;
}

export default function ApiPractice() {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function getPost(id: number) {
    try {
      setPost(undefined);
      setErrorMessage("");
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      console.log("status: ", response.status);
      console.log("ok: ", response.ok);

      if (!response.ok) {
        throw new Error("게시글 요청에 실패했습니다.");
      }

      const post = await response.json();
      setPost(post);
    } catch (error) {
      //   if (error instanceof Error) {
      //     setErrorMessage("게시글을 불러오지 못했습니다.");
      //   }
      console.error(error);
      setErrorMessage("게시글을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ul>
        {loading ? (
          <li>게시글을 불러오는 중입니다.</li>
        ) : post?.id !== undefined ? (
          <li style={{ listStyle: "none" }}>
            <article className="post-card">
              <p className="post-card-id">게시글 #{post.id}</p>
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-body">{post.body}</p>
            </article>
          </li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : (
          <li>게시글 조회 버튼을 눌러주세요.</li>
        )}
      </ul>
      <div style={{ display: "flex", gap: "8px" }}>
        <button type="button" onClick={() => getPost(1)} disabled={loading}>
          게시글 1번 조회
        </button>
        <button type="button" onClick={() => getPost(999)} disabled={loading}>
          없는 게시글 조회
        </button>
      </div>
    </>
  );
}
