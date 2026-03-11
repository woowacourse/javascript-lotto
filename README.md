요구사항 명세서

1. 기능

1-1. 입력

- 로또 금액을 입력받는다
- 보너스 번호를 입력받는다
- 당첨 번호를 입력받는다
- 재시작 여부를 입력받는다

1-2. 출력

- 로또 배열을 출력한다
- 당첨 내역을 출력한다
- 수익률을 출력한다

1-3. 로또

- 6자리의 번호 배열을 가진다.
- 6자리의 번호를 반환한다.

1-4. 로또들

- 로또의 총 개수를 가진다.
- 로또 배열을 가진다.
- 로또 배열을 생성하는 기능
- 중복되지 않은 랜덤 숫자 6개로 이루어진 배열을 반환한다.
-

1-5. 로또게임

- 당첨 로또 객체(당첨 번호와 보너스 번호로 이루어진)
- 등수 계산 기능

1-6. 통계

- 수익률 계산 기능

1-7. 컨트롤러

- 입력이 잘못된 경우 다시 입력받는다.
- 재시작 여부에 따라 프로그램을 재시작하거나 종료한다.

1-8. 유효성 검사

- 구입 금액은 1000원 단위 양수여야 한다.

- 로또는 6개의 1~45 사이의 중복되지 않은 정수로 이루어져야 한다.
- 당첨 로또는 6개의 1~45 사이의 중복되지 않은 정수로 이루어져야 한다.
- 보너스 번호는 1개의 1~45 사이의 당첨 로또와 중복되지 않은 정수로 이루어져야 한다.

### 2. UI 기반 로또 미션 요구사항

#### 2-1. 로또 구입

- 구입 금액에 5000원을 입력하고 `구입` 버튼을 누르면 구매한 로또 개수 텍스트가 화면에 렌더링된다.
- 구매한 로또 개수만큼 로또 아이콘과 번호가 렌더링된다.

- 올바른 입력이 아닐 때 `구입` 버튼을 누르면 화면에 에러를 발생시킨다.
- 에러가 발생하는 경우 입력 칸을 비운 후 다시 입력받는다.

#### 2-2. 당첨 번호와 보너스 번호

- 로또 구입이 완료되기 전까지는 화면에 렌더링하지 않는다.
- 로또 구매가 완료되면 당첨 번호와 보너스 번호를 입력하는 폼이 렌더링된다.
- 당첨 번호와 보너스 번호를 입력한 후, `결과 확인하기` 버튼을 누르면 당첨 통계를 화면에 렌더링한다.

- 올바른 입력이 아닐 때 `결과 확인하기` 버튼을 누르면 화면에 에러를 발생시킨다.
- 에러가 발생하는 경우 입력 칸을 비운 후 다시 입력받는다.

#### 2-3. 당첨 통계 모달

- 당첨 통계는 모달 형식으로 렌더링되며, 당첨 통계에는 `일치 개수`, `당첨금`, `당첨 개수`가 포함된다.
- 총 수익률이 렌더링된다.

- `X` 버튼을 눌러 모달을 닫을 수 있다.
- `다시 시작하기` 버튼을 누르면 모달이 닫힌다.
- `다시 시작하기` 버튼을 누르면 입력 폼의 값이 비워진다.
- `다시 시작하기` 버튼을 누르면 렌더링되었던 로또 아이콘과 당첨 번호와 보너스 번호 입력 폼이 사라진다.

## 3. CSS 속성 작성 순서

### 1. 레이아웃/정렬

display, position, top, right, bottom, left, z-index, float, clear, flex, flex-direction, flex-wrap, flex-flow, flex-grow, flex-shrink, flex-basis, justify-content, align-items, align-content, align-self, gap, row-gap, column-gap, order, grid, grid-template, grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, grid-auto-flow, grid-column, grid-row, place-items, place-content, place-self, overflow, overflow-x, overflow-y

### 2. 박스모델

box-sizing, width, min-width, max-width, height, min-height, max-height, margin, margin-top, margin-right, margin-bottom, margin-left, padding, padding-top, padding-right, padding-bottom, padding-left

### 3. 비주얼

background, background-color, background-image, background-size, background-position, background-repeat, border, border-width, border-style, border-color, border-radius, box-shadow, outline, outline-width, outline-style, outline-color, opacity, filter, transform

### 4. 타이포

font, font-family, font-size, font-weight, font-style, font-variant, line-height, letter-spacing, text-align, text-decoration, text-transform, text-shadow, color, white-space, word-break, word-spacing, text-overflow
