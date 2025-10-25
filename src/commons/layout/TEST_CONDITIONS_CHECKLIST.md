# 테스트 조건 재검토 체크리스트

## 요구사항 분석

### 프롬프트 요구사항 (prompt.301.func.link.routing.txt)
1. **테스트 제외 라이브러리**: jest, @testing-library/react
2. **테스트 조건**:
   - timeout은 설정하지 않거나, 500ms 미만으로 설정
   - 페이지가 완전히 로드된 후 테스트
   - 페이지 로드 식별 요구사항: 고정식별자 data-testid 대기 방법
   - 페이지 로드 식별 금지사항: networkidle 대기 방법
3. **테스트 skip 대상**: /pictures

### 커서룰 요구사항 (04-func.mdc)
1. TDD 기반으로 playwright 테스트 먼저 작성
2. playwright.config.ts 설정은 변경하지 말 것
3. playwright 테스트는 package.json의 scripts에 등록된 명령으로만 테스트
4. mock 데이터 사용하지 말고, 실제 데이터를 테스트로 사용
5. API 테스트 시 응답 결과를 하드코딩하지 말 것
6. timeout 방식의 테스트 말고, 다른 방식의 테스트가 가능하면 timeout 테스트는 사용하지 말 것
7. timeout 방식의 테스트가 사용되어야만 하는 경우에는, timeout은 2000ms 미만으로 설정
8. 테스트 시 사용되는 페이지 이동(page.goto)은 baseUrl(호스트와 포트)을 포함하지 않고, 경로만 추가
9. 테스트 시 사용되는 html,css(page.locator)는 cssModule과의 테스트 충돌을 피하기 위해 data-testid를 지정하여 테스트

## 현재 테스트 코드 검토

### ✅ 1. 테스트 제외 라이브러리
```typescript
import { test, expect } from '@playwright/test';
```
- ✅ jest 사용 안 함
- ✅ @testing-library/react 사용 안 함
- ✅ playwright만 사용

### ✅ 2. Timeout 설정
현재 테스트 코드에 timeout 설정이 없음:
```typescript
test('로고 클릭 시 일기목록 페이지로 이동', async ({ page }) => {
  // timeout 설정 없음
});
```

**프롬프트 요구사항**: timeout은 설정하지 않거나, 500ms 미만으로 설정
**커서룰 요구사항**: timeout 테스트는 사용하지 말 것 (다른 방식이 가능하면)
**현재 상태**: ✅ timeout 미사용 (두 요구사항 모두 충족)

### ✅ 3. 페이지 로드 식별 방법
```typescript
await page.waitForSelector('[data-testid="layout-container"]');
```
- ✅ data-testid 대기 방법 사용
- ✅ networkidle 대기 방법 미사용

**프롬프트 요구사항**: ✅ 고정식별자 data-testid 대기 방법 사용
**프롬프트 금지사항**: ✅ networkidle 대기 방법 미사용
**커서룰 요구사항**: ✅ data-testid 지정하여 테스트

### ✅ 4. 테스트 skip 대상
```typescript
test.skip('사진보관함 클릭 시 사진목록 페이지로 이동', async ({ page }) => {
  // ...
});
```
- ✅ /pictures 테스트는 test.skip() 사용

**프롬프트 요구사항**: ✅ /pictures 테스트 skip

### ✅ 5. 페이지 이동 방법
```typescript
await page.goto('/diaries');
await page.goto('/');
```
- ✅ baseUrl 포함하지 않고 경로만 사용

**커서룰 요구사항**: ✅ baseUrl(호스트와 포트) 포함하지 않고 경로만 추가

### ✅ 6. 페이지 로드 후 테스트
모든 테스트에서 페이지 로드 대기를 수행:
```typescript
await page.goto('/diaries');
await page.waitForSelector('[data-testid="layout-container"]');
// 이후 테스트 진행
```

**프롬프트 요구사항**: ✅ 페이지가 완전히 로드된 후 테스트

### ✅ 7. CSS Module 충돌 방지
```typescript
await page.click('[data-testid="layout-logo"]');
const diariesTab = page.locator('[data-testid="layout-nav-diaries"]');
await expect(diariesTab).toHaveClass(/tabActive/);
```
- ✅ data-testid 사용하여 요소 선택
- ✅ CSS 클래스는 정규식으로 부분 매칭

**커서룰 요구사항**: ✅ data-testid 지정하여 테스트

### ✅ 8. TDD 기반 구현
작업 순서:
1. ✅ 테스트 파일 먼저 작성
2. ✅ Hook 구현
3. ✅ Layout 컴포넌트 구현
4. ✅ 테스트 실행 및 검증

**커서룰 요구사항**: ✅ TDD 기반으로 playwright 테스트 먼저 작성

### ✅ 9. 실제 데이터 사용
- ✅ mock 데이터 사용하지 않음
- ✅ 실제 페이지와 실제 URL 사용

**커서룰 요구사항**: ✅ mock 데이터 사용하지 말고, 실제 데이터를 테스트로 사용

## 요구사항 충족도 요약

| 항목 | 프롬프트 요구사항 | 커서룰 요구사항 | 현재 상태 |
|------|------------------|----------------|----------|
| 테스트 라이브러리 | playwright만 사용 | playwright만 사용 | ✅ 충족 |
| Timeout 설정 | 설정하지 않거나 500ms 미만 | 가능하면 사용하지 말 것 | ✅ 충족 (미사용) |
| 페이지 로드 식별 | data-testid 사용 | data-testid 사용 | ✅ 충족 |
| networkidle 사용 | 금지 | - | ✅ 충족 (미사용) |
| /pictures 테스트 | skip | - | ✅ 충족 (test.skip 사용) |
| page.goto | 경로만 사용 | 경로만 사용 | ✅ 충족 |
| 페이지 로드 후 테스트 | 완전히 로드된 후 | - | ✅ 충족 |
| CSS Module 충돌 방지 | - | data-testid 사용 | ✅ 충족 |
| TDD 기반 | - | 테스트 먼저 작성 | ✅ 충족 |
| Mock 데이터 | - | 사용하지 말 것 | ✅ 충족 |

## 추가 검토 사항

### 테스트 커버리지
현재 테스트는 다음을 검증합니다:
1. ✅ 로고 클릭 시 /diaries로 이동
2. ✅ 일기보관함 클릭 시 /diaries로 이동
3. ✅ 일기보관함 클릭 후 활성 탭 CSS 확인
4. ✅ /pictures 테스트는 skip
5. ✅ 현재 페이지에 맞는 탭 활성화 확인

### 개선 가능한 부분
현재 모든 요구사항을 충족하고 있습니다. 추가로 고려할 수 있는 테스트:
- 사진보관함 클릭 시 /pictures로 이동 (현재 skip)
- 다른 페이지에서 일기보관함 클릭 시 활성화 확인
- 사진보관함 페이지에서 활성화 확인

하지만 요구사항에서 /pictures 테스트는 skip하라고 명시되어 있으므로, 현재 구현이 적절합니다.

## 최종 결론

✅ **모든 테스트 조건 요구사항을 충족합니다.**

프롬프트와 커서룰의 모든 요구사항을 만족하며, 테스트 코드는 표준에 맞게 작성되었습니다.

