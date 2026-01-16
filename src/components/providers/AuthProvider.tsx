"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import getUser, { getToken } from "@/utils/getUser";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setLoggedIn, setUserRole, setLoading, setToken } = useAuthStore();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        const user = await getUser();
        const token = await getToken();

        if (user) {
          setLoggedIn(true);
          setUserRole(user.roles);
        }

        setToken(token);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user role:", error);
        // Set to not logged in on error
        setLoggedIn(false);
        setUserRole(null);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [setLoggedIn, setUserRole, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;
