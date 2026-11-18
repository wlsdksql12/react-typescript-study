interface PostEditFormProps {
  draftTitle: string;
  setDraftTitle: React.Dispatch<React.SetStateAction<string>>;
  editErrorMessage: string;
  // setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditId: (value: number | null) => void;
  editLoading: boolean;
  handlePostPatch: () => Promise<void>;
}

export default function PostEditForm({
  draftTitle,
  setDraftTitle,
  editErrorMessage,
  setEditId,
  editLoading,
  handlePostPatch,
}: PostEditFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2 pb-2">
        <label htmlFor="editTitle">게시글 제목 수정</label>
        <input
          id="editTitle"
          className="p-1 font-semibold"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          placeholder="수정할 제목을 입력해 주세요."
        />
      </div>
      {editErrorMessage !== "" ? <p>{editErrorMessage}</p> : null}
      <div className="flex justify-self-end gap-2">
        <button
          type="button"
          onClick={() => setEditId(null)}
          disabled={editLoading}
        >
          취소
        </button>
        <button
          type="button"
          onClick={handlePostPatch}
          disabled={draftTitle.trim() === "" || editLoading}
        >
          {editLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </>
  );
}
