import { useState } from "react";

export default function PostCreatePractice() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const item = {
      userId: 1,
      title: title,
      body: body,
    };

    async function postPost() {
      try {
        setLoading(true);
        setError("");

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

        if (response.ok) {
          setTitle("");
          setBody("");
        } else {
          throw new Error("POST 요청 실패");
        }
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

  return (
    <form
      onSubmit={handleSubmit}
      className="border box-border p-4 rounded-md w-full max-w-3xl mx-auto"
    >
      <h4>새 게시글 작성</h4>

      {loading ? (
        <p>등록 중...</p>
      ) : error !== "" ? (
        <p className="text-sm">{error}</p>
      ) : (
        <p className="text-sm">게시글 등록 요청이 성공했습니다.</p>
      )}

      <div className="flex flex-col gap-1.5 mb-4">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="p-2"
          placeholder="게시글 제목을 입력하세요."
        />
      </div>
      <div className="flex flex-col gap-1.5 mb-4">
        <label htmlFor="body">내용</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="p-2 resize-none h-52"
          placeholder="게시글 내용을 입력하세요."
        />
      </div>
      <button
        type="submit"
        className="flex justify-self-end"
        disabled={title.trim() === "" || body.trim() === "" || loading}
      >
        게시글 작성
      </button>
    </form>
  );
}
