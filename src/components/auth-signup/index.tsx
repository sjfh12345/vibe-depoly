'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Input from '../../commons/components/input';
import Button from '../../commons/components/button';
import { useTheme } from 'next-themes';
import { useSignupForm } from './hooks/index.form.hook';
import { RouteType, getRoutePath } from '../../commons/constants/url';
import styles from './styles.module.css';

export default function AuthSignup() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { register, onSubmit, errors, isFormValid, isLoading } = useSignupForm();

  useEffect(() => {
    const currentTheme = theme ?? resolvedTheme;

    if (currentTheme !== 'light') {
      setTheme('light');
    }
  }, [theme, resolvedTheme, setTheme]);

  return (
    <section className={styles.wrapper} data-testid="auth-signup-section">
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>회원가입</h2>
          <p className={styles.formSubtitle}>
            몇 가지 정보만 입력하면 새로운 감정 관리 여정이 시작됩니다.
          </p>
        </div>

        <form className={styles.form} onSubmit={onSubmit} aria-label="회원가입 폼">
          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-name">
              이름
            </label>
            <Input
              id="signup-name"
              {...register('name')}
              placeholder="강아지를 사랑하는 이름으로 불러드릴게요."
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="signup-name-input"
            />
            {errors.name && (
              <span style={{ color: 'var(--red-50)', fontSize: 'var(--body03-m-font-size)' }}>
                {errors.name.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-email">
              이메일
            </label>
            <Input
              id="signup-email"
              {...register('email')}
              type="email"
              placeholder="이메일을 입력해주세요."
              autoComplete="email"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="signup-email-input"
            />
            {errors.email && (
              <span style={{ color: 'var(--red-50)', fontSize: 'var(--body03-m-font-size)' }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-password">
              비밀번호
            </label>
            <Input
              id="signup-password"
              {...register('password')}
              type="password"
              placeholder="8자 이상의 비밀번호를 설정해주세요."
              autoComplete="new-password"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="signup-password-input"
            />
            {errors.password && (
              <span style={{ color: 'var(--red-50)', fontSize: 'var(--body03-m-font-size)' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-password-confirm">
              비밀번호 재입력
            </label>
            <Input
              id="signup-password-confirm"
              {...register('passwordConfirm')}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              autoComplete="new-password"
              variant="primary"
              size="medium"
              className={styles.inputWidth}
              data-testid="signup-password-confirm-input"
            />
            {errors.passwordConfirm && (
              <span style={{ color: 'var(--red-50)', fontSize: 'var(--body03-m-font-size)' }}>
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className={styles.buttonWidth}
            disabled={!isFormValid || isLoading}
            data-testid="signup-submit-button"
          >
            {isLoading ? '처리 중...' : '회원가입'}
          </Button>
        </form>

        <p className={styles.loginGuide}>
          이미 계정을 가지고 계신가요?{' '}
          <Link className={styles.loginLink} href={getRoutePath(RouteType.LOGIN)}>
            로그인하기
          </Link>
        </p>
      </div>
    </section>
  );
}

