import React, { useMemo, CSSProperties } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';
import colors from '../../../commons/constants/color';

export interface PaginationProps {
  /**
   * 현재 페이지
   */
  currentPage: number;
  
  /**
   * 총 페이지 수
   */
  totalPages: number;
  
  /**
   * 페이지 변경 핸들러
   */
  onPageChange: (page: number) => void;
  
  /**
   * 한 번에 표시할 페이지 버튼 수
   * @default 5
   */
  pageButtonCount?: number;
  
  /**
   * 페이지네이션 스타일 종류
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 페이지네이션 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 테마
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * 클래스명 (선택사항)
   */
  className?: string;
}

/**
 * 페이지네이션 컴포넌트
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageButtonCount = 5,
  variant = 'primary',
  size = 'medium',
  className = '',
}: PaginationProps) => {
  const { theme = 'light' } = useTheme();
  
  // 표시할 페이지 번호 계산
  const pageNumbers = useMemo(() => {
    // 표시할 페이지 버튼의 시작과 끝 계산
    let startPage = Math.max(1, currentPage - Math.floor(pageButtonCount / 2));
    let endPage = startPage + pageButtonCount - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageButtonCount + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages, pageButtonCount]);
  
  const paginationClasses = [
    styles.pagination,
    styles[`pagination-${size}`],
    styles[`pagination-${variant}`],
    styles[`theme-${theme}`],
    className
  ].filter(Boolean).join(' ');
  
  // 색상 상수를 사용한 페이지 아이템 스타일
  const getPageItemStyle = (isActive: boolean): CSSProperties => {
    const themeColors = theme === 'light' ? colors.light : colors.dark;
    
    if (isActive) {
      if (variant === 'primary') {
        return {
          backgroundColor: theme === 'light' ? themeColors.gray['05'] : themeColors.gray['80'],
          color: theme === 'light' ? themeColors.gray.black : themeColors.gray.white,
          fontWeight: 500
        };
      } else if (variant === 'secondary') {
        return {
          backgroundColor: theme === 'light' ? themeColors.blue['10'] : 'rgba(73, 124, 255, 0.2)',
          color: theme === 'light' ? themeColors.blue['60'] : themeColors.blue['40'],
          fontWeight: 500
        };
      } else { // tertiary
        return {
          backgroundColor: 'transparent',
          color: theme === 'light' ? themeColors.gray.black : themeColors.gray.white,
          fontWeight: 500
        };
      }
    } else {
      return {
        backgroundColor: variant === 'primary' && theme === 'light' ? themeColors.gray.white : 'transparent',
        color: theme === 'light' ? themeColors.gray['60'] : themeColors.gray['50'],
        fontWeight: 400
      };
    }
  };
  
  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // 이전 버튼 비활성화 여부
  const isPrevDisabled = currentPage <= 1;
  
  // 다음 버튼 비활성화 여부
  const isNextDisabled = currentPage >= totalPages;
  
  // 테마에 따른 아이콘 경로
  const prevIconSrc = useMemo(() => {
    return isPrevDisabled 
      ? "/icons/leftdisabled_outline_light_m.svg" 
      : "/icons/leftenable_outline_light_m.svg";
  }, [isPrevDisabled]);
  
  const nextIconSrc = useMemo(() => {
    return isNextDisabled 
      ? "/icons/rightdisabled_outline_light_m.svg" 
      : "/icons/rightenable_outline_light_m.svg";
  }, [isNextDisabled]);
  
  return (
    <div className={paginationClasses} data-testid="pagination">
      <button 
        className={styles.navigationButton}
        onClick={handlePrevPage}
        disabled={isPrevDisabled}
        aria-label="이전 페이지"
        data-testid="pagination-prev"
      >
        <Image
          src={prevIconSrc}
          alt="이전"
          width={24}
          height={24}
        />
      </button>
      
      <div className={styles.pageNumbers} data-testid="pagination-numbers">
        {pageNumbers.map((page) => (
          <div
            key={page}
            className={`${styles.pageItem} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onPageChange(page);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`페이지 ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            data-testid={`pagination-page-${page}`}
            style={getPageItemStyle(page === currentPage)}
          >
            {page}
          </div>
        ))}
      </div>
      
      <button
        className={styles.navigationButton}
        onClick={handleNextPage}
        disabled={isNextDisabled}
        aria-label="다음 페이지"
        data-testid="pagination-next"
      >
        <Image
          src={nextIconSrc}
          alt="다음"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Pagination;
