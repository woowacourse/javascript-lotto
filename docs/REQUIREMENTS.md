### 로또 미션 요구 사항

- [x] 로또 구매 금액을 입력하면 구매 금액에 해당하는 만큼 로또를 발행해야 한다.
- [x] 로또 번호는 오름차순으로 정렬하여 보여준다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 당첨 번호와 보너스 번호를 입력받는다.
- [x] 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
- [x] 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
  ```
  1등: 6개 번호 일치 / 2,000,000,000원
  2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  3등: 5개 번호 일치 / 1,500,000원
  4등: 4개 번호 일치 / 50,000원
  5등: 3개 번호 일치 / 5,000원
  ```
- [x] 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.
- [x] 재시작할 경우 구매 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.
- [x] 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

---

# 1단계 - 콘솔 기반 로또 게임 기능 목록

## Domain

## model

1. Lotto

   - field
     - 로또 번호 6개를 가진다. (lottoNumbers)
   - method
     - 로또 번호 6개를 반환한다. (getLottoNumbers())

2. Winning

   - field
     - 당첨 번호 6개를 가진다. (winningNumbers)
     - 보너스 번호를 가진다. (bonusNumber)
   - method
     - 당첨 번호 6개를 반환한다. (getWinningNumbers())
     - 보너스 번호를 반환한다. (getBonusNumber())
     - 당첨 번호 6개를 설정한다. (setWinningNumbers())
     - 보너스 번호를 설정한다. (setBonusNumbers())
     - 당첨 번호에서 중복된 당첨 번호가 있는지, 로또 숫자 범위의 값인지, 정수인지 확인한다. (validateWinningNumbers())
     - 보너스 번호가 당첨 번호와 중복인지, 로또 숫자 범위의 값인지, 양수인 정수인지 확인한다. (validateBonusNumber())

3. Benefit

   - field
     - 수익률을 가진다. (rate)
   - method
     - 수익률을 반환한다. (getRate())
     - 수익률을 계산한다. (calculateRate())

4. Money

   - field
     - 구매 금액을 가진다. (amount)
   - method
     - 구매금액을 반환한다. (getAmount())
     - 구매금액이 양수인 정수인지, 1000원 단위인지, 10만원을 넘지 않는지 확인한다. (validateAmount())

## controller

1. lottoMachine

   - field

     - lottos
     - machineInput

   - method

     - 로또 프로그램을 시작한다. (play())
     - 로또 구매 금액 입력을 받는다. (readMoney())
     - 로또 당첨 번호를 입력 받는다. (readWinningNumbers())
     - 로또 보너스 번호를 입력 받는다. (readBonusNumber())
     - 사용자에게 게임을 더 진행할 지 입력을 받는다. (readRetryOption())

     - 재시작하는 경우를 확인한다. (checkRetryOption())
     - 구매 금액만큼 로또들을 생성한다. (generateLottos())
     - 보너스 번호가 맞는지 반환한다. (isBonus())

     - 중복되지 않는 로또 번호 6개를 구성한 뒤 반환한다. (getComposedLottoNumbers())
     - 당첨된 로또들의 등수를 수집한 뒤 반환한다. (getCollectedRanks())
     - 당첨된 로또의 등수를 증가시킨다. (getIncreasedRanks())
     - 로또와 당첨 번호 사이의 일치하는 수를 반환한다. (getMatchedCount())
     - 당첨된 로또의 등수를 반환한다. (getRankIndex())

     - 로또 번호들을 보여준다. (showLottos())
     - 당첨 통계를 보여준다. (showResult())
     - 구매한 로또들에서 당첨된 로또의 등수가 몇개인지 계산한다. (calculateRanks())

     - 재시작하였을 경우 구매 금액부터 다시 입력을 받는다. (retry())
     - 게임 종료의 경우 프로그램을 종료한다. (quit())

## View

1. inputView

   - 필요한 값을 입력받는다. (inputHandler())

2. outputView

   - 구매한 로또의 장수를 출력한다. (printLottoCount())
   - 로또의 번호를 출력한다. (printLotto())
   - 당첨 통계 제목을 출력한다. (printResultTitle())
   - 로또 당첨 결과를 출력한다. (printResult())
   - 총 수익률을 출력한다. (printBenefit())
   - 로또 당첨 결과 문장을 반환한다. (getResultLine())

## utils

1. Console

   - 입력 메서드 (readLine())
   - 출력 메서드 (print())
   - 종료 메서드 (quit())

2. index.js

   - 범위 내의 무작위 숫자를 생성한다. (pickRandomNumberInRange())

   - 숫자인지. (isNumber())
   - 로또 범위 내의 숫자인지. (isNumberInLottoRange())
   - 배열에 중복된 숫자가 없는지. (isUniqueArray())

   - 사용자가 잘못된 입력을 했을 때, 에러문을 출력하고 입력을 다시 받는다. (errorHandler())

## constant

1. index.js
   - 에러문구 (ERROR_MESSAGE)
   - 매직넘버 (MAGIC_NUMBER)
   - 매직리터럴 (MAGIC_LITERAL)
   - 로또게임정보 (RANK_INFORMATIONS)

# 2단계 - 웹 기반 로또 게임 기능 목록

## html

1. index.html

- 웹 기반 로또 게임 ui에 필요한 html을 작성한다.

## css

- 웹 기반 로또 게임 ui에 사용하는 styles들을 정의한다.

## javascript

- 구입금액을 저장한다.
