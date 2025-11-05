'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import Selectbox from '../../commons/components/selectbox';

export default function Pictures() {
  const [filterValue, setFilterValue] = useState('all');
  
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };
  
  // Mock 데이터: 강아지 사진 목록 (모두 dog-1.jpg 사용)
  const pictureList = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    image: '/images/dog-1.jpg',
  }));
  
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
          {pictureList.map((picture) => (
            <div 
              key={picture.id} 
              className={styles.pictureItem}
            >
              <Image
                src={picture.image}
                alt={`강아지 사진 ${picture.id}`}
                fill
                className={styles.pictureImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

