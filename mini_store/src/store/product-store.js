import { useQuery } from "@tanstack/react-query";
import { mainApi } from "../api/axios";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        console.log("🔄 Запрашиваем товары...");
        const { data } = await mainApi.get("/products");
        console.log("✅ Товары получены:", data);
        return data.data;
      } catch (error) {
        console.error("❌ Ошибка при запросе товаров:", error);
        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
};
