import { useState } from "react";
import PostCreateForm from "./PostCreateForm";
import PostEditForm from "./PostEditForm";
import { fetchDeletePost, fetchPatchPost, fetchPostPost } from "./postApi";
import PostSummaryPractice from "./PostSummaryPractice";
import { useSearchPost } from "./useSearchPost";
import type { Post, Status } from "./post.type";
import { Link } from "react-router";

interface PostManagerPracticeProps {
  postList: Post[];
  newPostId: number;
  setNewPostId: React.Dispatch<React.SetStateAction<number>>;
  status: Status;
  addPost: (item: Post) => void;
  updatePostTitle: (id: number, title: string) => void;
  removePost: (id: number) => void;
}

export default function PostManagerPractice({
  postList,
  newPostId,
  setNewPostId,
  status,
  addPost,
  updatePostTitle,
  removePost,
}: PostManagerPracticeProps) {
  const { search, setSearch, filteredPostList, searchReset } = useSearchPost();

  const [id, setId] = useState<{ editId: number | null; delId: number | null }>(
    {
      editId: null,
      delId: null,
    },
  );

  const [error, setError] = useState({
    editErrorMessage: "",
    delErrorMessage: "",
  });
  const [loading, setLoading] = useState({
    editLoading: false,
    delLoading: false,
  });
  const [draftTitle, setDraftTitle] = useState("");

  function handleCreate(data: { title: string; body: string }) {
    const item = {
      userId: 1,
      id: newPostId,
      title: data.title,
      body: data.body,
    };

    const postPost = async () => {
      try {
        await fetchPostPost(item);

        addPost(item);
        setNewPostId((prev) => prev + 1);

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
        return false;
      } finally {
      }
    };

    return postPost();
  }

  const handlePostPatch = async () => {
    if (id.editId === null) return;
    try {
      setLoading((prev) => ({ ...prev, editLoading: true }));
      setError((prev) => ({ ...prev, editErrorMessage: "" }));

      await fetchPatchPost(id.editId, draftTitle);

      updatePostTitle(id.editId, draftTitle.trim());
      setId((prev) => ({ ...prev, editId: null }));
    } catch (error) {
      setError((prev) => ({
        ...prev,
        editErrorMessage: "게시글 제목 수정에 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, editLoading: false }));
    }
  };

  const handlePostDel = async (data: number) => {
    setId((prev) => ({ ...prev, delId: data }));
    try {
      setLoading((prev) => ({ ...prev, delLoading: true }));
      setError((prev) => ({ ...prev, delErrorMessage: "" }));

      await fetchDeletePost(data);

      removePost(data);
    } catch (error) {
      console.error(error);
      setError((prev) => ({
        ...prev,
        delErrorMessage: "게시글 삭제를 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, delLoading: false }));
      setId((prev) => ({ ...prev, delId: null }));
    }
  };

  const searchPostList = filteredPostList(postList);

  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>게시글 관리</h4>
      <PostCreateForm onCreate={handleCreate} />
      <h4>게시글 검색</h4>
      <div className="border box-border rounded-md p-4">
        <div className="flex flex-col gap-1.5 mb-2.5">
          <label className="text-sm" htmlFor="searchTitle">
            게시글 제목 검색
          </label>
          <input
            id="searchTitle"
            value={search.keyword}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, keyword: e.target.value }))
            }
            className="p-1"
            placeholder="검색어를 입력하세요."
          />
          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              checked={search.check}
              onChange={(e) =>
                setSearch((prev) => ({ ...prev, check: e.target.checked }))
              }
              className="rounded-4xl"
            />
            제목이 20글자 이상인 게시글만 보기
          </label>
        </div>
        <div className="flex justify-between">
          <span>검색 결과: {searchPostList.length}개</span>
          <button
            type="button"
            onClick={searchReset}
            disabled={search.keyword === "" && !search.check}
          >
            검색 초기화
          </button>
        </div>
      </div>
      <h4>게시글 목록</h4>
      {error.delErrorMessage !== "" ? (
        <p className="text-sm text-red-500">{error.delErrorMessage}</p>
      ) : null}
      <ul className="list-none pl-0">
        {status === "loading" ? (
          <li>게시글을 불러오는중...</li>
        ) : status === "success" ? (
          postList.length === 0 ? (
            <li>등록된 게시글이 없습니다.</li>
          ) : searchPostList.length === 0 ? (
            <li>검색 결과가 없습니다.</li>
          ) : (
            searchPostList.map((prev) => (
              <li
                key={prev.id}
                className="border box-border rounded-md p-1.5 mb-4"
              >
                <Link
                  to={`/post-manager/${prev.id}`}
                  className="no-underline text-inherit"
                >
                  {id.editId !== prev.id ? (
                    <div className="flex justify-between">
                      <span className="font-semibold">{prev.title}</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            (setId((item) => ({ ...item, editId: prev.id })),
                              setDraftTitle(""));
                          }}
                          disabled={loading.editLoading || loading.delLoading}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePostDel(prev.id)}
                          disabled={loading.editLoading || loading.delLoading}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ) : (
                    <PostEditForm
                      setEditId={(item) =>
                        setId((prev) => ({ ...prev, editId: item }))
                      }
                      editErrorMessage={error.editErrorMessage}
                      editLoading={loading.editLoading}
                      draftTitle={draftTitle}
                      setDraftTitle={setDraftTitle}
                      handlePostPatch={handlePostPatch}
                      delLoading={loading.delLoading}
                    />
                  )}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs">ID: {prev.id}</span>
                    <span className="wrap-anywhere">{prev.body}</span>
                  </div>
                </Link>
              </li>
            ))
          )
        ) : status === "error" ? (
          <li>게시글을 불러오지 못했습니다.</li>
        ) : null}
      </ul>
      <hr />
      <PostSummaryPractice postList={postList} status={status} />
    </div>
  );
}
