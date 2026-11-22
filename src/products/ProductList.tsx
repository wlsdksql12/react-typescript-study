import { products } from "./productData";
import {
  faComputerMouse,
  faDisplay,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function ProductList() {
  const productList = products;
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const [productName, setProductName] = useState(keyword);
  const timer = useRef<number | null>(null);
  const filteredProductList = productList.filter((prev) =>
    prev.name.includes(keyword),
  );

  useEffect(() => {
    timer.current = setTimeout(() => {
      setSearchParams({ keyword: productName.trim() }, { replace: true });
      timer.current = null;
    }, 500);

    return () => {
      if (timer.current !== null) {
        console.log("timer 정리");
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [productName]);

  console.log(filteredProductList);
  return (
    <div className="border box-border rounded-md w-full max-w-3xl p-4">
      <h4>상품 목록</h4>
      <div className="flex items-center justify-center mb-2.5 gap-1.5">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="p-2 border box-border rounded-md w-full"
          placeholder="상품명을 입력하세요."
        />
        <button
          className="whitespace-nowrap w-auto h-auto rounded-full border box-border p-1 bg-white enabled:hover:cursor-pointer"
          onClick={() => setProductName("")}
        >
          초기화
        </button>
      </div>
      {filteredProductList.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        filteredProductList.map((prev) => (
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
        ))
      )}
    </div>
  );
}
