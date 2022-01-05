import axios from "axios";
import createStore from "zustand";

const api = import.meta.env.VITE_API_HOST;

const useCitizen = createStore((set) => ({
  isLoading: true,
  error: undefined,
  updateProfile: async ({ address, birthday }) => {
    set((state) => ({ isAuthenticating: true }));
    await axios
      .put(`${api}/citizen`, {
        address,
        birthday,
      })
      .then((val) => {
        set((state) => ({
          isAuthenticated: true,
          isLoading: false,
          token: val.data.data.token,
        }));
      })
      .catch((error) => {
        set((state) => ({
          isLoading: false,
          error,
        }));
      });
  },
}));

export default useCitizen;
