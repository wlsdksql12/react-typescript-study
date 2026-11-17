import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Status = "loading" | "error" | "success";

interface PostEditFormProps {
  draftTitle: string;
  setDraftTitle: React.Dispatch<React.SetStateAction<string>>;
  editErrorMessage: string;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  editLoading: boolean;
  handlePostPatch: () => Promise<void>;
}

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

function PostEditForm({
  draftTitle,
  setDraftTitle,
  editErrorMessage,
  setEditId,
  editLoading,
  handlePostPatch,
}: PostEditFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2 pb-2">
        <label htmlFor="editTitle">게시글 제목 수정</label>
        <input
          id="editTitle"
          className="p-1 font-semibold"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          placeholder="수정할 제목을 입력해 주세요."
        />
      </div>
      {editErrorMessage !== "" ? <p>{editErrorMessage}</p> : null}
      <div className="flex justify-self-end gap-2">
        <button
          type="button"
          onClick={() => setEditId(null)}
          disabled={editLoading}
        >
          취소
        </button>
        <button
          type="button"
          onClick={handlePostPatch}
          disabled={draftTitle.trim() === "" || editLoading}
        >
          {editLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </>
  );
}

export default function PostPatchPractice() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [editId, setEditId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [editErrorMessage, setEditErrorMessage] = useState("");
  const [editLoading, setEditLoading] = useState(false);

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

  const handlePostPatch = async () => {
    try {
      setEditErrorMessage("");
      setEditLoading(true);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editId}`,
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
        throw new Error("PATCH HTTP 요청 실패");
      }
      setPostList((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, title: draftTitle.trim() } : item,
        ),
      );
      setEditId(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setEditErrorMessage("게시글 제목 수정에 실패했습니다.");
      }
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="border box-border rounded-md p-4 m-4 w-full max-w-3xl">
      <h4>게시글 목록 관리</h4>
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
              {editId !== prev.id ? (
                <div className="flex justify-between items-center mb-1.5 mt-2">
                  <span className="font-semibold">{prev.title}</span>
                  <button
                    type="button"
                    className="rounded-3xl w-auto border box-border whitespace-nowrap enabled:hover:cursor-pointer"
                    onClick={() => {
                      setEditId(prev.id);
                      setDraftTitle(prev.title);
                    }}
                    disabled={editId !== null}
                  >
                    수정
                  </button>
                </div>
              ) : (
                <PostEditForm
                  draftTitle={draftTitle}
                  setDraftTitle={setDraftTitle}
                  editErrorMessage={editErrorMessage}
                  setEditId={setEditId}
                  editLoading={editLoading}
                  handlePostPatch={handlePostPatch}
                />
              )}
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
