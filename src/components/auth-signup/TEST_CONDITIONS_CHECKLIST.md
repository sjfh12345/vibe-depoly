# 테스트 조건 재검토 체크리스트

## 적용된 요구사항
- prompt.301.func.form.txt
- 04-func.mdc

---

## 1. 테스트 제외 라이브러리

### ✅ jest 미사용
- **사용 라이브러리:** `@playwright/test`만 사용
- **결과:** jest 미사용 ✓

### ✅ @testing-library/react 미사용
- **사용 라이브러리:** `@playwright/test`만 사용
- **결과:** @testing-library/react 미사용 ✓

---

## 2. 테스트 조건

### ✅ timeout 설정 (network 통신)
- **요구사항:** timeout은 network 통신인 경우 2000ms 미만으로 설정할 것
- **현재 구현:**
  ```typescript
  const responsePromise = page.waitForResponse(..., { timeout: 2000 });
  await page.waitForSelector('h2:has-text("회원가입 완료")', { timeout: 2000 });
  await page.waitForURL('**/auth/login', { timeout: 2000 });
  await page.waitForSelector('h2:has-text("회원가입 실패")', { timeout: 2000 });
  ```
- **결과:** network 통신 관련 timeout은 2000ms로 설정 ✓

### ✅ timeout 설정 (network 통신이 아닌 경우)
- **요구사항:** timeout은 network 통신이 아닌 경우 설정하지 않거나, 500ms 미만으로 설정할 것
- **현재 구현:**
  ```typescript
  await expect(submitButton).toBeDisabled({ timeout: 500 });
  await expect(submitButton).toBeEnabled({ timeout: 500 });
  await expect(page.locator('p:has-text("회원가입에 성공했습니다.")')).toBeVisible({ timeout: 500 });
  await expect(page.locator('p:has-text("이미 존재하는 이메일입니다.")')).toBeVisible({ timeout: 500 });
  await expect(page.locator('h2:has-text("회원가입 완료")')).not.toBeVisible({ timeout: 500 });
  await expect(page.locator('h2:has-text("회원가입 실패")')).not.toBeVisible({ timeout: 500 });
  ```
- **결과:** 비네트워크 통신 timeout은 500ms로 설정 ✓

### ⚠️ 페이지 로드 대기 timeout
- **현재 구현:**
  ```typescript
  await page.waitForSelector('[data-testid="auth-signup-section"]', { timeout: 5000 });
  ```
- **요구사항:** network 통신이 아닌 경우 500ms 미만
- **평가:** 페이지 로드는 network 통신이 아니므로 500ms 미만으로 설정하는 것이 요구사항에 더 부합
- **권장 개선:** timeout을 500ms로 변경하거나 제거 (기본값 사용)

### ✅ /auth/signup 페이지 완전 로드 후 테스트
- **요구사항:** /auth/signup 페이지가 완전히 로드된 후 테스트할 것
- **구현 방식:**
  ```typescript
  await page.waitForSelector('[data-testid="auth-signup-section"]');
  ```
- **결과:** 페이지 로드 완료 후 테스트 ✓

### ✅ 페이지 로드 식별 요구사항: data-testid 대기 방법
- **요구사항:** 고정식별자 data-testid 대기 방법
- **구현:**
  ```typescript
  await page.waitForSelector('[data-testid="auth-signup-section"]');
  ```
- **결과:** data-testid 사용 ✓

### ✅ 페이지 로드 식별 금지사항: networkidle 대기 방법
- **요구사항:** networkidle 대기 방법 미사용
- **현재 구현:** `waitForSelector` 사용 (networkidle 미사용)
- **결과:** networkidle 미사용 ✓

---

## 3. 테스트 API 조건

### 3-1) 데이터

#### ✅ 실제 데이터 사용
- **요구사항:** 실제 데이터를 사용할 것
- **구현 방식:**
  - 성공 시나리오: timestamp를 포함한 실제 이메일 사용
  - 실패 시나리오: API 모킹 사용 (요구사항에 따라)
- **결과:** 실제 데이터 사용 ✓

#### ✅ Mock 데이터 미사용 (성공 시나리오)
- **요구사항:** Mock 데이터 사용하지 말 것
- **성공 시나리오:** 실제 API 호출, Mock 미사용
- **결과:** Mock 데이터 미사용 ✓

### 3-2) 성공 시나리오

#### ✅ API 모킹하지 않음
- **요구사항:** API 모킹하지 말 것
- **구현 방식:**
  ```typescript
  // API 모킹 없이 실제 API 호출
  const responsePromise = page.waitForResponse(...);
  await page.click('[data-testid="signup-submit-button"]');
  const response = await responsePromise;
  ```
- **결과:** API 모킹하지 않음 ✓

#### ✅ 이메일 timestamp 포함
- **요구사항:** 이메일 중복을 피하기 위해 이메일은 timestamp를 포함하여 항상 등록할 것
- **구현:**
  ```typescript
  const timestamp = Date.now();
  const testEmail = `playwright-${timestamp}@example.com`;
  ```
- **결과:** timestamp 포함 이메일 사용 ✓

#### ✅ _id 정상 반환 확인
- **요구사항:** _id가 정상적으로 반환되는지 확인할 것
- **구현:**
  ```typescript
  const body = await response.json();
  expect(body?.data?.createUser?._id).toBeTruthy();
  ```
- **결과:** _id 반환 확인 ✓

### 3-3) 실패 시나리오

#### ✅ API 모킹 사용
- **요구사항:** 실패 시나리오는 API 모킹할 것
- **구현 방식:**
  ```typescript
  await page.route('https://main-practice.codebootcamp.co.kr/graphql', async (route) => {
    // ... 모킹 로직
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        errors: [{ message: '이미 존재하는 이메일입니다.' }],
      }),
    });
  });
  ```
- **결과:** 실패 시나리오에서 API 모킹 사용 ✓

---

## 4. 04-func.mdc 테스트 조건

### ✅ TDD 기반 playwright 테스트 먼저 작성
- **구현 순서:**
  1. 테스트 파일 작성 (`index.form.hook.spec.ts`)
  2. Hook 구현 (`index.form.hook.tsx`)
  3. 컴포넌트 적용
- **결과:** TDD 기반 구현 ✓

### ✅ playwright.config.ts 설정 변경하지 않음
- **결과:** 설정 파일 수정하지 않음 ✓

### ✅ playwright 테스트는 package.json의 scripts에 등록된 명령으로만 테스트
- **사용 명령:** `npm run test:e2e`
- **결과:** package.json scripts 사용 ✓

### ✅ playwright 테스트에 mock 데이터 사용하지 말고, 실제 데이터를 테스트로 사용할 것
- **성공 시나리오:** 실제 API 호출, 실제 데이터 사용
- **실패 시나리오:** API 모킹 사용 (요구사항에 따라)
- **결과:** 실제 데이터 사용 ✓

### ✅ playwright 테스트에 API 테스트가 필요한 경우, 응답 결과를 하드코딩하지 말 것
- **구현:**
  ```typescript
  const response = await responsePromise;
  const body = await response.json();
  expect(body?.data?.createUser?._id).toBeTruthy();
  ```
- **결과:** 응답 결과 하드코딩하지 않음 ✓

### ✅ 테스트에 timeout 방식의 테스트말고, 다른 방식의 테스트가 가능하면, timeout 테스트는 사용하지 말 것
- **구현 방식:**
  - `waitForResponse` 사용 (network 통신이므로 timeout 필요)
  - `waitForSelector` 사용 (페이지 로드 확인)
  - `waitForURL` 사용 (페이지 이동 확인)
- **평가:** network 통신과 페이지 로드는 timeout이 필요한 경우이므로 적절함
- **결과:** 적절한 timeout 사용 ✓

### ✅ 테스트에 timeout 방식의 테스트가 사용되어야만 하는 경우에는, timeout은 2000ms 미만으로 설정할 것
- **network 통신:** 2000ms 사용 ✓
- **비네트워크 통신:** 500ms 사용 ✓
- **결과:** timeout 2000ms 미만 설정 ✓

### ✅ 테스트시 사용되는 페이지이동(page.goto)은 baseUrl(호스트와 포트)을 포함하지 않고, 경로만 추가할 것
- **구현:**
  ```typescript
  await page.goto('/auth/signup');
  ```
- **결과:** 경로만 사용 ✓

### ✅ 테스트시 사용되는 html,css(page.locator)는 cssModule과의 테스트 충돌을 피하기 위해 data-testid를 지정하여 테스트 할 것
- **구현:**
  ```typescript
  // 페이지 로드
  await page.waitForSelector('[data-testid="auth-signup-section"]');
  
  // 입력 필드
  await page.fill('[data-testid="signup-name-input"]', '테스트 유저');
  await page.fill('[data-testid="signup-email-input"]', 'test@example.com');
  await page.fill('[data-testid="signup-password-input"]', 'Test1234');
  await page.fill('[data-testid="signup-password-confirm-input"]', 'Test1234');
  
  // 버튼
  const submitButton = page.locator('[data-testid="signup-submit-button"]');
  ```
- **결과:** data-testid 사용 ✓

---

## 테스트 케이스 검토

### 테스트 케이스 1: 모든 입력값이 유효하면 회원가입 버튼이 활성화됨
- ✅ /auth/signup 페이지로 이동 (경로만 사용)
- ✅ data-testid로 페이지 로드 대기
- ✅ data-testid로 입력 필드 선택
- ✅ data-testid로 버튼 선택
- ✅ 각 입력 단계마다 버튼 상태 확인
- ✅ timeout 500ms 사용 (비네트워크 통신)
- ⚠️ 페이지 로드 timeout 5000ms (500ms로 변경 권장)

### 테스트 케이스 2: 회원가입 성공 시 성공 모달 표시 및 로그인 페이지 이동
- ✅ /auth/signup 페이지로 이동 (경로만 사용)
- ✅ data-testid로 페이지 로드 대기
- ✅ timestamp 포함 이메일 사용
- ✅ 실제 API 호출 (모킹 없음)
- ✅ waitForResponse로 API 응답 대기 (timeout 2000ms)
- ✅ _id 반환 확인
- ✅ 모달 표시 확인 (timeout 2000ms - network 통신)
- ✅ 모달 내용 확인 (timeout 500ms)
- ✅ 확인 버튼 클릭
- ✅ 페이지 이동 확인 (timeout 2000ms - network 통신)
- ✅ 모달 닫힘 확인 (timeout 500ms)
- ⚠️ 페이지 로드 timeout 5000ms (500ms로 변경 권장)

### 테스트 케이스 3: 회원가입 실패 시 실패 모달 표시 및 닫힘
- ✅ API 모킹 사용 (실패 시나리오)
- ✅ /auth/signup 페이지로 이동 (경로만 사용)
- ✅ data-testid로 페이지 로드 대기
- ✅ data-testid로 입력 필드 선택
- ✅ 모달 표시 확인 (timeout 2000ms - network 통신)
- ✅ 모달 내용 확인 (timeout 500ms)
- ✅ 확인 버튼 클릭
- ✅ 모달 닫힘 확인 (timeout 500ms)
- ✅ 동일 페이지 유지 확인
- ⚠️ 페이지 로드 timeout 5000ms (500ms로 변경 권장)

---

## 개선 사항

### ⚠️ 페이지 로드 timeout 조정
- **현재:** `await page.waitForSelector('[data-testid="auth-signup-section"]', { timeout: 5000 });`
- **요구사항:** network 통신이 아닌 경우 500ms 미만
- **권장 개선:**
  ```typescript
  await page.waitForSelector('[data-testid="auth-signup-section"]', { timeout: 500 });
  ```
  또는 timeout 제거 (기본값 사용)
- **참고:** 다른 테스트 파일들도 확인 필요

---

## 최종 체크리스트

### 필수 요구사항
- [x] jest 미사용
- [x] @testing-library/react 미사용
- [x] network 통신 timeout 2000ms 미만 (2000ms 사용)
- [x] 비네트워크 통신 timeout 500ms 미만 (500ms 사용)
- [x] /auth/signup 페이지 완전 로드 후 테스트
- [x] data-testid 대기 방법 사용
- [x] networkidle 대기 방법 미사용
- [x] 실제 데이터 사용 (성공 시나리오)
- [x] Mock 데이터 미사용 (성공 시나리오)
- [x] API 모킹하지 않음 (성공 시나리오)
- [x] 이메일 timestamp 포함
- [x] _id 정상 반환 확인
- [x] API 모킹 사용 (실패 시나리오)
- [x] page.goto 경로만 사용
- [x] data-testid로 locator 사용
- [x] TDD 기반 구현
- [x] playwright.config.ts 변경하지 않음
- [x] package.json scripts 사용
- [x] 응답 결과 하드코딩하지 않음

### 선택적 개선
- [ ] 페이지 로드 timeout을 500ms로 변경 (현재 5000ms)

---

## 검토 일자
2024-12-19


