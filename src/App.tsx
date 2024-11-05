import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import CatalogPage from "./Pages/Catalog";
import ProfilePage from "./Pages/Profile";
import CartPage from "./Pages/Cart";
import HistoryPage from "./Pages/History";
import Layout from "./layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <SignupPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "orders/history",
        element: <HistoryPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
