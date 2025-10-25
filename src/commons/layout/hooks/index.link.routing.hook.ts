import { usePathname, useRouter } from 'next/navigation';
import { RouteType, getRoutePath } from '@/commons/constants/url';

export const useLayoutRouting = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateToDiaries = () => {
    router.push(getRoutePath(RouteType.DIARIES));
  };

  const navigateToPictures = () => {
    router.push(getRoutePath(RouteType.PICTURES));
  };

  const isDiariesActive = pathname === getRoutePath(RouteType.DIARIES);
  const isPicturesActive = pathname === getRoutePath(RouteType.PICTURES);

  return {
    navigateToDiaries,
    navigateToPictures,
    isDiariesActive,
    isPicturesActive,
  };
};

