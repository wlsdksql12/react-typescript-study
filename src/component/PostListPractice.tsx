import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { PostList } from "./PostType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons/faBookmark";

interface PostListPracticeProps {
  postList: PostList[] | null;
  setPostList: React.Dispatch<React.SetStateAction<PostList[] | null>>;
  postListSearch: string;
  setPostListSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredPostList: PostList[] | undefined;
  bookmark: number[];
  handleBookmark: (id: number) => void;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  isBookmark: boolean;
  BookmarkPostList: PostList[] | undefined;
}

function isPostList(data: unknown): data is PostList[] {
  return Array.isArray(data) && data.every(PostListItem);
}

function PostListItem(data: unknown): data is PostList {
  if (typeof data !== "object" || data === null) return false;

  return (
    "id" in data &&
    "userId" in data &&
    "title" in data &&
    "body" in data &&
    typeof data.id === "number" &&
    typeof data.userId === "number" &&
    typeof data.title === "string" &&
    typeof data.body === "string"
  );
}

export default function PostListPractice({
  postList,
  setPostList,
  postListSearch,
  setPostListSearch,
  filteredPostList,
  bookmark,
  handleBookmark,
  setIsBookmark,
  isBookmark,
  BookmarkPostList,
}: PostListPracticeProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  async function getPostList(id: number) {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setPostList(null);
    setErrorMessage("");
    setPostListSearch("");
    setLoading(true);
    inputRef.current?.focus();

    try {
      const url =
        id === -1
          ? "https://jsonplaceholder.typicode.com/posts/101"
          : `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

      const response = await fetch(url, {
        signal: controller.signal,
      });
      console.log(response);

      if (controller.signal.aborted) {
        throw new Error("API 요청을 취소했습니다.");
      }

      if (!response.ok) {
        throw new Error("조회에 실패했습니다.");
      }

      const postList: unknown = await response.json();

      if (!isPostList(postList)) {
        throw new Error("타입 검증에 실패했습니다.");
      }

      if (!controller.signal.aborted) {
        setPostList(postList);
      }
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      } else {
        console.error(error);
        setErrorMessage("게시글을 불러오는데 실패했습니다.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => {
      console.log("정리 함수 실행");
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <div className="post-container">
      <div className="post-title-header">
        <h3 className="post-title">게시글 목록</h3>
        <span>전체 게시글 수: {postList?.length ?? 0}개</span>
      </div>
      <div className="flex justify-between items-center my-2.5 ">
        <div className="flex gap-2">
          <button onClick={() => setIsBookmark(false)}>전체 보기</button>
          <button onClick={() => setIsBookmark(true)}>북마크만 보기</button>
        </div>
        <span>북마크 총 개수: {bookmark.length}개</span>
      </div>
      <div className="post-input-header">
        <input
          value={postListSearch}
          onChange={(e) => setPostListSearch(e.target.value)}
          placeholder="검색어를 입력해 주세요."
          className="post-input"
          ref={inputRef}
        />
        <span>검색 결과 수: {BookmarkPostList?.length ?? 0}개</span>
      </div>
      <ul className="post-ul">
        {loading ? (
          <li>불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : postList === null ? (
          <li>버튼을 눌러 사용자 게시글을 조회하세요.</li>
        ) : postList.length === 0 ? (
          <li>등록된 게시글이 없습니다.</li>
        ) : BookmarkPostList?.length === 0 ? (
          <li>
            {isBookmark
              ? postListSearch.trim() === ""
                ? "북마크한 게시글이 없습니다."
                : "조건에 맞는 게시글이 없습니다."
              : "검색 결과가 없습니다."}
          </li>
        ) : (
          BookmarkPostList?.map((item) => (
            <li
              key={item.id}
              className="box-border border flex justify-between items-center"
            >
              <Link className="block px-3 py-4 w-9/12" to={`/posts/${item.id}`}>
                {item.title}
              </Link>
              <button
                className="border-transparent bg-transparent"
                onClick={() => handleBookmark(item.id)}
              >
                {bookmark.includes(item.id) ? (
                  <FontAwesomeIcon icon={faBookmarkSolid} className="text-lg" />
                ) : (
                  <FontAwesomeIcon
                    icon={faBookmarkRegular}
                    className="text-lg"
                  />
                )}
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          className="rounded-md border-0 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 hover:scale-105 duration-200 focus-visible:outline-2 focus-visible:outline-blue-800"
          onClick={() => getPostList(1)}
        >
          사용자 1 게시글
        </button>
        <button type="button" onClick={() => getPostList(2)}>
          사용자 2 게시글
        </button>
        <button type="button" onClick={() => getPostList(99)}>
          사용자 99 게시글
        </button>
        <button type="button" onClick={() => getPostList(-1)}>
          없는 사용자 게시글
        </button>
      </div>
    </div>
  );
}
