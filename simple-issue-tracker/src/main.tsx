import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeroUIProvider } from "@heroui/system";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60000, refetchOnWindowFocus: false },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </HeroUIProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
