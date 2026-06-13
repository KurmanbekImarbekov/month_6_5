import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/products");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 минут
  });
};
