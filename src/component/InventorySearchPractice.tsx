import { useState } from "react";

type status =
  | { status: "idle" }
  | { status: "found"; name: string; stock: number }
  | { status: "error"; message: string };

export default function InventorySearchPractice() {
  const [productKeyword, setProductKeyword] = useState("");
  const [productsStatus, setProductsStatus] = useState<status>({
    status: "idle",
  });
  const products = [
    { name: "키보드", stock: 5 },
    { name: "마우스", stock: 0 },
    { name: "모니터", stock: 2 },
  ];

  const handleProductKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductsStatus({ status: "idle" });
    setProductKeyword(event.target.value);
  };

  const handleFoundProduct = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const keyword = productKeyword.trim();
    if (keyword.length === 0) return;

    const data = products.find((prev) => prev.name === productKeyword);

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
  };

  const handleResetProduct = () => {
    setProductKeyword("");
    setProductsStatus({ status: "idle" });
  };

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
      {productsStatus.status === "idle" ? (
        <p>상품 이름을 입력해 주세요.</p>
      ) : productsStatus.status === "error" ? (
        <p>{productsStatus.message}</p>
      ) : (
        <p>
          {productsStatus.name} / {productsStatus.stock}개
        </p>
      )}
    </form>
  );
}
