import { NavLink, Outlet } from "react-router";

export default function ProductLayout() {
  return (
    <section>
      <h2>상품 관리 시스템</h2>

      <nav>
        <NavLink to="/products">상품 목록</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </section>
  );
}
