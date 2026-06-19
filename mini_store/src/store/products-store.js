import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $authApi } from "../api/axios";

const getResponseData = (responseData) => responseData?.data ?? responseData;

export const useProductsQuery = (params = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await $authApi.get("/products", { params });
      return getResponseData(data);
    },
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await $authApi.get("/categories");
      return data?.data ?? data ?? [];
    },
  });
};

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data } = await $authApi.get("/favorites");
      return data?.data?.products ?? data?.products ?? [];
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
      return data?.data?.items ?? data?.items ?? [];
    },
  });
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.post("/cart", {
        productId,
        quantity: 1,
      });
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

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await $authApi.delete("/cart");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData) => {
      const { data } = await $authApi.post("/orders", orderData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await $authApi.get("/orders");
      return data?.data ?? data ?? [];
    },
  });
};