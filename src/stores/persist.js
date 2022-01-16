import { configurePersist } from "zustand-persist";

const { persist, purge } = configurePersist({
  storage: localStorage,
});
export { persist,purge };
