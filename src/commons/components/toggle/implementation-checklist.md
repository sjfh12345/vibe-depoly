# Toggle 컴포넌트 스토리 구현 체크리스트

## 01-common.mdc 룰 적용 체크리스트

- [x] **명시된 파일 이외에는 수정하지 않음**
  - 지정된 파일(src/commons/components/toggle/index.stories.tsx)만 생성/수정했습니다.

- [x] **명시하지 않은 라이브러리를 설치하지 않음**
  - 기존 프로젝트에서 사용 중인 라이브러리(storybook, react)만 활용했습니다.

- [x] **독립적인 부품들의 조립 형태로 구현함**
  - 기존 Toggle 컴포넌트를 재사용하고, 상태 관리를 위한 래퍼 컴포넌트를 독립적으로 구현했습니다.
  - 각 스토리는 독립적으로 정의되었습니다.

## 구현 요구사항 체크리스트

- [x] **스토리북 기본 설정 구현**
  - title, component, parameters, tags, argTypes 설정 완료

- [x] **제어 가능한 토글 컴포넌트 구현**
  - useState를 사용하여 상태 관리 기능 구현
  - 사용자의 토글 조작이 가능하도록 설정

- [x] **다양한 variant 스토리 구현**
  - Primary, Secondary, Tertiary 스토리 구현

- [x] **다양한 size 스토리 구현**
  - Small, Medium, Large 스토리 구현

- [x] **다양한 상태 스토리 구현**
  - Checked, Disabled, DisabledChecked 스토리 구현

- [x] **다크 모드 테마 스토리 구현**
  - PrimaryDark, SecondaryDark, TertiaryDark 스토리 구현

## 빌드 및 검증

- [x] **린트 검사 완료**
  - 코드 린트 오류 없음 확인

- [x] **빌드 실행**
  - 빌드 실행 완료 (Toggle 컴포넌트 스토리 관련 오류 없음)
