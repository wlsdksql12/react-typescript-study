import { useState } from "react";

type CouponStatus =
  | { status: "idle" }
  | { status: "success"; discount: number }
  | { status: "error"; message: string };

export default function CouponPractice() {
  const [couponStatus, setCouponStatus] = useState<CouponStatus>({
    status: "idle",
  });
  const [couponKeyword, setCouponKeyword] = useState("");
  const price = 50000;

  const handleApplyCoupon = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = couponKeyword.trim();

    if (data === "") return;

    if (data === "SAVE10") {
      return setCouponStatus({ status: "success", discount: 10 });
    }

    if (data === "SAVE20") {
      return setCouponStatus({ status: "success", discount: 20 });
    }

    return setCouponStatus({
      status: "error",
      message: "유효하지 않은 쿠폰입니다.",
    });
  };

  const handleCouponKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCouponStatus({ status: "idle" });
    setCouponKeyword(event.target.value);
  };

  const handleResetCoupon = () => {
    setCouponKeyword("");
    setCouponStatus({ status: "idle" });
  };

  return (
    <form
      onSubmit={handleApplyCoupon}
      className="border border-black rounded-md px-6 py-6 box-border w-full max-w-160"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="coupon">쿠폰 코드</label>
        <input
          value={couponKeyword}
          id="coupon"
          onChange={handleCouponKeyword}
          placeholder="쿠폰 코드를 입력해 주세요."
          className="rounded-md px-3 py-2.5 border"
        />
      </div>
      <div className="flex gap-2.5 my-2.5">
        <button
          type="submit"
          className="rounded-md border-0 bg-green-600 px-3 py-3 text-sm transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-green-400"
          disabled={couponKeyword.trim().length === 0}
        >
          쿠폰 적용
        </button>
        <button
          type="button"
          onClick={handleResetCoupon}
          className="rounded-md border-0 bg-amber-600 px-3 py-3 text-sm transition-all duration-200 enabled:hover:scale-105 enabled:hover:bg-amber-400"
          disabled={couponKeyword === "" && couponStatus.status === "idle"}
        >
          초기화
        </button>
      </div>
      <div>
        {couponStatus.status === "idle" ? (
          <span>쿠폰 적용 결과가 여기에 표시됩니다.</span>
        ) : couponStatus.status === "error" ? (
          <span>{couponStatus.message}</span>
        ) : (
          <>
            <p>{couponStatus.discount}% 할인이 적용되었습니다.</p>
            <p>상품 가격: {price.toLocaleString("ko-KR")}원</p>
            <p>
              최종 결제 금액:{" "}
              {(price * (1 - couponStatus.discount / 100)).toLocaleString(
                "ko-KR",
              )}
              원
            </p>
          </>
        )}
      </div>
    </form>
  );
}
