import { useEffect, useRef, useState } from "react";

interface DelayedMemoProps {
  preview: string;
  handlePreviewChange: (value: string) => void;
}

function DelayedMemo({ preview, handlePreviewChange }: DelayedMemoProps) {
  const [memo, setMemo] = useState("");
  //   const [preview, setPreview] = useState("");
  const [instructions, setInstructions] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (memo.trim() === "") {
      setInstructions(false);
      return;
    }

    console.log("예약 안내", memo);
    setInstructions(true);

    timerRef.current = setTimeout(() => {
      console.log("예약 반영");
      timerRef.current = null;
      setInstructions(false);
      handlePreviewChange(memo.trim());
    }, 5000);

    return () => {
      if (timerRef.current !== null) {
        clearTimerRef();
      }
    };
  }, [memo, handlePreviewChange]);
  // 입력창 입력 함수
  const handleChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  // 지금 반영
  const handleApplyNow = () => {
    // if (timerRef.current !== null) {
    //   clearTimeout(timerRef.current);
    //   timerRef.current = null;
    //   setInstructions(false);
    //   setPreview(memo.trim());
    //   setMemo("");
    // }

    const trimmedMemo = memo.trim();
    if (trimmedMemo === "") return;

    clearTimerRef();
    console.log("지금 반영");

    setInstructions(false);
    handlePreviewChange(trimmedMemo);
  };

  const clearTimerRef = () => {
    if (timerRef.current === null) return;

    console.log("예약 취소");
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  return (
    <>
      <input value={memo} onChange={handleChangeMemo} />
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span>{preview === "" ? "아직 반영된 내용이 없습니다." : preview}</span>
        <span>
          {instructions ? "반영 대기 중입니다." : "대기 중인 작업이 없습니다."}
        </span>
        <button
          style={{ width: "75px" }}
          onClick={handleApplyNow}
          disabled={memo.trim() === ""}
        >
          지금 반영
        </button>
      </div>
    </>
  );
}

export default DelayedMemo;
