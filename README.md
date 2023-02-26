<h1 align="middle">🎱</h1>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>

---

## 🚀 1단계 - 콘솔 기반 로또 게임

### 🙏 페어(페어프로그래밍)

<table>
  <tr>
    <td align="center" width="120px">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/24777828?v=4" alt="첵스(최혜령) 프로필" />
      </a>
    </td>
    <td align="center" width="120px">
      <a href="https://github.com/jeonjeunghoon" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/64737872?v=4" alt="아커(전증훈) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        첵스(최혜령)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jeonjeunghoon" target="_blank">
        아커(전증훈)
      </a>
    </td>
  </tr>
</table>

### 📍 학습 목표

- UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
- 단위 테스트 기반으로 점진적인 리팩터링

### 🎯 기능 요구 사항

- 로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
- 로또 번호는 오름차순으로 정렬하여 보여준다.
- 로또 1장의 가격은 1,000원이다.
- 당첨 번호와 보너스 번호를 입력받는다.
- 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
- 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
  - 1등: 6개 번호 일치 / 2,000,000,000원
  - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  - 3등: 5개 번호 일치 / 1,500,000원
  - 4등: 4개 번호 일치 / 50,000원
  - 5등: 3개 번호 일치 / 5,000원
- 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.
  - 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.
- 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

### ⚙️ 실행가이드

다음 명령어를 입력해 패키지를 설치한다.

```
npm install
```

설치가 완료되었다면, 다음 명령어를 입력해 게임을 실행한다.

```
npm run start-step1
```

\*`node:readline/promises` 를 사용했기 때문에 node 18 이상에서 동작가능

### 🎮 실행화면

```
구입금액을 입력해 주세요.(공백은 포함하지 않습니다) 8000
8개를 구매했습니다.
[3, 6, 11, 35, 38, 45]
[4, 7, 15, 34, 38, 41]
[1, 6, 22, 26, 30, 37]
[3, 12, 26, 33, 36, 42]
[6, 9, 10, 22, 25, 30]
[6, 9, 11, 28, 40, 44]
[13, 15, 20, 23, 40, 42]
[1, 8, 9, 11, 21, 26]

당첨 번호를 입력해 주세요.(ex. "1,2,3,4,5,6" 혹은 "1, 2, 3, 4, 5, 6"형식) 3,6,11,4,15,34
보너스 번호를 입력해 주세요.(공백은 포함하지 않습니다) 7

당첨 통계
--------------------
3개 일치 (5,000원) - 2개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 125%입니다.
다시 시작하시겠습니까? (y/n) n
게임을 종료합니다.
```

---

# 🚀 2단계 - 웹 기반 로또 게임

### 📍 학습 목표

- UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
- 단위 테스트 기반으로 점진적인 리팩터링

### 🎯 기능 요구 사항

- 웹 UI를 사용해 로또 게임의 주요 기능을 사용할 수 있어야 한다.
  - 로또 구매
  - 구매한 로또 목록 확인
  - 당첨 번호 및 보너스 번호 지정
  - 당첨 통계 확인
  - 게임 재시작

### ⚙️ 실행가이드

[🔗 로또게임 실행하기](https://hyeryongchoi.github.io/javascript-lotto-1/dist/index.html) 또는 다음 명령어를 입력해 게임을 실행한다.

```
npm run start-step2
```

### 🎮 실행화면

<img width="756" alt="시작화면" src="https://user-images.githubusercontent.com/24777828/220968140-a4d69279-cc02-46f9-9e11-fa5e9ec06a31.png">

<img width="756" alt="로또 구매내역" src="https://user-images.githubusercontent.com/24777828/220968176-60c4e485-6b99-4df1-b5bb-5ad44281de15.png">

<img width="756" alt="당첨번호 및 보너스번호 입력" src="https://user-images.githubusercontent.com/24777828/220968217-c56f4fb3-f10d-482f-805e-cc86df2e243e.png">

<img width="756" alt="당첨통계" src="https://user-images.githubusercontent.com/24777828/220968240-3c6ccb7b-b6f4-4d40-aff3-364541d8cd58.png">
