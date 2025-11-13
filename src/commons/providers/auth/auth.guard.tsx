"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { getRouteTypeByPath, getRouteAccessLevel, AccessLevel, getRoutePath, RouteType } from "../../constants/url";
import Modal from "../../components/modal";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, updateAuthState } = useAuth();
  const { openModal, closeAllModals } = useModal();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasShownModalRef = useRef<string | null>(null);

  /**
   * 테스트 환경 여부 확인
   */
  const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

  /**
   * AuthProvider 초기화
   */
  useEffect(() => {
    if (!isInitialized) {
      updateAuthState();
      // 다음 렌더링 사이클에서 상태 확인을 위해 약간의 지연
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isInitialized, updateAuthState]);

  /**
   * 권한 검증
   */
  useEffect(() => {
    // AuthProvider 초기화 대기
    if (!isInitialized) {
      return;
    }

    const routeType = getRouteTypeByPath(pathname);
    
    // 경로가 정의되지 않은 경우 허용
    if (!routeType) {
      setIsAuthorized(true);
      hasShownModalRef.current = null;
      return;
    }

    const accessLevel = getRouteAccessLevel(routeType);

    // 테스트 환경: 항상 허용
    if (isTestEnv) {
      setIsAuthorized(true);
      hasShownModalRef.current = null;
      return;
    }

    // 실제 환경: 권한 검증
    if (accessLevel === AccessLevel.PUBLIC) {
      // 공개 페이지: 항상 허용
      setIsAuthorized(true);
      hasShownModalRef.current = null;
    } else if (accessLevel === AccessLevel.MEMBER_ONLY) {
      // 회원 전용 페이지: 로그인 여부 확인
      if (isLoggedIn) {
        setIsAuthorized(true);
        hasShownModalRef.current = null;
      } else {
        setIsAuthorized(false);
        
        // 같은 경로에서 모달을 한 번만 표시
        if (hasShownModalRef.current !== pathname) {
          hasShownModalRef.current = pathname;
          openModal(
            <Modal
              title="로그인 필요"
              content="로그인이 필요한 페이지입니다. 로그인해주세요."
              variant="info"
              actions="single"
              closeOnBackdropClick={false}
              onConfirm={() => {
                closeAllModals();
                router.push(getRoutePath(RouteType.LOGIN));
              }}
            />
          );
        }
      }
    }
  }, [pathname, isLoggedIn, isInitialized, isTestEnv, updateAuthState, openModal, closeAllModals, router]);

  // 인가되지 않은 경우 빈 화면 표시
  if (!isAuthorized) {
    return null;
  }

  // 인가된 경우 children 표시
  return <>{children}</>;
}

