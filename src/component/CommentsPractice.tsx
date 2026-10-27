import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import type { PostList } from "./CommentType";

function isPostListItem(value: unknown): value is PostList {
  if (typeof value !== "object" || value === null) return false;

  return (
    "postId" in value &&
    "id" in value &&
    "name" in value &&
    "email" in value &&
    "body" in value &&
    typeof value.postId === "number" &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.body === "string"
  );
}

function isPostListArray(value: unknown): value is PostList[] {
  return Array.isArray(value) && value.every(isPostListItem);
}

function parsePostList(data: unknown): PostList[] {
  if (!isPostListArray(data)) {
    throw new Error("올바르지 않은 댓글 데이터입니다.");
  }
  return data;
}

async function fetchComments(
  postId: number,
  signal: AbortSignal,
): Promise<PostList[]> {
  const url =
    postId === -1
      ? "https://jsonplaceholder.typicode.com/posts/101"
      : postId === -2
        ? "https://jsonplaceholder.typicode.com/posts/1"
        : `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("HTTP 요청 실패");
  }

  // 데이터 타입 검증을 위해 unknown 타입으로 받음
  const result: unknown = await response.json();

  return parsePostList(result);
}

export default function CommentsPractice() {
  const [postId, setPostId] = useState(1);
  const [postList, setPostList] = useState<PostList[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [commentSelect, setCommentSelect] = useState<number[]>([]);
  const [selectCheck, setSelectCheck] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getPostList() {
      try {
        setPostList([]);
        setErrorMessage("");
        setLoading(true);

        const postList = await fetchComments(postId, controller.signal);

        if (!controller.signal.aborted) {
          setPostList(postList);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getPostList();

    return () => {
      controller.abort();
    };
  }, [postId, refresh]);

  const normalizedKeyword = searchKeyword.trim().toLowerCase();

  const searchKeywordList = postList.filter(
    (prev) =>
      prev.body.toLowerCase().includes(normalizedKeyword) ||
      prev.name.toLowerCase().includes(normalizedKeyword),
  );

  const filteredCommentList = selectCheck
    ? searchKeywordList.filter((prev) => commentSelect.includes(prev.id))
    : searchKeywordList;

  const onToggleSelect = (value: number) => {
    setCommentSelect((prev) => {
      if (prev.some((item) => item === value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };

  const handleSelectListAllCancel = () => {
    setCommentSelect([]);
  };

  const selectedPosts = postList.filter((prev) =>
    commentSelect.includes(prev.id),
  );

  const handleSelectListCancel = () => {
    if (selectedPosts.length === 0) return;

    setCommentSelect((prev) =>
      prev.filter((item) => !selectedPosts.some((post) => post.id === item)),
    );
  };

  const handleSelectAllList = () => {
    setCommentSelect((prev) => {
      const newIds = postList
        .filter((post) => !prev.includes(post.id))
        .map((post) => post.id);

      return [...prev, ...newIds];
    });
  };

  console.log(commentSelect);
  return (
    <div className="comment-container">
      <div className="comment-search-area">
        <span className="comment-select-all-count">
          선택한 댓글의 총 개수 : {commentSelect.length}개
        </span>
        <div className="comment-search-content">
          <label htmlFor="comment-search">댓글 검색</label>
          <span>현재 게시글 선택 개수 : {selectedPosts.length}개</span>
        </div>

        <div className="comment-input">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력해 주세요."
            className="comment-search"
            id="comment-search"
          />
          <label>
            <input
              type="checkbox"
              checked={selectCheck}
              onChange={(e) => setSelectCheck(e.target.checked)}
            />
            선택한 댓글만 보기
          </label>
        </div>
        <div className="comment-select-buttons">
          <button
            type="button"
            className="select-all-check"
            onClick={handleSelectAllList}
            disabled={
              postList.length === 0 ||
              loading ||
              selectedPosts.length === postList.length
            }
          >
            현재 게시글 댓글 전체 선택
          </button>
        </div>
        <div className="comment-select-cancel-buttons">
          <button
            type="button"
            className="select-check-cancel"
            onClick={handleSelectListCancel}
            disabled={selectedPosts.length === 0 || loading}
          >
            현재 게시글 선택 해제
          </button>
          <button
            type="button"
            className="select-all-check-cancel"
            onClick={handleSelectListAllCancel}
            disabled={commentSelect.length === 0 || loading}
          >
            선택한 댓글 전체 해제
          </button>
        </div>
      </div>
      <ul className="comment-item-container">
        {loading ? (
          <li>댓글을 불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : postList.length === 0 ? (
          <li>등록된 댓글이 없습니다.</li>
        ) : searchKeywordList.length === 0 ? (
          <li>검색 결과가 없습니다.</li>
        ) : selectCheck && filteredCommentList.length === 0 ? (
          <li>선택한 댓글이 없습니다.</li>
        ) : (
          filteredCommentList.map((prev) => (
            <CommentItem
              key={prev.id}
              prev={prev}
              isSelected={commentSelect.some((item) => item === prev.id)}
              onToggleSelect={onToggleSelect}
            />
          ))
        )}
      </ul>
      <div className="comment-buttons">
        <button
          type="button"
          onClick={() => setPostId(1)}
          disabled={loading}
          className="comment-button-1"
        >
          게시글 1
        </button>
        <button
          type="button"
          onClick={() => setPostId(2)}
          disabled={loading}
          className="comment-button-2"
        >
          게시글 2
        </button>
        <button
          type="button"
          onClick={() => setPostId(3)}
          disabled={loading}
          className="comment-button-3"
        >
          게시글 3
        </button>
        <button
          type="button"
          onClick={() => setPostId(500)}
          disabled={loading}
          className="comment-button-500"
        >
          게시글 500
        </button>
        <button
          type="button"
          onClick={() => setPostId(-1)}
          disabled={loading}
          className="comment-button--1"
        >
          게시글 -1
        </button>
        <button
          type="button"
          onClick={() => setPostId(-2)}
          disabled={loading}
          className="comment-button--2"
        >
          게시글 -2
        </button>
        <button
          type="button"
          onClick={() => setRefresh((prev) => !prev)}
          disabled={loading}
          className="comment-button-refresh"
        >
          새로 고침
        </button>
      </div>
    </div>
  );
}
