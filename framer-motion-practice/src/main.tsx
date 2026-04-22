import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Basics from "./pages/Basics.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [{ path: "basics", element: <Basics /> }],
  },
]);

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
