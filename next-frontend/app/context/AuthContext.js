import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../helpers/axiosInstance";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get("/auth/me");
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    console.log("came here");
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    setUser(data.user);
    localStorage.setItem("accessToken", data.tokens.access.token);
    localStorage.setItem("refreshToken", data.tokens.refresh.token);
    router.push("/");
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
