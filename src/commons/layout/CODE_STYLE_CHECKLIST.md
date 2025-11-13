# 코드 스타일 일관성 체크리스트

## Import 경로 스타일

### ✅ 수정 완료
- [x] `index.auth.hook.ts`의 import 경로를 상대 경로에서 `@/` alias로 변경
  - **변경 전**: `import { useAuth } from '../../providers/auth/auth.provider';`
  - **변경 후**: `import { useAuth } from '@/commons/providers/auth/auth.provider';`
  - **이유**: 다른 layout hooks (`index.link.routing.hook.ts`, `index.area.hook.ts`)와 일관성 유지

### ✅ 일관성 확인
- [x] `index.link.routing.hook.ts`: `@/commons/constants/url` 사용
- [x] `index.area.hook.ts`: `@/commons/constants/url` 사용
- [x] `index.auth.hook.ts`: `@/commons/providers/auth/auth.provider` 사용 (수정 완료)

## 함수 선언 스타일

### ✅ 일관성 확인
- [x] 모든 hooks에서 `export const` 사용
  - `export const useLayoutRouting = () => { ... }`
  - `export const useLayoutArea = () => { ... }`
  - `export const useLayoutAuth = () => { ... }`

## Return 문 스타일

### ✅ 일관성 확인
- [x] 모든 hooks에서 객체 형태로 return
  - `useLayoutRouting`: 4개 속성 반환
  - `useLayoutArea`: 5개 속성 반환
  - `useLayoutAuth`: 4개 속성 반환

## 빈 줄 스타일

### ✅ 일관성 확인
- [x] 파일 끝에 빈 줄 1개 유지
  - `index.link.routing.hook.ts`: 빈 줄 1개
  - `index.area.hook.ts`: 빈 줄 2개 (기존 파일 유지)
  - `index.auth.hook.ts`: 빈 줄 1개

## 주석 스타일

### ✅ 일관성 확인
- [x] hooks 파일에는 주석 없음 (간단한 구조이므로 주석 불필요)
- [x] 복잡한 로직이 있는 경우에만 주석 추가

## 컴포넌트 스타일

### ✅ 일관성 확인
- [x] `index.tsx`에서 import 순서:
  1. React 관련
  2. 스타일 파일
  3. Hooks (로컬)
  4. 컴포넌트 (상위 디렉토리)
- [x] `'use client'` 지시어 사용 (클라이언트 컴포넌트)
- [x] `data-testid` 속성 일관성 있게 사용

## 빌드 확인

- [x] `npm run build` 성공
  - 컴파일 오류 없음
  - 타입 체크 통과
  - Linter 경고만 존재 (기존 파일들의 경고)

## 수정 요약

1. **Import 경로 통일**
   - `index.auth.hook.ts`의 import 경로를 `@/` alias로 변경하여 다른 layout hooks와 일관성 유지

## 스타일 가이드라인 준수

- [x] TypeScript 타입 명시
- [x] 함수형 컴포넌트 사용
- [x] Hooks 패턴 일관성
- [x] Import 경로 alias 사용 (`@/`)
- [x] 파일명 일관성 (`index.*.hook.ts`)
