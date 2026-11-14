interface ProductInfoProps {
  filterdProduct: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductInfo({ filterdProduct }: ProductInfoProps) {
  return (
    <div>
      <label className="mb-2">상품 정보</label>
      {filterdProduct.length === 0 ? (
        <p className="flex justify-center items-center w-full">
          선택된 상품이 없습니다.
        </p>
      ) : (
        filterdProduct.map((prev) => (
          <div key={prev.id}>
            <div className="flex justify-between mb-2">
              <span>상품명</span>
              <span>{prev.name}</span>
            </div>
            <div className="flex justify-between">
              <span>가격</span>
              <span>{prev.price.toLocaleString("ko-KR")}원</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
