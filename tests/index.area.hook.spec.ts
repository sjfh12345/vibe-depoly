import { test, expect } from '@playwright/test';

test.describe('Layout Area Visibility', () => {
  test.describe('공개 페이지 - /diaries', () => {
    test('모든 영역이 표시되어야 함', async ({ page }) => {
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout-container"]');

      // Header 영역 표시 확인
      const header = page.locator('[data-testid="layout-header"]');
      await expect(header).toBeVisible();

      // Logo 표시 확인
      const logo = page.locator('[data-testid="layout-logo"]');
      await expect(logo).toBeVisible();

      // Banner 영역 표시 확인
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).toBeVisible();

      // Navigation 영역 표시 확인
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).toBeVisible();

      // Footer 영역 표시 확인
      const footer = page.locator('[data-testid="layout-footer"]');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('일기 상세 페이지 - /diaries/1', () => {
    test('header와 footer만 표시되어야 함', async ({ page }) => {
      await page.goto('/diaries/1');
      await page.waitForSelector('[data-testid="layout-container"]');

      // Header 영역 표시 확인
      const header = page.locator('[data-testid="layout-header"]');
      await expect(header).toBeVisible();

      // Logo 표시 확인
      const logo = page.locator('[data-testid="layout-logo"]');
      await expect(logo).toBeVisible();

      // Banner 영역 숨김 확인
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).not.toBeVisible();

      // Navigation 영역 숨김 확인
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).not.toBeVisible();

      // Footer 영역 표시 확인
      const footer = page.locator('[data-testid="layout-footer"]');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('로그인 페이지 - /auth/login', () => {
    test.skip('모든 영역이 숨겨져야 함', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForSelector('[data-testid="layout-container"]');

      // Header 영역 숨김 확인
      const header = page.locator('[data-testid="layout-header"]');
      await expect(header).not.toBeVisible();

      // Banner 영역 숨김 확인
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).not.toBeVisible();

      // Navigation 영역 숨김 확인
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).not.toBeVisible();

      // Footer 영역 숨김 확인
      const footer = page.locator('[data-testid="layout-footer"]');
      await expect(footer).not.toBeVisible();
    });
  });

  test.describe('회원가입 페이지 - /auth/signup', () => {
    test.skip('모든 영역이 숨겨져야 함', async ({ page }) => {
      await page.goto('/auth/signup');
      await page.waitForSelector('[data-testid="layout-container"]');

      // Header 영역 숨김 확인
      const header = page.locator('[data-testid="layout-header"]');
      await expect(header).not.toBeVisible();

      // Banner 영역 숨김 확인
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).not.toBeVisible();

      // Navigation 영역 숨김 확인
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).not.toBeVisible();

      // Footer 영역 숨김 확인
      const footer = page.locator('[data-testid="layout-footer"]');
      await expect(footer).not.toBeVisible();
    });
  });

  test.describe('사진보관함 페이지 - /pictures', () => {
    test.skip('모든 영역이 표시되어야 함', async ({ page }) => {
      await page.goto('/pictures');
      await page.waitForSelector('[data-testid="layout-container"]');

      // Header 영역 표시 확인
      const header = page.locator('[data-testid="layout-header"]');
      await expect(header).toBeVisible();

      // Logo 표시 확인
      const logo = page.locator('[data-testid="layout-logo"]');
      await expect(logo).toBeVisible();

      // Banner 영역 표시 확인
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).toBeVisible();

      // Navigation 영역 표시 확인
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).toBeVisible();

      // Footer 영역 표시 확인
      const footer = page.locator('[data-testid="layout-footer"]');
      await expect(footer).toBeVisible();
    });
  });
});


