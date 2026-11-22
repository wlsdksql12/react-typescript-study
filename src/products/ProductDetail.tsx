import { Link, useNavigate, useParams } from "react-router";
import { products } from "./productData";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const product = products.find((prev) => prev.id === Number(productId));

  useEffect(() => {
    setMessage("");

    return () => {};
  }, [count]);

  const handlePurchase = () => {
    if (count > 3) {
      return setMessage("재고가 부족합니다. 최대 3개까지 구매할 수 있습니다.");
    }

    return navigate("/purchase-complete", { replace: true });
  };

  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>상품 상세 정보</h4>
      <hr />
      {product !== undefined ? (
        <>
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-semibold">{product.name}</span>
            <span className="text-sm">ID: {product.id}</span>
          </div>
          <div className="flex justify-between items-center mb-1.5">
            <span>상품 가격</span>
            <span className="font-semibold">
              {product.price.toLocaleString("ko-KR")}원
            </span>
          </div>
          <div className="border box-border rounded-md flex justify-between items-center p-2">
            <span>구매 수량</span>
            <div className="flex gap-1.5">
              <button
                className="rounded-[50%] border box-border w-auto text-center bg-transparent text-[18px] enabled:hover:cursor-pointer"
                onClick={() => setCount((prev) => prev - 1)}
                disabled={count === 1}
              >
                -
              </button>
              <span>{count}</span>
              <button
                className="rounded-[50%] border box-border w-auto text-center bg-transparent text-[18px] enabled:hover:cursor-pointer"
                onClick={() => setCount((prev) => prev + 1)}
                disabled={count === 99}
              >
                +
              </button>
            </div>
          </div>
          <hr />
          <button
            className="w-full h-auto rounded-full border box-border p-1 bg-white enabled:hover:cursor-pointer"
            onClick={handlePurchase}
          >
            구매하기
          </button>
          {message === "" ? null : <p className="text-red-500 ">{message}</p>}
          <div className="flex gap-2 my-2">
            <Link
              to={`/products/${1}`}
              className="no-underline text-inherit whitespace-nowrap w-15 h-auto rounded-2xl border box-border text-center text-[14px]"
            >
              키보드
            </Link>
            <Link
              to={`/products/${2}`}
              className="no-underline text-inherit whitespace-nowrap w-15 h-auto rounded-2xl border box-border text-center text-[14px]"
            >
              마우스
            </Link>
            <Link
              to={`/products/${3}`}
              className="no-underline text-inherit whitespace-nowrap w-15 h-auto rounded-2xl border box-border text-center text-[14px]"
            >
              모니터
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center flex-col p-4 gap-1.5 text-red-500">
            <FontAwesomeIcon icon={faXmark} size="lg" />
            <span className="text-[18px]">존재하지 않는 상품입니다.</span>
          </div>
          <hr />
        </>
      )}

      <Link to="/products" className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faArrowLeft} size="xs" />
        상품 목록으로 돌아가기
      </Link>
    </div>
  );
}
