import { useState } from "react";

interface MemoHistoryProps {
  items: {
    prefix: string;
    value: string;
  }[];
  handleMemoHistoryDel: () => void;
}

export default function MemoHistory({
  items,
  handleMemoHistoryDel,
}: MemoHistoryProps) {
  const [showMemoList, setShowMemoList] = useState(true);
  return (
    <>
      <button
        type="button"
        onClick={() => setShowMemoList((prev) => !prev)}
        className="memo-button-HistoryDel"
        disabled={items.length < 1}
      >
        {showMemoList ? "기록 접기" : "기록 펼치기"}
      </button>
      <div>
        <button
          type="button"
          onClick={handleMemoHistoryDel}
          disabled={items.length < 1}
          className="memo-button-HistoryDel"
        >
          기록 전체 삭제
        </button>
      </div>
      {items.length > 0 ? (
        showMemoList ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item.prefix + item.value}</li>
            ))}
          </ul>
        ) : (
          <div className="memo-not-list">
            기록이 {items.length}개가 접혀 있습니다.
          </div>
        )
      ) : (
        <div className="memo-not-list">아직 반영 기록이 없습니다.</div>
      )}
    </>
  );
}
