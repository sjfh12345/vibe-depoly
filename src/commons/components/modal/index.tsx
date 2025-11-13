"use client";

import React from 'react';
import Button from '../button';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

export interface ModalProps {
  /**
   * 모달 제목
   */
  title: string;

  /**
   * 모달 내용
   */
  content: string;

  /**
   * 모달 스타일 종류
   * @default 'info'
   */
  variant?: 'info' | 'danger';

  /**
   * 모달 버튼 액션 종류
   * @default 'single'
   */
  actions?: 'single' | 'dual';

  /**
   * 테마
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * 확인 버튼 텍스트
   * @default '확인'
   */
  confirmText?: string;

  /**
   * 취소 버튼 텍스트
   * @default '취소'
   */
  cancelText?: string;

  /**
   * 확인 버튼 클릭 이벤트
   */
  onConfirm?: () => void;

  /**
   * 취소 버튼 클릭 이벤트
   */
  onCancel?: () => void;

  /**
   * 배경 클릭 시 모달 닫기 여부
   * @default true
   */
  closeOnBackdropClick?: boolean;
}

/**
 * 모달 컴포넌트
 */
export const Modal = ({
  title,
  content,
  variant = 'info',
  actions = 'single',
  theme: themeProp = 'light',
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  closeOnBackdropClick = true,
}: ModalProps) => {
  const { theme: systemTheme } = useTheme();
  const currentTheme = themeProp || (systemTheme === 'dark' ? 'dark' : 'light');
  
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  
  const modalClasses = [
    styles.modal,
    styles[`theme-${currentTheme}`],
    styles[`variant-${variant}`],
    styles[`actions-${actions}`],
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={modalClasses}
      data-close-on-backdrop-click={closeOnBackdropClick}
    >
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
      </div>
      
      <div className={styles.buttonContainer}>
        {actions === 'dual' && (
          <Button 
            variant="secondary"
            size="large"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
        )}
        <Button 
          variant="primary"
          size="large"
          className={styles.confirmButton}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default Modal;
