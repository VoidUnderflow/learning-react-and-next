import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Basics from "./pages/Basics.tsx";
import Experiments from "./pages/Experiments.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "basics", element: <Basics /> },
      { path: "experiments", element: <Experiments /> },
    ],
  },
]);

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
