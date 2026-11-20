import { useState } from "react";
import type { PostList } from "../posts/PostType";
// import type { Post } from "./post.type";

export function useSearchPost() {
  //   const searchPostList: Post[] = [];
  const [search, setSearch] = useState({
    keyword: "",
    check: false,
  });

  function filteredPostList(postList: PostList[]) {
    if (search.check === true) {
      return postList.filter(
        (prev) =>
          prev.title.length >= 20 &&
          prev.title.toUpperCase().includes(search.keyword.toUpperCase()),
      );
    }

    return postList.filter((prev) =>
      prev.title.toUpperCase().includes(search.keyword.toUpperCase()),
    );
  }

  function searchReset() {
    setSearch({ keyword: "", check: false });
  }

  return { search, setSearch, filteredPostList, searchReset };
}
