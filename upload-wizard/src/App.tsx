import "./App.css";
import UploadWizard from "./UploadWizard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UploadWizard />
    </QueryClientProvider>
  );
}

export default App;
