'use client';

import React from 'react';
import styles from './styles.module.css';
import { useLayoutRouting } from './hooks/index.link.routing.hook';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { navigateToDiaries, navigateToPictures, isDiariesActive, isPicturesActive } = useLayoutRouting();

  return (
    <div className={styles.container} data-testid="layout-container">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo} onClick={navigateToDiaries} data-testid="layout-logo">
            민지의 다이어리
          </div>
        </div>
      </header>
      
      <div className={styles.gap}></div>
      
      <section className={styles.banner}>
        <div className={styles.bannerImage}></div>
      </section>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        <div className={styles.navTabs}>
          <div 
            className={isDiariesActive ? styles.tabActive : styles.tabInactive}
            onClick={navigateToDiaries}
            data-testid="layout-nav-diaries"
          >
            일기보관함
          </div>
          <div 
            className={isPicturesActive ? styles.tabActive : styles.tabInactive}
            onClick={navigateToPictures}
            data-testid="layout-nav-pictures"
          >
            사진보관함
          </div>
        </div>
      </nav>
      
      <main className={styles.main}>
        <div className={styles.mainContent}>
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerTitle}>민지의 다이어리</div>
          <div className={styles.footerInfo}>대표 : 홍길동</div>
          <div className={styles.footerCopyright}>Copyright © 2024. 홍길동 Co., Ltd.</div>
        </div>
      </footer>
    </div>
  );
}
