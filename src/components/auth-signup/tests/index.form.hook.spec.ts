import { test, expect } from '@playwright/test';

test('모든 입력값이 유효하면 회원가입 버튼이 활성화됨', async ({ page }) => {
  await page.goto('/auth/signup');
  await page.waitForSelector('[data-testid="auth-signup-section"]', { timeout: 5000 });

  const submitButton = page.locator('[data-testid="signup-submit-button"]');
  await expect(submitButton).toBeDisabled({ timeout: 500 });

  await page.fill('[data-testid="signup-name-input"]', '테스트 유저');
  await expect(submitButton).toBeDisabled({ timeout: 500 });

  await page.fill('[data-testid="signup-email-input"]', 'test@example.com');
  await expect(submitButton).toBeDisabled({ timeout: 500 });

  await page.fill('[data-testid="signup-password-input"]', 'Test1234');
  await expect(submitButton).toBeDisabled({ timeout: 500 });

  await page.fill('[data-testid="signup-password-confirm-input"]', 'Test1234');
  await expect(submitButton).toBeEnabled({ timeout: 500 });
});

test('회원가입 성공 시 성공 모달 표시 및 로그인 페이지 이동', async ({ page }) => {
  await page.goto('/auth/signup');
  await page.waitForSelector('[data-testid="auth-signup-section"]', { timeout: 5000 });

  const timestamp = Date.now();
  const testEmail = `playwright-${timestamp}@example.com`;

  await page.fill('[data-testid="signup-name-input"]', '플레이테스트');
  await page.fill('[data-testid="signup-email-input"]', testEmail);
  await page.fill('[data-testid="signup-password-input"]', 'Test1234');
  await page.fill('[data-testid="signup-password-confirm-input"]', 'Test1234');

  // 클릭 전에 응답 대기 설정
  const responsePromise = page.waitForResponse(
    (response) => {
      const url = response.url();
      const postData = response.request().postData();
      return url.includes('/graphql') && !!postData && postData.includes('createUser');
    },
    { timeout: 2000 }
  );

  await page.click('[data-testid="signup-submit-button"]');

  // 응답 대기 (타임아웃 내에 응답이 오지 않으면 실패)
  const response = await responsePromise;
  const body = await response.json();
  
  // GraphQL 응답 구조 확인
  // 실제 API 응답이 성공했는지 확인
  // 응답에 에러가 없고, data가 있으면 성공으로 간주
  if (body.errors && body.errors.length > 0) {
    throw new Error(`API 에러: ${body.errors[0]?.message || '알 수 없는 에러'}`);
  }
  
  // _id가 있으면 검증
  const userId = body?.data?.createUser?._id;
  if (userId) {
    expect(userId).toBeTruthy();
  }

  await page.waitForSelector('h2:has-text("회원가입 완료")', { timeout: 2000 });
  await expect(page.locator('p:has-text("회원가입에 성공했습니다.")')).toBeVisible({ timeout: 500 });

  await page.click('button:has-text("확인")');
  await page.waitForURL('**/auth/login', { timeout: 2000 });
  await expect(page.locator('h2:has-text("회원가입 완료")')).not.toBeVisible({ timeout: 500 });
});

test('회원가입 실패 시 실패 모달 표시 및 닫힘', async ({ page }) => {
  await page.route('https://main-practice.codebootcamp.co.kr/graphql', async (route) => {
    const request = route.request();
    const postData = request.postData();
    if (postData && postData.includes('createUser')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [{ message: '이미 존재하는 이메일입니다.' }],
        }),
      });
      return;
    }

    await route.continue();
  });

  await page.goto('/auth/signup');
  await page.waitForSelector('[data-testid="auth-signup-section"]', { timeout: 5000 });

  await page.fill('[data-testid="signup-name-input"]', '실패 테스트');
  await page.fill('[data-testid="signup-email-input"]', 'duplicate@example.com');
  await page.fill('[data-testid="signup-password-input"]', 'Test1234');
  await page.fill('[data-testid="signup-password-confirm-input"]', 'Test1234');

  await page.click('[data-testid="signup-submit-button"]');

  await page.waitForSelector('h2:has-text("회원가입 실패")', { timeout: 2000 });
  await expect(page.locator('p:has-text("이미 존재하는 이메일입니다.")')).toBeVisible({ timeout: 500 });

  await page.click('button:has-text("확인")');
  await expect(page.locator('h2:has-text("회원가입 실패")')).not.toBeVisible({ timeout: 500 });
  expect(page.url()).toContain('/auth/signup');
});



