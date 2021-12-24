import { configurePersist } from "zustand-persist";
const { persist, purge } = configurePersist({
  storage: localStorage,
});
export { purge, persist };
