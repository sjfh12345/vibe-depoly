import { useAuth } from '@/commons/providers/auth/auth.provider';

export const useLayoutAuth = () => {
  const { isLoggedIn, user, login, logout } = useAuth();

  return {
    isLoggedIn,
    user,
    login,
    logout,
  };
};

