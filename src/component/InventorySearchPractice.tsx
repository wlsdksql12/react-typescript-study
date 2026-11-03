import { useEffect, useRef, useState } from "react";

type status =
  | { status: "idle" }
  | { status: "found"; name: string; stock: number }
  | { status: "error"; message: string }
  | { status: "loading" };

function getSearchResultText(result: status): string {
  switch (result.status) {
    case "idle":
      return "상품 이름을 입력해 주세요.";

    case "error":
      return result.message;

    case "found":
      return `${result.name} / 재고 ${result.stock}개 ${result.stock > 0 ? "(구매 가능)" : "(품절)"}`;

    case "loading":
      return "상품을 검색하고 있습니다.";

    default: {
      const remaining: never = result;
      return remaining;
    }
  }
}

function getSearchResultClassName(result: status): string {
  switch (result.status) {
    case "idle":
      return "text-gray-500";

    case "error":
      return "text-red-500";

    case "loading":
      return "text-blue-600";

    case "found":
      return result.stock > 0 ? "text-green-700" : "text-amber-600";

    default: {
      const remaining: never = result;
      return remaining;
    }
  }
}

export default function InventorySearchPractice() {
  const [productKeyword, setProductKeyword] = useState("");
  const [productsStatus, setProductsStatus] = useState<status>({
    status: "idle",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const products = [
    { name: "키보드", stock: 5 },
    { name: "마우스", stock: 0 },
    { name: "모니터", stock: 2 },
  ];

  const handleProductKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductsStatus({ status: "idle" });
    setProductKeyword(event.target.value);

    clearTimer();
  };

  const handleFoundProduct = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearTimer();

    const keyword = productKeyword.trim();
    if (keyword.length === 0) return;

    setProductsStatus({ status: "loading" });
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      const data = products.find((prev) => prev.name === keyword);

      if (data === undefined) {
        return setProductsStatus({
          status: "error",
          message: "상품을 찾을 수 없습니다.",
        });
      }

      return setProductsStatus({
        status: "found",
        name: data.name,
        stock: data.stock,
      });
    }, 5000);
  };

  const handleResetProduct = () => {
    setProductKeyword("");
    setProductsStatus({ status: "idle" });
    clearTimer();
  };

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <form
      onSubmit={handleFoundProduct}
      className="rounded-md border box-border border-black px-6 py-6 w-full max-w-160"
    >
      <div className="flex flex-col gap-2.5 mb-3">
        <label htmlFor="search" className="text-lg">
          상품 검색
        </label>
        <input
          id="search"
          value={productKeyword}
          onChange={handleProductKeyword}
          placeholder="상품 이름을 입력해 주세요."
          className="px-3 py-2.5"
        />
      </div>
      <div className="flex gap-2.5">
        <button
          type="submit"
          className="border-0 px-3.5 py-2 rounded-md transition-all enabled:hover:scale-105 duration-200 text-white bg-blue-600 enabled:hover:bg-blue-400 disabled:bg-gray-500"
          disabled={productKeyword.trim() === ""}
        >
          검색
        </button>
        <button
          type="button"
          onClick={handleResetProduct}
          className="border-0 px-3.5 py-2 rounded-md transition-all enabled:hover:scale-105 duration-200 text-white bg-amber-600 enabled:hover:bg-amber-400 disabled:bg-gray-500"
          disabled={productKeyword === "" && productsStatus.status === "idle"}
        >
          초기화
        </button>
      </div>
      <p className={getSearchResultClassName(productsStatus)}>
        {getSearchResultText(productsStatus)}
      </p>
    </form>
  );
}
