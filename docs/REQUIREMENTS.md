# 🎱 로또 게임 요구사항 🎱

## 프로젝트 구조

![flowchart](https://user-images.githubusercontent.com/87642422/220621070-70127e9d-b31c-4745-9eb5-7477b5d770cf.png)

```
📦src
 ┣ 📂css
 ┃ ┗ 📜style.css
 ┣ 📂images
 ┃ ┣ 📜error_icon.png
 ┃ ┗ 📜lotto_icon.png
 ┣ 📂js
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂controller
 ┃ ┃ ┣ 📜ConsoleLottoController.js
 ┃ ┃ ┗ 📜WebLottoController.js
 ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂web
 ┃ ┃ ┣ 📜LottoGame.js
 ┃ ┃ ┣ 📜pickLotto.js
 ┃ ┃ ┣ 📜ScoreBoard.js
 ┃ ┃ ┗ 📜Validator.js
 ┃ ┣ 📂util
 ┃ ┃ ┣ 📂console
 ┃ ┃ ┃ ┣ 📜readlineInterface.js
 ┃ ┃ ┃ ┗ 📜Trimmer.js
 ┃ ┃ ┣ 📂web
 ┃ ┃ ┃ ┣ 📜getFormData.js
 ┃ ┃ ┃ ┗ 📜querySelector.js
 ┃ ┃ ┣ 📜getSortedNumbers.js
 ┃ ┃ ┗ 📜pickRandomNumber.js
 ┃ ┗ 📂view
 ┃ ┃ ┣ 📂console
 ┃ ┃ ┃ ┣ 📜close.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜input.js
 ┃ ┃ ┃ ┗ 📜output.js
 ┃ ┃ ┗ 📂web
 ┃ ┃ ┃ ┣ 📜ErrorView.js
 ┃ ┃ ┃ ┣ 📜InputCleaner.js
 ┃ ┃ ┃ ┣ 📜PurchaseView.js
 ┃ ┃ ┃ ┣ 📜ResultModalView.js
 ┃ ┃ ┃ ┗ 📜WinningLottoInputView.js
 ┣ 📜step1-index.js
 ┗ 📜step2-index.js
```

## 1단계 - 콘솔 기반 로또 게임

### view

- [x] 사용자에게 입력을 받는 기능
- [x] 출력하는 기능
- [x] 콘솔을 종료하는 기능

### controller

#### ConsoleController

- [x] 게임 시작 기능
- [x] 사용자로부터 로또 금액을 입력받는 기능
-

### utils

- [x] 정렬된 배열을 반환하는 기능
- [x] 랜덤 숫자를 반환하는 기능

### domain

#### pickLotto

- [x] 로또 한장을 발행하는 기능

#### Validator

- [x] 유효성 검사
  - [x] 금액에 대한 유효성 검사
    - [x] 정수인지 검사
    - [x] 천으로 나누어 떨어지는지 검사
  - [x] 당첨 번호에 대한 유효성 검사
    - [x] 올바른 포멧인지 검사
    - [x] 중복되는 번호가 없는지 검사
  - [x] 보너스 번호에 대한 유효성 검사
    - [x] 1이상 45이하의 정수인지 검사
  - [x] 재시작 커맨드에 대한 유효성 검사
    - [x] 재시작 커맨드가 y 또는 n 인지 검사

### LottoGame

#### 프로퍼티: lottos, scoreBoard

- [x] 로또 지정된 횟수만큼 발행하는 기능
- [x] 당첨 내역을 반환하는 기능
  - [x] 일치하는 로또 숫자의 개수와 보너스 번호의 포함 여부를 반환하는 기능
    - [x] 일치하는 일반 로또의 개수를 반환하는 기능
    - [x] 로또에 보너스 번호가 포함되어 있는지를 반환하는 기능
  - [x] 일치하는 번호의 수를 이용해 등수를 판별하는 기능
- [x] 총 당첨금을 계산하는 기능
  - [x] 수익률 계산

## 로또 게임 - 2단계 (웹 기반 로또 게임)

### view

#### PurchaseView

- [x] 로또 구입 결과를 랜더링하는 기능
  - [x] 기존 구입 결과를 비우는 기능
  - [x] 로또를 몇 개 구매했는지를 표시하는 기능
  - [x] 로또 구입 번호를 표시하는 기능
    - [x] 로또 하나의 HTML을 반환하는 기능
- [x] `구입` 버튼의 클릭을 감지할 수 있는 기능(리스너)

#### ErrorView

- [x] 에러 메시지를 지정된 위치에 보여주는 기능
  - [x] 에러 메시지의 HTML을 반환하는 기능
- [x] 에러 메시지를 지우는 기능

#### InputCleaner

- [x] 모든 입력창을 비우는 기능

#### ResultModalView

- [x] 로또 추첨 결과를 보여주는 기능
  - [x] 각 순위별 상금을 보여주는 기능
  - [x] 수익률을 보여주는 기능
- [x] 모달을 보여주는 기능
- [x] 모달을 숨기는 기능
- [x] 모달 관련 메뉴의 클릭을 감지할 수 있는 기능(리스너)

#### WinningLottoInputView

- [x] 당첨 로또 메뉴를 보여주는 기능
- [x] 당첨 로또 메뉴를 숨기는 기능
- [x] `결과 확인하기` 버튼의 클릭을 감지할 수 있는 기능(리스너)

### controller

#### LottoController

- [x] 금액을 전달받으면, 로또를 생성하고 구매 결과를 공개하는 단계
- [x] 당첨번호와 보너스 번호를 전달받으면, 당첨 결과를 공개하는 단계
  - [x] 당첨번호를 파싱하는 기능
  - [x] 보너스 번호를 파싱하는 기능
  - [x] 당첨 결과를 보여주는 기능
- [x] 게임을 재시작하는 단계

### util

#### querySelector

- [x] `$` 기호만을 사용하여 `document.querySelector` 를 사용할 수 있는 기능

#### getFormData

- [x] 폼의 `id` 를 받으면, 폼에 적혀 있는 모든 데이터를 반환하는 기능

### domain

#### Validator

- [x] 로또 입력이 누락되었는지에 대한 유효성 검사
- [x] 일반 로또 번호와 보너스 번호가 서로 중복되는지에 대한 유효성 검사
