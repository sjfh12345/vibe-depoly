import { test, expect } from '@playwright/test';

/**
 * 일기쓰기 모달 인증 테스트
 * 
 * 일기쓰기 버튼 클릭 시 로그인 상태에 따라 다른 모달이 표시되는지 검증합니다.
 */

test.describe('Diaries Modal Link Auth Test', () => {
  test.describe('비로그인 유저', () => {
    /**
     * 테스트 케이스 1: 비로그인 유저가 일기쓰기 버튼 클릭 시 로그인 요청 모달 노출
     * 
     * 테스트 목적:
     * 1. 비로그인 상태에서 일기쓰기 버튼을 클릭했을 때 로그인 요청 모달이 표시되는지 검증
     * 2. 로그인 요청 모달의 타이틀과 내용이 올바른지 검증
     * 
     * 테스트 흐름:
     * 1) /diaries 페이지로 이동
     * 2) localStorage에서 accessToken 제거 및 window.__TEST_BYPASS__ = false 설정
     * 3) 페이지 새로고침하여 auth 상태 업데이트
     * 4) 페이지 로드 확인 (data-testid 사용)
     * 5) 일기쓰기 버튼 클릭
     * 6) 로그인 요청 모달 노출 확인
     * 7) 로그인 요청 모달 타이틀 및 내용 확인
     */
    test('일기쓰기 버튼 클릭시 로그인 요청 모달이 노출되어야 함', async ({ page }) => {
      // 먼저 페이지로 이동 (localStorage 접근을 위해)
      await page.goto('/diaries');
      
      // 비로그인 상태로 설정
      await page.evaluate(() => {
        // localStorage에서 accessToken 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // window.__TEST_BYPASS__ = false로 설정하여 가드 검사 수행
        (window as Window & { __TEST_BYPASS__?: boolean }).__TEST_BYPASS__ = false;
      });
      
      // 페이지 새로고침하여 auth 상태 업데이트
      await page.reload();
      
      // 페이지 로드 확인
      await page.waitForSelector('[data-testid="diaries-page-content"]');
      
      // 모달이 닫혀있는지 확인
      const modalOverlay = page.locator('div[role="dialog"]');
      await expect(modalOverlay).not.toBeVisible();
      
      // 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diary-new-button"]');
      await writeButton.click();
      
      // 로그인 요청 모달이 열렸는지 확인
      await expect(modalOverlay).toBeVisible();
      
      // 로그인 요청 모달 타이틀 확인
      const loginModalTitle = page.locator('h2:has-text("로그인 필요")');
      await expect(loginModalTitle).toBeVisible();
      
      // 로그인 요청 모달 내용 확인
      const loginModalContent = page.locator('p:has-text("로그인이 필요한 기능입니다. 로그인하시겠습니까?")');
      await expect(loginModalContent).toBeVisible();
    });
  });

  test.describe('로그인 유저', () => {
    /**
     * 테스트 케이스 2: 로그인 유저가 일기쓰기 버튼 클릭 시 일기쓰기 모달 노출
     * 
     * 테스트 목적:
     * 1. 로그인 상태에서 일기쓰기 버튼을 클릭했을 때 일기쓰기 모달이 표시되는지 검증
     * 2. 일기쓰기 모달의 타이틀이 올바른지 검증
     * 
     * 테스트 흐름:
     * 1) /diaries 페이지로 이동
     * 2) localStorage에 accessToken 설정
     * 3) 페이지 새로고침하여 auth 상태 업데이트
     * 4) 페이지 로드 확인 (data-testid 사용)
     * 5) 일기쓰기 버튼 클릭
     * 6) 일기쓰기 모달 노출 확인
     * 7) 일기쓰기 모달 타이틀 확인
     */
    test('일기쓰기 버튼 클릭시 일기쓰기 페이지 모달이 노출되어야 함', async ({ page }) => {
      // 먼저 페이지로 이동 (localStorage 접근을 위해)
      await page.goto('/diaries');
      
      // 로그인 상태로 설정
      await page.evaluate(() => {
        // localStorage에 accessToken 설정
        localStorage.setItem('accessToken', 'test-token');
        localStorage.setItem('user', JSON.stringify({ _id: '1', name: 'Test User' }));
        // window.__TEST_BYPASS__는 설정하지 않거나 true로 설정 (기본적으로 로그인 유저로 간주)
      });
      
      // 페이지 새로고침하여 auth 상태 업데이트
      await page.reload();
      
      // 페이지 로드 확인
      await page.waitForSelector('[data-testid="diaries-page-content"]');
      
      // 모달이 닫혀있는지 확인
      const modalOverlay = page.locator('div[role="dialog"]');
      await expect(modalOverlay).not.toBeVisible();
      
      // 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diary-new-button"]');
      await writeButton.click();
      
      // 일기쓰기 모달이 열렸는지 확인
      await expect(modalOverlay).toBeVisible();
      
      // 일기쓰기 모달 타이틀 확인
      const diaryWriteModalTitle = page.locator('[data-testid="diaries-new-title"]');
      await expect(diaryWriteModalTitle).toBeVisible();
      await expect(diaryWriteModalTitle).toHaveText('일기 쓰기');
    });
  });
});


