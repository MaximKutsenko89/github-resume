import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTER } from "./constants";
import HomePage from "./pages/home";
import ResumePage from "./pages/resume";
import UserNotFound from "./pages/user-not-found";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path={ROUTER.HOME} />
          <Route element={<ResumePage />} path={"/resume/:username"} />
          <Route element={<h1>404 page not found</h1>} path="*" />
          <Route element={<UserNotFound />} path={ROUTER.USER_NOT_FOUND} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
