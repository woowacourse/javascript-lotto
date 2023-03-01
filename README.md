<h1 align="middle">🎱</h1>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>

## Demo
[데모 페이지 링크](https://suyoungj.github.io/javascript-lotto-1/)

## 실행 방법

```
// 저장소 클론
git clone -b step2 --single-branch https://github.com/suyoungj/javascript-lotto-1/tree/step2

// 패키지 설치
npm i

// 어플리케이션 실행
npm run start-step2

// 테스트 실행
npm test

```

## 실행 화면

![image](https://user-images.githubusercontent.com/19235163/220822459-635058aa-5615-4350-801d-367629508fd6.png)

![image](https://user-images.githubusercontent.com/19235163/220822573-5bf4bbdc-12ff-48d8-b61c-bc18963df22b.png)

![image](https://user-images.githubusercontent.com/19235163/220822582-b0c10b30-7c98-421d-9041-d0724dca4fa6.png)

## 디렉터리 구조

```
.
├── App.js
│
├── controller
│   └── LottoGameController.js
│
├── css
│   ├── app.css
│   ├── index.css
│   ├── modal.css
│   ├── palette.css
│   ├── reset.css
│   ├── typo.css
│   └── utils.css
│
├── domain
│   ├── Lotto.js
│   ├── LottoMachine.js
│   ├── LottoStatistics.js
│   ├── WinningNumbers.js
│   └── constants
│       └── index.js
│
├── step1-index.js
├── step2-index.js
│
├── utils
│   ├── dom.js
│   └── shuffle.js
│
└── view
    ├── CheckWinningSection
    │   ├── LottoPurchaseForm.js
    │   ├── WinningNumbersSubmitForm.js
    │   └── index.js
    │
    ├── HomePage
    │   └── index.js
    │
    └── WinningStatModal
        └── index.js
```
