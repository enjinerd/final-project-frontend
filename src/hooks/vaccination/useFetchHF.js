import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
const api = import.meta.env.VITE_API_HOST;

export const useFetchHF = () => {
  const queryClient = useQueryClient();

  return useQuery(
    "newsData",
    () => axios(`${api}/admins`).then((res) => res.data.data),
    {
      staleTime: 3000000,
      onSuccess: (data) => {
        data.forEach((data, idx) => {
          queryClient.setQueryData(["hfData", idx], data);
        });
      },
    }
  );
};
