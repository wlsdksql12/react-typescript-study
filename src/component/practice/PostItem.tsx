interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostItemProps {
  post: Post;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setDraftTitle: React.Dispatch<React.SetStateAction<string>>;
  editId: number | null;
}

export default function PostItem({
  post,
  setEditId,
  setDraftTitle,
  editId,
}: PostItemProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-1.5 mt-2">
        <span className="font-semibold">{post.title}</span>
        <button
          type="button"
          className="rounded-3xl w-auto border box-border whitespace-nowrap enabled:hover:cursor-pointer"
          onClick={() => {
            setEditId(post.id);
            setDraftTitle(post.title);
          }}
          disabled={editId !== null}
        >
          수정
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-xs">ID:{post.id}</span>
        <span className="wrap-anywhere">{post.body}</span>
      </div>
    </>
  );
}
