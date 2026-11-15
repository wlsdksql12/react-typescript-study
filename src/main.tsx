import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./component/practice/TypeGuardPractice.ts";
import PostListCreatePractice from "./component/practice/PostListCreatePractice.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <BrowserRouter>
    {/* <App /> */}
    <PostListCreatePractice />
  </BrowserRouter>,
);
