'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 토글 버튼의 디자인 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 토글 버튼의 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 토글 버튼의 현재 상태
   */
  checked?: boolean;
  
  /**
   * 토글 버튼 상태 변경 이벤트 핸들러
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * 토글 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컨테이너의 추가 스타일
   */
  style?: React.CSSProperties;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      checked = false,
      onChange,
      disabled = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const toggleClasses = [
      styles.toggle,
      styles[size],
      styles[variant],
      disabled && styles.disabled,
      currentTheme === 'dark' && styles.dark,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={toggleClasses} style={style}>
        <input
          type="checkbox"
          ref={ref}
          className={styles.toggleInput}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <span className={styles.toggleSlider} />
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
