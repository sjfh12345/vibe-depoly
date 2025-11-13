# 커서 룰 적용 결과 체크리스트

## 01-common.mdc 준수 사항

- [x] 명시된 파일 이외에는 절대로 수정하지 않음
  - 수정한 파일: `src/commons/layout/index.tsx`, `src/commons/layout/hooks/index.auth.hook.ts`, `src/commons/layout/styles.module.css`
  - 테스트 파일: `tests/layout.auth.hook.spec.ts`, `src/commons/layout/tests/index.auth.hook.spec.ts`

- [x] 명시하지 않은 라이브러리를 설치하지 않음
  - 기존 라이브러리만 사용: `react`, `next/navigation`, `@/commons/providers/auth`

- [x] 독립적인 부품들의 조립 형태로 구현
  - `useLayoutAuth` hook을 독립적으로 구현하여 layout 컴포넌트에서 사용

## 04-func.mdc 준수 사항

- [x] 모든 기능 및 데이터는 해당 파일 안에서 처리
  - `useLayoutAuth` hook에서 auth 관련 기능을 캡슐화하여 제공

- [x] 의미를 담고 있는 구조화된 타입은 ENUM을 활용
  - URL 상수는 `auth.provider`에서 이미 `RouteType`, `getRoutePath`를 사용하여 처리

- [x] 최소한의 useState, useEffect를 사용
  - `useLayoutAuth` hook은 `useAuth`를 단순히 래핑하여 추가 로직 없이 구현

- [x] 페이지 이동은 URL 상수를 통해서만
  - `auth.provider`의 `login()`, `logout()` 함수에서 `getRoutePath(RouteType.LOGIN)` 사용

- [x] data-testid를 지정하여 테스트
  - 모든 테스트에서 `data-testid` 사용: `layout-login-button`, `layout-logout-button`, `layout-auth-status`

- [x] 실제 데이터를 테스트로 사용
  - Mock 데이터 사용하지 않음, 실제 API 호출 사용

- [x] timeout은 2000ms 미만으로 설정
  - 모든 timeout 제거 (기본값 사용)

- [x] baseUrl 없이 경로만 사용
  - `page.goto('/diaries')`, `page.goto('/auth/login')` 형식 사용

## Prompt 요구사항 준수 사항

- [x] 로그인 정보 수정
  - `qq@qq.com` / `sjfh1532!` 사용 (prompt 요구사항에 맞게 수정)

- [x] timeout은 설정하지 않거나 500ms 미만
  - 모든 timeout 제거

- [x] data-testid 대기 방법 사용
  - 모든 페이지 로드 확인에 `data-testid` 사용

- [x] 실제 데이터 사용
  - Mock 데이터 사용하지 않음

## 구현 완료 사항

1. ✅ `src/commons/layout/hooks/index.auth.hook.ts` 생성
   - `useAuth`를 래핑하여 layout에서 사용할 수 있는 hook 제공

2. ✅ `src/commons/layout/index.tsx` 수정
   - 비로그인 유저: 로그인 버튼 표시 및 `login()` 함수 연결
   - 로그인 유저: 유저이름 표시 및 로그아웃 버튼에 `logout()` 함수 연결

3. ✅ `src/commons/layout/styles.module.css` 수정
   - `.loginButton` 스타일 추가

4. ✅ 테스트 파일 작성
   - `tests/layout.auth.hook.spec.ts`: Playwright 테스트
   - `src/commons/layout/tests/index.auth.hook.spec.ts`: 동일한 테스트 (prompt 요구사항 경로)

## 빌드 확인

- [x] `npm run build` 성공
  - 컴파일 오류 없음
  - 타입 체크 통과
