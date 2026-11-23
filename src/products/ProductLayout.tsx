import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router";

export default function ProductLayout() {
  return (
    <div className="border box-border rounded-md max-w-3xl">
      <header className="mt-0 mb-4 rounded-t-md bg-[#384e72] text-[#FFFFFF] pl-2">
        <h2 className="mt-0">상품 관리 시스템</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] m-3 gap-3">
        <nav>
          <NavLink
            to="/products"
            className="no-underline w-full bg-[#1f3457] text-[#EDEDED] block p-1 border box-border rounded-md "
          >
            <FontAwesomeIcon icon={faBars} size="xs" /> 상품 목록
          </NavLink>
          <hr />
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
