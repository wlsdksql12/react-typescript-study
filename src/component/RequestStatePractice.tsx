import { useState } from "react";

type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; count: number }
  | { status: "error"; message: string };

export default function RequestStatePractice() {
  const [request, setRequest] = useState<RequestState>({ status: "idle" });

  return (
    <>
      {request.status === "idle" ? (
        <p>조회를 시작해 주세요.</p>
      ) : request.status === "loading" ? (
        <p>데이터를 불러오는 중입니다.</p>
      ) : request.status === "success" ? (
        <p>{request.count}개 조회에 성공했습니다.</p>
      ) : request.status === "error" ? (
        <p>{request.message}</p>
      ) : (
        true
      )}
      <div>
        <button type="button" onClick={() => setRequest({ status: "idle" })}>
          초기화
        </button>
        <button type="button" onClick={() => setRequest({ status: "loading" })}>
          조회 시작
        </button>
        <button
          type="button"
          onClick={() => setRequest({ status: "success", count: 5 })}
        >
          조회 성공
        </button>
        <button
          type="button"
          onClick={() => setRequest({ status: "error", message: "서버 오류" })}
        >
          조회 실패
        </button>
      </div>
    </>
  );
}
