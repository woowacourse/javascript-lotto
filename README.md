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

- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [ ] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [ ] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

### 📝 stpe1 기능 구현 목록

- [x] 로또 구입 금액을 입력받을 수 있어야 한다.
  - 금액은 1천원 단위로만 입력받을 수 있다.
- [x] 로또를 구매한 갯수를 화면에 표시한다.
  - ex) 총 N개를 구매하였습니다.
- [x] 로또를 구매한 갯수만큼 화면에 로또 아이콘(🎟️)을 표시한다.
  - 로또를 구매한 갯수 = 입력한 금액 / 1000
- [x] '번호보기' 토글을 통해 구매한 로또의 번호를 확인할 수 있어야 한다.

### 📝 stpe2 기능 구현 목록

- [ ] 로또 당첨 번호와 보너스 번호를을 입력받을 수 있어야 한다.
  - 1과 45사이의 번호여야 한다.
  - 번호는 중복되지 않아야한다.
- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
  - 로또 당첨 금액은 고정되어 있음
    - 3개 : 5,000
    - 4개 : 50,000
    - 5개 : 1,500,000
    - 5개 + 보너스볼 : 30,000,000
    - 6개 : 2,000,000,000
- [ ] 다시 시작하기 버튼을 눌렀을 때 전체 화면이 초기화 되야 한다.
