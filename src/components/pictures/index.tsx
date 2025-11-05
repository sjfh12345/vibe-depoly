'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import Selectbox from '../../commons/components/selectbox';
import { usePicturesBinding } from './hooks/index.binding.hook';

export default function Pictures() {
  const [filterValue, setFilterValue] = useState('all');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  const {
    pictures,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePicturesBinding();
  
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  // 무한스크롤 구현: IntersectionObserver를 사용하여 마지막 2개 항목 감지
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isLoading || isFetchingNextPage || pictures.length < 4) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = loadMoreRef.current;
    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage, pictures.length]);
  
  // ref 콜백 함수
  const setLoadMoreRef = (el: HTMLDivElement | null) => {
    loadMoreRef.current = el;
  };
  
  return (
    <div className={styles.container} data-testid="pictures-page-content">
      {/* 첫 번째 gap 영역 - 32px */}
      <div className={styles.gap}></div>
      
      {/* filter 영역 - 1168 x 48px */}
      <div className={styles.filter}>
        <Selectbox 
          variant="primary" 
          size="medium" 
          options={[
            { value: 'all', label: '전체' },
            { value: 'recent', label: '최근' },
            { value: 'oldest', label: '오래된' }
          ]} 
          value={filterValue}
          onChange={handleFilterChange}
          className={styles.filterSelect}
          placeholder="전체"
        />
      </div>
      
      {/* 두 번째 gap 영역 - 42px */}
      <div className={styles.gap}></div>
      
      {/* 메인 컨텐츠 영역 - 1168 x auto */}
      <div className={styles.main}>
        <div className={styles.pictureGrid}>
          {/* 로딩 중 스플래시 스크린 */}
          {isLoading && (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <div key={`splash-${index}`} className={styles.pictureItem}>
                  <div className={styles.splashScreen}>
                    <Image
                      src="/images/catloading.gif"
                      alt="로딩 중"
                      fill
                      className={styles.splashImage}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </>
          )}
          
          {/* 강아지 사진 목록 */}
          {!isLoading && pictures.map((picture, index) => (
            <div 
              key={picture.id} 
              className={styles.pictureItem}
              ref={index === pictures.length - 2 ? setLoadMoreRef : null}
              data-testid={`picture-item-${picture.id}`}
            >
              <Image
                src={picture.image}
                alt={`강아지 사진 ${picture.id}`}
                fill
                className={styles.pictureImage}
                unoptimized
              />
            </div>
          ))}
          
          {/* 추가 로딩 중 스플래시 스크린 */}
          {isFetchingNextPage && (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <div key={`splash-next-${index}`} className={styles.pictureItem}>
                  <div className={styles.splashScreen}>
                    <Image
                      src="/images/catloading.gif"
                      alt="로딩 중"
                      fill
                      className={styles.splashImage}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

