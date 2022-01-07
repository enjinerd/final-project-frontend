import axios from "axios";
import createStore from "zustand";

const api = import.meta.env.VITE_API_HOST;

const useCitizen = createStore((set) => ({
  isLoading: true,
  error: undefined,
  updateProfile: async ({ address, birthday, token }) => {
    set((state) => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/citizens`,
        {
          address,
          birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
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
  addFamily: async ({ name, birthday, age, nik, phone, gender }) => {
    set((state) => ({ isAuthenticating: true }));
    await axios
      .put(`${api}/citizen`, {
        name,
        birthday,
        nik,
        age,
        gender,
        phone,
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
