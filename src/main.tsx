import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./component/practice/TypeGuardPractice.ts";
import PostStatusPractice from "./component/practice/PostStatusPractice.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <BrowserRouter>
    {/* <App /> */}
    <PostStatusPractice />
  </BrowserRouter>,
);
