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

export default function TypeGuard() {
  const a: unknown = ["사과", "바나나", " "];
  const b: unknown = ["Recat", "TypeScript"];
  const c: unknown = ["사과", 10];
  const d: unknown = null;
  const e: unknown = [];

  console.log(noralizeNames(a));
  console.log(noralizeNames(b));
  console.log(noralizeNames(c));
  console.log(noralizeNames(d));
  console.log(noralizeNames(e));
}

TypeGuard();
