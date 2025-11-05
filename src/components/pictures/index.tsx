'use client';

import React from 'react';
import styles from './styles.module.css';

export default function Pictures() {
  return (
    <div className={styles.container} data-testid="pictures-page-content">
      {/* 첫 번째 gap 영역 - 32px */}
      <div className={styles.gap}></div>
      
      {/* filter 영역 - 1168 x 48px */}
      <div className={styles.filter}></div>
      
      {/* 두 번째 gap 영역 - 42px */}
      <div className={styles.gap}></div>
      
      {/* 메인 컨텐츠 영역 - 1168 x auto */}
      <div className={styles.main}></div>
    </div>
  );
}

