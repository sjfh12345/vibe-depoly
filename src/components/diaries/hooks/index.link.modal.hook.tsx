'use client';

import { useCallback } from 'react';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import DiariesNew from '../../diaries-new';

export function useDiariesModal() {
  const { openModal } = useModal();

  const openDiaryWriteModal = useCallback(() => {
    openModal(<DiariesNew />);
  }, [openModal]);

  return {
    openDiaryWriteModal,
  };
}

