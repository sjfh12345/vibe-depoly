import { test, expect } from '@playwright/test';

/**
 * 테스트 케이스 1: 일기 카드 클릭 시 상세 페이지로 이동
 * 
 * 테스트 목적:
 * 1. 일기 카드를 클릭하면 url.ts에 정의된 경로로 이동하는지 검증
 * 2. 카드에 바인딩된 id를 사용하여 올바른 경로로 이동하는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 일기 데이터 설정
 * 2) /diaries 페이지로 이동
 * 3) 페이지 로드 대기 (data-testid 사용)
 * 4) 일기 카드 클릭
 * 5) 올바른 상세 페이지 경로로 이동했는지 확인
 */
test('일기 카드 클릭 시 상세 페이지로 이동', async ({ page }) => {
  // 먼저 페이지로 이동 (localStorage 접근을 위해)
  await page.goto('/diaries');

  // 로컬스토리지에 일기 데이터 설정
  await page.evaluate(() => {
    const diaries = [
      { 
        id: 1, 
        title: '첫 번째 일기', 
        content: '첫 번째 일기의 내용입니다.', 
        emotion: 'HAPPY', 
        createdAt: '2024-01-01T00:00:00.000Z' 
      },
      { 
        id: 2, 
        title: '두 번째 일기', 
        content: '두 번째 일기의 내용입니다.', 
        emotion: 'SAD', 
        createdAt: '2024-01-02T00:00:00.000Z' 
      },
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 새로고침하여 hook이 데이터를 로드하도록 함
  await page.reload();

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인
  await page.waitForSelector('[data-testid="diaries-page-content"]');

  // 일기 카드들 확인
  const diaryCards = page.locator('[class*="diaryCard"]');
  await expect(diaryCards).toHaveCount(2);

  // 첫 번째 일기 카드 클릭 (id: 1)
  const firstCard = diaryCards.first();
  await firstCard.click();

  // URL이 /diaries/1인지 확인
  await expect(page).toHaveURL('/diaries/1');
});

/**
 * 테스트 케이스 2: 여러 일기 카드 중 특정 카드 클릭 시 올바른 경로로 이동
 * 
 * 테스트 목적:
 * 1. 여러 일기 카드 중 특정 카드를 클릭했을 때 올바른 id로 이동하는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 여러 일기 데이터 설정
 * 2) /diaries 페이지로 이동
 * 3) 페이지 로드 대기
 * 4) 두 번째 일기 카드 클릭
 * 5) 올바른 상세 페이지 경로로 이동했는지 확인
 */
test('여러 일기 카드 중 특정 카드 클릭 시 올바른 경로로 이동', async ({ page }) => {
  // 먼저 페이지로 이동 (localStorage 접근을 위해)
  await page.goto('/diaries');

  // 로컬스토리지에 일기 데이터 설정
  await page.evaluate(() => {
    const diaries = [
      { 
        id: 10, 
        title: '첫 번째 일기', 
        content: '첫 번째 일기의 내용입니다.', 
        emotion: 'HAPPY', 
        createdAt: '2024-01-01T00:00:00.000Z' 
      },
      { 
        id: 20, 
        title: '두 번째 일기', 
        content: '두 번째 일기의 내용입니다.', 
        emotion: 'SAD', 
        createdAt: '2024-01-02T00:00:00.000Z' 
      },
      { 
        id: 30, 
        title: '세 번째 일기', 
        content: '세 번째 일기의 내용입니다.', 
        emotion: 'ANGRY', 
        createdAt: '2024-01-03T00:00:00.000Z' 
      },
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 새로고침하여 hook이 데이터를 로드하도록 함
  await page.reload();

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]');

  // 일기 카드들 확인
  const diaryCards = page.locator('[class*="diaryCard"]');
  await expect(diaryCards).toHaveCount(3);

  // 두 번째 일기 카드 클릭 (id: 20)
  const secondCard = diaryCards.nth(1);
  await secondCard.click();

  // URL이 /diaries/20인지 확인
  await expect(page).toHaveURL('/diaries/20');
});

/**
 * 테스트 케이스 3: 삭제 아이콘 클릭 시 페이지 이동하지 않음
 * 
 * 테스트 목적:
 * 1. 삭제 아이콘을 클릭했을 때 페이지가 이동하지 않는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 일기 데이터 설정
 * 2) /diaries 페이지로 이동
 * 3) 페이지 로드 대기
 * 4) 삭제 아이콘 클릭
 * 5) 현재 페이지(/diaries)에 머물러 있는지 확인
 */
test('삭제 아이콘 클릭 시 페이지 이동하지 않음', async ({ page }) => {
  // 먼저 페이지로 이동 (localStorage 접근을 위해)
  await page.goto('/diaries');

  // 로컬스토리지에 일기 데이터 설정
  await page.evaluate(() => {
    const diaries = [
      { 
        id: 1, 
        title: '첫 번째 일기', 
        content: '첫 번째 일기의 내용입니다.', 
        emotion: 'HAPPY', 
        createdAt: '2024-01-01T00:00:00.000Z' 
      },
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 새로고침하여 hook이 데이터를 로드하도록 함
  await page.reload();

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]');

  // 일기 카드 확인
  const diaryCards = page.locator('[class*="diaryCard"]');
  await expect(diaryCards).toHaveCount(1);

  // 삭제 아이콘 클릭
  const closeIcon = page.locator('[class*="closeIcon"]').first();
  await closeIcon.click();

  // URL이 여전히 /diaries인지 확인 (페이지 이동하지 않음)
  await expect(page).toHaveURL('/diaries');
});

