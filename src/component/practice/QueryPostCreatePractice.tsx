import { useState } from "react";
import type { Post } from "./post.type";
import useCreatePost from "./useCreatePost";

export default function QueryPostCreatePractice() {
  const { postMutation } = useCreatePost();
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });
  const [newPostId, setNewPostId] = useState(1001);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const item: Post = {
      userId: 1,
      id: newPostId,
      body: formState.body.trim(),
      title: formState.title.trim(),
    };

    postMutation.mutate(item, {
      onSuccess: (data, variables) => {
        console.log(data);
        console.log(variables);

        setFormState({ title: "", body: "" });
        setNewPostId((prev) => prev + 1);
      },
    });
  };

  return (
    <form
      className="border box-border rounded-md p-4 w-full max-w-3xl"
      onSubmit={handleSubmit}
    >
      <header>
        <span className="font-semibold">TanStack Query 게시글 등록</span>
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
          formState.body.trim().length === 0 ||
          postMutation.isPending
        }
      >
        {postMutation.isPending ? "등록중..." : "게시글 등록"}
      </button>
      {postMutation.isSuccess ? (
        <p className="text-green-400">등록에 성공했습니다.</p>
      ) : postMutation.isError ? (
        <p className="text-red-500">등록에 실패했습니다.</p>
      ) : null}
    </form>
  );
}
