import { persist } from "./persist";

import axios from "axios";
import createStore from "zustand";

const api = import.meta.env.VITE_API_HOST;

const useAuthStore = createStore(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["isUserAuthenticated", "userToken"], // optional, will save everything if allowlist is undefined
      denylist: [], // optional, if allowlist set, denylist will be ignored
    },
    (set) => ({
      isAuthenticating: false,
      isUserAuthenticated: false,
      userToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0MTc1NTg0OCwiZXhwIjoxNjQxNzU1MDAwfQ.Ln9NfWjO_PId8yHhv6IhUZzveRvQ1AG7xOJfJL5qZJs",
      email: undefined,
      error: undefined,
      login: async (val) => {
        set(() => ({ isAuthenticating: true }));
        await axios
          .post(`${api}/citizen/logins`, {
            ...val,
          })
          .then((val) => {
            set(() => ({
              isAuthenticated: true,
              isAuthenticating: false,
              token: val.data.data.token,
            }));
          })
          .catch((error) => {
            set(() => ({
              isAuthenticated: false,
              isAuthenticating: false,
              error,
            }));
          });
      },
      register: async (val) => {
        set(() => ({ isAuthenticating: true }));
        await axios
          .post(`${api}/citizen/registers`, {
            ...val,
          })
          .then((val) => {
            set(() => ({
              isAuthenticated: false,
              isAuthenticating: false,
              email: val.data.data.email,
            }));
          })
          .catch((error) => {
            set(() => ({
              isAuthenticated: false,
              isAuthenticating: false,
              error,
            }));
          });
      },
      logout: async () => {
        set(() => ({
          isAuthenticated: false,
          userToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0MTc1NTg0OCwiZXhwIjoxNjQxNzU1MDAwfQ.Ln9NfWjO_PId8yHhv6IhUZzveRvQ1AG7xOJfJL5qZJs",
        }));
      },
    })
  )
);

export default useAuthStore;
