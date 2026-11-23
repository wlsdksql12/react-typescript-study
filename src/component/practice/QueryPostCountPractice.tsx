import { useQuery } from "@tanstack/react-query";
import { fetchGetPost } from "./postApi";

export default function QueryPostCountPractic() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["post-count-practice"],
    queryFn: async ({ signal }) => {
      const result = await fetchGetPost(signal);

      if (!Array.isArray(result)) {
        throw new Error("게시글 응답이 배열이 아닙니다.");
      }

      return result.length;
    },
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
    </div>
  );
}
