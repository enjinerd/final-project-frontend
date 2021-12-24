import Routes from "routes/Routes";
import { PersistGate } from "zustand-persist";

export default function App() {
  return (
    <PersistGate>
      <Routes />
    </PersistGate>
  );
}
