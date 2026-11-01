function isStringArray(data: unknown): data is string[] {
  return Array.isArray(data) && data.every(isItem);
}

function isItem(data: unknown): data is string {
  return typeof data === "string";
}

function noralizeNames(data: unknown): string[] {
  if (!isStringArray(data)) {
    return [];
  }

  const name = data.map((prev) => prev.trim());

  return name.filter((prev) => prev !== "");
}

function getFirstKeyword(data: unknown): string {
  if (!isStringArray(data)) {
    return "잘못된 입력";
  }

  const item = data
    .map((prev) => prev.trim())
    .filter((prev) => prev !== "")
    .find((prev) => typeof prev === "string");

  return item ?? "검색어 없음";
}

export default function TypeGuard() {
  // const a: unknown = ["사과", "바나나", " "];
  // const b: unknown = ["Recat", "TypeScript"];
  // const c: unknown = ["사과", 10];
  // const d: unknown = null;
  // const e: unknown = [];

  // console.log(noralizeNames(a));
  // console.log(noralizeNames(b));
  // console.log(noralizeNames(c));
  // console.log(noralizeNames(d));
  // console.log(noralizeNames(e));

  const a: unknown = [" ", " React ", "TypeScript"];
  const b: unknown = ["", " ", "JavaScript"];
  const c: unknown = [" ", ""];
  const d: unknown = [];
  const e: unknown = ["React", 10];
  const f: unknown = null;

  console.log(getFirstKeyword(a));
  console.log(getFirstKeyword(b));
  console.log(getFirstKeyword(c));
  console.log(getFirstKeyword(d));
  console.log(getFirstKeyword(e));
  console.log(getFirstKeyword(f));
}

TypeGuard();
