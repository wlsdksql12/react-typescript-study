import { useReducer } from "react";

type Action = { type: "increase" } | { type: "decrease" } | { type: "reset" };

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case "increase":
      return Math.min(5, state + 1);

    case "decrease":
      return Math.max(0, state - 1);

    case "reset":
      return 2;

    default: {
      const remaining: never = action;
      return remaining;
    }
  }
}

export default function StockReducerPractice() {
  const [count, dispatch] = useReducer(counterReducer, 2);
  return (
    <div>
      <p>
        현재 재고: {count}개 / {count > 0 ? "구매 가능" : "품절"}
      </p>

      <button
        type="button"
        onClick={() => dispatch({ type: "increase" })}
        disabled={count === 5}
      >
        증가
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "decrease" })}
        disabled={count === 0}
      >
        감소
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "reset" })}
        disabled={count === 2}
      >
        리셋
      </button>
    </div>
  );
}
