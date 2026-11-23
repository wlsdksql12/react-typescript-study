import { Link, useParams } from "react-router";
import type { Post } from "./post.type";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PostDetailPracticeProp {
  postList: Post[];
}

export default function PostDetailPractice({
  postList,
}: PostDetailPracticeProp) {
  const { postId } = useParams();
  const post = postList.find((prev) => prev.id === Number(postId));
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <header className="flex justify-between items-center">
        <span className="font-semibold">게시글 상세 정보</span>
        <span className="text-sm">ID: {postId}</span>
      </header>
      <hr />
      {post === undefined ? (
        <p className="text-center text-red-500 p-4">
          존재하지 않는 게시글입니다.
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="title">
            제목
          </label>
          <span id="title" className="font-semibold">
            {post?.title}
          </span>
          <label className="text-sm" htmlFor="body">
            내용
          </label>
          <span id="body" className="wrap-anywhere">
            {post?.body}
          </span>
        </div>
      )}
      <hr />
      <Link to="/post-manager" className="no-underline">
        <FontAwesomeIcon icon={faArrowLeft} size="sm" /> 게시글 목록으로
        돌아가기
      </Link>
    </div>
  );
}
