import { useState } from "react";

interface NameProps {
  name: string;
}

function NamePractice({ name }: NameProps) {
  const trimmedName = name.trim();
  if (trimmedName !== "") {
    return <div>안녕하세요, {trimmedName}님!</div>;
  }
  return <div>이름을 입력해 주세요.</div>;
}

function RegisteredName({ name }: NameProps) {
  if (name !== "") {
    return <div>등록된 이름: {name}</div>;
  }

  return <div>등록된 이름이 없습니다.</div>;
}

function App() {
  const [name, setName] = useState<string>("");
  const [registeredName, setRegisteredName] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onClick = () => {
    setName("");
  };
  const handleRegister = () => {
    setRegisteredName(name.trim());
    setName("");
  };
  const onClickCancel = () => {
    setRegisteredName("");
  };
  return (
    <>
      <RegisteredName name={registeredName} />
      <input
        value={name}
        onChange={onChange}
        placeholder="이름을 입력해 주세요."
      />
      <NamePractice name={name} />
      <button onClick={onClick} disabled={name === ""}>
        Clear
      </button>
      <button onClick={handleRegister} disabled={name.trim() === ""}>
        등록
      </button>
      <button onClick={onClickCancel} disabled={registeredName.trim() === ""}>
        등록 취소
      </button>
    </>
  );
}

export default App;
