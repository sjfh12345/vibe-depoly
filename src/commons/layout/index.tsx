'use client';

import React from 'react';
import styles from './styles.module.css';
import { useLayoutRouting } from './hooks/index.link.routing.hook';
import { useLayoutArea } from './hooks/index.area.hook';
import { useLayoutAuth } from './hooks/index.auth.hook';
import Button from '../components/button';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { navigateToDiaries, navigateToPictures, isDiariesActive, isPicturesActive } = useLayoutRouting();
  const { showHeader, showLogo, showBanner, showNavigation, showFooter } = useLayoutArea();
  const { isLoggedIn, user, login, logout } = useLayoutAuth();

  return (
    <div className={styles.container} data-testid="layout-container">
      {showHeader && (
        <header className={styles.header} data-testid="layout-header">
          <div className={styles.headerContent}>
            {showLogo && (
              <div className={styles.logo} onClick={navigateToDiaries} data-testid="layout-logo">
                민지의 다이어리
              </div>
            )}
            {isLoggedIn && user ? (
              <div className={styles.authStatus} data-testid="layout-auth-status">
                <span className={styles.userName} data-testid="layout-user-name">{user.name}</span>
                <Button 
                  variant="secondary" 
                  size="medium" 
                  className={styles.logoutButton}
                  onClick={logout}
                  data-testid="layout-logout-button"
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="medium" 
                className={styles.loginButton}
                onClick={login}
                data-testid="layout-login-button"
              >
                로그인
              </Button>
            )}
          </div>
        </header>
      )}
      
      {showHeader && <div className={styles.gap}></div>}
      
      {showBanner && (
        <>
          <section className={styles.banner} data-testid="layout-banner">
            <div className={styles.bannerImage}></div>
          </section>
          <div className={styles.gap}></div>
        </>
      )}
      
      {showNavigation && (
        <nav className={styles.navigation} data-testid="layout-navigation">
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
      )}
      
      <main className={styles.main}>
        <div className={styles.mainContent}>
          {children}
        </div>
      </main>
      
      {showFooter && (
        <footer className={styles.footer} data-testid="layout-footer">
          <div className={styles.footerContent}>
            <div className={styles.footerTitle}>민지의 다이어리</div>
            <div className={styles.footerInfo}>대표 : 홍길동</div>
            <div className={styles.footerCopyright}>Copyright © 2024. 홍길동 Co., Ltd.</div>
          </div>
        </footer>
      )}
    </div>
  );
}
