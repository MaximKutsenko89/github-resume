import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTER } from "./constants";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found-page";
import ResumePage from "./pages/resume";
import UserNotFound from "./pages/user-not-found";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path={ROUTER.HOME} />
          <Route element={<ResumePage />} path={"/resume/:username"} />
          <Route element={<NotFoundPage />} path="*" />
          <Route element={<UserNotFound />} path={ROUTER.USER_NOT_FOUND} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
