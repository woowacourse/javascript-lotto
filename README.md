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

- 로또 구입 금액을 입력받는다.
  - 로또 1장의 가격은 1,000원이다.
  - 최소 화폐단위 미만의 자릿수가 포함된 경우 ➡️ `alert` 후 재입력 요청
  - 1,000원 미만일 경우 ➡️ `alert` 후 재입력 요청
  - 1,000원으로 나누어 떨어지지 않을 경우 ➡️ `alert`으로 거스름돈 금액을 알려주고 구매 계속 진행
- 금액으로 살 수 있는 개수만큼 로또를 발급한다.
  - 모든 로또를 자동구매 옵션으로 발급한다.
  - 로또 한 장 당 번호의 개수는 6개로 한다.
  - 번호는 1 ~ 45 사이 랜덤값으로 구성한다.
  - 각 번호는 서로 중복되지 않는다.
  - 각 번호는 오름차순으로 정렬되어 있다.
- 로또 발급 후 번호보기 토글 버튼을 클릭하면 복권번호 표시여부를 결정할 수 있다.
  - 표시여부 기본값은 복권번호를 표시하지 않는 것으로 한다.

### 🎯🎯 step2 당첨 결과 기능

- 로또를 구매하면 당첨번호를 입력할 수 있는 창이 표시된다.
- 당첨번호를 정상적으로 입력하면 결과 확인버튼을 클릭할 수 있다.
  - 결과 확인 버튼은 기본적으로 비활성화 되어있다.
  - 각 번호가 1 ~ 45 사이의 값이 아닌 경우 ➡️ 입력칸 하단에 재입력 요청 메세지 표시
  - 각 번호가 서로 중복되는 경우 ➡️ 입력칸 하단에 재입력 요청 메세지 표시
  - 6개의 '당첨번호'와 1개의 '보너스번호' 모두 알맞게 입력하면 결과 확인 버튼이 활성화된다.
- 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
  - 등수별 당첨 개수를 표시한다.
    - 구매한 로또의 '당첨번호' 일치 개수를 판별한다.
    - 일치 개수가 5개이면 '보너스번호' 일치여부를 확인한다.
  - 수익률을 표시한다.
    - 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - 수동 구매를 위한 input UI는 스스로 구현한다.
- 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

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
