import { useQuery } from "@tanstack/react-query";
import { fetchValidatedPosts } from "./postApi";

export default function QueryPostCountPractic() {
  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["posts"],
    staleTime: 120_000,
    gcTime: 180_000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async ({ signal }) => {
      const result = await fetchValidatedPosts(signal);

      return result;
    },
    select: (posts) => posts.length,
  });
  console.log(data);
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <span className="font-semibold">TanStack Query 실습</span>
      <hr />
      {isPending ? (
        <p>게시글을 불러오는중입니다.</p>
      ) : isError ? (
        <p>게시글 조회에 실패했습니다.</p>
      ) : (
        <p>조회한 게시글: {data}개</p>
      )}
      {isFetching && !isPending ? (
        <p>최신 데이터를 확인하는 중입니다.</p>
      ) : null}
    </div>
  );
}
