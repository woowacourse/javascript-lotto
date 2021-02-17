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
  - [x] 로또 구입 금액을 입력할 때 확인 버튼을 누르거나, Enter키로 입력할 수 있다.
  - [x] 구입 금액이 1,000원 단위가 아닐 경우, 구입할 수 있는 만큼만 구입한다. (e.g. 5,500원 -> 5장)
  - [x] 구입 금액이 0원 이상 1,000원 미만일 경우 alert 메시지를 표시한다.
  - [x] -1은 입력되지 않도록 한다.
  - [x] 로또 구입 금액 입력 후, input과 버튼을 비활성화한다.
  - [x] 로또 구입 금액 입력 후, 로또 목록이 나타나야 한다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 소비자는 **자동 구매**를 할 수 있어야 한다.
  - [x] 자동 구매는 로또를 구입할 때, 각 로또마다 번호 6개가 자동으로 생성한 뒤 가지고 있어 한다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
  - [x] 🎟️ 옆에 `1,2,3,4,5,6`과 같은 형태의 문자열도 번호를 보여줄 수 있어야 한다.
  - [x] 번호보기 토글이 꺼져있을 때는 로또의 개수만큼 🎟️가 표시되어야 한다.
  - [x] 번호보기 텍스트를 눌렀을 때도 동작되어야 한다.

### step1 테스트 항목

- [x] 사용자가 로또 구입 금액을 입력하고 확인 버튼을 누르면 금액에 맞는 로또가 화면에 보여진다.
- [x] 사용자가 토글 버튼을 누르면 로또의 번호를 볼 수 있다.
- [x] 각 로또 안의 번호가 중복되지 않았는지 확인한다.

#### 예외사항(테스트)

- [ ] 1000원 이하의 금액이 들어온 경우
  - [ ] 사용자가 0원을 입력하면 '최소 1000원 이상의 금액을 입력하세요.'라고 경고창을 띄운다.
  - [ ] 사용자가 999원을 입력하면 '최소 1000원 이상의 금액을 입력하세요.'라고 경고창을 띄운다.
- [ ] 사용자가 5500 원을 입력하면 화면에 로또가 5개 보여진다.

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
