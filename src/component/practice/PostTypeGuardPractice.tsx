export default function PostTypeGuardPractice() {
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  function isPost(value: unknown): value is Post {
    if (typeof value !== "object" || value === null || Array.isArray(value))
      return false;

    return (
      "userId" in value &&
      "id" in value &&
      "title" in value &&
      "body" in value &&
      typeof value.userId === "number" &&
      typeof value.id === "number" &&
      typeof value.title === "string" &&
      typeof value.body === "string"
    );
  }

  const dataA: unknown = {
    userId: 1,
    id: 10,
    title: "React 공부",
    body: "타입 가드 연습",
  };

  const dataB: unknown = {
    userId: 1,
    id: "10",
    title: "React 공부",
    body: "타입 가드 연습",
  };

  const dataC: unknown = {
    userId: 1,
    id: 10,
    title: "React 공부",
  };

  console.log(isPost(dataA)); // true
  console.log(isPost(dataB)); // false
  console.log(isPost(dataC)); // false
  console.log(isPost(null)); // false
  console.log(isPost([])); // false

  return null;
}
