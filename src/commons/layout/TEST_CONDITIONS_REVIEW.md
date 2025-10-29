# 테스트 조건 재검토 결과 (prompt.302.func.area)

## 요구사항 분석

### 프롬프트 요구사항 (prompt.302.func.area.txt)
1. **테스트 제외 라이브러리**: jest, @testing-library/react
2. **테스트 조건**:
   - timeout은 설정하지 않거나, 500ms 미만으로 설정
   - 페이지가 완전히 로드된 후 테스트
   - 페이지 로드 식별 요구사항: 고정식별자 data-testid 대기 방법
   - 페이지 로드 식별 금지사항: networkidle 대기 방법
3. **테스트 skip 대상**: /auth/login, /auth/signup, /pictures

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

---

## 현재 테스트 코드 검토 (index.area.hook.spec.ts)

### ✅ 1. 테스트 제외 라이브러리

```typescript
import { test, expect } from '@playwright/test';
```

**분석:**
- ✅ jest 사용 안 함
- ✅ @testing-library/react 사용 안 함
- ✅ playwright만 사용

**프롬프트 요구사항**: ✅ playwright만 사용

---

### ✅ 2. Timeout 설정

현재 테스트 코드에 timeout 설정이 없음:
```typescript
test('모든 영역이 표시되어야 함', async ({ page }) => {
  await page.goto('/diaries');
  await page.waitForSelector('[data-testid="layout-container"]');
  // timeout 설정 없음
});
```

**프롬프트 요구사항**: timeout은 설정하지 않거나, 500ms 미만으로 설정  
**커서룰 요구사항**: timeout 테스트는 사용하지 말 것 (다른 방식이 가능하면)  
**현재 상태**: ✅ timeout 미사용 (두 요구사항 모두 충족)

---

### ✅ 3. 페이지 로드 식별 방법

```typescript
await page.waitForSelector('[data-testid="layout-container"]');
```

**분석:**
- ✅ data-testid 대기 방법 사용
- ✅ networkidle 대기 방법 미사용

**프롬프트 요구사항**: ✅ 고정식별자 data-testid 대기 방법 사용  
**프롬프트 금지사항**: ✅ networkidle 대기 방법 미사용  
**커서룰 요구사항**: ✅ data-testid 지정하여 테스트

---

### ✅ 4. 테스트 skip 대상

```typescript
test.describe('로그인 페이지 - /auth/login', () => {
  test.skip('모든 영역이 숨겨져야 함', async ({ page }) => {
    // ...
  });
});

test.describe('회원가입 페이지 - /auth/signup', () => {
  test.skip('모든 영역이 숨겨져야 함', async ({ page }) => {
    // ...
  });
});

test.describe('사진보관함 페이지 - /pictures', () => {
  test.skip('모든 영역이 표시되어야 함', async ({ page }) => {
    // ...
  });
});
```

**분석:**
- ✅ /auth/login 테스트는 test.skip() 사용
- ✅ /auth/signup 테스트는 test.skip() 사용
- ✅ /pictures 테스트는 test.skip() 사용

**프롬프트 요구사항**: ✅ /auth/login, /auth/signup, /pictures 테스트 skip

---

### ✅ 5. 페이지 이동 방법

```typescript
await page.goto('/diaries');
await page.goto('/diaries/1');
await page.goto('/auth/login');
await page.goto('/auth/signup');
await page.goto('/pictures');
```

**분석:**
- ✅ baseUrl 포함하지 않고 경로만 사용

**커서룰 요구사항**: ✅ baseUrl(호스트와 포트) 포함하지 않고 경로만 추가

---

### ✅ 6. 페이지 로드 후 테스트

모든 테스트에서 페이지 로드 대기를 수행:
```typescript
await page.goto('/diaries');
await page.waitForSelector('[data-testid="layout-container"]');
// 이후 테스트 진행
```

**프롬프트 요구사항**: ✅ 페이지가 완전히 로드된 후 테스트

---

### ✅ 7. CSS Module 충돌 방지

```typescript
const header = page.locator('[data-testid="layout-header"]');
await expect(header).toBeVisible();

const logo = page.locator('[data-testid="layout-logo"]');
await expect(logo).toBeVisible();
```

**분석:**
- ✅ data-testid 사용하여 요소 선택
- ✅ CSS 클래스 직접 사용하지 않음

**커서룰 요구사항**: ✅ data-testid 지정하여 테스트

---

### ✅ 8. TDD 기반 구현

작업 순서:
1. ✅ 테스트 파일 먼저 작성
2. ✅ Hook 구현
3. ✅ Layout 컴포넌트 수정
4. ✅ 테스트 실행 및 검증

**커서룰 요구사항**: ✅ TDD 기반으로 playwright 테스트 먼저 작성

---

### ✅ 9. 실제 데이터 사용

**분석:**
- ✅ mock 데이터 사용하지 않음
- ✅ 실제 페이지와 실제 URL 사용
- ✅ 실제 브라우저 환경에서 테스트

**커서룰 요구사항**: ✅ mock 데이터 사용하지 말고, 실제 데이터를 테스트로 사용

---

### ✅ 10. playwright.config.ts 미변경

**분석:**
- ✅ playwright.config.ts 파일 변경하지 않음
- ✅ 기존 설정 그대로 사용

**커서룰 요구사항**: ✅ playwright.config.ts 설정은 변경하지 말 것

---

## 요구사항 충족도 요약

| 항목 | 프롬프트 요구사항 | 커서룰 요구사항 | 현재 상태 |
|------|------------------|----------------|----------|
| 테스트 라이브러리 | playwright만 사용 | playwright만 사용 | ✅ 충족 |
| Timeout 설정 | 설정하지 않거나 500ms 미만 | 가능하면 사용하지 말 것 | ✅ 충족 (미사용) |
| 페이지 로드 식별 | data-testid 사용 | data-testid 사용 | ✅ 충족 |
| networkidle 사용 | 금지 | - | ✅ 충족 (미사용) |
| /auth/login 테스트 | skip | - | ✅ 충족 (test.skip 사용) |
| /auth/signup 테스트 | skip | - | ✅ 충족 (test.skip 사용) |
| /pictures 테스트 | skip | - | ✅ 충족 (test.skip 사용) |
| page.goto | 경로만 사용 | 경로만 사용 | ✅ 충족 |
| 페이지 로드 후 테스트 | 완전히 로드된 후 | - | ✅ 충족 |
| CSS Module 충돌 방지 | - | data-testid 사용 | ✅ 충족 |
| TDD 기반 | - | 테스트 먼저 작성 | ✅ 충족 |
| Mock 데이터 | - | 사용하지 말 것 | ✅ 충족 |
| playwright.config.ts | - | 변경하지 말 것 | ✅ 충족 |

---

## 테스트 커버리지 분석

### 실제 실행되는 테스트 (6개)

1. ✅ `/diaries` - 모든 영역 표시 확인
   - Header 표시
   - Logo 표시
   - Banner 표시
   - Navigation 표시
   - Footer 표시

2. ✅ `/diaries/1` - header와 footer만 표시 확인
   - Header 표시
   - Logo 표시
   - Banner 숨김
   - Navigation 숨김
   - Footer 표시

### Skip된 테스트 (9개)

1. ⏭️ `/auth/login` - 모든 영역 숨김 확인 (크롬, 파이어폭스, 웹킷)
2. ⏭️ `/auth/signup` - 모든 영역 숨김 확인 (크롬, 파이어폭스, 웹킷)
3. ⏭️ `/pictures` - 모든 영역 표시 확인 (크롬, 파이어폭스, 웹킷)

**총 테스트 수**: 15개 (6개 통과 + 9개 skip)

---

## 추가 검토 사항

### 테스트 구조의 우수성

```typescript
test.describe('Layout Area Visibility', () => {
  test.describe('공개 페이지 - /diaries', () => {
    test('모든 영역이 표시되어야 함', async ({ page }) => {
      // ...
    });
  });
  
  test.describe('일기 상세 페이지 - /diaries/1', () => {
    test('header와 footer만 표시되어야 함', async ({ page }) => {
      // ...
    });
  });
});
```

**분석:**
- ✅ 중첩된 test.describe로 페이지별 그룹화
- ✅ 테스트 이름이 명확하고 한국어로 설명
- ✅ 각 테스트가 독립적으로 실행 가능

### 테스트 가독성

```typescript
// Header 영역 표시 확인
const header = page.locator('[data-testid="layout-header"]');
await expect(header).toBeVisible();

// Logo 표시 확인
const logo = page.locator('[data-testid="layout-logo"]');
await expect(logo).toBeVisible();
```

**분석:**
- ✅ 각 단계에 명확한 주석
- ✅ 한글 주석으로 의도 명확
- ✅ 테스트 코드 읽기 쉬움

### 테스트 안정성

```typescript
await page.goto('/diaries');
await page.waitForSelector('[data-testid="layout-container"]');
// 페이지 로드 완료 후 테스트 진행
```

**분석:**
- ✅ 페이지 로드 완료 대기로 테스트 안정성 확보
- ✅ race condition 방지
- ✅ 실제 사용자 경험 시뮬레이션

---

## 개선 가능한 부분

현재 모든 요구사항을 충족하고 있습니다. 추가로 고려할 수 있는 사항:

1. **동적 라우트 테스트 확장**
   - 현재: `/diaries/1`만 테스트
   - 가능한 확장: `/diaries/2`, `/diaries/3` 등 다른 ID 테스트

2. **엣지 케이스 테스트**
   - 존재하지 않는 페이지 테스트
   - 잘못된 경로 테스트

하지만 요구사항에서 명시한 테스트만 구현하면 되므로, 현재 구현이 적절합니다.

---

## 최종 결론

✅ **모든 테스트 조건 요구사항을 충족합니다.**

프롬프트와 커서룰의 모든 요구사항을 만족하며, 테스트 코드는 다음과 같은 특징을 가집니다:

1. ✅ 표준 준수: playwright 사용, data-testid 사용
2. ✅ 안정성: 페이지 로드 대기, race condition 방지
3. ✅ 가독성: 명확한 테스트 이름과 주석
4. ✅ 구조적 우수성: 중첩 describe로 그룹화
5. ✅ 커버리지: 주요 페이지 테스트 포함

**테스트 실행 결과**: 6개 통과, 9개 skip (요구사항에 따라)

---

## 파일 참조

- 테스트 파일: `tests/index.area.hook.spec.ts`
- Hook 파일: `src/commons/layout/hooks/index.area.hook.ts`
- Layout 파일: `src/commons/layout/index.tsx`
- 프롬프트: `src/commons/layout/prompt/prompt.302.func.area.txt`


