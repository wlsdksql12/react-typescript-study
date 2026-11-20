import { usePostList } from "./usePostList";

export default function PostSummaryPractice() {
  const { status, postList } = usePostList();
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>게시글 개수 요약</h4>
      {status === "loading" ? (
        <p>게시글을 불러오는 중입니다.</p>
      ) : status === "error" ? (
        <p>게시글 조회에 실패했습니다.</p>
      ) : status === "success" ? (
        <p>전체 게시글: {postList.length}개</p>
      ) : null}
    </div>
  );
}
