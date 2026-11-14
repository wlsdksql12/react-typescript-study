interface ProductInfoProps {
  selectedProduct: Product | undefined;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductInfo({ selectedProduct }: ProductInfoProps) {
  return (
    <div>
      <label className="mb-2">상품 정보</label>
      {selectedProduct === undefined ? (
        <p className="flex justify-center items-center w-full">
          선택된 상품이 없습니다.
        </p>
      ) : (
        <div key={selectedProduct.id}>
          <div className="flex justify-between mb-2">
            <span>상품명</span>
            <span>{selectedProduct.name}</span>
          </div>
          <div className="flex justify-between">
            <span>가격</span>
            <span>{selectedProduct.price.toLocaleString("ko-KR")}원</span>
          </div>
        </div>
      )}
    </div>
  );
}
