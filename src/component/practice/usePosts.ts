import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchDeletePost,
  fetchPatchPost,
  fetchPostPost,
  fetchValidatedPosts,
} from "./postApi";
import type { Post, UpdateTitleData } from "./post.type";

export function usePosts() {
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
    networkMode: "always",
  });

  const patchMutation = useMutation({
    mutationFn: async (data: UpdateTitleData) =>
      fetchPatchPost(data.id, data.title),
    networkMode: "always",
  });

  const delMutation = useMutation({
    mutationFn: async (id: number) => fetchDeletePost(id),
    networkMode: "always",
  });

  return {
    post,
    postMutation,
    patchMutation,
    delMutation,
  };
}
