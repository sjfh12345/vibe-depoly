import { test, expect } from '@playwright/test';

/**
 * 테스트 케이스 1: 로컬스토리지에서 일기 데이터를 로드하여 바인딩함
 * 
 * 테스트 목적:
 * 1. 다이나믹 라우팅된 [id]를 추출하여 로컬스토리지에서 해당 일기를 찾는지 검증
 * 2. 로컬스토리지의 diaries 배열에서 id와 일치하는 일기 객체를 찾아 바인딩하는지 검증
 * 3. 제목, 감정, 작성일, 내용이 올바르게 표시되는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 일기 데이터 설정
 * 2) /diaries/[id] 페이지로 이동
 * 3) 페이지 로드 대기 (data-testid 사용)
 * 4) 제목, 감정 아이콘/텍스트, 작성일, 내용이 올바르게 표시되는지 확인
 */
test('로컬스토리지에서 일기 데이터를 로드하여 바인딩함', async ({ page }) => {
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
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 이동 - id=2인 일기 상세 페이지
  await page.goto('/diaries/2');

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인
  await page.waitForSelector('[data-testid="diary-detail-page"]');

  // 제목이 올바르게 표시되는지 확인
  const title = page.locator('[data-testid="diary-detail-title"]');
  await expect(title).toHaveText('두 번째 일기');

  // 감정 아이콘이 올바르게 표시되는지 확인 (SAD 감정)
  const emotionImage = page.locator('[data-testid="diary-detail-emotion-image"]');
  await expect(emotionImage).toBeVisible();

  // 감정 텍스트가 올바르게 표시되는지 확인 (SAD => '슬퍼요')
  const emotionLabel = page.locator('[data-testid="diary-detail-emotion-label"]');
  await expect(emotionLabel).toHaveText('슬퍼요');

  // 작성일이 올바르게 표시되는지 확인
  const createdAt = page.locator('[data-testid="diary-detail-created-at"]');
  await expect(createdAt).toBeVisible();
  // createdAt은 ISO 형식이므로 변환되어 표시될 수 있음

  // 내용이 올바르게 표시되는지 확인
  const content = page.locator('[data-testid="diary-detail-content"]');
  await expect(content).toHaveText('두 번째 일기의 내용입니다.');
});

/**
 * 테스트 케이스 2: 다른 id의 일기를 확인함
 * 
 * 테스트 목적:
 * 1. 다른 id의 일기 상세 페이지로 이동했을 때 올바른 데이터가 바인딩되는지 검증
 * 
 * 테스트 흐름:
 * 1) 로컬스토리지에 일기 데이터 설정
 * 2) /diaries/[id] 페이지로 이동 (다른 id)
 * 3) 페이지 로드 대기
 * 4) 해당 id의 일기 데이터가 올바르게 표시되는지 확인
 */
test('다른 id의 일기를 확인함', async ({ page }) => {
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
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });

  // 페이지 이동 - id=3인 일기 상세 페이지
  await page.goto('/diaries/3');

  // 페이지 로드 대기
  await page.waitForSelector('[data-testid="diary-detail-page"]');

  // 제목이 올바르게 표시되는지 확인
  const title = page.locator('[data-testid="diary-detail-title"]');
  await expect(title).toHaveText('세 번째 일기');

  // 감정 텍스트가 올바르게 표시되는지 확인 (ANGRY => '화나요')
  const emotionLabel = page.locator('[data-testid="diary-detail-emotion-label"]');
  await expect(emotionLabel).toHaveText('화나요');

  // 내용이 올바르게 표시되는지 확인
  const content = page.locator('[data-testid="diary-detail-content"]');
  await expect(content).toHaveText('세 번째 일기의 내용입니다.');
});

