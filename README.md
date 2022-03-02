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

## 🔎 설계

![javascript lotto modeling](./javascript-lotto-modeling.png)

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

### 2단계

- [ ] 입력된 당첨번호의 유효성을 검증한다.
  - [ ] 번호 모두 정수가 아니면 에러를 throw한다.
  - [ ] 1에서 45까지의 값을 가지고 있지 않으면 에러를 throw한다.
  - [ ] 숫자들 중에서 중복이 있으면 에러를 throw한다.
- [ ] 당첨번호와 생성된 로또 한 개의 일치 갯수를 구할 수 있다.
- [ ] 일치 갯수에 따른 당첨 갯수를 구할 수 있다.
- [ ] 당첨금과 구입 금액으로 수익률을 구할 수 있다.

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
