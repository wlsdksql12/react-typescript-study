import { useEffect, useState } from "react";

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export default function PostFetchPractice() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getPost() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
          { signal: controller.signal },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("요청 실패");
        }
        const result = await response.json();
        setPost(result);
        console.log(result);
      } catch (error) {
        if (error instanceof Error && controller.signal.aborted === false) {
          console.error(error.message);
          setError("게시글 조회에 실패했습니다.");
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
  }, []);

  return (
    <div className="border box-border w-full max-w-3xl mx-auto rounded-md p-4">
      {loading ? (
        <span>게시글을 불러오는 중...</span>
      ) : error !== "" ? (
        <span>{error}</span>
      ) : post === null ? (
        <span>알수없는 오류가 발생했습니다.</span>
      ) : (
        <div key={post.id}>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <h4 className="wrap-anywhere">{post.title}</h4>
            <span>게시글 번호: {post.id}</span>
          </div>
          <p className="wrap-anywhere">{post.body}</p>
        </div>
      )}
    </div>
  );
}
