import { persist, purge } from "./persist";
import axios from "axios";
import createStore from "zustand";

const api = import.meta.env.VITE_API_HOST;

const useAuthStore = createStore(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["isAuthenticated", "token"], // optional, will save everything if allowlist is undefined
      denylist: [], // optional, if allowlist set, denylist will be ignored
    },
    (set) => ({
      isAuthenticating: false,
      isAuthenticated: false,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0MTc1NTg0OCwiZXhwIjoxNjQxNzU1MDAwfQ.Ln9NfWjO_PId8yHhv6IhUZzveRvQ1AG7xOJfJL5qZJs",
      email: undefined,
      error: undefined,
      login: async ({ email, password }) => {
        set((state) => ({ isAuthenticating: true }));
        await axios
          .post(`${api}/citizen/logins`, {
            email,
            password,
          })
          .then((val) => {
            set((state) => ({
              isAuthenticated: true,
              isAuthenticating: false,
              token: val.data.data.token,
            }));
          })
          .catch((error) => {
            set((state) => ({
              isAuthenticated: false,
              isAuthenticating: false,
              error,
            }));
          });
      },
      register: async ({ email, password, nik, name }) => {
        set((state) => ({ isAuthenticating: true }));
        await axios
          .post(`${api}/citizen/registers`, {
            email,
            password,
            nik,
            name,
          })
          .then((val) => {
            set((state) => ({
              isAuthenticated: false,
              isAuthenticating: false,
              email: val.data.data.email,
            }));
          })
          .catch((error) => {
            set((state) => ({
              isAuthenticated: false,
              isAuthenticating: false,
              error,
            }));
          });
      },
      logout: async () => {
        set((state) => ({ isAuthenticated: false }));
      },
    })
  )
);

export default useAuthStore;
