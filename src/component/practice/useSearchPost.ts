import { useState } from "react";
import type { Post } from "./post.type";

export function useSearchPost() {
  const [search, setSearch] = useState({
    keyword: "",
    check: false,
  });

  function filteredPostList(postList: Post[]) {
    if (search.check === true) {
      return postList.filter(
        (prev) =>
          prev.title.length >= 20 &&
          prev.title
            .toUpperCase()
            .includes(search.keyword.trim().toUpperCase()),
      );
    }

    return postList.filter((prev) =>
      prev.title.toUpperCase().includes(search.keyword.trim().toUpperCase()),
    );
  }

  function searchReset() {
    setSearch({ keyword: "", check: false });
  }

  return { search, setSearch, filteredPostList, searchReset };
}
