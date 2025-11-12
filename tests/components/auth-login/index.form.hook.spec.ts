import { test, expect } from '@playwright/test';

test('모든 입력값이 유효하면 로그인 버튼이 활성화됨', async ({ page }) => {
  await page.goto('/auth/login');
  await page.waitForSelector('[data-testid="auth-login-section"]', { timeout: 5000 });

  const submitButton = page.locator('[data-testid="login-submit-button"]');
  await expect(submitButton).toBeDisabled({ timeout: 500 });

  await page.fill('[data-testid="login-email-input"]', 'a@aaa.com');
  await expect(submitButton).toBeDisabled({ timeout: 500 });

  await page.fill('[data-testid="login-password-input"]', '1234');
  await expect(submitButton).toBeEnabled({ timeout: 500 });
});

test('로그인 성공 시 성공 모달 표시 및 일기목록 페이지 이동', async ({ page }) => {
  await page.goto('/auth/login');
  await page.waitForSelector('[data-testid="auth-login-section"]', { timeout: 5000 });

  await page.fill('[data-testid="login-email-input"]', 'a@aaa.com');
  await page.fill('[data-testid="login-password-input"]', '1234');

  // loginUser API 응답 대기 설정
  const loginResponsePromise = page.waitForResponse(
    (response) => {
      const url = response.url();
      const postData = response.request().postData();
      return url.includes('/graphql') && !!postData && postData.includes('loginUser');
    },
    { timeout: 2000 }
  );

  await page.click('[data-testid="login-submit-button"]');

  // loginUser API 응답 대기
  const loginResponse = await loginResponsePromise;
  const loginBody = await loginResponse.json();

  // GraphQL 응답 구조 확인
  if (loginBody.errors && loginBody.errors.length > 0) {
    throw new Error(`API 에러: ${loginBody.errors[0]?.message || '알 수 없는 에러'}`);
  }

  // accessToken이 정상적으로 반환되는지 확인
  const accessToken = loginBody?.data?.loginUser?.accessToken;
  expect(accessToken).toBeTruthy();

  // fetchUserLoggedIn API 응답 대기 설정
  const userResponsePromise = page.waitForResponse(
    (response) => {
      const url = response.url();
      const postData = response.request().postData();
      return url.includes('/graphql') && !!postData && postData.includes('fetchUserLoggedIn');
    },
    { timeout: 2000 }
  );

  // fetchUserLoggedIn API 응답 대기
  const userResponse = await userResponsePromise;
  const userBody = await userResponse.json();

  // GraphQL 응답 구조 확인
  if (userBody.errors && userBody.errors.length > 0) {
    throw new Error(`API 에러: ${userBody.errors[0]?.message || '알 수 없는 에러'}`);
  }

  // _id와 name이 정상적으로 반환되는지 확인
  const userId = userBody?.data?.fetchUserLoggedIn?._id;
  const userName = userBody?.data?.fetchUserLoggedIn?.name;
  expect(userId).toBeTruthy();
  expect(userName).toBeTruthy();

  // 로컬스토리지 확인
  const storedAccessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
  expect(storedAccessToken).toBeTruthy();
  expect(storedAccessToken).toBe(accessToken);

  const storedUser = await page.evaluate(() => localStorage.getItem('user'));
  expect(storedUser).toBeTruthy();
  const parsedUser = JSON.parse(storedUser || '{}');
  expect(parsedUser._id).toBe(userId);
  expect(parsedUser.name).toBe(userName);

  // 로그인 완료 모달 표시 확인
  await page.waitForSelector('h2:has-text("로그인 완료")', { timeout: 2000 });
  await expect(page.locator('p:has-text("로그인에 성공했습니다.")')).toBeVisible({ timeout: 500 });

  // 확인 버튼 클릭
  await page.click('button:has-text("확인")');

  // 일기목록 페이지로 이동 확인
  await page.waitForURL('**/diaries', { timeout: 2000 });
  await expect(page.locator('h2:has-text("로그인 완료")')).not.toBeVisible({ timeout: 500 });
});

test('로그인 실패 시 실패 모달 표시 및 닫힘', async ({ page }) => {
  await page.route('https://main-practice.codebootcamp.co.kr/graphql', async (route) => {
    const request = route.request();
    const postData = request.postData();
    if (postData && postData.includes('loginUser')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [{ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }],
        }),
      });
      return;
    }

    await route.continue();
  });

  await page.goto('/auth/login');
  await page.waitForSelector('[data-testid="auth-login-section"]', { timeout: 5000 });

  await page.fill('[data-testid="login-email-input"]', 'wrong@example.com');
  await page.fill('[data-testid="login-password-input"]', 'wrongpassword');

  await page.click('[data-testid="login-submit-button"]');

  // 로그인 실패 모달 표시 확인
  await page.waitForSelector('h2:has-text("로그인 실패")', { timeout: 2000 });
  await expect(
    page.locator('p:has-text("이메일 또는 비밀번호가 올바르지 않습니다.")')
  ).toBeVisible({ timeout: 500 });

  // 확인 버튼 클릭
  await page.click('button:has-text("확인")');

  // 모달이 닫혔는지 확인
  await expect(page.locator('h2:has-text("로그인 실패")')).not.toBeVisible({ timeout: 500 });
  expect(page.url()).toContain('/auth/login');
});

