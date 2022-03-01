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

## 데모 페이지

https://uk960214.github.io/javascript-lotto/

## Step1

### UI 구현

- [x] 피그마 양식에 따라 마크업 작성
- [x] 피그마 양식에 따라 css style 작성

### 기능 구현

- [x] 구입 금액을 입력 받는다.
  - [x] 입력 값이 빈 칸이 아닌지 검증한다.
  - [x] 입력 값이 1000원 단위인지 검증한다.
  - [x] 입력 값의 범위가 1000 - 50000인지 검증한다.
  - [x] 구입 버튼을 눌렀을 때 결과 부분이 표시된다.
  - [x] 구입 버튼을 눌렀을 때, 금액 입력창과 구입 버튼은 비활성화 된다.
- [x] 입력한 구입 금액만큼 로또를 발급한다.
  - [x] 각 로또 당 1 - 45 사이의 임의의 숫자 6개를 생성한다.
  - [x] 발급한 로또를 페이지에 표시한다.
- [x] 번호 보기 토글을 선택하면 숫자를 보여준다.
  - [x] 토글 버튼을 구현한다.
  - [x] 토글 버튼이 활성 상태일 때 로또 숫자를 보여준다.
  - [x] 토글 버튼이 비활성 상태일 때 로또 숫자를 숨긴다.

## Step2

### UI 구현

- [x] 피그마 양식에 따라 마크업 작성
- [x] 피그마 양식에 따라 css style 작성

### 기능 구현

- [ ] 당첨 번호를 입력 받는다.
  - [ ] 당첨 번호 6개, 보너스 번호 1개가 빠짐없이 입력 되었는지 검증한다.
  - [ ] 입력한 번호의 범위가 로또의 범위(현재 1-45)인지 검증한다.
  - [ ] 입력한 번호가 모두 자연수인지 검증한다.
- [ ] 입력한 값과 발급된 로또의 숫자를 비교해 당첨 결과를 페이지에 표시한다.
  - [ ] 각 로또 당 당첨 번호와 일치하는 갯수를 비교한다.
    - [ ] 일치하는 번호의 갯수가 5개인 경우 로또에 보너스 번호가 포함되는 지를 검증한다.
    - [ ] 투입한 금액 대비 상금을 계산한다.
  - [ ] 비교 결과를 모달로 표시한다.
- [ ] 모달에 표시되는 다시 시작하기 버튼을 클릭하면 지금까지의 결과가 초기화된다.
  - [ ] 뷰에서 렌더링 했던 모든 요소를 삭제하고 페이지를 원래 상태로 되돌린다.
    - [ ] 발급한 로또, 당첨 번호 입력 섹션, 모달을 삭제한다.
    - [ ] 구입할 금액 투입 입력창을 초기화하고 활성화한다.
  - [ ] 머신에서 저장했던 모든 내용을 삭제하고 초기화한다.
    - [ ] 발급한 모든 로또를 삭제한다.
    - [ ] 저장한 당첨번호를 삭제하고 산출한 결과를 삭제한다.

## 예외 사항

- 구입 금액의 유효 범위는 1000원 ~ 50000원이다.
- 유효한 로또 당첨 번호의 범위는 1 ~ 45이다.

## ⚙️ Before Started

#### 개발 환경 가이드

개발 중에는 아래 명령어를 사용하여 webpack dev server를 띄워 현재 개발 중인 어플리케이션을 확인할 수
있습니다.

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
