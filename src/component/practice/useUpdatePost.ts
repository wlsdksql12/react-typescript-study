import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post, UpdateTitleData } from "./post.type";
import { fetchPatchPost } from "./postApi";

export default function useUpdatePost() {
  const queryClient = useQueryClient();

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

  return {
    patchMutation,
  };
}
