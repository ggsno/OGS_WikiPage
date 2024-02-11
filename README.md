# 코딩허브 프론트엔드 채용 과제

## 실행 방법

```bash
# node v18.18.0
# yarn v1.22.18

yarn install
yarn dev
```

> `mocks/data/mockWikis.ts` 파일에 모킹데이터가 있습니다.
>
> 필요에 따라 파일 하단에 있는 함수의 주석을 해제해 다수개의 데이터를 테스트할 수 있습니다.

## 주요 사용 라이브러리

| 이름           | 사용 목적                                                        |
| -------------- | ---------------------------------------------------------------- |
| React          | 컴포넌트 단위 개발 편의                                          |
| React Router   | 클라이언트 사이드 라우팅 편의                                    |
| TypeScript     | 타입 오류 예방 및 코드 가독성 향상                               |
| TailwindCSS    | 클래스 명, 디자인 시스템에 대한 고려 사항을 덜어 스타일링에 편의 |
| Tanstack-Query | 데이터 패칭 시 캐싱 편의                                         |
| Zustand        | 컴포넌트 간 상태 관리 편의                                       |
| MSW            | 빠르고 간단한 API 모킹                                           |

## 구현 사항

### 메인페이지 및 위키페이지 가져오기

> - [x] 처음페이지에서는 여러개의 위키페이지제목이 목록으로 나옵니다.
> - [x] 위키페이지는 제목과 본문으로 구성되며 각각 텍스트 입니다.
> - [x] 위키페이지 제목을 클릭하면 제목과 본문을 볼 수 있습니다.

- 위키페이지는 URL로 공유될 수 있기 떄문에 위키의 구별자를 path parameter로 넘겨 페이지를 이동하도록 구현했습니다.
- 위키의 구별자는 고유 아이디 대신 제목으로 선택했습니다. 위키페이지의 특성상 제목의 중복은 없을 것이고 추후 구현의 편의를 위해 제목을 path parameter로 넘겨 구현했습니다.

### 페이지네이션

> - [x] 처음페이지에 목록으로 보여지는 제목의 갯수는 5개이며, 5개가 넘어가면 페이지를 구분해서 표시합니다.

- 위키를 GET하는 API가 page라는 인자를 받아 해당 페이지만큼의 값을 반환하고, 응답의 헤더에 x-total-count가 있다고 가정하고 구현했습니다.
- 사용자 경험을 고려해 5개 이하의 목록에도 레이아웃이 변경되지 않게 유지했습니다.

### 위키 추가, 수정

> - [x] 메인페이지에서 추가 버튼을 누르면 새로이 입력할 수 있는 창이 나오고, 제목과 내용을 입력할 수 있습니다.
> - [x] 위키내용페이지에는 수정 버튼이 있고, 수정을 누르면 내용을 수정해서 저장할 수 있습니다.

- 중복된 제목으로 추가/수정 요청 등의 잘못된 요청 시 에러 메시지를 화면에 띄워 유저에게 요청에 대한 피드백을 전달했습니다.
- 빈 제목 혹은 빈 내용과 같이 올바르지 않은 input은 button을 disabled하게 만들어 유효하지 않은 API 호출을 방지했습니다.

### 위키 내용에 따른 자동 링크

> - [x] 위키페이지 본문에 다른 위키페이지의 제목이 있으면 자동으로 링크가 걸리고,클릭하면 해당 위키페이지로 이동합니다.

- 위키의 제목만을 따로 저장한 DB가 있다고 가정했습니다. 아래는 자동 링크 로직입니다.
  1. 백엔드가 위키 GET 요청을 받으면 해당 위키의 본문에 포함된 제목들을 찾고 해당 제목들의 배열을 위키 정보와 같이 반환합니다.
  2. 프론트엔드에서 위키 본문을 해당 제목들을 regexp로 찾아 링크로 대체합니다.

## 폴더구조

> [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview) 패턴을 참고해 폴더구조를 구축했습니다.

```
// 레이어 구조와 설명

src/
|--app/      애플리케이션의 진입점, 어플리케이션 로직을 초기화
|
|--pages/    페이지 단위의 요소
|
|--widgets/  페이지에 사용되는 독립형 UI 구성 요소
|
|--features/  비즈니스 가치를 전달하는 사용자 시나리오 및 기능
|
|--entities/  비즈니스 엔터티
|
ㄴ--shared/    특정 비즈니스 논리에 연결되지 않은 재사용 가능한 구성 요소와 유틸리티

```

> 각 레이어 계층의 하위 계층으로 슬라이스 계층이 있습니다.
>
> 슬라이스 계층은 레이어로 추상화된 계층을 다시 비즈니스 엔터티에 맞게 그룹화하는 계층입니다.
>
> `app`, `pages`, `shared` 레이어 계층에는 슬라이스 계층이 따로 없습니다.

### 컴포넌트 간 암묵적 연결 방지

- 컴포넌트는 하위 레이어 혹은 동일 슬라이스 내부만 참조하고 다른 계층을 침범할 수 있는 변수 사용을 제한함으로써 컴포넌트간 암묵적 연결을 방지했습니다.
- URL을 페이지 단위의 변수로 생각해 URL변경은 페이지 레이어 이상에서만 일어나도록 구현했습니다.

### 컴포넌트 재사용을 고려한 추상화

- 레이어 하위 계층에 컴포넌트를 추상적으로 만들고 그것을 상위 레이어에서 사용하도록 구현했습니다. 상위 레이어로 갈 수록 구체화되도록 구현했습니다.
- 위키 목록 컴포넌트를 목록과 페이지네이션 컴포넌트로 분리, 목록은 `src/shared/ui/List.tsx` 컴파운드 컴포넌트로 추상화시켜 리스트를 추상화 및

## 시연 영상

|![녹화_2024_02_11_19_09_42_704](https://github.com/ggsno/OGS_WikiPage/assets/46833758/2e3d6476-5a91-46eb-b75f-4d9c97c0f1b0)|
|-|
|메인페이지, 페이지네이션, 위키, 위키링크, 수정, 등록, 본문 링크 자동 연결|
  
|![녹화_2024_02_11_19_19_44_17](https://github.com/ggsno/OGS_WikiPage/assets/46833758/44af532e-7545-45f1-b507-030d1d296406)|
|-|
|잘못된 요청 피드백(이미 등록된 제목)|
