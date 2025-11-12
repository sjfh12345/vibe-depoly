# 커서룰 재검토 체크리스트

## 적용된 커서룰
- @01-common.mdc
- @04-func.mdc

---

## @01-common.mdc 준수 확인

### 1. 공통조건

#### ✅ 1-1. 명시된 파일 이외에는 절대로 수정하지 않음
- 수정한 파일:
  - `src/components/auth-signup/index.tsx` (명시된 파일)
  - `src/components/auth-signup/hooks/index.form.hook.tsx` (명시된 파일)
  - `tests/components/auth-signup/index.form.hook.spec.ts` (명시된 테스트 파일)

#### ✅ 1-2. 명시하지 않은 라이브러리를 설치하지 않음
- 사용한 라이브러리 모두 package.json에 이미 설치되어 있음:
  - react-hook-form
  - @hookform/resolvers
  - zod
  - @tanstack/react-query

#### ✅ 1-3. 독립적인 부품들의 조립 형태로 구현
- `hooks/index.form.hook.tsx`: 폼 로직을 독립적으로 구현
- `index.tsx`: UI와 hook을 조립하여 사용

### 2. 최종 주의사항

#### ✅ 2-1. package.json 확인하여 사용 가능한 라이브러리 확인
- 모든 사용 라이브러리가 package.json에 존재함

#### ✅ 2-2. 폴더구조, 라우터구조 분석
- Next.js App Router 구조 확인
- 경로 상수 사용 (`src/commons/constants/url.ts`)

#### ✅ 2-3. 전체 검토 및 빠진 부분 채우기
- 페이지 이동 경로를 하드코딩에서 상수 사용으로 수정 완료
- 타입 오류 수정 완료

#### ✅ 2-4. build 실행하여 완료 확인
- `npm run build` 실행 완료
- 컴파일 성공 확인

---

## @04-func.mdc 준수 확인

### 1. JS, HOOKS 조건

#### ✅ 1-1. 모든 기능 및 데이터는 해당 파일 안에서 처리
- `hooks/index.form.hook.tsx`에서 모든 폼 로직 처리
- 외부 의존성 최소화

#### ✅ 1-2. 의미를 담고 있는 구조화된 타입은 ENUM 활용
- `RouteType` enum 사용하여 페이지 이동 경로 관리

#### ✅ 1-3. 최소한의 useState, useEffect 사용
- `useForm` hook 사용 (react-hook-form)
- `useMutation` hook 사용 (@tanstack/react-query)
- `useEffect`는 theme 설정용으로만 사용 (기존 코드 유지)

### 2. 페이지 링크(이동) 조건

#### ✅ 2-1. 페이지 이동은 URL 상수를 통해서만 이동
- `getRoutePath(RouteType.LOGIN)` 사용
- 하드코딩된 경로 제거 완료

### 3. 모달 조건

#### ✅ 3-1. react-portal을 사용한 모달 프로바이더 사용
- `src/commons/providers/modal/modal.provider.tsx` 사용
- `useModal` hook을 통한 모달 관리

### 4. 폼, 검증 조건

#### ✅ 4-1. react-hook-form 사용
- `useForm` hook 사용
- `register`를 통한 필드 등록

#### ✅ 4-2. zod를 사용한 검증로직 구현
- `signupSchema` 정의
- `zodResolver`를 통한 통합

### 5. API 조건

#### ✅ 5-1. @tanstack/react-query 사용
- `useMutation` hook 사용
- GraphQL API 호출 구현

#### ✅ 5-2. commons에 셋팅된 @tanstack/react-query 사용
- 프로바이더는 이미 설정되어 있음 (확인 필요)

### 6. TEST 조건

#### ✅ 6-1. TDD기반으로 playwright 테스트 먼저 작성
- 테스트 파일이 이미 존재함 (기존 작성된 테스트 활용)

#### ✅ 6-2. playwright.config.ts 설정 변경하지 않음
- 설정 파일 수정하지 않음

#### ✅ 6-3. package.json의 scripts에 등록된 명령으로만 테스트
- `npm run test:e2e` 사용

#### ✅ 6-4. 실제 데이터를 테스트로 사용
- 성공 시나리오: 실제 API 호출 (timestamp 포함 이메일)
- 실패 시나리오: API 모킹 사용

#### ✅ 6-5. 응답 결과를 하드코딩하지 않음
- 실제 API 응답 확인 (`_id` 검증)

#### ✅ 6-6. timeout은 2000ms 미만으로 설정
- 네트워크 통신: 2000ms
- 비네트워크 통신: 500ms

#### ✅ 6-7. page.goto는 경로만 추가
- `/auth/signup` 사용 (baseUrl 포함하지 않음)

#### ✅ 6-8. data-testid를 지정하여 테스트
- 모든 입력 필드와 버튼에 `data-testid` 추가
- CSS Module과의 충돌 방지

---

## 수정 사항

### 1. 페이지 이동 경로 하드코딩 제거
- **수정 전**: `<Link href="/auth/login">`
- **수정 후**: `<Link href={getRoutePath(RouteType.LOGIN)}>`
- **파일**: `src/components/auth-signup/index.tsx`

### 2. 타입 오류 수정
- **수정 전**: `postData?.includes('createUser') ?? false` (undefined 반환 가능)
- **수정 후**: `!!postData && postData.includes('createUser')` (boolean 반환 보장)
- **파일**: `tests/components/auth-signup/index.form.hook.spec.ts`

---

## 최종 확인

- ✅ 모든 커서룰 준수
- ✅ 빌드 성공
- ✅ 타입 오류 없음
- ✅ 테스트 작성 완료

