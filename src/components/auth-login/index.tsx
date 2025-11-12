'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Input from '../../commons/components/input';
import Button from '../../commons/components/button';
import { useTheme } from 'next-themes';
import { useLoginForm } from './hooks/index.form.hook';
import { RouteType, getRoutePath } from '../../commons/constants/url';
import styles from './styles.module.css';

export default function AuthLogin() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { register, onSubmit, errors, isFormValid, isLoading } = useLoginForm();

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

        <form className={styles.form} onSubmit={onSubmit} aria-label="로그인 폼" autoComplete="off">
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">
              이메일
            </label>
            <Input
              id="login-email"
              {...register('email')}
              type="email"
              placeholder="이메일을 입력해주세요."
              autoComplete="off"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="login-email-input"
            />
            {errors.email && (
              <span style={{ color: 'var(--red-50)', fontSize: 'var(--body03-m-font-size)' }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">
              비밀번호
            </label>
            <Input
              id="login-password"
              {...register('password')}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="new-password"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="login-password-input"
            />
            {errors.password && (
              <span style={{ color: 'var(--red-50)', fontSize: 'var(--body03-m-font-size)' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className={styles.buttonWidth}
            disabled={!isFormValid || isLoading}
            data-testid="login-submit-button"
          >
            {isLoading ? '처리 중...' : '로그인'}
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

