<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
<img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
<img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
<a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
  <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

### 🎯 step1 구입 기능

- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 소비자는 **자동 구매**를 할 수 있어야 한다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

### 🎯🎯 step2 당첨 결과 기능

- [x] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [x] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [x] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

### 💾 기능 목록

### step1

- [x] 로또 구입 금액을 인풋으로 받는다.
  - [x] 단위 금액 placeholder 표시 (단위 금액은 1000원으로 한다.)
  - [x] 단위 금액으로 나누어지지 않을 경우 에러 핸들링
- [x] 금액을 단위 금액으로 나눈 만큼 로또를 발급한다.
  - [x] 로또 번호는 1 ~ 45
  - [x] 하나의 로또 안에서 각각의 번호는 중복되면 안된다.
  - [x] 발급된 로또는 화면에 렌더링한다.
- [x] 토글 버튼을 눌렀을 때 로또 섹션의 레이아웃이 바뀌고 번호가 보인다.
  - [x] css를 이용해 레이아웃과 디스플레이를 수정한다.

### step2

- [x] 당첨번호와 보너스 번호를 인풋으로 받는다.
  - [x] 당첨번호와 보너스 번호는 중복되서는 안된다.
  - [x] 당첨번호와 보너스 번호는 1 ~ 45
- [x] 결과 확인하기 버튼을 눌렀을 때의 다음과 같은 기능을 수행한다.
  - [x] 당첨번호와 보너스 번호의 유효성을 검사한다.
  - [x] 구입한 로또 번호와 일치하는 당첨번호의 개수를 확인한다.
  - [x] 당첨금액을 합산하여 수익률을 계산한다.
  - [x] 당첨 통계, 수익률을 확인할 수 있는 모달을 띄운다.
  - [x] 다시 시작하기 버튼을 클릭한 경우 초기화 한다.

<br>

### 테스트 케이스

- [x] 구입 금액은 단위 금액의 양의 배수 값을 갖는다.
  - [x] 몫은 양의 정수값, 나머지는 0인 값을 받는다.
- [x] 구입 금액을 입력한 뒤 버튼을 클릭했을 때, 알맞은 개수의 로또를 렌더링한다.
- [x] 토글 버튼을 클릭했을 때, 모든 복권 번호를 렌더링한다.
- [x] 적절한 당첨 번호를 입력 받는다.
  - [x] 중복된 숫자를 입력받지 않는다.
  - [x] 1 ~ 45의 숫자를 입력 받는다.
- [x] 결과 확인하기 버튼을 누르면 모달을 확인할 수 있다.
  - [ ] 당첨 통계가 정확한지 확인한다. (TDD)
- [x] 다시 시작하기 버튼을 누르면 초기화 된다.
