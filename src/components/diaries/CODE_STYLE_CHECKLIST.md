# 코드 스타일 일관성 체크리스트

## 파일 구조 및 스타일 검토

### 1. Hook 파일 스타일 (`src/components/diaries/hooks/index.binding.hook.ts`)

#### ✅ 'use client' 지시어
- [x] **'use client' 지시어 사용**
  - 파일 최상단에 `'use client';` 위치
  - 다른 client hook 파일들과 일치 (`diaries-detail/hooks/index.binding.hook.ts` 참고)

#### ✅ Import 순서
- [x] **Import 순서 일관성**
  - 순서: React hooks → 상수/타입 (enum 등)
  - 패턴: `import { useState, useEffect } from 'react';`
  - 다음: `import { EmotionType, EMOTION_INFO } from '../../../commons/constants/enum';`
  - `diaries-detail/hooks/index.binding.hook.ts`와 동일한 패턴

#### ✅ 인터페이스 정의
- [x] **인터페이스 export 패턴**
  - `export interface` 사용
  - 인터페이스명: PascalCase
  - 순서: 데이터 인터페이스 → Return 타입 인터페이스
  - 패턴:
    ```typescript
    export interface DiaryData { ... }
    export interface DiaryCard { ... }
    export interface UseDiariesBindingReturn { ... }
    ```
  - `diaries-detail/hooks/index.binding.hook.ts`와 동일한 패턴

#### ✅ 함수 정의 스타일
- [x] **함수 export 패턴**
  - `export function useDiariesBinding(): UseDiariesBindingReturn`
  - 함수명: camelCase with `use` prefix
  - Return 타입 명시

#### ✅ JSDoc 주석 스타일
- [x] **JSDoc 주석 형식**
  - 함수 설명
  - 상세 설명 (빈 줄 포함)
  - `@returns` 태그 사용
  - 형식:
    ```typescript
    /**
     * 일기 목록 데이터 바인딩 훅
     * 
     * 로컬스토리지에서 diaries 배열을 로드하여 카드 형태로 변환합니다.
     * 
     * @returns {UseDiariesBindingReturn} 일기 카드 배열, 로딩 상태
     */
    ```
  - `diaries-detail/hooks/index.binding.hook.ts`와 동일한 스타일

#### ✅ useState/useEffect 패턴
- [x] **Hook 사용 패턴**
  - `useState` 초기값 명시
  - `useEffect` 의존성 배열 사용
  - 에러 처리: try-catch-finally
  - `diaries-detail/hooks/index.binding.hook.ts`와 동일한 패턴

#### ✅ Return 객체 형식
- [x] **Return 객체 스타일**
  - 객체 형태로 반환
  - 줄바꿈 및 들여쓰기 일관성
  - 형식:
    ```typescript
    return {
      diaryCards,
      isLoading,
    };
    ```
  - `diaries-detail/hooks/index.binding.hook.ts`와 동일한 스타일

### 2. 컴포넌트 파일 스타일 (`src/components/diaries/index.tsx`)

#### ✅ Import 순서
- [x] **Import 순서 일관성**
  - React → CSS Modules → 공통 컴포넌트 → 상수 → Hook
  - 순서:
    1. `import React, { useState } from 'react';`
    2. `import styles from './styles.module.css';`
    3. 공통 컴포넌트들 (Selectbox, Searchbar, Button, Pagination)
    4. 상수 (`EMOTION_INFO`)
    5. Hook (`useDiariesModal`, `useDiariesBinding`)

#### ✅ 함수 정의
- [x] **함수 export 패턴**
  - `export default function Diaries()`
  - 함수명: PascalCase

#### ✅ 변수 및 함수 정의 순서
- [x] **코드 구조 일관성**
  - 순서: useState → 상수 → Hook 호출 → Handler 함수 → JSX 반환
  - 패턴:
    ```typescript
    const [state] = useState(...);
    const constant = ...;
    const { hook } = useHook();
    const handle = () => { ... };
    return (...);
    ```

#### ✅ JSX 주석 스타일
- [x] **JSX 주석 형식**
  - `{/* 주석 내용 */}` 형식 사용
  - 설명적인 주석 포함 (예: `{/* 첫 번째 gap 영역 - 32px */}`)

### 3. 테스트 파일 스타일 (`tests/components/diaries/index.binding.hook.spec.ts`)

#### ✅ Import 순서
- [x] **Import 순서 일관성**
  - `import { test, expect } from '@playwright/test';`
  - 다른 테스트 파일들과 동일

#### ✅ JSDoc 주석 스타일
- [x] **테스트 주석 형식**
  - 테스트 케이스 설명
  - 테스트 목적 (번호 목록)
  - 테스트 흐름 (번호 목록)
  - 형식:
    ```typescript
    /**
     * 테스트 케이스 1: 로컬스토리지에서 일기 데이터를 로드하여 바인딩함
     * 
     * 테스트 목적:
     * 1. ...
     * 2. ...
     * 
     * 테스트 흐름:
     * 1) ...
     * 2) ...
     */
    ```
  - `tests/components/diaries-detail/index.binding.hook.spec.ts`와 동일한 스타일

#### ✅ 테스트 함수 네이밍
- [x] **테스트 함수명 스타일**
  - 한글 설명 사용
  - 형식: `test('로컬스토리지에서 일기 데이터를 로드하여 바인딩함', async ({ page }) => { ... })`
  - 다른 테스트 파일들과 일관성 유지

#### ✅ 테스트 주석 스타일
- [x] **인라인 주석 형식**
  - `// 주석 내용` 형식
  - 설명적인 주석 사용
  - 예: `// 먼저 페이지로 이동 (localStorage 접근을 위해)`

### 4. 네이밍 컨벤션

#### ✅ 변수명
- [x] **변수명 스타일**
  - camelCase 사용
  - 예: `diaryCards`, `isLoading`, `filterValue`, `searchValue`

#### ✅ 함수명
- [x] **함수명 스타일**
  - camelCase 사용
  - Handler 함수: `handle` prefix
  - Hook 함수: `use` prefix
  - 예: `handleFilterChange`, `useDiariesBinding`

#### ✅ 인터페이스명
- [x] **인터페이스명 스타일**
  - PascalCase 사용
  - Return 타입: `Use` prefix + `Return` suffix
  - 예: `DiaryData`, `DiaryCard`, `UseDiariesBindingReturn`

#### ✅ 타입명
- [x] **타입명 스타일**
  - PascalCase 사용
  - 예: `EmotionType`

### 5. 코드 포맷팅

#### ✅ 들여쓰기
- [x] **들여쓰기 일관성**
  - 2 spaces 사용
  - 프로젝트 전체와 일관성 유지

#### ✅ 줄바꿈
- [x] **줄바꿈 스타일**
  - 함수, 객체, 배열에서 적절한 줄바꿈 사용
  - Return 객체에서 줄바꿈 사용

#### ✅ 세미콜론
- [x] **세미콜론 사용**
  - 모든 문장 끝에 세미콜론 사용
  - 프로젝트 전체와 일관성 유지

### 6. 다른 파일들과의 일관성

#### ✅ diaries-detail과 비교
- [x] **구조 일관성**
  - Hook 파일 구조 유사
  - 인터페이스 정의 패턴 일치
  - JSDoc 주석 스타일 일치
  - Return 객체 형식 일치

#### ✅ 다른 hook 파일들과 비교
- [x] **패턴 일관성**
  - `useDiariesModal` hook과 구조 유사
  - Import 순서 일관성
  - 함수 정의 패턴 일치

#### ✅ 테스트 파일과 비교
- [x] **테스트 스타일 일관성**
  - `tests/components/diaries-detail/index.binding.hook.spec.ts`와 동일한 스타일
  - JSDoc 주석 형식 일치
  - 테스트 구조 일치

## 개선 사항

### ✅ 모든 스타일 일관성 요구사항 충족

현재 구현된 코드는 프로젝트의 다른 파일들과 일관된 스타일을 유지하고 있습니다:

1. **Hook 파일**: `diaries-detail/hooks/index.binding.hook.ts`와 동일한 패턴
2. **컴포넌트 파일**: 기존 컴포넌트 스타일과 일치
3. **테스트 파일**: 다른 테스트 파일들과 동일한 스타일
4. **네이밍**: 프로젝트 컨벤션 준수
5. **코드 포맷팅**: 프로젝트 표준 준수

### 참고 사항

- 모든 파일이 프로젝트의 기존 스타일 가이드와 일관성을 유지하고 있습니다.
- 다른 유사한 파일들(`diaries-detail`)과 동일한 패턴을 따르고 있습니다.
- 추가적인 스타일 수정이 필요하지 않습니다.

