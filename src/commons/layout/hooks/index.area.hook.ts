import { usePathname } from 'next/navigation';
import { getRouteTypeByPath, getRouteLayoutConfig } from '@/commons/constants/url';

export const useLayoutArea = () => {
  const pathname = usePathname();
  const routeType = getRouteTypeByPath(pathname);
  
  const layoutConfig = routeType ? getRouteLayoutConfig(routeType) : {
    header: {
      show: true,
      logo: true,
      darkModeToggle: false,
    },
    banner: true,
    navigation: true,
    footer: true,
  };

  return {
    showHeader: layoutConfig.header.show,
    showLogo: layoutConfig.header.logo,
    showBanner: layoutConfig.banner,
    showNavigation: layoutConfig.navigation,
    showFooter: layoutConfig.footer,
  };
};

