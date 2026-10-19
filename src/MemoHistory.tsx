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
  const [searchKeyword, setSearchKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingId]);

  const filteredItems = items.filter((prev) =>
    prev.value.includes(searchKeyword.trim()),
  );

  const handleStartEdit = (record: MemoRecord) => {
    setEditingId(record.id);
    setDraftValue(record.value);
  };

  const handleSaveEdit = () => {
    const newValue = draftValue.trim();
    if (newValue === "" || editingId === null) return;

    const editingRecord = items.find((record) => record.id === editingId);

    if (!editingRecord || newValue === editingRecord.value) return;

    onUpdate(editingId, newValue);
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraftValue("");
  };

  const handleClearHistory = () => {
    handleMemoHistoryAllDel();
    handleCancelEdit();
  };

  const handleEditSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSaveEdit();
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleCancelEdit();
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <button
        type="button"
        onClick={() => setShowMemoList((prev) => !prev)}
        className="memo-button-history-open-close"
        disabled={items.length < 1 || editingId !== null}
      >
        {showMemoList ? "기록 접기" : "기록 펼치기"}
      </button>
      <div className="memo-search">
        <input
          placeholder="메모 내용 검색"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          disabled={editingId !== null}
        />
        <button
          type="button"
          disabled={searchKeyword.trim() === "" || editingId !== null}
          onClick={handleClearSearch}
        >
          검색 초기화
        </button>
      </div>
      <div className="memo-button-contnet">
        <button
          type="button"
          onClick={handleClearHistory}
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
          filteredItems.length > 0 ? (
            <ul className="memo-history-list">
              {filteredItems.map((item, index) => (
                <li key={item.id} className="memo-list">
                  {editingId === item.id ? (
                    <>
                      <input
                        aria-label="수정할 메모 내용"
                        ref={inputRef}
                        value={draftValue}
                        onChange={(event) => setDraftValue(event.target.value)}
                        onKeyDown={handleEditKeyDown}
                        className="memo-edit-input"
                      />
                      <button
                        type="submit"
                        className="memo-list-edit-save"
                        // onClick={handleSaveEdit}
                        disabled={
                          draftValue.trim() === item.value ||
                          draftValue.trim() === ""
                        }
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
                        disabled={editingId !== null}
                      >
                        기록 수정
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="memo-not-list">검색 결과가 없습니다.</div>
          )
        ) : (
          <div className="memo-not-list">
            기록이 {items.length}개가 접혀 있습니다.
          </div>
        )
      ) : (
        <div className="memo-not-list">아직 반영 기록이 없습니다.</div>
      )}
    </form>
  );
}
