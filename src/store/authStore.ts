import { create } from "zustand";

type UserRole = "Admin" | "Rider" | "Volunteer" | null;

interface AuthState {
  isLoggedIn: boolean;
  userRole: UserRole;
  isLoading: boolean;
  token: string;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setUserRole: (role: UserRole) => void;
  setLoading: (isLoading: boolean) => void;
  setToken: (token: string) => void;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userRole: null,
  isLoading: true,
  token: "",
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUserRole: (role) => set({ userRole: role }),
  setLoading: (isLoading) => set({ isLoading }),
  setToken: (token) => set({ token }),
  resetAuth: () => set({ isLoggedIn: false, userRole: null }),
}));

export default useAuthStore;
