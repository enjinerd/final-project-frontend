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
          isLoading: false,
        }));
      })
      .catch((error) => {
        set((state) => ({
          isLoading: false,
          error,
        }));
      });
  },
  addFamily: async ({ name, birthday, age, nik, handphone, gender, token }) => {
    set((state) => ({ isAuthenticating: true }));
    await axios
      .post(
        `${api}/families`,
        {
          name,
          birthday,
          nik,
          age,
          gender,
          handphone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((val) => {
        set((state) => ({
          isLoading: false,
        }));
      })
      .catch((error) => {
        set((state) => ({
          isLoading: false,
          error,
        }));
      });
  },
  familyMember: async (token) => {
    set((state) => ({ isAuthenticating: true }));
    let data;
    await axios
      .get(`${api}/family/citizens`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((val) => {
        set((state) => ({
          isLoading: false,
        }));
        data = val.data.data;
      })
      .catch((error) => {
        set((state) => ({
          isLoading: false,
          error,
        }));
      });
    return data;
  },
}));

export default useCitizen;
