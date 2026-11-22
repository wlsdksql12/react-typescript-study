import { Link, useParams } from "react-router";
import { products } from "./productData";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const product = products.find((prev) => prev.id === Number(productId));

  useEffect(() => {
    console.log("ProductDetail 마운트");

    return () => {
      console.log("ProductDetail 언마운트 시 정리");
    };
  }, []);

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
        </>
      ) : (
        <div className="flex justify-center items-center flex-col p-4 gap-1.5 text-red-500">
          <FontAwesomeIcon icon={faXmark} size="lg" />
          <span className="text-[18px]">존재하지 않는 상품입니다.</span>
        </div>
      )}
      <hr />
      <div className="flex gap-2 my-2">
        <button className="w-14 h-auto rounded-2xl border box-border">
          <Link
            to={`/products/${1}`}
            className="no-underline text-inherit whitespace-nowrap"
          >
            키보드
          </Link>
        </button>
        <button className="w-14 h-auto rounded-2xl border box-border">
          <Link
            to={`/products/${2}`}
            className="no-underline text-inherit whitespace-nowrap"
          >
            마우스
          </Link>
        </button>
        <button className="w-14 h-auto rounded-2xl border box-border">
          <Link
            to={`/products/${3}`}
            className="no-underline text-inherit whitespace-nowrap"
          >
            모니터
          </Link>
        </button>
      </div>

      <Link to="/products" className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faArrowLeft} size="xs" />
        상품 목록으로 돌아가기
      </Link>
    </div>
  );
}
