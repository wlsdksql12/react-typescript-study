import { useRef, useState } from "react";

interface ItemListProps {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskPractice() {
  const todoIdRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<ItemListProps[]>([]);
  const [showTodoList, setShowTodoList] = useState("All");

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current?.focus();
    if (todo.trim() === "") return;

    const item = {
      id: todoIdRef.current,
      text: todo,
      done: false,
    };

    todoIdRef.current += 1;

    setTodoList((prev) => [...prev, item]);
    setTodo("");
  };

  const handleDone = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const todoDone = todoList.filter((prev) => prev.done === true);

  const filteredTodoList =
    showTodoList === "Done"
      ? todoList.filter((prev) => prev.done === true)
      : showTodoList === "Undone"
        ? todoList.filter((prev) => prev.done === false)
        : todoList;

  console.log(todoList);
  return (
    <form onSubmit={onSubmit}>
      <input
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
        ref={inputRef}
      />
      <button type="submit" disabled={todo.trim() === ""}>
        추가
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span>오늘 할일: {todoList.length}개</span>
        <span>오늘 할일 완료: {todoDone.length}개</span>
      </div>
      <button type="button" onClick={() => setShowTodoList("All")}>
        전체 보기
      </button>
      <button type="button" onClick={() => setShowTodoList("Done")}>
        완료만 보기
      </button>
      <button type="button" onClick={() => setShowTodoList("Undone")}>
        미완료만 보기
      </button>

      {todoList.length === 0 ? (
        <div>등록된 할 일이 없습니다.</div>
      ) : filteredTodoList.length === 0 ? (
        <div>
          {showTodoList === "Done"
            ? "완료한 할 일이 없습니다."
            : "미완료 할 일이 없습니다."}
        </div>
      ) : (
        <ul>
          {filteredTodoList.map((item) => (
            <li key={item.id}>
              <span>
                {item.text} {item.done ? "(완료)" : "(미완료)"}
              </span>
              <button type="button" onClick={() => handleDone(item.id)}>
                {item.done === true ? "취소" : "완료"}
              </button>
              <button type="button" onClick={() => handleDelete(item.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
