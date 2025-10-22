import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';
import colors from '../../constants/color';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectboxProps {
  /**
   * 셀렉트박스 스타일 종류
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 셀렉트박스 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 선택 옵션들
   */
  options: SelectOption[];
  
  /**
   * 현재 선택된 값
   */
  value?: string;
  
  /**
   * 기본 선택된 값
   */
  defaultValue?: string;
  
  /**
   * 플레이스홀더 텍스트
   * @default '선택하세요'
   */
  placeholder?: string;
  
  /**
   * 셀렉트박스 비활성화 상태
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 셀렉트박스 전체 너비 적용
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 값 변경 시 호출되는 콜백
   */
  onChange?: (value: string, option: SelectOption) => void;
  
  /**
   * 클래스명 (선택사항)
   */
  className?: string;
  
  /**
   * 에러 상태
   * @default false
   */
  error?: boolean;
  
  /**
   * 에러 메시지
   */
  errorMessage?: string;
}

/**
 * 기본 셀렉트박스 컴포넌트
 */
export const Selectbox = ({
  variant = 'primary',
  size = 'medium',
  options = [],
  value,
  defaultValue,
  placeholder = '선택하세요',
  disabled = false,
  fullWidth = false,
  onChange,
  className = '',
  error = false,
  errorMessage,
}: SelectboxProps) => {
  const { theme = 'light' } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
  const selectRef = useRef<HTMLDivElement>(null);
  
  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // value prop이 변경될 때 내부 상태 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);
  
  const selectedOption = useMemo(() => {
    return options.find(option => option.value === selectedValue);
  }, [options, selectedValue]);
  
  const selectboxStyle = useMemo(() => {
    const themeColors = theme === 'light' ? colors.light : colors.dark;
    
    const baseStyle = {
      backgroundColor: theme === 'light' ? themeColors.gray.white : themeColors.gray['90'],
      color: theme === 'light' ? themeColors.gray.black : themeColors.gray.white,
      borderColor: error 
        ? themeColors.semantic.error 
        : theme === 'light' ? themeColors.gray['30'] : themeColors.gray['60'],
    };
    
    const variantStyles = {
      primary: {
        ...baseStyle,
        border: `1px solid ${baseStyle.borderColor}`,
      },
      secondary: {
        ...baseStyle,
        backgroundColor: theme === 'light' ? themeColors.blue['05'] : 'transparent',
        borderColor: error 
          ? themeColors.semantic.error 
          : theme === 'light' ? themeColors.blue['20'] : themeColors.blue['40'],
        border: `1px solid ${error 
          ? themeColors.semantic.error 
          : theme === 'light' ? themeColors.blue['20'] : themeColors.blue['40']}`,
      },
      tertiary: {
        ...baseStyle,
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${baseStyle.borderColor}`,
        borderRadius: 0,
      },
    };
    
    return variantStyles[variant];
  }, [theme, variant, error]);
  
  const dropdownStyle = useMemo(() => {
    const themeColors = theme === 'light' ? colors.light : colors.dark;
    
    return {
      backgroundColor: theme === 'light' ? themeColors.gray.white : themeColors.gray['80'],
      border: `1px solid ${theme === 'light' ? themeColors.gray['20'] : themeColors.gray['60']}`,
      color: theme === 'light' ? themeColors.gray.black : themeColors.gray.white,
    };
  }, [theme]);
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      setSelectedValue(option.value);
      setIsOpen(false);
      onChange?.(option.value, option);
    }
  };
  
  const selectboxClasses = [
    styles.selectbox,
    styles[`selectbox-${variant}`],
    styles[`selectbox-${size}`],
    styles[`theme-${theme}`],
    fullWidth ? styles['full-width'] : '',
    disabled ? styles.disabled : '',
    error ? styles.error : '',
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');
  
  const dropdownClasses = [
    styles.dropdown,
    styles[`dropdown-${size}`],
    styles[`theme-${theme}`],
    isOpen ? styles.open : ''
  ].filter(Boolean).join(' ');
  
  return (
    <div className={styles.selectboxWrapper} ref={selectRef}>
      <div 
        className={selectboxClasses}
        onClick={handleToggle}
        style={selectboxStyle}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <span className={styles.selectedText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles.arrow}>
          <Image
            src="/icons/arrow_drop_down.svg"
            alt="dropdown arrow"
            width={8.6}
            height={4.7}
            className={isOpen ? styles.arrowUp : ''}
          />
        </span>
      </div>
      
      {isOpen && (
        <div className={dropdownClasses} style={dropdownStyle}>
          <ul className={styles.optionList} role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                className={[
                  styles.option,
                  option.value === selectedValue ? styles.selected : '',
                  option.disabled ? styles.disabled : ''
                ].filter(Boolean).join(' ')}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={option.value === selectedValue}
                tabIndex={option.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOptionClick(option);
                  }
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {error && errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Selectbox;

