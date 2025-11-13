import { test, expect } from '@playwright/test';

/**
 * 테스트 케이스 1: 닫기 버튼 클릭 시 취소 모달이 열리고, 계속 작성 버튼 클릭 시 취소 모달이 닫히고 작성 화면이 유지됨
 * 
 * 테스트 목적:
 * 1. 일기 작성 중 닫기 버튼을 클릭하면 취소 확인 모달이 나타나는지 검증
 * 2. 취소 확인 모달에서 '계속 작성하기' 버튼을 클릭하면 원래 일기 작성 화면으로 돌아가는지 검증
 * 
 * 테스트 흐름:
 * 1) 다이어리 페이지 이동 및 로드 확인
 * 2) 일기쓰기 버튼 클릭 및 모달 표시 확인
 * 3) 닫기 버튼 클릭 및 취소 확인 모달 표시 확인
 * 4) 계속 작성하기 버튼 클릭 및 취소 모달만 닫히는지 확인
 */
test('닫기 버튼 클릭 시 취소 모달이 열리고, 계속 작성 버튼 클릭 시 취소 모달이 닫히고 작성 화면이 유지됨', async ({ page }) => {
  // 페이지 이동 - URL만 사용하여 baseUrl 설정은 playwright.config.ts에서 관리
  await page.goto('/diaries');

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인 (04-func.mdc 규칙 적용)
  // networkidle 대신 고정식별자 사용으로 CSS Module과의 충돌 방지
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 5000 });

  // 일기쓰기 버튼 클릭 - data-testid 셀렉터 활용
  await page.click('[data-testid="diary-new-button"]');

  // 일기쓰기 폼 모달 표시 대기 - data-testid로 식별
  await page.waitForSelector('[data-testid="diaries-new-title"]', { timeout: 5000 });

  // 닫기 버튼 클릭 - data-testid로 식별하여 CSS Module과의 충돌 방지
  await page.click('[data-testid="diary-close-button"]');

  // 취소 확인 모달이 열림을 확인 - data-testid로 식별
  await page.waitForSelector('[data-testid="diary-cancel-modal-title"]', { timeout: 5000 });
  
  // 계속 작성하기 버튼 클릭 - 텍스트 콘텐츠로 식별
  await page.click('button:has-text("계속 작성")');

  // 일기 작성 취소 모달이 닫히는지 확인
  await expect(page.locator('[data-testid="diary-cancel-modal-title"]')).not.toBeVisible();
  // 일기 작성 폼이 계속 표시되어 있는지 확인
  await expect(page.locator('[data-testid="diaries-new-title"]')).toBeVisible();
});

/**
 * 테스트 케이스 2: 닫기 버튼 클릭 시 취소 모달이 열리고, 작성 취소 버튼 클릭 시 모든 모달이 닫힘
 * 
 * 테스트 목적:
 * 1. 일기 작성 중 닫기 버튼을 클릭하면 취소 확인 모달이 나타나는지 검증
 * 2. 취소 확인 모달에서 '작성 취소' 버튼을 클릭하면 모든 모달이 닫히는지 검증
 * 
 * 테스트 흐름:
 * 1) 다이어리 페이지 이동 및 로드 확인
 * 2) 일기쓰기 버튼 클릭 및 모달 표시 확인
 * 3) 닫기 버튼 클릭 및 취소 확인 모달 표시 확인
 * 4) 작성 취소 버튼 클릭 및 모든 모달이 닫힘 확인
 */
test('닫기 버튼 클릭 시 취소 모달이 열리고, 등록록 취소 버튼 클릭 시 모든 모달이 닫힘', async ({ page }) => {
  // 페이지 이동 - URL만 사용하여 baseUrl 설정은 playwright.config.ts에서 관리
  await page.goto('/diaries');

  // 페이지 로드 대기 - data-testid를 통해 페이지 로드 확인 (04-func.mdc 규칙 적용)
  // networkidle 대신 고정식별자 사용으로 CSS Module과의 충돌 방지
  await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 5000 });

  // 일기쓰기 버튼 클릭 - data-testid 셀렉터 활용
  await page.click('[data-testid="diary-new-button"]');

  // 일기쓰기 폼 모달 표시 대기 - data-testid로 식별
  await page.waitForSelector('[data-testid="diaries-new-title"]', { timeout: 5000 });

  // 닫기 버튼 클릭 - data-testid로 식별하여 CSS Module과의 충돌 방지
  await page.click('[data-testid="diary-close-button"]');

  // 취소 확인 모달이 열림을 확인 - data-testid로 식별
  await page.waitForSelector('[data-testid="diary-cancel-modal-title"]', { timeout: 5000 });
  
  // 작성 취소 버튼 클릭 - 알림창 없이 바로 닫힘
  await page.click('button:has-text("등록 취소")');
  
  // 모든 모달이 화면에서 보이지 않는지 확인 - data-testid 기반 대기
  await expect(page.locator('[data-testid="diaries-new-title"]')).not.toBeVisible();
  await expect(page.locator('[data-testid="diary-cancel-modal-title"]')).not.toBeVisible();
});