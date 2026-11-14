import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer } from "react";

type OrderState = {
  qty: number;
  delivery: string;
  giftWrap: boolean;
};

type OrderAction =
  | { type: "increase" }
  | { type: "decrease" }
  | { type: "reset" }
  | { type: "changeDelivery"; delivery: "일반 배송" | "빠른 배송" }
  | { type: "changeGiftWrap"; giftWrap: true | false };

function OrderInformation(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "increase":
      return { ...state, qty: Math.min(5, state.qty + 1) };

    case "decrease":
      return { ...state, qty: Math.max(1, state.qty - 1) };

    case "reset":
      return { qty: 1, delivery: "일반 배송", giftWrap: false };

    case "changeDelivery":
      return { ...state, delivery: action.delivery };

    case "changeGiftWrap":
      return { ...state, giftWrap: !action.giftWrap };

    default: {
      const remaining: never = action;
      return remaining;
    }
  }
}

export default function OrderReducerPractice() {
  const [order, dispath] = useReducer(OrderInformation, {
    qty: 1,
    delivery: "일반 배송",
    giftWrap: false,
  });
  const productTotal = order.qty * 12000;
  const deliveryFee = order.delivery === "빠른 배송" ? 3000 : 0;
  const giftWrap = order.giftWrap === true ? 1000 : 0;
  const totalPrice = productTotal + deliveryFee + giftWrap;

  return (
    <div className="border border-black rounded-md box-border px-6 py-6 w-full max-w-170">
      <p className="text-lg">주문 정보</p>
      <div className="flex justify-between">
        <span>주문 수량</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => dispath({ type: "decrease" })}
            disabled={order.qty === 1}
            className="px-2 py-1"
          >
            ─
          </button>
          <span> {order.qty} </span>
          <button
            type="button"
            onClick={() => dispath({ type: "increase" })}
            disabled={order.qty === 5}
            className="px-2 py-1"
          >
            +
          </button>
        </div>
      </div>
      <hr />
      <div>
        <p>배송 방법</p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              dispath({ type: "changeDelivery", delivery: "일반 배송" })
            }
            className="flex flex-col px-20 py-3 w-1/2 rounded-md border enabled:hover:cursor-pointer disabled:border-green-400"
            disabled={order.delivery === "일반 배송"}
          >
            <span>일반 배송</span>
            <span>0원{order.delivery === "일반 배송" ? " · 선택됨" : ""}</span>
          </button>
          <button
            onClick={() =>
              dispath({ type: "changeDelivery", delivery: "빠른 배송" })
            }
            className="flex flex-col px-20 py-3 w-1/2 rounded-md border enabled:hover:cursor-pointer disabled:border-green-400"
            disabled={order.delivery === "빠른 배송"}
          >
            <span>빠른 배송</span>
            <span>
              3000원{order.delivery === "빠른 배송" ? " · 선택됨" : ""}
            </span>
          </button>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>선물 포장</span>
          <span className="text-sm">추가 비용 1,000원</span>
        </div>
        <button
          className="rounded-md border"
          onClick={() =>
            dispath({ type: "changeGiftWrap", giftWrap: order.giftWrap })
          }
        >
          <FontAwesomeIcon icon={faGift} />
          {order.giftWrap === true ? " 포장 해제" : " 포장"}
        </button>
      </div>
      {order.giftWrap === true ? (
        <span className="text-xs text-green-500">
          선물 포징이 선택되어 있습니다.
        </span>
      ) : (
        ""
      )}
      <hr />
      <div className="flex flex-col">
        <div className="flex flex-col mb-3.5">
          <span>상품 금액</span>
          <span>{`${productTotal.toLocaleString("ko-KR")}원`}</span>
        </div>
        <div className="flex flex-col mb-2.5">
          <span>배송비</span>
          <span>{`${deliveryFee.toLocaleString("ko-KR")}원`}</span>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <span>총 결제 금액</span>
        <span>{`${totalPrice.toLocaleString("ko-KR")}원`}</span>
      </div>
      <button
        className="w-full py-1.5 my-2.5 box-border rounded-md border enabled:hover:cursor-pointer"
        disabled={order.qty === 1 && order.delivery === "일반 배송"}
        onClick={() => dispath({ type: "reset" })}
      >
        초기화
      </button>
    </div>
  );
}
