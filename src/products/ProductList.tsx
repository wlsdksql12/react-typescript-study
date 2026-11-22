import { products, type Product } from "./productData";
import {
  faComputerMouse,
  faDisplay,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function ProductList() {
  const productList = products;
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>상품 목록</h4>
      {productList.map((prev) => (
        <div
          key={prev.id}
          className="border box-border rounded-md flex justify-between items-center p-2 mb-2"
        >
          <div className="flex items-center gap-2.5">
            {prev.name === "키보드" ? (
              <FontAwesomeIcon icon={faKeyboard} className="text-2xl" />
            ) : prev.name === "마우스" ? (
              <FontAwesomeIcon icon={faComputerMouse} className="text-2xl" />
            ) : prev.name === "모니터" ? (
              <FontAwesomeIcon icon={faDisplay} className="text-2xl" />
            ) : null}
            <div className="flex flex-col text-[14px]">
              <span>{prev.name}</span>
              <span>{prev.price.toLocaleString("ko-KR")}원</span>
            </div>
          </div>
          <Link to={`/products/${prev.id}`}>상세보기</Link>
        </div>
      ))}
    </div>
  );
}
