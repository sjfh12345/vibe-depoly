'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Input from '../../commons/components/input';
import Button from '../../commons/components/button';
import { useTheme } from 'next-themes';
import { RouteType, getRoutePath } from '../../commons/constants/url';
import styles from './styles.module.css';

export default function AuthLogin() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const currentTheme = theme ?? resolvedTheme;

    if (currentTheme !== 'light') {
      setTheme('light');
    }
  }, [theme, resolvedTheme, setTheme]);

  return (
    <section className={styles.wrapper} data-testid="auth-login-section">
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>로그인</h2>
          <p className={styles.formSubtitle}>
            감정 일기를 시작하기 위해 로그인해주세요.
          </p>
        </div>

        <form className={styles.form} aria-label="로그인 폼" autoComplete="off">
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">
              이메일
            </label>
            <Input
              id="login-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
              autoComplete="off"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="login-email-input"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">
              비밀번호
            </label>
            <Input
              id="login-password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              autoComplete="new-password"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="login-password-input"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className={styles.buttonWidth}
            data-testid="login-submit-button"
          >
            로그인
          </Button>
        </form>

        <p className={styles.signupGuide}>
          아직 계정이 없으신가요?{' '}
          <Link className={styles.signupLink} href={getRoutePath(RouteType.SIGNUP)}>
            회원가입하기
          </Link>
        </p>
      </div>
    </section>
  );
}

