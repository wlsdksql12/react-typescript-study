import "../component/memoTypes";

interface TaskItemProps {
  item: ItemListProps;
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
}

export default function TaskItem({
  item,
  handleDone,
  handleDelete,
}: TaskItemProps) {
  return (
    <>
      <span className="todo-list-bullet" aria-hidden="true" />
      <span className="todo-list-name">
        {item.text} {item.done ? "(완료)" : "(미완료)"}
      </span>
      <div className="todo-list-buttons">
        <button
          type="button"
          onClick={() => handleDone(item.id)}
          className="todo-list-done"
        >
          {item.done === true ? "취소" : "완료"}
        </button>
        <button
          type="button"
          onClick={() => handleDelete(item.id)}
          className="todo-list-delete"
        >
          삭제
        </button>
      </div>
    </>
  );
}
