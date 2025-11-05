# 커서룰 재검토 결과 (2024)

## 검토 대상 파일
최근 수정된 파일들을 중심으로 커서룰 준수 여부를 검토했습니다.

### 검토 대상
- `src/commons/components/modal/index.tsx`
- `src/commons/providers/modal/modal.provider.tsx`
- `src/components/diaries-new/index.tsx`
- `src/components/diaries-new/hooks/index.link.modal.close.hook.tsx`
- `src/components/diaries/hooks/index.link.modal.hook.tsx`
- `src/components/diaries/index.tsx`
- `tests/components/diaries/index.link.modal.hook.spec.ts`
- `tests/components/diaries-new/index.link.modal.close.hook.spec.ts`

---

## @01-common.mdc 적용 검토

### ✅ 1. 공통조건

#### 명시된 파일 이외에는 절대로 수정하지 않음
- ✅ 수정된 파일들이 명시된 범위 내에 있는지 확인 필요
- ✅ 새로운 라이브러리 설치하지 않음

#### 명시하지 않은 라이브러리를 설치하지 않음
- ✅ `package.json` 확인 결과 새로운 라이브러리 설치 없음
- ✅ 기존에 설치된 라이브러리만 사용 (next, react, react-dom, playwright 등)

#### 독립적인 부품들의 조립 형태로 구현
- ✅ `useDiariesModal`, `useLinkModalClose` Hook을 독립적으로 구현
- ✅ 컴포넌트에서 Hook을 import하여 조립하는 형태
- ✅ ModalProvider를 통해 모달 기능을 독립적으로 제공

### ✅ 2. 최종 주의사항
- ✅ `package.json` 확인하여 사용 가능한 라이브러리 분석
- ✅ 폴더구조, 라우터구조 분석
- ⚠️ build 실행 확인 필요 (최종 단계에서 확인)

---

## @03-ui.mdc 적용 검토

### ✅ 1. icons/images 조건
- ✅ 아이콘과 이미지는 `public/icons/*`, `public/images/*` 경로 사용
- ✅ `EmotionType` ENUM을 통해 이미지 경로 관리
- ✅ 하드코딩된 경로 사용하지 않음

---

## @04-func.mdc 적용 검토

### ✅ 1. JS, HOOKS 조건

#### 모든 기능 및 데이터는 해당 파일 안에서 처리
- ✅ `useDiariesModal` Hook에서 모달 열기 로직 처리
- ✅ `useLinkModalClose` Hook에서 모달 닫기 로직 처리
- ✅ 각 Hook이 독립적으로 기능 처리

#### 의미를 담고 있는 구조화된 타입은 ENUM 활용
- ✅ `EmotionType` ENUM 사용
- ✅ `EMOTION_INFO` ENUM을 통한 구조화된 데이터 관리

#### 최소한의 useState, useEffect 사용
- ✅ `useState` 사용: `diaries-new/index.tsx`에서 폼 상태 관리
- ✅ `useEffect` 사용: `useDiariesModal`에서 이벤트 리스너 등록
- ✅ 최소한의 사용으로 필요한 기능만 구현

### ✅ 2. 페이지 링크(이동) 조건
- ✅ 페이지 이동은 URL 상수를 통해서만 이동
- ✅ 현재 검토 대상 파일에서는 직접적인 페이지 이동 없음

### ✅ 3. 모달 조건
- ✅ `ModalProvider`에서 `react-portal` (createPortal) 사용
- ✅ commons에 셋팅된 모달 시스템 활용
- ⚠️ `diaries-new/index.tsx`에서 직접 조건부 렌더링으로 모달 표시하는 부분이 있음
  - 이는 Provider를 통한 방식과 혼재되어 있으나, 최종적으로는 Provider를 통해 관리됨

### ✅ 6. TEST 조건

#### TDD 기반으로 playwright 테스트 먼저 작성
- ✅ 테스트 파일이 먼저 작성되었거나 함께 작성됨

#### playwright.config.ts 설정은 변경하지 말 것
- ✅ `playwright.config.ts` 변경 없음

#### playwright 테스트는 package.json scripts로만 테스트
- ✅ `npx playwright test` 명령 사용

#### mock 데이터 사용하지 말고 실제 데이터 사용
- ✅ 실제 페이지로 테스트
- ⚠️ `diaries/index.tsx`에서 `mockDiaryCards` 사용 중
  - 이는 UI 컴포넌트의 표시용 데이터이므로 테스트 데이터와는 별개

#### API 테스트 응답 결과 하드코딩하지 말 것
- ✅ API 테스트 없음 (해당 없음)

#### ❌ timeout 테스트 사용 문제 발견
**심각도: 높음**

커서룰: "테스트에 timeout 방식의 테스트말고, 다른 방식의 테스트가 가능하면, timeout 테스트는 사용하지 말 것."

**발견된 문제:**
```typescript
// tests/components/diaries-new/index.link.modal.close.hook.spec.ts
await page.waitForSelector('[data-testid="diaries-page-content"]', { timeout: 500 });
await page.waitForSelector('h2:has-text("일기쓰기")', { timeout: 500 });
await page.waitForSelector('[data-testid="diary-cancel-modal-title"]', { timeout: 500 });
await page.waitForTimeout(500);
await expect(page.locator('[data-testid="diaries-new-title"]')).not.toBeVisible({ timeout: 2000 });
```

**문제점:**
1. `waitForSelector`에 `timeout: 500` 사용
2. `waitForTimeout(500)` 사용
3. `expect().not.toBeVisible({ timeout: 2000 })` 사용

**해결 방안:**
- `waitForSelector`의 timeout 옵션 제거 (기본 대기 사용)
- `waitForTimeout` 제거하고 `waitForSelector` 또는 `expect`를 사용한 대기로 변경
- `expect().not.toBeVisible()`의 timeout 옵션 제거

#### ✅ page.goto는 baseUrl 포함하지 않고 경로만 추가
```typescript
await page.goto('/diaries');  // ✅ 경로만 사용
```

#### ✅ data-testid 지정하여 테스트
- ✅ 모든 주요 요소에 `data-testid` 추가
- ✅ 테스트에서 `data-testid` 사용
- ✅ `diaries-page-content`, `diary-new-button`, `diary-close-button`, `diaries-new-title`, `diary-cancel-modal-title` 등 사용

---

## 발견된 문제점 요약

### 🔴 심각한 문제 (즉시 수정 필요)

1. **테스트 timeout 사용 위반** (`tests/components/diaries-new/index.link.modal.close.hook.spec.ts`)
   - 커서룰: "다른 방식이 가능하면 timeout 테스트는 사용하지 말 것"
   - 현재: `waitForSelector`에 timeout 옵션 사용, `waitForTimeout` 사용, `expect`에 timeout 옵션 사용
   - 해결: timeout 옵션 제거하고 data-testid 기반 대기로 변경

### ⚠️ 경미한 문제 (검토 필요)

1. **모달 사용 방식 혼재**
   - `diaries-new/index.tsx`에서 직접 조건부 렌더링으로 모달 표시
   - Provider를 통한 방식과 혼재되어 있으나, 최종적으로는 Provider를 통해 관리됨
   - 현재는 동작하지만, 일관성을 위해 Provider를 통한 방식만 사용하는 것이 좋음

2. **mock 데이터 사용** (`diaries/index.tsx`)
   - UI 컴포넌트의 표시용 데이터이므로 테스트 데이터와는 별개
   - 하지만 실제 데이터를 사용하는 것이 더 나을 수 있음

---

## 권장 사항

### 즉시 수정 필요
1. **테스트 timeout 제거**
   - `tests/components/diaries-new/index.link.modal.close.hook.spec.ts` 파일 수정
   - 모든 timeout 옵션 제거
   - data-testid 기반 대기로 변경

### 검토 후 수정 권장
1. **모달 사용 방식 통일**
   - Provider를 통한 방식으로 완전히 통일
   - 직접 조건부 렌더링 제거

2. **빌드 실행 확인**
   - 최종 단계에서 `npm run build` 실행하여 확인

---

## 최종 검토 결과

### ✅ 준수된 커서룰
- @01-common.mdc: 대부분 준수 (명시된 파일만 수정, 새 라이브러리 미설치, 독립적 부품 조립)
- @03-ui.mdc: 준수 (상수 경로 사용)
- @04-func.mdc: 대부분 준수 (Hook 독립성, ENUM 활용, 최소한의 useState/useEffect, data-testid 사용, 경로만 사용)

### ❌ 위반된 커서룰
- @04-func.mdc TEST 조건: timeout 테스트 사용 위반

### 결론
**대부분의 커서룰을 준수하고 있으나, 테스트 timeout 사용 문제를 즉시 수정해야 합니다.**




