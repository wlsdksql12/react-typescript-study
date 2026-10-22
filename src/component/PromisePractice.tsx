import { useState } from "react";

function getProducts(shouldSucceed: boolean): Promise<string[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(["사과", "바나나", "포도"]);
      } else {
        reject(new Error("상품 데이터를 불러오지 못했습니다."));
      }
    }, 2000);
  });
}

export default function PromisePractice() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoad = (shouldSucceed: boolean) => {
    console.log("1. 상품 요청 시작");
    console.log(loading);

    setProducts([]);
    setErrorMessage("");
    setLoading(true);
    console.log(loading);

    getProducts(shouldSucceed)
      .then((products) => {
        console.log("3. 요청 성공", products);
        const filteredProducts = products.filter((prev) => prev !== "바나나");

        return filteredProducts;
      })
      .then((filteredProduct) => {
        setProducts(filteredProduct);
      })
      .catch((error) => {
        console.error("3. 요청 실패", error);
        console.log(error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log("2. 요청 이후 코드 실행");
  };

  return (
    <>
      <ul className="">
        {loading ? (
          <li>상품을 불러오는 중입니다.</li>
        ) : errorMessage !== "" ? (
          <li>{errorMessage}</li>
        ) : products.length > 0 ? (
          products.map((item) => <li key={item}>{item}</li>)
        ) : (
          <li>상품 불러오기 버튼을 눌러주세요.</li>
        )}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={() => handleLoad(true)}
          disabled={loading}
        >
          상품 불러오기
        </button>
        <button
          type="button"
          onClick={() => handleLoad(true)}
          disabled={loading}
        >
          성공 테스트
        </button>

        <button
          type="button"
          onClick={() => handleLoad(false)}
          disabled={loading}
        >
          실패 테스트
        </button>
      </div>
    </>
  );
}
