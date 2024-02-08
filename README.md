# 코딩허브 프론트엔드 채용 과제

## 실행 방법

```bash
# node v18.18.0
# yarn v1.22.18

yarn install
yarn dev
```

## 구현 사항

### 메인페이지 및 위키페이지 가져오기

> - [x] 처음페이지에서는 여러개의 위키페이지제목이 목록으로 나옵니다.
> - [x] 위키페이지는 제목과 본문으로 구성되며 각각 텍스트 입니다.
> - [x] 위키페이지 제목을 클릭하면 제목과 본문을 볼 수 있습니다.

- 위키페이지는 URL로 공유될 수 있기 떄문에 위키의 구별자를 path parameter로 넘겨 페이지를 이동하도록 구현했습니다.
- 위키의 구별자는 고유 아이디 대신 제목으로 선택했습니다. 위키페이지의 특성상 제목의 중복은 없을 것이고 추후 구현의 편의를 위해 제목을 path parameter로 넘겨 구현했습니다.
- TODO: 비동기적으로 불러오는 데이터를 불러오는 중일 때,불러오기를 실패했을 때, 위키가 없을 때 각각의 상태를 사용자에게 보여주도록 구현했습니다.
- TODO: 비동기 상태를 보여주는 컴포넌트에서 각각의 상태 변경에 따른 Cumulative Layout Shift를 방지해 사용자 경험을 개선했습니다.

### 페이지네이션

> - [x] 처음페이지에 목록으로 보여지는 제목의 갯수는 5개이며, 5개가 넘어가면 페이지를 구분해서 표시합니다.

- 위키를 GET하는 API가 페이지네이션 쿼리를 지원하고, 응답의 헤더에 x-total-count가 있다고 가정하고 구현했습니다.
- TODO: 사용자 경험을 고려해 5개 이하의 목록에도 레이아웃이 변경되지 않게 유지했습니다.

### 위키 추가, 수정

- [ ] 메인페이지에서 추가 버튼을 누르면 새로이 입력할 수 있는 창이 나오고, 제목과 내용을 입력할 수 있습니다.
- [ ] 위키내용페이지에는 수정 버튼이 있고, 수정을 누르면 내용을 수정해서 저장할 수 있습니다.

### 위키 내용에 따른 자동 링크

- [ ] 위키페이지 본문에 다른 위키페이지의 제목이 있으면 자동으로 링크가 걸리고,클릭하면 해당 위키페이지로 이동합니다.

## 기타

-
- API 모킹을 위해 MSW를 사용했습니다.
-
