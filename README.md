# 🎰 로또 게임

## 구현할 기능 목록

### 1. 로또 구입 금액을 입력 받는다.

- [x] 로또 구입 금액을 입력 받을 때는 `> 구입금액을 입력해 주세요.`라는 문구를 출력한다.

```
// 출력 예시
> 구입금액을 입력해 주세요. 8000
```

- [ ] 구입 금액이 숫자인지 확인한다.
  - [ ] 숫자가 아닌 값을 입력한 경우 `[ERROR] 구입 금액은 숫자로만 이루어져야 합니다.`를 출력한다.
- [ ] 구입 금액이 1,000원 단위인지 확인한다.
  - [ ] 구입 금액이 1,000원으로 나누어떨어지지 않을 경우 `[ERROR] 구입 금액은 1,000원 단위여야 합니다.`를 출력한다.
- [ ] 구입 금액이 1,000원 미만인지 확인한다.
  - [ ] 구입 금액이 1,000원 미만인 경우 `[ERROR] 최소 구입 금액은 1,000원입니다.`를 출력한다.

### 2. 구입 금액에 해당하는 만큼 로또를 발행한다.

- [ ] 로또 번호는 오름차순으로 정렬하여 출력한다.
- [ ] 로또 1장의 가격은 1,000원이다.

```
// 출력 예시
8개를 구매했습니다.
[8, 21, 23, 41, 42, 43]
[3, 5, 11, 16, 32, 38]
[7, 11, 16, 35, 36, 44]
[1, 8, 11, 31, 41, 42]
[13, 14, 16, 38, 42, 45]
[7, 11, 30, 40, 42, 43]
[2, 13, 22, 32, 38, 45]
[1, 3, 5, 14, 22, 45]
```

### 3. 당첨 번호를 입력 받는다.

```
// 출력 예시
> 당첨 번호를 입력해 주세요. 1,2,3,4,5,6
```

- [ ] 입력 형식이 올바른지 확인한다.
  - [ ] 쉼표로 구분되지 않은 형식이 입력된 경우 `[ERROR] 당첨 번호는 쉼표로 구분된 6개의 숫자여야 합니다.`를 출력한다.
  - [ ] 숫자 이외의 값이 포함된 경우 `[ERROR] 당첨 번호는 숫자로만 이루어져야 합니다.`를 출력한다.
- [ ] 입력된 번호가 6개인지 확인한다.
  - [ ] 번호가 6개가 아닐 경우 `[ERROR] 당첨 번호는 6개여야 합니다.`를 출력한다.
- [ ] 번호가 중복되지 않았는지 확인한다.
  - [ ] 번호에 중복된 숫자가 있을 경우 `[ERROR] 당첨 번호는 중복될 수 없습니다.`를 출력한다.
- [ ] 각 번호가 1~45 범위 내의 숫자인지 확인한다.
  - [ ] 번호가 1~45 범위를 벗어날 경우 `[ERROR] 당첨 번호는 1에서 45 사이의 숫자여야 합니다.`를 출력한다.

### 4. 보너스 번호를 입력 받는다.

```
// 출력 예시
> 보너스 번호를 입력해 주세요. 7
```

- [ ] 보너스 번호가 숫자인지 확인한다.
  - [ ] 숫자가 아닌 값을 입력한 경우 `[ERROR] 보너스 번호는 숫자여야 합니다.`를 출력한다.
- [ ] 입력된 번호가 1개인지 확인한다.
  - [ ] 번호가 1개가 아닐 경우 `[ERROR] 보너스 번호는 1개여야 합니다.`를 출력한다.
- [ ] 보너스 번호가 1~45 범위 내의 숫자인지 확인한다.
  - [ ] 보너스 번호가 1~45 범위를 벗어날 경우 `[ERROR] 보너스 번호는 1에서 45 사이의 숫자여야 합니다.`를 출력한다.
- [ ] 당첨 번호와 중복되지 않는지 확인한다.
  - [ ] 보너스 번호가 당첨 번호와 중복될 경우 `[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.`를 출력.

### 5. 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.

- [ ] 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
  - 1등: 6개 번호 일치 / 2,000,000,000원
  - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  - 3등: 5개 번호 일치 / 1,500,000원
  - 4등: 4개 번호 일치 / 50,000원
  - 5등: 3개 번호 일치 / 5,000원
- [ ] 당첨 내역을 출력한다.
- [ ] 상금과 구매금액으로 수익률을 계산한다.

```
// 출력 예시
당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.
```

### 6. 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.

- [ ] 재시작/종료 여부를 입력 받을 때는 `다시 시작하시겠습니까? (y/n)`라는 문구를 출력한다.
  - [ ] 사용자가 y, n, Y, N 이외의 문자를 입력하면 `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.`를 출력한다.

```
// 출력 예시
다시 시작하시겠습니까? (y/n)
```

- [ ] 재시작할 경우 구입 금액 입력부터 게임을 다시 시작한다
- [ ] 재시작하지 않을 경우 그대로 프로그램을 종료시킨다.

### 7. 사용자가 잘못된 값을 입력한 경우 예외를 발생시킨다.

- [ ] 에러 메시지를 출력 후 에러가 발생한 부분부터 입력을 다시 받는다.

## 폴더 구조

```
📦src
 ┣ 📂constants // 상수 메시지
 ┣ 📂domain // 도메인 로직 관련 파일
 ┣ 📂utils // 유틸리티 함수
 ┣ 📂view // Input, Output
 ┣ 📜step1-index.js // step1 시작점
 ┗ 📜step2-index.js // step2 시작점
```
