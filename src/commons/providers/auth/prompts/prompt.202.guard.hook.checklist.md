# Auth Guard Hook 구현 체크리스트

## 조건-커서룰 적용 결과

### @01-common.mdc 적용 결과
- ✅ 명시된 파일(`src/commons/providers/auth/auth.guard.hook.tsx`) 이외에는 수정하지 않음
- ✅ 명시하지 않은 라이브러리를 설치하지 않음
- ✅ 독립적인 부품들의 조립 형태로 구현 (hook, guard 함수, 모달 표시 함수 분리)
- ✅ 린터 오류 없음

## 조건-파일경로

- ✅ 구현 파일 경로: `src/commons/providers/auth/auth.guard.hook.tsx`

## 핵심요구사항 - 액션 GUARD 구현

### 1-1) 인가 시점
- ✅ 함수 요청 시 인가 검증 수행 (`guard` 함수 호출 시)

### 1-2) 인가 조건
- ✅ 인증 프로바이더 경로: `src/commons/providers/auth/auth.provider.tsx` 사용
- ✅ 기존 `auth.provider` 사용 (`useAuth` hook 사용)
- ✅ 기존 `auth.provider` 수정하지 않음

### 1-3) 인가 방법
- ✅ 인증 프로바이더의 `isLoggedIn` 기능을 활용하여 로그인 유/무 판단

### 1-4) 인가 실패 처리
- ✅ 회원 전용 기능에서 실패한 경우 (로그인하지 않은 경우)
  - ✅ "로그인하시겠습니까" 모달 노출

### 1-5) 권한분기테스트를 위한 기본값 설정
- ✅ 테스트 환경 변수 설정: `NEXT_PUBLIC_TEST_ENV=test`
- ✅ 전역 변수 설정: `window.__TEST_BYPASS__` 사용
- ✅ 실제 환경: 항상 "비로그인 유저"를 기본으로 하여 로그인 검사 수행 (패스하지 않음)
- ✅ 테스트 환경: 항상 "로그인 유저"를 기본으로 하여 로그인 검사 패스
  - ✅ 비회원 가드테스트 필요 시 (`window.__TEST_BYPASS__ === false`): 로그인 검사 수행

## 각 상황별 모달 처리

### 2-1) 모달 조건
- ✅ 모달 프로바이더 경로: `src/commons/providers/modal/modal.provider.tsx` 사용
- ✅ 기존 `modal.provider` 사용 (`useModal` hook 사용)
- ✅ 기존 `modal.provider` 수정하지 않음
- ✅ 모달은 한 번만 표시 (`hasShownModalRef`로 중복 표시 방지)
- ✅ 모달이 닫힌 뒤에는 같은 상황에서 다시 나타나지 않도록 처리

### 2-2) 공통 컴포넌트 조건
- ✅ 로그인하시겠습니까 모달: `<Modal />` 사용
- ✅ `variant: 'info'` 설정
- ✅ `actions: 'dual'` 설정
- ✅ `confirmText: '로그인하러가기'` 설정
- ✅ `cancelText: '취소'` 설정

### 2-3) 페이지 이동 조건
- ✅ `commons/constants/url.ts`의 `getRoutePath(RouteType.LOGIN)` 사용
- ✅ '로그인하러가기' 클릭 시:
  - ✅ 열려있는 모든 모달 닫기 (`closeAllModals()`)
  - ✅ 로그인 페이지로 이동 (`/auth/login`)
- ✅ '취소' 클릭 시:
  - ✅ 열려있는 모든 모달 닫기 (`closeAllModals()`)

## 구현 세부사항

### Hook 구조
- ✅ `useAuthGuard` hook 구현
- ✅ `guard` 함수 반환 (호출 시 인가 검증 수행)
- ✅ `showLoginModal` 함수 구현 (모달 표시 로직)
- ✅ `useRef`를 사용한 모달 중복 표시 방지

### 의존성 관리
- ✅ `useAuth` hook 사용
- ✅ `useModal` hook 사용
- ✅ `useRouter` hook 사용
- ✅ `useCallback`을 사용한 함수 메모이제이션
- ✅ 적절한 의존성 배열 설정

### 타입 안정성
- ✅ TypeScript 타입 안정성 확보
- ✅ 린터 오류 없음

