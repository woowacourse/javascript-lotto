<p align="middle" >
  <img width="200px;" src="./images/lotto_ball.png"/>
</p>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## 기능 요구사항

### 1단계 요구사항

- 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- 로또 1장의 가격은 1,000원이다.
- 소비자는 자동 구매를 할 수 있어야 한다.
- 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.

## 구현 기능목록

### 1단계 기능목록

- [x] 금액이 주어지면 발급할 로또 개수를 구할 수 있어야 한다.
- [x] 입력된 금액의 유효성을 검증할 수 있어야 한다.
  - [x] 입력된 금액이 숫자가 아니면 에러를 throw한다.
  - [x] 1000으로 나눠서 안떨어지는 금액이 입려되면 에러를 throw한다.
  - [x] 입력된 금액이 1000부터 10000 사이가 아니면 에러를 throw한다.
- [x] 로또 번호를 생성할 수 있어야 한다.
  - [x] 로또 번호는 정수여야 한다.
  - [x] 로또 번호는 1부터 45 사이여야 한다.
- [x] 6개의 번호를 가진 로또를 발급할 수 있다.
- [x] 계산된 로또개수만큼 로또를 자동 구매할 수 있어야 한다.

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
