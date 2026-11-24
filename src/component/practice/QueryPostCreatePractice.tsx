import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { Post } from "./post.type";

export default function QueryPostCreatePractice() {
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });
  const mutation = useMutation({
    mutationFn: async (item: Post) => {
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

      if (!response.ok) {
        throw new Error("HTTP 요청 실패");
      }
    },
    onSuccess: () => {
      console.log("요청 성공");
      setFormState({ title: "", body: "" });
    },
    onError: () => {
      console.log("요청 실패");
    },
    networkMode: "always",
  });

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const item: Post = {
      userId: 1,
      id: 1001,
      body: formState.body.trim(),
      title: formState.title.trim(),
    };

    mutation.mutate(item);
  };
  console.log(mutation.isPending);
  return (
    <form
      className="border box-border rounded-md p-4 w-full max-w-3xl"
      onSubmit={handleSubmit}
    >
      <header>
        <span className="font-semibold">useMutation 게시글 등록</span>
      </header>
      <hr />
      <div className="flex flex-col gap-2 mb-2.5">
        <label className="text-sm" htmlFor="title">
          제목
        </label>
        <input
          id="title"
          value={formState.title}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, title: e.target.value }))
          }
          className="p-1"
          placeholder="게시글 제목을 입력하세요."
        />
        <label className="text-sm" htmlFor="body">
          내용
        </label>
        <textarea
          id="body"
          value={formState.body}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, body: e.target.value }))
          }
          className="resize-none w-auto h-10 p-1"
          placeholder="게시글 내용을 입력하세요."
        />
      </div>
      <button
        type="submit"
        className="flex justify-self-end py-2 px-3 rounded-md border-0 box-border enabled:bg-blue-500 enabled:text-white enabled:hover:cursor-pointer"
        disabled={
          formState.title.trim().length === 0 ||
          formState.body.trim().length === 0
        }
      >
        {mutation.isPending ? "등록중..." : "게시글 등록"}
      </button>
      {mutation.isSuccess ? (
        <p className="text-green-400">등록에 성공했습니다.</p>
      ) : mutation.isError ? (
        <p className="text-red-500">등록에 실패했습니다.</p>
      ) : null}
    </form>
  );
}
