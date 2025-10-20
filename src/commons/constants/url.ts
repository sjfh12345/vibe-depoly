/**
 * URL 관련 상수 및 유틸리티 함수
 */

export enum AccessLevel {
  PUBLIC = 'PUBLIC', // 누구나
  MEMBER_ONLY = 'MEMBER_ONLY', // 회원전용
}

export enum RouteType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  DIARIES = 'DIARIES',
  DIARY_DETAIL = 'DIARY_DETAIL',
  PICTURES = 'PICTURES',
}

export interface RouteInfo {
  path: string;
  accessLevel: AccessLevel;
  layout: {
    header: {
      show: boolean;
      logo: boolean;
      darkModeToggle: boolean;
    };
    banner: boolean;
    navigation: boolean;
    footer: boolean;
  };
}

export const ROUTE_INFO: Record<RouteType, RouteInfo> = {
  [RouteType.LOGIN]: {
    path: '/auth/login',
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: {
        show: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  [RouteType.SIGNUP]: {
    path: '/auth/signup',
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: {
        show: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  [RouteType.DIARIES]: {
    path: '/diaries',
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  [RouteType.DIARY_DETAIL]: {
    path: '/diaries/[id]',
    accessLevel: AccessLevel.MEMBER_ONLY,
    layout: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  [RouteType.PICTURES]: {
    path: '/pictures',
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
};

/**
 * 주어진 라우트 타입에 대한 경로를 반환합니다.
 */
export const getRoutePath = (routeType: RouteType): string => {
  return ROUTE_INFO[routeType].path;
};

/**
 * 동적 라우팅을 위한 경로를 생성합니다.
 * @param routeType 라우트 타입
 * @param params 동적 파라미터 (예: { id: '123' })
 */
export const getDynamicRoutePath = (routeType: RouteType, params: Record<string, string>): string => {
  let path = ROUTE_INFO[routeType].path;
  
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`[${key}]`, value);
  });
  
  return path;
};

/**
 * 주어진 라우트 타입에 대한 접근 권한을 반환합니다.
 */
export const getRouteAccessLevel = (routeType: RouteType): AccessLevel => {
  return ROUTE_INFO[routeType].accessLevel;
};

/**
 * 주어진 라우트 타입에 대한 레이아웃 설정을 반환합니다.
 */
export const getRouteLayoutConfig = (routeType: RouteType): RouteInfo['layout'] => {
  return ROUTE_INFO[routeType].layout;
};

/**
 * 주어진 라우트 타입에 대한 헤더 설정을 반환합니다.
 */
export const getRouteHeaderConfig = (routeType: RouteType): RouteInfo['layout']['header'] => {
  return ROUTE_INFO[routeType].layout.header;
};

/**
 * 주어진 라우트 타입에 대한 배너 표시 여부를 반환합니다.
 */
export const shouldShowBanner = (routeType: RouteType): boolean => {
  return ROUTE_INFO[routeType].layout.banner;
};

/**
 * 주어진 라우트 타입에 대한 내비게이션 표시 여부를 반환합니다.
 */
export const shouldShowNavigation = (routeType: RouteType): boolean => {
  return ROUTE_INFO[routeType].layout.navigation;
};

/**
 * 주어진 라우트 타입에 대한 푸터 표시 여부를 반환합니다.
 */
export const shouldShowFooter = (routeType: RouteType): boolean => {
  return ROUTE_INFO[routeType].layout.footer;
};

/**
 * 주어진 경로에 해당하는 라우트 타입을 반환합니다.
 * 일치하는 라우트가 없으면 undefined를 반환합니다.
 */
export const getRouteTypeByPath = (path: string): RouteType | undefined => {
  const normalizedPath = path.split('?')[0]; // 쿼리 파라미터 제거
  
  // 정확히 일치하는 경로 찾기
  const exactMatch = Object.entries(ROUTE_INFO).find(
    ([_, info]) => info.path === normalizedPath
  );
  
  if (exactMatch) {
    return exactMatch[0] as RouteType;
  }
  
  // 동적 라우트 처리 (예: /diaries/123 => /diaries/[id])
  const dynamicMatch = Object.entries(ROUTE_INFO).find(([_, info]) => {
    if (!info.path.includes('[')) return false;
    
    const pathPattern = info.path.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${pathPattern}$`);
    return regex.test(normalizedPath);
  });
  
  return dynamicMatch ? dynamicMatch[0] as RouteType : undefined;
};

/**
 * 모든 라우트 타입을 배열로 반환합니다.
 */
export const getAllRouteTypes = (): RouteType[] => {
  return Object.values(RouteType);
};

/**
 * 회원 전용 라우트 타입을 배열로 반환합니다.
 */
export const getMemberOnlyRouteTypes = (): RouteType[] => {
  return Object.entries(ROUTE_INFO)
    .filter(([_, info]) => info.accessLevel === AccessLevel.MEMBER_ONLY)
    .map(([type]) => type as RouteType);
};

/**
 * 누구나 접근 가능한 라우트 타입을 배열로 반환합니다.
 */
export const getPublicRouteTypes = (): RouteType[] => {
  return Object.entries(ROUTE_INFO)
    .filter(([_, info]) => info.accessLevel === AccessLevel.PUBLIC)
    .map(([type]) => type as RouteType);
};

/**
 * 주어진 라우트 타입이 회원 전용인지 확인합니다.
 */
export const isMemberOnlyRoute = (routeType: RouteType): boolean => {
  return getRouteAccessLevel(routeType) === AccessLevel.MEMBER_ONLY;
};

/**
 * 주어진 라우트 타입이 누구나 접근 가능한지 확인합니다.
 */
export const isPublicRoute = (routeType: RouteType): boolean => {
  return getRouteAccessLevel(routeType) === AccessLevel.PUBLIC;
};