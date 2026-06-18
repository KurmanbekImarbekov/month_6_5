import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $authApi } from "../api/axios";

const getResponseData = (responseData) => responseData?.data ?? responseData;

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await $authApi.get("/products");
      return getResponseData(data);
    },
  });
};

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data } = await $authApi.get("/favorites");
      return getResponseData(data);
    },
  });
};

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.post("/favorites", { productId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useDeleteFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.delete(`/favorites/${productId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await $authApi.get("/cart");
      return getResponseData(data);
    },
  });
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.post("/cart", { productId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.delete(`/cart/${productId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};