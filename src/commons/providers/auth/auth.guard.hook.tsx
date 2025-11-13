"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { getRoutePath, RouteType } from "../../constants/url";
import Modal from "../../components/modal";

/**
 * 전역 Window 타입 확장 (테스트 환경 변수)
 */
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

/**
 * 테스트 환경 여부 확인
 */
const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

/**
 * Auth Guard Hook
 * 함수 요청 시 권한을 검증하는 GUARD 기능을 제공합니다.
 * 
 * @returns guard 함수 - 호출 시 인가 검증을 수행합니다.
 */
export const useAuthGuard = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeAllModals } = useModal();
  const hasShownModalRef = useRef(false);

  /**
   * 로그인하시겠습니까 모달 표시
   * 모달은 한 번만 보여야 하며, 닫힌 뒤에는 같은 상황에서 다시 나타나지 않도록 합니다.
   */
  const showLoginModal = useCallback(() => {
    // 이미 모달을 표시한 경우 다시 표시하지 않음
    if (hasShownModalRef.current) {
      return;
    }

    hasShownModalRef.current = true;

    openModal(
      <Modal
        title="로그인 필요"
        content="로그인이 필요한 기능입니다. 로그인하시겠습니까?"
        variant="info"
        actions="dual"
        confirmText="로그인하러가기"
        cancelText="취소"
        closeOnBackdropClick={false}
        onConfirm={() => {
          closeAllModals();
          hasShownModalRef.current = false;
          router.push(getRoutePath(RouteType.LOGIN));
        }}
        onCancel={() => {
          closeAllModals();
          hasShownModalRef.current = false;
        }}
      />
    );
  }, [openModal, closeAllModals, router]);

  /**
   * 권한 검증 및 인가 실패 처리
   */
  const guard = useCallback(() => {
    // 테스트 환경: 기본적으로 로그인 유저로 간주하여 검사 패스
    if (isTestEnv) {
      const testBypass = typeof window !== "undefined" && window.__TEST_BYPASS__;
      // window.__TEST_BYPASS__가 false인 경우에만 검사 수행 (비회원 가드테스트 필요 시)
      if (testBypass === false) {
        if (!isLoggedIn) {
          showLoginModal();
          return false;
        }
        return true;
      }
      // 테스트 환경: 기본적으로 로그인 유저로 간주하여 검사 패스
      return true;
    }

    // 실제 환경: 항상 "비로그인 유저"를 기본으로 하여 로그인 검사를 수행
    if (!isLoggedIn) {
      showLoginModal();
      return false;
    }

    return true;
  }, [isLoggedIn, showLoginModal]);

  return guard;
};

