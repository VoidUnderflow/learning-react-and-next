import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageBased from "./pages/PageBased.tsx";
import InfiniteScroll from "./pages/InfiniteScroll.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
        children: [
            { path: "/pageBased", Component: PageBased },
            { path: "/infiniteScroll", Component: InfiniteScroll },
        ],
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
