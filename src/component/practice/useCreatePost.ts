import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostPost } from "./postApi";
import type { Post } from "./post.type";

export default function useCreatePost() {
  const queryClient = useQueryClient();

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

  return {
    postMutation,
  };
}
