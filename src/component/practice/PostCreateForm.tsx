import { useState } from "react";

interface PostCreateFormPorps {
  onCreate: (data: { title: string; body: string }) => Promise<boolean>;
}

export default function PostCreateForm({ onCreate }: PostCreateFormPorps) {
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });
  const [check, setChcek] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChcek(null);
    setLoading(true);
    const result = await onCreate(formState);
    setChcek(result);

    if (result === true) {
      setFormState({ title: "", body: "" });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setFormState((prev) => ({ ...prev, title: "", body: "" }));
    setChcek(null);
  };

  return (
    <form onSubmit={handleSubmit} className="border box-border rounded-md p-4">
      <h4>새 게시글 관리</h4>
      <div className="flex flex-col gap-2 mb-1.5">
        <label htmlFor="title" className="text-[14px]">
          제목
        </label>
        <input
          id="title"
          value={formState.title}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, title: e.target.value }))
          }
          className="p-1 rounded-sm border box-border"
          placeholder="게시글 제목을 입력하세요."
        />
      </div>
      <div className="flex flex-col gap-2 mb-1.5">
        <label htmlFor="body" className="text-[14px]">
          내용
        </label>
        <textarea
          id="body"
          value={formState.body}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, body: e.target.value }))
          }
          className="p-1 rounded-sm border box-border resize-none h-16"
          placeholder="게시글 내용을 입력하세요."
        />
      </div>
      <div className="flex justify-self-end items-center gap-1.5">
        <button
          type="button"
          className="rounded-sm border"
          disabled={
            loading ||
            (formState.title.trim() === "" && formState.body.trim() === "")
          }
          onClick={handleClear}
        >
          초기화
        </button>
        <button
          type="submit"
          className="rounded-sm border"
          disabled={
            loading ||
            formState.title.trim() === "" ||
            formState.body.trim() === ""
          }
        >
          {loading ? "등록중..." : "게시글 등록"}
        </button>
      </div>
      {check === null ? null : check === false ? (
        <p className="text-sm text-red-500">게시글 등록에 실패했습니다.</p>
      ) : (
        <p className="text-sm text-green-400">게시글 등록에 성공했습니다.</p>
      )}
    </form>
  );
}
