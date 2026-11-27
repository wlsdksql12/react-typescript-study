import { useReducer } from "react";
import usePaginatedPosts from "./usePaginatedPosts";

type CounterState = {
  count: number;
};

type CounterAction = { type: "increment" } | { type: "decrement" };

function counterReducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
  }
}

export default function QueryPostPaginationPractice() {
  const [state, dispatch] = useReducer(counterReducer, { count: 1 });
  const { paginatedPosts } = usePaginatedPosts(state.count);
  //   const [pageNumber, setPageNumber] = useState(1);
  console.log(paginatedPosts.data);
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <header className=" mb-2">
        <span className="font-semibold">게시글 목록(페이지네이션)</span>
      </header>
      {paginatedPosts.isPending ? (
        <p>게시글을 불러오는중 입니다.</p>
      ) : paginatedPosts.isError ? (
        <p>게시글을 불러오는데 실패했습니다.</p>
      ) : paginatedPosts.data.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        paginatedPosts.data.map((prev) => (
          <div key={prev.id} className="border box-border rounded-md mb-2">
            <div className="flex justify-between p-1">
              <span className="font-semibold">{prev.title}</span>
              <span className="text-sm">ID: {prev.id}</span>
            </div>
            <p className="p-1">{prev.body}</p>
          </div>
        ))
      )}
      <div className="flex justify-center items-center gap-1.5">
        <button
          onClick={() => dispatch({ type: "decrement" })}
          disabled={state.count === 1}
        >
          이전
        </button>
        <span>{state?.count} / 3</span>
        <button
          onClick={() => dispatch({ type: "increment" })}
          disabled={state.count === 3}
        >
          다음
        </button>
      </div>
    </div>
  );
}
