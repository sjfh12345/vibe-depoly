import { test, expect } from '@playwright/test';

/**
 * 테스트 케이스 1: 모든 인풋이 입력되면 등록하기 버튼이 활성화됨
 * 
 * 테스트 목적:
 * 1. 감정, 제목, 내용이 모두 입력되면 등록하기 버튼이 활성화되는지 검증
 * 2. 하나라도 입력되지 않으면 등록하기 버튼이 비활성화되는지 검증
 * 
 * 테스트 흐름:
 * 1) 다이어리 페이지 이동 및 로드 확인
 * 2) 일기쓰기 버튼 클릭 및 모달 표시 확인
 * 3) 등록하기 버튼이 비활성화되어 있는지 확인
 * 4) 감정 선택 후 등록하기 버튼이 여전히 비활성화되어 있는지 확인
 * 5) 제목 입력 후 등록하기 버튼이 여전히 비활성화되어 있는지 확인
 * 6) 내용 입력 후 등록하기 버튼이 활성화되는지 확인
 */
test('모든 인풋이 입력되면 등록하기 버튼이 활성화됨', async ({ page }) => {
  // 페이지 이동
  await page.goto('/diaries');

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 500 });

  // 일기쓰기 버튼 클릭
  await page.click('[data-testid="diary-new-button"]');

  // 일기쓰기 폼 모달 표시 대기
  await page.waitForSelector('h2:has-text("일기 쓰기")', { timeout: 500 });

  // 등록하기 버튼이 비활성화되어 있는지 확인
  const submitButton = page.locator('[data-testid="diary-submit-button"]');
  await expect(submitButton).toBeDisabled();

  // 감정 선택 (첫 번째 감정)
  const firstEmotion = page.locator('[data-testid="emotion-happy"]');
  await firstEmotion.click();

  // 등록하기 버튼이 여전히 비활성화되어 있는지 확인
  await expect(submitButton).toBeDisabled();

  // 제목 입력
  const titleInput = page.locator('[data-testid="diary-title-input"]');
  await titleInput.fill('테스트 제목');

  // 등록하기 버튼이 여전히 비활성화되어 있는지 확인
  await expect(submitButton).toBeDisabled();

  // 내용 입력
  const contentTextarea = page.locator('[data-testid="diary-content-textarea"]');
  await contentTextarea.fill('테스트 내용');

  // 등록하기 버튼이 활성화되는지 확인
  await expect(submitButton).toBeEnabled();
});

/**
 * 테스트 케이스 2: 등록하기 버튼 클릭 시 일기가 로컬스토리지에 저장되고 등록 완료 모달이 표시됨
 * 
 * 테스트 목적:
 * 1. 등록하기 버튼 클릭 시 일기가 로컬스토리지에 저장되는지 검증
 * 2. 등록 완료 모달이 표시되는지 검증
 * 
 * 테스트 흐름:
 * 1) 다이어리 페이지 이동 및 로드 확인
 * 2) 일기쓰기 버튼 클릭 및 모달 표시 확인
 * 3) 모든 필드 입력 (감정, 제목, 내용)
 * 4) 로컬스토리지 초기화
 * 5) 등록하기 버튼 클릭
 * 6) 로컬스토리지에 일기가 저장되었는지 확인
 * 7) 등록 완료 모달이 표시되는지 확인
 */
test('등록하기 버튼 클릭 시 일기가 로컬스토리지에 저장되고 등록 완료 모달이 표시됨', async ({ page }) => {
  // 페이지 이동
  await page.goto('/diaries');

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 500 });

  // 로컬스토리지 초기화
  await page.evaluate(() => {
    localStorage.removeItem('diaries');
  });

  // 일기쓰기 버튼 클릭
  await page.click('[data-testid="diary-new-button"]');

  // 일기쓰기 폼 모달 표시 대기
  await page.waitForSelector('h2:has-text("일기 쓰기")', { timeout: 500 });

  // 감정 선택 (첫 번째 감정)
  const firstEmotion = page.locator('[data-testid="emotion-happy"]');
  await firstEmotion.click();

  // 제목 입력
  const titleInput = page.locator('[data-testid="diary-title-input"]');
  await titleInput.fill('테스트 제목');

  // 내용 입력
  const contentTextarea = page.locator('[data-testid="diary-content-textarea"]');
  await contentTextarea.fill('테스트 내용');

  // 등록하기 버튼 클릭
  const submitButton = page.locator('[data-testid="diary-submit-button"]');
  await submitButton.click();

  // 로컬스토리지에 일기가 저장되었는지 확인
  const diaries = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('diaries') || '[]');
  });

  expect(diaries).toHaveLength(1);
  expect(diaries[0]).toHaveProperty('id', 1);
  expect(diaries[0]).toHaveProperty('title', '테스트 제목');
  expect(diaries[0]).toHaveProperty('content', '테스트 내용');
  expect(diaries[0]).toHaveProperty('emotion', 'HAPPY');
  expect(diaries[0]).toHaveProperty('createdAt');

  // 등록 완료 모달이 표시되는지 확인
  await page.waitForSelector('h2:has-text("일기 등록 완료")', { timeout: 500 });
  await expect(page.locator('p:has-text("일기가 성공적으로 등록되었습니다.")')).toBeVisible();
});

/**
 * 테스트 케이스 3: 등록 완료 모달의 확인 버튼 클릭 시 상세 페이지로 이동하고 모든 모달이 닫힘
 * 
 * 테스트 목적:
 * 1. 등록 완료 모달의 확인 버튼 클릭 시 일기 상세 페이지로 이동하는지 검증
 * 2. 모든 모달이 닫히는지 검증
 * 
 * 테스트 흐름:
 * 1) 다이어리 페이지 이동 및 로드 확인
 * 2) 일기쓰기 버튼 클릭 및 모달 표시 확인
 * 3) 모든 필드 입력 (감정, 제목, 내용)
 * 4) 등록하기 버튼 클릭
 * 5) 등록 완료 모달 표시 확인
 * 6) 확인 버튼 클릭
 * 7) 상세 페이지로 이동하는지 확인
 * 8) 모든 모달이 닫혔는지 확인
 */
test('등록 완료 모달의 확인 버튼 클릭 시 상세 페이지로 이동하고 모든 모달이 닫힘', async ({ page }) => {
  // 페이지 이동
  await page.goto('/diaries');

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 500 });

  // 로컬스토리지 초기화
  await page.evaluate(() => {
    localStorage.removeItem('diaries');
  });

  // 일기쓰기 버튼 클릭
  await page.click('[data-testid="diary-new-button"]');

  // 일기쓰기 폼 모달 표시 대기
  await page.waitForSelector('h2:has-text("일기 쓰기")', { timeout: 500 });

  // 감정 선택 (첫 번째 감정)
  const firstEmotion = page.locator('[data-testid="emotion-happy"]');
  await firstEmotion.click();

  // 제목 입력
  const titleInput = page.locator('[data-testid="diary-title-input"]');
  await titleInput.fill('테스트 제목');

  // 내용 입력
  const contentTextarea = page.locator('[data-testid="diary-content-textarea"]');
  await contentTextarea.fill('테스트 내용');

  // 등록하기 버튼 클릭
  const submitButton = page.locator('[data-testid="diary-submit-button"]');
  await submitButton.click();

  // 등록 완료 모달이 표시되는지 확인
  await page.waitForSelector('h2:has-text("일기 등록 완료")', { timeout: 500 });

  // 확인 버튼 클릭
  const confirmButton = page.locator('button:has-text("확인")');
  await confirmButton.click();

  // 상세 페이지로 이동하는지 확인
  await page.waitForURL(/\/diaries\/\d+/, { timeout: 1999 });
  expect(page.url()).toMatch(/\/diaries\/1/);

  // 모든 모달이 닫혔는지 확인
  await expect(page.locator('[data-testid="diaries-new-title"]')).not.toBeVisible({ timeout: 1999 });
  await expect(page.locator('h2:has-text("일기 등록 완료")')).not.toBeVisible({ timeout: 1999 });
});

/**
 * 테스트 케이스 4: 기존 diaries가 있을 때 새로운 일기를 등록하면 ID가 최대 ID+1로 설정됨
 * 
 * 테스트 목적:
 * 1. 기존 diaries가 있을 때 새로운 일기를 등록하면 ID가 최대 ID+1로 설정되는지 검증
 * 
 * 테스트 흐름:
 * 1) 다이어리 페이지 이동 및 로드 확인
 * 2) 로컬스토리지에 기존 일기 데이터 설정
 * 3) 일기쓰기 버튼 클릭 및 모달 표시 확인
 * 4) 모든 필드 입력 (감정, 제목, 내용)
 * 5) 등록하기 버튼 클릭
 * 6) 로컬스토리지에 저장된 일기의 ID가 최대 ID+1인지 확인
 */
test('기존 diaries가 있을 때 새로운 일기를 등록하면 ID가 최대 ID+1로 설정됨', async ({ page }) => {
  // 페이지 이동
  await page.goto('/diaries');

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 500 });

  // 로컬스토리지에 기존 일기 데이터 설정
  await page.evaluate(() => {
    const existingDiaries = [
      { id: 1, title: '첫 번째 일기', content: '내용1', emotion: 'HAPPY', createdAt: '2024-01-01T00:00:00.000Z' },
      { id: 3, title: '세 번째 일기', content: '내용3', emotion: 'SAD', createdAt: '2024-01-03T00:00:00.000Z' },
      { id: 5, title: '다섯 번째 일기', content: '내용5', emotion: 'ANGRY', createdAt: '2024-01-05T00:00:00.000Z' },
    ];
    localStorage.setItem('diaries', JSON.stringify(existingDiaries));
  });

  // 일기쓰기 버튼 클릭
  await page.click('[data-testid="diary-new-button"]');

  // 일기쓰기 폼 모달 표시 대기
  await page.waitForSelector('h2:has-text("일기 쓰기")', { timeout: 500 });

  // 감정 선택 (첫 번째 감정)
  const firstEmotion = page.locator('[data-testid="emotion-happy"]');
  await firstEmotion.click();

  // 제목 입력
  const titleInput = page.locator('[data-testid="diary-title-input"]');
  await titleInput.fill('새로운 일기');

  // 내용 입력
  const contentTextarea = page.locator('[data-testid="diary-content-textarea"]');
  await contentTextarea.fill('새로운 내용');

  // 등록하기 버튼 클릭
  const submitButton = page.locator('[data-testid="diary-submit-button"]');
  await submitButton.click();

  // 로컬스토리지에 저장된 일기의 ID가 최대 ID+1인지 확인
  const diaries = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('diaries') || '[]');
  });

  expect(diaries).toHaveLength(4);
  const newDiary = diaries.find((d: { title: string }) => d.title === '새로운 일기');
  expect(newDiary).toHaveProperty('id', 6); // 최대 ID(5) + 1
});

