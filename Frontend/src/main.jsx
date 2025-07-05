import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./routes/AuthLayout";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import DynamicAccount from "./routes/DynamicAccount";
import TransactionCreate from "./routes/TransactionCreate";
import DashboardLayout from "./routes/DashboardLayout";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/sign-in",
        element: <AuthLayout />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/account/:id",
        element: (
          <ProtectedRoute>
            <DynamicAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: "/transaction/create",
        element: (
          <ProtectedRoute>
            <TransactionCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </ClerkProvider>
);
