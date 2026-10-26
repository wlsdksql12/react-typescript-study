import type { PostList } from "./CommentType";

interface CommentItemProps {
  prev: PostList;
  commentSelect: number[];
  handleCommentSelectList: (isSelect: number) => void;
}

export default function CommentItem({
  prev,
  commentSelect,
  handleCommentSelectList,
}: CommentItemProps) {
  const isSelect = commentSelect.some((item) => item === prev.id);

  return (
    <>
      <li className="comment-item">
        <article className="comment-content">
          <p className="comment-item-name">
            <span>{prev.name}</span>
            <span>#{prev.id}</span>
          </p>
          <p className="comment-item-email">
            <span>{prev.email}</span>
            <button
              type="button"
              onClick={() => handleCommentSelectList(prev.id)}
            >
              {isSelect ? "선택 해제" : "선택"}
            </button>
          </p>
          <p className="comment-item-body">{prev.body}</p>
        </article>
      </li>
    </>
  );
}
