interface MemoInputProps {
  value: string;
  autoApply: boolean;
  onValueChange: (value: string) => void;
  handleAutoApply: (checked: boolean) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function MemoInput({
  value,
  autoApply,
  onValueChange,
  handleAutoApply,
  onSubmit,
}: MemoInputProps) {
  return (
    <form onSubmit={onSubmit}>
      <label className="memo-label" htmlFor="memo-input">
        메모 내용
      </label>
      <label className="memo-auto-check">
        <input
          type="checkbox"
          checked={autoApply}
          onChange={(event) => handleAutoApply(event.target.checked)}
        />
        {autoApply ? "자동 반영 끄기" : "자동 반영 켜기"}
      </label>
      <input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="memo-input"
        id="memo-input"
      />
    </form>
  );
}
