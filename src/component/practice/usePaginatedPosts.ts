import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchGetPaginatedPost } from "./postApi";

export default function usePaginatedPosts(page: number) {
  const paginatedPosts = useQuery({
    queryKey: ["posts", page],
    staleTime: 120_000,
    gcTime: 180_000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async ({ signal }) => {
      const result = await fetchGetPaginatedPost(page, signal);

      return result;
    },
    placeholderData: keepPreviousData,
  });

  return {
    paginatedPosts,
  };
}
