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
  const a: unknown = ["사과", "바나나", " "];
  const b: unknown = ["Recat", "TypeScript"];
  const c: unknown = ["사과", 10];
  const d: unknown = null;
  const e: unknown = [];

  const f: unknown = [" ", " React ", "TypeScript"];
  const g: unknown = ["", " ", "JavaScript"];
  const h: unknown = [" ", ""];
  const i: unknown = [];
  const j: unknown = ["React", 10];
  const k: unknown = null;
}

TypeGuard();
