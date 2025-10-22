"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
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
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (content: ReactNode) => {
    setPreviousFocus(document.activeElement as HTMLElement);
    setIsAnimating(true);
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setIsAnimating(false);
    }, 10);
  };

  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = "";
      if (previousFocus) {
        previousFocus.focus();
      }
      setTimeout(() => {
        setModalContent(null);
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  // ESC 키를 눌렀을 때 모달 닫기
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      closeModal();
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
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
              isAnimating ? "bg-opacity-0" : "bg-opacity-50"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
              onClick={(e) => e.stopPropagation()}
              aria-labelledby="modal-title"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={closeModal}
                aria-label="닫기"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-6">
                <h2 id="modal-title" className="sr-only">모달 창</h2>
                {modalContent}
              </div>
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}
