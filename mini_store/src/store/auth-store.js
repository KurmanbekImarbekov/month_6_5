import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { $mainApi } from "../api/axios";
import { useAuth } from "../hooks/use-auth";

const getAuthData = (responseData) => responseData?.data ?? responseData;

const saveAuthData = (responseData) => {
  const authData = getAuthData(responseData);
  const token = authData?.accessToken || authData?.token;

  if (token) {
    localStorage.setItem("accessToken", token);
  }

  useAuth.getState().setAuth(Boolean(token));
  useAuth.getState().setUser(authData?.user ?? null);
};

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    fallback
  );
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await $mainApi.post("/auth/sign-in", payload);
      return data;
    },
    onSuccess: (responseData) => {
      saveAuthData(responseData);
      toast.success("Вы успешно вошли");
      navigate("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Не удалось войти"));
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await $mainApi.post("/auth/sign-up", payload);
      return data;
    },
    onSuccess: (responseData) => {
      saveAuthData(responseData);
      toast.success("Регистрация прошла успешно");
      navigate("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Не удалось зарегистрироваться"));
    },
  });
};
