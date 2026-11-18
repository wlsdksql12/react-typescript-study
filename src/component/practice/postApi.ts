export async function fetchPosts(signal: AbortSignal): Promise<unknown> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    {
      signal: signal,
    },
  );

  if (!response.ok) {
    throw new Error("GET HTTP 요청 실패");
  }

  const result: unknown = await response.json();

  return result;
}
