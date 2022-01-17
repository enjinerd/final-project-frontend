import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
const api = import.meta.env.VITE_API_HOST;

export const useFetchHFById = ({ id }) => {
  return useQuery("hfByIdData", () =>
    axios(`${api}/admin/${id}`).then((res) => res.data.data)
  );
};
