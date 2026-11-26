import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPatchPost, fetchValidatedPosts } from "./postApi";
import { useState } from "react";
import type { Post } from "./post.type";

interface UpdateTitleData {
  id: number;
  title: string;
}

export default function QueryPostListPractice() {
  const queryClient = useQueryClient();
  const post = useQuery({
    queryKey: ["posts"],
    staleTime: 120_000,
    gcTime: 180_000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async ({ signal }) => {
      const result = await fetchValidatedPosts(signal);

      return result;
    },
  });

  const mutation = useMutation({
    // mutationFn: async (data: UpdateTitleData) => {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts/${data.id}`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         title: data.title.trim(),
    //       }),
    //     },
    //   );
    //   if (!response.ok) {
    //     throw new Error("HTTP 요청 실패");
    //   }
    // },
    mutationFn: async (data: UpdateTitleData) =>
      fetchPatchPost(data.id, data.title),
    onSuccess: (_data, variables) => {
      console.log("요청 성공");
      console.log(variables);
      console.log(editState);
      queryClient.setQueryData<Post[]>(["posts"], (oldposts) => {
        if (!oldposts) return oldposts;
        console.log(oldposts);

        return oldposts.map((prev) =>
          prev.id === editState.id
            ? { ...prev, title: editState.title.trim() }
            : prev,
        );
      });

      setEditState({ title: "", id: null });
    },
    onError: () => {
      console.log("요청 실패");
    },
    networkMode: "always",
  });

  const [editState, setEditState] = useState<{
    title: string;
    id: number | null;
  }>({
    title: "",
    id: null,
  });

  const handleEdit = (title: string, id: number) => {
    mutation.reset();
    setEditState({ title: title, id: id });
  };

  const handleEditCancel = () => {
    setEditState({ title: "", id: null });
  };

  const handleEditSave = () => {
    if (editState.id === null) return;
    mutation.mutate({ title: editState.title, id: editState.id });
  };

  return (
    <>
      <div className="border box-border rounded-md w-full max-w-3xl p-4">
        <header>
          <span className="font-semibold">TanStack Query 게시글 목록</span>
        </header>
        <hr />
        {post.isPending ? (
          <p>게시글을 불러오는중입니다.</p>
        ) : post.isError ? (
          <p>게시글을 불러오지 못했습니다.</p>
        ) : post.data.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          post.data.map((prev) => (
            <div key={prev.id} className="border box-border rounded-md mb-2.5">
              {editState.id === prev.id ? (
                <div className="p-2">
                  <div className="flex flex-col gap-1.5 mb-2 flex-1 min-w-0">
                    <label htmlFor="newBody" className="text-[12px]">
                      게시글 제목
                    </label>
                    <input
                      id="newBody"
                      value={editState.title}
                      onChange={(e) =>
                        setEditState((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="수정할 제목을 입력해 주세요."
                      className="p-1.5 rounded-lg border box-border"
                    />
                  </div>
                  <div className="flex justify-self-end gap-1.5">
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="w-12 h-auto rounded-[15px] whitespace-nowrap border box-border p-1 enabled:hover:cursor-pointer"
                      disabled={mutation.isPending}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={handleEditSave}
                      className="w-12 h-auto rounded-[15px] whitespace-nowrap border box-border p-1 enabled:hover:cursor-pointer"
                      disabled={
                        mutation.isPending ||
                        editState.title.trim().length === 0
                      }
                    >
                      저장
                    </button>
                  </div>
                  {mutation.isError ? (
                    <p className="text-red-500">게시글 수정에 실패했습니다.</p>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center p-2">
                    <span className="font-semibold">{prev.title}</span>
                    {/* <span className="text-xs">ID:{prev.id}</span> */}
                    <button
                      type="button"
                      onClick={() => handleEdit(prev.title, prev.id)}
                      className="w-12 h-auto rounded-[15px] whitespace-nowrap border box-border p-1 enabled:hover:cursor-pointer"
                      disabled={mutation.isPending}
                    >
                      수정
                    </button>
                  </div>
                  <p className="wrap-anywhere p-2">{prev.body}</p>
                </>
              )}
            </div>
          ))
        )}
        {post.isFetching && !post.isPending ? (
          <p className="text-sm">최신 데이터를 확인중입니다.</p>
        ) : null}
      </div>
    </>
  );
}
