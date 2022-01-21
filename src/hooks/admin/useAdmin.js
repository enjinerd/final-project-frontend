import axios from "axios";
import createStore from "zustand";

const api = import.meta.env.VITE_API_HOST;

const useCitizen = createStore((set) => ({
  isLoading: true,
  error: undefined,
  getVaccine: async (token, id) => {
    let data;
    await axios
      .get(`${api}/vaccines/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((val) => {
        data = val.data.data;
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
    return data;
  },
  deleteVaccine: async (id, token) => {
    await axios
      .delete(`${api}/vaccine/${id}`, {
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
  addVaccine: async (val, token) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .post(
        `${api}/vaccines`,
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
  editVaccine: async (val, token, id) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/vaccines/${id}`,
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
  getSessionByHf: async (token, id) => {
    let data;
    await axios
      .get(`${api}/vaccine/session/owned/${id}`, {
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
  getSessionById: async (token, id) => {
    let data;
    await axios
      .get(`${api}/vaccine/session/${id}`, {
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
  deleteSession: async (id, token) => {
    await axios
      .delete(`${api}/vaccine/session//${id}`, {
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
  adddSession: async (val, token) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .post(
        `${api}/vaccine/sessions`,
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
  editSession: async (val, token, id) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/vaccine/session/${id}`,
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
  getAdminDetail: async (token, id) => {
    let data;
    await axios
      .get(`${api}/admin/${id}`, {
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
  getCitizenId: async (token, familyId) => {
    let data;
    await axios
      .get(`${api}/families/${familyId}`, {
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
  getProfile: async (token, id) => {
    let data;
    await axios
      .get(`${api}/citizen/profile/${id}`, {
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
  getCitizenByHf: async (token, id) => {
    let data;
    await axios
      .get(`${api}/admin/related/${id}`, {
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
  deleteSession: async (id, token) => {
    await axios
      .delete(`${api}/vaccine/session//${id}`, {
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
  adddSession: async (val, token) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .post(
        `${api}/vaccine/sessions`,
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
  editSession: async (val, token, id) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/vaccine/session/${id}`,
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
  updateFamilyByHF: async (val, token, id) => {
    set(() => ({ isAuthenticating: true }));
    await axios
      .put(
        `${api}/admin/family/${id}`,
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
}));

export default useCitizen;
