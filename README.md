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

<br>

## 📍 학습 목표

이번 미션은 UI와 도메인 영역을 나누고, 역할에 따른 모듈/클래스 분리를 연습하는 것을 주요 목표로 삼고 있습니다.

- UI와 도메인 영역을 분리해 독립적으로 모델링과 설계를 고민해보고 테스트로 검증해보는 경험
- 단위 테스트 기반으로 리팩터링하는 경험

학습 키워드

- 단위테스트 기초 with Jest
- OOP
- JS의 Object
- prototype & class
- this
- 함수와 클로저
- CSS grid

## 🎯 기능 요구사항

- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 소비자는 자동 구매를 할 수 있어야 한다.
- [x] 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.

### 기능 구현 목록

- [x] 소비자는 금액 투입 시 로또 가격의 배수만을 투입하여야 한다.
- [x] 로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.
- [x] 로또는 1부터 45번까지의 숫자들을 가진다.
- [x] 로또는 총 6개의 숫자를 가진다.
- [x] 로또의 각 숫자들은 중복되지 않는다.

### 테스트 요구사항

- [x] 기능 요구사항을 구현하며, 도메인 로직에 대한 단위 테스트를 Jest로 작성한다.

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-lotto/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
