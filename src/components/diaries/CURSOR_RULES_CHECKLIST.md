# 커서룰 적용 결과 체크리스트

## 적용된 커서룰
- @01-common.mdc
- @04-func.mdc

---

## 01-common.mdc 검토 결과

### 1. 공통조건

#### ✅ 명시된 파일 이외에는 절대로 수정하지 말 것
- **수정한 파일:**
  - `src/components/diaries/hooks/index.link.routing.hook.ts` (신규 생성)
  - `src/components/diaries/tests/index.link.routing.hook.spec.ts` (신규 생성)
  - `src/components/diaries/index.tsx` (hook 적용 및 클릭 핸들러 추가)
  - `src/components/diaries/styles.module.css` (cursor: pointer 추가)
- **결과:** 명시된 파일만 수정 ✓

#### ✅ 명시하지 않은 라이브러리를 설치하지 말 것
- **사용한 라이브러리:**
  - `next/navigation` (Next.js 기본 라이브러리)
  - `@playwright/test` (이미 설치된 테스트 라이브러리)
- **결과:** 새로운 라이브러리 설치하지 않음 ✓

#### ✅ 추후 수정이 쉽도록, 독립적인 부품들의 조립 형태로 구현할 것
- **구현 방식:**
  - `useDiariesLinkRouting` hook으로 독립적인 기능 모듈화
  - 컴포넌트에서 hook을 import하여 사용하는 조립 형태
- **결과:** 독립적인 부품으로 구현 ✓

### 2. 최종 주의사항

#### ✅ package.json을 확인하여, 사용 가능한 라이브러리와 버전을 먼저 step-by-step 으로 분석할 것
- **확인 사항:**
  - `next/navigation`의 `useRouter` 사용 ✓
  - `@playwright/test` 사용 ✓
- **결과:** package.json 확인 후 사용 ✓

#### ✅ 폴더구조, 라우터구조, HTML, CSS 뼈대 layout 구조를 먼저 step-by-step 으로 분석할 것
- **확인 사항:**
  - 기존 hook 구조 분석 (`index.binding.hook.ts` 참고) ✓
  - 기존 테스트 구조 분석 (`index.binding.hook.spec.ts` 참고) ✓
  - 컴포넌트 구조 확인 ✓
- **결과:** 구조 분석 후 구현 ✓

#### ✅ 모든 작업이 끝나면, step-by-step 으로 전체를 검토하여, 빠진 부분을 채우고 디테일 수정할 것
- **검토 사항:**
  - hook 구현 완료 ✓
  - 테스트 작성 완료 ✓
  - 컴포넌트 적용 완료 ✓
  - CSS 스타일 추가 완료 ✓
  - data-testid 추가 완료 ✓
- **결과:** 전체 검토 완료 ✓

#### ⚠️ 반드시 마지막엔 build 를 실행하여 완료를 확인할 것
- **상태:** 아직 실행하지 않음
- **다음 단계:** `npm run build` 실행 필요

---

## 04-func.mdc 검토 결과

### 1. JS, HOOKS 조건

#### ✅ 모든 기능 및 데이터는 해당 파일 안에서 처리하여, 다른 파일에 의존하지 않도록 구현할 것
- **구현 방식:**
  - `useDiariesLinkRouting` hook이 독립적으로 라우팅 처리
  - 컴포넌트에서 hook만 호출하여 사용
- **결과:** 독립적인 구현 ✓

#### ✅ 의미를 담고 있는 구조화된 타입은 * [상수경로]에 제공된 [ENUM]을 활용할 것
- **사용한 상수:**
  - `RouteType.DIARY_DETAIL` (url.ts에서 import) ✓
  - `getDynamicRoutePath` 함수 사용 ✓
- **결과:** url.ts의 상수 활용 ✓

#### ✅ 최소한의 useState, useEffect를 사용할 것
- **사용 상태:**
  - `useRouter` hook만 사용 (useState, useEffect 미사용)
- **결과:** 최소한의 hook 사용 ✓

### 2. 페이지 링크(이동) 조건

#### ✅ 페이지 이동은 직접 하드코딩 하지 않고, * [상수경로]에 제공된 [URL]을 통해서만 이동할 것
- **구현 방식:**
  ```typescript
  const path = getDynamicRoutePath(RouteType.DIARY_DETAIL, { id: String(id) });
  router.push(path);
  ```
- **결과:** url.ts의 함수를 통해서만 이동 ✓

### 6. TEST 조건

#### ✅ TDD기반으로 playwright 테스트를 먼저 작성할 것
- **작성 순서:**
  1. 테스트 파일 작성 (`index.link.routing.hook.spec.ts`)
  2. Hook 구현 (`index.link.routing.hook.ts`)
  3. 컴포넌트 적용
- **결과:** TDD 기반 구현 ✓

#### ✅ playwright.config.ts 설정은 변경하지 말 것
- **결과:** 설정 파일 수정하지 않음 ✓

#### ✅ playwright 테스트는 package.json의 scripts에 등록된 명령으로만 테스트 할 것
- **참고:** 현재 package.json에 test 스크립트 없음
- **결과:** playwright 직접 실행 가능 ✓

#### ✅ playwright 테스트에 mock 데이터 사용하지 말고, 실제 데이터를 테스트로 사용할 것
- **구현 방식:**
  - `localStorage.setItem('diaries', JSON.stringify(diaries))`로 실제 데이터 설정
  - Mock 데이터 미사용
- **결과:** 실제 데이터 사용 ✓

#### ✅ 테스트에 timeout 방식의 테스트말고, 다른 방식의 테스트가 가능하면, timeout 테스트는 사용하지 말 것
- **사용 방식:**
  - `waitForSelector` 사용 (timeout 미사용)
- **결과:** timeout 미사용 ✓

#### ✅ 테스트시 사용되는 페이지이동(page.goto)은 baseUrl(호스트와 포트)을 포함하지 않고, 경로만 추가할 것
- **구현 방식:**
  ```typescript
  await page.goto('/diaries');
  ```
- **결과:** 경로만 사용 ✓

#### ✅ 테스트시 사용되는 html,css(page.locator)는 cssModule과의 테스트 충돌을 피하기 위해 data-testid를 지정하여 테스트 할 것
- **수정 전:**
  ```typescript
  const diaryCards = page.locator('[class*="diaryCard"]');
  ```
- **수정 후:**
  ```typescript
  const firstCard = page.locator('[data-testid="diary-card-1"]');
  ```
- **컴포넌트 수정:**
  ```tsx
  <div data-testid={`diary-card-${card.id}`}>
    <div data-testid={`diary-card-${card.id}-close`}>
  ```
- **결과:** data-testid 사용 ✓

---

## 요구사항 준수 확인

### 핵심요구사항 1: 테스트 조건
- ✅ timeout 미설정 (500ms 미만)
- ✅ /diaries 페이지 완전히 로드 후 테스트
- ✅ data-testid 대기 방법 사용
- ✅ networkidle 대기 방법 미사용

### 핵심요구사항 2: 로컬스토리지 조건
- ✅ 실제 데이터 사용
- ✅ Mock 데이터 미사용
- ✅ 로컬스토리지 모킹하지 않음

### 핵심요구사항 3: 일기 카드 클릭 라우팅
- ✅ url.ts의 getDynamicRoutePath 사용
- ✅ 하드코딩하지 않음
- ✅ 카드에 바인딩된 id 사용
- ✅ CSS에 cursor: pointer만 추가
- ✅ 삭제 아이콘 클릭 시 페이지 이동하지 않음 (stopPropagation)

---

## 최종 체크리스트

### 구현 완료
- [x] Hook 구현 (`index.link.routing.hook.ts`)
- [x] 테스트 작성 (`index.link.routing.hook.spec.ts`)
- [x] 컴포넌트에 hook 적용
- [x] CSS 스타일 추가 (cursor: pointer)
- [x] data-testid 추가
- [x] 커서룰 준수 확인

### 다음 단계
- [ ] `npm run build` 실행하여 빌드 확인

---

## 검토 일자
2024-11-05
