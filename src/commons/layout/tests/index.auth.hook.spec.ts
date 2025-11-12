import { test, expect } from '@playwright/test';

test.describe('Layout Auth Hook', () => {
  test('비로그인 유저 시나리오', async ({ page }) => {
    // 1. 비회원으로 /diaries에 접속하여 페이지 로드 확인
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout-container"]');

    // 2. layout의 로그인버튼 노출여부 확인
    const loginButton = page.locator('[data-testid="layout-login-button"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveText('로그인');

    // 3. 로그인버튼 클릭하여 /auth/login 페이지로 이동
    await loginButton.click();
    await page.waitForSelector('[data-testid="auth-login-section"]');
    await expect(page).toHaveURL('/auth/login');
  });

  test('로그인 유저 시나리오', async ({ page }) => {
    // 1. 비회원으로 /auth/login에 접속하여 페이지 로드 확인
    await page.goto('/auth/login');
    await page.waitForSelector('[data-testid="auth-login-section"]');

    // 2. 로그인시도
    // email: qq@qq.com
    // password: sjfh1532!
    await page.fill('[data-testid="login-email-input"]', 'qq@qq.com');
    await page.fill('[data-testid="login-password-input"]', 'sjfh1532!');
    
    // 폼 유효성 검사가 완료되고 버튼이 활성화될 때까지 대기
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // 3. 로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인
    // 모달의 확인 버튼 클릭 (모달이 나타날 때까지 대기)
    await page.waitForSelector('h2:has-text("로그인 완료")');
    // 확인 버튼 클릭 (텍스트로 찾기)
    await page.click('button:has-text("확인")');
    
    // /diaries 페이지 로드 확인
    await page.waitForSelector('[data-testid="layout-container"]');
    await expect(page).toHaveURL('/diaries');

    // auth.provider가 localStorage를 읽어와서 상태를 업데이트하도록 유도
    // focus 이벤트를 트리거하여 auth.provider의 상태 업데이트 유도
    await page.evaluate(() => {
      window.dispatchEvent(new Event('focus'));
    });

    // 4. layout에서 유저이름, 로그아웃버튼 노출여부 확인
    // auth-status가 나타날 때까지 직접 대기
    await page.waitForSelector('[data-testid="layout-auth-status"]');
    const authStatus = page.locator('[data-testid="layout-auth-status"]');
    await expect(authStatus).toBeVisible();
    
    // 유저이름이 표시되어 있는지 확인
    const userName = page.locator('[data-testid="layout-user-name"]');
    await expect(userName).toBeVisible();
    await expect(userName).not.toHaveText('');
    
    const logoutButton = page.locator('[data-testid="layout-logout-button"]');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toHaveText('로그아웃');

    // 5. 로그아웃버튼 클릭하여 /auth/login 페이지 로드 확인
    await logoutButton.click();
    await page.waitForSelector('[data-testid="auth-login-section"]');
    await expect(page).toHaveURL('/auth/login');

    // 6. /diaries에 접속하여 페이지 로드 확인
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout-container"]');

    // 7. layout에 로그인버튼 노출여부 확인
    const loginButton = page.locator('[data-testid="layout-login-button"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveText('로그인');
  });
});

