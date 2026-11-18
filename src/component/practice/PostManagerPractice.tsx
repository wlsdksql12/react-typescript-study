import { useEffect, useState } from "react";
import PostCreateForm from "./PostCreateForm";
import type { Post, Status } from "./post.type";
import PostEditForm from "./PostEditForm";

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

export default function PostManagerPractice() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [newPostId, setNewPostId] = useState(1001);
  //   const [editId, setEditId] = useState<number | null>(null);
  const [id, setId] = useState<{ editId: number | null; delId: number | null }>(
    {
      editId: null,
      delId: null,
    },
  );
  //   const [editLoading, setEditLoading] = useState(false);
  //   const [editErrorMessage, setEditErrorMessage] = useState("");
  const [error, setError] = useState({
    editErrorMessage: "",
    delErrorMessage: "",
  });
  const [loading, setLoading] = useState({
    editLoading: false,
    delLoading: false,
  });
  const [draftTitle, setDraftTitle] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getPost() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { signal: controller.signal },
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("GET HTTP 요청 실패");
        }

        const result: unknown = await response.json();
        console.log(result);

        if (!isPostArray(result)) {
          throw new Error("데이터 타입 검증 실패");
        }

        setStatus("success");
        setPostList((prev) => [...prev, ...result]);
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

  function handleCreate(data: { title: string; body: string }) {
    const item = {
      userId: 1,
      id: newPostId,
      title: data.title,
      body: data.body,
    };

    const postPost = async () => {
      try {
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
          throw new Error("POST HTTP 요청 실패");
        }
        setPostList((prev) => [...prev, item]);
        setNewPostId((prev) => prev + 1);
        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
        return false;
      } finally {
      }
    };

    return postPost();
  }

  const handlePostPatch = async () => {
    try {
      setLoading((prev) => ({ ...prev, editLoading: true }));
      setError((prev) => ({ ...prev, editErrorMessage: "" }));

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id.editId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: draftTitle.trim(),
          }),
        },
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("PATCH 요청 실패");
      }

      setPostList((prev) =>
        prev.map((item) =>
          item.id === id.editId ? { ...item, title: draftTitle.trim() } : item,
        ),
      );
      setId((prev) => ({ ...prev, editId: null }));
    } catch (error) {
      setError((prev) => ({
        ...prev,
        editErrorMessage: "게시글 제목 수정에 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, editLoading: false }));
    }
  };

  const handlePostDel = async (data: number) => {
    setId((prev) => ({ ...prev, delId: data }));
    try {
      setLoading((prev) => ({ ...prev, delLoading: true }));
      setError((prev) => ({ ...prev, delErrorMessage: "" }));

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${data}`,
        {
          method: "DELETE",
        },
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("DELETE 요청 실패");
      }
      setPostList((prev) => prev.filter((item) => item.id !== data));
    } catch (error) {
      console.error(error);
      setError((prev) => ({
        ...prev,
        delErrorMessage: "게시글 삭제를 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, delLoading: false }));
    }
  };

  console.log(postList);
  console.log(id);
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>게시글 관리</h4>
      <PostCreateForm onCreate={handleCreate} />
      <h4>게시글 목록</h4>
      {error.delErrorMessage !== "" ? (
        <p className="text-sm text-red-500">{error.delErrorMessage}</p>
      ) : null}
      <ul className="list-none pl-0">
        {status === "loading" ? (
          <li>게시글을 불러오는중...</li>
        ) : status === "error" ? (
          <li>게시글을 불러오지 못했습니다.</li>
        ) : status === "success" ? (
          postList.length === 0 ? (
            <li>등록된 게시글이 없습니다.</li>
          ) : (
            postList.map((prev) => (
              <li
                key={prev.id}
                className="border box-border rounded-md p-1.5 mb-4"
              >
                {id.editId !== prev.id ? (
                  <div className="flex justify-between">
                    <span className="font-semibold">{prev.title}</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          (setId((item) => ({ ...item, editId: prev.id })),
                            setDraftTitle(""));
                        }}
                        disabled={loading.editLoading || loading.delLoading}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePostDel(prev.id)}
                        disabled={loading.editLoading || loading.delLoading}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  <PostEditForm
                    setEditId={(item) =>
                      setId((prev) => ({ ...prev, editId: item }))
                    }
                    editErrorMessage={error.editErrorMessage}
                    editLoading={loading.editLoading}
                    draftTitle={draftTitle}
                    setDraftTitle={setDraftTitle}
                    handlePostPatch={handlePostPatch}
                  />
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-xs">ID: {prev.id}</span>
                  <span className="wrap-anywhere">{prev.body}</span>
                </div>
              </li>
            ))
          )
        ) : null}
      </ul>
    </div>
  );
}
