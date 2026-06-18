import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { $mainApi } from "../api/axios";
import { useAuth } from "../hooks/use-auth";

const getAuthData = (responseData) => responseData?.data ?? responseData;

const normalizeLogin = (login) => login.trim();

const createHiddenEmail = (login) => {
  const emailLogin = normalizeLogin(login)
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `${emailLogin || "user"}_${Date.now()}@shoplab.local`;
};

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
  const errors = error?.response?.data?.errors;

  if (Array.isArray(errors) && errors.length > 0) {
    return errors.join(", ");
  }

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    fallback
  );
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ login, password }) => {
      const { data } = await $mainApi.post("/auth/sign-in", {
        loginOrEmail: normalizeLogin(login),
        password,
      });

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
    mutationFn: async ({ login, password }) => {
      const normalizedLogin = normalizeLogin(login);
      const { data } = await $mainApi.post("/auth/sign-up", {
        login: normalizedLogin,
        email: createHiddenEmail(normalizedLogin),
        password,
      });

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
