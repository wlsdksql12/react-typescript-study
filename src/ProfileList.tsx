import React, { useRef, useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
}

// interface SearchProfile {
//   profiles: Profile[];
//   searchName: string;
//   handleDelete: (id: number) => void;
//   handleIncreaseAge: (id: number) => void;
//   handleDecreaseAge: (id: number) => void;
// }

// function FilteredProfiles({
//   profiles,
//   searchName,
//   handleDelete,
//   handleIncreaseAge,
//   handleDecreaseAge,
// }: SearchProfile) {
//   const filteredProfiles = profiles.filter((profile) =>
//     profile.name.includes(searchName.trim()),
//   );

//   return (
//     <>
//       {filteredProfiles.map((profile) => (
//         <li key={profile.id}>
//           이름: {profile.name}, 나이: {profile.age}
//           <button type="button" onClick={() => handleDelete(profile.id)}>
//             삭제
//           </button>
//           <button type="button" onClick={() => handleIncreaseAge(profile.id)}>
//             나이 +1
//           </button>
//           <button
//             type="button"
//             onClick={() => handleDecreaseAge(profile.id)}
//             disabled={profile.age === 0}
//           >
//             나이 -1
//           </button>
//         </li>
//       ))}
//     </>
//   );
// }

function ProfileList() {
  const nextId = useRef(4);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
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
            <li key={profile.id}>
              이름: {profile.name}, 나이: {profile.age}
              <button type="button" onClick={() => handleDelete(profile.id)}>
                삭제
              </button>
              <button
                type="button"
                onClick={() => handleIncreaseAge(profile.id)}
              >
                나이 +1
              </button>
              <button
                type="button"
                onClick={() => handleDecreaseAge(profile.id)}
                disabled={profile.age === 0}
              >
                나이 -1
              </button>
            </li>
          ))}
          {/* <FilteredProfiles
            profiles={profiles}
            searchName={search}
            handleDelete={handleDelete}
            handleIncreaseAge={handleIncreaseAge}
            handleDecreaseAge={handleDecreaseAge}
          /> */}
        </ul>
      </form>
    </>
  );
}

export default ProfileList;
