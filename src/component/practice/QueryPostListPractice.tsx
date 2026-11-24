import { useQuery } from "@tanstack/react-query";
import { fetchValidatedPosts } from "./postApi";

export default function QueryPostListPractice() {
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
  console.log(post.data);
  return (
    <>
      <div className="border box-border rounded-md w-full max-w-3xl p-4">
        <header>
          <span className="font-semibold">TanStack Query 게시글 목록</span>
        </header>
        <hr />
        {post.isPending ? (
          <p>게시글을 불러오는중입니다.</p>
        ) : post.isError ? (
          <p>게시글을 불러오지 못했습니다.</p>
        ) : post.data.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          post.data.map((prev) => (
            <div key={prev.id} className="border box-border rounded-md mb-2.5">
              <div className="flex justify-between items-center p-2">
                <span className="font-semibold">{prev.title}</span>
                <span className="text-xs">ID:{prev.id}</span>
              </div>
              <p className="wrap-anywhere">{prev.body}</p>
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
