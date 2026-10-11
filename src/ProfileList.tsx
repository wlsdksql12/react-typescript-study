import { useRef, useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
}

function ProfileList() {
  const nextId = useRef(4);
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: "성진", age: 29 },
    { id: 2, name: "민수", age: 30 },
    { id: 3, name: "지수", age: 27 },
  ]);

  const onClick = () => {
    const newProfile: Profile = {
      id: nextId.current,
      name: "영희",
      age: 25,
    };

    nextId.current += 1;

    setProfiles((prev) => [...prev, newProfile]);
  };
  const handleDelete = (id: number) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };
  const handleIncreaseAge = (id: number) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id ? { ...profile, age: profile.age + 1 } : profile,
      ),
    );
  };
  const handleAllAge = () => {
    // setProfiles((prev) =>
    //   prev.map((profile) => ({ ...profile, age: profile.age + 1 })),
    // );
    setProfiles((prev) =>
      prev.map((profile) => {
        return { ...profile, age: profile.age + 1 };
      }),
    );
  };
  return (
    <>
      <div>
        {profiles.length !== 0
          ? `등록된 사람: ${profiles.length}명`
          : "등록된 사람이 없습니다."}
      </div>
      <button type="button" onClick={onClick}>
        사람 추가
      </button>
      <button
        type="button"
        onClick={handleAllAge}
        disabled={profiles.length === 0}
      >
        모두 나이 +1
      </button>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            이름: {profile.name}, 나이: {profile.age}
            <button type="button" onClick={() => handleDelete(profile.id)}>
              삭제
            </button>
            <button type="button" onClick={() => handleIncreaseAge(profile.id)}>
              나이 +1
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProfileList;
