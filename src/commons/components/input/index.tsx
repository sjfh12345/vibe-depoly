import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드의 디자인 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 입력 필드의 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 사용자 정의 클래스
   */
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      className = '',
      placeholder,
      ...props
    },
    ref
  ) => {
    const { theme = 'light' } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    
    const inputClasses = [
      styles.input,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      isFocused ? styles.focused : '',
      className
    ].join(' ');

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    return (
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          className={inputClasses}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
