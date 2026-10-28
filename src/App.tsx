import { useCallback, useRef, useState } from "react";
import ProfileList from "./component/ProfileList";
import DelayedMemo from "./component/DelayedMemo";
import MemoHistory from "./component/MemoHistory";
import type { MemoRecord } from "./component/memoTypes";
import "../src/style/style.css";
import TaskPractice from "./component/TaskPractice";
import CartPractice from "./component/CartPractice";
import PromisePractice from "./component/PromisePractice";
import UserLookupPractice from "./component/UserLookupPractice";
import ApiPractice from "./component/ApiPractice";
import PostListPractice from "./component/PostListPractice";
import CommentsPractice from "./component/CommentsPractice";
import { NavLink, Route, Routes, useParams } from "react-router";

interface NameProps {
  name: string;
}

interface RegisteredNameProps {
  name: string;
  onCancel: () => void;
  onEdit: (name: string) => void;
  onOtherName: () => void;
}

interface profile {
  name: string;
  age: number;
}

interface ProfilePracticeProps extends profile {
  onClickAge: () => void;
  onClickName: () => void;
  onClickAllChange: () => void;
}

function NamePractice({ name }: NameProps) {
  if (name.length === 1) {
    return <div>이름은 2글자 이상 입력해 주세요.</div>;
  } else if (name.length >= 2) {
    return <div>안녕하세요, {name}님!</div>;
  }
  return <div>이름을 입력해 주세요.</div>;
}

function RegisteredName({
  name,
  onCancel,
  onEdit,
  onOtherName,
}: RegisteredNameProps) {
  return (
    <div>
      <span>
        {name !== "" ? `등록된 이름: ${name}  ` : "등록된 이름이 없습니다.  "}
      </span>
      <button type="button" onClick={onCancel} disabled={name === ""}>
        등록 취소
      </button>
      <button type="button" onClick={() => onEdit(name)} disabled={name === ""}>
        {" "}
        수정
      </button>
      <button type="button" onClick={onOtherName}>
        다른 이름 입력
      </button>
    </div>
  );
}

function ProfilePractice({
  name,
  age,
  onClickAge,
  onClickName,
  onClickAllChange,
}: ProfilePracticeProps) {
  return (
    <>
      <div>
        이름: {name}, 나이: {age}
      </div>
      <button onClick={onClickAge}>나이 +1</button>
      <button onClick={onClickName}>이름 변경</button>
      <button onClick={onClickAllChange}>한 번에 변경</button>
    </>
  );
}

function Home() {
  return <h1>홈 화면입니다.</h1>;
}

function About() {
  return <h1>소개 화면입니다.</h1>;
}

function NotFound() {
  return (
    <>
      <h1>Error 404</h1>
      <h3>요청한 페이지를 찾을 수 없습니다.</h3>
    </>
  );
}

function PostPage() {
  const { postId } = useParams();

  if (!Number.isInteger(Number(postId)) || Number(postId) <= 0) {
    return <h2>올바르지 않은 게시글 ID입니다.</h2>;
  }
  return <h2>현재 게시글 ID: {postId ?? "없음"}</h2>;
}

function App() {
  const [name, setName] = useState<string>("");
  const [registeredName, setRegisteredName] = useState("");
  const [profile, setProfile] = useState<profile>({
    name: "성진",
    age: 29,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [showMemo, setShowMemo] = useState(true);
  const [preview, setPreview] = useState("");
  const [prefix, setPreFix] = useState("메모: ");
  const [autoApply, setAutoApply] = useState(true);
  const [memoList, setMemoList] = useState<MemoRecord[]>([]);
  const nextMemoIdRef = useRef(1);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onClick = () => {
    setName("");
  };
  const onClickCancel = () => {
    setRegisteredName("");
  };
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) return;

    setRegisteredName(trimmedName);
    setName("");
  };

  const onEdit = (name: string) => {
    setName(name);
    inputRef.current?.focus();
  };

  const onOtherName = () => {
    setName("");
    inputRef.current?.focus();
  };

  const onClickAge = () => {
    setProfile((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };

  const onClickName = () => {
    setProfile((prev) => ({
      ...prev,
      name: "민수",
    }));
  };

  const onClickAllChange = () => {
    setProfile((prev) => ({
      name: "지수",
      age: prev.age + 2,
    }));
  };

  const handlePreviewChange = useCallback(
    (value: string) => {
      console.log("부모 함수 실행", prefix, value);
      setPreview(prefix + value);

      const newRecord: MemoRecord = {
        id: nextMemoIdRef.current,
        prefix: prefix,
        value: value,
      };

      nextMemoIdRef.current += 1;

      setMemoList((prev) => [...prev, newRecord]);
    },
    [prefix],
  );

  const handleAutoApply = (checked: boolean) => {
    setAutoApply(checked);
  };

  const handleMemoHistoryAllDel = () => {
    setMemoList([]);
  };

  const onDelete = (id: number) => {
    const newMemoList = memoList.filter((prev) => prev.id !== id);

    setMemoList(newMemoList);
  };

  const handleReverseHistory = () => {
    setMemoList((prev) => [...prev].reverse());
  };

  const handleUpdateHistory = (id: number, value: string) => {
    setMemoList((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, value: value } : record,
      ),
    );
  };

  const handleSearchAllDel = (filteredItems: MemoRecord[]) => {
    console.log(filteredItems);

    setMemoList((prev) =>
      prev.filter((list) => {
        const filteredMemoList = filteredItems.some(
          (item) => item.id === list.id,
        );

        return !filteredMemoList;
      }),
    );
  };

  return (
    <>
      <ProfilePractice
        name={profile.name}
        age={profile.age}
        onClickAge={onClickAge}
        onClickName={onClickName}
        onClickAllChange={onClickAllChange}
      />
      <RegisteredName
        name={registeredName}
        onCancel={onClickCancel}
        onEdit={onEdit}
        onOtherName={onOtherName}
      />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={name}
          onChange={onChange}
          placeholder="이름을 입력해 주세요."
        />
        <NamePractice name={name.trim()} />
        <button type="button" onClick={onClick} disabled={name === ""}>
          Clear
        </button>
        <button type="submit" disabled={name.trim().length <= 1}>
          등록
        </button>
      </form>
      <ProfileList />
      <hr />
      <h2>메모 미리보기 실습</h2>

      <button type="button" onClick={() => setShowMemo((prev) => !prev)}>
        {showMemo ? "메모 닫기" : "메모 열기"}
      </button>
      <div>
        선택한 문구: {prefix}
        <button type="button" onClick={() => setPreFix("메모: ")}>
          메모 문구
        </button>
        <button type="button" onClick={() => setPreFix("공지: ")}>
          공지 문구
        </button>
      </div>
      <div>
        {showMemo ? (
          <DelayedMemo
            preview={preview}
            autoApply={autoApply}
            handlePreviewChange={handlePreviewChange}
            handleAutoApply={handleAutoApply}
          />
        ) : null}
      </div>
      <MemoHistory
        items={memoList}
        handleMemoHistoryAllDel={handleMemoHistoryAllDel}
        onDelete={onDelete}
        onReverse={handleReverseHistory}
        onUpdate={handleUpdateHistory}
        handleSearchAllDel={handleSearchAllDel}
      />
      <hr style={{ margin: "40px 0px" }} />
      <TaskPractice />
      <hr style={{ margin: "40px 0px" }} />
      <CartPractice />
      <hr style={{ margin: "40px 0px" }} />
      <PromisePractice />
      <hr style={{ margin: "40px 0px" }} />
      <UserLookupPractice />
      <hr style={{ margin: "40px 0px" }} />
      <ApiPractice />
      <hr style={{ margin: "40px 0px" }} />
      <PostListPractice />
      <hr style={{ margin: "40px 0px" }} />
      <div>
        <nav className="site-nav">
          <NavLink className="site-home" to="/">
            홈
          </NavLink>
          <NavLink className="site-about" to="/about">
            소개
          </NavLink>
          <NavLink className="site-comments" to="/comments">
            댓글
          </NavLink>
          <NavLink className="site-comments" to="/posts/1">
            게시글 1
          </NavLink>
          <NavLink className="site-comments" to="/posts/2">
            게시글 2
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/comments" element={<CommentsPractice />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
