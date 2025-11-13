'use client';

import { useCallback, useEffect } from 'react';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import { useAuthGuard } from '../../../commons/providers/auth/auth.guard.hook';
import DiariesNew from '../../diaries-new';

export interface UseDiariesModalReturn {
  openDiaryWriteModal: () => void;
}

/**
 * 일기 작성 모달 관리 훅
 * 
 * 일기쓰기 버튼 클릭 시 권한을 검사하여, 로그인한 경우 일기 작성 모달을 표시하고,
 * 비로그인한 경우 로그인 요청 모달을 표시합니다.
 * 
 * @returns {UseDiariesModalReturn} 일기 작성 모달 열기 함수
 */
export function useDiariesModal(): UseDiariesModalReturn {
  const { openModal, closeModal } = useModal();
  const guard = useAuthGuard();

  // 일기 작성 취소 이벤트 감지
  useEffect(() => {
    const handleDiaryCancelConfirmed = () => {
      closeModal();
    };

    window.addEventListener('diary-cancel-confirmed', handleDiaryCancelConfirmed);
    
    return () => {
      window.removeEventListener('diary-cancel-confirmed', handleDiaryCancelConfirmed);
    };
  }, [closeModal]);

  const openDiaryWriteModal = useCallback(() => {
    // 권한 검사: 로그인하지 않은 경우 guard가 false를 반환하고 모달을 표시함
    if (guard()) {
      // 로그인한 경우 일기쓰기 모달 표시
      openModal(<DiariesNew />);
    }
  }, [openModal, guard]);

  return {
    openDiaryWriteModal,
  };
}

