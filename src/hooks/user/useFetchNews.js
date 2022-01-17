import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
export const useFetchNews = () => {
  const queryClient = useQueryClient();

  return useQuery(
    "newsData",
    () =>
      axios(
        `https://berita-indo-api.vercel.app/v1/okezone-news?title=vaksin`
      ).then((res) => res.data.data),
    {
      staleTime: 3000000,
      onSuccess: (data) => {
        data.forEach((data, idx) => {
          queryClient.setQueryData(["newsData", idx], data);
        });
      },
    }
  );
};
