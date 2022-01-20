import axios from "axios";
import createStore from "zustand";
import { useQuery } from "react-query";

const api = import.meta.env.VITE_API_HOST;

const useCitizen = createStore((set) => ({
  isLoading: true,
  error: undefined,
  userProfile: (token, id) => {
    return useQuery("userData", () =>
      axios(`${api}/citizen/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
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
  updateFamilyMember: async (val, token) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/families/${val.id}`,
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
  registerVaccination: async (token, bookingId) => {
    console.log(
      "🚀 ~ file: useCitizen.js ~ line 132 ~ registerVaccination: ~ token",
      token
    );

    await axios
      .post(
        `${api}/session/bookings/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
  vaccinationSession: async (token) => {
    let data;
    await axios
      .get(`${api}/citizen/sessions`, {
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
}));

export default useCitizen;
