import type { CartItemProps } from "../component/CartType";

interface CarItemListProps {
  item: CartItemProps;
  handleItemDecrease: (id: number) => void;
  handleItemIncrease: (id: number) => void;
  handleItemDelete: (id: number) => void;
}

export default function CartItemList({
  item,
  handleItemDecrease,
  handleItemIncrease,
  handleItemDelete,
}: CarItemListProps) {
  return (
    <li key={item.id} className="cart-item">
      <div className="cart-item-detail">
        <span>상품명: {item.name}</span>
        <span>수량: {item.quantity}개</span>
      </div>
      <div className="cart-item-bottons">
        <button
          type="button"
          aria-label="수량 증가 버튼"
          onClick={() => handleItemIncrease(item.id)}
          disabled={item.quantity === 99}
          className="cart-item-inc-button"
        >
          +
        </button>
        <button
          type="button"
          aria-label="수량 감소 버튼"
          onClick={() => handleItemDecrease(item.id)}
          disabled={item.quantity === 0}
          className="cart-item-dec-button"
        >
          -
        </button>
        <button
          type="button"
          aria-label="item 삭제 버튼"
          onClick={() => handleItemDelete(item.id)}
          className="cart-item-del-button"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
