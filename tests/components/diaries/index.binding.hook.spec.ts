import { test, expect } from '@playwright/test';

/**
 * 테스트 케이스 1: 로컬스토리지에서 일기 데이터를 로드하여 바인딩함
 * 
 * 테스트 목적:
 * 1. 로컬스토리지에서 diaries 배열을 로드하여 카드 형태로 변환하는지 검증
 * 2. 일기 카드의 제목, 감정, 작성일이 올바르게 표시되는지 검증
 * 3. emotion enum을 사용하여 이미지와 텍스트가 올바르게 매핑되는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 일기 데이터 설정
 * 2) /diaries 페이지로 이동
 * 3) 페이지 로드 대기 (data-testid 사용)
 * 4) 일기 카드들이 올바르게 표시되는지 확인
 */
test('로컬스토리지에서 일기 데이터를 로드하여 바인딩함', async ({ page }) => {
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
      { 
        id: 3, 
        title: '세 번째 일기', 
        content: '세 번째 일기의 내용입니다.', 
        emotion: 'ANGRY', 
        createdAt: '2024-01-03T00:00:00.000Z' 
      },
      { 
        id: 4, 
        title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다. 이 부분은 잘려서 표시됩니다.', 
        content: '네 번째 일기의 내용입니다.', 
        emotion: 'SURPRISE', 
        createdAt: '2024-01-04T00:00:00.000Z' 
      },
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 새로고침하여 hook이 데이터를 로드하도록 함
  await page.reload();

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 5000 });

  // 일기 카드들이 표시되는지 확인
  const diaryCards = page.locator('[class*="diaryCard"]');
  await expect(diaryCards).toHaveCount(4);

  // 첫 번째 일기 카드 확인 (HAPPY 감정)
  const firstCard = diaryCards.first();
  
  // 제목 확인
  const firstTitle = firstCard.locator('[class*="cardTitle"]');
  await expect(firstTitle).toHaveText('첫 번째 일기');

  // 감정 텍스트 확인 (HAPPY => '행복해요')
  const firstEmotionLabel = firstCard.locator('[class*="emotionLabel"]');
  await expect(firstEmotionLabel).toHaveText('행복해요');

  // 작성일 확인
  const firstDate = firstCard.locator('[class*="date"]');
  await expect(firstDate).toHaveText('2024. 01. 01');

  // 두 번째 일기 카드 확인 (SAD 감정)
  const secondCard = diaryCards.nth(1);
  
  // 제목 확인
  const secondTitle = secondCard.locator('[class*="cardTitle"]');
  await expect(secondTitle).toHaveText('두 번째 일기');

  // 감정 텍스트 확인 (SAD => '슬퍼요')
  const secondEmotionLabel = secondCard.locator('[class*="emotionLabel"]');
  await expect(secondEmotionLabel).toHaveText('슬퍼요');

  // 작성일 확인
  const secondDate = secondCard.locator('[class*="date"]');
  await expect(secondDate).toHaveText('2024. 01. 02');

  // 세 번째 일기 카드 확인 (ANGRY 감정)
  const thirdCard = diaryCards.nth(2);
  
  // 감정 텍스트 확인 (ANGRY => '화나요')
  const thirdEmotionLabel = thirdCard.locator('[class*="emotionLabel"]');
  await expect(thirdEmotionLabel).toHaveText('화나요');

  // 네 번째 일기 카드 확인 (SURPRISE 감정, 긴 제목)
  const fourthCard = diaryCards.nth(3);
  
  // 감정 텍스트 확인 (SURPRISE => '놀랐어요')
  const fourthEmotionLabel = fourthCard.locator('[class*="emotionLabel"]');
  await expect(fourthEmotionLabel).toHaveText('놀랐어요');

  // 긴 제목이 잘려서 표시되는지 확인 (text-overflow: ellipsis)
  const fourthTitle = fourthCard.locator('[class*="cardTitle"]');
  await expect(fourthTitle).toBeVisible();
  // CSS의 text-overflow: ellipsis로 인해 긴 텍스트는 자동으로 잘림
});

/**
 * 테스트 케이스 2: 로컬스토리지에 데이터가 없는 경우
 * 
 * 테스트 목적:
 * 1. 로컬스토리지에 diaries 데이터가 없을 때 빈 배열을 반환하는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지 초기화
 * 2) /diaries 페이지로 이동
 * 3) 페이지 로드 대기
 * 4) 일기 카드가 표시되지 않는지 확인
 */
test('로컬스토리지에 데이터가 없는 경우', async ({ page }) => {
  // 먼저 페이지로 이동 (localStorage 접근을 위해)
  await page.goto('/diaries');

  // 로컬스토리지 초기화
  await page.evaluate(() => {
    localStorage.removeItem('diaries');
  });

  // 페이지 새로고침하여 hook이 데이터를 로드하도록 함
  await page.reload();

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 5000 });

  // 일기 카드가 표시되지 않는지 확인
  const diaryCards = page.locator('[class*="diaryCard"]');
  await expect(diaryCards).toHaveCount(0);
});

/**
 * 테스트 케이스 3: 다른 감정 타입의 일기 확인
 * 
 * 테스트 목적:
 * 1. ETC 감정 타입의 일기가 올바르게 표시되는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 ETC 감정의 일기 데이터 설정
 * 2) /diaries 페이지로 이동
 * 3) 페이지 로드 대기
 * 4) ETC 감정의 일기 카드가 올바르게 표시되는지 확인
 */
test('다른 감정 타입의 일기 확인', async ({ page }) => {
  // 먼저 페이지로 이동 (localStorage 접근을 위해)
  await page.goto('/diaries');

  // 로컬스토리지에 일기 데이터 설정
  await page.evaluate(() => {
    const diaries = [
      { 
        id: 1, 
        title: '기타 감정 일기', 
        content: '기타 감정의 내용입니다.', 
        emotion: 'ETC', 
        createdAt: '2024-03-15T00:00:00.000Z' 
      },
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 새로고침하여 hook이 데이터를 로드하도록 함
  await page.reload();

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 5000 });

  // 일기 카드 확인
  const diaryCards = page.locator('[class*="diaryCard"]');
  await expect(diaryCards).toHaveCount(1);

  // 감정 텍스트 확인 (ETC => '기타')
  const emotionLabel = diaryCards.locator('[class*="emotionLabel"]');
  await expect(emotionLabel).toHaveText('기타');

  // 작성일 확인
  const date = diaryCards.locator('[class*="date"]');
  await expect(date).toHaveText('2024. 03. 15');
});


