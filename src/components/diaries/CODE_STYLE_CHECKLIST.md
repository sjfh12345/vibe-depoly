# 코드 스타일 일관성 체크리스트

## 검토 대상 파일
- `src/components/diaries/hooks/index.link.modal.hook.tsx`
- `src/components/diaries/tests/index.link.modal.hook.spec.ts`

---

## 1. Hook 파일 스타일 (`index.link.modal.hook.tsx`)

### ✅ 'use client' 지시어
- [x] **'use client' 지시어 사용**
  - 파일 최상단에 `'use client';` 위치
  - 다른 client hook 파일들과 일치 (`index.binding.hook.ts`, `index.link.routing.hook.ts` 참고)

### ⚠️ Import 순서 및 경로 스타일
- [x] **Import 순서 일관성**
  - 순서: React hooks → 상수/타입 (enum 등) → Provider hooks → 컴포넌트
  - 현재: `useCallback, useEffect` → `useModal` → `useAuthGuard` → `DiariesNew`
  
- ⚠️ **Import 경로 스타일**
  - 현재: 상대 경로 사용 (`../../../commons/...`)
  - 비교: `index.auth.hook.ts`는 alias 경로 사용 (`@/commons/...`)
  - 비교: `index.link.routing.hook.ts`는 상대 경로 사용 (`../../../commons/...`)
  - **결론**: 프로젝트 내에 두 가지 스타일 혼재 (상대 경로도 허용 가능)

### ✅ JSDoc 주석 스타일
- [x] **JSDoc 주석 형식**
  - 함수 설명 추가 완료
  - `@returns` 태그 추가 완료
  - `index.link.routing.hook.ts`와 동일한 형식

### ✅ Return 타입 인터페이스
- [x] **Return 타입 인터페이스 정의**
  - `UseDiariesModalReturn` 인터페이스 추가 완료
  - `index.link.routing.hook.ts`와 동일한 패턴

### ✅ 함수 정의 스타일
- [x] **함수 export 패턴**
  - `export function useDiariesModal()`
  - 함수명: camelCase with `use` prefix
  - 다른 hook 파일들과 일치

### ✅ Hook 사용 패턴
- [x] **Hook 사용 패턴**
  - `useCallback` 사용 (메모이제이션)
  - `useEffect` 사용 (이벤트 리스너)
  - 의존성 배열 사용
  - 다른 hook 파일들과 일치

### ✅ Return 객체 형식
- [x] **Return 객체 스타일**
  - 객체 형태로 반환
  - 줄바꿈 및 들여쓰기 일관성
  - 형식:
    ```typescript
    return {
      openDiaryWriteModal,
    };
    ```
  - 다른 hook 파일들과 일치

### ✅ 빈 줄 스타일
- [x] **파일 끝 빈 줄**
  - 파일 끝에 빈 줄 2개 추가 완료
  - `index.link.routing.hook.ts`와 일치

### ✅ 주석 스타일
- [x] **인라인 주석 형식**
  - 한글 주석 사용
  - 설명적인 주석 포함

---

## 2. 테스트 파일 스타일 (`index.link.modal.hook.spec.ts`)

### ✅ Import 순서
- [x] **Import 순서 일관성**
  - `import { test, expect } from '@playwright/test';`
  - 다른 테스트 파일들과 일치

### ✅ JSDoc 주석 스타일
- [x] **테스트 주석 형식**
  - 파일 상단에 전체 테스트 설명 추가 완료
  - 각 테스트 케이스에 JSDoc 주석 추가 완료
  - 테스트 목적, 테스트 흐름 설명 추가 완료
  - `index.link.routing.hook.spec.ts`와 동일한 형식

### ✅ 테스트 함수 네이밍
- [x] **테스트 함수명 스타일**
  - 한글 설명 사용
  - `test.describe`로 그룹화
  - 다른 테스트 파일들과 일관성 유지

### ✅ 테스트 주석 스타일
- [x] **인라인 주석 형식**
  - `// 주석 내용` 형식
  - 설명적인 주석 사용
  - 다른 테스트 파일들과 일치

### ✅ 빈 줄 스타일
- [x] **파일 끝 빈 줄**
  - 파일 끝에 빈 줄 2개
  - 다른 테스트 파일들과 일치

---

## 3. 네이밍 컨벤션

### ✅ 변수명
- [x] **변수명 스타일**
  - camelCase 사용
  - 예: `openModal`, `closeModal`, `guard`

### ✅ 함수명
- [x] **함수명 스타일**
  - camelCase 사용
  - Hook 함수: `use` prefix
  - 예: `useDiariesModal`, `openDiaryWriteModal`

### ✅ 인터페이스명
- [x] **인터페이스명 스타일**
  - PascalCase 사용: `UseDiariesModalReturn`
  - Return 타입: `Use` prefix + `Return` suffix
  - 다른 hook 파일들과 일치

---

## 4. 코드 포맷팅

### ✅ 들여쓰기
- [x] **들여쓰기 일관성**
  - 2 spaces 사용
  - 프로젝트 전체와 일관성 유지

### ✅ 줄바꿈
- [x] **줄바꿈 스타일**
  - 함수, 객체, 배열에서 적절한 줄바꿈 사용
  - Return 객체에서 줄바꿈 사용

### ✅ 세미콜론
- [x] **세미콜론 사용**
  - 모든 문장 끝에 세미콜론 사용
  - 프로젝트 전체와 일관성 유지

---

## 5. 다른 파일들과의 일관성

### ✅ 다른 hook 파일들과 비교
- [x] **구조 일관성**
  - Hook 파일 구조 유사
  - Import 순서 일관성
  - 함수 정의 패턴 일치
  - Return 객체 형식 일치
  - JSDoc 주석 추가 완료
  - Return 타입 인터페이스 추가 완료
  - 파일 끝 빈 줄 추가 완료

### ✅ 다른 테스트 파일들과 비교
- [x] **테스트 스타일 일관성**
  - 테스트 구조 일치
  - 인라인 주석 형식 일치
  - 빈 줄 스타일 일치
  - JSDoc 주석 추가 완료 (각 테스트 케이스)

---

## 발견된 문제점 및 수정 사항

### ✅ 수정 완료

1. **JSDoc 주석 추가 완료** (`index.link.modal.hook.tsx`) ✅
   - 함수 설명 추가 완료
   - `@returns` 태그 추가 완료
   - `index.link.routing.hook.ts`와 동일한 형식

2. **Return 타입 인터페이스 추가 완료** (`index.link.modal.hook.tsx`) ✅
   - `UseDiariesModalReturn` 인터페이스 추가 완료
   - `index.link.routing.hook.ts`와 동일한 패턴

3. **파일 끝 빈 줄 추가 완료** (`index.link.modal.hook.tsx`) ✅
   - 파일 끝에 빈 줄 2개 추가 완료

4. **테스트 JSDoc 주석 추가 완료** (`index.link.modal.hook.spec.ts`) ✅
   - 파일 상단에 전체 테스트 설명 추가 완료
   - 각 테스트 케이스에 JSDoc 주석 추가 완료
   - 테스트 목적, 테스트 흐름 설명 추가 완료
   - `index.link.routing.hook.spec.ts`와 동일한 형식

### ⚠️ 검토 완료 (선택사항)

1. **Import 경로 스타일**
   - 현재: 상대 경로 사용
   - 프로젝트 내에 두 가지 스타일 혼재 (상대 경로, alias 경로)
   - 현재 상태 유지 가능 (다른 파일들과 일치)

---

## 최종 검토 결과

### ✅ 준수된 스타일
- 'use client' 지시어 사용
- Import 순서 일관성
- 함수 정의 패턴
- Hook 사용 패턴
- Return 객체 형식
- 들여쓰기, 줄바꿈, 세미콜론
- 테스트 구조 및 주석 스타일
- 네이밍 컨벤션

### ❌ 수정 필요
없음 (모두 수정 완료)

### 결론
**모든 스타일 일관성 요구사항을 준수하고 있으며, 발견된 모든 문제점이 수정 완료되었습니다.**

---

## 검토 일자
2024-12-19
