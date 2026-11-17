import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type RequestStatus = "idle" | "loading" | "success" | "error";

export default function PostStatusPractice() {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });

  const postPost = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const item = {
      userId: 1,
      title: formState.title,
      body: formState.body,
    };

    try {
      setStatus("loading");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        },
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("HTTP 요청 실패");
      }
      setStatus("success");
      setFormState((prev) => ({ ...prev, body: "", title: "" }));
    } catch (error) {
      if (error instanceof Error) {
        setStatus("error");
        console.error(error);
      }
    } finally {
    }
  };

  return (
    <div className="border box-border rounded-md p-4 m-4 w-full max-w-3xl">
      <h4>새 게시글 작성</h4>
      <form onSubmit={postPost} className="border box-border rounded-md p-4">
        <div className="flex flex-col gap-1.5 mb-4">
          <label htmlFor="title" className="text-sm">
            제목
          </label>
          <input
            id="title"
            value={formState.title}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, title: e.target.value }))
            }
            className="p-1 rounded-sm border"
            placeholder="게시글 제목을 입력하세요."
          />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label htmlFor="body" className="text-sm">
            내용
          </label>
          <textarea
            id="body"
            value={formState.body}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, body: e.target.value }))
            }
            className="p-1 rounded-sm border resize-none h-20"
            placeholder="게시글 내용을 입력하세요."
          />
        </div>
        <button
          type="submit"
          className="flex justify-self-end p-1 rounded-sm border box-border enabled:hover:cursor-pointer whitespace-nowrap"
          disabled={
            formState.body.trim() === "" ||
            formState.title.trim() === "" ||
            status === "loading"
          }
        >
          {status === "loading" ? "등록 중..." : "게시글 등록"}
        </button>
      </form>
      {status === "success" ? (
        <p>
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: "rgb(99, 230, 190)" }}
          />{" "}
          게시글 등록에 성공했습니다.
        </p>
      ) : status === "error" ? (
        <p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ color: "rgb(255, 0, 0)" }}
          />{" "}
          게시글 등록에 실패했습니다.
        </p>
      ) : null}
    </div>
  );
}
