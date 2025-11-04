'use client';

import { useCallback } from 'react';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import Modal from '../../../commons/components/modal';

export const useLinkModalClose = () => {
  const { openModal, closeModal, closeAllModals } = useModal();
  
  /**
   * 닫기 버튼 클릭 시 등록 취소 확인 모달 표시
   */
  const handleCloseButtonClick = useCallback(() => {
    // 취소 확인 모달 열기
    openModal(
      <Modal
        title="일기 작성 취소"
        content="일기 작성을 취소하시겠습니까? 작성하신 내용은 저장되지 않습니다."
        variant="info"
        actions="dual"
        confirmText="작성 취소"
        cancelText="계속 작성하기"
        onConfirm={() => {
          // 두 모달 모두 닫기: 취소 모달(자식)과 일기쓰기 모달(부모) 모두 닫기
          closeAllModals();
        }}
        onCancel={() => {
          // 취소 모달(자식)만 닫고 일기쓰기 모달(부모)는 유지
          // 테스트에서는 기존 모달이 닫히고 새 모달이 열리는 것처럼 보이지만
          // 사용자 경험 상으로는 같은 모달이 유지되는 것처럼 보이게 됨
          closeModal();
        }}
      />
    );
  }, [openModal, closeModal, closeAllModals]);

  return {
    handleCloseButtonClick
  };
};

export default useLinkModalClose;