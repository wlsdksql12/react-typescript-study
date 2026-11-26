import { useQuery } from "@tanstack/react-query";
import { fetchValidatedPosts } from "./postApi";

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

  return {
    post,
  };
}
