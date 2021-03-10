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

- [x] 로또 구매에 사용할 금액을 더 추가할 수 있다.
  - 추가할 금액으로 0 혹은 음수를 입력시 안내메세지를 출력한다.
  - 추가할 금액으로는 정수를 입력하지 않는다면 안내메세지를 출력한다.
- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
  - 금액은 1000원 이상을 입력해야 한다. 그 이하로 입력시 안내메세지를 출력한다.
  - 이용자는 낸 금액에 맞는 개수만큼의 자동으로 번호가 부여된 복권을 받는다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

### 🎯🎯 step2 당첨 결과 기능

- [x] 당첨 번호와 보너스 번호를 입력할 수 있다.
  - 로또 번호들 중 중복된 번호가 있으면 안내메시지를 출력한다.
  - 로또 번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
- [x] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
  - 당첨 번호와 보너스 번호를 입력하지 않으면 안내메세지를 출력한다.
- [x] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- [x] 이용자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있다.
  - 로또 번호들 중 중복된 번호가 있으면 안내메시지를 출력한다.
  - 로또 번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
  - 구매는 하나씩 이루어지며, 구매가 이루어질 때마다 금액에서 1000원이 빠져나간다.
  - 로또를 구매할 돈이 부족하다면 안내메세지를 출력한다.
- [x] 결과를 확인하고자 할때, 수동 구매 후 남는 금액이 있다면 자동 구매가 수행된다.
  - 자동 구매가 수행되기 전에 이용자의 허가를 받는다.
  - 자동 구매 후에도 남는 금액이 있는지를 알려준다.

<br>

## ✔ Tests

### step1 테스트

- [x] 소비자는 낸 금액에 맞는 개수만큼의 복권을 받는다.
- [x] 소비자가 받은 각각의 복권에서 중복되는 숫자가 존재하면 안된다.
- [x] 자동 구매를 위해서는 입금된 금액이 1000원 이상이어야 한다. 그 이하로 입력시 안내메세지를 출력한다.

### step2 테스트

- [x] 입력된 번호들 중 중복된 번호가 있다면 안내메세지를 출력한다.
- [x] 입력된 번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
- [x] 당첨번호가 모두 입력되지 않으면 결과를 확인할 수 없다.
- [x] 결과 확인 버튼을 누르면, 당첨 통계, 수익률을 보여준다.
- [x] 다시 시작하기 버튼을 누르면, 로또게임이 초기화된다.

### step3 테스트

- [x] 수동 구매를 수행할 때마다 등록한 금액에서 1000원씩이 빠지는지 확인한다
- [x] 수동 구매를 수행할 때마다 이용자가 번호를 선택한 로또가 하나씩 추가되는지 확인한다.
- [x] 수동 구매를 위해 입력된 번호들 중 중복된 번호가 있다면 안내메세지를 출력한다.
- [x] 수동 구매를 위해 입력된 번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.
- [x] 수동 구매를 위한 당첨번호가 모두 입력되지 않으면 결과를 확인할 수 없다.
- [x] 수동 구매 후 남는 금액이 있을 때 결과를 확인하려고 하면 나머지 금액으로 자동구매를 수행할 것인지를 물어본다.

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

## 📓 Convention

- 클래스에서 속성명 앞에 \_ 가 붙여진 것은 해당 속성이 protected 속성임을 뜻하며 인스턴스 외부에서 해당 속성을 수정해서는 안됩니다.
- 클래스에서 속성명 앞에 # 가 붙여진 것은 해당 속성이 private 속성임을 뜻하며 상속이 수행된 클래스 내부에서도 해당 속성을 사용하려 해서는 안됩니다.
- 어떤 인스턴스에 pascal case 표기된 속성이 있다면 해당 속성이 사실 getter 임을 뜻합니다. 이를 조작하려는 시도를 하지 않도록 유의해주십시오.
- 동적 렌더링에 필요한 템플릿을 얻어오는 함수에만 get- prefix를 붙이지 않고 이름을 간소화하여 사용합니다.
