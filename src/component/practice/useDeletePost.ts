import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeletePost } from "./postApi";
import type { Post } from "./post.type";

export default function useDeletePost() {
  const queryClient = useQueryClient();

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
    delMutation,
  };
}
