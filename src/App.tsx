import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import CatalogPage from "./Pages/Catalog";
import ProfilePage from "./Pages/Profile";
import CartPage from "./Pages/Cart";
import HistoryPage from "./Pages/History";
import Layout from "./layout";
import ProtectedRoute from "./components/Protected";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CatalogPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute redirectUrl="profile">
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "orders/history",
        element: (
          <ProtectedRoute redirectUrl="orders/history">
            <HistoryPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
