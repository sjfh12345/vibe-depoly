import { test, expect } from '@playwright/test';

test.describe('Layout Link Routing', () => {
  test('로고 클릭 시 일기목록 페이지로 이동', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // 로고 클릭
    await page.click('[data-testid="layout-logo"]');
    
    // URL이 /diaries인지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test('일기보관함 클릭 시 일기목록 페이지로 이동', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // 일기보관함 클릭
    await page.click('[data-testid="layout-nav-diaries"]');
    
    // URL이 /diaries인지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 활성 탭 CSS 확인
    const diariesTab = page.locator('[data-testid="layout-nav-diaries"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
  });

  test.skip('사진보관함 클릭 시 사진목록 페이지로 이동', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // 사진보관함 클릭
    await page.click('[data-testid="layout-nav-pictures"]');
    
    // URL이 /pictures인지 확인
    await expect(page).toHaveURL('/pictures');
    
    // 활성 탭 CSS 확인
    const picturesTab = page.locator('[data-testid="layout-nav-pictures"]');
    await expect(picturesTab).toHaveClass(/tabActive/);
  });

  test('현재 페이지에 맞는 탭이 활성화되어 있는지 확인', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="layout-container"]');
    
    // 일기보관함 탭이 활성화되어 있는지 확인
    const diariesTab = page.locator('[data-testid="layout-nav-diaries"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 사진보관함 탭이 비활성화되어 있는지 확인
    const picturesTab = page.locator('[data-testid="layout-nav-pictures"]');
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });
});

