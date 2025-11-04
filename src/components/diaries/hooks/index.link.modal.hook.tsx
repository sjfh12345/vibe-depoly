'use client';

import { useCallback, useEffect } from 'react';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import DiariesNew from '../../diaries-new';

export function useDiariesModal() {
  const { openModal, closeModal } = useModal();

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
    openModal(<DiariesNew />);
  }, [openModal]);

  return {
    openDiaryWriteModal,
  };
}