import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchDeletePost,
  fetchPatchPost,
  fetchPostPost,
  fetchValidatedPosts,
} from "./postApi";
import type { Post, UpdateTitleData } from "./post.type";

export function usePosts() {
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

  const postMutation = useMutation({
    mutationFn: async (item: Post) => fetchPostPost(item),
    onSuccess: (_data, variables) => {
      console.log("요청 성공");

      queryClient.setQueryData<Post[]>(["posts"], (oldposts) => {
        if (!oldposts) return oldposts;

        return [...oldposts, variables];
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["posts"],
      // });
    },
    onError: () => {
      console.log("요청 실패");
    },
    networkMode: "always",
  });

  const patchMutation = useMutation({
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
    },
    onError: () => {
      console.log("요청 실패");
    },

    networkMode: "always",
  });

  const delMutation = useMutation({
    mutationFn: async (id: number) => fetchDeletePost(id),
    networkMode: "always",
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
  });

  return {
    post,
    postMutation,
    patchMutation,
    delMutation,
  };
}
