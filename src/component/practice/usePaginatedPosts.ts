import { useQuery } from "@tanstack/react-query";
import { fetGetPaginatedPost } from "./postApi";

export default function usePaginatedPosts(page: number) {
  const paginatedPosts = useQuery({
    queryKey: ["posts", page],
    staleTime: 120_000,
    gcTime: 180_000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async ({ signal }) => {
      const result = await fetGetPaginatedPost(page, signal);

      return result;
    },
  });

  return {
    paginatedPosts,
  };
}
