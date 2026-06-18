import { create } from "zustand";

export const useAuth = create((set) => ({
  isAuth: Boolean(localStorage.getItem("accessToken")),
  user: null,
  setAuth: (bool) => set({ isAuth: bool }),
  setUser: (user) => set({ user }),
  clearAuth: () => {
    localStorage.removeItem("accessToken");
    set({ isAuth: false, user: null });
  },
}));
