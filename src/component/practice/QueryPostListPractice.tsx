import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeletePost, fetchPatchPost } from "./postApi";
import { useState } from "react";
import type { Post, UpdateTitleData } from "./post.type";
import { usePosts } from "./usePosts";

export default function QueryPostListPractice() {
  const queryClient = useQueryClient();
  const [editState, setEditState] = useState<{
    title: string;
    id: number | null;
  }>({
    title: "",
    id: null,
  });
  const { post } = usePosts();
  // const post = useQuery({
  //   queryKey: ["posts"],
  //   staleTime: 120_000,
  //   gcTime: 180_000,
  //   refetchOnWindowFocus: false,
  //   retry: false,
  //   queryFn: async ({ signal }) => {
  //     const result = await fetchValidatedPosts(signal);

  //     return result;
  //   },
  // });

  const mutation = useMutation({
    mutationFn: async (data: UpdateTitleData) =>
      fetchPatchPost(data.id, data.title),
    onSuccess: (_data, variables) => {
      console.log("요청 성공");
      queryClient.setQueryData<Post[]>(["posts"], (oldposts) => {
        if (!oldposts) return oldposts;
        console.log(oldposts);

        return oldposts.map((prev) =>
          prev.id === variables.id
            ? { ...prev, title: variables.title.trim() }
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

  const delMutation = useMutation({
    // mutationFn: async (id: number) => {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts/${id}`,
    //     {
    //       method: "DELETE",
    //     },
    //   );

    //   if (!response.ok) {
    //     throw new Error("HTTP 요청 실패");
    //   }
    // },
    mutationFn: async (id: number) => fetchDeletePost(id),
    onSuccess: (_data, variable) => {
      console.log("삭제 성공");
      console.log(variable);
      queryClient.setQueryData<Post[]>(["posts"], (oldposts) => {
        return oldposts?.filter((prev) => prev.id !== variable);
      });
    },
    onError: () => {
      console.log("삭제 실패");
    },
    networkMode: "always",
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

  const handleDelete = (id: number) => {
    delMutation.mutate(id);
  };
  console.log(post.data);
  return (
    <>
      <div className="border box-border rounded-md w-full max-w-3xl p-4">
        <header className="flex justify-between items-center ">
          <span className="font-semibold">TanStack Query 게시글 목록</span>
          {post.data === undefined ? null : (
            <span className="text-sm">총 {post.data.length}개</span>
          )}
        </header>
        <hr />
        {post.isPending ? (
          <p>게시글을 불러오는중입니다.</p>
        ) : post.isError ? (
          <p className="text-red-500">게시글을 불러오지 못했습니다.</p>
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
                      disabled={mutation.isPending || delMutation.isPending}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={handleEditSave}
                      className="w-12 h-auto rounded-[15px] whitespace-nowrap border box-border p-1 enabled:hover:cursor-pointer"
                      disabled={
                        mutation.isPending ||
                        delMutation.isPending ||
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
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(prev.title, prev.id)}
                        className="w-12 h-auto rounded-[15px] whitespace-nowrap border box-border p-1 enabled:hover:cursor-pointer"
                        disabled={mutation.isPending || delMutation.isPending}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(prev.id)}
                        className="w-12 h-auto rounded-[15px] whitespace-nowrap border box-border p-1 enabled:hover:cursor-pointer"
                        disabled={mutation.isPending || delMutation.isPending}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <p className="wrap-anywhere p-2">{prev.body}</p>
                  {delMutation.isError && prev.id === delMutation.variables ? (
                    <p className="text-red-500 p-2">
                      게시글 삭제에 실패했습니다.
                    </p>
                  ) : null}
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
