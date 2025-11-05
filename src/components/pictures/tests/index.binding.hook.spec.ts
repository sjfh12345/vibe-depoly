import { test, expect } from '@playwright/test';

/**
 * 테스트 케이스 1: 페이지 접속 시 강아지 목록 조회 API 요청 성공
 * 
 * 테스트 목적:
 * 1. 페이지 접속 시 강아지 목록 조회 API를 요청하는지 검증
 * 2. API 응답으로 받은 이미지 주소에 "dog.ceo"가 포함되어 있는지 검증
 * 3. 6개의 강아지 이미지가 표시되는지 검증
 * 
 * 테스트 흐름:
 * 1) /pictures 페이지로 이동
 * 2) 페이지 로드 대기 (data-testid 사용)
 * 3) API 응답 대기 (network 통신)
 * 4) 강아지 이미지들이 올바르게 표시되는지 확인
 */
test('페이지 접속 시 강아지 목록 조회 API 요청 성공', async ({ page }) => {
  // /pictures 페이지로 이동
  await page.goto('/pictures');

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인
  await page.waitForSelector('[data-testid="pictures-page-content"]', { timeout: 2000 });

  // API 응답 대기 (강아지 목록 조회 API)
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('dog.ceo/api/breeds/image/random/6'),
    { timeout: 2000 }
  );

  // 응답 대기
  const response = await responsePromise;
  
  // 응답 상태 확인
  expect(response.status()).toBe(200);

  // 응답 데이터 확인
  const responseData = await response.json();
  expect(responseData).toHaveProperty('message');
  expect(responseData.message).toBeInstanceOf(Array);
  expect(responseData.message).toHaveLength(6);

  // 모든 이미지 주소에 "dog.ceo"가 포함되어 있는지 확인
  responseData.message.forEach((imageUrl: string) => {
    expect(imageUrl).toContain('dog.ceo');
  });

  // 강아지 이미지들이 화면에 표시되는지 확인
  const pictureItems = page.locator('[data-testid^="picture-item-"]');
  await expect(pictureItems).toHaveCount(6, { timeout: 2000 });
});

/**
 * 테스트 케이스 2: 무한스크롤 동작 - 스크롤 시 추가 강아지 요청
 * 
 * 테스트 목적:
 * 1. 스크롤이 마지막 2마리의 강아지만 남겨놓은 상태에서 추가 요청이 발생하는지 검증
 * 2. 추가 요청으로 받은 강아지 이미지가 기존 목록에 추가되는지 검증
 * 
 * 테스트 흐름:
 * 1) /pictures 페이지로 이동
 * 2) 페이지 로드 대기
 * 3) 초기 6개 강아지 이미지 로드 확인
 * 4) 스크롤을 마지막 2마리만 남기도록 이동
 * 5) 추가 API 요청 발생 확인
 * 6) 총 12개의 강아지 이미지가 표시되는지 확인
 */
test('무한스크롤 동작 - 스크롤 시 추가 강아지 요청', async ({ page }) => {
  // /pictures 페이지로 이동
  await page.goto('/pictures');

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="pictures-page-content"]', { timeout: 2000 });

  // 초기 API 응답 대기
  await page.waitForResponse(
    (response) => response.url().includes('dog.ceo/api/breeds/image/random/6'),
    { timeout: 2000 }
  );

  // 초기 6개 강아지 이미지 확인
  const initialPictureItems = page.locator('[data-testid^="picture-item-"]');
  await expect(initialPictureItems).toHaveCount(6, { timeout: 2000 });

  // 추가 API 요청 대기
  const additionalResponsePromise = page.waitForResponse(
    (response) => response.url().includes('dog.ceo/api/breeds/image/random/6'),
    { timeout: 2000 }
  );

  // 스크롤을 마지막 2마리만 남기도록 이동 (4번째 항목까지 스크롤)
  const fourthItem = initialPictureItems.nth(3);
  
  // 4번째 항목까지 스크롤
  await fourthItem.scrollIntoViewIfNeeded();
  
  // 추가 요청 발생 대기
  await additionalResponsePromise;

  // 총 12개의 강아지 이미지가 표시되는지 확인
  const allPictureItems = page.locator('[data-testid^="picture-item-"]');
  await expect(allPictureItems).toHaveCount(12, { timeout: 2000 });
});

/**
 * 테스트 케이스 3: API 요청 실패 시나리오
 * 
 * 테스트 목적:
 * 1. API 요청이 실패했을 때 적절히 처리되는지 검증
 * 
 * 테스트 흐름:
 * 1) API 요청을 모킹하여 실패 응답 반환
 * 2) /pictures 페이지로 이동
 * 3) 페이지 로드 대기
 * 4) 에러 상태 확인
 */
test('API 요청 실패 시나리오', async ({ page }) => {
  // API 요청 모킹 - 실패 응답
  await page.route('https://dog.ceo/api/breeds/image/random/6', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'error', message: 'Internal Server Error' }),
    });
  });

  // /pictures 페이지로 이동
  await page.goto('/pictures');

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="pictures-page-content"]');

  // API 요청이 실패했으므로, 스플래시 스크린이 계속 표시되거나 에러 상태가 되어야 함
  // isLoading이 true이면 스플래시 스크린이 표시되어야 함
  // 또는 에러 상태로 인해 이미지가 표시되지 않아야 함
  const pictureItems = page.locator('[data-testid^="picture-item-"]');
  
  // 에러 발생 시 이미지가 표시되지 않아야 함 (isLoading이 계속 true이거나 에러 상태)
  // 일정 시간 후에도 이미지가 표시되지 않는지 확인
  await expect(pictureItems).toHaveCount(0);
});

