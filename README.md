<p align="middle" >
  <img width="200px;" src="./src/assets/images/lotto_ball.png"/>
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
  <img width="400" src="./src/assets/images/lotto_ui.png">
</p>

### 🎯 step1 구입 기능

- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
  - 금액은 1000원 이상을 입력해야 한다. 그 이하로 입력시 안내메세지를 출력한다.
  - 남는 금액이 있을 경우 남는 금액만큼을 빼도록 안내한다.
  - 소비자는 낸 금액에 맞는 개수만큼의 자동으로 번호가 부여된 복권을 받는다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

### 🎯🎯 step2 당첨 결과 기능

- [x] 당첨 번호와 보너스 번호를 입력할 수 있다.
  - 로또 번호들 중 중복된 번호가 있으면 안내메시지를 출력한다.
  - 로또 번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
- [x] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
  - 당첨 번호와 보너스 번호를 입력하지 않으면 안내메세지를 출력한다.
- [x] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - [ ] 수동 구매의 개수는 입력한 금액 / 로또 가격 만큼만 가능하다.
  - [ ] 수동 구매의 개수는 자연수만 가능하다.
  - [ ] 수동 구매의 구매 번호는 1 ~ 45까지의 숫자만 가능하다.
  - [ ] 수동 구매의 구매 번호는 중복된 번호가 존재할 수 없다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

## ✔ Tests

### step1 테스트

- [x] 소비자는 낸 금액에 맞는 개수만큼의 복권을 받는다.
- [x] 소비자가 받은 각각의 복권에서 중복되는 숫자가 존재하면 안된다.
- [x] 금액은 1000원 이상을 입력해야 한다. 그 이하로 입력시 안내메세지를 출력한다.
- [x] 남는 금액이 있을 경우 남는 금액만큼을 빼도록 안내한다.

### step2 테스트

- [x] 입력된 번호들 중 중복된 번호가 있다면 안내메세지를 출력한다.
- [x] 입력된 번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
- [x] 당첨번호가 모두 입력되지 않으면 결과를 확인할 수 없다.
- [x] 결과 확인 버튼을 누르면, 당첨 통계, 수익률을 보여준다.
- [x] 다시 시작하기 버튼을 누르면, 로또게임이 초기화된다.

### step3 테스트

- [ ] 소비자는 자동 / 수동 구매를 선택할 수 있다.
- [ ] 소비자는 자동으로 구매한 로또 개수만큼의 복권을 받는다.
- [ ] 수동 구매를 선택한 경우 직접 로또 번호를 입력할 수 있다.
- [ ] 입력한 금액 / 로또 가격이 0이 되면 결과 확인하기 버튼이 활성화된다.

- [ ] 입력된 로또 번호 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
- [ ] 입력된 번호 중 중복된 번호가 있다면 안내메시지를 출력한다.
- [ ] 번호가 모두 입력되지 않으면 안내메시지를 출력한다.
<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-lotto/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
