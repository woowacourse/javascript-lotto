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

## 기능 목록

1. - [x] 로또 구입 금액 입력 기능

   - 입력 값은 정수여야 한다.

   - 입력 최소 값은 1,000이다.

2. - [x] 로또 구입 기능

   - 구입 버튼을 누르면, 입력 금액으로 구매할 수 있는 최대 갯수의 로또를 발급한다.

   - 로또 1장의 가격은 1,000원이다.

   - 각 로또의 로또 번호는 자동 생성한다.

   - 로또를 구입하고 남은 잔돈은 입력칸에 표시된다.

3. - [x] 로또 번호 자동 생성 기능

   - 로또 1장은 6개의 번호를 가진다.

   - 각 번호는 1 이상, 45 이하의 정수다.

   - 각 번호는 중복되지 않는다.

4. - [x] 구입한 로또 출력 기능

   - 번호 보기 토글을 통해 로또 출력 방식이 결정된다.

   - 번호 보기 off 상태

     - 구입한 로또 개수만큼 로또 이미지를 출력한다.

   - 번호 보기 on 상태

     - 구입한 로또 개수만큼 로또 이미지와 각 로또의 번호를 출력한다.

### 테스트 요구사항

- 위 기능들이 정상적으로 동작하는지 Jest를 이용하여 단위 테스트를 작성한다.

### UI

- Figma 시안을 기준으로 UI 템플릿을 작성한다.
  - HTML
  - CSS

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

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-lotto/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
