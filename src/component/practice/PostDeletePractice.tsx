import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Status = "loading" | "error" | "success";

function isPost(data: unknown): data is Post {
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

function isPostArray(data: unknown): data is Post[] {
  if (!Array.isArray(data)) return false;

  return data.every(isPost);
}

export default function PostDeletePractice() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [delErrorMessage, setDelErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getPost() {
      try {
        setStatus("loading");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { signal: controller.signal },
        );

        console.log(response);
        if (!response.ok) {
          throw new Error("HTTP 요청 실패");
        }
        const result: unknown = await response.json();
        console.log(result);

        if (!isPostArray(result)) {
          throw new Error("데이터 타입 검증 실패");
        }

        setStatus("success");
        setPostList(result);
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

  const handlePostDelete = async (id: number) => {
    setDeletingId(id);

    try {
      setDelErrorMessage("");

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        },
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("DELETE HTTP 요청 실패");
      }
      setPostList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setDelErrorMessage("게시글 삭제에 실패했습니다.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border box-border rounded-md p-4 m-4 w-full max-w-3xl">
      <h4>게시글 목록 관리</h4>
      {delErrorMessage !== "" ? <p>{delErrorMessage}</p> : null}
      {status === "loading" ? (
        <p>게시글을 불러오는 중...</p>
      ) : status === "error" ? (
        <p>게시글을 불러오지 못했습니다.</p>
      ) : status === "success" ? (
        postList.length === 0 ? (
          <p>등록된 게시글이 없습니다.</p>
        ) : (
          postList.map((prev) => (
            <div
              key={prev.id}
              className="border box-border rounded-md p-2 mb-3"
            >
              <div className="flex justify-between items-center mb-1.5 mt-2">
                <span className="font-semibold">{prev.title}</span>
                <button
                  type="button"
                  className="rounded-3xl w-auto border box-border whitespace-nowrap enabled:hover:cursor-pointer"
                  onClick={() => handlePostDelete(prev.id)}
                  disabled={deletingId !== null}
                >
                  {deletingId === prev.id ? "삭제중..." : "삭제"}
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs">ID:{prev.id}</span>
                <span className="wrap-anywhere">{prev.body}</span>
              </div>
            </div>
          ))
        )
      ) : null}
    </div>
  );
}
