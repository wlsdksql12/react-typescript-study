import { useEffect, useRef, useState } from "react";
import type { MemoRecord } from "./memoTypes";

interface MemoHistoryProps {
  items: MemoRecord[];
  handleMemoHistoryAllDel: () => void;
  onDelete: (id: number) => void;
  onReverse: () => void;
  onUpdate: (id: number, value: string) => void;
}

export default function MemoHistory({
  items,
  handleMemoHistoryAllDel,
  onDelete,
  onReverse,
  onUpdate,
}: MemoHistoryProps) {
  const [showMemoList, setShowMemoList] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingId]);

  const handleStartEdit = (record: MemoRecord) => {
    setEditingId(record.id);
    setDraftValue(record.value);
  };

  const handleSaveEdit = () => {
    const newValue = draftValue.trim();
    if (newValue === "" || editingId === null) return;

    onUpdate(editingId, newValue);
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraftValue("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowMemoList((prev) => !prev)}
        className="memo-button-history-open-close"
        disabled={items.length < 1 || editingId !== null}
      >
        {showMemoList ? "기록 접기" : "기록 펼치기"}
      </button>
      <div className="memo-button-contnet">
        <button
          type="button"
          onClick={handleMemoHistoryAllDel}
          disabled={items.length < 1}
          className="memo-button-history-delete"
        >
          기록 전체 삭제
        </button>
        <button
          type="button"
          onClick={onReverse}
          disabled={items.length < 2}
          className="memo-button-history-reverse"
        >
          기록 순서 뒤집기
        </button>
      </div>
      {items.length > 0 ? (
        showMemoList ? (
          <ul className="memo-history-list">
            {items.map((item, index) => (
              <li key={item.id} className="memo-list">
                {editingId === item.id ? (
                  <>
                    <input
                      aria-label="수정할 메모 내용"
                      ref={inputRef}
                      value={draftValue}
                      onChange={(event) => setDraftValue(event.target.value)}
                    />
                    <button
                      type="button"
                      className="memo-list-edit-save"
                      onClick={handleSaveEdit}
                    >
                      수정 저장
                    </button>
                    <button
                      type="button"
                      className="memo-list-edit-cancel"
                      onClick={handleCancelEdit}
                    >
                      수정 취소
                    </button>
                  </>
                ) : (
                  <>
                    <span className="memo-list-number">{index + 1}.</span>
                    <span className="memo-list-text">
                      {item.prefix + item.value}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="memo-list-delete"
                    >
                      기록 삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="memo-list-update"
                    >
                      기록 수정
                    </button>
                  </>
                )}
                {/* <span className="memo-list-number">{index + 1}.</span>
                <span className="memo-list-text">
                  {item.prefix + item.value}
                </span> */}
                {/* <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="memo-list-delete"
                >
                  기록 삭제
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEdit(item)}
                  className="memo-list-update"
                >
                  기록 수정
                </button> */}
              </li>
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
