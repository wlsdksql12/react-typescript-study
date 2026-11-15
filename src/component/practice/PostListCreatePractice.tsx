import { useState } from "react";

interface PostList {
  id: number;
  title: string;
  body: string;
}

export default function PostListCreatePractice() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postList, setPostList] = useState<PostList[]>([]);
  const [postId, setPostId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const item = {
      id: postId,
      title: title,
      body: body,
    };

    async function postPost() {
      try {
        setLoading(true);
        setError("");
        setSuccess(false);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("HTTP 요청 실패");
        }
        setTitle("");
        setBody("");
        setSuccess(true);

        setPostList((prev) => [...prev, item]);
        setPostId((prev) => prev + 1);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setError("게시글 등록에 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    }

    postPost();
  };
  console.log(postList);
  return (
    <div className="border box-border rounded-md p-4 w-full max-w-3xl">
      <form onSubmit={handleSubmit}>
        <h4>게시글 관리</h4>
        {loading ? null : error !== "" ? (
          <p className="text-xs">{error}</p>
        ) : success ? (
          <p className="text-xs">게시글 등록에 성공했습니다.</p>
        ) : null}

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="title" className="text-sm">
            제목
          </label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="p-1"
            placeholder="게시글 제목을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="body" className="text-sm">
            내용
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="p-1 resize-none h-28"
            placeholder="게시글 내용을 입력해주세요."
          />
        </div>
        <button
          type="submit"
          className="flex justify-self-end enabled:hover:cursor-pointer"
          disabled={title.trim() === "" || body.trim() === "" || loading}
        >
          {loading ? "등록중..." : "게시글 등록"}
        </button>
      </form>

      <div>
        <h4>등록한 게시글 목록</h4>
        <ul className="list-none pl-0">
          {postList.length === 0 ? (
            <li className="text-center">등록된 게시글이 없습니다.</li>
          ) : (
            postList.map((prev) => (
              <li
                key={prev.id}
                className="border box-border rounded-md p-3 mb-3.5"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{prev.title}</span>
                  <span>{prev.id}</span>
                </div>
                <p className="mb-0 text-sm">{prev.body}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
