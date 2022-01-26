import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const useFetchVaccInfo = () => {
  const queryClient = useQueryClient();

  return useQuery(
    "vacinfoData",
    () =>
      axios(
        `https://cekdiri.id/vaksinasi/`
      ).then((res) => {
        const data = res.data.monitoring
        return data[data.length - 1]
      }),
    {
      staleTime: 3000000,
    }
  );
};
