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

## 구현할 기능 목록

### Step 1

- [x] 로또 구입 금액을 입력하고, 해당 금액에 맞는 로또를 발급한다.
  - 구입 금액은 양의 정수이다.
    1. 실패 케이스
      - -1 -> error
      - 0 -> error
      - 0.23 -> error
    2. 성공 케이스
      - 3 -> true
      - 1000 -> true

  - 구입 금액은 문자열 혹은 빈 값일 수 없다.
    1. 실패 케이스
      - " " -> error
      - "도리" -> error

- [x] 로또 1장의 가격은 1,000원이다.
  - 구입 금액이 1000으로 나누어 떨어진다.
    1. 실패 케이스
      - 999 -> error
      - 1001 -> error
    2. 성공 케이스
      - 1000 -> 1
      - 2000 -> 2
    
- [x] 소비자는 자동 구매를 할 수 있어야 한다.(UI)
  - 구입한 로또 번호가 1 ~ 45 사이의 숫자이다.
    - 3 -> true
    - 47 -> false

  - 구입한 로또 번호는 서로 다른 랜덤한 숫자 6개로 이루어진 값이다.
    - 1,3,3,3,5,6 -> false
    - 1,2,3,4,5,6 -> [1,2,3,4,5,6]

  - 사용자가 구매한 티켓을 확인할 수 있다.
    - 총 n개를 구매하였습니다. + n개의 이미지

- [x] 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다. (UI)

### Step 2

- [x] 지난주 당첨 번호 6개와 보너스 번호를 입력한다.
  - 7개의 번호 모두 1 ~ 45 사이의 숫자이다.
  
- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
  - 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
    - 3개: 5000, 4개: 50000, 5개: 1500000, 5개+보너스: 30000000, 6개: 2000000000
  - 수익률은 ( 총 당첨 금액의 합 )/( 5000 * 로또 구매 개수 ) 이다.

- [ ] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.
  - 구입할 금액을 입력할 초기 화면으로 돌아간다.


<br>

## 테스트
단위 테스트는 아래 명령어를 사용해주세요

```
npm run test
```

E2E 테스트는 아래 명령어를 사용해주세요

```
npm run cypress:test
```

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
