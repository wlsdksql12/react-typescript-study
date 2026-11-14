import { useState } from "react";
import CartItemList from "./CartItemList";
import type { CartItemProps } from "./CartType";

export default function CartPractice() {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([
    { id: 1, name: "사과", quantity: 2 },
    { id: 2, name: "바나나", quantity: 0 },
    { id: 3, name: "포도", quantity: 3 },
  ]);
  const [showCartItems, setShowCartItems] = useState("All");

  const handleItemIncrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleItemDecrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const handleItemDelete = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredCartItems =
    showCartItems === "Qty"
      ? cartItems.filter((item) => item.quantity > 0)
      : cartItems;

  // 수량이 1개 이상인 상품 종류 수
  const CartItemQty = cartItems.filter((item) => item.quantity > 0);
  return (
    <>
      <div className="cart-item-count">
        <span>전체 등록 상품 종류 수: {cartItems.length}개</span>
        <span>수량 있는 상품 종류 수: {CartItemQty.length}개</span>
      </div>
      <div className="cart-buttons">
        <button type="button" onClick={() => setShowCartItems("All")}>
          전체 보기
        </button>
        <button type="button" onClick={() => setShowCartItems("Qty")}>
          수량 있는 상품만 보기
        </button>
      </div>
      <div className="cart-items">
        <p className="cart-items-subtitle">
          {showCartItems === "All"
            ? "상품 보기 - 전체 보기"
            : "상품 보기 - 수량 있는 상품"}
        </p>
        <ul className="cart-items-content">
          {cartItems.length > 0 ? (
            filteredCartItems.length > 0 ? (
              filteredCartItems.map((prev) => (
                <CartItemList
                  key={prev.id}
                  item={prev}
                  handleItemIncrease={handleItemIncrease}
                  handleItemDecrease={handleItemDecrease}
                  handleItemDelete={handleItemDelete}
                />
              ))
            ) : (
              <li className="cart-item-not-qty">
                수량이 1개 이상인 상품이 없습니다.
              </li>
            )
          ) : (
            <li className="cart-not-item">등록된 상품이 없습니다.</li>
          )}
        </ul>
      </div>
    </>
  );
}
