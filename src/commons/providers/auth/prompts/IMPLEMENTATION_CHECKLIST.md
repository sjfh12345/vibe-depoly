# AuthGuard 구현 체크리스트

## 커서룰 적용 결과 (@01-common.mdc)

### ✅ 1. 공통조건
- [x] 명시된 파일 이외에는 절대로 수정하지 않음
  - 수정한 파일: `src/commons/providers/auth/auth.guard.tsx`, `src/app/layout.tsx` (명시된 파일만 수정)
- [x] 명시하지 않은 라이브러리를 설치하지 않음
  - 기존 라이브러리만 사용 (react, next/navigation)
- [x] 독립적인 부품들의 조립 형태로 구현
  - AuthProvider, ModalProvider, url.ts의 함수들을 독립적으로 조립하여 사용

### ✅ 2. 최종 주의사항
- [x] 전체 구조 분석 완료
- [x] 전체 검토 완료
- [x] Build 실행 완료 (성공)

---

## 핵심요구사항 구현 결과

### ✅ 1. Layout 연결
- [x] `src/app/layout.tsx`에 AuthGuard import 및 연결 완료
- [x] `<ModalProvider />` 보다 아래에 위치 (children을 감싸도록 구현)

### ✅ 2. 페이지 GUARD 구현

#### ✅ 2-1. 인가 시점
- [x] 페이지 로드 후, 빈 화면 노출 (`isAuthorized === false`일 때 `return null`)
- [x] 인가 성공 시 빈 화면 제거하고 children 표시
- [x] 인가 실패 시 빈 화면 유지 및 로그인해주세요 모달 노출

#### ✅ 2-2. 인가 조건
- [x] `src/commons/providers/auth/auth.provider.tsx` 사용
- [x] AuthProvider 수정하지 않음
- [x] AuthProvider 초기화 이후 인가 진행 (`isInitialized` 상태로 관리)
- [x] 새로고침 시 충돌 방지 (초기화 대기 로직 구현)

#### ✅ 2-3. 인가 방법
- [x] 인증 프로바이더의 `isLoggedIn` 기능 활용
- [x] `url.ts`의 `getRouteTypeByPath`, `getRouteAccessLevel` 함수 사용
- [x] 권한 검증 경로 하드코딩하지 않음 (url.ts import하여 사용)

#### ✅ 2-4. 권한분기테스트를 위한 기본값 설정
- [x] 테스트 환경 변수 설정: `NEXT_PUBLIC_TEST_ENV=test`
- [x] 실제 환경: 비로그인 유저를 기본으로 하여 로그인 여부에 따라 접속 가능
- [x] 테스트 환경: 로그인 유저를 기본으로 하여 모든 페이지 접속 가능 (`isTestEnv` 체크)

### ✅ 3. 모달 구현

#### ✅ 3-1. 모달 조건
- [x] `src/commons/providers/modal/modal.provider.tsx` 사용
- [x] ModalProvider 수정하지 않음
- [x] 모달 한 번만 표시 (`hasShownModalRef`로 경로별 추적)
- [x] 닫힌 뒤 같은 상황에서 다시 나타나지 않음 (경로별 추적)

#### ✅ 3-2. 공통컴포넌트 조건
- [x] 로그인해주세요 모달: `<Modal />` 사용
- [x] `variant: 'info'` 설정
- [x] `actions: 'single'` 설정

#### ✅ 3-3. 페이지 이동 조건
- [x] `commons/constants/url.ts`의 `getRoutePath(RouteType.LOGIN)` 사용
- [x] 로그인해주세요 모달 확인 클릭 시:
  - [x] `closeAllModals()` 호출
  - [x] 로그인 페이지로 이동 (`/auth/login`)

---

## 구현 세부사항

### 파일 구조
```
src/commons/providers/auth/
  ├── auth.guard.tsx (신규 생성)
  └── prompts/
      └── IMPLEMENTATION_CHECKLIST.md (이 파일)

src/app/
  └── layout.tsx (수정: AuthGuard 추가)
```

### 주요 기능
1. **경로 기반 권한 검증**: 현재 경로를 분석하여 접근 권한 확인
2. **AuthProvider 초기화 대기**: 새로고침 시 충돌 방지를 위한 초기화 로직
3. **테스트 환경 지원**: `NEXT_PUBLIC_TEST_ENV=test` 환경 변수로 테스트 모드 활성화
4. **모달 중복 방지**: 경로별로 모달 표시 여부 추적
5. **빈 화면 처리**: 인가되지 않은 경우 빈 화면 표시

### 사용된 함수 및 상수
- `getRouteTypeByPath()`: 경로로부터 RouteType 추출
- `getRouteAccessLevel()`: RouteType의 접근 권한 확인
- `AccessLevel.PUBLIC`, `AccessLevel.MEMBER_ONLY`: 접근 권한 레벨
- `getRoutePath(RouteType.LOGIN)`: 로그인 페이지 경로 반환

---

## 검증 완료
- ✅ TypeScript 타입 체크 통과
- ✅ ESLint 경고 없음 (기존 경고만 존재)
- ✅ Next.js Build 성공
- ✅ 모든 요구사항 구현 완료

