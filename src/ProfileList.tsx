import React, { useRef, useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
}

interface EditProfileFormProps {
  editingName: string;
  changeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleEditCancel: () => void;
}

interface ProfileItemProps {
  profile: Profile;
  isEditing: boolean;
  editingId: number | null;
  handleDelete: (id: number) => void;
  handleIncreaseAge: (id: number) => void;
  handleDecreaseAge: (id: number) => void;
  handleEditingName: (id: number, name: string) => void;
}

function ProfileItem({
  profile,
  isEditing,
  editingId,
  handleDelete,
  handleIncreaseAge,
  handleDecreaseAge,
  handleEditingName,
}: ProfileItemProps) {
  return (
    <li>
      {isEditing === true && editingId === profile.id
        ? `이름: ${profile.name}(수정 중), 나이: ${profile.age}`
        : `이름: ${profile.name}, 나이: ${profile.age}`}
      <button type="button" onClick={() => handleDelete(profile.id)}>
        삭제
      </button>
      <button type="button" onClick={() => handleIncreaseAge(profile.id)}>
        나이 +1
      </button>
      <button
        type="button"
        onClick={() => handleDecreaseAge(profile.id)}
        disabled={profile.age === 0}
      >
        나이 -1
      </button>
      <button
        type="button"
        onClick={() => handleEditingName(profile.id, profile.name)}
        disabled={isEditing === true && editingId === profile.id}
      >
        이름 수정
      </button>
    </li>
  );
}

function EditProfileForm({
  handleEdit,
  editingName,
  changeName,
  handleEditCancel,
}: EditProfileFormProps) {
  return (
    <form onSubmit={handleEdit}>
      <hr />
      <div>이름 수정중</div>
      <input
        value={editingName}
        onChange={changeName}
        placeholder="수정할 이름을 입력해 주세요."
      />
      <button type="submit" disabled={editingName.trim().length < 2}>
        수정
      </button>
      <button type="button" onClick={handleEditCancel}>
        취소
      </button>
    </form>
  );
}

function ProfileList() {
  const nextId = useRef(4);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: "성진", age: 29 },
    { id: 2, name: "민수", age: 30 },
    { id: 3, name: "지수", age: 27 },
  ]);

  // 사람 추가
  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = userName.trim();
    if (name.length < 2) return;

    const newProfile: Profile = {
      id: nextId.current,
      name: name,
      age: 25,
    };

    nextId.current += 1;

    setProfiles((prev) => [...prev, newProfile]);
    setUserName("");
  };

  // 각각 삭제
  const handleDelete = (id: number) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    if (id === editingId) return handleEditCancel();
  };

  // 각각 나이 +1
  const handleIncreaseAge = (id: number) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id ? { ...profile, age: profile.age + 1 } : profile,
      ),
    );
  };

  // 전체 나이 +1
  const handleAllAge = () => {
    setProfiles((prev) =>
      prev.map((profile) => ({ ...profile, age: profile.age + 1 })),
    );
    // setProfiles((prev) =>
    //   prev.map((profile) => {
    //     return { ...profile, age: profile.age + 1 };
    //   }),
    // );
  };

  //각각의 나이 -1
  const handleDecreaseAge = (id: number) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id && profile.age > 0
          ? { ...profile, age: profile.age - 1 }
          : profile,
      ),
    );
  };

  // 전체 삭제
  const handleAllDelete = () => {
    setProfiles([]);
    handleEditCancel();
  };

  // 사람 추가 창 값 입력
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // 검색창 값 입력
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // 검색 계산식
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.includes(search.trim()),
  );

  // 검색 초기화
  const handleSearchClear = () => {
    searchInputRef.current?.focus();
    setSearch("");
  };

  // 각각의 이름 수정
  const handleEditingName = (id: number, name: string) => {
    setIsEditing(true);
    setEditingId(id);
    setEditingName(name);
  };

  // 이름 수정창 입력
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(event.target.value);
  };

  // 이름 수정 저장
  const handleEdit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newName = editingName.trim();

    if (editingId === null || newName.length < 2) return;

    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === editingId ? { ...profile, name: newName } : profile,
      ),
    );

    // 저장 이후 초기화
    setEditingId(null);
    setEditingName("");
    setIsEditing(false);
  };

  // 이름 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
    setIsEditing(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          전체: {profiles.length}명 / 검색 결과: {filteredProfiles.length}명
        </div>
        <div>
          {profiles.length !== 0 && filteredProfiles.length !== 0
            ? null
            : profiles.length !== 0 && filteredProfiles.length === 0
              ? "검색 결과가 없습니다."
              : "등록된 사람이 없습니다."}
        </div>
        <div>
          <input
            value={userName}
            onChange={onChange}
            placeholder="추가할 사람의 이름을 적어주세요."
            style={{
              height: "22px",
              width: "22%",
              marginBottom: "3px",
            }}
          />
        </div>
        <div>
          <input
            ref={searchInputRef}
            value={search}
            onChange={handleSearch}
            placeholder="검색할 사람의 이름을 적어주세요."
            style={{
              height: "22px",
              width: "22%",
              marginBottom: "3px",
              marginRight: "3px",
            }}
          />
          <button
            type="button"
            onClick={handleSearchClear}
            disabled={search.length === 0}
          >
            검색 초기화
          </button>
        </div>
        <button type="submit" disabled={userName.trim().length < 2}>
          사람 추가
        </button>
        <button
          type="button"
          onClick={handleAllAge}
          disabled={profiles.length === 0}
        >
          모두 나이 +1
        </button>
        <button
          type="button"
          onClick={handleAllDelete}
          disabled={profiles.length === 0}
        >
          전체 삭제
        </button>
        <ul>
          {filteredProfiles.map((profile) => (
            <ProfileItem
              key={profile.id}
              profile={profile}
              isEditing={isEditing}
              editingId={editingId}
              handleDelete={handleDelete}
              handleIncreaseAge={handleIncreaseAge}
              handleDecreaseAge={handleDecreaseAge}
              handleEditingName={handleEditingName}
            />
          ))}
        </ul>
      </form>
      {editingId !== null ? (
        <EditProfileForm
          editingName={editingName}
          changeName={changeName}
          handleEdit={handleEdit}
          handleEditCancel={handleEditCancel}
        />
      ) : null}
    </>
  );
}

export default ProfileList;
