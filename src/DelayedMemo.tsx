import { useEffect, useRef, useState } from "react";
import "../src/style/DelayedMemo.css";
import MemoInput from "./MemoInput";

interface DelayedMemoProps {
  preview: string;
  autoApply: boolean;
  handlePreviewChange: (value: string) => void;
  handleAutoApply: (checked: boolean) => void;
}

function DelayedMemo({
  preview,
  autoApply,
  handlePreviewChange,
  handleAutoApply,
}: DelayedMemoProps) {
  const [memo, setMemo] = useState("");
  const [pending, setPending] = useState(false);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (memo.trim() === "" || autoApply === false) {
      setPending(false);
      return;
    }

    console.log("예약 안내", memo);
    setPending(true);

    timerRef.current = setTimeout(() => {
      console.log("예약 반영");
      timerRef.current = null;
      setPending(false);
      handlePreviewChange(memo.trim());
    }, 5000);

    return () => {
      if (timerRef.current !== null) {
        clearTimerRef();
      }
    };
  }, [memo, autoApply, handlePreviewChange]);
  // 입력창 입력 함수
  const onValueChange = (value: string) => {
    setMemo(value);
  };

  // 지금 반영
  const handleApplyNow = () => {
    const trimmedMemo = memo.trim();
    if (trimmedMemo === "") return;

    clearTimerRef();
    console.log("지금 반영");

    setPending(false);
    handlePreviewChange(trimmedMemo);
  };

  const clearTimerRef = () => {
    if (timerRef.current === null) return;

    console.log("예약 취소");
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const handleCancelPending = () => {
    clearTimerRef();
    setPending(false);
  };

  const handleClearMemo = () => {
    setMemo("");
  };

  return (
    <div className="memo-card">
      <MemoInput
        value={memo}
        onValueChange={onValueChange}
        autoApply={autoApply}
        handleAutoApply={handleAutoApply}
      />
      <div className="memo-content">
        <span
          className={
            preview
              ? "memo-preview memo-preview-filled"
              : "memo-preview memo-preview-empty"
          }
        >
          {preview === "" ? "아직 반영된 내용이 없습니다." : preview}
        </span>
        <span
          className={
            pending ? "memo-status memo-status-pending" : "memo-status"
          }
        >
          {pending ? "반영 대기 중입니다." : "대기 중인 작업이 없습니다."}
        </span>
        <div className="memo-buttons">
          <button
            className="memo-button"
            onClick={handleApplyNow}
            disabled={memo.trim() === ""}
          >
            지금 반영
          </button>
          <button
            className="memo-button memo-button-cancelPending"
            onClick={handleCancelPending}
            disabled={pending === false}
          >
            예약만 취소
          </button>
          <button
            className="memo-button memo-button-clearMemo"
            onClick={handleClearMemo}
            disabled={memo === ""}
          >
            입력 지우기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DelayedMemo;
