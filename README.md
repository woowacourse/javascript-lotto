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
- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
  - 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [ ] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 기능 구현 목록

#### 도메인

- [x] 소비자는 금액 투입 시 로또 가격의 배수만을 투입하여야 한다.
- [x] 로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.
- [x] 로또는 1부터 45번까지의 숫자들을 가진다.
- [x] 로또는 총 6개의 숫자를 가진다.
- [x] 로또의 각 숫자들은 중복되지 않는다.
- [x] 당첨번호에 따라 당첨 통계를 확인할 수 있다.
  - [x] 당첨 통계는 일치한 개수가 3개, 4개, 5개, 5개+보너스번호, 6개로 나뉘며 각 단계마다 맞은 로또 수를 보여줄 수 있어야한다.
- [x] 당첨번호에 따라 수익률을 확인할 수 있다.
- [x] 초기화 되어 다시 구매가 가능해야한다.

#### UI

- [x] 구입 버튼 누르면 구입한 로또의 갯수를 확인 가능하다.
  - [x] '총 ?개를 구입하셨습니다' 문구를 가진 라벨로 보여준다.
  - [x] 구입한 로또의 갯수 만큼 티켓 이미지를 보여준다.
  - [x] 이후 기능을 위한 토글을 보여준다.
- [x] 토글 버튼
  - [x] 토글이 꺼진 상태에서 클릭하면 티켓 이미지와 함께 로또 번호도 함께 보여준다.
  - [x] 토글이 켜진 상태에서 클릭하면 티켓 이미지만 보여준다.
- [ ] 사용자는 로또의 당첨번호를 입력할 수 있다.
  - [ ] 당첨번호는 총 6개의 숫자로 구성되어있다.
  - [ ] 당첨번호의 각 숫자는 중복되지 않는다.
  - [ ] 당첨번호의 각 숫자는 1부터 45까지의 정수이다.
- [ ] 당첨 번호 입력 후 결과 확인하기 버튼 누르면 결과확인 모달창이 생성된다.

### 테스트 요구사항

- [x] 기능 요구사항을 구현하며, 도메인 로직에 대한 단위 테스트를 Jest로 작성한다.

<br>

## ✅프로그래밍 요구사항

> 이전 미션의 프로그래밍 요구사항은 기본으로 포함한다.

- UI와 도메인 영역을 분리한다. (UI 없이 핵심 로직을 테스트할 수 있는지 고민해본다)
- 의미 있는 상수를 사용한다.
- 줄여쓰지 않는다.
  <br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-lotto/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
