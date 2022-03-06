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

## 🧑‍💻 데모 페이지

[링크](http://woojeongmin.com/javascript-lotto/)

## ⚙️ Before Started

#### 개발 환경 가이드

개발 중에는 아래 명령어를 사용하여 webpack dev server를 띄워 현재 개발 중인 어플리케이션을 확인할 수 있습니다.

```
npm run start
```

별도로 빌드를 해야 한다면 아래 명령어를 사용해주세요

```
npm run build
```

## 🎯 구현 기능목록

### 1단계

- #### 로또 로직

  - 금액이 주어지면 발급할 로또 개수를 구할 수 있어야 한다.
  - 금액의 유효성을 검증할 수 있어야 한다.
    - 정수가 아니면 에러를 throw한다.
    - 1000으로 나눠서 안떨어지는 금액이 입려되면 에러를 throw한다.
    - 1000부터 10000 사이가 아니면 에러를 throw한다.
  - 로또 번호를 생성할 수 있어야 한다.
    - 로또 번호는 정수여야 한다.
    - 로또 번호는 1부터 45 사이여야 한다.
  - 6개의 번호를 가진 로또를 발급할 수 있다.
  - 계산된 로또개수만큼 로또를 자동 구매할 수 있어야 한다.

- #### UI

  - 금액을 입력하여 로또를 구입할 수 있어야 한다.
  - 구입한 모든 로또와 개수를 화면에 출력할 수 있어야 한다.
  - 번호보기 스위치를 눌러 번호를 보여주고 숨길 수 있어야 한다.

### 2단계

- #### 당첨 결과 확인

  - 당첨 번호 6개와 보너스 번호 1개의 유효성을 검증할 수 있어야 한다.
    - 번호들이 정수가 아니면 에러를 throw한다.
    - 1부터 45 사이가 아니면 에러를 throw한다.
    - 중복되는 번호가 있으면 에러를 throw한다.
  - 당첨 번호 6개와 보너스 번호 1개가 주어지면 로또 번호와 비교해 당첨 결과를 구할 수 있어야 한다.
  - 당첨 갯수를 구할 수 있어야 한다.
  - 총 당첨 금액을 구할 수 있어야 한다.
  - 총 수익률을 구할 수 있어야 한다.

- #### UI

  - 당첨 번호 6개와 보너스 번호 1개를 입력받을 수 있어야 한다.
  - 모달을 보여줄 수 있어야 한다.
  - 결과 확인하기 버튼을 누르면 결과를 모달로 보여줄 수 있어야 한다.
  - 다시 시작하기 버튼을 누르면 초기화를 할 수 있어야 한다.

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
