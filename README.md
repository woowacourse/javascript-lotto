## 기능 요구 사항

- [x] 로또 구입 금액을 입력받는다.

  - [x] 구입 금액이 정수인지 체크한다.
  - [x] 구입 금액이 1,000원 단위인지 체크한다.
  - [x] 구입 금액이 최소 구입 금액(1000원)을 넘는지 체크한다.
  - [x] 구입 금액이 최대 구입 금액(10만원)을 넘지 않는지 체크한다.
  - [x] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

- [x] 로또를 발행한다.

  - [x] 로또 숫자에는 중복이 포함될 수 없다.
  - [x] 로또 숫자가 정수만 가능하다.
  - [x] 1 ~ 45까지의 숫자만 허용된다.
  - [x] 로또 숫자는 6개여야 한다.
  - [x] 오름차순으로 정렬한다.

- [x] 구입 금액에 해당하는 만큼 로또를 출력한다.

  - [x] 발행한 로또 개수를 출력한다.
  - [x] 발행받은 로또 숫자들을 출력한다.

- [x] 당첨 번호를 입력받는다.

  - [x] 쉼표(,)를 기준으로 나눈다.
  - [x] 로또 숫자에는 중복이 포함될 수 없다.
  - [x] 로또 숫자가 정수만 가능하다.
  - [x] 1 ~ 45까지의 숫자만 허용된다.
  - [x] 로또 숫자는 6개여야 한다.
  - [x] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

- [ ] 보너스 번호를 입력받는다.

  - [ ] 로또 숫자가 정수만 가능하다.
  - [ ] 1 ~ 45까지의 숫자만 허용된다.
  - [ ] 당첨 번호와 중복되면 안된다.
  - [ ] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

- [ ] 구매한 로또 번호와 당첨 번호를 비교한다.

  - [ ] 일치한 결과 값을 반환한다.

- [ ] 비교한 결과 값으로 수익률을 구한다.

- [ ] 당첨 통계를 출력한다.

  - [ ] 일치한 개수를 출력한다.
  - [ ] 수익률을 출력한다.

- [ ] 재시작 여부를 입력받는다.
  - [] y, n의 입력만 가능하다.
  - [ ] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.
