import axios from "axios";
import createStore from "zustand";

const api = import.meta.env.VITE_API_HOST;

const useCitizen = createStore((set) => ({
  isLoading: true,
  error: undefined,
  userProfile: async (token) => {
    let data;
    await axios
      .get(`${api}/citizen/profiles`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((val) => {
        set(() => ({
          isLoading: false,
        }));
        data = val.data.data;
      })
      .catch((error) => {
        set(() => ({
          isLoading: false,
          error,
        }));
      });
    return data;
  },
  updateProfile: async (val, token) => {
    await axios
      .put(
        `${api}/citizens`,
        {
          ...val,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        set(() => ({
          isLoading: false,
        }));
      })
      .catch((error) => {
        set(() => ({
          isLoading: false,
          error,
        }));
      });
  },
  addFamily: async (val, token) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .post(
        `${api}/families`,
        {
          ...val,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        set(() => ({
          isLoading: false,
        }));
      })
      .catch((error) => {
        set(() => ({
          isLoading: false,
          error,
        }));
      });
  },
  familyMember: async (token) => {
    let data;
    await axios
      .get(`${api}/family/citizens`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((val) => {
        set(() => ({
          isLoading: false,
        }));
        data = val.data.data;
      })
      .catch((error) => {
        set(() => ({
          isLoading: false,
          error,
        }));
      });
    return data;
  },
  updateFamilyMember: async (val, id, token) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/families/${id}`,
        {
          ...val,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        set(() => ({
          isLoading: false,
        }));
      })
      .catch((error) => {
        set(() => ({
          isLoading: false,
          error,
        }));
      });
  },
  deleteFamily: async (id, token) => {
    await axios
      .delete(`${api}/families/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        set(() => ({
          isLoading: false,
        }));
      })
      .catch((error) => {
        set(() => ({
          isLoading: false,
          error,
        }));
      });
  },
}));

export default useCitizen;
