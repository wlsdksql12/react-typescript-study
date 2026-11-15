import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./component/practice/TypeGuardPractice.ts";
import PostCreatePractice from "./component/practice/PostCreatePractice.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <BrowserRouter>
    {/* <App /> */}
    <PostCreatePractice />
  </BrowserRouter>,
);
