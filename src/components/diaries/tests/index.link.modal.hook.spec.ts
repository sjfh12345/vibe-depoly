import { test, expect } from '@playwright/test';

test.describe('Diaries Modal Link Test', () => {
  test.describe('일기쓰기 모달 열기', () => {
    test('일기쓰기 버튼 클릭시 모달이 열려야 함', async ({ page }) => {
      await page.goto('/diaries');
      
      // 페이지 로드 확인
      await page.waitForSelector('[data-testid="diaries-write-button"]');
      
      // 모달이 닫혀있는지 확인
      const modalOverlay = page.locator('div[role="dialog"]');
      await expect(modalOverlay).not.toBeVisible();
      
      // 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diaries-write-button"]');
      await writeButton.click();
      
      // 모달이 열렸는지 확인
      await expect(modalOverlay).toBeVisible({ timeout: 500 });
      
      // 모달 타이틀 확인
      const modalTitle = page.locator('h2:has-text("일기쓰기")');
      await expect(modalTitle).toBeVisible();
    });
    
    test('모달의 닫기 버튼 클릭시 모달이 닫혀야 함', async ({ page }) => {
      await page.goto('/diaries');
      
      // 페이지 로드 확인
      await page.waitForSelector('[data-testid="diaries-write-button"]');
      
      // 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diaries-write-button"]');
      await writeButton.click();
      
      // 모달 열림 확인
      const modalOverlay = page.locator('div[role="dialog"]');
      await expect(modalOverlay).toBeVisible({ timeout: 500 });
      
      // 닫기 버튼 찾기 및 클릭
      const closeButton = modalOverlay.locator('button[aria-label="닫기"]');
      await closeButton.click();
      
      // 모달이 닫혔는지 확인
      await expect(modalOverlay).not.toBeVisible({ timeout: 500 });
    });
    
    test('모달 오버레이 클릭시 모달이 닫혀야 함', async ({ page }) => {
      await page.goto('/diaries');
      
      // 페이지 로드 확인
      await page.waitForSelector('[data-testid="diaries-write-button"]');
      
      // 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diaries-write-button"]');
      await writeButton.click();
      
      // 모달 열림 확인
      const modalOverlay = page.locator('div[role="dialog"]');
      await expect(modalOverlay).toBeVisible({ timeout: 500 });
      
      // 모달 오버레이 클릭 (모달 내용이 아닌 배경)
      await modalOverlay.click({ position: { x: 0, y: 0 } });
      
      // 모달이 닫혔는지 확인
      await expect(modalOverlay).not.toBeVisible({ timeout: 500 });
    });
  });
});


