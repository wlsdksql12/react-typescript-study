import { useEffect, useRef, useState } from "react";

export default function TimerReviewPractice() {
  const [count, setCount] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    console.log("useEffect 실행");

    timer.current = setTimeout(() => {
      timer.current = null;
      console.log("최종 count:" + count);
    }, 1000);

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
        console.log("useEffect 정리 함수 실행");
      }
    };
  }, [count]);

  return (
    <>
      <div>
        <h2>count: {count}개</h2>
      </div>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        +1
      </button>
    </>
  );
}
