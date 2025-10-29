import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 스타일 종류
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 버튼 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 버튼 내용
   */
  children: React.ReactNode;
  
  /**
   * 버튼 비활성화 상태
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 버튼 전체 너비 적용
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 왼쪽 아이콘 경로 (선택사항)
   */
  leftIconSrc?: string;
  
  /**
   * 오른쪽 아이콘 경로 (선택사항)
   */
  rightIconSrc?: string;
  
  /**
   * 아이콘 크기 (선택사항)
   * @default 24
   */
  iconSize?: number;
  
  /**
   * 클래스명 (선택사항)
   */
  className?: string;
}

/**
 * 기본 버튼 컴포넌트
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  fullWidth = false,
  leftIconSrc,
  rightIconSrc,
  iconSize = 24,
  className = '',
  ...props
}: ButtonProps) => {
  const { theme = 'light' } = useTheme();

  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    styles[`theme-${theme}`],
    fullWidth ? styles['full-width'] : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {leftIconSrc && (
        <span className={styles.leftIcon}>
          <Image 
            src={leftIconSrc} 
            alt="left icon" 
            width={iconSize} 
            height={iconSize}
          />
        </span>
      )}
      <span className={styles.content}>{children}</span>
      {rightIconSrc && (
        <span className={styles.rightIcon}>
          <Image 
            src={rightIconSrc} 
            alt="right icon" 
            width={iconSize} 
            height={iconSize}
          />
        </span>
      )}
    </button>
  );
};

export default Button;
