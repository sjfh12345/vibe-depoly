"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RouteType, getRoutePath } from "../../constants/url";

interface User {
  _id: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  checkLoginStatus: () => boolean;
  getUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * localStorage에서 accessToken 확인
   */
  const checkAccessToken = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken;
  }, []);

  /**
   * localStorage에서 user 정보 조회
   */
  const getUserFromStorage = useCallback((): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }, []);

  /**
   * 로그인 상태 업데이트
   */
  const updateAuthState = useCallback(() => {
    const hasToken = checkAccessToken();
    const userData = getUserFromStorage();
    setIsLoggedIn(hasToken);
    setUser(userData);
  }, [checkAccessToken, getUserFromStorage]);

  /**
   * 초기 마운트 시 localStorage에서 상태 로드
   */
  useEffect(() => {
    updateAuthState();
  }, [updateAuthState]);

  /**
   * storage 이벤트 리스너 추가 (다른 탭에서의 변경 감지)
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "user") {
        updateAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [updateAuthState]);

  /**
   * 페이지 포커스/가시성 변경 시 상태 확인 (같은 탭에서의 변경 감지)
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFocus = () => {
      updateAuthState();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateAuthState();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [updateAuthState]);

  /**
   * 로그인: 로그인 페이지로 이동
   */
  const login = useCallback(() => {
    router.push(getRoutePath(RouteType.LOGIN));
  }, [router]);

  /**
   * 로그아웃: localStorage 제거 후 로그인 페이지로 이동
   */
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    updateAuthState();
    router.push(getRoutePath(RouteType.LOGIN));
  }, [router, updateAuthState]);

  /**
   * 로그인 상태 검증
   */
  const checkLoginStatus = useCallback((): boolean => {
    return isLoggedIn;
  }, [isLoggedIn]);

  /**
   * 로그인 유저 정보 조회
   */
  const getUser = useCallback((): User | null => {
    return user;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        checkLoginStatus,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

