import "../src/style/tailwind.css";
import { NavLink, Route, Routes } from "react-router";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/ProductDetail";
import PurchaseComplete from "./products/PurchaseComplete";
import ProductLayout from "./products/ProductLayout";
import PostManagerPractice from "./component/practice/PostManagerPractice";
import { usePostList } from "./component/practice/usePostList";
import { useState } from "react";
import PostDetailPractice from "./component/practice/PostDetailPractice";
import QueryPostCountPractic from "./component/practice/QueryPostCountPractice";
import QueryPostListPractice from "./component/practice/QueryPostListPractice";
import QueryPostCreatePractice from "./component/practice/QueryPostCreatePractice";
import QueryPostManagerPractice from "./component/practice/QueryPostManagerPractice";
import QueryPostPaginationPractice from "./component/practice/QueryPostPaginationPractice";

function Home() {
  return (
    <div className="w-fit rounded-lg bg-blue-100 p-4 text-blue-800">
      Tailwind CSS 적용 테스트
    </div>
  );
}

function About() {
  return <h1>소개 화면입니다.</h1>;
}

function StudyPage() {
  return (
    <>
      <h1>React Router 학습 중입니다.</h1>
    </>
  );
}

function NotFound() {
  return (
    <>
      <h1>Error 404</h1>
      <h3>요청한 페이지를 찾을 수 없습니다.</h3>
    </>
  );
}

function App() {
  // const { postList } = usePostList();
  const { postList, status, addPost, updatePostTitle, removePost } =
    usePostList();
  const [newPostId, setNewPostId] = useState(1001);

  return (
    <div>
      <nav className="flex gap-2.5 mb-2.5 flex-wrap">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          홈
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          소개
        </NavLink>
        <NavLink
          to="/study"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          React 학습
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          상품 목록
        </NavLink>
        <NavLink
          to="/post-manager"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          게시글 관리
        </NavLink>
        <NavLink
          to="/post-count"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          TanStack Query 연습
        </NavLink>
        <NavLink
          to="/queryPostList"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          Query 게시글 목록
        </NavLink>
        <NavLink
          to="/query-post-crate"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          Mutation 게시글 등록
        </NavLink>
        <NavLink
          to="query-post-manager"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          TanStack Query 게시글 관리
        </NavLink>
        <NavLink
          to="query-pagination"
          className={({ isActive }) =>
            `no-underline px-3 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2
          ${isActive ? "bg-[#2563eb] text-white" : "text-black hover:text-blue-500"}`
          }
        >
          게시글 목록(페이지네이션)
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/study" element={<StudyPage />} />

        <Route path="/products" element={<ProductLayout />}>
          <Route index element={<ProductList />} />
          <Route path=":productId" element={<ProductDetail />} />
        </Route>

        <Route path="/purchase-complete" element={<PurchaseComplete />} />
        <Route path="/post-manager">
          <Route
            index
            element={
              <PostManagerPractice
                postList={postList}
                status={status}
                addPost={addPost}
                updatePostTitle={updatePostTitle}
                removePost={removePost}
                newPostId={newPostId}
                setNewPostId={setNewPostId}
              />
            }
          />
          <Route
            path=":postId"
            element={<PostDetailPractice postList={postList} status={status} />}
          />
        </Route>

        <Route path="/post-count" element={<QueryPostCountPractic />} />
        <Route path="/queryPostList" element={<QueryPostListPractice />} />
        <Route path="/query-post-crate" element={<QueryPostCreatePractice />} />
        <Route
          path="/query-post-manager"
          element={<QueryPostManagerPractice />}
        />
        <Route
          path="/query-pagination"
          element={<QueryPostPaginationPractice />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
