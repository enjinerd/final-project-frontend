import Routes from "routes/Routes";
import { PersistGate } from "zustand-persist";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <PersistGate>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </PersistGate>
  );
}
