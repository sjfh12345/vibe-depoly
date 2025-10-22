import React from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>민지의 다이어리</div>
        </div>
      </header>
      
      <div className={styles.gap}></div>
      
      <section className={styles.banner}>
        <div className={styles.bannerImage}></div>
      </section>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        <div className={styles.navTabs}>
          <div className={styles.tabActive}>일기보관함</div>
          <div className={styles.tabInactive}>사진보관함</div>
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
