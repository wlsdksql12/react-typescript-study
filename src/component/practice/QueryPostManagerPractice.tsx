import QueryPostCreatePractice from "./QueryPostCreatePractice";
import QueryPostListPractice from "./QueryPostListPractice";

export default function QueryPostManagerPractice() {
  return (
    <div className="border box-border rounded-md p-4 flex flex-col gap-2.5">
      <header>
        <span className="font-semibold">TanStack Query 게시글 관리</span>
      </header>
      <QueryPostCreatePractice />
      <QueryPostListPractice />
    </div>
  );
}
