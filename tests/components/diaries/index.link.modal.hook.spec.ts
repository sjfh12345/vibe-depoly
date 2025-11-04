import { test, expect } from '@playwright/test';

test.describe('Diaries - Link Modal Hook', () => {
  test('일기쓰기 버튼 클릭 시 모달이 열린다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-page-content"]');
    
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diary-new-button"]');
    
    // 모달이 표시되는지 확인 (modal provider의 overlay 확인)
    const modalOverlay = page.locator('[role="dialog"]');
    await expect(modalOverlay).toBeVisible();
    
    // 모달 안의 제목 텍스트가 표시되는지 확인 (heading role 사용)
    await expect(page.getByRole('heading', { name: '일기 쓰기' })).toBeVisible();
    
    // 모달 닫기 버튼 확인
    const closeButton = page.locator('[aria-label="닫기"]');
    await expect(closeButton).toBeVisible();
  });

  test('모달 배경 클릭 시 모달이 닫힌다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-page-content"]');
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.click('[data-testid="diary-new-button"]');
    
    // 모달이 열렸는지 확인
    const modalOverlay = page.locator('[role="dialog"]');
    await expect(modalOverlay).toBeVisible();
    
    // 모달 배경 클릭 (overlay 자체를 클릭)
    await modalOverlay.click({ position: { x: 100, y: 100 } });
    
    // 모달이 닫혔는지 확인
    await expect(modalOverlay).not.toBeVisible();
  });

  test('ESC 키 입력 시 모달이 닫힌다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-page-content"]');
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.click('[data-testid="diary-new-button"]');
    
    // 모달이 열렸는지 확인
    const modalOverlay = page.locator('[role="dialog"]');
    await expect(modalOverlay).toBeVisible();
    
    // ESC 키 입력
    await page.keyboard.press('Escape');
    
    // 모달이 닫혔는지 확인
    await expect(modalOverlay).not.toBeVisible();
  });

  test('모달 내부 닫기 버튼 클릭 시 모달이 닫힌다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-page-content"]');
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.click('[data-testid="diary-new-button"]');
    
    // 모달이 열렸는지 확인
    const modalOverlay = page.locator('[role="dialog"]');
    await expect(modalOverlay).toBeVisible();
    
    // 모달 내부의 닫기 버튼 클릭 (data-testid 사용)
    await page.click('[data-testid="diary-close-button"]');
    
    // 취소 확인 모달이 열렸는지 확인
    await page.waitForSelector('[data-testid="diary-cancel-modal-title"]');
    
    // 취소 모달에서 "등록 취소" 버튼 클릭
    await page.click('button:has-text("등록 취소")');
    
    // 모달이 닫혔는지 확인
    await expect(modalOverlay).not.toBeVisible();
  });
});

