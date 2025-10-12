"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    router.push("/login");
  };

  return { isAuthenticated, logout };
};
