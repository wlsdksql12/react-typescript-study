import { useEffect, useRef, useState } from "react";

interface ProfileEditProps {
  handleEdit: (name: string) => void;
  handleEditCancel: () => void;
  profile: string;
}

export default function ProfileEditForm({
  handleEdit,
  profile,
  handleEditCancel,
}: ProfileEditProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editName, setEditName] = useState(profile);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm">새이름</span>
        <input
          ref={inputRef}
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
          className="p-3 rounded-2xl border box-border"
        />
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={handleEditCancel}>
          취소
        </button>
        <button
          type="button"
          disabled={editName.trim().length < 2 || editName.trim() === profile}
          onClick={() => handleEdit(editName.trim())}
        >
          저장
        </button>
      </div>
    </div>
  );
}
