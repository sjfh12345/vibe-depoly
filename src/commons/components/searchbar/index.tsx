import React, { InputHTMLAttributes, forwardRef, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';
import colors from '../../constants/color';

export interface SearchbarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 검색바의 디자인 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 검색바의 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 검색 실행 콜백
   */
  onSearch?: (value: string) => void;
  
  /**
   * 사용자 정의 클래스
   */
  className?: string;
  
  /**
   * 검색 아이콘 표시 여부
   * @default true
   */
  showSearchIcon?: boolean;
  
  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 전체 너비 적용
   * @default false
   */
  fullWidth?: boolean;
}

const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      className = '',
      placeholder = '검색어를 입력해 주세요.',
      onSearch,
      showSearchIcon = true,
      disabled = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const { theme = 'light' } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(props.value || '');
    
    const themeColors = useMemo(() => {
      return theme === 'light' ? colors.light : colors.dark;
    }, [theme]);
    
    const searchbarStyle = useMemo(() => {
      const variantStyles = {
        primary: {
          borderColor: theme === 'light' ? themeColors.gray['30'] : themeColors.gray['70'],
          backgroundColor: theme === 'light' ? themeColors.gray.white : themeColors.gray['80'],
          ...(isFocused && {
            borderColor: theme === 'light' ? themeColors.blue['60'] : themeColors.blue['40'],
          }),
        },
        secondary: {
          borderColor: theme === 'light' ? themeColors.coolGray['20'] : themeColors.gray['80'],
          backgroundColor: theme === 'light' ? themeColors.coolGray['01'] : themeColors.gray['90'],
          ...(isFocused && {
            borderColor: theme === 'light' ? themeColors.blue['60'] : themeColors.blue['40'],
            backgroundColor: theme === 'light' ? themeColors.gray.white : themeColors.gray['80'],
          }),
        },
        tertiary: {
          borderColor: 'transparent',
          backgroundColor: theme === 'light' ? themeColors.gray['05'] : themeColors.gray['70'],
          ...(isFocused && {
            borderColor: theme === 'light' ? themeColors.blue['60'] : themeColors.blue['40'],
            backgroundColor: theme === 'light' ? themeColors.gray.white : themeColors.gray['80'],
          }),
        },
      };
      
      return variantStyles[variant];
    }, [theme, variant, isFocused, themeColors]);
    
    const inputStyle = useMemo(() => {
      return {
        color: theme === 'light' ? themeColors.gray.black : themeColors.gray.white,
      };
    }, [theme, themeColors]);
    
    const iconStyle = useMemo(() => {
      return {
        filter: theme === 'dark' ? 'invert(1)' : 'none',
      };
    }, [theme]);
    
    const searchbarClasses = [
      styles.searchbar,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      isFocused ? styles.focused : '',
      disabled ? styles.disabled : '',
      fullWidth ? styles.fullWidth : '',
      className
    ].filter(Boolean).join(' ');

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (props.onChange) props.onChange(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value as string);
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };

    const handleSearchClick = () => {
      if (onSearch) {
        onSearch(value as string);
      }
    };

    return (
      <div className={styles.searchbarContainer}>
        <div className={searchbarClasses} style={searchbarStyle}>
          {showSearchIcon && (
            <button
              type="button"
              className={styles.searchIcon}
              onClick={handleSearchClick}
              aria-label="검색"
              disabled={disabled}
            >
              <Image
                src="/icons/search_outline_light_m.svg"
                alt="검색"
                width={24}
                height={24}
                style={iconStyle}
              />
            </button>
          )}
          <input
            ref={ref}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

export default Searchbar;
