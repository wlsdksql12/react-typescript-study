import { useState } from "react";
import ProductInfo from "./ProductInfo";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductSelectorPractice() {
  const [product, setProduct] = useState<Product[]>([
    { id: 1, name: "연필", price: 500 },
    { id: 2, name: "지우개", price: 800 },
    { id: 3, name: "노트", price: 2000 },
  ]);
  const [productId, setProductId] = useState(1);

  const filterdProduct = product.filter((prev) => prev.id === productId);

  return (
    <div className="border box-border w-full max-w-3xl rounded-md p-4">
      <label>상품 선택</label>
      <p>확인할 상품을 선택하세요.</p>
      <div className="grid grid-cols-3 mb-2">
        <button
          type="button"
          className="mr-1.5"
          onClick={() => setProductId(1)}
        >
          연필
        </button>
        <button
          type="button"
          className="mr-1.5"
          onClick={() => setProductId(2)}
        >
          지우개
        </button>
        <button type="button" onClick={() => setProductId(3)}>
          노트
        </button>
      </div>
      <button
        type="button"
        className="w-full mb-3.5"
        onClick={() => setProductId(0)}
      >
        선택 해제
      </button>
      <ProductInfo filterdProduct={filterdProduct} />
    </div>
  );
}
