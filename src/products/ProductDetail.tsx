import { Link, useParams } from "react-router";
import { products } from "./productData";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((prev) => prev.id === Number(productId));
  console.log(product);
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>상품 상세 정보</h4>
      <hr />
      {product !== undefined ? (
        <>
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-semibold">{product?.name}</span>
            <span className="text-sm">ID: {product?.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>상품 가격</span>
            <span className="font-semibold">
              {product?.price.toLocaleString("ko-KR")}원
            </span>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col p-4 gap-1.5 text-red-500">
          <FontAwesomeIcon icon={faXmark} size="lg" />
          <span className="text-[18px]">존재하지 않는 상품입니다.</span>
        </div>
      )}
      <hr />
      <Link to="/products" className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faArrowLeft} size="xs" />
        상품 목록으로 돌아가기
      </Link>
    </div>
  );
}
