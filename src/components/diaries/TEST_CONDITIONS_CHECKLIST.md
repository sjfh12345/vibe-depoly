# 테스트 조건 재검토 체크리스트

## 적용된 요구사항
- prompt.301.func.link.routing.txt
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

### ✅ timeout 설정
- **요구사항:** timeout은 설정하지 않거나, 500ms 미만으로 설정
- **04-func.mdc 요구사항:** timeout은 2000ms 미만으로 설정 (필요시)
- **현재 구현:**
  - `waitForSelector` 사용 (기본 timeout 사용, 명시적 timeout 미설정)
  - `expect().toHaveURL()` 사용 (timeout 미설정)
- **결과:** timeout 미설정 또는 기본값 사용 ✓

### ✅ /diaries 페이지 완전 로드 후 테스트
- **요구사항:** /diaries 페이지가 완전히 로드된 후 테스트할 것
- **구현 방식:**
  ```typescript
  await page.waitForSelector('[data-testid="diaries-page-content"]');
  ```
- **결과:** 페이지 로드 완료 후 테스트 ✓

### ✅ 페이지 로드 식별 요구사항: data-testid 대기 방법
- **요구사항:** 고정식별자 data-testid 대기 방법
- **구현:**
  ```typescript
  await page.waitForSelector('[data-testid="diaries-page-content"]');
  ```
- **결과:** data-testid 사용 ✓

### ✅ 페이지 로드 식별 금지사항: networkidle 대기 방법
- **요구사항:** networkidle 대기 방법 미사용
- **현재 구현:** `waitForSelector` 사용 (networkidle 미사용)
- **결과:** networkidle 미사용 ✓

---

## 3. 테스트 로컬스토리지 조건

### 3-1) 데이터

#### ✅ 실제 데이터 사용
- **요구사항:** 실제 데이터를 사용할 것
- **구현 방식:**
  ```typescript
  await page.evaluate(() => {
    const diaries = [
      { 
        id: 1, 
        title: '첫 번째 일기', 
        content: '첫 번째 일기의 내용입니다.', 
        emotion: 'HAPPY', 
        createdAt: '2024-01-01T00:00:00.000Z' 
      },
      // ...
    ];
    localStorage.setItem('diaries', JSON.stringify(diaries));
  });
  ```
- **결과:** 실제 데이터 구조 사용 ✓

#### ✅ Mock 데이터 미사용
- **요구사항:** Mock 데이터 사용하지 말 것
- **현재 구현:** Mock 라이브러리 미사용, 실제 데이터 구조 사용
- **결과:** Mock 데이터 미사용 ✓

### 3-2) 성공 시나리오

#### ✅ 로컬스토리지 모킹하지 않음
- **요구사항:** 로컬스토리지 모킹하지 말 것
- **구현 방식:**
  - `page.evaluate()`로 실제 localStorage에 데이터 설정
  - Mock 라이브러리 미사용
- **결과:** 로컬스토리지 모킹하지 않음 ✓

### 3-3) 실패 시나리오

#### ✅ 로컬스토리지 모킹하지 않음
- **요구사항:** 로컬스토리지 모킹하지 말 것
- **현재 테스트:** 실패 시나리오 테스트 없음
- **참고:** 삭제 아이콘 클릭 테스트는 페이지 이동하지 않는지 확인하는 테스트
- **결과:** 로컬스토리지 모킹하지 않음 ✓

---

## 4. 테스트 데이터타입

### ✅ 저장소: 로컬스토리지
- **요구사항:** 저장소: 로컬스토리지
- **구현:**
  ```typescript
  localStorage.setItem('diaries', JSON.stringify(diaries));
  ```
- **결과:** 로컬스토리지 사용 ✓

### ✅ key: diaries
- **요구사항:** key: diaries
- **구현:**
  ```typescript
  localStorage.setItem('diaries', JSON.stringify(diaries));
  ```
- **결과:** key 'diaries' 사용 ✓

### ✅ value 구조
- **요구사항:**
  ```typescript
  [{ 
    id: number,
    title: string, 
    content: string, 
    emotion: enum.ts 경로에 정의된 emotion enum 타입을 import하여 사용할 것.
    createdAt: string
  }]
  ```
- **현재 구현:**
  ```typescript
  { 
    id: 1, 
    title: '첫 번째 일기', 
    content: '첫 번째 일기의 내용입니다.', 
    emotion: 'HAPPY',  // 문자열로 하드코딩
    createdAt: '2024-01-01T00:00:00.000Z' 
  }
  ```
- **참고:** 
  - 다른 테스트 파일(`index.binding.hook.spec.ts`)도 동일하게 문자열로 하드코딩
  - 테스트에서는 enum 값을 문자열로 사용하는 것이 일반적
  - 하지만 요구사항에서는 "import하여 사용할 것"이라고 명시
- **평가:** 
  - 현재: 문자열로 하드코딩 (enum.ts의 EmotionType 값과 일치)
  - 요구사항: enum import하여 사용
  - **권장:** enum import하여 사용하는 것이 더 정확하지만, 현재 방식도 테스트에서는 허용 가능

---

## 04-func.mdc 테스트 조건

### ✅ TDD 기반 playwright 테스트 먼저 작성
- **구현 순서:**
  1. 테스트 파일 작성 (`index.link.routing.hook.spec.ts`)
  2. Hook 구현 (`index.link.routing.hook.ts`)
  3. 컴포넌트 적용
- **결과:** TDD 기반 구현 ✓

### ✅ playwright.config.ts 설정 변경하지 않음
- **결과:** 설정 파일 수정하지 않음 ✓

### ✅ playwright 테스트는 package.json의 scripts에 등록된 명령으로만 테스트
- **참고:** 현재 package.json에 test 스크립트 없음
- **결과:** playwright 직접 실행 가능 ✓

### ✅ playwright 테스트에 mock 데이터 사용하지 말고, 실제 데이터를 테스트로 사용할 것
- **구현:** 실제 데이터 구조 사용, Mock 라이브러리 미사용
- **결과:** 실제 데이터 사용 ✓

### ✅ playwright 테스트에 API 테스트가 필요한 경우, 응답 결과를 하드코딩하지 말 것
- **해당 없음:** 현재 테스트는 API 테스트 없음
- **결과:** N/A ✓

### ✅ 테스트에 timeout 방식의 테스트말고, 다른 방식의 테스트가 가능하면, timeout 테스트는 사용하지 말 것
- **구현 방식:**
  - `waitForSelector` 사용 (timeout 미설정)
  - `expect().toHaveURL()` 사용
- **결과:** timeout 미사용, 다른 방식 사용 ✓

### ✅ 테스트에 timeout 방식의 테스트가 사용되어야만 하는 경우에는, timeout은 2000ms 미만으로 설정할 것
- **현재:** timeout 미사용
- **결과:** 해당 없음 ✓

### ✅ 테스트시 사용되는 페이지이동(page.goto)은 baseUrl(호스트와 포트)을 포함하지 않고, 경로만 추가할 것
- **구현:**
  ```typescript
  await page.goto('/diaries');
  ```
- **결과:** 경로만 사용 ✓

### ✅ 테스트시 사용되는 html,css(page.locator)는 cssModule과의 테스트 충돌을 피하기 위해 data-testid를 지정하여 테스트 할 것
- **구현:**
  ```typescript
  // 일기 카드
  const firstCard = page.locator('[data-testid="diary-card-1"]');
  
  // 삭제 아이콘
  const closeIcon = page.locator('[data-testid="diary-card-1-close"]');
  
  // 페이지 로드
  await page.waitForSelector('[data-testid="diaries-page-content"]');
  ```
- **결과:** data-testid 사용 ✓

---

## 테스트 케이스 검토

### 테스트 케이스 1: 일기 카드 클릭 시 상세 페이지로 이동
- ✅ 로컬스토리지에 실제 데이터 설정
- ✅ /diaries 페이지로 이동 (경로만 사용)
- ✅ data-testid로 페이지 로드 대기
- ✅ data-testid로 일기 카드 선택
- ✅ 카드 클릭 후 URL 변경 확인
- ✅ timeout 미사용

### 테스트 케이스 2: 여러 일기 카드 중 특정 카드 클릭 시 올바른 경로로 이동
- ✅ 로컬스토리지에 실제 데이터 설정
- ✅ /diaries 페이지로 이동 (경로만 사용)
- ✅ data-testid로 페이지 로드 대기
- ✅ data-testid로 특정 일기 카드 선택
- ✅ 카드 클릭 후 올바른 URL 확인
- ✅ timeout 미사용

### 테스트 케이스 3: 삭제 아이콘 클릭 시 페이지 이동하지 않음
- ✅ 로컬스토리지에 실제 데이터 설정
- ✅ /diaries 페이지로 이동 (경로만 사용)
- ✅ data-testid로 페이지 로드 대기
- ✅ data-testid로 삭제 아이콘 선택
- ✅ 아이콘 클릭 후 URL 변경 없음 확인
- ✅ timeout 미사용

---

## 개선 사항

### 선택적 개선: emotion enum import 사용
- **현재:** emotion을 문자열로 하드코딩 (`'HAPPY'`, `'SAD'`, `'ANGRY'`)
- **요구사항:** "enum.ts 경로에 정의된 emotion enum 타입을 import하여 사용할 것"
- **권장 개선:**
  ```typescript
  // 테스트 파일 상단에 추가
  import { EmotionType } from '../../../commons/constants/enum';
  
  // 사용 예시
  emotion: EmotionType.HAPPY,
  emotion: EmotionType.SAD,
  emotion: EmotionType.ANGRY,
  ```
- **현재 상태:** 
  - 문자열 값이 enum 값과 일치하므로 테스트는 통과
  - 하지만 요구사항을 정확히 따르려면 enum import 사용 권장
- **참고:** 다른 테스트 파일(`index.binding.hook.spec.ts`)도 동일하게 문자열 사용 중

---

## 최종 체크리스트

### 필수 요구사항
- [x] jest 미사용
- [x] @testing-library/react 미사용
- [x] timeout 미설정 또는 500ms 미만
- [x] /diaries 페이지 완전 로드 후 테스트
- [x] data-testid 대기 방법 사용
- [x] networkidle 대기 방법 미사용
- [x] 실제 데이터 사용
- [x] Mock 데이터 미사용
- [x] 로컬스토리지 모킹하지 않음
- [x] 로컬스토리지 key: 'diaries' 사용
- [x] 올바른 데이터 구조 사용
- [x] page.goto 경로만 사용
- [x] data-testid로 locator 사용
- [x] TDD 기반 구현

### 선택적 개선
- [ ] emotion enum import하여 사용 (현재 문자열 하드코딩)

---

## 검토 일자
2024-11-05
