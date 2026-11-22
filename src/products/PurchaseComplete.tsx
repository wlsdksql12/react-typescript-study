import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function PurchaseComplete() {
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4 flex flex-col items-center gap-2">
      <FontAwesomeIcon
        icon={faCircleCheck}
        style={{ color: "rgb(99, 230, 190)" }}
        size="xl"
      />
      <span>구매가 완료되었습니다.</span>
      <span>상품 구매 처리가 성공했습니다.</span>
      <Link
        to="/products"
        className="border box-border w-50 h-auto whitespace-nowrap p-1 rounded-full text-center no-underline text-inherit"
      >
        상품 목록으로 돌아가기
      </Link>
    </div>
  );
}
