import { useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

function getUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    const user = [
      { id: 1, name: "민수", age: 25 },
      { id: 2, name: "지수", age: 30 },
      { id: 3, name: "영희", age: 28 },
    ];

    const findUser = user.find((prev) => prev.id === id);

    setTimeout(() => {
      if (findUser) {
        resolve(findUser);
      } else {
        reject("사용자를 찾을 수 없습니다.");
      }
    }, 2000);
  });
}

export default function UserLookupPractice() {
  const [user, setUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function getUserById(id: number) {
    setUser(undefined);
    setErrorMessage("");
    setLoading(true);

    // getUser(id)
    //   .then((findUser) => {
    //     setUser(findUser);
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    try {
      const findUser = await getUser(id);
      setUser(findUser);
    } catch (error: unknown) {
      if (typeof error === "string") {
        setErrorMessage(error);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ul>
        {loading ? (
          <li>사용자 정보를 불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : user?.id !== undefined ? (
          <li>
            이름: {user?.name}, 나이: {user?.age}
          </li>
        ) : (
          <li>조회할 사용자를 선택해 주세요.</li>
        )}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={() => getUserById(1)} disabled={loading}>
          민수 조회
        </button>
        <button type="button" onClick={() => getUserById(2)} disabled={loading}>
          지수 조회
        </button>
        <button type="button" onClick={() => getUserById(3)} disabled={loading}>
          영희 조회
        </button>
        <button
          type="button"
          onClick={() => getUserById(99)}
          disabled={loading}
        >
          없는 사용자 조회
        </button>
      </div>
    </>
  );
}
