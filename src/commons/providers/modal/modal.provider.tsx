"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalStack, setModalStack] = useState<ReactNode[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (content: ReactNode) => {
    setPreviousFocus(document.activeElement as HTMLElement);
    setIsAnimating(true);
    setModalStack(prevStack => [...prevStack, content]);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setIsAnimating(false);
    }, 10);
  };

  const closeModal = () => {
    if (modalStack.length === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setModalStack(prevStack => prevStack.slice(0, -1));
      
      if (modalStack.length <= 1) {
        setIsOpen(false);
        document.body.style.overflow = "";
        if (previousFocus) {
          previousFocus.focus();
        }
      }
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };
  
  const closeAllModals = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = "";
      if (previousFocus) {
        previousFocus.focus();
      }
      setTimeout(() => {
        setModalStack([]);
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  // ESC 키를 눌렀을 때 모달 닫기
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      // 현재 모달의 closeOnBackdropClick 속성 확인
      const modalElement = document.querySelector('[data-close-on-backdrop-click]');
      const closeOnBackdropClick = modalElement?.getAttribute('data-close-on-backdrop-click');
      if (closeOnBackdropClick !== 'false') {
        closeModal();
      }
    }
  }, [isOpen, closeModal]);

  // 컴포넌트가 마운트될 때 이벤트 리스너 추가
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
              isAnimating ? "bg-opacity-0" : "bg-opacity-50"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                // 현재 모달의 closeOnBackdropClick 속성 확인
                const modalElement = e.currentTarget.querySelector('[data-close-on-backdrop-click]');
                const closeOnBackdropClick = modalElement?.getAttribute('data-close-on-backdrop-click');
                if (closeOnBackdropClick !== 'false') {
                  closeModal();
                }
              }
            }}
            aria-modal="true"
            role="dialog"
            aria-label="닫기"
          >
            <div
              className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
              onClick={(e) => e.stopPropagation()}
              aria-labelledby="modal-title"
            >
  
              
                {modalStack.length > 0 && modalStack[modalStack.length - 1]}

            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}
