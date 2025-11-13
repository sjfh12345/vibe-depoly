# 코드 스타일 일관성 체크리스트

## 파일 구조 및 스타일 검토

### 1. Hook 파일 스타일 (`src/components/auth-signup/hooks/index.form.hook.tsx`)

#### ✅ 'use client' 지시어
- [x] **'use client' 지시어 사용**
  - 파일 최상단에 `'use client';` 위치
  - single quote 사용 (프로젝트 표준과 일치)
  - 다른 client hook 파일들과 일치 (`diaries/hooks/index.binding.hook.ts`, `diaries-new/hooks/index.form.hook.tsx` 참고)

#### ✅ Import 순서
- [x] **Import 순서 일관성**
  - 순서: React hooks → 외부 라이브러리 → 내부 모듈
  - 패턴:
    1. `import { useForm } from 'react-hook-form';`
    2. `import { zodResolver } from '@hookform/resolvers/zod';`
    3. `import { z } from 'zod';`
    4. `import { useMutation } from '@tanstack/react-query';`
    5. `import { useRouter } from 'next/navigation';`
    6. 내부 모듈들 (providers, components, constants)
  - `diaries-new/hooks/index.form.hook.tsx`와 유사한 패턴

#### ✅ 인터페이스 정의
- [x] **인터페이스 export 패턴**
  - `export interface` 사용
  - 인터페이스명: PascalCase
  - 순서: 스키마 타입 → API 인터페이스 → Return 타입 인터페이스
  - 패턴:
    ```typescript
    export type SignupFormData = z.infer<typeof signupSchema>;
    interface CreateUserInput { ... }
    interface CreateUserResponse { ... }
    ```
  - `diaries-new/hooks/index.form.hook.tsx`와 유사한 패턴

#### ✅ 함수 정의 스타일
- [x] **함수 export 패턴**
  - `export function useSignupForm()` 사용
  - 함수명: camelCase with `use` prefix
  - Return 타입 명시 (인터페이스로 정의 가능하나 현재는 inline)
  - `diaries/hooks/index.binding.hook.ts`, `diaries-new/hooks/index.form.hook.tsx`와 동일한 패턴

#### ✅ JSDoc 주석 스타일
- [x] **JSDoc 주석 형식**
  - 함수 설명
  - 상세 설명 (빈 줄 포함)
  - 형식:
    ```typescript
    /**
     * 회원가입 폼 스키마
     */
    /**
     * GraphQL createUser mutation 요청
     */
    /**
     * 회원가입 폼 훅
     */
    ```
  - `diaries/hooks/index.binding.hook.ts`와 유사한 스타일
  - 다만 Return 타입에 대한 `@returns` 태그가 없음 (개선 가능)

#### ✅ Hook 사용 패턴
- [x] **Hook 사용 패턴**
  - `useForm` hook 사용 (react-hook-form)
  - `useMutation` hook 사용 (@tanstack/react-query)
  - `useRouter` hook 사용 (next/navigation)
  - `useModal` hook 사용 (custom provider)
  - `diaries-new/hooks/index.form.hook.tsx`와 유사한 패턴

#### ✅ Return 객체 형식
- [x] **Return 객체 스타일**
  - 객체 형태로 반환
  - 줄바꿈 및 들여쓰기 일관성
  - 형식:
    ```typescript
    return {
      register,
      onSubmit,
      errors,
      isFormValid,
      isLoading: mutation.isPending,
    };
    ```
  - `diaries/hooks/index.binding.hook.ts`와 동일한 스타일

### 2. 컴포넌트 파일 스타일 (`src/components/auth-signup/index.tsx`)

#### ✅ 'use client' 지시어
- [x] **'use client' 지시어 사용**
  - 파일 최상단에 `'use client';` 위치
  - single quote 사용 (프로젝트 표준과 일치)

#### ✅ Import 순서
- [x] **Import 순서 일관성**
  - React → Next.js → 공통 컴포넌트 → 외부 라이브러리 → Hook → 상수 → CSS Modules
  - 순서:
    1. `import React, { useEffect } from 'react';`
    2. `import Link from 'next/link';`
    3. 공통 컴포넌트들 (Input, Button)
    4. 외부 라이브러리 (`useTheme` from 'next-themes')
    5. Hook (`useSignupForm`)
    6. 상수 (`RouteType, getRoutePath`)
    7. CSS Modules (`styles`)
  - `diaries/index.tsx`와 유사한 패턴

#### ✅ 함수 정의
- [x] **함수 export 패턴**
  - `export default function AuthSignup()`
  - 함수명: PascalCase
  - `diaries/index.tsx`와 동일한 패턴

#### ✅ 변수 및 함수 정의 순서
- [x] **코드 구조 일관성**
  - 순서: Hook 호출 → useEffect → JSX 반환
  - 패턴:
    ```typescript
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { register, onSubmit, errors, isFormValid, isLoading } = useSignupForm();
    useEffect(() => { ... }, []);
    return (...);
    ```
  - `diaries/index.tsx`와 유사한 패턴

#### ✅ JSX 주석 스타일
- [x] **JSX 주석 형식**
  - 인라인 스타일 사용 (에러 메시지 표시)
  - `{/* 주석 내용 */}` 형식은 사용하지 않음 (필요시 사용 가능)

### 3. 테스트 파일 스타일 (`tests/components/auth-signup/index.form.hook.spec.ts`)

#### ✅ Import 순서
- [x] **Import 순서 일관성**
  - `import { test, expect } from '@playwright/test';`
  - 다른 테스트 파일들과 동일

#### ✅ 테스트 함수 네이밍
- [x] **테스트 함수명 스타일**
  - 한글 설명 사용
  - 형식: `test('모든 입력값이 유효하면 회원가입 버튼이 활성화됨', async ({ page }) => { ... })`
  - 다른 테스트 파일들과 일관성 유지

#### ✅ 테스트 주석 스타일
- [x] **인라인 주석 형식**
  - `// 주석 내용` 형식
  - 설명적인 주석 사용
  - 예: `// 클릭 전에 응답 대기 설정`, `// 응답 대기 (타임아웃 내에 응답이 오지 않으면 실패)`

### 4. 네이밍 컨벤션

#### ✅ 변수명
- [x] **변수명 스타일**
  - camelCase 사용
  - 예: `signupSchema`, `createUser`, `isFormValid`, `isLoading`

#### ✅ 함수명
- [x] **함수명 스타일**
  - camelCase 사용
  - Hook 함수: `use` prefix
  - 예: `useSignupForm`, `createUser`, `onSubmit`

#### ✅ 인터페이스명
- [x] **인터페이스명 스타일**
  - PascalCase 사용
  - 예: `SignupFormData`, `CreateUserInput`, `CreateUserResponse`

#### ✅ 타입명
- [x] **타입명 스타일**
  - PascalCase 사용
  - 예: `SignupFormData` (zod infer)

#### ✅ 상수명
- [x] **상수명 스타일**
  - camelCase 사용 (스키마)
  - 예: `signupSchema`

### 5. 코드 포맷팅

#### ✅ 들여쓰기
- [x] **들여쓰기 일관성**
  - 2 spaces 사용
  - 프로젝트 전체와 일관성 유지

#### ✅ 줄바꿈
- [x] **줄바꿈 스타일**
  - 함수, 객체, 배열에서 적절한 줄바꿈 사용
  - Return 객체에서 줄바꿈 사용
  - 긴 조건문에서 줄바꿈 사용

#### ✅ 세미콜론
- [x] **세미콜론 사용**
  - 모든 문장 끝에 세미콜론 사용
  - 프로젝트 전체와 일관성 유지

### 6. 다른 파일들과의 일관성

#### ✅ diaries-new과 비교
- [x] **구조 일관성**
  - Hook 파일 구조 유사 (`index.form.hook.tsx`)
  - react-hook-form + zod 패턴 일치
  - useMutation 패턴 일치
  - 모달 처리 패턴 일치

#### ✅ diaries와 비교
- [x] **패턴 일관성**
  - `export function useXxx()` 패턴 일치
  - Return 객체 형식 일치
  - JSDoc 주석 스타일 유사

#### ✅ pictures와 비교
- [x] **Hook 스타일 일관성**
  - `export function useXxx(): ReturnType` 패턴 일치
  - 인터페이스 정의 패턴 일치

#### ✅ 테스트 파일과 비교
- [x] **테스트 스타일 일관성**
  - 다른 테스트 파일들과 동일한 스타일
  - 한글 테스트 설명 사용
  - 인라인 주석 형식 일치

## 개선 사항

### ⚠️ 개선 가능한 부분

1. **JSDoc 주석 보완**
   - `useSignupForm` 함수에 `@returns` 태그 추가 가능
   - 예:
     ```typescript
     /**
      * 회원가입 폼 훅
      * 
      * react-hook-form과 zod를 사용하여 회원가입 폼을 관리합니다.
      * 
      * @returns {Object} register, onSubmit, errors, isFormValid, isLoading
      */
     ```

2. **Return 타입 인터페이스 정의**
   - 현재는 inline return 타입 사용
   - 인터페이스로 정의하면 더 명확함
   - 예:
     ```typescript
     export interface UseSignupFormReturn {
       register: UseFormRegister<SignupFormData>;
       onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
       errors: FieldErrors<SignupFormData>;
       isFormValid: boolean;
       isLoading: boolean;
     }
     ```
   - 다만, `diaries-new/hooks/index.form.hook.tsx`도 inline return 타입을 사용하므로 현재 스타일도 일관성 있음

### ✅ 모든 스타일 일관성 요구사항 충족

현재 구현된 코드는 프로젝트의 다른 파일들과 일관된 스타일을 유지하고 있습니다:

1. **Hook 파일**: `diaries/hooks/index.binding.hook.ts`, `diaries-new/hooks/index.form.hook.tsx`와 동일한 패턴
2. **컴포넌트 파일**: 기존 컴포넌트 스타일과 일치
3. **테스트 파일**: 다른 테스트 파일들과 동일한 스타일
4. **네이밍**: 프로젝트 컨벤션 준수
5. **코드 포맷팅**: 프로젝트 표준 준수

### 참고 사항

- 모든 파일이 프로젝트의 기존 스타일 가이드와 일관성을 유지하고 있습니다.
- 다른 유사한 파일들(`diaries`, `diaries-new`, `pictures`)과 동일한 패턴을 따르고 있습니다.
- 추가적인 스타일 수정이 필요하지 않습니다.


