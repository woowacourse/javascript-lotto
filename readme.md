- 로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
  - 로또 구입 금액을 입력할 수 있다.
- 로또 1장의 가격은 1,000원이다.

  Validation

  - 로또 구입 금액은 숫자여야 한다.
  - 로또 구입 금액은 1000원 단위여야 한다.
  - 로또 구입 최소 금액은 1000원이다.

- 로또 번호는 오름차순으로 정렬하여 보여준다.

- 로또 번호를 오름차순으로 정렬할 수 있다.
- 정렬한 결과를 출력할 수 있다.

- 당첨 번호와 보너스 번호를 입력받는다.

  - 당첨번호를 입력할 수 있다.

  Validation

  - 당첨번호는 1~45 범위에 속해야 한다.
  - 당첨번호는 정수여야 한다.
  - 당첨번호는 6개 여야 한다.

  - 보너스 번호를 입력할 수 있다.

  Validation

  - 보너스 번호는 당첨번호와 중복되지 않아야 한다.
  - 보너스 번호는 1~45 범위에 속해야 한다.
  - 보너스 번호는 정수여야 한다.

  - 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.

  - 사용자가 구매한 로또번호와 당첨번호를 비교할 수 있다.
  - 사용자의 당첨 수익률을 계산할 수 있다.
  - 당첨 내역을 출력할 수 있다.
  - 수익률을 계산할 수 있다.

- 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
- 1등: 6개 번호 일치 / 2,000,000,000원
- 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
- 3등: 5개 번호 일치 / 1,500,000원
- 4등: 4개 번호 일치 / 50,000원
- 5등: 3개 번호 일치 / 5,000원

- 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.

  - 사용자가 재시작, 종료 여부를 선택하여 입력할 수 있다.

  InputValidation

  - 사용자의 답변은 y 혹은 n 이어야 한다.

- 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.

- 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.
