"use client";

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import {
  ILoginInput,
  IRegisterInput,
  IUpdateProfileInput,
  IUser,
} from "@/types/auth.types";

export interface AuthContextValue {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: ILoginInput) => Promise<void>;
  register: (data: IRegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: IUpdateProfileInput) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    authService
      .getMe()
      .then((currentUser) => {
        if (isMounted) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => setUser(null);

    window.addEventListener("worknest:auth-expired", handleAuthExpired);
    return () => window.removeEventListener("worknest:auth-expired", handleAuthExpired);
  }, []);

  const login = useCallback(async (data: ILoginInput): Promise<void> => {
    const loggedInUser = await authService.login(data);
    setUser(loggedInUser);
  }, []);

  const register = useCallback(async (data: IRegisterInput): Promise<void> => {
    const registeredUser = await authService.register(data);
    setUser(registeredUser);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await authService.logout();
    setUser(null);
    router.push("/login");
  }, [router]);

  const updateProfile = useCallback(async (data: IUpdateProfileInput): Promise<void> => {
    const updatedUser = await authService.updateProfile(data);
    setUser(updatedUser);
  }, []);

  const deleteAccount = useCallback(async (): Promise<void> => {
    await authService.deleteAccount();
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
      updateProfile,
      deleteAccount,
    }),
    [deleteAccount, isLoading, login, logout, register, updateProfile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
