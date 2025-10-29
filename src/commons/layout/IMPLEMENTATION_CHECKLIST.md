# Commons Layout Area 구현 체크리스트

## 구현 완료 내역

### ✅ 커서룰 적용
- [x] @01-common.mdc 적용
  - 명시된 파일 이외 수정하지 않음
  - 명시하지 않은 라이브러리 설치하지 않음
  - 독립적인 부품들의 조립 형태로 구현
  
- [x] @04-func.mdc 적용
  - TDD 기반으로 playwright 테스트 먼저 작성
  - playwright.config.ts 설정 변경하지 않음
  - playwright 테스트는 package.json의 scripts에 등록된 명령으로만 테스트
  - mock 데이터 사용하지 않고 실제 데이터 사용
  - timeout 방식의 테스트 사용하지 않음
  - 테스트 시 사용되는 페이지 이동은 경로만 사용
  - 테스트 시 data-testid 지정하여 테스트

### ✅ 파일 생성 및 수정
- [x] src/commons/layout/hooks/index.area.hook.ts 생성
- [x] src/commons/layout/tests/index.area.hook.spec.ts 생성
- [x] tests/index.area.hook.spec.ts 생성
- [x] src/commons/layout/index.tsx 수정

### ✅ 기능 구현
- [x] url.ts의 페이지URL에 정의된 경로에 따라 노출 여부 반영
- [x] header 영역 노출 제어 (전체, 로고)
- [x] banner 영역 노출 제어 (전체)
- [x] navigation 영역 노출 제어 (전체)
- [x] footer 영역 노출 제어 (전체)

### ✅ 테스트 조건
- [x] jest, @testing-library/react 제외
- [x] playwright만 사용
- [x] timeout 설정하지 않음
- [x] 페이지 로드 식별: data-testid 대기 방법 사용
- [x] /auth/login, /auth/signup, /pictures 테스트 skip
- [x] 페이지 이동 시 경로만 사용 (baseUrl 미포함)
- [x] CSS Module 충돌 방지를 위해 data-testid 사용

### ✅ 페이지별 영역 노출 테스트
- [x] /diaries: 모든 영역 표시 (header, logo, banner, navigation, footer)
- [x] /diaries/[id]: header, logo, footer만 표시
- [x] /auth/login: 모든 영역 숨김 (skip)
- [x] /auth/signup: 모든 영역 숨김 (skip)
- [x] /pictures: 모든 영역 표시 (skip)

### ✅ 테스트 실행 결과
- [x] 테스트 실행 성공: 6개 통과, 9개 skip (크롬, 파이어폭스, 웹킷)
- [x] 빌드 성공 확인

## 구현 상세

### Hook: useLayoutArea
```typescript
export const useLayoutArea = () => {
  const pathname = usePathname();
  const routeType = getRouteTypeByPath(pathname);
  
  const layoutConfig = routeType ? getRouteLayoutConfig(routeType) : defaultConfig;

  return {
    showHeader: layoutConfig.header.show,
    showLogo: layoutConfig.header.logo,
    showBanner: layoutConfig.banner,
    showNavigation: layoutConfig.navigation,
    showFooter: layoutConfig.footer,
  };
};
```

### Layout 컴포넌트 수정사항
- useLayoutArea Hook을 import하여 사용
- 각 영역에 조건부 렌더링 적용
- 각 영역에 data-testid 추가
- Gap 요소에도 조건부 렌더링 적용

### 테스트 파일 위치
- src/commons/layout/tests/index.area.hook.spec.ts (소스 코드와 함께)
- tests/index.area.hook.spec.ts (Playwright 테스트 실행용)

## 최종 확인
- [x] 모든 요구사항 충족
- [x] 테스트 통과
- [x] 빌드 성공
- [x] Linter 에러 없음


